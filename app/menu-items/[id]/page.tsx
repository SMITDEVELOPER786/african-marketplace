"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Star, Heart, Flame, Leaf, ChevronLeft, Plus, Minus, ShoppingCart } from "lucide-react"
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
  description: "Riz au poisson, légumes et sauce tomate épicée - plat national du Sénégal",
  longDescription:
    "Le Thiéboudienne (prononcé 'chebu jen') est le plat national du Sénégal. Ce plat emblématique combine du riz parfumé cuit dans une riche sauce tomate avec du poisson frais, des légumes variés et des épices traditionnelles. Chaque bouchée offre un mélange harmonieux de saveurs et de textures qui vous transportera directement en Afrique de l'Ouest.",
  price: 16.99,
  imageUrl: "/thieboudienne-dish.jpg",
  images: [
    "/thieboudienne-dish.jpg",
    "/thieboudienne-close-up.jpg",
    "/thieboudienne-ingredients.jpg",
    "/thieboudienne-plated.jpg",
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
    "Concentré de tomate",
    "Oignons",
    "Ail",
    "Piment",
    "Carottes",
    "Chou",
    "Aubergines",
    "Manioc",
    "Patates douces",
    "Huile",
    "Épices (poivre, laurier, persil)",
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
      "Le meilleur thiéboudienne que j'ai mangé à Paris ! Les saveurs sont authentiques et les portions généreuses. Le poisson était parfaitement cuit.",
    verified: true,
  },
  {
    id: "r2",
    author: "Ibrahim Diop",
    rating: 5,
    date: "Il y a 2 semaines",
    comment: "Exactement comme au Sénégal ! Ma grand-mère serait fière. Un vrai régal.",
    verified: true,
  },
  {
    id: "r3",
    author: "Claire Dubois",
    rating: 4,
    date: "Il y a 3 semaines",
    comment: "Très bon plat, bien épicé comme il faut. Seul bémol : un peu d'attente mais ça en valait la peine.",
    verified: true,
  },
]

const SIMILAR_ITEMS = [
  {
    id: "m2",
    name: "Mafé Poulet",
    price: 14.99,
    imageUrl: "/mafe-chicken.jpg",
    rating: 4.8,
    reviewCount: 28,
  },
  {
    id: "m3",
    name: "Yassa Poisson",
    price: 17.99,
    imageUrl: "/yassa-fish.jpg",
    rating: 4.7,
    reviewCount: 22,
  },
  {
    id: "m5",
    name: "Poulet DG",
    price: 15.99,
    imageUrl: "/poulet-dg.jpg",
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
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        {/* Back Button */}
        <Link href={`/restaurants/${MOCK_MENU_ITEM.restaurantId}`}>
          <Button variant="ghost" className="mb-4 gap-2">
            <ChevronLeft className="h-4 w-4" />
            {t("common.back")}
          </Button>
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={MOCK_MENU_ITEM.images[selectedImage] || "/placeholder.svg?height=600&width=600"}
                alt={MOCK_MENU_ITEM.name}
                className="h-full w-full object-cover"
              />
              {MOCK_MENU_ITEM.isPopular && (
                <Badge className="absolute left-4 top-4 bg-secondary text-secondary-foreground">
                  {t("restaurant.popular")}
                </Badge>
              )}
              <Button
                size="icon"
                variant="secondary"
                className={`absolute right-4 top-4 rounded-full ${isFavorite ? "text-red-500" : ""}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {MOCK_MENU_ITEM.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
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
              <h1 className="text-3xl font-bold mb-2">{MOCK_MENU_ITEM.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="font-semibold">{MOCK_MENU_ITEM.rating}</span>
                  <span className="text-muted-foreground">({MOCK_MENU_ITEM.reviewCount} avis)</span>
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
              <p className="text-muted-foreground mb-4">{MOCK_MENU_ITEM.description}</p>
              <div className="text-3xl font-bold text-primary">€{MOCK_MENU_ITEM.price.toFixed(2)}</div>
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">{t("product.quantity")}:</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button size="icon" variant="outline" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button size="lg" className="w-full gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier - €{(MOCK_MENU_ITEM.price * quantity).toFixed(2)}
              </Button>
            </div>

            <Separator />

            {/* Additional Info */}
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
                <span className="font-medium">{MOCK_MENU_ITEM.nutritionalInfo.calories} kcal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="space-y-6">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingrédients</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({MOCK_MENU_ITEM.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardContent className="p-6 prose prose-sm max-w-none">
                  <p>{MOCK_MENU_ITEM.longDescription}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ingredients">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Ingrédients</h3>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {MOCK_MENU_ITEM.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-4" />
                  <h3 className="font-semibold mb-2">Allergènes</h3>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_MENU_ITEM.allergens.map((allergen, index) => (
                      <Badge key={index} variant="destructive">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Informations nutritionnelles (par portion)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{MOCK_MENU_ITEM.nutritionalInfo.calories}</div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{MOCK_MENU_ITEM.nutritionalInfo.protein}</div>
                      <div className="text-sm text-muted-foreground">Protéines</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{MOCK_MENU_ITEM.nutritionalInfo.carbs}</div>
                      <div className="text-sm text-muted-foreground">Glucides</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{MOCK_MENU_ITEM.nutritionalInfo.fat}</div>
                      <div className="text-sm text-muted-foreground">Lipides</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-4xl font-bold">{MOCK_MENU_ITEM.rating}</span>
                        <div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-secondary text-secondary" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">Basé sur {MOCK_MENU_ITEM.reviewCount} avis</p>
                        </div>
                      </div>
                    </div>
                    <Button>{t("restaurant.writeReview")}</Button>
                  </div>

                  <Separator className="mb-6" />

                  <div className="space-y-6">
                    {MOCK_REVIEWS.map((review) => (
                      <div key={review.id} className="flex gap-4">
                        <Avatar>
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold">{review.author}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-secondary text-secondary" : "text-muted"}`}
                                    />
                                  ))}
                                </div>
                                <span>•</span>
                                <span>{review.date}</span>
                                {review.verified && (
                                  <>
                                    <span>•</span>
                                    <Badge variant="secondary" className="text-xs">
                                      {t("restaurant.verifiedVisit")}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Plats similaires</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SIMILAR_ITEMS.map((item) => (
              <Link key={item.id} href={`/menu-items/${item.id}`}>
                <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.imageUrl || "/placeholder.svg?height=300&width=400"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-muted-foreground">({item.reviewCount})</span>
                      </div>
                      <span className="text-lg font-bold">€{item.price.toFixed(2)}</span>
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
