"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Store, Phone, X, CheckCircle, Clock, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Reservation {
  id: string
  productName: string
  productPrice: number
  productImage: string
  storeName: string
  storeLocation: string
  storePhone: string
  quantity: number
  status: "pending" | "confirmed" | "cancelled"
  reservationDate: string
  pickupDate: string
}

export default function ReservationsPage() {
  // const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    // Comment out authentication check
    // if (!isAuthenticated) {
    //   router.push("/")
    //   return
    // }

    // Load reservations from localStorage - using default key
    const storedReservations = localStorage.getItem(`reservations_default`)
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations))
    } else {
      // Mock data for demonstration
      const mockReservations: Reservation[] = [
        {
          id: "1",
          productName: "Tissu Wax Premium - Motif Africain",
          productPrice: 15000,
          productImage: "/african-fabric.jpg",
          storeName: "Boutique Africaine",
          storeLocation: "Abidjan, Plateau",
          storePhone: "+225 07 XX XX XX XX",
          quantity: 2,
          status: "confirmed",
          reservationDate: "2025-01-20",
          pickupDate: "2025-01-25",
        },
        {
          id: "2",
          productName: "Huile de Palme Bio 5L",
          productPrice: 8000,
          productImage: "/palm-oil-plantation.png",
          storeName: "Marché Bio",
          storeLocation: "Abidjan, Cocody",
          storePhone: "+225 05 XX XX XX XX",
          quantity: 1,
          status: "pending",
          reservationDate: "2025-01-22",
          pickupDate: "2025-01-27",
        },
      ]
      setReservations(mockReservations)
      localStorage.setItem(`reservations_default`, JSON.stringify(mockReservations))
    }
  }, [/* isAuthenticated, user, */ router])

  const cancelReservation = (reservationId: string) => {
    const updatedReservations = reservations.map((res) =>
      res.id === reservationId ? { ...res, status: "cancelled" as const } : res,
    )
    setReservations(updatedReservations)
    localStorage.setItem(`reservations_default`, JSON.stringify(updatedReservations))

    toast({
      title: "Réservation annulée",
      description: "Votre réservation a été annulée avec succès.",
    })
  }

  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmée
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive" className="text-xs">
            <X className="h-3 w-3 mr-1" />
            Annulée
          </Badge>
        )
    }
  }

  const filterReservations = (status?: Reservation["status"]) => {
    if (!status) return reservations
    return reservations.filter((res) => res.status === status)
  }

  // Comment out authentication check
  // if (!isAuthenticated) {
  //   return null
  // }

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 p-3 xs:p-4 sm:p-6">
          {/* Product Image */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <img
              src={reservation.productImage || "/placeholder.svg"}
              alt={reservation.productName}
              className="w-full xs:w-28 sm:w-32 h-24 xs:h-28 sm:h-32 object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2 xs:space-y-3 min-w-0">
            {/* Header with Title and Status */}
            <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm xs:text-base sm:text-lg line-clamp-2 leading-tight">
                  {reservation.productName}
                </h3>
                <p className="text-xs xs:text-sm text-muted-foreground mt-1">
                  Quantité: {reservation.quantity}
                </p>
              </div>
              <div className="flex-shrink-0">
                {getStatusBadge(reservation.status)}
              </div>
            </div>

            {/* Store and Contact Info */}
            <div className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Store className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                <span className="truncate">{reservation.storeName}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                <span className="truncate">{reservation.storeLocation}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                <span className="truncate">{reservation.storePhone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                <span>Retrait: {new Date(reservation.pickupDate).toLocaleDateString("fr-FR")}</span>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pt-2 xs:pt-3 border-t">
              <span className="text-lg xs:text-xl font-bold text-primary">
                {(reservation.productPrice * reservation.quantity).toLocaleString()} FCFA
              </span>
              {reservation.status === "pending" && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => cancelReservation(reservation.id)}
                  className="w-full xs:w-auto text-xs"
                >
                  Annuler
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-3 gap-2 text-muted-foreground hover:text-foreground text-xs sm:text-sm"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Retour
          </Button>
          
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-balance mb-2">
              Mes réservations
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Gérez vos réservations de produits et suivez leur statut
            </p>
          </div>
        </div>

        {/* Responsive Tabs */}
        <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="w-full flex min-w-max p-1 h-auto bg-muted/50">
              <TabsTrigger 
                value="all" 
                className="flex-1 min-w-0 text-xs xs:text-sm px-2 xs:px-3 py-2 data-[state=active]:bg-background"
              >
                Toutes
                <span className="ml-1.5 text-muted-foreground">
                  ({reservations.length})
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="pending" 
                className="flex-1 min-w-0 text-xs xs:text-sm px-2 xs:px-3 py-2 data-[state=active]:bg-background"
              >
                En attente
                <span className="ml-1.5 text-muted-foreground">
                  ({filterReservations("pending").length})
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="confirmed" 
                className="flex-1 min-w-0 text-xs xs:text-sm px-2 xs:px-3 py-2 data-[state=active]:bg-background"
              >
                Confirmées
                <span className="ml-1.5 text-muted-foreground">
                  ({filterReservations("confirmed").length})
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="cancelled" 
                className="flex-1 min-w-0 text-xs xs:text-sm px-2 xs:px-3 py-2 data-[state=active]:bg-background"
              >
                Annulées
                <span className="ml-1.5 text-muted-foreground">
                  ({filterReservations("cancelled").length})
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents */}
          <TabsContent value="all" className="space-y-3 xs:space-y-4">
            {reservations.length === 0 ? (
              <Card className="p-6 sm:p-8 lg:p-12">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="rounded-full bg-muted p-4 sm:p-6">
                    <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold">
                      Aucune réservation
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Vous n'avez pas encore de réservation. Commencez à réserver des produits !
                    </p>
                  </div>
                  <Button 
                    onClick={() => router.push("/")}
                    className="text-xs sm:text-sm"
                  >
                    Découvrir des produits
                  </Button>
                </div>
              </Card>
            ) : (
              reservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-3 xs:space-y-4">
            {filterReservations("pending").length === 0 ? (
              <Card className="p-6 text-center">
                <div className="space-y-2">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">Aucune réservation en attente</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous n'avez pas de réservations en attente de confirmation.
                  </p>
                </div>
              </Card>
            ) : (
              filterReservations("pending").map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-3 xs:space-y-4">
            {filterReservations("confirmed").length === 0 ? (
              <Card className="p-6 text-center">
                <div className="space-y-2">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">Aucune réservation confirmée</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous n'avez pas de réservations confirmées pour le moment.
                  </p>
                </div>
              </Card>
            ) : (
              filterReservations("confirmed").map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-3 xs:space-y-4">
            {filterReservations("cancelled").length === 0 ? (
              <Card className="p-6 text-center">
                <div className="space-y-2">
                  <X className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">Aucune réservation annulée</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous n'avez pas de réservations annulées.
                  </p>
                </div>
              </Card>
            ) : (
              filterReservations("cancelled").map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}