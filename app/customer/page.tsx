"use client"

import { useLanguage } from "@/lib/i18n-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart, Award, MapPin, Package } from "lucide-react"
import Link from "next/link"
import { AIRecommendations } from "@/components/ai/recommendations"
import { AIChatbot } from "@/components/ai/chatbot"

export default function CustomerDashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()

  const stats = [
    {
      title: t("customer.ordersCompleted"),
      value: "12",
      icon: ShoppingBag,
      href: "/customer/orders",
    },
    {
      title: t("customer.favoriteStores"),
      value: "8",
      icon: Heart,
      href: "/customer/favorites",
    },
    {
      title: t("customer.loyaltyPoints"),
      value: "2,450",
      icon: Award,
      href: "/customer/loyalty",
    },
    {
      title: t("customer.savedAddresses"),
      value: "3",
      icon: MapPin,
      href: "/customer/addresses",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      store: "Afro Spice Market",
      date: "2025-01-15",
      total: "€45.99",
      status: "delivered",
    },
    {
      id: "ORD-002",
      store: "Mama Africa Restaurant",
      date: "2025-01-10",
      total: "€32.50",
      status: "delivered",
    },
    {
      id: "ORD-003",
      store: "Sahel Grocery",
      date: "2025-01-05",
      total: "€67.80",
      status: "delivered",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {t("customer.welcome")}, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground">{t("customer.overview")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="transition-colors hover:bg-accent">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("customer.recentOrders")}</CardTitle>
              <CardDescription>{t("customer.viewAll")}</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/customer/orders">{t("customer.viewAll")}</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Package className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{order.store}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("customer.orderNumber")}
                      {order.id} • {order.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.total}</p>
                  <p className="text-sm text-green-600">{t(`customer.${order.status}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
