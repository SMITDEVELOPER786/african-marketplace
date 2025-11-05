"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tag, Clock, MapPin, Star } from "lucide-react"

const promotions = [
  {
    id: 1,
    title: "20% de réduction sur tous les produits",
    store: "Boutique Africaine",
    description: "Profitez de 20% de réduction sur tous nos produits africains authentiques",
    discount: "20%",
    validUntil: "2024-12-31",
    category: "Mode",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Menu spécial à 15€",
    store: "Restaurant Le Baobab",
    description: "Menu complet avec entrée, plat et dessert pour seulement 15€",
    discount: "15€",
    validUntil: "2024-12-25",
    category: "Restaurant",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Livraison gratuite",
    store: "Épicerie Tropicale",
    description: "Livraison gratuite pour toute commande supérieure à 30€",
    discount: "Gratuit",
    validUntil: "2024-12-20",
    category: "Épicerie",
    rating: 4.3,
  },
]

export default function PromotionsPage() {
  return (
    <div className="space-y-6 pt-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
        <p className="text-muted-foreground mt-2">Découvrez toutes les offres spéciales et promotions disponibles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promo) => (
          <Card key={promo.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="mb-2">
                  <Tag className="h-3 w-3 mr-1" />
                  {promo.category}
                </Badge>
                <Badge variant="destructive" className="text-lg font-bold">
                  {promo.discount}
                </Badge>
              </div>
              <CardTitle className="text-xl">{promo.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {promo.store}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{promo.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Valide jusqu'au {new Date(promo.validUntil).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{promo.rating}</span>
                </div>
              </div>

              <Button className="w-full">Voir l'offre</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
