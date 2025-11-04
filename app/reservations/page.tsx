"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Store, Phone, X, CheckCircle, Clock } from "lucide-react"
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
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Load reservations from localStorage
    const storedReservations = localStorage.getItem(`reservations_${user?.id}`)
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
      localStorage.setItem(`reservations_${user?.id}`, JSON.stringify(mockReservations))
    }
  }, [isAuthenticated, user, router])

  const cancelReservation = (reservationId: string) => {
    const updatedReservations = reservations.map((res) =>
      res.id === reservationId ? { ...res, status: "cancelled" as const } : res,
    )
    setReservations(updatedReservations)
    localStorage.setItem(`reservations_${user?.id}`, JSON.stringify(updatedReservations))

    toast({
      title: "Réservation annulée",
      description: "Votre réservation a été annulée avec succès.",
    })
  }

  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmée
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
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

  if (!isAuthenticated) {
    return null
  }

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <img
            src={reservation.productImage || "/placeholder.svg"}
            alt={reservation.productName}
            className="w-full md:w-32 h-32 object-cover rounded-lg"
          />

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg line-clamp-2">{reservation.productName}</h3>
                <p className="text-sm text-muted-foreground">Quantité: {reservation.quantity}</p>
              </div>
              {getStatusBadge(reservation.status)}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Store className="h-4 w-4" />
                <span>{reservation.storeName}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{reservation.storeLocation}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{reservation.storePhone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Retrait prévu: {new Date(reservation.pickupDate).toLocaleDateString("fr-FR")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-xl font-bold text-primary">
                {(reservation.productPrice * reservation.quantity).toLocaleString()} FCFA
              </span>
              {reservation.status === "pending" && (
                <Button variant="destructive" size="sm" onClick={() => cancelReservation(reservation.id)}>
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-2">Mes réservations</h1>
        <p className="text-muted-foreground">Gérez vos réservations de produits et suivez leur statut</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Toutes ({reservations.length})</TabsTrigger>
          <TabsTrigger value="pending">En attente ({filterReservations("pending").length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmées ({filterReservations("confirmed").length})</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées ({filterReservations("cancelled").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {reservations.length === 0 ? (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-full bg-muted p-6">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Aucune réservation</h3>
                  <p className="text-muted-foreground max-w-md">
                    Vous n'avez pas encore de réservation. Commencez à réserver des produits !
                  </p>
                </div>
                <Button onClick={() => router.push("/")}>Découvrir des produits</Button>
              </div>
            </Card>
          ) : (
            reservations.map((reservation) => <ReservationCard key={reservation.id} reservation={reservation} />)
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterReservations("pending").map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {filterReservations("confirmed").map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {filterReservations("cancelled").map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
