"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye, Clock, CheckCircle2, ShoppingBag, Bike, UtensilsCrossed } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  orderNumber: string
  customerName: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  type: "sur-place" | "emporter" | "livraison"
  status: "en-attente" | "en-preparation" | "pret" | "livre" | "annule"
  date: string
  time: string
  tableNumber?: number
  deliveryAddress?: string
}

export default function RestaurantOrdersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "CMD-001",
      customerName: "Marie Dupont",
      items: [
        { name: "Poulet Yassa", quantity: 2, price: 18.0 },
        { name: "Tiramisu", quantity: 2, price: 7.5 },
      ],
      total: 51.0,
      type: "sur-place",
      status: "en-preparation",
      date: "2025-01-25",
      time: "12:30",
      tableNumber: 5,
    },
    {
      id: "2",
      orderNumber: "CMD-002",
      customerName: "Jean Martin",
      items: [{ name: "Salade César", quantity: 1, price: 12.5 }],
      total: 12.5,
      type: "emporter",
      status: "pret",
      date: "2025-01-25",
      time: "12:45",
    },
    {
      id: "3",
      orderNumber: "CMD-003",
      customerName: "Sophie Bernard",
      items: [
        { name: "Menu du Midi", quantity: 1, price: 32.0 },
        { name: "Café", quantity: 1, price: 2.5 },
      ],
      total: 34.5,
      type: "livraison",
      status: "en-attente",
      date: "2025-01-25",
      time: "13:00",
      deliveryAddress: "15 Rue de la Paix, 75002 Paris",
    },
  ])

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    toast({
      title: "Statut mis à jour",
      description: `La commande a été marquée comme "${newStatus}"`,
    })
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsDialogOpen(true)
  }

  const getStatusBadge = (status: Order["status"]) => {
    const variants: Record<Order["status"], { variant: "default" | "secondary" | "destructive"; label: string }> = {
      "en-attente": { variant: "secondary", label: "En attente" },
      "en-preparation": { variant: "default", label: "En préparation" },
      pret: { variant: "default", label: "Prêt" },
      livre: { variant: "default", label: "Livré" },
      annule: { variant: "destructive", label: "Annulé" },
    }
    return variants[status]
  }

  const getTypeIcon = (type: Order["type"]) => {
    switch (type) {
      case "sur-place":
        return <UtensilsCrossed className="h-4 w-4" />
      case "emporter":
        return <ShoppingBag className="h-4 w-4" />
      case "livraison":
        return <Bike className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: Order["type"]) => {
    switch (type) {
      case "sur-place":
        return "Sur place"
      case "emporter":
        return "À emporter"
      case "livraison":
        return "Livraison"
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const ordersByStatus = {
    "en-attente": filteredOrders.filter((o) => o.status === "en-attente"),
    "en-preparation": filteredOrders.filter((o) => o.status === "en-preparation"),
    pret: filteredOrders.filter((o) => o.status === "pret"),
    termine: filteredOrders.filter((o) => o.status === "livre" || o.status === "annule"),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">Commandes</h1>
            <p className="text-muted-foreground">Gérez les commandes de votre restaurant</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{ordersByStatus["en-attente"].length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">En préparation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{ordersByStatus["en-preparation"].length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Prêtes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{ordersByStatus.pret.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{orders.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="N° de commande ou client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Tabs */}
        <Tabs defaultValue="en-attente" className="space-y-4">
          <TabsList>
            <TabsTrigger value="en-attente">En attente ({ordersByStatus["en-attente"].length})</TabsTrigger>
            <TabsTrigger value="en-preparation">En préparation ({ordersByStatus["en-preparation"].length})</TabsTrigger>
            <TabsTrigger value="pret">Prêtes ({ordersByStatus.pret.length})</TabsTrigger>
            <TabsTrigger value="termine">Terminées ({ordersByStatus.termine.length})</TabsTrigger>
          </TabsList>

          {Object.entries(ordersByStatus).map(([status, statusOrders]) => (
            <TabsContent key={status} value={status} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statusOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{order.orderNumber}</p>
                          <p className="text-muted-foreground text-sm">{order.customerName}</p>
                        </div>
                        <Badge {...getStatusBadge(order.status)}>{getStatusBadge(order.status).label}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        {getTypeIcon(order.type)}
                        <span>{getTypeLabel(order.type)}</span>
                        {order.tableNumber && <span>• Table {order.tableNumber}</span>}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>{(item.quantity * item.price).toFixed(2)} €</span>
                          </div>
                        ))}
                        <div className="flex justify-between border-t pt-2 font-semibold">
                          <span>Total</span>
                          <span>{order.total.toFixed(2)} €</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock className="h-4 w-4" />
                        <span>
                          {order.date} à {order.time}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleViewDetails(order)}
                        >
                          <Eye className="mr-2 h-3 w-3" />
                          Détails
                        </Button>
                        {order.status === "en-attente" && (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleUpdateStatus(order.id, "en-preparation")}
                          >
                            <CheckCircle2 className="mr-2 h-3 w-3" />
                            Préparer
                          </Button>
                        )}
                        {order.status === "en-preparation" && (
                          <Button size="sm" className="flex-1" onClick={() => handleUpdateStatus(order.id, "pret")}>
                            <CheckCircle2 className="mr-2 h-3 w-3" />
                            Prêt
                          </Button>
                        )}
                        {order.status === "pret" && (
                          <Button size="sm" className="flex-1" onClick={() => handleUpdateStatus(order.id, "livre")}>
                            <CheckCircle2 className="mr-2 h-3 w-3" />
                            Livré
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la commande</DialogTitle>
            <DialogDescription>Commande {selectedOrder?.orderNumber}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Client</Label>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Type</Label>
                  <p className="font-medium">{getTypeLabel(selectedOrder.type)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Date & Heure</Label>
                  <p className="font-medium">
                    {selectedOrder.date} à {selectedOrder.time}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Statut</Label>
                  <Badge {...getStatusBadge(selectedOrder.status)}>{getStatusBadge(selectedOrder.status).label}</Badge>
                </div>
              </div>

              {selectedOrder.tableNumber && (
                <div>
                  <Label className="text-muted-foreground text-xs">Table</Label>
                  <p className="font-medium">Table {selectedOrder.tableNumber}</p>
                </div>
              )}

              {selectedOrder.deliveryAddress && (
                <div>
                  <Label className="text-muted-foreground text-xs">Adresse de livraison</Label>
                  <p className="font-medium">{selectedOrder.deliveryAddress}</p>
                </div>
              )}

              <div>
                <Label className="mb-2 text-muted-foreground text-xs">Articles</Label>
                <div className="space-y-2 rounded-lg border p-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">{(item.quantity * item.price).toFixed(2)} €</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t pt-2 font-semibold text-lg">
                    <span>Total</span>
                    <span>{selectedOrder.total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
