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
import { Lock, ShoppingBag, Star, Calendar, MapPin, Phone } from "lucide-react"

export default function ProfilePage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  
  // Enhanced mock data with more realistic information
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+225 07 12 34 56 78",
    country: "CI",
    address: "123 Avenue de la République",
    city: "Abidjan",
    postalCode: "00225",
    joinDate: "2024-01-15",
    loyaltyPoints: 1250
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const countries = [
    { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "SN", name: "Sénégal", flag: "🇸🇳" },
    { code: "CM", name: "Cameroun", flag: "🇨🇲" },
    { code: "BE", name: "Belgique", flag: "🇧🇪" },
    { code: "CH", name: "Suisse", flag: "🇨🇭" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "US", name: "États-Unis", flag: "🇺🇸" },
  ]

  // Mock orders data for better UI
  const mockOrders = [
    { id: 1, date: "2024-12-15", total: 45000, status: "Livrée", items: 3 },
    { id: 2, date: "2024-12-08", total: 28000, status: "En traitement", items: 2 },
  ]

  // Mock reviews data
  const mockReviews = [
    { id: 1, product: "Tissu Wax", rating: 5, date: "2024-12-10" },
    { id: 2, product: "Huile de Palme", rating: 4, date: "2024-12-05" },
  ]

  const handleSaveProfile = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur",
        description: "Adresse email invalide",
        variant: "destructive",
      })
      return
    }

    const phoneRegex = /^\+?[\d\s-()]+$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      toast({
        title: "Erreur",
        description: "Numéro de téléphone invalide",
        variant: "destructive",
      })
      return
    }

    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    })
    setIsEditDialogOpen(false)
  }

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive",
      })
      return
    }

    const hasUpperCase = /[A-Z]/.test(passwordData.newPassword)
    const hasLowerCase = /[a-z]/.test(passwordData.newPassword)
    const hasNumber = /\d/.test(passwordData.newPassword)

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été changé avec succès.",
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
                <AvatarImage src="/professional-avatar.jpg" alt={formData.firstName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold sm:text-2xl">
                  {formData.firstName[0]}{formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {formData.firstName} {formData.lastName}
                </h1>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">{formData.email}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Membre depuis {new Date(formData.joinDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{formData.loyaltyPoints} points fidélité</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/customer/profile/edit">
              <Button size="lg" className="w-full bg-[oklch(0.55_0.15_35)] sm:w-auto">
                Modifier le profil
              </Button>
            </Link>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">
                      Prénom
                    </p>
                    <p className="text-sm font-medium sm:text-base">
                      {formData.firstName}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">
                      Nom
                    </p>
                    <p className="text-sm font-medium sm:text-base">
                      {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">Email</p>
                    <p className="text-sm font-medium sm:text-base">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">Téléphone</p>
                    <p className="flex items-center gap-2 text-sm font-medium sm:text-base">
                      <Phone className="h-4 w-4" />
                      <span>{formData.phone}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">Pays</p>
                    <p className="flex items-center gap-2 text-sm font-medium sm:text-base">
                      <span>{selectedCountry?.flag}</span>
                      <span>{selectedCountry?.name}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium sm:text-sm">Adresse</p>
                    <p className="flex items-center gap-2 text-sm font-medium sm:text-base">
                      <MapPin className="h-4 w-4" />
                      <span>{formData.address}, {formData.city}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg sm:text-xl">Sécurité</CardTitle>
                <Link href="/customer/profile/changepassword">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto bg-accent text-white">
                    <Lock className="mr-2 h-4 w-4" />
                    Changer le mot de passe
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dernière modification: <span className="font-medium">15 janvier 2025</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ShoppingBag className="h-5 w-5" />
                  Commandes ({mockOrders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockOrders.length === 0 ? (
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    Vous n'avez pas encore passé de commande
                  </p>
                ) : (
                  <div className="space-y-3">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Commande #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString('fr-FR')} • {order.items} article(s)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{order.total.toLocaleString()} FCFA</p>
                          <p className="text-sm text-green-600">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link href="/customer/orders" className="mt-4 inline-block">
                  <Button variant="outline" className="w-full bg-accent text-white sm:w-auto">
                    Voir toutes les commandes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Star className="h-5 w-5" />
                  Avis ({mockReviews.length})
                </CardTitle>
                <Link href="/customer/reviews">
                  <Button className="w-full bg-[oklch(0.55_0.15_35)] sm:w-auto">Ajouter un avis</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {mockReviews.length === 0 ? (
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Vous n'avez pas encore écrit d'avis
                  </p>
                ) : (
                  <div className="space-y-3">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{review.product}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </>
  )
}