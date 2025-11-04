import Link from "next/link"
import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Grains & Cereals",
    slug: "grains-cereals",
    imageUrl: "/african-grains-rice.jpg",
    count: 156,
  },
  {
    name: "Spices & Seasonings",
    slug: "spices-seasonings",
    imageUrl: "/african-spices-colorful.jpg",
    count: 89,
  },
  {
    name: "Flours & Starches",
    slug: "flours-starches",
    imageUrl: "/cassava-flour.jpg",
    count: 67,
  },
  {
    name: "Oils & Fats",
    slug: "oils-fats",
    imageUrl: "/palm-oil-bottle.jpg",
    count: 45,
  },
  {
    name: "Dried Fish & Meat",
    slug: "dried-fish-meat",
    imageUrl: "/dried-fish-display.png",
    count: 78,
  },
  {
    name: "Vegetables & Fruits",
    slug: "vegetables-fruits",
    imageUrl: "/african-vegetables.jpg",
    count: 134,
  },
  {
    name: "Beverages",
    slug: "beverages",
    imageUrl: "/african-drinks.jpg",
    count: 92,
  },
  {
    name: "Snacks",
    slug: "snacks",
    imageUrl: "/african-snacks.jpg",
    count: 103,
  },
]

export function ProductCategories() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">Explore authentic African products from trusted stores</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={category.imageUrl || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-balance leading-tight">{category.name}</h3>
                    <p className="mt-1 text-sm text-white/90">{category.count} products</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
