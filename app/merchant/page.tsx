"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Package, Users, Eye, AlertCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n-context"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const LineChart = dynamic(() => import("recharts").then((mod) => mod.LineChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />,
})
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), { ssr: false })
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />,
})
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false })
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />,
})
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false })
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false })

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Legend } from "recharts"




const salesData = [
  { name: "Lun", sales: 4200, orders: 42 },
  { name: "Mar", sales: 3800, orders: 38 },
  { name: "Mer", sales: 5100, orders: 51 },
  { name: "Jeu", sales: 4600, orders: 46 },
  { name: "Ven", sales: 6200, orders: 62 },
  { name: "Sam", sales: 7800, orders: 78 },
  { name: "Dim", sales: 5900, orders: 59 },
]

const monthlySalesData = [
  { month: "Jan", sales: 45000 },
  { month: "Fév", sales: 52000 },
  { month: "Mar", sales: 48000 },
  { month: "Avr", sales: 61000 },
  { month: "Mai", sales: 55000 },
  { month: "Juin", sales: 67000 },
]

const categoryData = [
  { name: "Alimentation", value: 45, color: "#8b5a3c" },
  { name: "Tissus", value: 25, color: "#d4a574" },
  { name: "Artisanat", value: 20, color: "#6b4423" },
  { name: "Cosmétiques", value: 10, color: "#f5deb3" },
]

const topProducts = [
  { name: "Huile de Palme Premium", sales: 234, revenue: 5846 },
  { name: "Tissu Wax Premium", sales: 189, revenue: 4725 },
  { name: "Farine de Manioc", sales: 156, revenue: 2453 },
  { name: "Sac en Cuir Artisanal", sales: 98, revenue: 3429 },
]

const recentOrders = [
  {
    id: "ORD-1234",
    customer: "John Doe",
    total: 125.5,
    status: "pending" as const,
    time: "5 min ago",
  },
  {
    id: "ORD-1233",
    customer: "Jane Smith",
    total: 89.99,
    status: "confirmed" as const,
    time: "1 hour ago",
  },
  {
    id: "ORD-1232",
    customer: "Mike Johnson",
    total: 156.75,
    status: "preparing" as const,
    time: "2 hours ago",
  },
]

const lowStockProducts = [
  { id: 1, name: "Tissu Wax Premium", stock: 3, minStock: 10 },
  { id: 2, name: "Huile de Palme Bio", stock: 5, minStock: 15 },
  { id: 3, name: "Sac en Cuir", stock: 2, minStock: 5 },
]

export default function MerchantDashboardPage() {
  const { t } = useLanguage()

  const stats = [
    {
      title: "Revenu Total",
      value: "€45,231",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      title: "Commandes",
      value: "1,234",
      change: "+15.3%",
      icon: ShoppingCart,
      trend: "up" as const,
    },
    {
      title: "Produits Vendus",
      value: "3,456",
      change: "+8.2%",
      icon: Package,
      trend: "up" as const,
    },
    {
      title: "Nouveaux Clients",
      value: "573",
      change: "+12.5%",
      icon: Users,
      trend: "up" as const,
    },
  ]

  return (
    <div className="p-4 md:p-0">
      <div className="mb-8 -mt10">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="mt-2 text-muted-foreground">Vue d'ensemble complète de votre activité commerciale</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="transition-all duration-300 hover:-mt-2 hover:shadow-lg hover:bg-sidebar-accent">
              <CardHeader className="flex flex-row items-center justify-between pb-2 ">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="mt-1 flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">{stat.change}</span>
                  <span className="text-muted-foreground">vs mois dernier</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="sales" className="text-xs sm:text-sm">
            Ventes détaillées
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xs sm:text-sm">
            Produits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ventes de la semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8b5a3c" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer> */}
                <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={categoryData}
      cx="50%"
      cy="50%"
      
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {categoryData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Pie>
    <Tooltip />
    <Legend /> 
  </PieChart>
</ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution mensuelle des ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8b5a3c" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Produits les plus vendus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} ventes</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">€{product.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Commandes récentes</CardTitle>
            <Link href="/merchant/click-collect">
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{order.id}</p>
                      <Badge variant={order.status === "pending" ? "secondary" : "default"}>{order.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{order.total.toFixed(2)}</p>
                    <Link href={`/merchant/click-collect`}>
                      <Button variant="ghost" size="sm" className="mt-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Voir
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Stock faible
            </CardTitle>
            <Link href="/merchant/inventory">
              <Button variant="outline" size="sm">
                Gérer le stock
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-3"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {product.stock} / Min: {product.minStock}
                    </p>
                  </div>
                  <Badge variant="destructive">{product.stock} restants</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
