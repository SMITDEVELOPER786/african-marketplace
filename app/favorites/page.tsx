"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Store, Trash2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Favorite {
  id: string
  productId: string
  productName: string
  productPrice: number
  productImage: string
  storeName: string
  storeLocation: string
  category: string
  addedAt: string
}

// Sample data for testing
const sampleFavorites: Favorite[] = [
  {
    id: '1',
    productId: 'prod1',
    productName: 'Jollof Rice Special',
    productPrice: 4500,
    productImage: '/vibrant-jollof-rice.png',
    storeName: 'Mama Africa Restaurant',
    storeLocation: 'Paris, France',
    category: 'Restaurant',
    addedAt: '2024-01-15'
  },
  {
    id: '2',
    productId: 'prod2',
    productName: 'African Print Fabric',
    productPrice: 12000,
    productImage: '/african-fabric.jpg',
    storeName: 'Afro Style Boutique',
    storeLocation: 'Lyon, France',
    category: 'Fashion',
    addedAt: '2024-01-14'
  },
  {
    id: '3',
    productId: 'prod3',
    productName: 'Organic Shea Butter',
    productPrice: 8500,
    productImage: '/shea-butter.jpg',
    storeName: 'Natural Beauty Shop',
    storeLocation: 'Marseille, France',
    category: 'Beauty',
    addedAt: '2024-01-13'
  },
  {
    id: '4',
    productId: 'prod4',
    productName: 'Traditional Spice Mix',
    productPrice: 3200,
    productImage: '/african-spices.png',
    storeName: 'Afro Spice Market',
    storeLocation: 'Lille, France',
    category: 'Food',
    addedAt: '2024-01-12'
  }
]

export default function FavoritesPage() {
  // const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem(`favorites_default`)
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    } else {
      // If no favorites exist, set sample data for testing
      setFavorites(sampleFavorites)
      localStorage.setItem(`favorites_default`, JSON.stringify(sampleFavorites))
    }
  }, [router])

  const removeFavorite = (favoriteId: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== favoriteId)
    setFavorites(updatedFavorites)
    localStorage.setItem(`favorites_default`, JSON.stringify(updatedFavorites))

    toast({
      title: "Retiré des favoris",
      description: "Le produit a été retiré de vos favoris.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header with Back Button */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-3 gap-2 text-muted-foreground hover:text-foreground text-xs sm:text-sm"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Retour
          </Button>
          
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-balance mb-1">
                Mes favoris
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {favorites.length} {favorites.length === 1 ? 'produit sauvegardé' : 'produits sauvegardés'}
              </p>
            </div>
            
            {favorites.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="w-full xs:w-auto text-xs"
              >
                Découvrir plus
              </Button>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          // Empty State - Responsive
          <Card className="p-4 sm:p-6 lg:p-8 mx-auto max-w-xs xs:max-w-sm sm:max-w-md">
            <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4">
              <div className="rounded-full bg-muted p-3 sm:p-4">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                  Aucun favori pour le moment
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Commencez à ajouter des produits à vos favoris
                </p>
              </div>
              <Button 
                onClick={() => router.push("/")}
                className="w-full sm:w-auto text-xs sm:text-sm"
                size="sm"
              >
                Découvrir des produits
              </Button>
            </div>
          </Card>
        ) : (
          // Responsive Cards Grid
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 lg:gap-6 justify-items-center">
            {favorites.map((favorite) => (
              <Card 
                key={favorite.id} 
                className="group overflow-hidden hover:shadow-md transition-all duration-200 border shadow-sm w-full max-w-[180px] xs:max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px]"
              >
                {/* Responsive Image Container */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={favorite.productImage || "/placeholder.svg"}
                    alt={favorite.productName}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  
                  {/* Delete Button - Responsive */}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-1 right-1 h-5 w-5 xs:h-6 xs:w-6 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-all"
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    <Trash2 className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
                  </Button>

                  {/* Category Badge - Responsive */}
                  <div className="absolute top-1 left-1">
                    <Badge 
                      variant="secondary" 
                      className="text-[10px] xs:text-xs bg-primary/90 text-primary-foreground backdrop-blur-sm px-1.5 py-0.5"
                    >
                      {favorite.category}
                    </Badge>
                  </div>
                </div>

                {/* Responsive Content */}
                <CardContent className="p-2 xs:p-2.5 sm:p-3 space-y-1 xs:space-y-1.5">
                  {/* Product Name */}
                  <h3 className="font-medium text-[11px] xs:text-xs sm:text-sm line-clamp-2 leading-tight min-h-[2rem] xs:min-h-[2.5rem]">
                    {favorite.productName}
                  </h3>

                  {/* Store Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] xs:text-xs text-muted-foreground">
                      <Store className="h-2.5 w-2.5 xs:h-3 xs:w-3 flex-shrink-0" />
                      <span className="truncate">{favorite.storeName}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-[10px] xs:text-xs text-muted-foreground">
                      <MapPin className="h-2.5 w-2.5 xs:h-3 xs:w-3 flex-shrink-0" />
                      <span className="truncate">{favorite.storeLocation}</span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between pt-1 xs:pt-1.5 border-t">
                    <div>
                      <span className="text-xs xs:text-sm font-bold text-primary">
                        {favorite.productPrice.toLocaleString()} FCFA
                      </span>
                    </div>
                    <Link href={`/reservations?productId=${favorite.productId}`}>
                      <Button 
                        size="sm" 
                        className="text-[10px] xs:text-xs h-6 xs:h-7 px-2 bg-primary hover:bg-primary/90"
                      >
                        Réserver
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button - Responsive */}
        {favorites.length > 10 && (
          <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/")}
              className="text-xs sm:text-sm"
            >
              Voir plus de produits
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}