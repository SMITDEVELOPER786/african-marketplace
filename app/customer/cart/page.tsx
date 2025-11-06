"use client"

import { useState } from "react"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Tag,
  Store,
  MapPin,
  LayoutGrid,
  List,
  Download,
  Check,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  merchant: string
  category: "restaurant" | "commerce"
  inStock: boolean
}

const Barcode = ({ value, width = 200, height = 60 }: { value: string; width?: number; height?: number }) => {
  const bars = value.split("").map((char, i) => {
    const code = char.charCodeAt(0)
    return {
      x: 10 + i * 8,
      width: (code % 4) + 2,
    }
  })

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="bg-white">
        {bars.map((bar, i) => (
          <rect key={i} x={bar.x} y="5" width={bar.width} height={height - 15} fill="black" />
        ))}
      </svg>
      <p className="text-[10px] font-mono mt-1">{value}</p>
    </div>
  )
}

export default function CartPage() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [currentPage, setCurrentPage] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const itemsPerPage = 10

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Jollof Rice Special",
      price: 12.99,
      quantity: 2,
      image: "/vibrant-jollof-rice.png",
      merchant: "Mama Africa Restaurant",
      category: "restaurant",
      inStock: true,
    },
    {
      id: "2",
      name: "African Print Fabric",
      price: 24.99,
      quantity: 1,
      image: "/african-fabric.jpg",
      merchant: "Afro Style Boutique",
      category: "commerce",
      inStock: true,
    },
    {
      id: "3",
      name: "Shea Butter Organic",
      price: 15.5,
      quantity: 3,
      image: "/shea-butter.jpg",
      merchant: "Natural Beauty Shop",
      category: "commerce",
      inStock: true,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  const totalPages = Math.ceil(cartItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = cartItems.slice(startIndex, endIndex)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    if (paginatedItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "AFRO10") {
      setAppliedPromo({ code: promoCode, discount: 10 })
    } else if (promoCode.toUpperCase() === "WELCOME20") {
      setAppliedPromo({ code: promoCode, discount: 20 })
    } else {
      setAppliedPromo(null)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const total = subtotal - discount

  const hasOutOfStock = cartItems.some((item) => !item.inStock)

  const handleValidateOrder = () => {
    const newOrderNumber = `AFM-${Date.now().toString().slice(-8)}`
    setOrderNumber(newOrderNumber)
    setShowConfirmation(true)
  }

  const generatePDF = () => {
    const pdfContent = `
AFROMARKET - CONFIRMATION DE COMMANDE

Numéro de commande: ${orderNumber}
Date: ${new Date().toLocaleDateString("fr-FR")}

ARTICLES COMMANDÉS:
${cartItems
  .map((item) => {
    const itemBarcode = `AFM-${item.id}-${Date.now().toString().slice(-6)}`
    return `
- ${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€
  Marchand: ${item.merchant}
  Code-barre produit: ${itemBarcode}
  `
  })
  .join("\n")}

${appliedPromo ? `Réduction (${appliedPromo.discount}%): -${discount.toFixed(2)}€\n` : ""}
TOTAL: ${total.toFixed(2)}€

Mode de retrait: Click & Collect
Paiement: En magasin lors du retrait

Présentez les codes-barres de chaque produit en magasin pour vérification lors du retrait.
    `

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `commande-${orderNumber}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 sm:mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden xs:inline">Continuer mes achats</span>
          <span className="xs:hidden">Retour</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Mon Panier</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {cartItems.length} {cartItems.length > 1 ? "articles" : "article"}
            </p>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-4">
            {cartItems.length > 0 && (
              <div className="flex items-center gap-2 border rounded-lg p-1">
                <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className={cn(
                    "h-8 w-8 sm:h-9 sm:w-9",
                    viewMode === "cards" ? "bg-[#A0522D] hover:bg-[#8B4513]" : ""
                  )}
                >
                  <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "h-8 w-8 sm:h-9 sm:w-9",
                    viewMode === "table" ? "bg-[#A0522D] hover:bg-[#8B4513]" : ""
                  )}
                >
                  <List className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            )}
            <ShoppingBag className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <Card className="p-6 sm:p-12 text-center">
          <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Votre panier est vide</h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Découvrez nos produits et restaurants africains
          </p>
          <Button asChild className="bg-[#A0522D] hover:bg-[#8B4513] w-full sm:w-auto">
            <Link href="/">Explorer la marketplace</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {viewMode === "cards" && (
              <div className="space-y-3 sm:space-y-4">
                {paginatedItems.map((item) => (
                  <Card key={item.id} className="p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="relative h-16 w-16 sm:h-24 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-xs text-white font-medium">Rupture</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{item.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.merchant}</p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {item.category === "restaurant" ? "Restaurant" : "Commerce"}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 sm:h-8 sm:w-8"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-3 sm:mt-4">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 sm:h-8 sm:w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={!item.inStock}
                            >
                              <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                            <span className="w-8 sm:w-12 text-center font-medium text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 sm:h-8 sm:w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                            >
                              <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm sm:text-base">
                              {(item.price * item.quantity).toFixed(2)} €
                            </p>
                            <p className="text-xs text-muted-foreground hidden xs:block">
                              {item.price.toFixed(2)} € / unité
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {viewMode === "table" && (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px] sm:w-[80px]">Image</TableHead>
                        <TableHead className="min-w-[120px]">Produit</TableHead>
                        <TableHead className="hidden sm:table-cell">Marchand</TableHead>
                        <TableHead className="text-center w-[100px]">Quantité</TableHead>
                        <TableHead className="text-right hidden xs:table-cell">Prix unitaire</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[40px] sm:w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded overflow-hidden bg-muted">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm sm:text-base">{item.name}</p>
                              <Badge variant="outline" className="mt-1 text-xs hidden sm:inline-block">
                                {item.category === "restaurant" ? "Restaurant" : "Commerce"}
                              </Badge>
                              <p className="text-xs text-muted-foreground sm:hidden mt-1">{item.merchant}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                            {item.merchant}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1 sm:gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 sm:h-7 sm:w-7 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={!item.inStock}
                              >
                                <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
                              </Button>
                              <span className="w-6 sm:w-8 text-center font-medium text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 sm:h-7 sm:w-7 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={!item.inStock}
                              >
                                <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right hidden xs:table-cell">
                            {item.price.toFixed(2)} €
                          </TableCell>
                          <TableCell className="text-right font-semibold text-sm sm:text-base">
                            {(item.price * item.quantity).toFixed(2)} €
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-6 w-6 sm:h-7 sm:w-7"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            )}

            {totalPages > 1 && (
              <div className="mt-4 sm:mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={cn(
                          "h-8 w-8 sm:h-10 sm:w-10",
                          currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                        )}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer text-sm"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={cn(
                          "h-8 w-8 sm:h-10 sm:w-10",
                          currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-4 sm:p-6 sticky top-20">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Récapitulatif</h2>

              <Alert className="mb-4 bg-[#A0522D]/10 border-[#A0522D]/20">
                <Store className="h-4 w-4 text-[#A0522D]" />
                <AlertDescription className="text-xs sm:text-sm">
                  <strong>Click & Collect</strong>
                  <br />
                  Récupérez votre commande en magasin et payez sur place
                </AlertDescription>
              </Alert>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Code promo</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Entrez votre code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-sm"
                  />
                  <Button variant="outline" onClick={applyPromoCode} className="gap-1 sm:gap-2 bg-transparent px-2 sm:px-3">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Appliquer</span>
                    <span className="xs:hidden">OK</span>
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="text-xs sm:text-sm text-green-600 mt-2">
                    ✓ Code {appliedPromo.code} appliqué (-{appliedPromo.discount}%)
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 sm:space-y-3 mb-4">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-medium">{subtotal.toFixed(2)} €</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-xs sm:text-sm text-green-600">
                    <span>Réduction ({appliedPromo.discount}%)</span>
                    <span>-{discount.toFixed(2)} €</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-base sm:text-lg font-bold mb-4 sm:mb-6">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>

              {hasOutOfStock && (
                <div className="bg-destructive/10 text-destructive text-xs sm:text-sm p-2 sm:p-3 rounded-lg mb-4">
                  Certains articles ne sont plus disponibles
                </div>
              )}

              <Button
                className="w-full bg-[#A0522D] hover:bg-[#8B4513] h-11 sm:h-12"
                size="lg"
                disabled={hasOutOfStock}
                onClick={handleValidateOrder}
              >
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm sm:text-base">Valider la commande</span>
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-3 sm:mt-4">
                Paiement en magasin lors du retrait
              </p>
            </Card>
          </div>
        </div>
      )}

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl sm:text-2xl">Commande confirmée !</DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              Votre commande a été enregistrée avec succès
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            {/* Order Number */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Numéro de commande</p>
              <p className="text-xl sm:text-2xl font-bold text-[#A0522D]">{orderNumber}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {new Date().toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-center text-sm sm:text-base">
                Articles commandés avec codes-barres
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-center mb-3 sm:mb-4">
                Présentez ces codes-barres en magasin pour vérifier chaque article lors du retrait
              </p>
              <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-96 overflow-y-auto">
                {cartItems.map((item) => {
                  const itemBarcode = `AFM-${item.id}-${Date.now().toString().slice(-6)}`
                  return (
                    <Card key={item.id} className="p-3 sm:p-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm sm:text-base">{item.name}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">{item.merchant}</p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {item.category === "restaurant" ? "Restaurant" : "Commerce"}
                              </Badge>
                            </div>
                            <div className="text-right text-xs sm:text-sm">
                              <p className="text-muted-foreground">Quantité: {item.quantity}</p>
                              <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</p>
                            </div>
                          </div>
                          <Separator className="my-2 sm:my-3" />
                          <div className="bg-muted/50 p-2 sm:p-3 rounded-lg">
                            <p className="text-xs font-medium text-center mb-1 sm:mb-2">Code-barre produit</p>
                            <div className="flex justify-center">
                              <Barcode value={itemBarcode} width={150} height={40} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Order Total Summary */}
            <Card className="p-3 sm:p-4 bg-muted/30">
              <div className="space-y-2">
                {appliedPromo && (
                  <div className="flex justify-between text-xs sm:text-sm text-green-600">
                    <span>Réduction ({appliedPromo.discount}%)</span>
                    <span>-{discount.toFixed(2)} €</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span className="text-[#A0522D]">{total.toFixed(2)} €</span>
                </div>
              </div>
            </Card>

            {/* Collection Info */}
            <Alert className="bg-[#A0522D]/10 border-[#A0522D]/20">
              <Store className="h-4 w-4 text-[#A0522D]" />
              <AlertDescription className="text-xs sm:text-sm">
                <strong>Mode de retrait : Click & Collect</strong>
                <br />
                Présentez-vous en magasin avec votre numéro de commande et les codes-barres de chaque produit.
                Effectuez le paiement sur place lors du retrait.
              </AlertDescription>
            </Alert>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" className="flex-1 bg-transparent h-11" onClick={generatePDF}>
                <Download className="h-4 w-4 mr-2" />
                <span className="text-sm sm:text-base">Télécharger le PDF</span>
              </Button>
              <Button
                className="flex-1 bg-[#A0522D] hover:bg-[#8B4513] h-11"
                onClick={() => {
                  setShowConfirmation(false)
                  setCartItems([])
                }}
              >
                <span className="text-sm sm:text-base">Terminer</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Add the missing cn utility import
import { cn } from "@/lib/utils"