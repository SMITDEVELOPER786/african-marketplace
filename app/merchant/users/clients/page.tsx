"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Mail,
  Download,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Eye,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

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

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customersData)[0] | null>(null)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const filteredCustomers = customersData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCustomers = sortedCustomers.slice(startIndex, endIndex)

  const isAllSelected = paginatedCustomers.length > 0 && selectedCustomers.length === paginatedCustomers.length

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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(paginatedCustomers.map((c) => c.id))
    } else {
      setSelectedCustomers([])
    }
  }

  const handleSelectCustomer = (customerId: number, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId])
    } else {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
    }
  }

  const handleBulkDelete = () => {
    console.log("[v0] Bulk deleting customers:", selectedCustomers)
    toast.success(`${selectedCustomers.length} client(s) supprimé(s)`)
    setSelectedCustomers([])
  }

  const handleBulkEmail = () => {
    setEmailDialogOpen(true)
  }

  const handleBulkExport = (format: "excel" | "pdf") => {
    console.log("[v0] Exporting selected customers as", format, selectedCustomers)

    if (format === "excel") {
      const selectedData = customersData.filter((c) => selectedCustomers.includes(c.id))
      const csvContent = [
        ["Nom", "Email", "Commandes", "Total dépensé", "Dernière commande", "Statut"].join(","),
        ...selectedData.map((c) => [c.name, c.email, c.orders, c.totalSpent, c.lastOrder, c.status].join(",")),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `clients_selection_${new Date().toISOString().split("T")[0]}.csv`
      link.click()
      toast.success("Export Excel généré avec succès")
    } else {
      const selectedData = customersData.filter((c) => selectedCustomers.includes(c.id))
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Clients Sélectionnés - AfroMarket</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #333; border-bottom: 3px solid #e74c3c; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #e74c3c; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Clients Sélectionnés - AfroMarket</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString("fr-FR")}</p>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Commandes</th>
                <th>Total dépensé</th>
                <th>Dernière commande</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${selectedData
                .map(
                  (c) => `
                <tr>
                  <td>${c.name}</td>
                  <td>${c.email}</td>
                  <td>${c.orders}</td>
                  <td>€${c.totalSpent.toFixed(2)}</td>
                  <td>${c.lastOrder}</td>
                  <td>${c.status}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </body>
        </html>
      `

      const blob = new Blob([htmlContent], { type: "text/html" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `clients_selection_${new Date().toISOString().split("T")[0]}.html`
      link.click()
      toast.success("Export PDF généré avec succès")
    }
  }

  const handleExport = (format: "pdf" | "excel") => {
    console.log(`[v0] Exporting clients data as ${format}`)

    if (format === "excel") {
      const csvContent = [
        ["Nom", "Email", "Commandes", "Total dépensé", "Dernière commande", "Statut"].join(","),
        ...filteredCustomers.map((c) => [c.name, c.email, c.orders, c.totalSpent, c.lastOrder, c.status].join(",")),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `clients_complet_${new Date().toISOString().split("T")[0]}.csv`
      link.click()
      toast.success("Export Excel généré avec succès")
    } else {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Liste des Clients - AfroMarket</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #333; border-bottom: 3px solid #e74c3c; padding-bottom: 10px; }
            .stats { display: flex; gap: 20px; margin: 20px 0; }
            .stat-card { flex: 1; padding: 15px; background: #f5f5f5; border-radius: 8px; }
            .stat-value { font-size: 24px; font-weight: bold; color: #e74c3c; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #e74c3c; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Liste des Clients - AfroMarket</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString("fr-FR")}</p>
          <div class="stats">
            <div class="stat-card">
              <div>Total Clients</div>
              <div class="stat-value">${customersData.length}</div>
            </div>
            <div class="stat-card">
              <div>Nouveaux ce mois</div>
              <div class="stat-value">${customersData.filter((c) => c.status === "new").length}</div>
            </div>
            <div class="stat-card">
              <div>Clients VIP</div>
              <div class="stat-value">${customersData.filter((c) => c.status === "vip").length}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Commandes</th>
                <th>Total dépensé</th>
                <th>Dernière commande</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCustomers
                .map(
                  (c) => `
                <tr>
                  <td>${c.name}</td>
                  <td>${c.email}</td>
                  <td>${c.orders}</td>
                  <td>€${c.totalSpent.toFixed(2)}</td>
                  <td>${c.lastOrder}</td>
                  <td>${c.status}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </body>
        </html>
      `

      const blob = new Blob([htmlContent], { type: "text/html" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `clients_complet_${new Date().toISOString().split("T")[0]}.html`
      link.click()
      toast.success("Export PDF généré avec succès")
    }
  }

  const handleViewDetails = (customer: (typeof customersData)[0]) => {
    setSelectedCustomer(customer)
    setDetailsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-muted-foreground text-balance">Gérez votre base de clients</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="stat-card">
          <div>Total Clients</div>
          <div className="stat-value">{customersData.length}</div>
        </div>
        <div className="stat-card">
          <div>Nouveaux ce mois</div>
          <div className="stat-value">{customersData.filter((c) => c.status === "new").length}</div>
        </div>
        <div className="stat-card">
          <div>Clients VIP</div>
          <div className="stat-value">{customersData.filter((c) => c.status === "vip").length}</div>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="regular">Régulier</SelectItem>
                  <SelectItem value="new">Nouveau</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 bg-transparent" onClick={handleBulkEmail}>
                <Mail className="h-4 w-4" />
                Envoyer un email
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent" onClick={() => handleExport("excel")}>
                <Download className="h-4 w-4" />
                Excel
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent" onClick={() => handleExport("pdf")}>
                <FileText className="h-4 w-4" />
                PDF
              </Button>
            </div>

            {selectedCustomers.length > 0 && (
              <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                  <span className="text-sm font-medium">{selectedCustomers.length} client(s) sélectionné(s)</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleBulkEmail}>
                    <Mail className="h-4 w-4" />
                    Envoyer email
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Exporter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleBulkExport("excel")}>
                        <Download className="mr-2 h-4 w-4" />
                        Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkExport("pdf")}>
                        <FileText className="mr-2 h-4 w-4" />
                        PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-destructive hover:text-destructive bg-transparent"
                    onClick={handleBulkDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Liste des clients ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="p-4 text-left">
                    <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                  </th>
                  <th
                    className="p-4 text-left text-sm font-medium cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    Client
                  </th>
                  <th
                    className="p-4 text-left text-sm font-medium cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("orders")}
                  >
                    Commandes
                  </th>
                  <th
                    className="p-4 text-left text-sm font-medium cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("totalSpent")}
                  >
                    Total dépensé
                  </th>
                  <th
                    className="p-4 text-left text-sm font-medium cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("lastOrder")}
                  >
                    Dernière commande
                  </th>
                  <th
                    className="p-4 text-left text-sm font-medium cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("status")}
                  >
                    Statut
                  </th>
                  <th className="p-4 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedCustomers.includes(customer.id)}
                        onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked as boolean)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-2 ring-border">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
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
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10 hover:text-primary"
                          onClick={() => handleViewDetails(customer)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Voir détails
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Affichage de {startIndex + 1} à {Math.min(endIndex, filteredCustomers.length)} sur{" "}
                {filteredCustomers.length} client(s)
              </span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 / page</SelectItem>
                  <SelectItem value="10">10 / page</SelectItem>
                  <SelectItem value="20">20 / page</SelectItem>
                  <SelectItem value="50">50 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du client</DialogTitle>
            <DialogDescription>Informations complètes sur le client</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedCustomer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground">{selectedCustomer.email}</p>
                  {getStatusBadge(selectedCustomer.status)}
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Informations</TabsTrigger>
                  <TabsTrigger value="orders">Commandes</TabsTrigger>
                  <TabsTrigger value="activity">Activité</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Total commandes</Label>
                        <p className="text-2xl font-bold">{selectedCustomer.orders}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Total dépensé</Label>
                        <p className="text-2xl font-bold">€{selectedCustomer.totalSpent.toFixed(2)}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Dernière commande</Label>
                      <p className="text-lg font-medium">{selectedCustomer.lastOrder}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Panier moyen</Label>
                      <p className="text-lg font-medium">
                        €{(selectedCustomer.totalSpent / selectedCustomer.orders).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="orders">
                  <div className="text-center py-8 text-muted-foreground">Historique des commandes à venir</div>
                </TabsContent>

                <TabsContent value="activity">
                  <div className="text-center py-8 text-muted-foreground">Activité récente à venir</div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                  Fermer
                </Button>
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer un email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Envoyer un email</DialogTitle>
            <DialogDescription>
              Envoyer un email à{" "}
              {selectedCustomers.length > 0 ? `${selectedCustomers.length} client(s)` : "tous les clients"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Objet</Label>
              <Input id="subject" placeholder="Objet de l'email..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Votre message..." rows={6} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                toast.success("Email envoyé avec succès")
                setEmailDialogOpen(false)
                setSelectedCustomers([])
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              Envoyer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
