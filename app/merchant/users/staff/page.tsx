"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  UserPlus,
  Users,
  Clock,
  CheckCircle2,
  Download,
  FileText,
  Calendar,
  Edit,
  Trash2,
  Shield,
  Plus,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UserX,
  UserCheck,
  Mail,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const staffData = [
  {
    id: 1,
    name: "Alice Moreau",
    email: "alice.moreau@afromarket.com",
    role: "manager",
    phone: "+33 6 12 34 56 78",
    hireDate: "2023-01-15",
    status: "active",
    hoursThisWeek: 38,
    performance: 95,
  },
  {
    id: 2,
    name: "Thomas Bernard",
    email: "thomas.bernard@afromarket.com",
    role: "cashier",
    phone: "+33 6 23 45 67 89",
    hireDate: "2023-06-20",
    status: "active",
    hoursThisWeek: 35,
    performance: 88,
  },
  {
    id: 3,
    name: "Emma Petit",
    email: "emma.petit@afromarket.com",
    role: "cashier",
    phone: "+33 6 34 56 78 90",
    hireDate: "2023-09-10",
    status: "active",
    hoursThisWeek: 40,
    performance: 92,
  },
  {
    id: 4,
    name: "Lucas Roux",
    email: "lucas.roux@afromarket.com",
    role: "stock",
    phone: "+33 6 45 67 89 01",
    hireDate: "2023-03-05",
    status: "on_leave",
    hoursThisWeek: 0,
    performance: 85,
  },
]

const scheduleData = [
  { day: "Lundi", staff: ["Alice Moreau", "Thomas Bernard"], hours: "9h-18h" },
  { day: "Mardi", staff: ["Emma Petit", "Lucas Roux"], hours: "9h-18h" },
  { day: "Mercredi", staff: ["Alice Moreau", "Emma Petit"], hours: "9h-18h" },
  { day: "Jeudi", staff: ["Thomas Bernard", "Lucas Roux"], hours: "9h-18h" },
  { day: "Vendredi", staff: ["Alice Moreau", "Thomas Bernard", "Emma Petit"], hours: "9h-20h" },
  { day: "Samedi", staff: ["Thomas Bernard", "Emma Petit"], hours: "10h-19h" },
  { day: "Dimanche", staff: ["Alice Moreau"], hours: "10h-14h" },
]

const leaveData = [
  {
    id: 1,
    staffId: 1,
    staffName: "Alice Moreau",
    type: "vacation",
    startDate: "2024-02-15",
    endDate: "2024-02-22",
    days: 7,
    status: "approved",
    reason: "Vacances d'hiver",
  },
  {
    id: 2,
    staffId: 2,
    staffName: "Thomas Bernard",
    type: "sick",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    days: 2,
    status: "approved",
    reason: "Maladie",
  },
  {
    id: 3,
    staffId: 3,
    staffName: "Emma Petit",
    type: "vacation",
    startDate: "2024-03-10",
    endDate: "2024-03-17",
    days: 7,
    status: "pending",
    reason: "Vacances de printemps",
  },
  {
    id: 4,
    staffId: 4,
    staffName: "Lucas Roux",
    type: "personal",
    startDate: "2024-01-28",
    endDate: "2024-01-28",
    days: 1,
    status: "rejected",
    reason: "Raisons personnelles",
  },
]

const rolesData = [
  {
    id: 1,
    name: "Super Admin",
    description: "Accès complet à tous les modules",
    permissions: ["catalog", "click-collect", "inventory", "users", "analytics", "promotions", "settings"],
    color: "purple",
  },
  {
    id: 2,
    name: "Gérant",
    description: "Gestion du magasin et du personnel",
    permissions: ["catalog", "click-collect", "inventory", "users", "analytics", "promotions"],
    color: "blue",
  },
  {
    id: 3,
    name: "Caissier",
    description: "Gestion des commandes et clic & collect",
    permissions: ["click-collect", "inventory"],
    color: "green",
  },
  {
    id: 4,
    name: "Gestionnaire de stock",
    description: "Gestion du catalogue et de l'inventaire",
    permissions: ["catalog", "inventory"],
    color: "orange",
  },
]

