"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Store, Search, HistoryIcon, CheckCircle } from "lucide-react"

interface HistoryItem {
  id: string
  productName: string
  productPrice: number
  productImage: string
  storeName: string
  storeLocation: string
  quantity: number
  reservationDate: string
  pickupDate: string
  completedDate: string
  status: "completed"
}

export default function HistoryPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Load history from localStorage
    const storedHistory = localStorage.getItem(`history_${user?.id}`)
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    } else {
      // Mock data for demonstration
      const mockHistory: HistoryItem[] = [
        {
          id: "1",
          productName: "Sac à Main en Cuir Artisanal",
          productPrice: 25000,
          productImage: "/leather-handbag.png",
          storeName: "Artisanat Ivoirien",
          storeLocation: "Abidjan, Marcory",
          quantity: 1,
          reservationDate: "2025-01-10",
          pickupDate: "2025-01-15",
          completedDate: "2025-01-15",
          status: "completed",
        },
        {
          id: "2",
          productName: "Café Arabica Premium 1kg",
          productPrice: 12000,
          productImage: "/pile-of-coffee-beans.png",
          storeName: "Café d'Afrique",
          storeLocation: "Abidjan, Cocody",
          quantity: 2,
          reservationDate: "2025-01-05",
          pickupDate: "2025-01-08",
          completedDate: "2025-01-08",
          status: "completed",
        },
        {
          id: "3",
          productName: "Panier Artisanal Tressé",
          productPrice: 8000,
          productImage: "/woven-basket.png",
          storeName: "Artisanat Local",
          storeLocation: "Abidjan, Plateau",
          quantity: 3,
          reservationDate: "2024-12-20",
          pickupDate: "2024-12-25",
          completedDate: "2024-12-25",
          status: "completed",
        },
      ]
      setHistory(mockHistory)
      localStorage.setItem(`history_${user?.id}`, JSON.stringify(mockHistory))
    }
  }, [isAuthenticated, user, router])

  const filteredHistory = history
    .filter(
      (item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.storeName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.completedDate).getTime() - new Date(b.completedDate).getTime()
      } else if (sortBy === "price-high") {
        return b.productPrice * b.quantity - a.productPrice * a.quantity
      } else {
        return a.productPrice * a.quantity - b.productPrice * b.quantity
      }
    })

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-full bg-primary/10 p-3">
            <HistoryIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-balance">Historique</h1>
        </div>
        <p className="text-muted-foreground">Consultez l'historique de toutes vos réservations complétées</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans l'historique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="oldest">Plus ancien</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <HistoryIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Aucun historique</h3>
              <p className="text-muted-foreground max-w-md">
                {searchQuery
                  ? "Aucun résultat trouvé pour votre recherche"
                  : "Vous n'avez pas encore complété de réservation"}
              </p>
            </div>
            {!searchQuery && <Button onClick={() => router.push("/")}>Découvrir des produits</Button>}
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-4 p-4">
                  <img
                    src={item.productImage || "/placeholder.svg"}
                    alt={item.productName}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2">{item.productName}</h3>
                        <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complétée
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Store className="h-4 w-4" />
                        <span>{item.storeName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{item.storeLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Réservé le: {new Date(item.reservationDate).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Complété le: {new Date(item.completedDate).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-xl font-bold text-primary">
                        {(item.productPrice * item.quantity).toLocaleString()} FCFA
                      </span>
                      <Button variant="outline" size="sm">
                        Réserver à nouveau
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {filteredHistory.length > 0 && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Statistiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{history.length}</p>
                <p className="text-sm text-muted-foreground">Réservations complétées</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {history.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Produits récupérés</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {history.reduce((sum, item) => sum + item.productPrice * item.quantity, 0).toLocaleString()} FCFA
                </p>
                <p className="text-sm text-muted-foreground">Total dépensé</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
