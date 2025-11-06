"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Search, Sparkles, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  variant?: "full" | "compact"
  initialQuery?: string
  initialCountry?: string
  initialCategory?: string
  className?: string
}

export function SearchBar({
  variant = "full",
  initialQuery = "",
  initialCountry = "all",
  initialCategory = "all",
  className,
}: SearchBarProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCountry, setSelectedCountry] = useState(initialCountry)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timer = setTimeout(() => {
        const suggestions = generateAISuggestions(searchQuery)
        setAiSuggestions(suggestions)
        setShowSuggestions(true)
      }, 300) // 300ms debounce

      return () => clearTimeout(timer)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const generateAISuggestions = useCallback((query: string): string[] => {
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
  }, [])

  const handleSearch = useCallback(() => {
    setIsSearching(true)
    const params = new URLSearchParams({
      q: searchQuery,
      country: selectedCountry,
      category: selectedCategory,
    })
    router.push(`/search/results?${params.toString()}`)
    setShowSuggestions(false)
    setTimeout(() => setIsSearching(false), 500)
  }, [searchQuery, selectedCountry, selectedCategory, router])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch()
      }
    },
    [handleSearch],
  )

  if (variant === "compact") {
    return (
      <div className={cn("relative w-full", className)}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-12 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Sparkles className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary cursor-pointer hover:scale-110 transition-transform" />
        <Input
          type="search"
          placeholder={t("results.refineSearch")}
          className="h-11 pl-10 pr-20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {showSuggestions && aiSuggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full rounded-lg border bg-background shadow-lg z-50">
            <div className="p-2">
              <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                <span>Suggestions IA</span>
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted rounded-md"
                  onClick={() => {
                    setSearchQuery(suggestion)
                    setShowSuggestions(false)
                    setTimeout(handleSearch, 100)
                  }}
                >
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-12 sm:right-14 top-1/2 h-8 w-8 -translate-y-1/2"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Sparkles className="absolute right-3 sm:right-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-primary cursor-pointer hover:scale-110 transition-transform" />
     <Input
  type="search"
  placeholder="Recherchez des produits..."
  className="h-11 sm:h-14 pl-10 sm:pl-12 pr-16 sm:pr-20 text-xs sm:text-sm md:text-base placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={handleKeyDown}
/>

        {showSuggestions && aiSuggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full rounded-lg border bg-background shadow-lg z-50">
            <div className="p-2">
              <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                <span>Suggestions IA</span>
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted rounded-md"
                  onClick={() => {
                    setSearchQuery(suggestion)
                    setShowSuggestions(false)
                    setTimeout(handleSearch, 100)
                  }}
                >
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
            <SelectValue placeholder="Tous les pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les pays</SelectItem>
            <SelectItem value="senegal">Sénégal</SelectItem>
            <SelectItem value="nigeria">Nigeria</SelectItem>
            <SelectItem value="ghana">Ghana</SelectItem>
            <SelectItem value="cameroon">Cameroun</SelectItem>
            <SelectItem value="mali">Mali</SelectItem>
            <SelectItem value="ivory-coast">Côte d'Ivoire</SelectItem>
            <SelectItem value="kenya">Kenya</SelectItem>
            <SelectItem value="ethiopia">Éthiopie</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            <SelectItem value="groceries">Épicerie</SelectItem>
            <SelectItem value="spices">Épices</SelectItem>
            <SelectItem value="meat">Viande & Poisson</SelectItem>
            <SelectItem value="produce">Fruits & Légumes</SelectItem>
            <SelectItem value="beverages">Boissons</SelectItem>
            <SelectItem value="snacks">Snacks</SelectItem>
            <SelectItem value="beauty">Beauté</SelectItem>
            <SelectItem value="clothing">Vêtements</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        size="lg"
        className="h-11 sm:h-12 w-full text-sm sm:text-base"
        onClick={handleSearch}
        disabled={isSearching}
      >
        <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        {isSearching ? "Recherche..." : "Rechercher"}
      </Button>
    </div>
  )
}
