"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Search, Plus, CalendarIcon, Users, Clock, Phone, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Reservation {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  date: string
  time: string
  guests: number
  tableNumber?: number
  status: "confirmee" | "en-attente" | "annulee"
  specialRequests?: string
}

export default function RestaurantReservationsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      customerName: "Marie Dupont",
      customerPhone: "+33 6 12 34 56 78",
      customerEmail: "marie.dupont@email.com",
      date: "2025-01-25",
      time: "19:30",
      guests: 4,
      tableNumber: 5,
      status: "confirmee",
      specialRequests: "Table près de la fenêtre si possible",
    },
    {
      id: "2",
      customerName: "Jean Martin",
      customerPhone: "+33 6 98 76 54 32",
      customerEmail: "jean.martin@email.com",
      date: "2025-01-25",
      time: "20:00",
      guests: 2,
      status: "en-attente",
    },
    {
      id: "3",
      customerName: "Sophie Bernard",
      customerPhone: "+33 6 11 22 33 44",
      customerEmail: "sophie.bernard@email.com",
      date: "2025-01-26",
      time: "19:00",
      guests: 6,
      tableNumber: 8,
      status: "confirmee",
      specialRequests: "Anniversaire - prévoir un dessert",
    },
  ])

  const handleConfirm = (reservationId: string) => {
    setReservations(
      reservations.map((res) => (res.id === reservationId ? { ...res, status: "confirmee" as const } : res)),
    )
    toast({
      title: "Réservation confirmée",
      description: "La réservation a été confirmée avec succès",
    })
  }

  const handleCancel = (reservationId: string) => {
    setReservations(
      reservations.map((res) => (res.id === reservationId ? { ...res, status: "annulee" as const } : res)),
    )
    toast({
      title: "Réservation annulée",
      description: "La réservation a été annulée",
    })
  }

  const filteredReservations = reservations.filter(
    (res) =>
      res.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.customerPhone.includes(searchQuery) ||
      res.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const todayReservations = filteredReservations.filter((res) => res.date === new Date().toISOString().split("T")[0])

  const getStatusBadge = (status: Reservation["status"]) => {
    const variants: Record<Reservation["status"], { variant: "default" | "secondary" | "destructive"; label: string }> =
      {
        confirmee: { variant: "default", label: "Confirmée" },
        "en-attente": { variant: "secondary", label: "En attente" },
        annulee: { variant: "destructive", label: "Annulée" },
      }
    return variants[status]
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">Réservations</h1>
            <p className="text-muted-foreground">Gérez les réservations de tables</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle réservation
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{todayReservations.length}</div>
              <p className="text-muted-foreground text-xs">
                {todayReservations.reduce((acc, res) => acc + res.guests, 0)} couverts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Confirmées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{reservations.filter((r) => r.status === "confirmee").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{reservations.filter((r) => r.status === "en-attente").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Ce mois-ci</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{reservations.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Reservations List */}
          <div className="space-y-4 lg:col-span-2">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nom, téléphone ou email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Reservations */}
            <div className="space-y-4">
              {filteredReservations.map((reservation) => (
                <Card key={reservation.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-lg">{reservation.customerName}</p>
                        <div className="mt-1 flex flex-wrap gap-3 text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{reservation.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{reservation.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{reservation.guests} personnes</span>
                          </div>
                          {reservation.tableNumber && <span>• Table {reservation.tableNumber}</span>}
                        </div>
                      </div>
                      <Badge {...getStatusBadge(reservation.status)}>{getStatusBadge(reservation.status).label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{reservation.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{reservation.customerEmail}</span>
                      </div>
                    </div>

                    {reservation.specialRequests && (
                      <div className="rounded-lg border bg-muted/50 p-3">
                        <p className="font-medium text-sm">Demandes spéciales :</p>
                        <p className="text-muted-foreground text-sm">{reservation.specialRequests}</p>
                      </div>
                    )}

                    {reservation.status === "en-attente" && (
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => handleConfirm(reservation.id)}>
                          Confirmer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleCancel(reservation.id)}
                        >
                          Annuler
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Reservation Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nouvelle réservation</DialogTitle>
            <DialogDescription>Créez une nouvelle réservation de table</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customer-name">Nom du client</Label>
              <Input id="customer-name" placeholder="Ex: Marie Dupont" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customer-phone">Téléphone</Label>
                <Input id="customer-phone" type="tel" placeholder="+33 6 12 34 56 78" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input id="customer-email" type="email" placeholder="email@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="res-date">Date</Label>
                <Input id="res-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="res-time">Heure</Label>
                <Input id="res-time" type="time" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="res-guests">Personnes</Label>
                <Input id="res-guests" type="number" min="1" placeholder="2" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="res-table">Numéro de table (optionnel)</Label>
              <Input id="res-table" type="number" placeholder="5" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="res-requests">Demandes spéciales (optionnel)</Label>
              <Input id="res-requests" placeholder="Ex: Table près de la fenêtre" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Réservation créée",
                  description: "La réservation a été créée avec succès",
                })
                setIsAddDialogOpen(false)
              }}
            >
              Créer la réservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
