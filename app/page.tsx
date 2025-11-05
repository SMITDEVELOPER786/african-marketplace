"use client"

import { BusinessCard } from "@/components/marketplace/business-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Star, Users, StoreIcon, ShoppingBag, Award } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MarketplaceFooter } from "@/components/marketplace/footer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { SearchBar } from "@/components/marketplace/search-bar"
import { SecondaryNav } from "@/components/marketplace/secondary-nav"

const locations = {
  europe: {
    france: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux"],
    germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf"],
    uk: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Edinburgh"],
    belgium: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège"],
    netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
    italy: ["Rome", "Milan", "Naples", "Turin", "Florence"],
  },
  usa: {
    "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
    California: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
    Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
    Florida: ["Miami", "Orlando", "Tampa", "Jacksonville"],
    Illinois: ["Chicago", "Aurora", "Naperville"],
    Pennsylvania: ["Philadelphia", "Pittsburgh"],
    Georgia: ["Atlanta", "Augusta", "Columbus"],
    Massachusetts: ["Boston", "Worcester", "Springfield"],
  },
  canada: {
    Ontario: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
    Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby"],
    Alberta: ["Calgary", "Edmonton", "Red Deer"],
    Manitoba: ["Winnipeg", "Brandon"],
    Saskatchewan: ["Saskatoon", "Regina"],
  },
}

const featuredBusinesses = [
  {
    id: "1",
    name: "Afro Spice Market",
    type: "store" as const,
    description: "Premium African spices, seasonings, and traditional ingredients",
    imageUrl: "/african-spices.png",
    rating: 4.8,
    reviewCount: 124,
    location: "Paris, France",
    address: "123 Rue de la République, 75011 Paris",
    countryOrigin: "Senegal",
    isPremium: true,
    isOpen: true,
    openingHours: "Mon-Sat: 9:00 - 20:00",
  },
  {
    id: "2",
    name: "Mama Africa Restaurant",
    type: "restaurant" as const,
    description: "Authentic West African cuisine with a modern twist",
    imageUrl: "/african-restaurant.png",
    rating: 4.6,
    reviewCount: 89,
    location: "London, UK",
    address: "45 High Street, London E1 5AA",
    cuisineType: "West African",
    countryOrigin: "Nigeria",
    isPremium: false,
    isOpen: true,
    openingHours: "Tue-Sun: 12:00 - 22:00",
  },
  {
    id: "3",
    name: "Sahel Grocery",
    type: "store" as const,
    description: "Fresh African produce and specialty items",
    imageUrl: "/african-grocery.jpg",
    rating: 4.7,
    reviewCount: 156,
    location: "Brussels, Belgium",
    address: "78 Avenue Louise, 1050 Brussels",
    countryOrigin: "Mali",
    isPremium: true,
    isOpen: false,
    openingHours: "Mon-Sat: 8:00 - 19:00",
  },
  {
    id: "4",
    name: "Jollof Palace",
    type: "restaurant" as const,
    description: "Home of the best Jollof rice in Europe",
    imageUrl: "/vibrant-jollof-rice.png",
    rating: 4.9,
    reviewCount: 203,
    location: "Berlin, Germany",
    address: "12 Friedrichstraße, 10117 Berlin",
    cuisineType: "West African",
    countryOrigin: "Ghana",
    isPremium: true,
    isOpen: true,
    openingHours: "Daily: 11:00 - 23:00",
  },
]

const popularCategories = [
  {
    id: "1",
    name: "Épices & Assaisonnements",
    imageUrl: "/african-spices.png",
    count: 150,
  },
  {
    id: "2",
    name: "Artisanat Traditionnel",
    imageUrl: "/african-crafts.jpg",
    count: 89,
  },
  {
    id: "3",
    name: "Produits Frais",
    imageUrl: "/african-produce.jpg",
    count: 234,
  },
  {
    id: "4",
    name: "Tissus Africains",
    imageUrl: "/african-fabrics.jpg",
    count: 112,
  },
]

