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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted mb-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{t("cart.empty")}</h1>
        <p className="text-muted-foreground text-base mb-6">
          {t("cart.emptyDescription")}
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2 hover:scale-[1.05] transition-all">
            {t("cart.continueShopping")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
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
    {} as Record<string, { businessName: string; items: typeof items }>
  )

  return (
    <div className="container py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">{t("cart.title")}</h1>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        {/* Cart Items */}
        <div className="space-y-6">
          {Object.entries(itemsByBusiness).map(([businessId, { businessName, items: businessItems }]) => (
            <Card
              key={businessId}
              className="rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-5">{businessName}</h2>
                <div className="space-y-6">
                  {businessItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-border/40 pb-5 last:border-0 last:pb-0"
                    >
                      {/* Product Image */}
                      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col sm:flex-1 justify-between gap-3 sm:gap-0">
                        <div>
                          <h3 className="text-base sm:text-lg font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            ${item.price.toFixed(2)} {t("cart.each")}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent hover:bg-muted"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              max={item.stock}
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.productId, Number.parseInt(e.target.value) || 1)
                              }
                              className="h-8 w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent hover:bg-muted"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price + Remove */}
                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <p className="font-semibold text-base sm:text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
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

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="rounded-2xl border border-border/60 shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-5">{t("checkout.orderSummary")}</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.delivery")}</span>
                  <span>
                    {deliveryFee === 0 ? t("cart.freeDelivery") : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t("cart.freeDeliveryOnOrdersOver50")}
                  </p>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.tax")} (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between font-semibold text-lg">
                  <span>{t("cart.total")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button
                  size="lg"
                  className="mt-6 w-full gap-2 hover:scale-[1.03] transition-transform"
                >
                  {t("cart.proceedToCheckout")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="mt-3 w-full bg-transparent hover:bg-muted transition-colors"
                >
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
