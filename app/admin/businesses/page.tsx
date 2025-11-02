"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MoreVertical,
  CheckCircle2,
  Ban,
  Eye,
  Crown,
  MapPin,
  Store,
  Clock,
  DollarSign,
  Star,
  Mail,
  MessageCircle,
  Edit,
  Trash2,
  FileText,
  Download,
  X,
  Upload,
  Calendar,
  Phone,
  Building2,
  Users,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const businesses = [
  {
    id: "1",
    name: "Afro Delights Market",
    owner: "John Doe",
    ownerEmail: "john@example.com",
    ownerPhone: "+33 6 12 34 56 78",
    type: "store" as const,
    status: "active" as const,
    isPremium: true,
    rating: 4.8,
    orders: 156,
    revenue: 12450,
    joinDate: "2024-12-01",
    city: "Paris",
    country: "France",
    address: "123 Rue de la République",
    postalCode: "75001",
    phone: "+33 1 23 45 67 89",
    email: "contact@afrodelights.com",
    website: "www.afrodelights.com",
    siret: "123 456 789 00012",
    description: "Épicerie africaine proposant des produits authentiques",
    categories: ["Épicerie", "Produits frais", "Épices"],
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Mama Africa Restaurant",
    owner: "Jane Smith",
    ownerEmail: "jane@example.com",
    ownerPhone: "+33 6 23 45 67 89",
    type: "restaurant" as const,
    status: "active" as const,
    isPremium: true,
    rating: 4.9,
    orders: 203,
    revenue: 18900,
    joinDate: "2024-11-15",
    city: "Lyon",
    country: "France",
    address: "45 Avenue Jean Jaurès",
    postalCode: "69007",
    phone: "+33 4 78 90 12 34",
    email: "contact@mamaafrica.com",
    website: "www.mamaafrica.com",
    siret: "987 654 321 00012",
    description: "Restaurant africain traditionnel",
    categories: ["Restaurant", "Cuisine africaine", "Plats à emporter"],
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Sahel Spice Market",
    owner: "Mike Johnson",
    ownerEmail: "mike@example.com",
    ownerPhone: "+33 6 34 56 78 90",
    type: "store" as const,
    status: "pending" as const,
    isPremium: false,
    rating: 0,
    orders: 0,
    revenue: 0,
    joinDate: "2025-01-18",
    city: "Marseille",
    country: "France",
    address: "78 Boulevard de la Libération",
    postalCode: "13001",
    phone: "+33 4 91 23 45 67",
    email: "contact@sahelspice.com",
    website: "",
    siret: "456 789 123 00012",
    description: "Épices et condiments africains",
    categories: ["Épicerie", "Épices"],
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Jollof Palace",
    owner: "Sarah Williams",
    ownerEmail: "sarah@example.com",
    ownerPhone: "+33 6 45 67 89 01",
    type: "restaurant" as const,
    status: "suspended" as const,
    isPremium: false,
    rating: 4.6,
    orders: 89,
    revenue: 7800,
    joinDate: "2024-10-20",
    city: "Toulouse",
    country: "France",
    address: "12 Rue des Fleurs",
    postalCode: "31000",
    phone: "+33 5 61 23 45 67",
    email: "contact@jollofpalace.com",
    website: "www.jollofpalace.com",
    siret: "321 654 987 00012",
    description: "Spécialités de riz jollof",
    categories: ["Restaurant", "Cuisine ouest-africaine"],
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Afro Cuisine Express",
    owner: "David Brown",
    ownerEmail: "david@example.com",
    ownerPhone: "+33 6 56 78 90 12",
    type: "restaurant" as const,
    status: "active" as const,
    isPremium: false,
    rating: 4.7,
    orders: 134,
    revenue: 11200,
    joinDate: "2024-09-10",
    city: "Paris",
    country: "France",
    address: "89 Avenue de la République",
    postalCode: "75011",
    phone: "+33 1 43 56 78 90",
    email: "contact@afrocuisine.com",
    website: "",
    siret: "789 123 456 00012",
    description: "Restauration rapide africaine",
    categories: ["Restaurant", "Fast-food", "Livraison"],
    logo: "/placeholder.svg?height=100&width=100",
  },
]

