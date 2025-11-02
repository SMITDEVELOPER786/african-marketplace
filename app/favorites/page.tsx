"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Store, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

export default function FavoritesPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem(`favorites_${user?.id}`)
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [isAuthenticated, user, router])

  const removeFavorite = (favoriteId: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== favoriteId)
    setFavorites(updatedFavorites)
    localStorage.setItem(`favorites_${user?.id}`, JSON.stringify(updatedFavorites))

    toast({
      title: "Retiré des favoris",
      description: "Le produit a été retiré de vos favoris.",
    })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-2">Mes favoris</h1>
        <p className="text-muted-foreground">Retrouvez tous les produits et magasins que vous avez sauvegardés</p>
      </div>

      {favorites.length === 0 ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Aucun favori pour le moment</h3>
              <p className="text-muted-foreground max-w-md">
                Commencez à ajouter des produits à vos favoris pour les retrouver facilement ici
              </p>
            </div>
            <Button onClick={() => router.push("/")}>Découvrir des produits</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <img
                  src={favorite.productImage || "/placeholder.svg"}
                  alt={favorite.productName}
                  className="w-full h-full object-cover"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => removeFavorite(favorite.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {favorite.category}
                  </Badge>
                  <h3 className="font-semibold text-lg line-clamp-2">{favorite.productName}</h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Store className="h-4 w-4" />
                  <span>{favorite.storeName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{favorite.storeLocation}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-2xl font-bold text-primary">{favorite.productPrice.toLocaleString()} FCFA</span>
                  <Button size="sm">Réserver</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
