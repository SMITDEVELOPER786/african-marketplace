"use client"

import type React from "react"
import Link from "next/link"
import { User, Store, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n-context"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { cn } from "@/lib/utils"

type UserRole = "customer" | "merchant" | "restaurant" | null

export default function SignInPage() {
  const { t } = useLanguage()
  const { signIn, signUp } = useAuth()
  const { toast } = useToast()
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
          redirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
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
      // Redirect will happen automatically via auth context
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
      // Redirect will happen automatically via auth context
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Simplified with only back button */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Main Content with proper left/right spacing */}
      <main className="max-w-md mx-auto px-6 sm:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{t("header.signIn")}</h1>
          <p className="text-muted-foreground mt-2">
            Connectez-vous ou créez un compte pour accéder à votre espace personnalisé
          </p>
        </div>

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Créer un compte</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6 mt-6">
            <div className="space-y-4">
              <p className="text-sm text-center text-muted-foreground">Connexion rapide</p>
              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" onClick={() => handleOAuthSignIn("google")} disabled={isLoading} className="w-full">
                  Google
                </Button>
                <Button type="button" variant="outline" onClick={() => handleOAuthSignIn("facebook")} disabled={isLoading} className="w-full">
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

          <TabsContent value="signup" className="space-y-6 mt-6">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-medium text-center">Choisissez votre profil</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    type="button" 
                    onClick={() => setSelectedRole("customer")} 
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all text-center min-w-0",
                      selectedRole === "customer" 
                        ? "border-[#DC143C] bg-[#DC143C]/5" 
                        : "border-border hover:border-[#DC143C]/50"
                    )}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DC143C]/10">
                      <User className="h-6 w-6 text-[#DC143C]" />
                    </div>
                    <div className="w-full">
                      <p className="font-medium">Client</p>
                      <p className="text-xs text-muted-foreground mt-1">Acheter et commander</p>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setSelectedRole("merchant")} 
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all text-center min-w-0",
                      selectedRole === "merchant" 
                        ? "border-[#D2691E] bg-[#D2691E]/5" 
                        : "border-border hover:border-[#D2691E]/50"
                    )}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D2691E]/10">
                      <Store className="h-6 w-6 text-[#D2691E]" />
                    </div>
                    <div className="w-full">
                      <p className="font-medium">Commerçant</p>
                      <p className="text-xs text-muted-foreground mt-1">Gérer mon commerce</p>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setSelectedRole("restaurant")} 
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all text-center min-w-0",
                      selectedRole === "restaurant" 
                        ? "border-[#FF6347] bg-[#FF6347]/5" 
                        : "border-border hover:border-[#FF6347]/50"
                    )}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6347]/10">
                      <Store className="h-6 w-6 text-[#FF6347]" />
                    </div>
                    <div className="w-full">
                      <p className="font-medium">Restaurateur</p>
                      <p className="text-xs text-muted-foreground mt-1">Gérer mon restaurant</p>
                    </div>
                  </button>
                </div>
              </div>

              {selectedRole && (
                <div className="space-y-4">
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
                </div>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}