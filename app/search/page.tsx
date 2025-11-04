"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n-context"

const COUNTRIES = [
  "All Countries",
  "Senegal",
  "Ivory Coast",
  "Nigeria",
  "Ghana",
  "Cameroon",
  "Mali",
  "Burkina Faso",
  "Congo",
  "Ethiopia",
  "Kenya",
]

const CATEGORIES = [
  "All Categories",
  "Grains & Cereals",
  "Spices & Seasonings",
  "Fresh Produce",
  "Meat & Fish",
  "Beverages",
  "Snacks & Sweets",
  "Beauty & Care",
  "Traditional Clothing",
]

const FEATURED_CATEGORIES = [
  {
    name: "Spices & Seasonings",
    count: 245,
    image: "/african-spices-colorful.jpg",
    color: "bg-orange-500",
  },
  {
    name: "Grains & Cereals",
    count: 189,
    image: "/african-grains-rice.jpg",
    color: "bg-amber-500",
  },
  {
    name: "Fresh Produce",
    count: 312,
    image: "/african-fresh-vegetables-market.jpg",
    color: "bg-green-500",
  },
  {
    name: "Traditional Clothing",
    count: 156,
    image: "/african-traditional-clothing-colorful.jpg",
    color: "bg-purple-500",
  },
]

const FEATURED_BY_LOCATION = [
  {
    location: "Paris, France",
    businessCount: 45,
    image: "/african-store-paris.jpg",
  },
  {
    location: "London, UK",
    businessCount: 38,
    image: "/african-market-london.jpg",
  },
  {
    location: "New York, USA",
    businessCount: 52,
    image: "/african-grocery-new-york.jpg",
  },
  {
    location: "Brussels, Belgium",
    businessCount: 29,
    image: "/african-restaurant-brussels.jpg",
  },
]

const TRENDING_SEARCHES = [
  "Jollof rice ingredients",
  "Plantain chips",
  "Shea butter",
  "African print fabric",
  "Palm oil",
  "Cassava flour",
]

export default function SearchPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedCountry !== "All Countries") params.set("country", selectedCountry)
    if (selectedCategory !== "All Categories") params.set("category", selectedCategory)
    router.push(`/search/results?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Search Section */}
      <section className="container py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">{t("search.title")}</h1>
          <p className="mb-8 text-lg text-muted-foreground text-pretty">{t("search.subtitle")}</p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("search.searchPlaceholder")}
                className="h-14 pl-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t("search.selectCountry")} />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t("search.selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" size="lg" className="w-full h-12 text-base">
              <Search className="mr-2 h-5 w-5" />
              {t("search.searchButton")}
            </Button>
          </form>

          {/* Trending Searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {t("search.recentSearches")}:
            </span>
            {TRENDING_SEARCHES.map((search) => (
              <Badge
                key={search}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => {
                  setSearchQuery(search)
                }}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container py-12">
        <h2 className="mb-6 text-2xl font-bold">{t("search.popularCategories")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_CATEGORIES.map((category) => (
            <Link key={category.name} href={`/search/results?category=${encodeURIComponent(category.name)}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-white/90">
                      {category.count} {t("home.products").toLowerCase()}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured by Location */}
      <section className="container py-12">
        <h2 className="mb-6 text-2xl font-bold">{t("search.popularLocations")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_BY_LOCATION.map((location) => (
            <Link key={location.location} href={`/search/results?location=${encodeURIComponent(location.location)}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={location.image || "/placeholder.svg"}
                    alt={location.location}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin className="h-4 w-4" />
                      <h3 className="font-semibold">{location.location}</h3>
                    </div>
                    <p className="text-sm text-white/90">
                      {location.businessCount} {t("home.businesses").toLowerCase()}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
