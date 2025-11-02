"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await signIn(email, password)

      // Redirect based on email (mock logic)
      if (email.includes("admin")) {
        router.push("/admin")
      } else if (email.includes("merchant")) {
        router.push("/merchant")
      } else if (email.includes("restaurant")) {
        router.push("/restaurant")
      } else {
        router.push("/")
      }
    } catch (err) {
      setError(t("common.error"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">A</span>
              </div>
            </Link>
          </div>
          <CardTitle className="text-center text-2xl">{t("header.signIn")}</CardTitle>
          <CardDescription className="text-center">
            {t("header.signIn")} {t("header.appName")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? `${t("common.loading")}` : t("header.signIn")}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Comptes de démonstration</span>
              </div>
            </div>

            <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
              <p className="font-semibold">Essayez ces comptes de démonstration :</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Client: customer@demo.com</li>
                <li>Commerçant: merchant@demo.com</li>
                <li>Restaurateur: restaurant@demo.com</li>
                <li>Admin: admin@demo.com</li>
              </ul>
              <p className="text-xs text-muted-foreground">Mot de passe : n'importe quel mot de passe</p>
            </div>

            <div className="text-center text-sm">
              Vous n'avez pas de compte ?{" "}
              <Link href="/register" className="text-primary hover:underline">
                {t("header.createAccount")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
