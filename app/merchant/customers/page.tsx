"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, TrendingUp, ShoppingBag, Mail } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const customersData = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    orders: 12,
    totalSpent: 1245.5,
    lastOrder: "2024-01-20",
    status: "vip",
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean.martin@email.com",
    orders: 5,
    totalSpent: 456.3,
    lastOrder: "2024-01-18",
    status: "regular",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    orders: 1,
    totalSpent: 89.99,
    lastOrder: "2024-01-22",
    status: "new",
  },
  {
    id: 4,
    name: "Pierre Durand",
    email: "pierre.durand@email.com",
    orders: 8,
    totalSpent: 892.4,
    lastOrder: "2024-01-15",
    status: "regular",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = customersData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const stats = [
    {
      title: "Total Clients",
      value: customersData.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Nouveaux ce mois",
      value: customersData.filter((c) => c.status === "new").length,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Clients VIP",
      value: customersData.filter((c) => c.status === "vip").length,
      icon: ShoppingBag,
      color: "text-purple-600",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return <Badge className="bg-purple-100 text-purple-800">VIP</Badge>
      case "regular":
        return <Badge variant="secondary">Régulier</Badge>
      case "new":
        return <Badge className="bg-green-100 text-green-800">Nouveau</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="mt-2 text-muted-foreground">Gérez votre base de clients</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Mail className="h-4 w-4" />
              Envoyer un email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des clients ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left text-sm font-medium">Client</th>
                  <th className="p-4 text-left text-sm font-medium">Commandes</th>
                  <th className="p-4 text-left text-sm font-medium">Total dépensé</th>
                  <th className="p-4 text-left text-sm font-medium">Dernière commande</th>
                  <th className="p-4 text-left text-sm font-medium">Statut</th>
                  <th className="p-4 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{customer.orders} commandes</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">€{customer.totalSpent.toFixed(2)}</p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{customer.lastOrder}</td>
                    <td className="p-4">{getStatusBadge(customer.status)}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">
                        Voir détails
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
