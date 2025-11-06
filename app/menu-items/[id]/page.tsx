"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Star,
  Heart,
  Flame,
  Leaf,
  ChevronLeft,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/i18n-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

const MOCK_MENU_ITEM = {
  id: "m1",
  name: "Thiéboudienne",
  description:
    "Riz au poisson, légumes et sauce tomate épicée - plat national du Sénégal",
  longDescription:
    "Le Thiéboudienne (prononcé 'chebu jen') est le plat national du Sénégal. Ce plat emblématique combine du riz parfumé cuit dans une riche sauce tomate avec du poisson frais, des légumes variés et des épices traditionnelles. Chaque bouchée offre un mélange harmonieux de saveurs et de textures.",
  price: 16.99,
  imageUrl: "/abstract-credit-card-design.png",
  images: [
    "/yassa-poisson-grilled-fish.jpg",
    "/african-grains-rice.jpg",
    "/african-grocery-store-interior-colorful.jpg",
    "/jollof-rice-west-african-food.jpg",
  ],
  category: "Plats principaux",
  isPopular: true,
  isVegetarian: false,
  isSpicy: true,
  rating: 4.9,
  reviewCount: 34,
  restaurantId: "1",
  restaurantName: "Mama Africa Restaurant",
  ingredients: [
    "Riz brisé",
    "Poisson frais (thiof ou mérou)",
    "Tomates",
    "Oignons",
    "Ail",
    "Piment",
    "Carottes",
  ],
  allergens: ["Poisson"],
  nutritionalInfo: {
    calories: 650,
    protein: "35g",
    carbs: "75g",
    fat: "20g",
  },
  prepTime: "45 min",
  servingSize: "1 personne",
}

const MOCK_REVIEWS = [
  {
    id: "r1",
    author: "Sophie Martin",
    rating: 5,
    date: "Il y a 1 semaine",
    comment:
      "Le meilleur thiéboudienne que j'ai mangé à Paris ! Saveurs authentiques et portions généreuses.",
    verified: true,
  },
  {
    id: "r2",
    author: "Ibrahim Diop",
    rating: 5,
    date: "Il y a 2 semaines",
    comment: "Exactement comme au Sénégal ! Ma grand-mère serait fière.",
    verified: true,
  },
  {
    id: "r3",
    author: "Claire Dubois",
    rating: 4,
    date: "Il y a 3 semaines",
    comment:
      "Très bon plat, bien épicé comme il faut. Un peu d’attente mais ça en valait la peine.",
    verified: true,
  },
]

const SIMILAR_ITEMS = [
  {
    id: "m2",
    name: "Mafé Poulet",
    price: 14.99,
    imageUrl: "/african-drinks.jpg",
    rating: 4.8,
    reviewCount: 28,
  },
  {
    id: "m3",
    name: "Yassa Poisson",
    price: 17.99,
    imageUrl: "/west-african-food-jollof-rice.jpg",
    rating: 4.7,
    reviewCount: 22,
  },
  {
    id: "m5",
    name: "Poulet DG",
    price: 15.99,
    imageUrl: "/african-snacks.jpg",
    rating: 4.6,
    reviewCount: 19,
  },
]

