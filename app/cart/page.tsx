"use client"

import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { t } = useLanguage()
  const { items, updateQuantity, removeItem, getSubtotal } = useCart()

  const subtotal = getSubtotal()
  const deliveryFee = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">{t("cart.empty")}</h1>
          <p className="mt-2 text-muted-foreground">{t("cart.emptyDescription")}</p>
          <Link href="/">
            <Button className="mt-6 gap-2">
              {t("cart.continueShopping")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Group items by business
  const itemsByBusiness = items.reduce(
    (acc, item) => {
      if (!acc[item.businessId]) {
        acc[item.businessId] = {
          businessName: item.businessName,
          items: [],
        }
      }
      acc[item.businessId].items.push(item)
      return acc
    },
    {} as Record<string, { businessName: string; items: typeof items }>,
  )

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">{t("cart.title")}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {Object.entries(itemsByBusiness).map(([businessId, { businessName, items: businessItems }]) => (
              <Card key={businessId}>
                <CardContent className="p-6">
                  <h2 className="mb-4 font-semibold text-lg">{businessName}</h2>
                  <div className="space-y-4">
                    {businessItems.map((item) => (
                      <div key={item.productId} className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} {t("cart.each")}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                max={item.stock}
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, Number.parseInt(e.target.value) || 1)}
                                className="h-8 w-16 text-center"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-4">
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => removeItem(item.productId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="mb-4 font-semibold text-lg">{t("checkout.orderSummary")}</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.delivery")}</span>
                  <span>{deliveryFee === 0 ? t("cart.freeDelivery") : `$${deliveryFee.toFixed(2)}`}</span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">{t("cart.freeDeliveryOnOrdersOver50")}</p>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.tax")} (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>{t("cart.total")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="mt-6 w-full gap-2" size="lg">
                  {t("cart.proceedToCheckout")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="mt-3 w-full bg-transparent">
                  {t("cart.continueShopping")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
