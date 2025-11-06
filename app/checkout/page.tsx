"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Truck, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, clearCart } = useCart()
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "click_collect">("delivery")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getSubtotal()
  const deliveryFee = fulfillmentType === "delivery" && subtotal < 50 ? 5.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const orderId = `ORD-${Date.now()}`
    clearCart()
    router.push(`/order-confirmation/${orderId}`)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/cart">
          <Button
            variant="outline"
            className="mb-8 flex items-center gap-2 border border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-black transition-all rounded-lg shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </Link>

        <h1 className="mb-10 text-3xl font-bold tracking-tight text-foreground text-center sm:text-left">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            {/* LEFT SECTION */}
            <div className="space-y-8">
              {/* Fulfillment Method */}
              <Card className="rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Fulfillment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={fulfillmentType}
                    onValueChange={(v) => setFulfillmentType(v as any)}
                    className="grid gap-4"
                  >
                    <div className="flex items-start space-x-3 rounded-xl border border-border/60 p-4 hover:bg-muted/30 transition-colors">
                      <div className="relative">
                        <RadioGroupItem
                          value="delivery"
                          id="delivery"
                          className="appearance-none border border-gray-600 h-5 w-5 rounded-full cursor-pointer 
                                     data-[state=checked]:bg-primary data-[state=checked]:border-black
                                     flex items-center justify-center"
                        />
                      </div>
                      <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Home Delivery</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Get your order delivered to your doorstep
                        </p>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 rounded-xl border border-border/60 p-4 hover:bg-muted/30 transition-colors">
                      <div className="relative">
                        <RadioGroupItem
                          value="click_collect"
                          id="click_collect"
                          className="appearance-none border border-gray-600 h-5 w-5 rounded-full cursor-pointer 
                                     data-[state=checked]:bg-primary data-[state=checked]:border-black
                                     flex items-center justify-center"
                        />
                      </div>
                      <Label htmlFor="click_collect" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          
                          <span className="font-semibold">Click & Collect</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Pick up your order from the store
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required className="rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required className="rounded-lg" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required className="rounded-lg" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required className="rounded-lg" />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              {fulfillmentType === "delivery" && (
                <Card className="rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" required className="rounded-lg" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" required className="rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" required className="rounded-lg" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryNotes">Delivery Notes (Optional)</Label>
                      <Textarea
                        id="deliveryNotes"
                        placeholder="Any special instructions for delivery..."
                        className="rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Method */}
              <Card className="rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="rounded-lg"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required className="rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required className="rounded-lg" />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Your payment information is secure and encrypted.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT SECTION - ORDER SUMMARY */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="rounded-2xl border border-border/60 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-3" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {fulfillmentType === "delivery" ? "Delivery Fee" : "Pickup Fee"}
                      </span>
                      <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isProcessing}
                    className="mt-5 w-full gap-2 text-base py-5 hover:scale-[1.03] transition-transform"
                  >
                    {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground mt-2">
                    By placing your order, you agree to our Terms of Service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
