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
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">African Grocery Stores</h1>
          <p className="mt-2 text-muted-foreground">
            Browse authentic African grocery stores and shop for traditional products
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search stores..." className="pl-9" />
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
          <Button variant="outline" className="gap-2 bg-transparent">
            <SlidersHorizontal className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{stores.length} stores found</p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Nearest</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stores.map((store) => (
            <BusinessCard key={store.id} {...store} />
          ))}
        </div>
      </div>
    </div>
  )
}
