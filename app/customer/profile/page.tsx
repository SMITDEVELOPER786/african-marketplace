"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import Link from "next/link"
import { Lock, ShoppingBag, Star } from "lucide-react"

export default function ProfilePage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    country: "US",
    address: "123 Main Street",
    city: "New York",
    postalCode: "10001",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const countries = [
    { code: "US", name: "États-Unis", flag: "🇺🇸" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "DE", name: "Allemagne", flag: "🇩🇪" },
    { code: "GB", name: "Royaume-Uni", flag: "🇬🇧" },
    { code: "ES", name: "Espagne", flag: "🇪🇸" },
    { code: "IT", name: "Italie", flag: "🇮🇹" },
    { code: "BE", name: "Belgique", flag: "🇧🇪" },
    { code: "CH", name: "Suisse", flag: "🇨🇭" },
    { code: "NL", name: "Pays-Bas", flag: "🇳🇱" },
  ]

  const handleSaveProfile = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t("common.error"),
        description: t("customer.invalidEmail") || "Adresse email invalide",
        variant: "destructive",
      })
      return
    }

    const phoneRegex = /^\+?[\d\s-()]+$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      toast({
        title: t("common.error"),
        description: t("customer.invalidPhone") || "Numéro de téléphone invalide",
        variant: "destructive",
      })
      return
    }

    if (!formData.firstName || !formData.lastName) {
      toast({
        title: t("common.error"),
        description: t("customer.fillRequiredFields") || "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    toast({
      title: t("customer.profileUpdated") || "Profil mis à jour",
      description: t("customer.profileUpdatedDesc") || "Vos informations ont été enregistrées avec succès.",
    })
    setIsEditDialogOpen(false)
  }

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
    setIsPasswordDialogOpen(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const selectedCountry = countries.find((c) => c.code === formData.country)

  return (
    <>
      <div className="min-h-screen pb-20 md:pb-8 pt-10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
           
<div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-center sm:text-left sm:gap-6">
  <Avatar className="h-20 w-20 border-4 border-background shadow-lg sm:h-24 sm:w-24">
    <AvatarImage src="/professional-portrait.png" alt="John Doe" />
    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold sm:text-2xl">
      JD
    </AvatarFallback>
  </Avatar>
  <div>
    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
      {formData.firstName} {formData.lastName}
    </h1>
    <p className="text-muted-foreground mt-1 text-sm sm:text-base">{formData.email}</p>
  </div>
</div>




            <Link href="/customer/profile/edit">
  <Button size="lg" className="w-full bg-[oklch(0.55_0.15_35)] sm:w-auto">
    {t("common.edit")} {t("customer.profile")}
  </Button>
</Link>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{t("customer.personalInfo")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">
                      {t("customer.firstName")} {t("customer.lastName")}
                    </p>
                    <p className="text-sm font-medium sm:text-base">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">{t("customer.email")}</p>
                    <p className="text-sm font-medium sm:text-base">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">{t("common.location")}</p>
                    <p className="flex items-center gap-2 text-sm font-medium sm:text-base">
                      <span>{selectedCountry?.flag}</span>
                      <span>{selectedCountry?.name}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg sm:text-xl">{t("common.security")}</CardTitle>
              <Link href="/customer/profile/changepassword">
  <Button variant="outline" size="sm" className="w-full sm:w-auto bg-accent text-white">
    <Lock className="mr-2 h-4 w-4" />
    {t("customer.changePassword")}
  </Button>
</Link>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("customer.lastModified")}: <span className="font-medium">15 janvier 2025</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ShoppingBag className="h-5 w-5" />
                  {t("customer.orders")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  {t("customer.noOrders") || "Vous n'avez pas encore passé de commande"}
                </p>
                <Link href="/customer/orders">
                  <Button variant="outline" className="w-full bg-accent text-white sm:w-auto">
                    {t("customer.viewAllOrders")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Star className="h-5 w-5" />
                  {t("customer.reviews")}
                </CardTitle>
                <Link href="/customer/reviews">
                  <Button className="w-full bg-[oklch(0.55_0.15_35)]  sm:w-auto">{t("customer.addReview")}</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {t("customer.reviewsCount")}: <span className="font-medium">0</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </>
  )
}
