"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "supabase_not_configured":
        return "La configuration de l'authentification est incomplète. Veuillez contacter l'administrateur."
      case "callback_failed":
        return "La connexion a échoué. Veuillez réessayer."
      case "access_denied":
        return "Vous avez refusé l'accès. Veuillez réessayer si vous souhaitez vous connecter."
      default:
        return error || "Une erreur est survenue lors de la connexion."
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle>Erreur d'authentification</CardTitle>
          </div>
          <CardDescription>{getErrorMessage(error)}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