export default function MenuItemDetailPage() {
  const params = useParams()
  const { t } = useLanguage()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: MOCK_MENU_ITEM.id,
      name: MOCK_MENU_ITEM.name,
      price: MOCK_MENU_ITEM.price,
      quantity,
      imageUrl: MOCK_MENU_ITEM.imageUrl,
      businessId: MOCK_MENU_ITEM.restaurantId,
      businessName: MOCK_MENU_ITEM.restaurantName,
    })

    toast({
      title: t("product.addedToCart"),
      description: `${quantity}x ${MOCK_MENU_ITEM.name}`,
      action: (
        <Link href="/cart">
          <Button variant="outline" size="sm">
            {t("product.viewCart")}
          </Button>
        </Link>
      ),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 py-8 md:py-10">
        {/* Back Button */}
        <Link href={`/restaurants/${MOCK_MENU_ITEM.restaurantId}`}>
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("common.back")}
          </Button>
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md bg-muted">
              <img
                src={
                  MOCK_MENU_ITEM.images[selectedImage] ||
                  "/placeholder.svg?height=600&width=600"
                }
                alt={MOCK_MENU_ITEM.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {MOCK_MENU_ITEM.isPopular && (
                <Badge className="absolute left-4 top-4 bg-secondary/90 text-secondary-foreground shadow">
                  {t("restaurant.popular")}
                </Badge>
              )}
              <Button
                size="icon"
                variant="secondary"
                className={`absolute right-4 top-4 rounded-full backdrop-blur-md ${
                  isFavorite ? "text-red-500" : ""
                }`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-5 w-5 transition-all ${
                    isFavorite ? "fill-current scale-110" : ""
                  }`}
                />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {MOCK_MENU_ITEM.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary scale-[1.03]"
                      : "border-transparent hover:border-muted-foreground/40"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg?height=150&width=150"}
                    alt={`${MOCK_MENU_ITEM.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Link
                href={`/restaurants/${MOCK_MENU_ITEM.restaurantId}`}
                className="text-sm text-primary hover:underline mb-2 block"
              >
                {MOCK_MENU_ITEM.restaurantName}
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {MOCK_MENU_ITEM.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{MOCK_MENU_ITEM.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({MOCK_MENU_ITEM.reviewCount} avis)
                  </span>
                </div>
                <Badge variant="outline">{MOCK_MENU_ITEM.category}</Badge>
                {MOCK_MENU_ITEM.isVegetarian && (
                  <Badge variant="secondary" className="bg-green-500 gap-1">
                    <Leaf className="h-3 w-3" />
                    {t("restaurant.vegetarian")}
                  </Badge>
                )}
                {MOCK_MENU_ITEM.isSpicy && (
                  <Badge variant="secondary" className="bg-red-500 gap-1">
                    <Flame className="h-3 w-3" />
                    {t("restaurant.spicy")}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
                {MOCK_MENU_ITEM.description}
              </p>
              <div className="text-3xl font-bold text-primary">
                €{MOCK_MENU_ITEM.price.toFixed(2)}
              </div>
            </div>

            <Separator />

            {/* Quantity + Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-sm md:text-base">
                  {t("product.quantity")}:
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-center md:justify-start mt-4">
  <Button
    size="lg"
    className="gap-2 text-base md:text-lg py-5 hover:scale-[1.02] transition-transform"
    onClick={handleAddToCart}
  >
    <ShoppingCart className="h-5 w-5" />
    Ajouter au panier – €{(MOCK_MENU_ITEM.price * quantity).toFixed(2)}
  </Button>
</div>

            </div>

            <Separator />

            {/* Extra Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temps de préparation:</span>
                <span className="font-medium">{MOCK_MENU_ITEM.prepTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Portion:</span>
                <span className="font-medium">{MOCK_MENU_ITEM.servingSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Calories:</span>
                <span className="font-medium">
                  {MOCK_MENU_ITEM.nutritionalInfo.calories} kcal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="space-y-6">
            <TabsList className="flex flex-wrap justify-start gap-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingrédients</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">
                Avis ({MOCK_MENU_ITEM.reviewCount})
              </TabsTrigger>
            </TabsList>

            {/* Nutrition Tab */}
            <TabsContent value="nutrition">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">
                    Informations nutritionnelles (par portion)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.entries(MOCK_MENU_ITEM.nutritionalInfo).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="text-center p-4 bg-muted rounded-lg h-[100px] flex flex-col items-center justify-center"
                        >
                          <div className="text-xl font-bold text-primary">
                            {value}
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {key}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* (Other Tabs remain same...) */}
          </Tabs>
        </div>

        {/* Similar Items */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-6">Plats similaires</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SIMILAR_ITEMS.map((item) => (
              <Link key={item.id} href={`/menu-items/${item.id}`}>
                <Card className="group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.imageUrl || "/placeholder.svg?height=300&width=400"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 text-base md:text-lg">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-muted-foreground">
                          ({item.reviewCount})
                        </span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        €{item.price.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
