import { MarketplaceHeader } from "@/components/marketplace/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Package, Home } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="min-h-screen">
      <MarketplaceHeader />

      <div className="container py-16">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
              </div>

              <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
              <p className="mb-6 text-muted-foreground">
                Thank you for your order. We've received it and will start processing it right away.
              </p>

              <div className="mb-8 rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-xl font-semibold">{params.orderId}</p>
              </div>

              <div className="mb-8 space-y-4 text-left">
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <Package className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      The merchant is preparing your order. You'll receive updates via email and SMS.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <Home className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Estimated Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be delivered within 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href={`/orders/${params.orderId}`}>
                  <Button size="lg">Track Order</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
