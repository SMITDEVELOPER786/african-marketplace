"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Store, UtensilsCrossed, MapPin, Star, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

// Mock data with more items for pagination
const favoriteStores = Array.from({ length: 15 }, (_, i) => ({
  id: `store-${i + 1}`,
  name: `Afro Spice Market ${i + 1}`,
  type: "store" as const,
  description: "Premium African spices, seasonings, and traditional ingredients",
  imageUrl: "/african-spices.png",
  rating: 4.8,
  reviewCount: 124 + i,
  location: "Paris, France",
  countryOrigin: "Senegal",
  isPremium: i % 3 === 0,
  isOpen: true,
}))

const favoriteRestaurants = Array.from({ length: 12 }, (_, i) => ({
  id: `restaurant-${i + 1}`,
  name: `Mama Africa Restaurant ${i + 1}`,
  type: "restaurant" as const,
  description: "Authentic West African cuisine with a modern twist",
  imageUrl: "/diverse-african-cuisine.png",
  rating: 4.6,
  reviewCount: 89 + i,
  location: "London, UK",
  cuisineType: "West African",
  countryOrigin: "Nigeria",
  isPremium: i % 2 === 0,
  isOpen: true,
}))

const ITEMS_PER_PAGE = 6

export default function FavoritesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const handleRemoveFavorite = (id: string, name: string) => {
    toast({
      title: "Retiré des favoris",
      description: `${name} a été retiré de vos favoris.`,
    })
  }

  const allFavorites = [...favoriteStores, ...favoriteRestaurants]

  const getFilteredItems = () => {
    switch (activeTab) {
      case "stores":
        return favoriteStores
      case "restaurants":
        return favoriteRestaurants
      default:
        return allFavorites
    }
  }

  const filteredItems = getFilteredItems()
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center md:text-left">{t("customer.favorites")}</h1>
        <p className="text-muted-foreground  text-center sm:text-left">{t("customer.favoritesDesc")}</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            <Heart className="h-4 w-4" />
            Tous
          </TabsTrigger>
          <TabsTrigger value="stores" className="gap-2">
            <Store className="h-4 w-4" />
            Commerces
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="gap-2">
            <UtensilsCrossed className="h-4 w-4" />
            Restaurants
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {paginatedItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">{t("customer.noFavorites")}</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">{t("customer.noFavoritesDesc")}</p>
                <Button className="mt-6">{t("customer.exploreBusiness")}</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedItems.map((business) => (
                  <Card key={business.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={business.imageUrl || "/placeholder.svg"}
                        alt={business.name}
                        fill
                        className="object-cover"
                      />
                      {business.isPremium && <Badge className="absolute top-2 left-2 bg-yellow-500">En vedette</Badge>}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md"
                        onClick={() => handleRemoveFavorite(business.id, business.name)}
                      >
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{business.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{business.rating}</span>
                          <span className="text-muted-foreground">({business.reviewCount})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{business.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Badge variant="outline">{business.countryOrigin}</Badge>
                        {business.type === "restaurant" && <Badge variant="outline">{business.cuisineType}</Badge>}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{business.location}</span>
                      </div>
                      <Link href={`/${business.type === "store" ? "stores" : "restaurants"}/${business.id}`}>
                        <Button className="w-full bg-transparent" variant="outline">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Voir les détails
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
