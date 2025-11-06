import { BusinessCard } from "@/components/marketplace/business-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"

const stores = [
  {
    id: "1",
    name: "Afro Delights Market",
    type: "store" as const,
    description: "Your one-stop shop for authentic West African groceries, spices, and specialty items.",
    imageUrl: "/african-grocery-store-interior-colorful.jpg",
    rating: 4.8,
    reviewCount: 127,
    location: "Brooklyn, NY",
    countryOrigin: "Nigeria",
    isPremium: true,
    isOpen: true,
  },
  {
    id: "3",
    name: "Sahel Spice Market",
    type: "store" as const,
    description: "Premium African spices, herbs, and traditional ingredients sourced directly from farmers.",
    imageUrl: "/spice-market-colorful-spices.jpg",
    rating: 4.7,
    reviewCount: 89,
    location: "Manhattan, NY",
    countryOrigin: "Senegal",
    isPremium: false,
    isOpen: true,
  },
  {
    id: "5",
    name: "Lagos Market",
    type: "store" as const,
    description: "Authentic Nigerian products, fresh produce, and traditional ingredients.",
    imageUrl: "/african-grocery-store-interior-colorful.jpg",
    rating: 4.5,
    reviewCount: 64,
    location: "Brooklyn, NY",
    countryOrigin: "Nigeria",
    isPremium: false,
    isOpen: true,
  },
]

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">African Grocery Stores</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Browse authentic African grocery stores and shop for traditional products
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:flex-1">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stores..."
                className="pl-9 w-full"
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="nigeria">Nigeria</SelectItem>
                <SelectItem value="ghana">Ghana</SelectItem>
                <SelectItem value="senegal">Senegal</SelectItem>
                <SelectItem value="ethiopia">Ethiopia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="gap-2 bg-transparent w-full sm:w-auto justify-center"
          >
            <SlidersHorizontal className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            {stores.length} stores found
          </p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Nearest</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Store Grid */}
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            justify-items-center
          "
        >
          {stores.map((store) => (
            <div
              key={store.id}
              className="w-full max-w-[340px] sm:max-w-full transition-transform duration-200 hover:scale-[1.02]"
            >
              <BusinessCard {...store} />
            </div>
          ))}
        </div>

        {/* Footer Marker (for identification) */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          [Rendered by StoresPage]
        </p>
      </div>
    </div>
  )
}
