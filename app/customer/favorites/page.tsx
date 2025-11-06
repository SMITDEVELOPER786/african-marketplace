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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        <div className="text-center md:text-left mb-6">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight">{t("customer.favorites")}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {t("customer.favoritesDesc")}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {/* Centered Tabs on Mobile */}
          <div className="flex justify-center">
            <TabsList className="inline-flex w-auto">
              <TabsTrigger value="all" className="gap-2 text-xs xs:text-sm">
                <Heart className="h-3 w-3 xs:h-4 xs:w-4" />
                Tous
              </TabsTrigger>
              <TabsTrigger value="stores" className="gap-2 text-xs xs:text-sm">
                <Store className="h-3 w-3 xs:h-4 xs:w-4" />
                Commerces
              </TabsTrigger>
              <TabsTrigger value="restaurants" className="gap-2 text-xs xs:text-sm">
                <UtensilsCrossed className="h-3 w-3 xs:h-4 xs:w-4" />
                Restaurants
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-4 sm:mt-6">
            {paginatedItems.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground/50" />
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">{t("customer.noFavorites")}</h3>
                  <p className="mt-1 sm:mt-2 text-center text-xs sm:text-sm text-muted-foreground">
                    {t("customer.noFavoritesDesc")}
                  </p>
                  <Button className="mt-4 sm:mt-6 text-xs sm:text-sm">
                    {t("customer.exploreBusiness")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-3 xs:gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedItems.map((business) => (
                    <Card key={business.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="relative h-40 xs:h-48">
                        <Image
                          src={business.imageUrl || "/placeholder.svg"}
                          alt={business.name}
                          fill
                          className="object-cover"
                        />
                        {business.isPremium && (
                          <Badge className="absolute top-2 left-2 bg-yellow-500 text-xs">
                            En vedette
                          </Badge>
                        )}
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute top-2 right-2 h-7 w-7 xs:h-9 xs:w-9 rounded-full bg-white/90 hover:bg-white shadow-md"
                          onClick={() => handleRemoveFavorite(business.id, business.name)}
                        >
                          <Heart className="h-3 w-3 xs:h-5 xs:w-5 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <CardContent className="p-3 xs:p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm xs:text-base sm:text-lg line-clamp-1">
                            {business.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs xs:text-sm">
                            <Star className="h-3 w-3 xs:h-4 xs:w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{business.rating}</span>
                            <span className="text-muted-foreground">({business.reviewCount})</span>
                          </div>
                        </div>
                        <p className="text-xs xs:text-sm text-muted-foreground line-clamp-2 mb-2 xs:mb-3">
                          {business.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs xs:text-sm text-muted-foreground mb-2 xs:mb-3">
                          <Badge variant="outline" className="text-xs">
                            {business.countryOrigin}
                          </Badge>
                          {business.type === "restaurant" && (
                            <Badge variant="outline" className="text-xs">
                              {business.cuisineType}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs xs:text-sm text-muted-foreground mb-3 xs:mb-4">
                          <MapPin className="h-3 w-3 xs:h-4 xs:w-4" />
                          <span>{business.location}</span>
                        </div>
                        <Link href={`/${business.type === "store" ? "stores" : "restaurants"}/${business.id}`}>
                          <Button className="w-full bg-transparent text-xs xs:text-sm" variant="outline" size="sm">
                            <ShoppingBag className="mr-2 h-3 w-3 xs:h-4 xs:w-4" />
                            Voir les détails
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 xs:gap-2 mt-6 sm:mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 xs:h-10 xs:w-10"
                    >
                      <ChevronLeft className="h-3 w-3 xs:h-4 xs:w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="h-8 w-8 xs:h-10 xs:w-10 text-xs"
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
                      className="h-8 w-8 xs:h-10 xs:w-10"
                    >
                      <ChevronRight className="h-3 w-3 xs:h-4 xs:w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}