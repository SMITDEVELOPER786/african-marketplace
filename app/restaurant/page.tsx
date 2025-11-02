"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Calendar, UtensilsCrossed, Clock, Star, TrendingUp, AlertCircle, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n-context"
import Link from "next/link"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const salesData = [
  { name: "Lun", dejeuner: 1200, diner: 2100 },
  { name: "Mar", dejeuner: 1100, diner: 1900 },
  { name: "Mer", dejeuner: 1400, diner: 2300 },
  { name: "Jeu", dejeuner: 1300, diner: 2200 },
  { name: "Ven", dejeuner: 1500, diner: 3100 },
  { name: "Sam", dejeuner: 1800, diner: 3800 },
  { name: "Dim", dejeuner: 2000, diner: 2900 },
]

const monthlySalesData = [
  { month: "Jan", sales: 52000 },
  { month: "Fév", sales: 48000 },
  { month: "Mar", sales: 55000 },
  { month: "Avr", sales: 61000 },
  { month: "Mai", sales: 58000 },
  { month: "Juin", sales: 67000 },
]

const orderTypeData = [
  { name: "Sur place", value: 60, color: "#8b5a3c" },
  { name: "À emporter", value: 25, color: "#d4a574" },
  { name: "Livraison", value: 15, color: "#f5deb3" },
]

const menuCategoryData = [
  { name: "Plats", value: 45, color: "#8b5a3c" },
  { name: "Boissons", value: 25, color: "#d4a574" },
  { name: "Entrées", value: 18, color: "#6b4423" },
  { name: "Desserts", value: 12, color: "#f5deb3" },
]

const topDishes = [
  { name: "Poulet Yassa", orders: 234, revenue: 3510 },
  { name: "Thiéboudienne", orders: 189, revenue: 3402 },
  { name: "Mafé", orders: 156, revenue: 2340 },
  { name: "Attiéké Poisson", orders: 142, revenue: 2130 },
]

const upcomingReservations = [
  {
    id: "RES-1234",
    customer: "Marie Dupont",
    guests: 4,
    time: "12:30",
    table: "Table 5",
    status: "confirmed" as const,
  },
  {
    id: "RES-1235",
    customer: "Jean Martin",
    guests: 2,
    time: "13:00",
    table: "Table 12",
    status: "confirmed" as const,
  },
  {
    id: "RES-1236",
    customer: "Sophie Bernard",
    guests: 6,
    time: "19:30",
    table: "Table 8",
    status: "pending" as const,
  },
]

const activeOrders = [
  {
    id: "CMD-1234",
    table: "Table 3",
    items: 4,
    total: 85.5,
    status: "preparing" as const,
    time: "5 min",
  },
  {
    id: "CMD-1233",
    table: "À emporter",
    items: 2,
    total: 42.0,
    status: "ready" as const,
    time: "2 min",
  },
  {
    id: "CMD-1232",
    table: "Table 7",
    items: 3,
    total: 67.5,
    status: "preparing" as const,
    time: "8 min",
  },
]

const recentReviews = [
  { id: 1, customer: "Alice Dubois", rating: 5, comment: "Excellent repas, service impeccable!", responded: false },
  { id: 2, customer: "Pierre Leroy", rating: 4, comment: "Très bon, juste un peu d'attente", responded: false },
  {
    id: 3,
    customer: "Emma Rousseau",
    rating: 5,
    comment: "Meilleur restaurant africain de la ville!",
    responded: true,
  },
]

export default function RestaurantDashboardPage() {
  const { t } = useLanguage()

  const stats = [
    {
      title: "Chiffre d'affaires",
      value: "€45,231",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up" as const,
      subtitle: "Ce mois",
    },
    {
      title: "Couverts servis",
      value: "1,234",
      change: "+15.3%",
      icon: UtensilsCrossed,
      trend: "up" as const,
      subtitle: "Cette semaine",
    },
    {
      title: "Réservations",
      value: "89",
      change: "+12.5%",
      icon: Calendar,
      trend: "up" as const,
      subtitle: "Cette semaine",
    },
    {
      title: "Note moyenne",
      value: "4.8/5",
      change: "+0.3",
      icon: Star,
      trend: "up" as const,
      subtitle: "156 avis",
    },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="mt-2 text-muted-foreground">Vue d'ensemble complète de votre activité restaurant</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="mt-1 flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">{stat.change}</span>
                  <span className="text-muted-foreground">{stat.subtitle}</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="sales">Ventes détaillées</TabsTrigger>
          <TabsTrigger value="menu">Menu populaire</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ventes par service</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="dejeuner" fill="#d4a574" name="Déjeuner" />
                    <Bar dataKey="diner" fill="#8b5a3c" name="Dîner" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Type de commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {orderTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Évolution mensuelle du CA</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8b5a3c" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ventes par catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={menuCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {menuCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="menu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plats les plus populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDishes.map((dish, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{dish.name}</p>
                        <p className="text-sm text-muted-foreground">{dish.orders} commandes</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">€{dish.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Réservations aujourd'hui
            </CardTitle>
            <Link href="/restaurant/reservations">
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{reservation.customer}</p>
                      <Badge variant={reservation.status === "pending" ? "secondary" : "default"}>
                        {reservation.status === "confirmed" ? "Confirmée" : "En attente"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {reservation.guests} personnes • {reservation.table}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="flex items-center gap-1 font-semibold">
                      <Clock className="h-4 w-4" />
                      {reservation.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Commandes en cours
            </CardTitle>
            <Link href="/restaurant/orders">
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{order.id}</p>
                      <Badge
                        variant={order.status === "ready" ? "default" : "secondary"}
                        className={order.status === "ready" ? "bg-green-600" : ""}
                      >
                        {order.status === "preparing" ? "En préparation" : "Prêt"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.table} • {order.items} articles
                    </p>
                    <p className="text-xs text-muted-foreground">Il y a {order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Avis récents
          </CardTitle>
          <Link href="/restaurant/reviews">
            <Button variant="outline" size="sm">
              Gérer les avis
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReviews.map((review) => (
              <div
                key={review.id}
                className={`rounded-lg border p-4 ${!review.responded ? "border-orange-200 bg-orange-50" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{review.customer}</p>
                      <div className="flex">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                  {!review.responded && (
                    <Badge variant="outline" className="border-orange-500 text-orange-500">
                      <AlertCircle className="mr-1 h-3 w-3" />À répondre
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
