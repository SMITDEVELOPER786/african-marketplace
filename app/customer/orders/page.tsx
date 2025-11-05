"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const allOrders = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD-2025-${String(i + 1).padStart(3, "0")}`,
  date: `2025-01-${String(20 - i).padStart(2, "0")}`,
  status: i < 3 ? "in_progress" : i < 15 ? "delivered" : "cancelled",
  total: 32.5 + i * 5.5,
  items: 2 + (i % 4),
  storeName:
    i % 3 === 0
      ? "Afro Spice Market"
      : i % 3 === 1
      ? "Sahel Grocery"
      : "Boutique Africaine",
  storeId: String((i % 3) + 1),
  deliveryType: i % 2 === 0 ? "delivery" : "pickup",
  address:
    i % 2 === 0
      ? "123 Rue de la République, 75011 Paris"
      : "456 Avenue des Champs, 75008 Paris",
  paymentMethod: "cash",
}))

const ITEMS_PER_PAGE = 6

export default function OrdersPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge variant="default" className="gap-1 bg-green-500 text-xs">
            <CheckCircle className="h-3 w-3" />
            Livrée
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="default" className="gap-1 bg-blue-500 text-xs">
            <Clock className="h-3 w-3" />
            En cours
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive" className="gap-1 text-xs">
            <XCircle className="h-3 w-3" />
            Annulée
          </Badge>
        )
      default:
        return <Badge className="text-xs">{status}</Badge>
    }
  }

  const filteredOrders =
    activeTab === "all"
      ? allOrders
      : allOrders.filter((order) => order.status === activeTab)

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handleReorder = (order: (typeof allOrders)[0]) => {
    toast({
      title: "Articles ajoutés au panier",
      description: `${order.items} article(s) de ${order.storeName} ont été ajoutés à votre panier.`,
    })
    setTimeout(() => {
      router.push("/customer/cart")
    }, 1500)
  }

  return (
    <div className="space-y-4 px-3 sm:px-4 md:px-6 max-w-full overflow-x-hidden pr-0 pl-0">
      {/* Header - Centered on mobile, left-aligned on desktop */}
      <div className="w-full">
        <div className="max-w-full w-full text-center md:text-left">
          <h1 className="text-xl font-bold tracking-tight break-words leading-tight sm:text-2xl">
            Commandes
          </h1>
          <p className="text-muted-foreground text-sm leading-snug mt-1 sm:text-base">
            Suivez l'historique de toutes vos commandes
          </p>
        </div>
      </div>

      {/* Tabs with horizontal scroll for mobile - Adjusted left alignment */}
      <div className="overflow-x-auto w-full -mx-2 px-2">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value)
            setCurrentPage(1)
          }}
          className="w-full"
        >
          <TabsList className="inline-flex w-max min-w-full sm:w-auto">
            <TabsTrigger value="all" className="flex-shrink-0 text-xs px-3 py-2 sm:text-sm">
              Toutes ({allOrders.length})
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="flex-shrink-0 text-xs px-3 py-2 sm:text-sm">
              En cours ({allOrders.filter((o) => o.status === "in_progress").length})
            </TabsTrigger>
            <TabsTrigger value="delivered" className="flex-shrink-0 text-xs px-3 py-2 sm:text-sm">
              Livrées ({allOrders.filter((o) => o.status === "delivered").length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex-shrink-0 text-xs px-3 py-2 sm:text-sm">
              Annulées ({allOrders.filter((o) => o.status === "cancelled").length})
            </TabsTrigger>
          </TabsList>

          {/* Orders List */}
          <TabsContent value={activeTab} className="mt-4 space-y-3">
            {paginatedOrders.length === 0 ? (
              <Card className="mx-1">
                <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <Package className="h-10 w-10 text-muted-foreground/50 sm:h-12 sm:w-12" />
                  <h3 className="mt-3 text-base font-semibold sm:text-lg">Aucune commande</h3>
                  <p className="mt-1 text-center text-xs text-muted-foreground sm:text-sm">
                    Vous n'avez pas encore passé de commande
                  </p>
                  <Link href="/stores" className="w-full max-w-[200px] mt-4">
                    <Button className="w-full bg-[#B85C38] hover:bg-[#9A4A2E] text-sm">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Commencer mes achats
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <>
                {paginatedOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden mx-1">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg truncate">
                            {order.storeName}
                          </CardTitle>
                          <div className="space-y-1 mt-1">
                            <p className="text-xs text-muted-foreground sm:text-sm">
                              Commande: {order.id}
                            </p>
                            <p className="text-xs text-muted-foreground sm:text-sm">
                              {new Date(order.date).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="self-start">
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-xs sm:text-sm">
                            {order.deliveryType === "delivery" ? "Livraison à" : "Retrait à"}
                          </p>
                          <p className="text-muted-foreground break-words text-xs sm:text-sm leading-relaxed">
                            {order.address}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-3 text-xs sm:text-sm">
                        <p className="font-medium">Mode de paiement</p>
                        <p className="text-muted-foreground mt-1">
                          💵 Paiement en espèces{" "}
                          {order.deliveryType === "delivery" ? "à la livraison" : "au retrait"}
                        </p>
                      </div>
                      
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between border-t pt-3 gap-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground sm:text-sm">
                              {order.items} article(s)
                            </p>
                            <p className="text-base font-semibold sm:text-lg">
                              €{order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col xs:flex-row gap-2 w-full xs:w-auto">
                          <Button variant="outline" size="sm" asChild className="flex-1 xs:flex-none text-xs">
                            <Link href={`/customer/orders/${order.id}`}>
                              Détails
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#B85C38] hover:bg-[#9A4A2E] flex-1 xs:flex-none text-xs"
                            onClick={() => handleReorder(order)}
                          >
                            Recommander
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination - Mobile Optimized */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-6 px-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 3) {
                          pageNum = i + 1
                        } else if (currentPage === 1) {
                          pageNum = i + 1
                        } else if (currentPage === totalPages) {
                          pageNum = totalPages - 2 + i
                        } else {
                          pageNum = currentPage - 1 + i
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="h-8 w-8 text-xs sm:h-9 sm:w-9 sm:text-sm"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                      {totalPages > 3 && currentPage < totalPages - 1 && (
                        <span className="px-2 text-xs text-muted-foreground">...</span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}