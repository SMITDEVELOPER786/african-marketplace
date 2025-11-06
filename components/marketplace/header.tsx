"use client"

import type React from "react"

import Link from "next/link"
import { User, Store, Shield, LogOut, Settings, UserCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n-context"
import { useAuth } from "@/lib/auth-context"
import { LanguageSelector } from "@/components/language-selector"
import { MobileNav } from "@/components/marketplace/mobile-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

type UserRole = "customer" | "merchant" | "admin" | "restaurant" | null

export function MarketplaceHeader() {
  const { t } = useLanguage()
  const { user, signIn, signUp, signOut, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    setIsLoading(true)
    const supabase = createClient()

    if (!supabase) {
      toast({
        title: "Erreur de configuration",
        description: "L'authentification n'est pas configurée correctement",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) throw error
    } catch (error: any) {
      toast({
        title: "Erreur d'authentification",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(loginEmail, loginPassword)
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      })
      setIsLoginOpen(false)
      setLoginEmail("")
      setLoginPassword("")
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      toast({
        title: "Profil requis",
        description: "Veuillez sélectionner un profil",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const [firstName, ...lastNameParts] = signupName.split(" ")
      const lastName = lastNameParts.join(" ")

      await signUp(signupEmail, signupPassword, firstName, lastName, selectedRole)
      toast({
        title: "Compte créé avec succès",
        description: "Veuillez vérifier votre email pour confirmer votre compte",
      })
      setIsLoginOpen(false)
      setSignupName("")
      setSignupEmail("")
      setSignupPassword("")
      setSelectedRole(null)
    } catch (error: any) {
      toast({
        title: "Erreur de création de compte",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const getUserInitials = () => {
    if (!user) return "U"
    const firstInitial = user.first_name?.[0] || ""
    const lastInitial = user.last_name?.[0] || ""
    return (firstInitial + lastInitial).toUpperCase() || "U"
  }

  const getRoleLabel = () => {
    if (!user) return ""
    switch (user.role) {
      case "customer":
        return "Client"
      case "merchant":
        return "Commerçant"
      case "restaurant":
        return "Restaurateur"
      case "admin":
        return "Administrateur"
      default:
        return ""
    }
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MobileNav />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">A</span>
            </div>
            <span className="hidden font-bold sm:inline-block">{t("header.appName")}</span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-medium">
                      {user.first_name} {user.last_name}
                    </span>
                    <span className="text-xs text-muted-foreground">{getRoleLabel()}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {user.role === "customer" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/customer" className="cursor-pointer">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Mon espace</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/customer/cart" className="cursor-pointer">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Panier</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/customer/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {user.role === "merchant" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Mon compte</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/merchant" className="cursor-pointer font-medium">
                        <Store className="mr-2 h-4 w-4" />
                        <span>Accès commerçant</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {user.role === "restaurant" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Mon compte</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/restaurant" className="cursor-pointer font-medium">
                        <Store className="mr-2 h-4 w-4" />
                        <span>Accès restaurateur</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {user.role === "admin" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Mon compte</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer font-medium">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Accès Administration</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("header.signIn")}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">{t("header.signIn")}</DialogTitle>
                  <DialogDescription>
                    Connectez-vous ou créez un compte pour accéder à votre espace personnalisé
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="signup" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Connexion</TabsTrigger>
                    <TabsTrigger value="signup">Créer un compte</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4 mt-6">
                    {/* OAuth Buttons for quick login */}
                    <div className="space-y-3">
                      <p className="text-sm text-center text-muted-foreground">Connexion rapide</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleOAuthSignIn("google")}
                          disabled={isLoading}
                          className="w-full"
                        >
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleOAuthSignIn("facebook")}
                          disabled={isLoading}
                          className="w-full"
                        >
                          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          Facebook
                        </Button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Ou avec email</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="votre@email.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Mot de passe</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-[#A0522D] hover:bg-[#8B4513]" disabled={isLoading}>
                        {isLoading ? "Connexion..." : "Se connecter"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Choisissez votre profil</p>
                        <div className="grid gap-2">
                          {/* Customer Role */}
                          <button
                            type="button"
                            onClick={() => setSelectedRole("customer")}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left",
                              selectedRole === "customer"
                                ? "border-[#DC143C] bg-[#DC143C]/5"
                                : "border-border hover:border-[#DC143C]/50",
                            )}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DC143C]/10">
                              <User className="h-5 w-5 text-[#DC143C]" />
                            </div>
                            <div>
                              <p className="font-medium">Client</p>
                              <p className="text-xs text-muted-foreground">Acheter et commander</p>
                            </div>
                          </button>

                          {/* Merchant Role */}
                          <button
                            type="button"
                            onClick={() => setSelectedRole("merchant")}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left",
                              selectedRole === "merchant"
                                ? "border-[#D2691E] bg-[#D2691E]/5"
                                : "border-border hover:border-[#D2691E]/50",
                            )}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D2691E]/10">
                              <Store className="h-5 w-5 text-[#D2691E]" />
                            </div>
                            <div>
                              <p className="font-medium">Commerçant</p>
                              <p className="text-xs text-muted-foreground">Gérer mon commerce</p>
                            </div>
                          </button>

                          {/* Restaurant Role */}
                          <button
                            type="button"
                            onClick={() => setSelectedRole("restaurant")}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left",
                              selectedRole === "restaurant"
                                ? "border-[#FF6347] bg-[#FF6347]/5"
                                : "border-border hover:border-[#FF6347]/50",
                            )}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6347]/10">
                              <Store className="h-5 w-5 text-[#FF6347]" />
                            </div>
                            <div>
                              <p className="font-medium">Restaurateur</p>
                              <p className="text-xs text-muted-foreground">Gérer mon restaurant</p>
                            </div>
                          </button>

                          {/* Admin Role */}
                          <button
                            type="button"
                            onClick={() => setSelectedRole("admin")}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left",
                              selectedRole === "admin"
                                ? "border-[#228B22] bg-[#228B22]/5"
                                : "border-border hover:border-[#228B22]/50",
                            )}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#228B22]/10">
                              <Shield className="h-5 w-5 text-[#228B22]" />
                            </div>
                            <div>
                              <p className="font-medium">Administrateur</p>
                              <p className="text-xs text-muted-foreground">Gérer la plateforme</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      {selectedRole === "customer" && (
                        <div className="space-y-3">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-background px-2 text-muted-foreground">Ou continuez avec</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleOAuthSignIn("google")}
                              disabled={isLoading}
                              className="w-full"
                            >
                              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                              </svg>
                              Google
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleOAuthSignIn("facebook")}
                              disabled={isLoading}
                              className="w-full"
                            >
                              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                              Facebook
                            </Button>
                          </div>

                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-background px-2 text-muted-foreground">Ou avec email</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedRole && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="signup-name">Nom complet</Label>
                            <Input
                              id="signup-name"
                              placeholder="Jean Dupont"
                              value={signupName}
                              onChange={(e) => setSignupName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="votre@email.com"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-password">Mot de passe</Label>
                            <Input
                              id="signup-password"
                              type="password"
                              placeholder="••••••••"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              required
                              minLength={6}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-[#A0522D] hover:bg-[#8B4513]" disabled={isLoading}>
                            {isLoading ? "Création..." : "Créer mon compte"}
                          </Button>
                        </>
                      )}
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  )
}