"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface Profile {
  id: string
  first_name: string
  last_name: string
  role: "customer" | "merchant" | "admin" | "restaurant"
  avatar_url?: string
}

interface User extends Profile {
  email: string
}

interface StoredUser extends User {
  password: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: "customer" | "merchant" | "admin" | "restaurant",
  ) => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
  hasRole: (role: "customer" | "merchant" | "admin" | "restaurant") => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getStoredUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("users")
  return users ? JSON.parse(users) : []
}

const saveStoredUsers = (users: StoredUser[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem("users", JSON.stringify(users))
}

const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

const setCurrentUser = (user: User | null) => {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = getCurrentUser()
      if (storedUser) {
        setUser(storedUser)
      }

      if (!supabase) {
        setIsLoading(false)
        return
      }

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        await fetchUserProfile(authUser)
      }
      setIsLoading(false)
    }

    loadUser()

    if (!supabase) return

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
        setCurrentUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchUserProfile = async (authUser: any) => {
    if (!supabase) return

    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

    if (error) {
      console.error("[v0] Error fetching profile:", error)
      return
    }

    if (profile) {
      const userData = {
        id: profile.id,
        email: authUser.email!,
        first_name: profile.first_name,
        last_name: profile.last_name,
        role: profile.role,
        avatar_url: profile.avatar_url,
      }
      setUser(userData)
      setCurrentUser(userData)
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log("[v0] Sign in attempt for:", email)

    if (!supabase) {
      const users = getStoredUsers()
      console.log("[v0] Stored users:", users.length)

      const foundUser = users.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        console.log("[v0] User not found or password incorrect")
        throw new Error("Email ou mot de passe incorrect")
      }

      console.log("[v0] User found, logging in:", foundUser.email)
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setCurrentUser(userWithoutPassword)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("[v0] Supabase sign in error:", error.message)
      throw error
    }
  }

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: "customer" | "merchant" | "admin" | "restaurant",
  ) => {
    console.log("[v0] Sign up attempt for:", email, "role:", role)

    if (!supabase) {
      const users = getStoredUsers()

      // Check if user already exists
      if (users.some((u) => u.email === email)) {
        console.log("[v0] User already exists:", email)
        throw new Error("Un compte avec cet email existe déjà")
      }

      const newUser: StoredUser = {
        id: "local-" + Date.now(),
        email,
        password, // In production, this should be hashed
        first_name: firstName,
        last_name: lastName,
        role,
      }

      users.push(newUser)
      saveStoredUsers(users)
      console.log("[v0] User created and stored:", email)

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setCurrentUser(userWithoutPassword)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}`,
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
        },
      },
    })

    if (error) {
      console.log("[v0] Supabase sign up error:", error.message)
      throw error
    }
  }

  const signOut = async () => {
    console.log("[v0] Sign out")

    if (!supabase) {
      setCurrentUser(null)
      setUser(null)
      router.push("/")
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    setCurrentUser(null)
    setUser(null)
    router.push("/")
  }

  const hasRole = (role: "customer" | "merchant" | "admin" | "restaurant") => {
    return user?.role === role
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
