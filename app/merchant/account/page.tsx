"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Building2,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Upload,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

export default function MerchantAccountPage() {
  const { toast } = useToast()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    avatar: "",
  })

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "Ma Boutique Africaine",
    siret: "123 456 789 00012",
    address: "123 Rue de la République",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    website: "https://maboutique.com",
    description: "Produits africains authentiques",
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    lowStockAlerts: true,
    reviewNotifications: true,
    marketingEmails: false,
  })

  const handleSavePersonalInfo = () => {
    toast({
      title: "Informations enregistrées",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    })
  }

  const handleSaveBusinessInfo = () => {
    toast({
      title: "Informations enregistrées",
      description: "Les informations de votre entreprise ont été mises à jour avec succès.",
    })
  }

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      })
      return
    }

    if (security.newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été changé avec succès.",
    })

    setSecurity({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: security.twoFactorEnabled,
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de notification ont été mises à jour.",
    })
  }

  return (
    <>
      <div className="min-h-screen bg-background pb-20 md:pb-6">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 max-w-7xl">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Mon compte</h1>
            <p className="mt-1 md:mt-2 text-sm md:text-base text-muted-foreground">
              Gérez vos informations personnelles et professionnelles
            </p>
          </div>

          <Tabs defaultValue="personal" className="space-y-4 md:space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1 h-auto p-1">
              <TabsTrigger value="personal" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-2.5">
                <User className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Personnel</span>
              </TabsTrigger>
              <TabsTrigger value="business" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-2.5">
                <Building2 className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Entreprise</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-2.5">
                <Lock className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Sécurité</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-2.5">
                <Bell className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-2.5">
                <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Facturation</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 md:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Informations personnelles</CardTitle>
                  <CardDescription className="text-sm">
                    Gérez vos informations personnelles et votre photo de profil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                    <Avatar className="h-20 w-20 md:h-24 md:w-24">
                      <AvatarImage src={personalInfo.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xl md:text-2xl">
                        {personalInfo.firstName[0]}
                        {personalInfo.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <h3 className="font-semibold text-base md:text-lg">
                        {personalInfo.firstName} {personalInfo.lastName}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{personalInfo.email}</p>
                      <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto bg-transparent">
                        <Upload className="h-4 w-4" />
                        Changer la photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    />
                  </div>

                  <Button onClick={handleSavePersonalInfo} className="w-full sm:w-auto gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="business" className="space-y-4 md:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Informations de l'entreprise</CardTitle>
                  <CardDescription className="text-sm">
                    Gérez les informations légales et commerciales de votre entreprise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nom commercial</Label>
                    <Input
                      id="businessName"
                      value={businessInfo.businessName}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, businessName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siret">SIRET</Label>
                    <Input
                      id="siret"
                      value={businessInfo.siret}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, siret: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Adresse
                    </Label>
                    <Input
                      id="address"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        value={businessInfo.city}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        value={businessInfo.postalCode}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, postalCode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      value={businessInfo.country}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, country: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Site web
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={businessInfo.website}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={businessInfo.description}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                    />
                  </div>

                  <Button onClick={handleSaveBusinessInfo} className="w-full sm:w-auto gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 md:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Mot de passe</CardTitle>
                  <CardDescription className="text-sm">Modifiez votre mot de passe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={security.newPassword}
                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    />
                  </div>

                  <Button onClick={handleChangePassword} className="w-full sm:w-auto">
                    Changer le mot de passe
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Authentification à deux facteurs
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="font-medium text-sm md:text-base">Authentification à deux facteurs (2FA)</p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {security.twoFactorEnabled
                          ? "Votre compte est protégé par 2FA"
                          : "Activez la 2FA pour plus de sécurité"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {security.twoFactorEnabled && <Badge className="bg-green-500">Activé</Badge>}
                      <Switch
                        checked={security.twoFactorEnabled}
                        onCheckedChange={(checked) => setSecurity({ ...security, twoFactorEnabled: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 md:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Préférences de notification</CardTitle>
                  <CardDescription className="text-sm">Choisissez comment vous souhaitez être notifié</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 py-3 border-b">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm md:text-base">Notifications par email</Label>
                        <p className="text-xs md:text-sm text-muted-foreground">Recevoir des notifications par email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 py-3 border-b">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm md:text-base">Notifications SMS</Label>
                        <p className="text-xs md:text-sm text-muted-foreground">Recevoir des notifications par SMS</p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 py-3 border-b">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm md:text-base">Nouvelles commandes</Label>
                        <p className="text-xs md:text-sm text-muted-foreground">Être notifié des nouvelles commandes</p>
                      </div>
                      <Switch
                        checked={notifications.orderNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, orderNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 py-3 border-b">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm md:text-base">Alertes de stock faible</Label>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Être alerté quand le stock est faible
                        </p>
                      </div>
                      <Switch
                        checked={notifications.lowStockAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, lowStockAlerts: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 py-3 border-b">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm md:text-base">Nouveaux avis</Label>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Être notifié des nouveaux avis clients
                        </p>
                      </div>
                      <Switch
                        checked={notifications.reviewNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, reviewNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 py-3">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm md:text-base">Emails marketing</Label>
                        <p className="text-xs md:text-sm text-muted-foreground">Recevoir des offres et promotions</p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveNotifications} className="w-full sm:w-auto gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer les préférences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4 md:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Facturation et abonnement</CardTitle>
                  <CardDescription className="text-sm">
                    Gérez votre abonnement et vos informations de facturation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Les informations de facturation seront disponibles prochainement.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <MobileBottomNav userType="merchant" />
    </>
  )
}
