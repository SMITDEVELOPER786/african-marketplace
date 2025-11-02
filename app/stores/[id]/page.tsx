"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Star, MapPin, Clock, Phone, Mail, ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/i18n-context"
import { MOCK_BUSINESSES } from "@/lib/mock-data"
import { MOCK_PRODUCTS } from "@/lib/mock-product-data"
import { MarketplaceFooter } from "@/components/marketplace/footer"
import { SecondaryNav } from "@/components/marketplace/secondary-nav"
import { SearchBar } from "@/components/marketplace/search-bar"

const ITEMS_PER_PAGE = 12

export default function StoreDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)

  const store = MOCK_BUSINESSES.find((b) => b.id === params.id && b.type === "store") || MOCK_BUSINESSES[50]
  const storeProducts = MOCK_PRODUCTS.filter((p) => p.store_id === store.id)

  const filteredProducts = storeProducts
    .filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category.toLowerCase().includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handleAddToCart = (product: (typeof MOCK_PRODUCTS)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.image_url,
      businessId: store.id,
      businessName: store.name,
    })
  }

  const MOCK_REVIEWS = [
    {
      id: "r1",
      author: "Sophie Martin",
      rating: 5,
      date: "Il y a 1 semaine",
      comment: "Excellents produits africains authentiques ! Large choix et prix raisonnables.",
      verified: true,
    },
    {
      id: "r2",
      author: "Ibrahim Diop",
      rating: 5,
      date: "Il y a 2 semaines",
      comment: "Meilleur magasin africain de la région ! Produits frais et de qualité.",
      verified: true,
    },
    {
      id: "r3",
      author: "Claire Dubois",
      rating: 4,
      date: "Il y a 1 mois",
      comment: "Très bon choix de produits. Personnel accueillant et serviable.",
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

      {/* Store Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="relative aspect-square w-full md:w-48 shrink-0 overflow-hidden rounded-lg">
              <img
                src={store.image_url || "/placeholder.svg"}
                alt={store.name}
                className="h-full w-full object-cover"
              />
              {store.verified && (
                <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">Vérifié</Badge>
              )}
            </div>

            <div className="flex-1">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium">{store.rating}</span>
                      <span className="text-muted-foreground">({store.review_count} avis)</span>
                    </div>
                    <Badge variant="outline">{store.country_origin}</Badge>
                    {store.status === "open" ? (
                      <Badge className="bg-green-500">Ouvert</Badge>
                    ) : (
                      <Badge variant="destructive">Fermé</Badge>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{store.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{store.opening_hours || "Lun-Sam: 9:00 - 20:00"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>contact@{store.name.toLowerCase().replace(/\s+/g, "")}.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Produits ({storeProducts.length})</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({store.review_count})</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher des produits..."
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
                  <SelectItem value="huiles">Huiles & Condiments</SelectItem>
                  <SelectItem value="farines">Farines & Céréales</SelectItem>
                  <SelectItem value="épices">Épices & Piments</SelectItem>
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

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      {!product.in_stock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                          <Badge variant="secondary">Rupture de stock</Badge>
                        </div>
                      )}
                    </div>
                  </Link>

                  <CardContent className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold mb-1 line-clamp-1 hover:text-primary">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-1 mb-3 text-sm">
                      <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-muted-foreground">({product.review_count})</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-lg font-bold">€{product.price.toFixed(2)}</span>
                        {product.unit && <span className="text-xs text-muted-foreground ml-1">/ {product.unit}</span>}
                      </div>
                      <Button size="sm" onClick={() => handleAddToCart(product)} disabled={!product.in_stock}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun produit trouvé</p>
                <p className="text-sm text-muted-foreground mt-2">Essayez avec d'autres critères de recherche</p>
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
                <h2>À propos de {store.name}</h2>
                <p>{store.description}</p>
                <p>
                  Nous travaillons directement avec des agriculteurs et des fournisseurs à travers l'Afrique pour vous
                  apporter les produits africains les plus authentiques et de haute qualité.
                </p>
                <h3>Notre engagement</h3>
                <ul>
                  <li>Produits 100% authentiques</li>
                  <li>Qualité garantie</li>
                  <li>Prix compétitifs</li>
                  <li>Service client exceptionnel</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-4xl font-bold">{store.rating}</span>
                      <div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= store.rating ? "fill-secondary text-secondary" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">Basé sur {store.review_count} avis</p>
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
                                    Achat vérifié
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
