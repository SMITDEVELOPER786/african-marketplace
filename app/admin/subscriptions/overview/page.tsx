"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, DollarSign, TrendingUp, CreditCard, Calendar, ArrowUpRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamic imports for charts
const AreaChart = dynamic(() => import("recharts").then((mod) => mod.AreaChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />,
})
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), { ssr: false })
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />,
})
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false })

// Mock data for revenue over time
const revenueData = [
  { month: "Jan", revenue: 2400, payments: 12 },
  { month: "Fév", revenue: 3200, payments: 16 },
  { month: "Mar", revenue: 2800, payments: 14 },
  { month: "Avr", revenue: 3900, payments: 19 },
  { month: "Mai", revenue: 4200, payments: 21 },
  { month: "Juin", revenue: 3800, payments: 19 },
  { month: "Juil", revenue: 4500, payments: 22 },
  { month: "Août", revenue: 4800, payments: 24 },
  { month: "Sep", revenue: 5200, payments: 26 },
  { month: "Oct", revenue: 4900, payments: 24 },
  { month: "Nov", revenue: 5500, payments: 27 },
  { month: "Déc", revenue: 6200, payments: 31 },
]

// Mock data for plan distribution
const planData = [
  { plan: "Basic", count: 45, revenue: 899.55 },
  { plan: "Standard", count: 32, revenue: 959.68 },
  { plan: "Premium", count: 28, revenue: 1399.72 },
]

// Mock payment history
const payments = [
  {
    id: "1",
    business: "Afro Delights Market",
    plan: "Premium",
    amount: 49.99,
    date: "2025-01-15",
    status: "completed" as const,
    method: "Carte bancaire",
  },
  {
    id: "2",
    business: "Mama Africa Restaurant",
    plan: "Premium",
    amount: 49.99,
    date: "2025-01-14",
    status: "completed" as const,
    method: "Carte bancaire",
  },
  {
    id: "3",
    business: "Sahel Spice Market",
    plan: "Standard",
    amount: 29.99,
    date: "2025-01-12",
    status: "completed" as const,
    method: "PayPal",
  },
  {
    id: "4",
    business: "Jollof Palace",
    plan: "Basic",
    amount: 19.99,
    date: "2025-01-10",
    status: "pending" as const,
    method: "Virement",
  },
  {
    id: "5",
    business: "Afro Cuisine Express",
    plan: "Premium",
    amount: 49.99,
    date: "2025-01-08",
    status: "completed" as const,
    method: "Carte bancaire",
  },
]

export default function SubscriptionsOverviewPage() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    if (
      searchQuery &&
      !payment.business.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !payment.plan.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (statusFilter !== "all" && payment.status !== statusFilter) return false

    return true
  })

  const totalRevenue = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const totalPayments = payments.length
  const avgPayment = totalRevenue / payments.filter((p) => p.status === "completed").length
  const monthlyGrowth = 18.2

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Synthèse des Paiements</h1>
          <p className="mt-2 text-muted-foreground">Historique et statistiques des revenus d'abonnements</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</div>
            <p className="flex items-center gap-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />+{monthlyGrowth}% vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements Reçus</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPayments}</div>
            <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiement Moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{avgPayment.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Par transaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Succès</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="flex items-center gap-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              +1.2% vs mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des Revenus</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition par Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="plan" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par commerce ou plan..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                Plage personnalisée
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Paiements</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-3 text-left text-sm font-medium">Commerce</th>
                  <th className="p-3 text-left text-sm font-medium">Plan</th>
                  <th className="p-3 text-left text-sm font-medium">Montant</th>
                  <th className="p-3 text-left text-sm font-medium">Date</th>
                  <th className="p-3 text-left text-sm font-medium">Méthode</th>
                  <th className="p-3 text-left text-sm font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-muted-foreground">
                      Aucun paiement trouvé
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b last:border-0">
                      <td className="p-3 font-medium">{payment.business}</td>
                      <td className="p-3">
                        <Badge variant="secondary" className="text-xs">
                          {payment.plan}
                        </Badge>
                      </td>
                      <td className="p-3 font-semibold">€{payment.amount.toFixed(2)}</td>
                      <td className="p-3 text-sm text-muted-foreground">{payment.date}</td>
                      <td className="p-3 text-sm text-muted-foreground">{payment.method}</td>
                      <td className="p-3">
                        <Badge
                          variant={
                            payment.status === "completed"
                              ? "default"
                              : payment.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {payment.status === "completed"
                            ? "Complété"
                            : payment.status === "pending"
                              ? "En attente"
                              : "Échoué"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
