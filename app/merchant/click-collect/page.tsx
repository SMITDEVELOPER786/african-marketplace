"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Search,
  Eye,
  Clock,
  CheckCircle2,
  Package,
  XCircle,
  Download,
  FileText,
  Filter,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Printer,
  Send,
  MoreVertical,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MessageSquare,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { exportToPDF, exportToExcel } from "@/lib/export-utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const statusConfig = {
  received: {
    label: "Reçu",
    variant: "secondary" as const,
    icon: Clock,
    color: "text-blue-600",
  },
  preparing: {
    label: "En préparation",
    variant: "default" as const,
    icon: Package,
    color: "text-orange-600",
  },
  ready: {
    label: "Prêt",
    variant: "default" as const,
    icon: CheckCircle2,
    color: "text-green-600",
  },
  collected: {
    label: "Récupéré",
    variant: "outline" as const,
    icon: CheckCircle2,
    color: "text-gray-600",
  },
  cancelled: {
    label: "Annulé",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-red-600",
  },
}

export default function ClickCollectPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [orders, setOrders] = useState<any[]>([])

  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [bulkActionDialog, setBulkActionDialog] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [sortField, setSortField] = useState<string>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [notifyOrder, setNotifyOrder] = useState<any>(null)
  const [notifyMethod, setNotifyMethod] = useState<"email" | "whatsapp">("email")
  const [notifyMessage, setNotifyMessage] = useState("")

  useEffect(() => {
    const savedOrders = localStorage.getItem("merchant_orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      const mockOrders = [
        {
          id: "CC-1234",
          customer: {
            name: "Jean Dupont",
            phone: "+33 6 12 34 56 78",
            email: "jean.dupont@email.com",
          },
          items: [
            { name: "Huile de Palme Premium", quantity: 2, price: 24.99 },
            { name: "Farine de Manioc", quantity: 1, price: 12.99 },
          ],
          total: 62.97,
          paymentMethod: "pay_on_collect" as const,
          paymentStatus: "pending" as const,
          status: "received" as const,
          pickupSlot: "2025-01-20 14:00 - 15:00",
          pickupLocation: "Magasin Paris 15ème",
          createdAt: "2025-01-18 10:30",
        },
        {
          id: "CC-1233",
          customer: {
            name: "Marie Martin",
            phone: "+33 6 98 76 54 32",
            email: "marie.martin@email.com",
          },
          items: [{ name: "Mélange d'Épices", quantity: 3, price: 8.99 }],
          total: 26.97,
          paymentMethod: "paid_online" as const,
          paymentStatus: "paid" as const,
          status: "preparing" as const,
          pickupSlot: "2025-01-19 16:00 - 17:00",
          pickupLocation: "Magasin Paris 15ème",
          createdAt: "2025-01-18 09:15",
        },
        {
          id: "CC-1232",
          customer: {
            name: "Pierre Dubois",
            phone: "+33 6 45 67 89 01",
            email: "pierre.dubois@email.com",
          },
          items: [
            { name: "Poisson Séché", quantity: 1, price: 34.99 },
            { name: "Huile de Palme", quantity: 1, price: 24.99 },
          ],
          total: 59.98,
          paymentMethod: "paid_online" as const,
          paymentStatus: "paid" as const,
          status: "ready" as const,
          pickupSlot: "2025-01-19 10:00 - 11:00",
          pickupLocation: "Magasin Paris 15ème",
          createdAt: "2025-01-18 08:45",
        },
        {
          id: "CC-1231",
          customer: {
            name: "Sophie Laurent",
            phone: "+33 6 23 45 67 89",
            email: "sophie.laurent@email.com",
          },
          items: [{ name: "Farine de Manioc", quantity: 2, price: 12.99 }],
          total: 25.98,
          paymentMethod: "pay_on_collect" as const,
          paymentStatus: "paid" as const,
          status: "collected" as const,
          pickupSlot: "2025-01-18 14:00 - 15:00",
          pickupLocation: "Magasin Paris 15ème",
          createdAt: "2025-01-17 16:20",
        },
      ]
      setOrders(mockOrders)
      localStorage.setItem("merchant_orders", JSON.stringify(mockOrders))
    }
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery)
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "pending"
          ? ["received", "preparing"].includes(order.status)
          : activeTab === "ready"
            ? order.status === "ready"
            : activeTab === "completed"
              ? order.status === "collected"
              : activeTab === "cancelled"
                ? order.status === "cancelled"
                : true

    const matchesPaymentStatus = selectedPaymentStatus === "all" || order.paymentStatus === selectedPaymentStatus

    return matchesSearch && matchesTab && matchesPaymentStatus
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === "customer") {
      aValue = a.customer.name
      bValue = b.customer.name
    }

    if (typeof aValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue
  })

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedOrders = sortedOrders.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTab, selectedPaymentStatus, itemsPerPage])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(paginatedOrders.map((o) => o.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const isAllSelected = paginatedOrders.length > 0 && selectedOrders.length === paginatedOrders.length
  const isSomeSelected = selectedOrders.length > 0 && selectedOrders.length < paginatedOrders.length

  const handleBulkStatusUpdate = (newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      selectedOrders.includes(order.id) ? { ...order, status: newStatus } : order,
    )
    setOrders(updatedOrders)
    localStorage.setItem("merchant_orders", JSON.stringify(updatedOrders))

    toast({
      title: "Statut mis à jour",
      description: `${selectedOrders.length} commande(s) mise(s) à jour`,
    })

    setSelectedOrders([])
    setBulkActionDialog(null)
  }

  const handleBulkExport = () => {
    const selectedOrdersData = orders.filter((o) => selectedOrders.includes(o.id))
    const exportData = selectedOrdersData.map((o) => ({
      ID: o.id,
      Client: o.customer.name,
      Email: o.customer.email,
      Téléphone: o.customer.phone,
      Total: `€${o.total.toFixed(2)}`,
      Statut: statusConfig[o.status].label,
    }))
    exportToPDF(exportData, "commandes-selectionnees", "Commandes Sélectionnées")
    toast({
      title: "Export réussi",
      description: `${selectedOrders.length} commande(s) exportée(s)`,
    })
  }

  const handleBulkPrint = () => {
    toast({
      title: "Impression en cours",
      description: `Impression de ${selectedOrders.length} bon(s) de préparation`,
    })
  }

  const handleBulkNotify = () => {
    toast({
      title: "Notifications envoyées",
      description: `${selectedOrders.length} client(s) notifié(s) par SMS/Email`,
    })
  }

  const handleExportPDF = () => {
    const exportData = filteredOrders.map((o) => ({
      ID: o.id,
      Client: o.customer.name,
      Téléphone: o.customer.phone,
      Total: `€${o.total.toFixed(2)}`,
      Paiement: o.paymentStatus === "paid" ? "Payé" : "En attente",
      Créneau: o.pickupSlot,
      Statut: statusConfig[o.status].label,
    }))
    exportToPDF(exportData, "commandes-clic-collect", "Commandes Clic & Collect")
    toast({
      title: "Export réussi",
      description: "Les commandes ont été exportées en PDF",
    })
  }

  const handleExportExcel = () => {
    const exportData = filteredOrders.map((o) => ({
      ID: o.id,
      Client: o.customer.name,
      Email: o.customer.email,
      Téléphone: o.customer.phone,
      Articles: o.items.length,
      Total: o.total,
      "Méthode de paiement": o.paymentMethod === "paid_online" ? "En ligne" : "Sur place",
      "Statut paiement": o.paymentStatus,
      Créneau: o.pickupSlot,
      Lieu: o.pickupLocation,
      Statut: o.status,
      "Créé le": o.createdAt,
    }))
    exportToExcel(exportData, "commandes-clic-collect")
    toast({
      title: "Export réussi",
      description: "Les commandes ont été exportées en Excel",
    })
  }

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    localStorage.setItem("merchant_orders", JSON.stringify(updatedOrders))

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }

    const statusLabels: Record<string, string> = {
      preparing: "en préparation",
      ready: "prête",
      collected: "récupérée",
      cancelled: "annulée",
    }

    toast({
      title: "Statut mis à jour",
      description: `La commande ${orderId} est maintenant ${statusLabels[newStatus]}`,
    })
  }

  const handlePrintOrder = (order: any) => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      toast({
        title: "Erreur",
        description: "Impossible d'ouvrir la fenêtre d'impression. Vérifiez les paramètres de votre navigateur.",
        variant: "destructive",
      })
      return
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bon de préparation - ${order.id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #000;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .section {
              margin-bottom: 20px;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            .section h2 {
              margin-top: 0;
              font-size: 18px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 10px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
            }
            .info-label {
              font-weight: bold;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .total-row {
              font-weight: bold;
              font-size: 18px;
              background-color: #f9f9f9;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            .barcode {
              text-align: center;
              font-size: 32px;
              font-family: 'Courier New', monospace;
              letter-spacing: 2px;
              margin: 20px 0;
            }
            @media print {
              body {
                padding: 0;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>BON DE PRÉPARATION</h1>
            <p>AfroMarket - Clic & Collect</p>
            <div class="barcode">${order.id}</div>
          </div>

          <div class="section">
            <h2>Informations Client</h2>
            <div class="info-row">
              <span class="info-label">Nom:</span>
              <span>${order.customer.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Téléphone:</span>
              <span>${order.customer.phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span>${order.customer.email}</span>
            </div>
          </div>

          <div class="section">
            <h2>Informations de Collecte</h2>
            <div class="info-row">
              <span class="info-label">Point de collecte:</span>
              <span>${order.pickupLocation}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Créneau:</span>
              <span>${order.pickupSlot}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Statut de paiement:</span>
              <span>${order.paymentStatus === "paid" ? "Payé" : order.paymentMethod === "pay_on_collect" ? "Paiement sur place" : "En attente"}</span>
            </div>
          </div>

          <div class="section">
            <h2>Articles à Préparer</h2>
            <table>
              <thead>
                <tr>
                  <th>Article</th>
                  <th style="text-align: center;">Quantité</th>
                  <th style="text-align: right;">Prix unitaire</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items
                  .map(
                    (item: any) => `
                  <tr>
                    <td>${item.name}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right;">€${item.price.toFixed(2)}</td>
                    <td style="text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `,
                  )
                  .join("")}
                <tr class="total-row">
                  <td colspan="3" style="text-align: right;">TOTAL</td>
                  <td style="text-align: right;">€${order.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>Instructions</h2>
            <p>☐ Vérifier tous les articles</p>
            <p>☐ Emballer soigneusement</p>
            <p>☐ Étiqueter avec le numéro de commande</p>
            <p>☐ Placer dans la zone de collecte</p>
            <p>☐ Notifier le client</p>
          </div>

          <div class="footer">
            <p>Imprimé le ${new Date().toLocaleString("fr-FR")}</p>
            <p>AfroMarket - Tous droits réservés</p>
          </div>

          <div class="no-print" style="margin-top: 20px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
              Imprimer
            </button>
            <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; margin-left: 10px;">
              Fermer
            </button>
          </div>
        </body>
      </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()

    toast({
      title: "Bon de préparation ouvert",
      description: `Le bon pour ${order.id} est prêt à être imprimé`,
    })
  }

  const handleDownloadOrder = (order: any) => {
    const orderData = [
      { Label: "Commande", Value: order.id },
      { Label: "Client", Value: order.customer.name },
      { Label: "Téléphone", Value: order.customer.phone },
      { Label: "Email", Value: order.customer.email },
      { Label: "Point de collecte", Value: order.pickupLocation },
      { Label: "Créneau", Value: order.pickupSlot },
      { Label: "Paiement", Value: order.paymentStatus === "paid" ? "Payé" : "En attente" },
      { Label: "", Value: "" },
      { Label: "ARTICLES", Value: "" },
      ...order.items.map((item: any) => ({
        Label: `${item.name} (x${item.quantity})`,
        Value: `€${(item.price * item.quantity).toFixed(2)}`,
      })),
      { Label: "", Value: "" },
      { Label: "TOTAL", Value: `€${order.total.toFixed(2)}` },
    ]

    exportToPDF(orderData, `commande-${order.id}`, `Commande ${order.id}`)

    toast({
      title: "Téléchargement réussi",
      description: `La commande ${order.id} a été téléchargée en PDF`,
    })
  }

  const handleOpenNotifyModal = (order: any) => {
    setNotifyOrder(order)
    setNotifyMethod("email")

    // Generate default message based on order status
    let defaultMessage = ""
    if (order.status === "preparing") {
      defaultMessage = `Bonjour ${order.customer.name},\n\nVotre commande ${order.id} est en cours de préparation.\n\nVous pourrez la récupérer le ${order.pickupSlot} à ${order.pickupLocation}.\n\nÀ bientôt !\nL'équipe AfroMarket`
    } else if (order.status === "ready") {
      defaultMessage = `Bonjour ${order.customer.name},\n\nBonne nouvelle ! Votre commande ${order.id} est prête.\n\nVous pouvez venir la récupérer dès maintenant pendant votre créneau : ${order.pickupSlot}\nLieu : ${order.pickupLocation}\n\nÀ très bientôt !\nL'équipe AfroMarket`
    } else {
      defaultMessage = `Bonjour ${order.customer.name},\n\nConcernant votre commande ${order.id}.\n\nCréneau de collecte : ${order.pickupSlot}\nLieu : ${order.pickupLocation}\n\nCordialement,\nL'équipe AfroMarket`
    }

    setNotifyMessage(defaultMessage)
    setShowNotifyModal(true)
  }

  const handleSendNotification = () => {
    if (!notifyOrder || !notifyMessage.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un message",
        variant: "destructive",
      })
      return
    }

    // Simulate sending notification
    toast({
      title: "Notification envoyée",
      description: `${notifyOrder.customer.name} a été notifié par ${notifyMethod === "email" ? "Email" : "WhatsApp"}`,
    })

    setShowNotifyModal(false)
    setNotifyOrder(null)
    setNotifyMessage("")
  }

  const handleNotifyCustomer = (order: any) => {
    handleOpenNotifyModal(order)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clic & Collect</h1>
          <p className="mt-2 text-muted-foreground">Gérez les demandes de collecte de vos clients</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouvelles demandes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "received").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En préparation</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "preparing").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prêtes</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "ready").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Récupérées aujourd'hui</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "collected").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par ID, nom client, téléphone..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Exporter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportPDF} className="gap-2">
                    <FileText className="h-4 w-4" />
                    Exporter en PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportExcel} className="gap-2">
                    <FileText className="h-4 w-4" />
                    Exporter en Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {showFilters && (
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>Date de collecte</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les dates</SelectItem>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="tomorrow">Demain</SelectItem>
                      <SelectItem value="week">Cette semaine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Point de collecte</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les magasins" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les magasins</SelectItem>
                      <SelectItem value="paris15">Magasin Paris 15ème</SelectItem>
                      <SelectItem value="paris18">Magasin Paris 18ème</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Statut de paiement</Label>
                  <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="paid">Payé</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedOrders.length > 0 && (
        <Card className="mb-6 border-primary">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">{selectedOrders.length} commande(s) sélectionnée(s)</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedOrders([])}>
                Désélectionner tout
              </Button>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Package className="h-4 w-4" />
                    Changer le statut
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setBulkActionDialog("preparing")}>
                    Marquer en préparation
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setBulkActionDialog("ready")}>Marquer comme prêt</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setBulkActionDialog("collected")}>
                    Marquer comme récupéré
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setBulkActionDialog("cancelled")} className="text-destructive">
                    Annuler
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleBulkPrint}>
                <Printer className="h-4 w-4" />
                Imprimer
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleBulkNotify}>
                <Send className="h-4 w-4" />
                Notifier
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleBulkExport}>
                <Download className="h-4 w-4" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={bulkActionDialog !== null} onOpenChange={() => setBulkActionDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer l'action groupée</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir modifier le statut de {selectedOrders.length} commande(s) ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => bulkActionDialog && handleBulkStatusUpdate(bulkActionDialog)}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showNotifyModal} onOpenChange={setShowNotifyModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notifier le client</DialogTitle>
            <DialogDescription>
              Envoyez une notification à {notifyOrder?.customer.name} concernant la commande {notifyOrder?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Méthode de notification</Label>
              <RadioGroup value={notifyMethod} onValueChange={(value: any) => setNotifyMethod(value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email" className="flex items-center gap-2 font-normal cursor-pointer">
                    <Mail className="h-4 w-4" />
                    Email ({notifyOrder?.customer.email})
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp" className="flex items-center gap-2 font-normal cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp ({notifyOrder?.customer.phone})
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Message</Label>
              <Textarea
                value={notifyMessage}
                onChange={(e) => setNotifyMessage(e.target.value)}
                placeholder="Saisissez votre message..."
                className="mt-2 min-h-[200px]"
              />
              <p className="mt-2 text-sm text-muted-foreground">{notifyMessage.length} caractères</p>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-2 font-semibold text-sm">Aperçu</h4>
              <div className="whitespace-pre-wrap text-sm">{notifyMessage || "Aucun message saisi"}</div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNotifyModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendNotification} className="gap-2">
              <Send className="h-4 w-4" />
              Envoyer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="ready">Prêtes</TabsTrigger>
          <TabsTrigger value="completed">Récupérées</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="w-12 p-4">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={handleSelectAll}
                          aria-label="Sélectionner tout"
                        />
                      </th>
                      <th className="p-4 text-left text-sm font-medium">
                        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2" onClick={() => handleSort("id")}>
                          ID
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </th>
                      <th className="p-4 text-left text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2"
                          onClick={() => handleSort("customer")}
                        >
                          Client
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </th>
                      <th className="p-4 text-left text-sm font-medium">Articles</th>
                      <th className="p-4 text-left text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2"
                          onClick={() => handleSort("total")}
                        >
                          Total
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </th>
                      <th className="p-4 text-left text-sm font-medium">Paiement</th>
                      <th className="p-4 text-left text-sm font-medium">Créneau</th>
                      <th className="p-4 text-left text-sm font-medium">Statut</th>
                      <th className="p-4 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order) => {
                      const statusInfo = statusConfig[order.status]
                      const StatusIcon = statusInfo.icon
                      const isSelected = selectedOrders.includes(order.id)

                      return (
                        <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="p-4">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                              aria-label={`Sélectionner ${order.id}`}
                            />
                          </td>
                          <td className="p-4 font-mono text-sm font-medium">{order.id}</td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-medium">{order.customer.name}</span>
                              <span className="text-xs text-muted-foreground">{order.customer.phone}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {order.items.length} article{order.items.length > 1 ? "s" : ""}
                          </td>
                          <td className="p-4 font-medium">€{order.total.toFixed(2)}</td>
                          <td className="p-4">
                            <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                              {order.paymentStatus === "paid"
                                ? "Payé"
                                : order.paymentMethod === "pay_on_collect"
                                  ? "Paiement sur place"
                                  : "En attente"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {order.pickupSlot}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant={statusInfo.variant} className="gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {statusInfo.label}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault()
                                        setSelectedOrder(order)
                                      }}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      Voir les détails
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Détails de la commande {order.id}</DialogTitle>
                                    </DialogHeader>
                                    {selectedOrder && (
                                      <div className="space-y-6">
                                        {/* Customer Info */}
                                        <div>
                                          <h3 className="mb-3 font-semibold">Informations client</h3>
                                          <div className="space-y-2 rounded-lg border p-4">
                                            <div className="flex items-center gap-2">
                                              <span className="font-medium">{selectedOrder.customer.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                              <Phone className="h-4 w-4" />
                                              {selectedOrder.customer.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                              <Mail className="h-4 w-4" />
                                              {selectedOrder.customer.email}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Pickup Info */}
                                        <div>
                                          <h3 className="mb-3 font-semibold">Informations de collecte</h3>
                                          <div className="space-y-2 rounded-lg border p-4">
                                            <div className="flex items-center gap-2 text-sm">
                                              <MapPin className="h-4 w-4 text-muted-foreground" />
                                              <span>{selectedOrder.pickupLocation}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                              <Calendar className="h-4 w-4 text-muted-foreground" />
                                              <span>{selectedOrder.pickupSlot}</span>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Items */}
                                        <div>
                                          <h3 className="mb-3 font-semibold">Articles commandés</h3>
                                          <div className="space-y-2 rounded-lg border p-4">
                                            {selectedOrder.items.map((item, idx) => (
                                              <div key={idx} className="flex items-center justify-between">
                                                <div>
                                                  <span className="font-medium">{item.name}</span>
                                                  <span className="ml-2 text-sm text-muted-foreground">
                                                    x{item.quantity}
                                                  </span>
                                                </div>
                                                <span className="font-medium">
                                                  €{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                              </div>
                                            ))}
                                            <div className="mt-4 flex items-center justify-between border-t pt-4">
                                              <span className="font-semibold">Total</span>
                                              <span className="text-lg font-bold">
                                                €{selectedOrder.total.toFixed(2)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Status Update */}
                                        <div>
                                          <h3 className="mb-3 font-semibold">Mettre à jour le statut</h3>
                                          <div className="flex gap-2">
                                            {selectedOrder.status === "received" && (
                                              <Button
                                                onClick={() => handleUpdateStatus(selectedOrder.id, "preparing")}
                                                className="flex-1"
                                              >
                                                Commencer la préparation
                                              </Button>
                                            )}
                                            {selectedOrder.status === "preparing" && (
                                              <Button
                                                onClick={() => handleUpdateStatus(selectedOrder.id, "ready")}
                                                className="flex-1"
                                              >
                                                Marquer comme prêt
                                              </Button>
                                            )}
                                            {selectedOrder.status === "ready" && (
                                              <Button
                                                onClick={() => handleUpdateStatus(selectedOrder.id, "collected")}
                                                className="flex-1"
                                              >
                                                Marquer comme récupéré
                                              </Button>
                                            )}
                                            {!["collected", "cancelled"].includes(selectedOrder.status) && (
                                              <Button
                                                variant="destructive"
                                                onClick={() => handleUpdateStatus(selectedOrder.id, "cancelled")}
                                              >
                                                Annuler
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handlePrintOrder(order)}>
                                  <Printer className="mr-2 h-4 w-4" />
                                  Imprimer le bon
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownloadOrder(order)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Télécharger
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleNotifyCustomer(order)}>
                                  <Send className="mr-2 h-4 w-4" />
                                  Notifier le client
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {order.status === "received" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "preparing")}>
                                    <Package className="mr-2 h-4 w-4" />
                                    Commencer la préparation
                                  </DropdownMenuItem>
                                )}
                                {order.status === "preparing" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "ready")}>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Marquer comme prêt
                                  </DropdownMenuItem>
                                )}
                                {order.status === "ready" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "collected")}>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Marquer comme récupéré
                                  </DropdownMenuItem>
                                )}
                                {!["collected", "cancelled"].includes(order.status) && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => handleUpdateStatus(order.id, "cancelled")}
                                      className="text-destructive"
                                    >
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Annuler la commande
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {sortedOrders.length > 0 && (
                <div className="flex items-center justify-between border-t p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Afficher</Label>
                      <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                        <SelectTrigger className="h-8 w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Affichage de {startIndex + 1} à {Math.min(endIndex, sortedOrders.length)} sur{" "}
                      {sortedOrders.length} commande(s)
                    </p>
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

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber
                        if (totalPages <= 5) {
                          pageNumber = i + 1
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i
                        } else {
                          pageNumber = currentPage - 2 + i
                        }

                        return (
                          <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="sm"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        )
                      })}
                    </div>

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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