export default function AdminBusinessesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [subscriptionFilter, setSubscriptionFilter] = useState("all")

  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([])
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<(typeof businesses)[0] | null>(null)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")

  const filteredBusinesses = businesses.filter((business) => {
    // Tab filter
    if (activeTab === "pending" && business.status !== "pending") return false
    if (activeTab === "active" && business.status !== "active") return false
    if (activeTab === "suspended" && business.status !== "suspended") return false

    // Search filter
    if (
      searchQuery &&
      !business.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !business.owner.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // City filter
    if (cityFilter !== "all" && business.city !== cityFilter) return false

    // Country filter
    if (countryFilter !== "all" && business.country !== countryFilter) return false

    // Type filter
    if (typeFilter !== "all") {
      if (typeFilter === "store" && business.type !== "store") return false
      if (typeFilter === "restaurant" && business.type !== "restaurant") return false
    }

    if (subscriptionFilter !== "all") {
      if (subscriptionFilter === "premium" && !business.isPremium) return false
      if (subscriptionFilter === "standard" && business.isPremium) return false
    }

    return true
  })

  const cities = Array.from(new Set(businesses.map((b) => b.city)))
  const countries = Array.from(new Set(businesses.map((b) => b.country)))

  const stats = {
    total: businesses.length,
    active: businesses.filter((b) => b.status === "active").length,
    pending: businesses.filter((b) => b.status === "pending").length,
    revenue: businesses.reduce((sum, b) => sum + b.revenue, 0),
    avgRating:
      businesses.filter((b) => b.rating > 0).reduce((sum, b) => sum + b.rating, 0) /
      businesses.filter((b) => b.rating > 0).length,
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBusinesses(filteredBusinesses.map((b) => b.id))
    } else {
      setSelectedBusinesses([])
    }
  }

  const handleSelectBusiness = (businessId: string, checked: boolean) => {
    if (checked) {
      setSelectedBusinesses([...selectedBusinesses, businessId])
    } else {
      setSelectedBusinesses(selectedBusinesses.filter((id) => id !== businessId))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`[v0] Bulk action: ${action} for businesses:`, selectedBusinesses)
    // Implement bulk actions here
    setSelectedBusinesses([])
  }

  const handleSendEmail = () => {
    console.log("[v0] Sending email:", { subject: emailSubject, message: emailMessage, to: selectedBusinesses })
    setShowEmailModal(false)
    setEmailSubject("")
    setEmailMessage("")
    setSelectedBusinesses([])
  }

  const handleViewDetail = (business: (typeof businesses)[0]) => {
    setSelectedBusiness(business)
    setShowDetailModal(true)
  }

  const handleEditBusiness = (business: (typeof businesses)[0]) => {
    setSelectedBusiness(business)
    setShowEditModal(true)
  }

  const handleWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Bonjour ${name}, `)
    window.open(`https://wa.me/${phone.replace(/\s/g, "")}?text=${message}`, "_blank")
  }

  return (
    <div className="space-y-4 p-3">
      <div>
        <h1 className="text-3xl font-bold">Gestion des Commerces</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez tous les commerces et restaurants inscrits sur la plateforme
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Commerces</p>
                <p className="mt-1 text-2xl font-bold">{stats.total}</p>
              </div>
              <Store className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Actifs</p>
                <p className="mt-1 text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-green-600">+{Math.round((stats.active / stats.total) * 100)}% du total</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">En attente</p>
                <p className="mt-1 text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-orange-600">Nécessitent approbation</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenus ce mois</p>
                <p className="mt-1 text-2xl font-bold">€{stats.revenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% vs mois dernier</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Note moyenne</p>
                <p className="mt-1 text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Sur 5 étoiles</p>
              </div>
              <Star className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom ou propriétaire..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les pays</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="store">Commerce</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>

              <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Abonnement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les abonnements</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tous ({businesses.length})</TabsTrigger>
          <TabsTrigger value="pending">
            En attente ({businesses.filter((b) => b.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="active">Actifs ({businesses.filter((b) => b.status === "active").length})</TabsTrigger>
          <TabsTrigger value="suspended">
            Suspendus ({businesses.filter((b) => b.status === "suspended").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {selectedBusinesses.length > 0 && (
            <Card className="mb-4 border-primary">
              <CardContent className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <Checkbox checked={true} />
                  <span className="text-sm font-medium">{selectedBusinesses.length} commerce(s) sélectionné(s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowEmailModal(true)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer un email
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("approve")}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approuver
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("suspend")}>
                    <Ban className="mr-2 h-4 w-4" />
                    Suspendre
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")}>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedBusinesses([])}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">
                        <Checkbox
                          checked={
                            selectedBusinesses.length === filteredBusinesses.length && filteredBusinesses.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-3 text-left text-sm font-medium">Commerce</th>
                      <th className="p-3 text-left text-sm font-medium">Propriétaire</th>
                      <th className="p-3 text-left text-sm font-medium">Type</th>
                      <th className="p-3 text-left text-sm font-medium">Localisation</th>
                      <th className="p-3 text-left text-sm font-medium">Statut</th>
                      <th className="p-3 text-left text-sm font-medium">Note</th>
                      <th className="p-3 text-left text-sm font-medium">Réservations</th>
                      <th className="p-3 text-left text-sm font-medium">Inscription</th>
                      <th className="p-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBusinesses.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="p-12 text-center text-muted-foreground">
                          Aucun commerce trouvé
                        </td>
                      </tr>
                    ) : (
                      filteredBusinesses.map((business) => (
                        <tr key={business.id} className="border-b last:border-0">
                          <td className="p-3">
                            <Checkbox
                              checked={selectedBusinesses.includes(business.id)}
                              onCheckedChange={(checked) => handleSelectBusiness(business.id, checked as boolean)}
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{business.name}</span>
                              {business.isPremium && <Crown className="h-4 w-4 text-secondary" />}
                            </div>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{business.owner}</td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-xs">
                              {business.type === "store" ? "Commerce" : "Restaurant"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {business.city}, {business.country}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge
                              className="text-xs"
                              variant={
                                business.status === "active"
                                  ? "default"
                                  : business.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {business.status === "active"
                                ? "Actif"
                                : business.status === "pending"
                                  ? "En attente"
                                  : "Suspendu"}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {business.rating > 0 ? business.rating.toFixed(1) : "N/A"}
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{business.orders}</td>
                          <td className="p-3 text-xs text-muted-foreground">{business.joinDate}</td>
                          <td className="p-3">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setSelectedBusiness(business)
                                  setShowEmailModal(true)
                                }}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleWhatsApp(business.ownerPhone, business.owner)}
                              >
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="gap-2" onClick={() => handleViewDetail(business)}>
                                    <Eye className="h-4 w-4" />
                                    Voir détails
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2" onClick={() => handleEditBusiness(business)}>
                                    <Edit className="h-4 w-4" />
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2">
                                    <FileText className="h-4 w-4" />
                                    Voir les réservations
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2">
                                    <Star className="h-4 w-4" />
                                    Voir les avis
                                  </DropdownMenuItem>
                                  <Separator className="my-1" />
                                  {business.status === "pending" && (
                                    <DropdownMenuItem className="gap-2">
                                      <CheckCircle2 className="h-4 w-4" />
                                      Approuver
                                    </DropdownMenuItem>
                                  )}
                                  {business.status === "active" && (
                                    <DropdownMenuItem className="gap-2 text-destructive">
                                      <Ban className="h-4 w-4" />
                                      Suspendre
                                    </DropdownMenuItem>
                                  )}
                                  {business.status === "suspended" && (
                                    <DropdownMenuItem className="gap-2">
                                      <CheckCircle2 className="h-4 w-4" />
                                      Réactiver
                                    </DropdownMenuItem>
                                  )}
                                  <Separator className="my-1" />
                                  <DropdownMenuItem className="gap-2 text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Envoyer un email</DialogTitle>
            <DialogDescription>
              {selectedBusiness
                ? `Envoyer un email à ${selectedBusiness.name}`
                : `Envoyer un email à ${selectedBusinesses.length} commerce(s)`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-subject">Sujet</Label>
              <Input
                id="email-subject"
                placeholder="Objet de l'email"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                placeholder="Votre message..."
                rows={6}
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendEmail}>
              <Mail className="mr-2 h-4 w-4" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBusiness && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedBusiness.name}
                  {selectedBusiness.isPremium && <Crown className="h-5 w-5 text-secondary" />}
                </DialogTitle>
                <DialogDescription>Détails complets du commerce</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Business Info */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedBusiness.logo || "/placeholder.svg"} />
                    <AvatarFallback>{selectedBusiness.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{selectedBusiness.type === "store" ? "Commerce" : "Restaurant"}</Badge>
                      <Badge
                        variant={
                          selectedBusiness.status === "active"
                            ? "default"
                            : selectedBusiness.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {selectedBusiness.status === "active"
                          ? "Actif"
                          : selectedBusiness.status === "pending"
                            ? "En attente"
                            : "Suspendu"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedBusiness.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedBusiness.categories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Star className="mx-auto h-6 w-6 text-secondary mb-2" />
                        <p className="text-2xl font-bold">
                          {selectedBusiness.rating > 0 ? selectedBusiness.rating.toFixed(1) : "N/A"}
                        </p>
                        <p className="text-xs text-muted-foreground">Note moyenne</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <FileText className="mx-auto h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-2xl font-bold">{selectedBusiness.orders}</p>
                        <p className="text-xs text-muted-foreground">Réservations</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <DollarSign className="mx-auto h-6 w-6 text-green-600 mb-2" />
                        <p className="text-2xl font-bold">€{selectedBusiness.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Revenus</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Calendar className="mx-auto h-6 w-6 text-purple-600 mb-2" />
                        <p className="text-2xl font-bold">{selectedBusiness.joinDate}</p>
                        <p className="text-xs text-muted-foreground">Inscription</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="mb-3 font-semibold flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Coordonnées
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Adresse</Label>
                      <p className="text-sm">{selectedBusiness.address}</p>
                      <p className="text-sm">
                        {selectedBusiness.postalCode} {selectedBusiness.city}
                      </p>
                      <p className="text-sm">{selectedBusiness.country}</p>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Téléphone</Label>
                        <p className="text-sm">{selectedBusiness.phone}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Email</Label>
                        <p className="text-sm">{selectedBusiness.email}</p>
                      </div>
                      {selectedBusiness.website && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Site web</Label>
                          <p className="text-sm">{selectedBusiness.website}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Owner Information */}
                <div>
                  <h3 className="mb-3 font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Propriétaire
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Nom</Label>
                      <p className="text-sm">{selectedBusiness.owner}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <p className="text-sm">{selectedBusiness.ownerEmail}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Téléphone</Label>
                      <p className="text-sm">{selectedBusiness.ownerPhone}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Legal Information */}
                <div>
                  <h3 className="mb-3 font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Informations légales
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">SIRET</Label>
                      <p className="text-sm">{selectedBusiness.siret}</p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                  Fermer
                </Button>
                <Button
                  onClick={() => {
                    setShowDetailModal(false)
                    handleEditBusiness(selectedBusiness)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBusiness && (
            <>
              <DialogHeader>
                <DialogTitle>Modifier le commerce</DialogTitle>
                <DialogDescription>Modifiez les informations de {selectedBusiness.name}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <Label>Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={selectedBusiness.logo || "/placeholder.svg"} />
                      <AvatarFallback>{selectedBusiness.name[0]}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Changer le logo
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* General Information */}
                <div>
                  <h3 className="mb-3 font-semibold">Informations générales</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="edit-name">Nom du commerce</Label>
                      <Input id="edit-name" defaultValue={selectedBusiness.name} />
                    </div>
                    <div>
                      <Label htmlFor="edit-type">Type</Label>
                      <Select defaultValue={selectedBusiness.type}>
                        <SelectTrigger id="edit-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="store">Commerce</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea id="edit-description" defaultValue={selectedBusiness.description} rows={3} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="mb-3 font-semibold">Coordonnées</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <Label htmlFor="edit-address">Adresse</Label>
                      <Input id="edit-address" defaultValue={selectedBusiness.address} />
                    </div>
                    <div>
                      <Label htmlFor="edit-postal">Code postal</Label>
                      <Input id="edit-postal" defaultValue={selectedBusiness.postalCode} />
                    </div>
                    <div>
                      <Label htmlFor="edit-city">Ville</Label>
                      <Input id="edit-city" defaultValue={selectedBusiness.city} />
                    </div>
                    <div>
                      <Label htmlFor="edit-country">Pays</Label>
                      <Input id="edit-country" defaultValue={selectedBusiness.country} />
                    </div>
                    <div>
                      <Label htmlFor="edit-phone">Téléphone</Label>
                      <Input id="edit-phone" defaultValue={selectedBusiness.phone} />
                    </div>
                    <div>
                      <Label htmlFor="edit-email">Email</Label>
                      <Input id="edit-email" type="email" defaultValue={selectedBusiness.email} />
                    </div>
                    <div>
                      <Label htmlFor="edit-website">Site web</Label>
                      <Input id="edit-website" defaultValue={selectedBusiness.website} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Owner Information */}
                <div>
                  <h3 className="mb-3 font-semibold">Propriétaire</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="edit-owner">Nom du propriétaire</Label>
                      <Input id="edit-owner" defaultValue={selectedBusiness.owner} />
                    </div>
                    <div>
                      <Label htmlFor="edit-owner-email">Email du propriétaire</Label>
                      <Input id="edit-owner-email" type="email" defaultValue={selectedBusiness.ownerEmail} />
                    </div>
                    <div>
                      <Label htmlFor="edit-owner-phone">Téléphone du propriétaire</Label>
                      <Input id="edit-owner-phone" defaultValue={selectedBusiness.ownerPhone} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Legal Information */}
                <div>
                  <h3 className="mb-3 font-semibold">Informations légales</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="edit-siret">SIRET</Label>
                      <Input id="edit-siret" defaultValue={selectedBusiness.siret} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Status and Subscription */}
                <div>
                  <h3 className="mb-3 font-semibold">Statut et abonnement</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="edit-status">Statut</Label>
                      <Select defaultValue={selectedBusiness.status}>
                        <SelectTrigger id="edit-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="suspended">Suspendu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-premium">Abonnement Premium</Label>
                      <Select defaultValue={selectedBusiness.isPremium ? "yes" : "no"}>
                        <SelectTrigger id="edit-premium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Oui</SelectItem>
                          <SelectItem value="no">Non</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Annuler
                </Button>
                <Button
                  onClick={() => {
                    console.log("[v0] Saving business changes")
                    setShowEditModal(false)
                  }}
                >
                  Enregistrer les modifications
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
