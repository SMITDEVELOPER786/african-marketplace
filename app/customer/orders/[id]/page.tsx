"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, MapPin, Calendar, Package, CheckCircle, Clock, XCircle, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const Barcode = ({ value }: { value: string }) => {
  const bars = value
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0)
      return code % 2 === 0 ? "101" : "110"
    })
    .join("")

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border">
      <svg width="200" height="60" className="barcode">
        {bars.split("").map((bar, i) => (
          <rect key={i} x={i * 3} y="0" width="2" height="50" fill={bar === "1" ? "black" : "white"} />
        ))}
      </svg>
      <span className="text-xs font-mono text-muted-foreground">{value}</span>
    </div>
  )
}

// Mock data - Dans une vraie app, cela viendrait d'une API
const getOrderDetails = (orderId: string) => {
  return {
    id: orderId,
    date: "2025-01-20",
    status: "delivered",
    storeName: "Sahel Grocery",
    storeId: "2",
    deliveryType: "delivery",
    address: "123 Rue de la République, 75011 Paris",
    paymentMethod: "cash",
    items: [
      {
        id: "1",
        name: "Jollof Rice Special",
        image: "/vibrant-jollof-rice.png",
        price: 12.99,
        quantity: 2,
        barcode: `AFM-PROD-001-${Date.now()}`,
      },
      {
        id: "2",
        name: "African Print Fabric",
        image: "/african-fabric.jpg",
        price: 24.99,
        quantity: 1,
        barcode: `AFM-PROD-002-${Date.now()}`,
      },
      {
        id: "3",
        name: "Shea Butter Organic",
        image: "/shea-butter.jpg",
        price: 15.5,
        quantity: 3,
        barcode: `AFM-PROD-003-${Date.now()}`,
      },
    ],
    subtotal: 87.5,
    total: 87.5,
  }
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const orderId = params.id as string
  const order = getOrderDetails(orderId)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge variant="default" className="gap-1 bg-green-500">
            <CheckCircle className="h-3 w-3" />
            Livrée
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="default" className="gap-1 bg-blue-500">
            <Clock className="h-3 w-3" />
            En cours
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Annulée
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleDownloadPDF = () => {
    // Créer le contenu HTML pour le PDF
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Commande ${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .order-info { margin-bottom: 30px; }
          .item { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; page-break-inside: avoid; }
          .item-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .barcode-container { text-align: center; margin-top: 15px; padding: 10px; background: #f5f5f5; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>AfroMarket</h1>
          <h2>Récapitulatif de commande</h2>
          <p>Commande: ${order.id}</p>
          <p>Date: ${new Date(order.date).toLocaleDateString("fr-FR")}</p>
        </div>
        
        <div class="order-info">
          <p><strong>${order.deliveryType === "delivery" ? "Livraison" : "Retrait"} à:</strong> ${order.address}</p>
          <p><strong>Mode de paiement:</strong> Paiement en espèces ${order.deliveryType === "delivery" ? "à la livraison" : "au retrait"}</p>
        </div>

        <h3>Articles commandés</h3>
        ${order.items
          .map(
            (item) => `
          <div class="item">
            <div class="item-header">
              <div>
                <strong>${item.name}</strong><br>
                Quantité: ${item.quantity} × ${item.price.toFixed(2)} €
              </div>
              <div style="text-align: right;">
                <strong>${(item.quantity * item.price).toFixed(2)} €</strong>
              </div>
            </div>
            <div class="barcode-container">
              <p><strong>Code-barre produit:</strong></p>
              <svg width="300" height="80">
                ${item.barcode
                  .split("")
                  .map((char, i) => {
                    const code = char.charCodeAt(0)
                    const pattern = code % 2 === 0 ? "101" : "110"
                    return pattern
                      .split("")
                      .map(
                        (bar, j) =>
                          `<rect x="${i * 9 + j * 3}" y="0" width="2" height="60" fill="${bar === "1" ? "black" : "white"}"/>`,
                      )
                      .join("")
                  })
                  .join("")}
              </svg>
              <p style="font-family: monospace; margin-top: 5px;">${item.barcode}</p>
            </div>
          </div>
        `,
          )
          .join("")}

        <div class="total">
          <p>Total: ${order.total.toFixed(2)} €</p>
        </div>

        <div style="margin-top: 40px; padding: 15px; background: #fff3cd; border: 1px solid #ffc107;">
          <p><strong>Important:</strong> Présentez cette commande avec les codes-barres lors du retrait en magasin.</p>
        </div>
      </body>
      </html>
    `

    // Créer un blob et télécharger
    const blob = new Blob([pdfContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `commande-${order.id}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "PDF téléchargé",
      description: "Le récapitulatif de votre commande a été téléchargé avec succès.",
    })
  }

  const handleReorder = () => {
    // Dans une vraie app, cela ajouterait les articles au panier via un contexte ou une API
    toast({
      title: "Articles ajoutés au panier",
      description: `${order.items.length} article(s) ont été ajoutés à votre panier.`,
    })

    // Rediriger vers le panier après un court délai
    setTimeout(() => {
      router.push("/customer/cart")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/customer/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Détails de la commande</h1>
            <p className="text-muted-foreground">Commande {order.id}</p>
          </div>
        </div>
        {getStatusBadge(order.status)}
      </div>

      {/* Informations générales */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de commande</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Date de commande</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Commerce</p>
                <p className="text-sm text-muted-foreground">{order.storeName}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{order.deliveryType === "delivery" ? "Livraison à" : "Retrait à"}</p>
              <p className="text-sm text-muted-foreground">{order.address}</p>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="font-medium text-sm">Mode de paiement</p>
            <p className="text-sm text-muted-foreground">
              💵 Paiement en espèces {order.deliveryType === "delivery" ? "à la livraison" : "au retrait"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Articles avec codes-barres */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Articles commandés</CardTitle>
            <Button onClick={handleDownloadPDF} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {order.items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Quantité: {item.quantity} × {item.price.toFixed(2)} €
                  </p>
                  <p className="text-lg font-semibold mt-1">{(item.quantity * item.price).toFixed(2)} €</p>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-2">Code-barre produit</p>
                <Barcode value={item.barcode} />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Présentez ce code-barre lors du retrait en magasin
                </p>
              </div>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span>{order.subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{order.total.toFixed(2)} €</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleReorder} className="flex-1 bg-[#B85C38] hover:bg-[#9A4A2E]">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Recommander
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