const allPermissions = [
  { id: "catalog", name: "Catalogue", description: "Gérer les produits et catégories" },
  { id: "click-collect", name: "Clic & Collect", description: "Gérer les commandes clients" },
  { id: "inventory", name: "Inventaire", description: "Gérer les stocks" },
  { id: "users", name: "Utilisateurs", description: "Gérer les clients et le personnel" },
  { id: "analytics", name: "Analytiques", description: "Voir les statistiques" },
  { id: "promotions", name: "Promotions", description: "Créer et gérer les promotions" },
  { id: "settings", name: "Paramètres", description: "Configurer le magasin" },
]

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedStaff, setSelectedStaff] = useState<number[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [showBulkActions, setShowBulkActions] = useState(false)

  const handleEditStaff = (staff: (typeof staffData)[0]) => {
    console.log("[v0] Editing staff:", staff)
    toast.info(`Modification de ${staff.name}`)
    // TODO: Open edit dialog with staff data
  }

  const handleDeleteStaff = (staffId: number) => {
    console.log("[v0] Deleting staff:", staffId)
    toast.success("Employé supprimé avec succès")
  }

  const handleApproveLeave = (leaveId: number) => {
    console.log("[v0] Approving leave:", leaveId)
    toast.success("Congé approuvé")
  }

  const handleRejectLeave = (leaveId: number) => {
    console.log("[v0] Rejecting leave:", leaveId)
    toast.error("Congé refusé")
  }

  const handleEditRole = (roleId: number) => {
    console.log("[v0] Editing role:", roleId)
    toast.info("Modification du rôle")
  }

  const handleDeleteRole = (roleId: number) => {
    console.log("[v0] Deleting role:", roleId)
    toast.success("Rôle supprimé")
  }

  const handleModifySchedule = (day: string) => {
    console.log("[v0] Modifying schedule for:", day)
    toast.info(`Modification du planning pour ${day}`)
  }

  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter
    const matchesRole = roleFilter === "all" || staff.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedStaff = filteredStaff.slice(startIndex, endIndex)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStaff(paginatedStaff.map((s) => s.id))
    } else {
      setSelectedStaff([])
    }
  }

  const handleSelectStaff = (staffId: number, checked: boolean) => {
    if (checked) {
      setSelectedStaff([...selectedStaff, staffId])
    } else {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId))
    }
  }

  const isAllSelected = paginatedStaff.length > 0 && selectedStaff.length === paginatedStaff.length

  const handleBulkDelete = () => {
    console.log("[v0] Bulk deleting staff:", selectedStaff)
    toast.success(`${selectedStaff.length} employé(s) supprimé(s)`)
    setSelectedStaff([])
  }

  const handleBulkStatusChange = (status: string) => {
    console.log("[v0] Changing status for staff:", selectedStaff, "to", status)
    toast.success(`Statut mis à jour pour ${selectedStaff.length} employé(s)`)
    setSelectedStaff([])
  }

  const handleBulkExport = (format: "excel" | "pdf") => {
    console.log("[v0] Exporting selected staff as", format, selectedStaff)

    if (format === "excel") {
      const selectedData = staffData.filter((s) => selectedStaff.includes(s.id))
      const csvContent = [
        ["Nom", "Email", "Rôle", "Téléphone", "Date d'embauche", "Statut", "Heures/semaine"].join(","),
        ...selectedData.map((s) => [s.name, s.email, s.role, s.phone, s.hireDate, s.status, s.hoursThisWeek].join(",")),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `personnel_selection_${new Date().toISOString().split("T")[0]}.csv`
      link.click()
      toast.success("Export Excel généré avec succès")
    } else {
      const selectedData = staffData.filter((s) => selectedStaff.includes(s.id))
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Personnel Sélectionné - AfroMarket</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #333; border-bottom: 3px solid #e74c3c; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #e74c3c; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>Personnel Sélectionné - AfroMarket</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString("fr-FR")}</p>
          <p><strong>Nombre d'employés:</strong> ${selectedData.length}</p>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Téléphone</th>
                <th>Date d'embauche</th>
                <th>Statut</th>
                <th>Heures/semaine</th>
              </tr>
            </thead>
            <tbody>
              ${selectedData
                .map(
                  (s) => `
                <tr>
                  <td>${s.name}</td>
                  <td>${s.email}</td>
                  <td>${s.role}</td>
                  <td>${s.phone}</td>
                  <td>${s.hireDate}</td>
                  <td>${s.status}</td>
                  <td>${s.hoursThisWeek}h</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          <div class="footer">
            <p>AfroMarket - Gestion du Personnel</p>
          </div>
        </body>
        </html>
      `

      const blob = new Blob([htmlContent], { type: "text/html" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `personnel_selection_${new Date().toISOString().split("T")[0]}.html`
      link.click()
      toast.success("Export PDF généré avec succès")
    }
  }

  const handleBulkEmail = () => {
    console.log("[v0] Sending email to staff:", selectedStaff)
    toast.success(`Email envoyé à ${selectedStaff.length} employé(s)`)
  }

  const stats = [
    {
      title: "Total Personnel",
      value: staffData.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Actifs",
      value: staffData.filter((s) => s.status === "active").length,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Heures cette semaine",
      value: staffData.reduce((acc, s) => acc + s.hoursThisWeek, 0),
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "manager":
        return <Badge className="bg-purple-100 text-purple-800">Gérant</Badge>
      case "cashier":
        return <Badge className="bg-blue-100 text-blue-800">Caissier</Badge>
      case "stock":
        return <Badge className="bg-green-100 text-green-800">Stock</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "on_leave":
        return <Badge className="bg-orange-100 text-orange-800">En congé</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactif</Badge>
      default:
        return null
    }
  }

  const getLeaveTypeBadge = (type: string) => {
    switch (type) {
      case "vacation":
        return <Badge className="bg-blue-100 text-blue-800">Vacances</Badge>
      case "sick":
        return <Badge className="bg-red-100 text-red-800">Maladie</Badge>
      case "personal":
        return <Badge className="bg-purple-100 text-purple-800">Personnel</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getLeaveStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">En attente</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Refusé</Badge>
      default:
        return null
    }
  }

  const getRoleColor = (color: string) => {
    const colors: Record<string, string> = {
      purple: "bg-purple-100 text-purple-800",
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      orange: "bg-orange-100 text-orange-800",
    }
    return colors[color] || "bg-gray-100 text-gray-800"
  }

  const handleExport = (format: "pdf" | "excel") => {
    console.log(`[v0] Exporting all staff data as ${format}`)

    if (format === "excel") {
      const csvContent = [
        ["Nom", "Email", "Rôle", "Téléphone", "Date d'embauche", "Statut", "Heures/semaine", "Performance"].join(","),
        ...filteredStaff.map((s) =>
          [s.name, s.email, s.role, s.phone, s.hireDate, s.status, s.hoursThisWeek, s.performance].join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `personnel_complet_${new Date().toISOString().split("T")[0]}.csv`
      link.click()
      toast.success("Export Excel généré avec succès")
    } else {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Liste du Personnel - AfroMarket</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #333; border-bottom: 3px solid #e74c3c; padding-bottom: 10px; }
            .stats { display: flex; gap: 20px; margin: 20px 0; }
            .stat-card { flex: 1; padding: 15px; background: #f5f5f5; border-radius: 8px; }
            .stat-value { font-size: 24px; font-weight: bold; color: #e74c3c; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 11px; }
            th { background-color: #e74c3c; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>Liste du Personnel - AfroMarket</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString("fr-FR")}</p>
          <div class="stats">
            <div class="stat-card">
              <div>Total Personnel</div>
              <div class="stat-value">${staffData.length}</div>
            </div>
            <div class="stat-card">
              <div>Actifs</div>
              <div class="stat-value">${staffData.filter((s) => s.status === "active").length}</div>
            </div>
            <div class="stat-card">
              <div>Heures cette semaine</div>
              <div class="stat-value">${staffData.reduce((acc, s) => acc + s.hoursThisWeek, 0)}h</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Téléphone</th>
                <th>Date d'embauche</th>
                <th>Statut</th>
                <th>Heures/semaine</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              ${filteredStaff
                .map(
                  (s) => `
                <tr>
                  <td>${s.name}</td>
                  <td>${s.email}</td>
                  <td>${s.role}</td>
                  <td>${s.phone}</td>
                  <td>${s.hireDate}</td>
                  <td>${s.status}</td>
                  <td>${s.hoursThisWeek}h</td>
                  <td>${s.performance}%</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          <div class="footer">
            <p>AfroMarket - Gestion du Personnel</p>
            <p>Généré le ${new Date().toLocaleString("fr-FR")}</p>
          </div>
        </body>
        </html>
      `

      const blob = new Blob([htmlContent], { type: "text/html" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `personnel_complet_${new Date().toISOString().split("T")[0]}.html`
      link.click()
      toast.success("Export PDF généré avec succès")
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Personnel</h1>
          <p className="mt-2 text-muted-foreground">Gestion RH et planning du personnel</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Ajouter un employé
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un employé</DialogTitle>
              <DialogDescription>Remplissez les informations du nouvel employé</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jean.dupont@afromarket.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+33 6 12 34 56 78" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Gérant</SelectItem>
                      <SelectItem value="cashier">Caissier</SelectItem>
                      <SelectItem value="stock">Gestionnaire de stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Date d'embauche</Label>
                  <Input id="hireDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salaire (€/mois)</Label>
                  <Input id="salary" type="number" placeholder="2000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="permissions">Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Gestion catalogue</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Gestion commandes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Gestion stock</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Voir analytiques</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Ajouter</Button>
            </div>
          </DialogContent>
        </Dialog>
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

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList>
          <TabsTrigger value="staff">Personnel</TabsTrigger>
          <TabsTrigger value="schedule">Planning</TabsTrigger>
          <TabsTrigger value="leaves">Congés</TabsTrigger>
          <TabsTrigger value="roles">Rôles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un employé..."
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
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="on_leave">En congé</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tous les rôles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les rôles</SelectItem>
                      <SelectItem value="manager">Gérant</SelectItem>
                      <SelectItem value="cashier">Caissier</SelectItem>
                      <SelectItem value="stock">Stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2 bg-transparent" onClick={() => handleExport("excel")}>
                    <Download className="h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent" onClick={() => handleExport("pdf")}>
                    <FileText className="h-4 w-4" />
                    PDF
                  </Button>
                </div>

                {selectedStaff.length > 0 && (
                  <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                      <span className="text-sm font-medium">{selectedStaff.length} employé(s) sélectionné(s)</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={() => handleBulkStatusChange("active")}
                      >
                        <UserCheck className="h-4 w-4" />
                        Activer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={() => handleBulkStatusChange("inactive")}
                      >
                        <UserX className="h-4 w-4" />
                        Désactiver
                      </Button>
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

          <Card>
            <CardHeader>
              <CardTitle>Liste du personnel ({filteredStaff.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">
                        <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                      </th>
                      <th className="p-4 text-left text-sm font-medium">Employé</th>
                      <th className="p-4 text-left text-sm font-medium">Rôle</th>
                      <th className="p-4 text-left text-sm font-medium">Date d'embauche</th>
                      <th className="p-4 text-left text-sm font-medium">Heures/semaine</th>
                      <th className="p-4 text-left text-sm font-medium">Statut</th>
                      <th className="p-4 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStaff.map((staff) => (
                      <tr key={staff.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <Checkbox
                            checked={selectedStaff.includes(staff.id)}
                            onCheckedChange={(checked) => handleSelectStaff(staff.id, checked as boolean)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {staff.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{staff.name}</p>
                              <p className="text-sm text-muted-foreground">{staff.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{getRoleBadge(staff.role)}</td>
                        <td className="p-4 text-sm text-muted-foreground">{staff.hireDate}</td>
                        <td className="p-4">
                          <p className="font-medium">{staff.hoursThisWeek}h</p>
                        </td>
                        <td className="p-4">{getStatusBadge(staff.status)}</td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditStaff(staff)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteStaff(staff.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
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
                    Affichage de {startIndex + 1} à {Math.min(endIndex, filteredStaff.length)} sur{" "}
                    {filteredStaff.length} employé(s)
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
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Planning de la semaine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleData.map((day) => (
                  <div key={day.day} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="w-24">
                      <p className="font-semibold">{day.day}</p>
                      <p className="text-sm text-muted-foreground">{day.hours}</p>
                    </div>
                    <div className="flex flex-1 flex-wrap gap-2">
                      {day.staff.map((name) => (
                        <Badge key={name} variant="secondary">
                          {name}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleModifySchedule(day.day)}>
                      Modifier
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Gestion des congés</h2>
              <p className="text-muted-foreground">Gérer les demandes de congés du personnel</p>
            </div>
            <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nouvelle demande
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouvelle demande de congé</DialogTitle>
                  <DialogDescription>Créer une demande de congé pour un employé</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="staff">Employé</Label>
                    <Select>
                      <SelectTrigger id="staff">
                        <SelectValue placeholder="Sélectionner un employé" />
                      </SelectTrigger>
                      <SelectContent>
                        {staffData.map((staff) => (
                          <SelectItem key={staff.id} value={staff.id.toString()}>
                            {staff.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaveType">Type de congé</Label>
                    <Select>
                      <SelectTrigger id="leaveType">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vacation">Vacances</SelectItem>
                        <SelectItem value="sick">Maladie</SelectItem>
                        <SelectItem value="personal">Personnel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Date de début</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Date de fin</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Raison</Label>
                    <Textarea id="reason" placeholder="Raison de la demande..." />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setIsLeaveDialogOpen(false)}>Créer</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Leave Statistics */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">En attente</p>
                    <p className="text-2xl font-bold">{leaveData.filter((l) => l.status === "pending").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-green-100 p-3 text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Approuvés</p>
                    <p className="text-2xl font-bold">{leaveData.filter((l) => l.status === "approved").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total jours</p>
                    <p className="text-2xl font-bold">{leaveData.reduce((acc, l) => acc + l.days, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leave Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Demandes de congés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left text-sm font-medium">Employé</th>
                      <th className="p-4 text-left text-sm font-medium">Type</th>
                      <th className="p-4 text-left text-sm font-medium">Période</th>
                      <th className="p-4 text-left text-sm font-medium">Jours</th>
                      <th className="p-4 text-left text-sm font-medium">Statut</th>
                      <th className="p-4 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveData.map((leave) => (
                      <tr key={leave.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {leave.staffName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{leave.staffName}</p>
                              <p className="text-sm text-muted-foreground">{leave.reason}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{getLeaveTypeBadge(leave.type)}</td>
                        <td className="p-4 text-sm">
                          <p>{leave.startDate}</p>
                          <p className="text-muted-foreground">au {leave.endDate}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium">{leave.days} jours</p>
                        </td>
                        <td className="p-4">{getLeaveStatusBadge(leave.status)}</td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            {leave.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => handleApproveLeave(leave.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleRejectLeave(leave.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Leave Balance by Staff */}
          <Card>
            <CardHeader>
              <CardTitle>Solde de congés par employé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffData.map((staff) => {
                  const usedDays = leaveData
                    .filter((l) => l.staffId === staff.id && l.status === "approved")
                    .reduce((acc, l) => acc + l.days, 0)
                  const totalDays = 25 // Standard annual leave
                  const remainingDays = totalDays - usedDays

                  return (
                    <div key={staff.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <Avatar>
                        <AvatarFallback>
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-muted-foreground">{getRoleBadge(staff.role)}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Utilisés</p>
                          <p className="text-xl font-bold">{usedDays}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Restants</p>
                          <p className="text-xl font-bold text-green-600">{remainingDays}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold">{totalDays}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Rôles & Permissions</h2>
              <p className="text-muted-foreground">Gérer les rôles et les permissions d'accès aux modules</p>
            </div>
            <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nouveau rôle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer un nouveau rôle</DialogTitle>
                  <DialogDescription>Définir un rôle personnalisé avec des permissions spécifiques</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="roleName">Nom du rôle</Label>
                    <Input id="roleName" placeholder="Ex: Responsable marketing" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roleDescription">Description</Label>
                    <Textarea id="roleDescription" placeholder="Description du rôle..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roleColor">Couleur</Label>
                    <Select>
                      <SelectTrigger id="roleColor">
                        <SelectValue placeholder="Sélectionner une couleur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purple">Violet</SelectItem>
                        <SelectItem value="blue">Bleu</SelectItem>
                        <SelectItem value="green">Vert</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="grid gap-3 rounded-lg border p-4">
                      {allPermissions.map((permission) => (
                        <label key={permission.id} className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" className="mt-1 rounded" />
                          <div className="flex-1">
                            <p className="font-medium">{permission.name}</p>
                            <p className="text-sm text-muted-foreground">{permission.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setIsRoleDialogOpen(false)}>Créer le rôle</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Roles List */}
          <div className="grid gap-4 md:grid-cols-2">
            {rolesData.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg p-2 ${getRoleColor(role.color)}`}>
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEditRole(role.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteRole(role.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Permissions ({role.permissions.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permId) => {
                        const perm = allPermissions.find((p) => p.id === permId)
                        return (
                          <Badge key={permId} variant="secondary">
                            {perm?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Permissions Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Matrice des permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left text-sm font-medium">Module</th>
                      {rolesData.map((role) => (
                        <th key={role.id} className="p-4 text-center text-sm font-medium">
                          {role.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allPermissions.map((permission) => (
                      <tr key={permission.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{permission.name}</p>
                            <p className="text-sm text-muted-foreground">{permission.description}</p>
                          </div>
                        </td>
                        {rolesData.map((role) => (
                          <td key={role.id} className="p-4 text-center">
                            {role.permissions.includes(permission.id) ? (
                              <CheckCircle2 className="mx-auto h-5 w-5 text-green-600" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
