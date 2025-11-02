"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Clock, TrendingUp, Heart, Search, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const allDeals = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: i % 3 === 0 ? "Lot de 3 pagnes wax" : i % 3 === 1 ? "Panier repas familial" : "Pack épices africaines",
  store: i % 3 === 0 ? "Boutique Africaine" : i % 3 === 1 ? "Restaurant Le Baobab" : "Épicerie Tropicale",
  originalPrice: i % 3 === 0 ? 89.99 : i % 3 === 1 ? 45.0 : 24.99,
  discountedPrice: i % 3 === 0 ? 59.99 : i % 3 === 1 ? 29.99 : 14.99,
  discount: i % 3 === 0 ? 33 : i % 3 === 1 ? 33 : 40,
  image: i % 3 === 0 ? "/african-fabric.jpg" : i % 3 === 1 ? "/diverse-african-cuisine.png" : "/african-spices.png",
  endsIn: i % 4 === 0 ? "2 jours" : i % 4 === 1 ? "5 heures" : i % 4 === 2 ? "1 jour" : "3 heures",
  soldCount: 45 + i * 5,
  category: i % 3 === 0 ? "fashion" : i % 3 === 1 ? "food" : "grocery",
}))

const ITEMS_PER_PAGE = 9

export default function DealsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("discount")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredDeals = allDeals
    .filter((deal) => {
      const matchesSearch =
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.store.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || deal.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "discount") return b.discount - a.discount
      if (sortBy === "price") return a.discountedPrice - b.discountedPrice
      if (sortBy === "popular") return b.soldCount - a.soldCount
      return 0
    })

  const totalPages = Math.ceil(filteredDeals.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedDeals = filteredDeals.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleAddToFavorites = (dealTitle: string) => {
    toast({
      title: "Ajouté aux favoris",
      description: `${dealTitle} a été ajouté à vos favoris.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-yellow-500" />
          Bonnes affaires
        </h1>
        <p className="text-muted-foreground mt-2">
          Découvrez les meilleures offres à durée limitée et économisez sur vos produits préférés
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une offre, un commerce..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={categoryFilter}
                onValueChange={(value) => {
                  setCategoryFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="fashion">Mode & Tissus</SelectItem>
                  <SelectItem value="food">Restaurants</SelectItem>
                  <SelectItem value="grocery">Épicerie</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Meilleure réduction</SelectItem>
                  <SelectItem value="price">Prix croissant</SelectItem>
                  <SelectItem value="popular">Plus populaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {paginatedDeals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">Aucune offre trouvée</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge variant="destructive" className="absolute top-2 right-2 text-lg font-bold">
                    -{deal.discount}%
                  </Badge>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 left-2 rounded-full bg-white/90 hover:bg-white"
                    title="Ajouter aux favoris"
                    onClick={() => handleAddToFavorites(deal.title)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{deal.title}</CardTitle>
                  <CardDescription>{deal.store}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">€{deal.discountedPrice.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">€{deal.originalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-orange-600">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Se termine dans {deal.endsIn}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>{deal.soldCount} vendus</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#B85C38] hover:bg-[#9A4A2E]">Profiter de l'offre</Button>
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
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-10"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
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
    </div>
  )
}
