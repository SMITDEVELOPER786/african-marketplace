"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tag, MapPin, Store, Heart, Search, Percent, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Promotion {
  id: string
  productName: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  productImage: string
  storeName: string
  storeLocation: string
  city: string
  country: string
  address: string
  category: string
  validUntil: string
}

export default function PromotionsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("")
  const [storeNameFilter, setStoreNameFilter] = useState("")
  const [addressFilter, setAddressFilter] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [minDiscount, setMinDiscount] = useState("")
  const [sortBy, setSortBy] = useState("discount")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const [promotions] = useState<Promotion[]>([
    {
      id: "1",
      productName: "Tissu Wax Premium - Motif Africain",
      originalPrice: 45,
      discountedPrice: 31.5,
      discountPercentage: 30,
      productImage: "/african-fabric.jpg",
      storeName: "Boutique Africaine",
      storeLocation: "Paris 18ème",
      city: "Paris",
      country: "France",
      address: "25 Rue des Martyrs, 75018 Paris",
      category: "Tissus",
      validUntil: "2025-02-28",
    },
    {
      id: "2",
      productName: "Huile de Palme Bio 5L",
      originalPrice: 24,
      discountedPrice: 18,
      discountPercentage: 25,
      productImage: "/palm-oil-plantation.png",
      storeName: "Marché Bio",
      storeLocation: "Bruxelles Centre",
      city: "Bruxelles",
      country: "Belgique",
      address: "Rue du Marché aux Herbes 50, 1000 Bruxelles",
      category: "Alimentation",
      validUntil: "2025-02-15",
    },
    {
      id: "3",
      productName: "Sac à Main en Cuir Artisanal",
      originalPrice: 75,
      discountedPrice: 45,
      discountPercentage: 40,
      productImage: "/leather-handbag.png",
      storeName: "Artisanat Ivoirien",
      storeLocation: "Amsterdam Centre",
      city: "Amsterdam",
      country: "Pays-Bas",
      address: "Kalverstraat 92, 1012 Amsterdam",
      category: "Artisanat",
      validUntil: "2025-03-10",
    },
  ])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const addToFavorites = (promotion: Promotion) => {
    toast({
      title: "Ajouté aux favoris",
      description: `${promotion.productName} a été ajouté à vos favoris.`,
    })
  }

  const filteredPromotions = promotions
    .filter((promo) => {
      const matchesSearch =
        promo.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.storeLocation.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || promo.category === categoryFilter
      const matchesCountry = countryFilter === "all" || promo.country === countryFilter
      const matchesCity = cityFilter === "" || promo.city.toLowerCase().includes(cityFilter.toLowerCase())
      const matchesStoreName =
        storeNameFilter === "" || promo.storeName.toLowerCase().includes(storeNameFilter.toLowerCase())
      const matchesAddress = addressFilter === "" || promo.address.toLowerCase().includes(addressFilter.toLowerCase())

      const matchesMinPrice = minPrice === "" || promo.discountedPrice >= Number.parseFloat(minPrice)
      const matchesMaxPrice = maxPrice === "" || promo.discountedPrice <= Number.parseFloat(maxPrice)
      const matchesMinDiscount = minDiscount === "" || promo.discountPercentage >= Number.parseFloat(minDiscount)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCountry &&
        matchesCity &&
        matchesStoreName &&
        matchesAddress &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinDiscount
      )
    })
    .sort((a, b) => {
      if (sortBy === "discount") {
        return b.discountPercentage - a.discountPercentage
      } else if (sortBy === "price-low") {
        return a.discountedPrice - b.discountedPrice
      } else {
        return b.discountedPrice - a.discountedPrice
      }
    })

  const availableCountries = Array.from(new Set(promotions.map((p) => p.country)))

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-full bg-primary/10 p-3">
            <Percent className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-balance">Promotions</h1>
        </div>
        <p className="text-muted-foreground">Découvrez les meilleures offres et réductions sur vos produits préférés</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          {/* Main Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit, magasin ou localisation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="Tissus">Tissus</SelectItem>
                <SelectItem value="Alimentation">Alimentation</SelectItem>
                <SelectItem value="Artisanat">Artisanat</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Réduction la plus élevée</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="w-full md:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showAdvancedFilters ? "Masquer les filtres avancés" : "Afficher les filtres avancés"}
          </Button>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t space-y-4">
              {/* Location Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pays" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les pays</SelectItem>
                    {availableCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input placeholder="Ville..." value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />

                <Input
                  placeholder="Adresse..."
                  value={addressFilter}
                  onChange={(e) => setAddressFilter(e.target.value)}
                />
              </div>

              {/* Store and Price Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Nom du magasin..."
                  value={storeNameFilter}
                  onChange={(e) => setStoreNameFilter(e.target.value)}
                />

                <Input
                  type="number"
                  placeholder="Prix min (€)"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />

                <Input
                  type="number"
                  placeholder="Prix max (€)"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />

                <Input
                  type="number"
                  placeholder="Réduction min (%)"
                  value={minDiscount}
                  onChange={(e) => setMinDiscount(e.target.value)}
                />
              </div>

              {/* Reset Filters Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                  setCountryFilter("all")
                  setCityFilter("")
                  setStoreNameFilter("")
                  setAddressFilter("")
                  setMinPrice("")
                  setMaxPrice("")
                  setMinDiscount("")
                }}
              >
                Réinitialiser tous les filtres
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Promotions Grid */}
      {filteredPromotions.length === 0 ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Tag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Aucune promotion trouvée</h3>
              <p className="text-muted-foreground max-w-md">Essayez de modifier vos filtres de recherche</p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promotion) => (
            <Card key={promotion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <img
                  src={promotion.productImage || "/placeholder.svg"}
                  alt={promotion.productName}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  -{promotion.discountPercentage}%
                </Badge>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => addToFavorites(promotion)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {promotion.category}
                  </Badge>
                  <h3 className="font-semibold text-lg line-clamp-2">{promotion.productName}</h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Store className="h-4 w-4" />
                  <span>{promotion.storeName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {promotion.city}, {promotion.country}
                  </span>
                </div>

                <div className="pt-2 border-t space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      {promotion.originalPrice.toFixed(2)} €
                    </span>
                    <span className="text-2xl font-bold text-primary">{promotion.discountedPrice.toFixed(2)} €</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Valide jusqu'au {new Date(promotion.validUntil).toLocaleDateString("fr-FR")}
                  </p>
                  <Button className="w-full">Réserver maintenant</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
