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
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

export default function CartPage() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
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

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
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

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuer mes achats
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Mon Panier</h1>
              <p className="text-muted-foreground mt-1">
                {cartItems.length} {cartItems.length > 1 ? "articles" : "article"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {cartItems.length > 0 && (
                <div className="flex items-center gap-2 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "cards" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("cards")}
                    className={viewMode === "cards" ? "bg-[#A0522D] hover:bg-[#8B4513]" : ""}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className={viewMode === "table" ? "bg-[#A0522D] hover:bg-[#8B4513]" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <Card className="p-8 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-6">Découvrez nos produits et restaurants africains</p>
            <Button asChild className="bg-[#A0522D] hover:bg-[#8B4513]">
              <Link href="/">Explorer la marketplace</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
             {cartItems.map((item) => (
  <Card key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
    <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
      <img
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        className="h-full w-full object-contain p-1" // object-contain ensures full visibility
      />
      {!item.inStock && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-xs text-white font-medium">Rupture</span>
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="truncate">
          <h3 className="font-semibold truncate">{item.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{item.merchant}</p>
          <Badge variant="outline" className="mt-1">
            {item.category === "restaurant" ? "Restaurant" : "Commerce"}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-between items-center mt-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={!item.inStock}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-12 text-center font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={!item.inStock}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <div className="text-right">
          <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</p>
          <p className="text-xs text-muted-foreground">{item.price.toFixed(2)} € / unité</p>
        </div>
      </div>
    </div>
  </Card>
))}

            
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 w-full sticky top-0">
                <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
                <Alert className="mb-4 bg-[#A0522D]/10 border-[#A0522D]/20">
                  <Store className="h-4 w-4 text-[#A0522D]" />
                  <AlertDescription className="text-sm">
                    <strong>Click & Collect</strong>
                    <br />
                    Récupérez votre commande en magasin et payez sur place
                  </AlertDescription>
                </Alert>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Code promo</label>
                  <div className="flex gap-2 flex-wrap">
                    <Input
                      placeholder="Entrez votre code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 min-w-[150px]"
                    />
                    <Button variant="outline" onClick={applyPromoCode} className="gap-2 bg-transparent">
                      <Tag className="h-4 w-4" />
                      Appliquer
                    </Button>
                  </div>
                  {appliedPromo && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ Code {appliedPromo.code} appliqué (-{appliedPromo.discount}%)
                    </p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-medium">{subtotal.toFixed(2)} €</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Réduction ({appliedPromo.discount}%)</span>
                      <span>-{discount.toFixed(2)} €</span>
                    </div>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                {hasOutOfStock && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">
                    Certains articles ne sont plus disponibles
                  </div>
                )}
                <Button
                  className="w-full bg-[#A0522D] hover:bg-[#8B4513]"
                  size="lg"
                  disabled={hasOutOfStock}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Valider la commande
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Paiement en magasin lors du retrait
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