export default function HomePage() {
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState<string>("europe")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation")
    if (savedLocation) {
      const { region, location, city } = JSON.parse(savedLocation)
      setSelectedRegion(region)
      setSelectedLocation(location)
      setSelectedCity(city)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate AI suggestions based on search query
      const suggestions = generateAISuggestions(searchQuery)
      setAiSuggestions(suggestions)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const generateAISuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase()
    const allSuggestions = [
      "Jollof rice ingredients",
      "Plantain chips",
      "Shea butter organic",
      "African print fabric",
      "Palm oil red",
      "Cassava flour",
      "Fufu powder",
      "Egusi seeds",
      "Suya spice mix",
      "Hibiscus tea",
      "African black soap",
      "Kente cloth",
      "Dashiki shirts",
      "Ankara fabric",
      "Yam tubers",
      "Scotch bonnet peppers",
      "Okra fresh",
      "Bitter leaf",
      "Ugu leaves",
      "Maggi cubes",
    ]

    return allSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(lowerQuery)).slice(0, 5)
  }

  const handleSaveLocation = () => {
    if (selectedLocation && selectedCity) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          region: selectedRegion,
          location: selectedLocation,
          city: selectedCity,
        }),
      )
      setIsLocationDialogOpen(false)
    }
  }

  const getLocationDisplay = () => {
    if (selectedCity && selectedLocation) {
      return `${selectedCity}, ${selectedLocation}`
    }
    return "Choisir ma localisation"
  }

  const handleSearch = () => {
    // Navigate to search results page with query params
    const params = new URLSearchParams({
      q: searchQuery,
      country: selectedCountry,
      category: selectedCategory,
      ...(selectedCity && { city: selectedCity }),
      ...(selectedLocation && { location: selectedLocation }),
    })
    window.location.href = `/search/results?${params.toString()}`
  }

  return (
    <div className="min-h-screen">
      <SecondaryNav />

      <section className="border-b bg-gradient-to-b from-background to-muted/20 py-8 sm:py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-xs sm:text-sm">
              🏆 Plateforme N°1 des produits africains dans le monde
            </Badge>

            <p className="mt-4 text-base sm:text-lg lg:text-xl text-muted-foreground text-balance mx-auto max-w-[700px] px-4 sm:px-0">
              La meilleure marketplace pour trouver des produits africains authentiques et des restaurants près de chez
              vous
            </p>
          </div>

          <div className="mx-auto mt-6 sm:mt-8 lg:mt-10 max-w-4xl px-4 sm:px-6">
            <SearchBar variant="full" />
          </div>
        </div>
      </section>

      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
  <DialogContent
    className="w-[95%]  mt-10 sm:w-[500px] md:w-[520px] lg:w-[460px] rounded-2xl p-5 sm:p-6 border border-gray-200 bg-white dark:bg-gray-900 shadow-xl"
  >
    <DialogHeader className="text-center space-y-2">
      <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
        Choisissez votre localisation
      </DialogTitle>
      <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
        Sélectionnez votre région, pays et ville pour voir les commerces proches.
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-5 mt-4">
      {/* Région + Pays same row always */}
      <div className="flex gap-3 flex-wrap sm:flex-nowrap w-full">
        {/* Région */}
        <div className="flex-1 min-w-[150px] space-y-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Région
          </label>
          <Select
            value={selectedRegion}
            onValueChange={(value) => {
              setSelectedRegion(value)
              setSelectedLocation("")
              setSelectedCity("")
            }}
          >
            <SelectTrigger className="w-full h-10 text-sm rounded-lg">
              <SelectValue placeholder="Sélectionner une région" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="usa">États-Unis</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pays / État / Province */}
        <div className="flex-1 min-w-[150px] space-y-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {selectedRegion === "europe"
              ? "Pays"
              : selectedRegion === "usa"
              ? "État"
              : "Province"}
          </label>
          <Select
            value={selectedLocation}
            onValueChange={(value) => {
              setSelectedLocation(value)
              setSelectedCity("")
            }}
          >
            <SelectTrigger className="w-full h-10 text-sm rounded-lg">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(locations[selectedRegion as keyof typeof locations]).map(
                (loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc.charAt(0).toUpperCase() + loc.slice(1)}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Ville */}
      {selectedLocation && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Ville
          </label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full h-10 text-sm rounded-lg">
              <SelectValue placeholder="Sélectionner une ville" />
            </SelectTrigger>
            <SelectContent>
              {locations[selectedRegion as keyof typeof locations][
                selectedLocation as keyof (typeof locations)[keyof typeof locations]
              ]?.map((city: string) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Save Button */}
      <Button
        className="w-full mt-3 h-10 text-sm sm:text-base font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        onClick={handleSaveLocation}
        disabled={!selectedCity || !selectedLocation}
      >
        Enregistrer ma localisation
      </Button>
    </div>
  </DialogContent>
</Dialog>

      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Catégories populaires</h2>
            <p className="mt-2 text-muted-foreground">Explorez nos catégories de produits les plus populaires</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularCategories.map((category) => (
              <Link key={category.id} href={`/search/results?category=${category.id}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-white/90">{category.count} produits</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <h2 className="text-3xl font-bold tracking-tight">Commerces les mieux notés</h2>
              </div>
              <p className="mt-2 text-muted-foreground">
                Les commerces et restaurants les mieux notés près de chez vous
              </p>
            </div>
            <Button variant="outline" asChild className="shrink-0 bg-transparent">
              <Link href="/search/results?sort=rating">{t("common.viewAll")}</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight">Commerces vedettes</h2>
              </div>
              <p className="mt-2 text-muted-foreground">
                Découvrez nos commerces et restaurants partenaires mis en avant
              </p>
            </div>
            <Button variant="outline" asChild className="shrink-0 bg-transparent">
              <Link href="/search/results?featured=true">{t("common.viewAll")}</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredBusinesses.slice(0, 4).map((business) => (
              <div key={business.id} className="relative">
                {business.isPremium && <Badge className="absolute top-2 right-2 z-10 bg-primary">Vedette</Badge>}
                <BusinessCard {...business} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Rejoignez la plus grande communauté africaine en Europe</h2>
              <p className="mt-3 text-lg text-primary-foreground/90">
                Des milliers d'utilisateurs nous font confiance chaque jour
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-4xl font-bold">50,000+</div>
                <div className="mt-1 text-sm text-primary-foreground/80">Utilisateurs inscrits</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <StoreIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-4xl font-bold">1,200+</div>
                <div className="mt-1 text-sm text-primary-foreground/80">Commerces partenaires</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-4xl font-bold">100,000+</div>
                <div className="mt-1 text-sm text-primary-foreground/80">Commandes réalisées</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-4xl font-bold">4.8/5</div>
                <div className="mt-1 text-sm text-primary-foreground/80">Note moyenne</div>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="text-center">
                <Button size="lg" variant="secondary" className="h-12 px-8" asChild>
                  <Link href="/?signup=true">Créer mon compte gratuitement</Link>
                </Button>
                <p className="mt-3 text-sm text-primary-foreground/80">Rejoignez-nous en moins de 2 minutes</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Téléchargez notre cahier des charges</h2>
            <p className="text-muted-foreground mb-6">
              Découvrez tous les détails techniques et fonctionnels de la plateforme AfroMarket dans notre cahier des
              charges complet.
            </p>
            <Button size="lg" asChild className="h-12 px-8">
              <a href="/api/download-cahier-des-charges" download>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Télécharger le cahier des charges (HTML)
              </a>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              Format HTML - Ouvrez dans votre navigateur ou Word pour convertir en .docx
            </p>
          </div>
        </div>
      </section>

      <MarketplaceFooter />
    </div>
  )
}