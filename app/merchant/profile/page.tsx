"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Store,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Camera,
  Save,
  X,
  Eye,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building2,
  Sparkles,
  Video,
  Trash2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MerchantProfilePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [profileCompletion, setProfileCompletion] = useState(65)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "store",
    description: "",
    categories: [] as string[],
    tags: "",
    status: "active",
    siret: "",
    siren: "",
    tva: "",
    rcs: "",
    legalForm: "",
    capital: "",
    ape: "",
    language: "fr",
    currency: "eur",
    timezone: "europe-paris",
    address: "",
    postalCode: "",
    city: "",
    country: "fr",
    region: "",
    complement: "",
    latitude: "",
    longitude: "",
    serviceRadius: "",
    deliveryZones: "",
    directions: "",
    parking: "",
    accessibility: false,
    phone: "",
    phone2: "",
    email: "",
    emailSupport: "",
    website: "",
    contactName: "",
    contactRole: "",
    facebook: "",
    instagram: "",
    twitter: "",
    whatsapp: "",
    tiktok: "",
    linkedin: "",
    youtube: "",
    prepTime: "30",
    maxAdvance: "7",
    videoUrl: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const [openingHours, setOpeningHours] = useState([
    { day: "Lundi", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Mardi", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Mercredi", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Jeudi", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Vendredi", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Samedi", isOpen: true, openTime: "10:00", closeTime: "16:00" },
    { day: "Dimanche", isOpen: false, openTime: "10:00", closeTime: "16:00" },
  ])

  const [specialHours, setSpecialHours] = useState([
    { date: "2025-12-25", reason: "Noël", isOpen: false, openTime: "", closeTime: "" },
  ])

  const handleSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Les informations de votre commerce ont été enregistrées avec succès.",
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setGalleryImages((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Profil du commerce</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Gérez toutes les informations d'identification de votre commerce
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" size="lg" className="w-full gap-2 bg-transparent sm:w-auto">
              <X className="h-4 w-4" />
              Annuler
            </Button>
            <Button size="lg" onClick={handleSave} className="w-full gap-2 sm:w-auto">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </div>

        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Complétude du profil</h3>
                  <span className="text-sm font-bold text-primary">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {profileCompletion < 100
                    ? "Complétez votre profil pour améliorer votre visibilité"
                    : "Votre profil est complet !"}
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent sm:w-auto">
                <Eye className="h-4 w-4" />
                Prévisualiser
              </Button>
            </div>

            {profileCompletion < 100 && (
              <div className="mt-4 space-y-2 rounded-lg border bg-background p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Suggestions d'amélioration
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    Ajoutez un logo pour votre commerce
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    Complétez vos horaires d'ouverture
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    Ajoutez des photos de votre commerce
                  </li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="general" className="text-xs sm:text-sm">
              Général
            </TabsTrigger>
            <TabsTrigger value="location" className="text-xs sm:text-sm">
              Localisation
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-xs sm:text-sm">
              Contact
            </TabsTrigger>
            <TabsTrigger value="hours" className="text-xs sm:text-sm">
              Horaires
            </TabsTrigger>
            <TabsTrigger value="media" className="text-xs sm:text-sm">
              Médias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">
                      Nom du commerce <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="businessName"
                      placeholder="Ex: Afro Delights Market"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">
                      Type d'activité <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleInputChange("businessType", value)}
                    >
                      <SelectTrigger id="businessType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="store">Épicerie / Magasin</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="bakery">Boulangerie</SelectItem>
                        <SelectItem value="butcher">Boucherie</SelectItem>
                        <SelectItem value="market">Marché</SelectItem>
                        <SelectItem value="grocery">Alimentation générale</SelectItem>
                        <SelectItem value="cafe">Café / Salon de thé</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description du commerce <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Décrivez votre commerce, vos spécialités, votre histoire..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Une bonne description aide les clients à mieux vous connaître (min. 100 caractères)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categories">Catégories</Label>
                  <Select>
                    <SelectTrigger id="categories">
                      <SelectValue placeholder="Sélectionnez une ou plusieurs catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="african">Produits africains</SelectItem>
                      <SelectItem value="caribbean">Produits caribéens</SelectItem>
                      <SelectItem value="halal">Halal</SelectItem>
                      <SelectItem value="bio">Bio / Organic</SelectItem>
                      <SelectItem value="vegan">Végétarien / Vegan</SelectItem>
                      <SelectItem value="exotic">Produits exotiques</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      Produits africains
                      <X className="h-3 w-3 cursor-pointer" />
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      Halal
                      <X className="h-3 w-3 cursor-pointer" />
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Mots-clés / Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Ex: épices, manioc, plantain, attiéké..."
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Séparez les mots-clés par des virgules pour améliorer votre référencement
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut du commerce</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Actif - Ouvert aux réservations
                        </div>
                      </SelectItem>
                      <SelectItem value="paused">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          En pause - Temporairement fermé
                        </div>
                      </SelectItem>
                      <SelectItem value="closed">
                        <div className="flex items-center gap-2">
                          <X className="h-4 w-4 text-red-500" />
                          Fermé - Non visible sur la plateforme
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informations légales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siret">Numéro SIRET</Label>
                    <Input
                      id="siret"
                      placeholder="123 456 789 00012"
                      value={formData.siret}
                      onChange={(e) => handleInputChange("siret", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siren">Numéro SIREN</Label>
                    <Input
                      id="siren"
                      placeholder="123 456 789"
                      value={formData.siren}
                      onChange={(e) => handleInputChange("siren", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tva">Numéro TVA intracommunautaire</Label>
                    <Input
                      id="tva"
                      placeholder="FR12345678901"
                      value={formData.tva}
                      onChange={(e) => handleInputChange("tva", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rcs">RCS</Label>
                    <Input
                      id="rcs"
                      placeholder="RCS Paris B 123 456 789"
                      value={formData.rcs}
                      onChange={(e) => handleInputChange("rcs", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="legalForm">Forme juridique</Label>
                    <Select value={formData.legalForm} onValueChange={(value) => handleInputChange("legalForm", value)}>
                      <SelectTrigger id="legalForm">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarl">SARL</SelectItem>
                        <SelectItem value="sas">SAS</SelectItem>
                        <SelectItem value="sasu">SASU</SelectItem>
                        <SelectItem value="eurl">EURL</SelectItem>
                        <SelectItem value="sa">SA</SelectItem>
                        <SelectItem value="ei">Entreprise individuelle</SelectItem>
                        <SelectItem value="auto">Auto-entrepreneur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capital">Capital social</Label>
                    <Input
                      id="capital"
                      placeholder="10 000 €"
                      value={formData.capital}
                      onChange={(e) => handleInputChange("capital", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ape">Code APE / NAF</Label>
                  <Input
                    id="ape"
                    placeholder="Ex: 4711B"
                    value={formData.ape}
                    onChange={(e) => handleInputChange("ape", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Paramètres régionaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue principale</Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eur">Euro (€)</SelectItem>
                        <SelectItem value="usd">Dollar ($)</SelectItem>
                        <SelectItem value="gbp">Livre (£)</SelectItem>
                        <SelectItem value="chf">Franc suisse (CHF)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="europe-berlin">Europe/Berlin (GMT+1)</SelectItem>
                        <SelectItem value="africa-casablanca">Africa/Casablanca (GMT+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Adresse du commerce
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">
                    Adresse complète <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Rue de la République"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Commencez à taper pour obtenir des suggestions d'adresses
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      Code postal <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="postalCode"
                      placeholder="75001"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">
                      Ville <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="Paris"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Pays <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger id="country">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="be">Belgique</SelectItem>
                        <SelectItem value="ch">Suisse</SelectItem>
                        <SelectItem value="lu">Luxembourg</SelectItem>
                        <SelectItem value="de">Allemagne</SelectItem>
                        <SelectItem value="es">Espagne</SelectItem>
                        <SelectItem value="it">Italie</SelectItem>
                        <SelectItem value="nl">Pays-Bas</SelectItem>
                        <SelectItem value="uk">Royaume-Uni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Région / Département</Label>
                  <Input
                    id="region"
                    placeholder="Île-de-France"
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complement">Complément d'adresse</Label>
                  <Input
                    id="complement"
                    placeholder="Bâtiment A, 2ème étage, Porte 12..."
                    value={formData.complement}
                    onChange={(e) => handleInputChange("complement", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Géolocalisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Ajoutez les coordonnées GPS pour améliorer la visibilité de votre commerce sur la carte
                </p>

                {/* Map placeholder */}
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Carte interactive</p>
                      <p className="text-xs text-muted-foreground">Cliquez pour positionner votre commerce</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="48.8566"
                      type="number"
                      step="0.000001"
                      value={formData.latitude}
                      onChange={(e) => handleInputChange("latitude", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="2.3522"
                      type="number"
                      step="0.000001"
                      value={formData.longitude}
                      onChange={(e) => handleInputChange("longitude", e.target.value)}
                    />
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2 bg-transparent" type="button">
                  <MapPin className="h-4 w-4" />
                  Obtenir ma position actuelle
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zone de service / livraison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Définissez la zone géographique dans laquelle vous proposez vos services
                </p>

                <div className="space-y-2">
                  <Label htmlFor="serviceRadius">Rayon de service (km)</Label>
                  <Input
                    id="serviceRadius"
                    type="number"
                    placeholder="5"
                    value={formData.serviceRadius}
                    onChange={(e) => handleInputChange("serviceRadius", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Distance maximale pour les livraisons ou le Click & Collect
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryZones">Zones de livraison spécifiques</Label>
                  <Textarea
                    id="deliveryZones"
                    rows={3}
                    placeholder="Ex: 75001, 75002, 75003, 75004..."
                    value={formData.deliveryZones}
                    onChange={(e) => handleInputChange("deliveryZones", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Listez les codes postaux ou quartiers desservis (séparés par des virgules)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations d'accès</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="directions">Indications d'accès</Label>
                  <Textarea
                    id="directions"
                    rows={3}
                    placeholder="Ex: Métro ligne 1, arrêt Louvre. Bus 21, 27, 39..."
                    value={formData.directions}
                    onChange={(e) => handleInputChange("directions", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parking">Parking</Label>
                  <Select value={formData.parking} onValueChange={(value) => handleInputChange("parking", value)}>
                    <SelectTrigger id="parking">
                      <SelectValue placeholder="Disponibilité du parking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Parking disponible</SelectItem>
                      <SelectItem value="nearby">Parking à proximité</SelectItem>
                      <SelectItem value="street">Stationnement dans la rue</SelectItem>
                      <SelectItem value="none">Pas de parking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessibility">Accessibilité PMR</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="accessibility"
                      checked={formData.accessibility}
                      onCheckedChange={(checked) => handleInputChange("accessibility", checked)}
                    />
                    <Label htmlFor="accessibility" className="font-normal">
                      Commerce accessible aux personnes à mobilité réduite
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Coordonnées de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Téléphone principal <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Select defaultValue="+33">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+33">+33</SelectItem>
                          <SelectItem value="+32">+32</SelectItem>
                          <SelectItem value="+41">+41</SelectItem>
                          <SelectItem value="+49">+49</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        placeholder="6 12 34 56 78"
                        className="flex-1"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone2">Téléphone secondaire</Label>
                    <div className="flex gap-2">
                      <Select defaultValue="+33">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+33">+33</SelectItem>
                          <SelectItem value="+32">+32</SelectItem>
                          <SelectItem value="+41">+41</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone2"
                        placeholder="1 23 45 67 89"
                        className="flex-1"
                        value={formData.phone2}
                        onChange={(e) => handleInputChange("phone2", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email principal <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@commerce.fr"
                        className="pl-9"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailSupport">Email support</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="emailSupport"
                        type="email"
                        placeholder="support@commerce.fr"
                        className="pl-9"
                        value={formData.emailSupport}
                        onChange={(e) => handleInputChange("emailSupport", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.commerce.fr"
                      className="pl-9"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="mb-3 font-semibold">Personne de contact</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Nom complet</Label>
                      <Input
                        id="contactName"
                        placeholder="Jean Dupont"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactRole">Fonction</Label>
                      <Input
                        id="contactRole"
                        placeholder="Gérant"
                        value={formData.contactRole}
                        onChange={(e) => handleInputChange("contactRole", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Réseaux sociaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Ajoutez vos profils sur les réseaux sociaux pour améliorer votre visibilité
                </p>

                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="facebook"
                      placeholder="https://facebook.com/votre-page"
                      className="pl-9"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange("facebook", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/votre-compte"
                      className="pl-9"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/votre-compte"
                      className="pl-9"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange("twitter", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Business</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="whatsapp"
                      placeholder="+33 6 12 34 56 78"
                      className="pl-9"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <Input
                    id="tiktok"
                    placeholder="https://tiktok.com/@votre-compte"
                    value={formData.tiktok}
                    onChange={(e) => handleInputChange("tiktok", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/company/votre-entreprise"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    placeholder="https://youtube.com/@votre-chaine"
                    value={formData.youtube}
                    onChange={(e) => handleInputChange("youtube", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horaires d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Définissez vos horaires d'ouverture pour chaque jour de la semaine
                </p>

                <div className="space-y-3">
                  {openingHours.map((schedule, index) => (
                    <div
                      key={schedule.day}
                      className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-3 sm:w-32">
                        <Switch
                          checked={schedule.isOpen}
                          onCheckedChange={(checked) => {
                            const newHours = [...openingHours]
                            newHours[index].isOpen = checked
                            setOpeningHours(newHours)
                          }}
                        />
                        <Label className="font-semibold">{schedule.day}</Label>
                      </div>

                      {schedule.isOpen ? (
                        <div className="flex flex-1 items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-muted-foreground">De</Label>
                            <Input
                              type="time"
                              value={schedule.openTime}
                              onChange={(e) => {
                                const newHours = [...openingHours]
                                newHours[index].openTime = e.target.value
                                setOpeningHours(newHours)
                              }}
                              className="w-32"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-muted-foreground">à</Label>
                            <Input
                              type="time"
                              value={schedule.closeTime}
                              onChange={(e) => {
                                const newHours = [...openingHours]
                                newHours[index].closeTime = e.target.value
                                setOpeningHours(newHours)
                              }}
                              className="w-32"
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Fermé</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newHours = openingHours.map((h) => ({
                        ...h,
                        isOpen: true,
                        openTime: "09:00",
                        closeTime: "18:00",
                      }))
                      setOpeningHours(newHours)
                    }}
                  >
                    Appliquer 9h-18h à tous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newHours = openingHours.map((h, i) => ({
                        ...h,
                        isOpen: i < 6,
                      }))
                      setOpeningHours(newHours)
                    }}
                  >
                    Fermer le dimanche
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newHours = openingHours.map((h) => ({
                        ...h,
                        isOpen: false,
                      }))
                      setOpeningHours(newHours)
                    }}
                  >
                    Tout fermer
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Horaires exceptionnels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Définissez des horaires spéciaux pour les jours fériés, vacances ou événements
                </p>

                {specialHours.map((special, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{special.reason}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={special.date}
                          onChange={(e) => {
                            const newSpecialHours = [...specialHours]
                            newSpecialHours[index].date = e.target.value
                            setSpecialHours(newSpecialHours)
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Statut</Label>
                        <Select
                          defaultValue={special.isOpen ? "open" : "closed"}
                          onValueChange={(value) => {
                            const newSpecialHours = [...specialHours]
                            newSpecialHours[index].isOpen = value === "open"
                            setSpecialHours(newSpecialHours)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Ouvert</SelectItem>
                            <SelectItem value="closed">Fermé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {special.isOpen && (
                      <div className="mt-3 flex gap-3">
                        <div className="flex-1 space-y-2">
                          <Label>Ouverture</Label>
                          <Input
                            type="time"
                            value={special.openTime}
                            onChange={(e) => {
                              const newSpecialHours = [...specialHours]
                              newSpecialHours[index].openTime = e.target.value
                              setSpecialHours(newSpecialHours)
                            }}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label>Fermeture</Label>
                          <Input
                            type="time"
                            value={special.closeTime}
                            onChange={(e) => {
                              const newSpecialHours = [...specialHours]
                              newSpecialHours[index].closeTime = e.target.value
                              setSpecialHours(newSpecialHours)
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Calendar className="h-4 w-4" />
                  Ajouter des horaires exceptionnels
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temps de préparation Click & Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Définissez le délai minimum nécessaire pour préparer une réservation
                </p>

                <div className="space-y-2">
                  <Label htmlFor="prepTime">Temps de préparation minimum</Label>
                  <Select value={formData.prepTime} onValueChange={(value) => handleInputChange("prepTime", value)}>
                    <SelectTrigger id="prepTime">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 heure</SelectItem>
                      <SelectItem value="120">2 heures</SelectItem>
                      <SelectItem value="240">4 heures</SelectItem>
                      <SelectItem value="1440">24 heures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAdvance">Réservation maximum à l'avance</Label>
                  <Select value={formData.maxAdvance} onValueChange={(value) => handleInputChange("maxAdvance", value)}>
                    <SelectTrigger id="maxAdvance">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 jour</SelectItem>
                      <SelectItem value="3">3 jours</SelectItem>
                      <SelectItem value="7">7 jours</SelectItem>
                      <SelectItem value="14">14 jours</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Logo et visuels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>
                    Logo du commerce <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Format recommandé : carré (500x500px minimum), PNG ou JPG
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-muted">
                      {logoPreview ? (
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                      <Button
                        variant="outline"
                        className="gap-2 bg-transparent"
                        onClick={() => document.getElementById("logo-upload")?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        {logoPreview ? "Changer le logo" : "Télécharger le logo"}
                      </Button>
                      {logoPreview && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-transparent text-destructive"
                          onClick={() => setLogoPreview(null)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Supprimer
                        </Button>
                      )}
                      <p className="text-xs text-muted-foreground">Max 5MB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Bannière / Photo de couverture</Label>
                  <p className="text-sm text-muted-foreground">Format recommandé : 1920x600px, PNG ou JPG</p>
                  <div className="space-y-3">
                    <div className="flex aspect-[16/5] w-full items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-muted">
                      {bannerPreview ? (
                        <img
                          src={bannerPreview || "/placeholder.svg"}
                          alt="Banner preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">Cliquez pour télécharger une bannière</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        id="banner-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerUpload}
                      />
                      <Button
                        variant="outline"
                        className="flex-1 gap-2 bg-transparent"
                        onClick={() => document.getElementById("banner-upload")?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        {bannerPreview ? "Changer la bannière" : "Télécharger la bannière"}
                      </Button>
                      {bannerPreview && (
                        <Button
                          variant="outline"
                          className="gap-2 bg-transparent text-destructive"
                          onClick={() => setBannerPreview(null)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Photos du commerce</Label>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez jusqu'à 10 photos de votre commerce (intérieur, extérieur, produits...)
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute right-2 top-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {galleryImages.length < 10 && (
                      <div
                        className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-muted transition-colors hover:bg-muted/80"
                        onClick={() => document.getElementById("gallery-upload")?.click()}
                      >
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="gallery-upload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryUpload}
                  />
                  {galleryImages.length < 10 && (
                    <Button
                      variant="outline"
                      className="w-full gap-2 bg-transparent"
                      onClick={() => document.getElementById("gallery-upload")?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Ajouter des photos ({galleryImages.length}/10)
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Vidéo de présentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Ajoutez une vidéo YouTube ou Vimeo pour présenter votre commerce
                </p>
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">URL de la vidéo</Label>
                  <Input
                    id="videoUrl"
                    placeholder="https://youtube.com/watch?v=..."
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                  />
                </div>

                {/* Video preview placeholder */}
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Aperçu de la vidéo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Conseils pour vos visuels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Utilisez des photos de haute qualité et bien éclairées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Montrez l'intérieur et l'extérieur de votre commerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Mettez en avant vos produits phares</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Évitez les photos floues ou mal cadrées</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
