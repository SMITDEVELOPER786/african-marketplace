"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  AlertCircle,
  Package,
  TrendingDown,
  Download,
  Upload,
  Plus,
  History,
  Truck,
  BarChart3,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const inventoryData = [
  {
    id: 1,
    name: "Tissu Wax Premium",
    sku: "TWX-001",
    stock: 3,
    minStock: 10,
    status: "low",
    category: "Tissus",
    lastRestocked: "2024-01-15",
    supplier: "Textile Afrique",
    location: "Entrepôt A",
    cost: 25,
    price: 45,
  },
  {
    id: 2,
    name: "Huile de Palme Bio",
    sku: "HPB-002",
    stock: 5,
    minStock: 15,
    status: "low",
    category: "Alimentation",
    lastRestocked: "2024-01-10",
    supplier: "Bio Import",
    location: "Entrepôt B",
    cost: 8,
    price: 15,
  },
  {
    id: 3,
    name: "Sac en Cuir Artisanal",
    sku: "SCA-003",
    stock: 2,
    minStock: 5,
    status: "critical",
    category: "Artisanat",
    lastRestocked: "2024-01-20",
    supplier: "Artisans du Sahel",
    location: "Entrepôt A",
    cost: 45,
    price: 89,
  },
  {
    id: 4,
    name: "Café Éthiopien",
    sku: "CAF-004",
    stock: 45,
    minStock: 20,
    status: "good",
    category: "Alimentation",
    lastRestocked: "2024-01-22",
    supplier: "Coffee Direct",
    location: "Entrepôt B",
    cost: 12,
    price: 22,
  },
  {
    id: 5,
    name: "Beurre de Karité",
    sku: "BKA-005",
    stock: 0,
    minStock: 10,
    status: "out",
    category: "Cosmétiques",
    lastRestocked: "2023-12-28",
    supplier: "Natural Beauty",
    location: "Entrepôt C",
    cost: 6,
    price: 12,
  },
]

const stockMovements = [
  {
    id: 1,
    product: "Tissu Wax Premium",
    type: "in",
    quantity: 50,
    date: "2024-01-15",
    reason: "Réapprovisionnement",
    user: "Admin",
  },
  {
    id: 2,
    product: "Huile de Palme Bio",
    type: "out",
    quantity: 10,
    date: "2024-01-18",
    reason: "Vente",
    user: "Caissier 1",
  },
  {
    id: 3,
    product: "Sac en Cuir Artisanal",
    type: "out",
    quantity: 3,
    date: "2024-01-20",
    reason: "Vente",
    user: "Caissier 2",
  },
]

const suppliers = [
  { id: 1, name: "Textile Afrique", contact: "contact@textile-afrique.com", products: 12 },
  { id: 2, name: "Bio Import", contact: "info@bioimport.fr", products: 8 },
  { id: 3, name: "Artisans du Sahel", contact: "artisans@sahel.com", products: 5 },
]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false)

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Critique</Badge>
      case "low":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Stock faible
          </Badge>
        )
      case "out":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Rupture
          </Badge>
        )
      case "good":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            En stock
          </Badge>
        )
      default:
        return null
    }
  }

  const stats = [
    {
      title: "Produits en stock",
      value: inventoryData.filter((i) => i.stock > 0).length,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Stock faible",
      value: inventoryData.filter((i) => i.status === "low").length,
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      title: "Rupture de stock",
      value: inventoryData.filter((i) => i.status === "out").length,
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "Valeur totale",
      value: `€${inventoryData.reduce((acc, item) => acc + item.stock * item.cost, 0).toLocaleString()}`,
      icon: BarChart3,
      color: "text-green-600",
    },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gestion de l'inventaire</h1>
        <p className="mt-2 text-muted-foreground">Suivez et gérez vos niveaux de stock en temps réel</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="movements">Mouvements</TabsTrigger>
          <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom ou SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="good">En stock</SelectItem>
                    <SelectItem value="low">Stock faible</SelectItem>
                    <SelectItem value="critical">Critique</SelectItem>
                    <SelectItem value="out">Rupture</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Exporter
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Importer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventaire ({filteredInventory.length} produits)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left text-sm font-medium">Produit</th>
                      <th className="p-4 text-left text-sm font-medium">SKU</th>
                      <th className="p-4 text-left text-sm font-medium">Catégorie</th>
                      <th className="p-4 text-left text-sm font-medium">Stock</th>
                      <th className="p-4 text-left text-sm font-medium">Emplacement</th>
                      <th className="p-4 text-left text-sm font-medium">Statut</th>
                      <th className="p-4 text-left text-sm font-medium">Fournisseur</th>
                      <th className="p-4 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <p className="font-medium">{item.name}</p>
                        </td>
                        <td className="p-4">
                          <code className="rounded bg-muted px-2 py-1 text-sm">{item.sku}</code>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{item.category}</td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{item.stock} unités</p>
                            <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{item.location}</td>
                        <td className="p-4">{getStatusBadge(item.status)}</td>
                        <td className="p-4 text-sm text-muted-foreground">{item.supplier}</td>
                        <td className="p-4 text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Réapprovisionner
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Réapprovisionner {item.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Quantité</Label>
                                  <Input type="number" placeholder="Entrez la quantité" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Fournisseur</Label>
                                  <Select defaultValue={item.supplier}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {suppliers.map((supplier) => (
                                        <SelectItem key={supplier.id} value={supplier.name}>
                                          {supplier.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Notes</Label>
                                  <Textarea placeholder="Notes optionnelles..." />
                                </div>
                                <Button className="w-full">Confirmer le réapprovisionnement</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Historique des mouvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-2 ${movement.type === "in" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                      >
                        {movement.type === "in" ? <Plus className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{movement.product}</p>
                        <p className="text-sm text-muted-foreground">
                          {movement.reason} • {movement.user}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${movement.type === "in" ? "text-green-600" : "text-red-600"}`}>
                        {movement.type === "in" ? "+" : "-"}
                        {movement.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">{movement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Fournisseurs
              </CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un fournisseur
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-sm text-muted-foreground">{supplier.contact}</p>
                    </div>
                    <div className="text-right">
                      <Badge>{supplier.products} produits</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
