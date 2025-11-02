import { BusinessCard } from "@/components/marketplace/business-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"

const restaurants = [
  {
    id: "2",
    name: "Mama Africa Restaurant",
    type: "restaurant" as const,
    description: "Experience the rich flavors of East African cuisine in a warm, welcoming atmosphere.",
    imageUrl: "/african-restaurant-interior-warm.jpg",
    rating: 4.9,
    reviewCount: 203,
    location: "Queens, NY",
    cuisineType: "East African",
    countryOrigin: "Ethiopia",
    isPremium: true,
    isOpen: true,
  },
  {
    id: "4",
    name: "Jollof Palace",
    type: "restaurant" as const,
    description: "Authentic West African dishes prepared with love and traditional recipes.",
    imageUrl: "/west-african-food-jollof-rice.jpg",
    rating: 4.6,
    reviewCount: 156,
    location: "Bronx, NY",
    cuisineType: "West African",
    countryOrigin: "Ghana",
    isPremium: false,
    isOpen: true,
  },
  {
    id: "6",
    name: "Ethiopian Flavors",
    type: "restaurant" as const,
    description: "Traditional Ethiopian cuisine with vegetarian and vegan options.",
    imageUrl: "/african-restaurant-interior-warm.jpg",
    rating: 4.8,
    reviewCount: 178,
    location: "Manhattan, NY",
    cuisineType: "Ethiopian",
    countryOrigin: "Ethiopia",
    isPremium: false,
    isOpen: true,
  },
]

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">African Restaurants</h1>
          <p className="mt-2 text-muted-foreground">
            Discover authentic African restaurants and experience traditional cuisine
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search restaurants..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Cuisine Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              <SelectItem value="west">West African</SelectItem>
              <SelectItem value="east">East African</SelectItem>
              <SelectItem value="north">North African</SelectItem>
              <SelectItem value="ethiopian">Ethiopian</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <SlidersHorizontal className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{restaurants.length} restaurants found</p>
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
          {restaurants.map((restaurant) => (
            <BusinessCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </div>
    </div>
  )
}
