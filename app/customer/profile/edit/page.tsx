"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

export default function EditProfilePage() {
  const { t } = useLanguage()
  const { toast } = useToast()
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
    
    // Navigate back to profile page after save
    window.history.back()
  }

  return (
    <>
      <div className="min-h-screen pb-20 md:pb-8 pt-10">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header with Back Button */}
          <div className="mb-6 flex items-center gap-4">
            <Link href="/customer/profile">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {t("common.edit")} {t("customer.profile")}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t("customer.updatePersonalInfo") || "Mettez à jour vos informations personnelles"}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-firstName">{t("customer.firstName")}</Label>
                    <Input
                      id="edit-firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-lastName">{t("customer.lastName")}</Label>
                    <Input
                      id="edit-lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email">{t("customer.email")}</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">{t("customer.phone")}</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-country">{t("common.location")}</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger id="edit-country">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="edit-address">{t("customer.address")}</Label>
                  <Input
                    id="edit-address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-city">{t("customer.city")}</Label>
                    <Input
                      id="edit-city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-postalCode">{t("customer.postalCode")}</Label>
                    <Input
                      id="edit-postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end mt-8 pt-6 border-t">
                <Link href="/customer/profile" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full hover:bg-accent">
                    {t("common.cancel")}
                  </Button>
                </Link>
                <Button onClick={handleSaveProfile} className="w-full bg-primary  sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  {t("common.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileBottomNav />
    </>
  )
}