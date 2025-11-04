"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Déconnecte l'utilisateur de manière sécurisée
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function logout() {
  try {
    const cookieStore = await cookies()

    const supabaseUrl = process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        success: false,
        error: "Variables d'environnement Supabase manquantes",
      }
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStore.set(name, "", { ...options, maxAge: 0 })
        },
      },
    })

    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
    return {
      success: false,
      error: "Erreur lors de la déconnexion",
    }
  }
}
