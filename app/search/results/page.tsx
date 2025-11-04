"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Grid3x3, List, MapIcon, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { SecondaryNav } from "@/components/marketplace/secondary-nav"
import { MOCK_BUSINESSES, type Business } from "@/lib/mock-data"

const ITEMS_PER_PAGE = 12

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [results, setResults] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [showMoreCountries, setShowMoreCountries] = useState(false)
  const [showMoreCities, setShowMoreCities] = useState(false)
  const [showMoreSpecialties, setShowMoreSpecialties] = useState(false)
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "all",
    stores: false,
    restaurants: false,
    verified: false,
    delivery: false,
    clickCollect: false,
    countries: [] as string[],
    cities: [] as string[],
    specialties: [] as string[],
    priceRanges: [] as string[],
    ratings: [] as number[],
  })

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = createBrowserClient()

      if (!supabase) {
        console.log("[v0] Using mock data for search results")
        setResults(MOCK_BUSINESSES)
        setLoading(false)
        return
      }

      const query = searchParams.get("q") || ""
      const type = searchParams.get("type") || "all"

      let allResults: Business[] = []

      const { data: businesses, error } = await supabase.from("businesses").select("*").ilike("name", `%${query}%`)

      if (error) throw error

      allResults = (businesses || []).map((business: any) => ({
        id: business.id,
        name: business.name,
        description: business.description,
        type: business.type,
        image_url: business.image_url,
        rating: business.rating,
        review_count: business.review_count,
        country_origin: business.country_origin,
        category: business.category,
        status: business.status,
        price_range: business.price_range,
        cuisine_type: business.cuisine_type,
        delivery_available: business.delivery_available,
        click_collect: business.click_collect,
        verified: business.verified,
        opening_hours: business.opening_hours,
      }))

      setResults(allResults.length > 0 ? allResults : MOCK_BUSINESSES)
    } catch (error) {
      console.error("[v0] Error fetching search results:", error)
      setResults(MOCK_BUSINESSES)
      toast({
        title: "Mode hors ligne",
        description: "Affichage des résultats de démonstration",
      })
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  const filteredResults = results.filter((result) => {
    if (filters.stores && result.type !== "store") return false
    if (filters.restaurants && result.type !== "restaurant") return false
    if (filters.verified && !result.verified) return false
    if (filters.delivery && !result.delivery_available) return false
    if (filters.clickCollect && !result.click_collect) return false
    if (filters.countries.length > 0 && !filters.countries.includes(result.country_origin)) return false
    if (filters.priceRanges.length > 0 && result.price_range && !filters.priceRanges.includes(result.price_range))
      return false
    if (filters.ratings.length > 0 && !filters.ratings.some((rating) => result.rating >= rating)) return false
    if (
      filters.specialties.length > 0 &&
      result.cuisine_type &&
      !filters.specialties.some((s) => result.cuisine_type?.toLowerCase().includes(s.toLowerCase()))
    )
      return false
    return true
  })

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      case "reviews":
        return b.review_count - a.review_count
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedResults.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedResults = sortedResults.slice(startIndex, endIndex)

  const uniqueCountries = Array.from(new Set(results.map((r) => r.country_origin))).sort()
  const uniqueCities = Array.from(
    new Set(
      results.map((r) => {
        const cities = ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille", "Nantes", "Strasbourg"]
        return cities[Math.floor(Math.random() * cities.length)]
      }),
    ),
  ).sort()
  const uniqueSpecialties = Array.from(
    new Set(results.filter((r) => r.cuisine_type).map((r) => r.cuisine_type!)),
  ).sort()

  const getCountryCount = (country: string) => results.filter((r) => r.country_origin === country).length
  const getCityCount = (city: string) => results.length // Simplified for mock data
  const getSpecialtyCount = (specialty: string) =>
    results.filter((r) => r.cuisine_type?.toLowerCase().includes(specialty.toLowerCase())).length

  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <SecondaryNav />

      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Affiner votre recherche..."
              className="pl-10 pr-4 h-12"
              defaultValue={searchParams.get("q") || ""}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-lg font-medium text-muted-foreground">Résultats</h1>
            <p className="text-sm text-muted-foreground">
              {loading ? "Chargement..." : `${filteredResults.length} résultat${filteredResults.length > 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 px-3"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="h-8 px-3"
              >
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Pertinence</SelectItem>
                <SelectItem value="rating">Note</SelectItem>
                <SelectItem value="reviews">Avis</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">Filtres</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() =>
                      setFilters({
                        type: "all",
                        stores: false,
                        restaurants: false,
                        verified: false,
                        delivery: false,
                        clickCollect: false,
                        countries: [],
                        cities: [],
                        specialties: [],
                        priceRanges: [],
                        ratings: [],
                      })
                    }
                  >
                    Réinitialiser
                  </Button>
                </div>

                <Separator className="mb-3" />

                <div className="space-y-4">
                  {/* Type filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Type</h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="all"
                          className="h-3.5 w-3.5"
                          checked={!filters.stores && !filters.restaurants}
                          onCheckedChange={() =>
                            setFilters({ ...filters, stores: false, restaurants: false, type: "all" })
                          }
                        />
                        <Label htmlFor="all" className="text-sm cursor-pointer">
                          Tous ({results.length})
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="stores"
                          className="h-3.5 w-3.5"
                          checked={filters.stores}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, stores: checked as boolean, restaurants: false })
                          }
                        />
                        <Label htmlFor="stores" className="text-sm cursor-pointer">
                          Commerces ({results.filter((r) => r.type === "store").length})
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="restaurants"
                          className="h-3.5 w-3.5"
                          checked={filters.restaurants}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, restaurants: checked as boolean, stores: false })
                          }
                        />
                        <Label htmlFor="restaurants" className="text-sm cursor-pointer">
                          Restaurants ({results.filter((r) => r.type === "restaurant").length})
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Services filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Services</h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="verified"
                          className="h-3.5 w-3.5"
                          checked={filters.verified}
                          onCheckedChange={(checked) => setFilters({ ...filters, verified: checked as boolean })}
                        />
                        <Label htmlFor="verified" className="text-sm cursor-pointer">
                          Vérifié
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="delivery"
                          className="h-3.5 w-3.5"
                          checked={filters.delivery}
                          onCheckedChange={(checked) => setFilters({ ...filters, delivery: checked as boolean })}
                        />
                        <Label htmlFor="delivery" className="text-sm cursor-pointer">
                          Livraison
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="clickCollect"
                          className="h-3.5 w-3.5"
                          checked={filters.clickCollect}
                          onCheckedChange={(checked) => setFilters({ ...filters, clickCollect: checked as boolean })}
                        />
                        <Label htmlFor="clickCollect" className="text-sm cursor-pointer">
                          Click & Collect
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Pays d'origine</h3>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                      {uniqueCountries.slice(0, showMoreCountries ? undefined : 5).map((country) => (
                        <div key={country} className="flex items-center gap-2">
                          <Checkbox
                            id={`country-${country}`}
                            className="h-3.5 w-3.5"
                            checked={filters.countries.includes(country)}
                            onCheckedChange={(checked) => {
                              const newCountries = checked
                                ? [...filters.countries, country]
                                : filters.countries.filter((c) => c !== country)
                              setFilters({ ...filters, countries: newCountries })
                            }}
                          />
                          <Label htmlFor={`country-${country}`} className="text-sm cursor-pointer flex-1">
                            {country} ({getCountryCount(country)})
                          </Label>
                        </div>
                      ))}
                    </div>
                    {uniqueCountries.length > 5 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 h-7 text-xs"
                        onClick={() => setShowMoreCountries(!showMoreCountries)}
                      >
                        {showMoreCountries ? "Voir moins" : `Voir plus (${uniqueCountries.length - 5})`}
                        <ChevronDown
                          className={`h-3 w-3 ml-1 transition-transform ${showMoreCountries ? "rotate-180" : ""}`}
                        />
                      </Button>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Ville</h3>
                    <div className="space-y-1.5">
                      {uniqueCities.slice(0, showMoreCities ? undefined : 5).map((city) => (
                        <div key={city} className="flex items-center gap-2">
                          <Checkbox
                            id={`city-${city}`}
                            className="h-3.5 w-3.5"
                            checked={filters.cities.includes(city)}
                            onCheckedChange={(checked) => {
                              const newCities = checked
                                ? [...filters.cities, city]
                                : filters.cities.filter((c) => c !== city)
                              setFilters({ ...filters, cities: newCities })
                            }}
                          />
                          <Label htmlFor={`city-${city}`} className="text-sm cursor-pointer flex-1">
                            {city} ({getCityCount(city)})
                          </Label>
                        </div>
                      ))}
                    </div>
                    {uniqueCities.length > 5 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 h-7 text-xs"
                        onClick={() => setShowMoreCities(!showMoreCities)}
                      >
                        {showMoreCities ? "Voir moins" : `Voir plus (${uniqueCities.length - 5})`}
                        <ChevronDown
                          className={`h-3 w-3 ml-1 transition-transform ${showMoreCities ? "rotate-180" : ""}`}
                        />
                      </Button>
                    )}
                  </div>

                  <Separator />

                  {!filters.stores && uniqueSpecialties.length > 0 && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Spécialité</h3>
                        <div className="space-y-1.5">
                          {uniqueSpecialties.slice(0, showMoreSpecialties ? undefined : 5).map((specialty) => (
                            <div key={specialty} className="flex items-center gap-2">
                              <Checkbox
                                id={`specialty-${specialty}`}
                                className="h-3.5 w-3.5"
                                checked={filters.specialties.includes(specialty)}
                                onCheckedChange={(checked) => {
                                  const newSpecialties = checked
                                    ? [...filters.specialties, specialty]
                                    : filters.specialties.filter((s) => s !== specialty)
                                  setFilters({ ...filters, specialties: newSpecialties })
                                }}
                              />
                              <Label htmlFor={`specialty-${specialty}`} className="text-sm cursor-pointer flex-1">
                                {specialty} ({getSpecialtyCount(specialty)})
                              </Label>
                            </div>
                          ))}
                        </div>
                        {uniqueSpecialties.length > 5 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full mt-2 h-7 text-xs"
                            onClick={() => setShowMoreSpecialties(!showMoreSpecialties)}
                          >
                            {showMoreSpecialties ? "Voir moins" : `Voir plus (${uniqueSpecialties.length - 5})`}
                            <ChevronDown
                              className={`h-3 w-3 ml-1 transition-transform ${showMoreSpecialties ? "rotate-180" : ""}`}
                            />
                          </Button>
                        )}
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* Rating filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Note minimum</h3>
                    <div className="space-y-1.5">
                      {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <Checkbox
                            id={`rating-${rating}`}
                            className="h-3.5 w-3.5"
                            checked={filters.ratings.includes(rating)}
                            onCheckedChange={(checked) => {
                              const newRatings = checked
                                ? [...filters.ratings, rating]
                                : filters.ratings.filter((r) => r !== rating)
                              setFilters({ ...filters, ratings: newRatings })
                            }}
                          />
                          <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                            ⭐ {rating}+
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!filters.stores && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium mb-2">Gamme de prix</h3>
                        <div className="space-y-1.5">
                          {["$", "$$", "$$$", "$$$$"].map((price) => (
                            <div key={price} className="flex items-center gap-2">
                              <Checkbox
                                id={`price-${price}`}
                                className="h-3.5 w-3.5"
                                checked={filters.priceRanges.includes(price)}
                                onCheckedChange={(checked) => {
                                  const newPrices = checked
                                    ? [...filters.priceRanges, price]
                                    : filters.priceRanges.filter((p) => p !== price)
                                  setFilters({ ...filters, priceRanges: newPrices })
                                }}
                              />
                              <Label htmlFor={`price-${price}`} className="text-sm cursor-pointer">
                                {price}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </aside>

          <div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Chargement des résultats...</p>
                </div>
              </div>
            ) : paginatedResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-semibold mb-2">Aucun résultat trouvé</p>
                <p className="text-muted-foreground">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              <>
                <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                  {paginatedResults.map((result) => (
                    <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <Link href={result.type === "store" ? `/stores/${result.id}` : `/restaurants/${result.id}`}>
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={result.image_url || "/placeholder.svg"}
                            alt={result.name}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                          <div className="absolute top-2 left-2 flex gap-2">
                            {result.status && (
                              <Badge className="text-xs" variant={result.status === "open" ? "default" : "secondary"}>
                                {result.status === "open" ? "Ouvert" : "Fermé"}
                              </Badge>
                            )}
                            {result.verified && <Badge className="text-xs bg-blue-500">✓ Vérifié</Badge>}
                          </div>
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <Link href={result.type === "store" ? `/stores/${result.id}` : `/restaurants/${result.id}`}>
                          <h3 className="font-semibold text-lg mb-1 hover:text-primary line-clamp-1">{result.name}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{result.description}</p>
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">⭐ {result.rating}</span>
                            <span className="text-sm text-muted-foreground">({result.review_count})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {result.price_range && <span className="text-sm font-medium">{result.price_range}</span>}
                            <Badge variant="outline" className="text-xs">
                              {result.country_origin}
                            </Badge>
                          </div>
                        </div>
                        {(result.delivery_available || result.click_collect) && (
                          <div className="flex gap-2 mb-3">
                            {result.delivery_available && (
                              <Badge variant="secondary" className="text-xs">
                                🚚 Livraison
                              </Badge>
                            )}
                            {result.click_collect && (
                              <Badge variant="secondary" className="text-xs">
                                📦 Click & Collect
                              </Badge>
                            )}
                          </div>
                        )}
                        <Link href={result.type === "store" ? `/stores/${result.id}` : `/restaurants/${result.id}`}>
                          <Button className="w-full" size="sm">
                            {result.type === "store" ? "Voir les produits" : "Voir les menus"}
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
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Précédent
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                            className="w-9 h-9"
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <SearchResultsContent />
    </Suspense>
  )
}
