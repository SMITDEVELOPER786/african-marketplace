"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Clock, CheckCircle, XCircle, MapPin, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const allOrders = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD-2025-${String(i + 1).padStart(3, "0")}`,
  date: `2025-01-${String(20 - i).padStart(2, "0")}`,
  status: i < 3 ? "in_progress" : i < 15 ? "delivered" : "cancelled",
  total: 32.5 + i * 5.5,
  items: 2 + (i % 4),
  storeName: i % 3 === 0 ? "Afro Spice Market" : i % 3 === 1 ? "Sahel Grocery" : "Boutique Africaine",
  storeId: String((i % 3) + 1),
  deliveryType: i % 2 === 0 ? "delivery" : "pickup",
  address: i % 2 === 0 ? "123 Rue de la République, 75011 Paris" : "456 Avenue des Champs, 75008 Paris",
  paymentMethod: "cash", // Toujours en espèces car pas de paiement en ligne
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
        return <Badge>{status}</Badge>
    }
  }

  const getFilteredOrders = () => {
    if (activeTab === "all") return allOrders
    return allOrders.filter((order) => order.status === activeTab)
  }

  const filteredOrders = getFilteredOrders()
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentPage(1)
  }

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center md:text-left mb-6">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight">Commandes</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Suivez l'historique de toutes vos commandes
          </p>
        </div>

        {/* Responsive Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div className="overflow-x-auto">
            <TabsList className="w-full flex min-w-max p-1 h-auto bg-muted/50">
              <TabsTrigger 
                value="all" 
                className="flex-1 min-w-0 text-xs xs:text-sm px-2 xs:px-3 py-2 data-[state=active]:bg-background"
              >
                Toutes
                <span className="ml-1.5 text-muted-foreground">
                  ({allOrders.length})
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="in_progress" 
                className="flex-1 min-w-0 text-xs xs:text-sm px-2 xs:px-3 py-2 data-[state=active]:bg-background"
              >
                En cours
                <span className="ml-1.5 text-muted-foreground">
                  ({allOrders.filter((o) => o.status === "in_progress").length})
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="delivered" 
                className="flex-1 min-w-0 text-xs xs:text-sm px-2 xs:px-3 py-2 data-[state=active]:bg-background"
              >
                Livrées
                <span className="ml-1.5 text-muted-foreground">
                  ({allOrders.filter((o) => o.status === "delivered").length})
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="cancelled" 
                className="flex-1 min-w-0 text-xs xs:text-sm px-2 xs:px-3 py-2 data-[state=active]:bg-background"
              >
                Annulées
                <span className="ml-1.5 text-muted-foreground">
                  ({allOrders.filter((o) => o.status === "cancelled").length})
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-4 sm:mt-6 space-y-3 xs:space-y-4">
            {paginatedOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <Package className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground/50" />
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">Aucune commande</h3>
                  <p className="mt-1 sm:mt-2 text-center text-xs sm:text-sm text-muted-foreground">
                    Vous n'avez pas encore passé de commande
                  </p>
                  <Link href="/stores">
                    <Button className="mt-4 sm:mt-6 bg-[#B85C38] hover:bg-[#9A4A2E] text-xs sm:text-sm">
                      <ShoppingBag className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Commencer mes achats
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <>
                {paginatedOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="p-3 xs:p-4 sm:p-6">
                      <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg leading-tight">{order.storeName}</CardTitle>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Commande: {order.id}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex-shrink-0 mt-2 xs:mt-0">
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 xs:p-4 sm:p-6 pt-0 space-y-3 xs:space-y-4">
                      <div className="flex items-start gap-2 text-xs sm:text-sm">
                        <MapPin className="h-3 w-3 xs:h-4 xs:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{order.deliveryType === "delivery" ? "Livraison à" : "Retrait à"}</p>
                          <p className="text-muted-foreground break-words">{order.address}</p>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2 xs:p-3 text-xs sm:text-sm">
                        <p className="font-medium">Mode de paiement</p>
                        <p className="text-muted-foreground">
                          💵 Paiement en espèces {order.deliveryType === "delivery" ? "à la livraison" : "au retrait"}
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t pt-4">
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">{order.items} article(s)</p>
                          <p className="text-lg font-semibold">€{order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/customer/orders/${order.id}`}>Voir les détails</Link>
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#B85C38] hover:bg-[#9A4A2E]"
                            onClick={() => handleReorder(order)}
                          >
                            Commander encore
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Responsive Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-10"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
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