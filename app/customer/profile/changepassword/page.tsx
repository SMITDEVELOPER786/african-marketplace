"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import Link from "next/link"
import { ArrowLeft, Lock, Save } from "lucide-react"

export default function ChangePasswordPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: t("common.error"),
        description: t("customer.fillAllFields") || "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: t("common.error"),
        description: t("customer.passwordMismatch") || "Les mots de passe ne correspondent pas",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: t("common.error"),
        description: t("customer.passwordTooShort") || "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive",
      })
      return
    }

    const hasUpperCase = /[A-Z]/.test(passwordData.newPassword)
    const hasLowerCase = /[a-z]/.test(passwordData.newPassword)
    const hasNumber = /\d/.test(passwordData.newPassword)

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      toast({
        title: t("common.error"),
        description:
          t("customer.passwordWeak") ||
          "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
        variant: "destructive",
      })
      return
    }

    toast({
      title: t("customer.passwordChanged") || "Mot de passe modifié",
      description: t("customer.passwordChangedDesc") || "Votre mot de passe a été changé avec succès.",
    })
    
    // Navigate back to profile page after success
    window.history.back()
  }

  return (
    <>
      <div className="min-h-screen pb-20 md:pb-8 ">
        <div className="mx-auto max-w-md px-4 py-6 sm:px-6 lg:px-8">
          {/* Header with Back Button */}
          <div className="mb-6 flex items-center gap-4">
            <Link href="/customer/profile">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {t("customer.changePassword")}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t("customer.changePasswordDesc") || "Modifiez votre mot de passe pour sécuriser votre compte"}
              </p>
            </div>
          </div>

          {/* Change Password Form */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t("customer.currentPassword")}</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">{t("customer.newPassword")}</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("customer.passwordMinLength") || "Minimum 8 caractères avec majuscule, minuscule et chiffre"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t("customer.confirmPassword")}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end mt-8 pt-6 border-t">
                <Link href="/customer/profile" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full">
                    {t("common.cancel")}
                  </Button>
                </Link>
                <Button 
                  onClick={handleChangePassword} 
                  className="w-full bg-primary sm:w-auto"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {t("common.change")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Conseils de sécurité</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Utilisez un mot de passe unique que vous n'utilisez pas ailleurs</li>
                <li>• Évitez les informations personnelles comme votre nom ou date de naissance</li>
                <li>• Changez votre mot de passe régulièrement</li>
                <li>• Ne partagez jamais votre mot de passe</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileBottomNav />
    </>
  )
}