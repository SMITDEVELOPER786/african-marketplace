import { MarketplaceHeader } from "@/components/marketplace/header"
import { CategoryNav } from "@/components/marketplace/category-nav"
import { BusinessMap } from "@/components/map/business-map"

// Mock data with coordinates
const businesses = [
  {
    id: "1",
    name: "Afro Delights Market",
    type: "store" as const,
    latitude: 40.6782,
    longitude: -73.9442,
    address: "123 Main Street, Brooklyn, NY 11201",
    rating: 4.8,
    imageUrl: "/african-grocery-store-interior-colorful.jpg",
  },
  {
    id: "2",
    name: "Mama Africa Restaurant",
    type: "restaurant" as const,
    latitude: 40.7282,
    longitude: -73.7949,
    address: "456 Queens Blvd, Queens, NY 11373",
    rating: 4.9,
    imageUrl: "/african-restaurant-interior-warm.jpg",
  },
  {
    id: "3",
    name: "Sahel Spice Market",
    type: "store" as const,
    latitude: 40.7589,
    longitude: -73.9851,
    address: "789 Broadway, Manhattan, NY 10003",
    rating: 4.7,
    imageUrl: "/spice-market-colorful-spices.jpg",
  },
  {
    id: "4",
    name: "Jollof Palace",
    type: "restaurant" as const,
    latitude: 40.8448,
    longitude: -73.8648,
    address: "321 Grand Concourse, Bronx, NY 10451",
    rating: 4.6,
    imageUrl: "/west-african-food-jollof-rice.jpg",
  },
  {
    id: "5",
    name: "Lagos Market",
    type: "store" as const,
    latitude: 40.6892,
    longitude: -73.9442,
    address: "555 Flatbush Ave, Brooklyn, NY 11225",
    rating: 4.5,
    imageUrl: "/african-grocery-store-interior-colorful.jpg",
  },
  {
    id: "6",
    name: "Ethiopian Flavors",
    type: "restaurant" as const,
    latitude: 40.7489,
    longitude: -73.968,
    address: "888 3rd Ave, Manhattan, NY 10022",
    rating: 4.8,
    imageUrl: "/african-restaurant-interior-warm.jpg",
  },
]

export default function MapPage() {
  return (
    <div className="min-h-screen">
      <MarketplaceHeader />
      <CategoryNav />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Find Businesses Near You</h1>
          <p className="mt-2 text-muted-foreground">
            Discover African stores and restaurants in your area using our interactive map
          </p>
        </div>

        <BusinessMap businesses={businesses} />
      </div>
    </div>
  )
}
