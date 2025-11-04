"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Star, ShoppingCart, Check, Minus, Plus, Store, ChevronLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/i18n-context"
import { createBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string
  business_id: string
  name: string
  description: string
  category: string
  price: number
  original_price: number | null
  image_url: string
  rating: number
  review_count: number
  in_stock: boolean
  weight: string | null
  shelf_life: string | null
  storage_instructions: string | null
  certifications: string[] | null
}

type Business = {
  id: string
  name: string
  country_origin: string
}

type Review = {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const [product, setProduct] = useState<Product | null>(null)
  const [business, setBusiness] = useState<Business | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProductData() {
      try {
        setLoading(true)
        const supabase = createBrowserClient()

        if (!supabase) {
          throw new Error("Supabase client not initialized. Please check your environment variables.")
        }

        // Fetch product
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", params.id)
          .single()

        if (productError) throw productError
        setProduct(productData)

        // Fetch business
        const { data: businessData, error: businessError } = await supabase
          .from("businesses")
          .select("id, name, country_origin")
          .eq("id", productData.business_id)
          .single()

        if (businessError) throw businessError
        setBusiness(businessData)

        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select("*")
          .eq("product_id", params.id)
          .order("created_at", { ascending: false })
          .limit(3)

        if (reviewsError) throw reviewsError
        setReviews(reviewsData || [])

        // Fetch related products (same category)
        const { data: relatedData, error: relatedError } = await supabase
          .from("products")
          .select("*")
          .eq("category", productData.category)
          .neq("id", params.id)
          .limit(4)

        if (relatedError) throw relatedError
        setRelatedProducts(relatedData || [])
      } catch (error) {
        console.error("[v0] Error fetching product data:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du produit",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [params.id, toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!product || !business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Produit introuvable</h1>
          <p className="text-muted-foreground mb-4">Le produit que vous recherchez n'existe pas.</p>
          <Button onClick={() => router.push("/")}>Retour à l'accueil</Button>
        </div>
      </div>
    )
  }

  // Mock additional images (in real app, these would come from database)
  const productImages = [product.image_url, "/african-spices-colorful.jpg", "/african-grains-rice.jpg"]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.image_url,
      businessId: business.id,
      businessName: business.name,
    })

    toast({
      title: t("product.addedToCart"),
      description: `${quantity} x ${product.name}`,
      action: (
        <Button variant="outline" size="sm" onClick={() => router.push("/cart")}>
          {t("product.viewCart")}
        </Button>
      ),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="hidden md:block sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 h-14 overflow-x-auto">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary whitespace-nowrap"
            >
              Accueil
            </Link>
            <Link
              href="/search/results?type=store"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-[#D2691E]/10 hover:text-[#D2691E] whitespace-nowrap"
            >
              Magasins
            </Link>
            <Link
              href="/search/results?type=restaurant"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-[#FF6347]/10 hover:text-[#FF6347] whitespace-nowrap"
            >
              Restaurants
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary whitespace-nowrap"
            >
              À propos
            </Link>
            <Link
              href="/help"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary whitespace-nowrap"
            >
              Aide
            </Link>
          </div>
        </div>
      </nav>

      <div className="border-b bg-muted/30 sticky top-[64px] md:top-[120px] z-30 backdrop-blur supports-[backdrop-filter]:bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* SearchBar removed as it's not imported */}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            {t("common.back")}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.original_price && (
                <Badge className="absolute left-4 top-4 bg-destructive text-destructive-foreground">
                  {t("store.sale")}
                </Badge>
              )}
              {!product.in_stock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <Badge variant="secondary" className="text-lg">
                    {t("store.outOfStock")}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === idx ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Store Info */}
            <Link href={`/stores/${business.id}`} className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("product.fromSameStore")}</p>
                <p className="font-semibold group-hover:text-primary">{business.name}</p>
              </div>
            </Link>

            <Separator />

            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">
                    ({product.review_count} {t("store.reviews").toLowerCase()})
                  </span>
                </div>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">€{product.price}</span>
              {product.original_price && (
                <>
                  <span className="text-2xl text-muted-foreground line-through">€{product.original_price}</span>
                  <Badge variant="destructive">
                    -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.in_stock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-500 font-medium">{t("product.inStock")}</span>
                </>
              ) : (
                <span className="text-destructive font-medium">{t("product.outOfStock")}</span>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">{t("product.description")}</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">{t("product.quantity")}:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.in_stock}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.in_stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.in_stock}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t("product.addToCart")}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("product.sku")}:</span>
                <span className="font-medium">{product.id.toUpperCase().slice(0, 8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("product.category")}:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("product.origin")}:</span>
                <span className="font-medium">{business.country_origin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-12 space-y-8">
          {/* Specifications */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">{t("product.specifications")}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.weight && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("product.weight")}</p>
                    <p className="font-medium">{product.weight}</p>
                  </div>
                )}
                {product.shelf_life && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("product.shelfLife")}</p>
                    <p className="font-medium">{product.shelf_life}</p>
                  </div>
                )}
                {product.storage_instructions && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("product.storage")}</p>
                    <p className="font-medium">{product.storage_instructions}</p>
                  </div>
                )}
                {product.certifications && product.certifications.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("product.certifications")}</p>
                    <div className="flex gap-2 flex-wrap">
                      {product.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Customer Reviews */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t("product.reviews")}</h2>
                <Button>{t("product.writeReview")}</Button>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
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
                                    className={`h-3.5 w-3.5 ${
                                      star <= review.rating ? "fill-secondary text-secondary" : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span>•</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Aucun avis pour le moment</p>
              )}
            </CardContent>
          </Card>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t("product.relatedProducts")}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group overflow-hidden">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.image_url || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link href={`/products/${relatedProduct.id}`}>
                        <h3 className="font-semibold mb-1 line-clamp-1 hover:text-primary">{relatedProduct.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2 text-sm">
                        <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                        <span className="font-medium">{relatedProduct.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">€{relatedProduct.price}</span>
                        <Button size="sm" variant="outline">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
