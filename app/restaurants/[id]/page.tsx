"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Star, MapPin, Clock, Phone, Mail, Search, Flame, Leaf, Grid3x3, List, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useLanguage } from "@/lib/i18n-context"
import { SearchBar } from "@/components/marketplace/search-bar"
import { SecondaryNav } from "@/components/marketplace/secondary-nav"
import { MOCK_BUSINESSES } from "@/lib/mock-data"
import { MOCK_MENU_ITEMS } from "@/lib/mock-menu-data"
import { MarketplaceFooter } from "@/components/marketplace/footer"

const ITEMS_PER_PAGE = 9

export default function RestaurantDetailPage() {
  const params = useParams()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false)
  const [showSpicyOnly, setShowSpicyOnly] = useState(false)
  const [priceRange, setPriceRange] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const restaurant = MOCK_BUSINESSES.find((b) => b.id === params.id && b.type === "restaurant") || MOCK_BUSINESSES[0]
  const restaurantMenuItems = MOCK_MENU_ITEMS.filter((m) => m.restaurant_id === restaurant.id)

  const filteredAndSortedItems = useMemo(() => {
    const filtered = restaurantMenuItems.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      const matchesVegetarian = !showVegetarianOnly || item.is_vegetarian
      const matchesSpicy = !showSpicyOnly || item.is_spicy

      let matchesPrice = true
      if (priceRange === "under10") matchesPrice = item.price < 10
      else if (priceRange === "10to15") matchesPrice = item.price >= 10 && item.price <= 15
      else if (priceRange === "over15") matchesPrice = item.price > 15

      return matchesSearch && matchesCategory && matchesVegetarian && matchesSpicy && matchesPrice
    })

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "featured") {
      filtered.sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0))
    }

    return filtered
  }, [restaurantMenuItems, searchQuery, selectedCategory, sortBy, showVegetarianOnly, showSpicyOnly, priceRange])

  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedItems = filteredAndSortedItems.slice(startIndex, endIndex)

  const MOCK_REVIEWS = [
    {
      id: "r1",
      author: "Sophie Martin",
      rating: 5,
      date: "Il y a 1 semaine",
      comment:
        "Cuisine authentique et délicieuse ! Le thiéboudienne était parfait, exactement comme au Sénégal. Service chaleureux et ambiance conviviale.",
      verified: true,
    },
    {
      id: "r2",
      author: "Ibrahim Diop",
      rating: 5,
      date: "Il y a 2 semaines",
      comment: "Meilleur restaurant africain de Paris ! Les saveurs sont authentiques et les portions généreuses.",
      verified: true,
    },
    {
      id: "r3",
      author: "Claire Dubois",
      rating: 4,
      date: "Il y a 1 mois",
      comment: "Très bonne découverte. Les plats sont savoureux et le personnel est très accueillant.",
      verified: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SecondaryNav />

      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar variant="compact" />
        </div>
      </div>

      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="relative aspect-square w-full md:w-48 shrink-0 overflow-hidden rounded-lg">
              <img
                src={restaurant.image_url || "/placeholder.svg"}
                alt={restaurant.name}
                className="h-full w-full object-cover"
              />
              {restaurant.verified && (
                <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">Vérifié</Badge>
              )}
            </div>

            <div className="flex-1">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium">{restaurant.rating}</span>
                      <span className="text-muted-foreground">({restaurant.review_count} avis)</span>
                    </div>
                    <Badge variant="outline">{restaurant.cuisine_type}</Badge>
                    <Badge variant="outline">{restaurant.country_origin}</Badge>
                    {restaurant.status === "open" ? (
                      <Badge className="bg-green-500">Ouvert</Badge>
                    ) : (
                      <Badge variant="destructive">Fermé</Badge>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{restaurant.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{restaurant.opening_hours || "Mar-Dim: 12:00 - 15:00, 19:00 - 23:00"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>contact@{restaurant.name.toLowerCase().replace(/\s+/g, "")}.com</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button size="lg" className="gap-2" asChild>
                  <Link href={`/restaurants/${params.id}/reservation`}>Réserver maintenant</Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  <Phone className="h-4 w-4" />
                  Appeler
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList>
            <TabsTrigger value="menu">Menu ({restaurantMenuItems.length})</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({restaurant.review_count})</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher dans le menu..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="Entrées">Entrées</SelectItem>
                    <SelectItem value="Plats principaux">Plats principaux</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                    <SelectItem value="Boissons">Boissons</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">En vedette</SelectItem>
                    <SelectItem value="price-low">Prix croissant</SelectItem>
                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Mieux notés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="vegetarian"
                      checked={showVegetarianOnly}
                      onCheckedChange={(checked) => {
                        setShowVegetarianOnly(checked as boolean)
                        setCurrentPage(1)
                      }}
                    />
                    <Label htmlFor="vegetarian" className="flex items-center gap-1 cursor-pointer">
                      <Leaf className="h-4 w-4 text-green-500" />
                      Végétarien
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="spicy"
                      checked={showSpicyOnly}
                      onCheckedChange={(checked) => {
                        setShowSpicyOnly(checked as boolean)
                        setCurrentPage(1)
                      }}
                    />
                    <Label htmlFor="spicy" className="flex items-center gap-1 cursor-pointer">
                      <Flame className="h-4 w-4 text-red-500" />
                      Épicé
                    </Label>
                  </div>
                  <Select
                    value={priceRange}
                    onValueChange={(value) => {
                      setPriceRange(value)
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Prix" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les prix</SelectItem>
                      <SelectItem value="under10">Moins de 10€</SelectItem>
                      <SelectItem value="10to15">10€ - 15€</SelectItem>
                      <SelectItem value="over15">Plus de 15€</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                >
                  <ToggleGroupItem value="grid" aria-label="Vue grille">
                    <Grid3x3 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="Vue liste">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedItems.map((item) => (
                  <Link key={item.id} href={`/menu-items/${item.id}`}>
                    <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        {item.is_popular && (
                          <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">
                            Populaire
                          </Badge>
                        )}
                        <div className="absolute right-3 top-3 flex gap-2">
                          {item.is_vegetarian && (
                            <Badge variant="secondary" className="bg-green-500">
                              <Leaf className="h-3 w-3" />
                            </Badge>
                          )}
                          {item.is_spicy && (
                            <Badge variant="secondary" className="bg-red-500">
                              <Flame className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute right-3 bottom-3 rounded-full"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-1 mb-3 text-sm">
                          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                          <span className="font-medium">{item.rating}</span>
                          <span className="text-muted-foreground">({item.review_count})</span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-lg font-bold">€{item.price.toFixed(2)}</span>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedItems.map((item) => (
                  <Link key={item.id} href={`/menu-items/${item.id}`}>
                    <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative aspect-[4/3] sm:aspect-square sm:w-48 shrink-0 overflow-hidden">
                          <img
                            src={item.image_url || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          {item.is_popular && (
                            <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">
                              Populaire
                            </Badge>
                          )}
                        </div>

                        <CardContent className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                              <div className="flex flex-wrap items-center gap-3 mb-3">
                                <div className="flex items-center gap-1 text-sm">
                                  <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                                  <span className="font-medium">{item.rating}</span>
                                  <span className="text-muted-foreground">({item.review_count})</span>
                                </div>
                                <Badge variant="outline">{item.category}</Badge>
                                {item.is_vegetarian && (
                                  <Badge variant="secondary" className="bg-green-500 gap-1">
                                    <Leaf className="h-3 w-3" />
                                    Végétarien
                                  </Badge>
                                )}
                                {item.is_spicy && (
                                  <Badge variant="secondary" className="bg-red-500 gap-1">
                                    <Flame className="h-3 w-3" />
                                    Épicé
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <span className="text-2xl font-bold">€{item.price.toFixed(2)}</span>
                              <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full"
                                onClick={(e) => {
                                  e.preventDefault()
                                }}
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {filteredAndSortedItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun plat trouvé</p>
                <p className="text-sm text-muted-foreground mt-1">Essayez avec d'autres critères de recherche</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(pageNumber)
                            }}
                            isActive={currentPage === pageNumber}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    return null
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardContent className="p-6 prose prose-sm max-w-none">
                <h2>À propos de {restaurant.name}</h2>
                <p>{restaurant.description}</p>
                <h3>Notre histoire</h3>
                <p>
                  Fondé avec passion, notre restaurant est devenu une référence de la cuisine {restaurant.cuisine_type}{" "}
                  authentique. Nous utilisons des recettes traditionnelles et des ingrédients frais pour vous offrir une
                  expérience culinaire inoubliable.
                </p>
                <h3>Nos spécialités</h3>
                <p>Découvrez nos plats signature préparés avec amour et authenticité.</p>
                <h3>Horaires d'ouverture</h3>
                <p>{restaurant.opening_hours || "Mar-Dim: 12:00 - 15:00, 19:00 - 23:00, Lun: Fermé"}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-4xl font-bold">{restaurant.rating}</span>
                      <div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3.5 w-3.5 ${
                                star <= restaurant.rating ? "fill-secondary text-secondary" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">Basé sur {restaurant.review_count} avis</p>
                      </div>
                    </div>
                  </div>
                  <Button>Écrire un avis</Button>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-6">
                  {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="flex gap-4">
                      <Avatar>
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3.5 w-3.5 ${
                                      star <= review.rating ? "fill-secondary text-secondary" : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span>•</span>
                              <span>{review.date}</span>
                              {review.verified && (
                                <>
                                  <span>•</span>
                                  <Badge variant="secondary" className="text-xs">
                                    Visite vérifiée
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <MarketplaceFooter />
    </div>
  )
}
