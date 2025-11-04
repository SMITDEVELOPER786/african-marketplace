"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CreditCard,
  Download,
  Search,
  Calendar,
  TrendingUp,
  Users,
  Euro,
  FileText,
  Eye,
  Plus,
  CheckCircle,
  DollarSign,
  MoreVertical,
  Pause,
  Play,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Shield,
  Lock,
  Receipt,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

type SubscriptionStatus = "active" | "expired" | "cancelled" | "pending"
type SubscriptionPlan = "basic" | "premium" | "enterprise"

interface Subscription {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  plan: SubscriptionPlan
  amount: number
  startDate: string
  endDate: string
  status: SubscriptionStatus
  autoRenew: boolean
  paymentMethod: string
}

const mockSubscriptions: Subscription[] = [
  {
    id: "SUB-001",
    customerId: "CUST-123",
    customerName: "Marie Dubois",
    customerEmail: "marie.dubois@email.com",
    plan: "premium",
    amount: 29.99,
    startDate: "2025-01-01",
    endDate: "2025-02-01",
    status: "active",
    autoRenew: true,
    paymentMethod: "Carte bancaire",
  },
  {
    id: "SUB-002",
    customerId: "CUST-124",
    customerName: "Jean Martin",
    customerEmail: "jean.martin@email.com",
    plan: "basic",
    amount: 9.99,
    startDate: "2024-12-15",
    endDate: "2025-01-15",
    status: "active",
    autoRenew: true,
    paymentMethod: "PayPal",
  },
  {
    id: "SUB-003",
    customerId: "CUST-125",
    customerName: "Sophie Laurent",
    customerEmail: "sophie.laurent@email.com",
    plan: "enterprise",
    amount: 99.99,
    startDate: "2024-11-01",
    endDate: "2024-12-01",
    status: "expired",
    autoRenew: false,
    paymentMethod: "Virement bancaire",
  },
  {
    id: "SUB-004",
    customerId: "CUST-126",
    customerName: "Pierre Durand",
    customerEmail: "pierre.durand@email.com",
    plan: "premium",
    amount: 29.99,
    startDate: "2025-01-10",
    endDate: "2025-02-10",
    status: "active",
    autoRenew: true,
    paymentMethod: "Carte bancaire",
  },
  {
    id: "SUB-005",
    customerId: "CUST-127",
    customerName: "Claire Petit",
    customerEmail: "claire.petit@email.com",
    plan: "basic",
    amount: 9.99,
    startDate: "2024-12-20",
    endDate: "2025-01-20",
    status: "cancelled",
    autoRenew: false,
    paymentMethod: "Carte bancaire",
  },
]

const planLabels: Record<SubscriptionPlan, string> = {
  basic: "Basic",
  premium: "Premium",
  enterprise: "Enterprise",
}

const statusLabels: Record<SubscriptionStatus, string> = {
  active: "Actif",
  expired: "Expiré",
  cancelled: "Annulé",
  pending: "En attente",
}

const statusColors: Record<SubscriptionStatus, string> = {
  active: "bg-green-500/10 text-green-700 hover:bg-green-500/20",
  expired: "bg-gray-500/10 text-gray-700 hover:bg-gray-500/20",
  cancelled: "bg-red-500/10 text-red-700 hover:bg-red-500/20",
  pending: "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20",
}

const subscriptionPlans = [
  {
    id: "free",
    name: "Gratuit",
    price: 0,
    period: "mois",
    trial: 30,
    features: ["5 annonces maximum", "3 photos par annonce", "Support par email", "Statistiques de base"],
    popular: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: 29,
    period: "mois",
    features: ["20 annonces", "10 photos par annonce", "Support prioritaire", "Statistiques avancées", "Badge vérifié"],
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: 59,
    period: "mois",
    features: [
      "50 annonces",
      "20 photos par annonce",
      "Support 24/7",
      "Statistiques complètes",
      "Badge vérifié",
      "Mise en avant",
      "Réservation en ligne",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 99,
    period: "mois",
    features: [
      "Annonces illimitées",
      "Photos illimitées",
      "Support VIP 24/7",
      "Statistiques complètes",
      "Badge vérifié VIP",
      "Mise en avant prioritaire",
      "Réservation en ligne",
      "API access",
      "Formation personnalisée",
    ],
    popular: false,
  },
]

export default function SubscriptionsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [planFilter, setPlanFilter] = useState<string>("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [showPlansModal, setShowPlansModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [actionDialog, setActionDialog] = useState<{
    open: boolean
    type: "suspend" | "reactivate" | "cancel" | null
    subscription: Subscription | null
  }>({
    open: false,
    type: null,
    subscription: null,
  })

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned
    return formatted
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4)
    }
    return cleaned
  }

  const handleSubscribe = (plan: any) => {
    setSelectedPlan(plan)
    setShowPlansModal(false)
    setShowPaymentModal(true)
  }

  const validateCardDetails = (): string | null => {
    // Validation numéro de carte
    const cardNumber = cardDetails.number.replace(/\s/g, "")
    if (!/^\d{13,19}$/.test(cardNumber)) {
      return "Numéro de carte invalide (13-19 chiffres requis)"
    }

    // Validation nom
    if (cardDetails.name.length < 3) {
      return "Nom sur la carte invalide"
    }

    // Validation date d'expiration
    const [month, year] = cardDetails.expiry.split("/")
    if (!month || !year || Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
      return "Date d'expiration invalide"
    }
    const expiry = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
    if (expiry < new Date()) {
      return "Carte expirée"
    }

    // Validation CVV
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      return "CVV invalide (3-4 chiffres requis)"
    }

    return null
  }

  const handlePayment = () => {
    if (paymentMethod === "card") {
      // Validation des champs
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez remplir tous les champs de la carte bancaire.",
          variant: "destructive",
        })
        return
      }

      const validationError = validateCardDetails()
      if (validationError) {
        toast({
          title: "Validation échouée",
          description: validationError,
          variant: "destructive",
        })
        return
      }
    }

    // Dans une vraie application, utiliser Stripe Elements ou PayPal SDK
    console.warn("[SÉCURITÉ] Les données de carte ne doivent JAMAIS être envoyées au serveur")
    console.warn("[SÉCURITÉ] Utiliser Stripe.js ou un service de paiement sécurisé")

    if (paymentMethod === "paypal") {
      window.open("https://www.paypal.com/checkoutnow", "_blank")
    }

    toast({
      title: "Abonnement activé",
      description: `Votre abonnement ${selectedPlan.name} a été activé avec succès.`,
    })

    setShowPaymentModal(false)
    setSelectedPlan(null)
    setCardDetails({ number: "", name: "", expiry: "", cvv: "" })
  }

  const handleDownloadInvoice = (subscription: Subscription) => {
    // Créer le contenu HTML de la facture
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Facture ${subscription.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; margin-bottom: 40px; }
          .company { font-size: 24px; font-weight: bold; color: #e85d04; }
          .invoice-title { font-size: 32px; margin: 20px 0; }
          .info-section { margin: 30px 0; }
          .info-label { font-weight: bold; color: #666; }
          .table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          .table th { background-color: #f8f9fa; font-weight: bold; }
          .total { text-align: right; font-size: 24px; font-weight: bold; margin-top: 20px; }
          .footer { margin-top: 60px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company">AfroMarket</div>
          <div class="invoice-title">FACTURE</div>
          <div>N° ${subscription.id}</div>
        </div>
        
        <div class="info-section">
          <div><span class="info-label">Date d'émission:</span> ${new Date().toLocaleDateString("fr-FR")}</div>
          <div><span class="info-label">Date de début:</span> ${new Date(subscription.startDate).toLocaleDateString("fr-FR")}</div>
          <div><span class="info-label">Date de fin:</span> ${new Date(subscription.endDate).toLocaleDateString("fr-FR")}</div>
        </div>
        
        <div class="info-section">
          <div style="font-weight: bold; margin-bottom: 10px;">Facturé à:</div>
          <div>${subscription.customerName}</div>
          <div>${subscription.customerEmail}</div>
          <div>ID Client: ${subscription.customerId}</div>
        </div>
        
        <table class="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Période</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Abonnement ${planLabels[subscription.plan]}</td>
              <td>${new Date(subscription.startDate).toLocaleDateString("fr-FR")} - ${new Date(subscription.endDate).toLocaleDateString("fr-FR")}</td>
              <td>€${subscription.amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="total">
          Total: €${subscription.amount.toFixed(2)}
        </div>
        
        <div class="footer">
          <p>Merci pour votre confiance !</p>
          <p>AfroMarket - Marketplace Africaine</p>
          <p>Cette facture a été générée électroniquement et est valable sans signature.</p>
        </div>
      </body>
      </html>
    `

    // Créer un blob et télécharger
    const blob = new Blob([invoiceHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `facture-${subscription.id}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Facture téléchargée",
      description: `La facture pour ${subscription.customerName} a été téléchargée avec succès.`,
    })
  }

  const handleDownloadReceipt = (subscription: Subscription) => {
    // Créer le contenu HTML du reçu
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reçu ${subscription.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e85d04; padding-bottom: 20px; }
          .company { font-size: 28px; font-weight: bold; color: #e85d04; }
          .receipt-title { font-size: 24px; margin: 15px 0; color: #333; }
          .receipt-number { color: #666; font-size: 14px; }
          .section { margin: 25px 0; padding: 15px; background-color: #f8f9fa; border-radius: 8px; }
          .label { font-weight: bold; color: #555; display: inline-block; width: 150px; }
          .value { color: #333; }
          .amount-box { background-color: #e85d04; color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0; }
          .amount-label { font-size: 14px; opacity: 0.9; }
          .amount-value { font-size: 36px; font-weight: bold; margin-top: 10px; }
          .status { display: inline-block; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; }
          .status-paid { background-color: #d4edda; color: #155724; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
          .checkmark { color: #28a745; font-size: 48px; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company">AfroMarket</div>
          <div class="receipt-title">REÇU DE PAIEMENT</div>
          <div class="receipt-number">Reçu N° ${subscription.id}</div>
        </div>
        
        <div class="checkmark">✓</div>
        <div style="text-align: center; color: #28a745; font-weight: bold; margin-bottom: 30px;">
          PAIEMENT REÇU
        </div>
        
        <div class="section">
          <div><span class="label">Date de paiement:</span> <span class="value">${new Date().toLocaleDateString("fr-FR")}</span></div>
          <div><span class="label">Méthode:</span> <span class="value">${subscription.paymentMethod}</span></div>
          <div><span class="label">Statut:</span> <span class="status status-paid">PAYÉ</span></div>
        </div>
        
        <div class="section">
          <div style="font-weight: bold; margin-bottom: 10px; color: #333;">Informations client</div>
          <div><span class="label">Nom:</span> <span class="value">${subscription.customerName}</span></div>
          <div><span class="label">Email:</span> <span class="value">${subscription.customerEmail}</span></div>
          <div><span class="label">ID Client:</span> <span class="value">${subscription.customerId}</span></div>
        </div>
        
        <div class="section">
          <div style="font-weight: bold; margin-bottom: 10px; color: #333;">Détails de l'abonnement</div>
          <div><span class="label">Plan:</span> <span class="value">${planLabels[subscription.plan]}</span></div>
          <div><span class="label">Période:</span> <span class="value">${new Date(subscription.startDate).toLocaleDateString("fr-FR")} - ${new Date(subscription.endDate).toLocaleDateString("fr-FR")}</span></div>
          <div><span class="label">Auto-renouvellement:</span> <span class="value">${subscription.autoRenew ? "Activé" : "Désactivé"}</span></div>
        </div>
        
        <div class="amount-box">
          <div class="amount-label">MONTANT PAYÉ</div>
          <div class="amount-value">€${subscription.amount.toFixed(2)}</div>
        </div>
        
        <div class="footer">
          <p><strong>Merci pour votre paiement !</strong></p>
          <p>Ce reçu confirme que nous avons bien reçu votre paiement.</p>
          <p>AfroMarket - Marketplace Africaine</p>
          <p>Pour toute question, contactez-nous à support@afromarket.com</p>
          <p style="margin-top: 20px; font-size: 10px;">Document généré le ${new Date().toLocaleString("fr-FR")}</p>
        </div>
      </body>
      </html>
    `

    // Créer un blob et télécharger
    const blob = new Blob([receiptHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `recu-${subscription.id}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Reçu téléchargé",
      description: `Le reçu pour ${subscription.customerName} a été téléchargé avec succès.`,
    })
  }

  const handleExportPDF = () => {
    const exportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Liste des Abonnements</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; margin-bottom: 40px; }
          .company { font-size: 28px; font-weight: bold; color: #e85d04; }
          .title { font-size: 24px; margin: 20px 0; }
          .date { color: #666; margin-bottom: 30px; }
          .stats { display: flex; justify-content: space-around; margin: 30px 0; }
          .stat-box { text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px; }
          .stat-value { font-size: 32px; font-weight: bold; color: #e85d04; }
          .stat-label { color: #666; font-size: 14px; margin-top: 5px; }
          .table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; font-size: 12px; }
          .table th { background-color: #f8f9fa; font-weight: bold; }
          .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
          .badge-active { background-color: #d4edda; color: #155724; }
          .badge-expired { background-color: #f8d7da; color: #721c24; }
          .badge-cancelled { background-color: #f8d7da; color: #721c24; }
          .footer { margin-top: 60px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company">AfroMarket</div>
          <div class="title">Liste des Abonnements</div>
          <div class="date">Généré le ${new Date().toLocaleString("fr-FR")}</div>
        </div>
        
        <div class="stats">
          <div class="stat-box">
            <div class="stat-value">${stats.activeSubscriptions}</div>
            <div class="stat-label">Actifs</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">€${stats.monthlyRevenue.toFixed(2)}</div>
            <div class="stat-label">Revenus Mensuels</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${stats.totalCustomers}</div>
            <div class="stat-label">Total Clients</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${stats.renewalRate}%</div>
            <div class="stat-label">Taux Renouvellement</div>
          </div>
        </div>
        
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Plan</th>
              <th>Montant</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Statut</th>
              <th>Auto-renouvellement</th>
            </tr>
          </thead>
          <tbody>
            ${filteredSubscriptions
              .map(
                (sub) => `
              <tr>
                <td>${sub.id}</td>
                <td>${sub.customerName}</td>
                <td>${planLabels[sub.plan]}</td>
                <td>€${sub.amount.toFixed(2)}</td>
                <td>${new Date(sub.startDate).toLocaleDateString("fr-FR")}</td>
                <td>${new Date(sub.endDate).toLocaleDateString("fr-FR")}</td>
                <td><span class="badge badge-${sub.status}">${statusLabels[sub.status]}</span></td>
                <td>${sub.autoRenew ? "Oui" : "Non"}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="footer">
          <p>AfroMarket - Marketplace Africaine</p>
          <p>Total: ${filteredSubscriptions.length} abonnement(s)</p>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([exportHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `abonnements-${new Date().toISOString().split("T")[0]}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Export PDF généré",
      description: `${filteredSubscriptions.length} abonnement(s) exporté(s) avec succès.`,
    })
  }

  const handleExportExcel = () => {
    // Créer le contenu CSV (compatible Excel)
    const headers = [
      "ID",
      "Client",
      "Email",
      "Plan",
      "Montant",
      "Date début",
      "Date fin",
      "Statut",
      "Auto-renouvellement",
      "Méthode de paiement",
    ]
    const rows = filteredSubscriptions.map((sub) => [
      sub.id,
      sub.customerName,
      sub.customerEmail,
      planLabels[sub.plan],
      `€${sub.amount.toFixed(2)}`,
      new Date(sub.startDate).toLocaleDateString("fr-FR"),
      new Date(sub.endDate).toLocaleDateString("fr-FR"),
      statusLabels[sub.status],
      sub.autoRenew ? "Oui" : "Non",
      sub.paymentMethod,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    // Ajouter le BOM UTF-8 pour Excel
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `abonnements-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Export Excel généré",
      description: `${filteredSubscriptions.length} abonnement(s) exporté(s) au format CSV.`,
    })
  }

  const handleViewDetails = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setIsDetailsOpen(true)
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const active = mockSubscriptions.filter((s) => s.status === "active")
    const monthlyRevenue = active.reduce((sum, s) => sum + s.amount, 0)
    const renewalRate = (active.filter((s) => s.autoRenew).length / active.length) * 100 || 0

    return {
      activeSubscriptions: active.length,
      monthlyRevenue,
      totalCustomers: mockSubscriptions.length,
      renewalRate: renewalRate.toFixed(1),
    }
  }, [])

  // Filter subscriptions
  const filteredSubscriptions = useMemo(() => {
    return mockSubscriptions.filter((subscription) => {
      const matchesSearch =
        subscription.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || subscription.status === statusFilter
      const matchesPlan = planFilter === "all" || subscription.plan === planFilter

      let matchesDateRange = true
      if (startDate && endDate) {
        const subStart = new Date(subscription.startDate)
        const filterStart = new Date(startDate)
        const filterEnd = new Date(endDate)
        matchesDateRange = subStart >= filterStart && subStart <= filterEnd
      }

      return matchesSearch && matchesStatus && matchesPlan && matchesDateRange
    })
  }, [searchQuery, statusFilter, planFilter, startDate, endDate])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedSubscriptions.map((s) => s.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    }
  }

  const handleSuspendSubscription = (subscription: Subscription) => {
    setActionDialog({ open: true, type: "suspend", subscription })
  }

  const handleReactivateSubscription = (subscription: Subscription) => {
    setActionDialog({ open: true, type: "reactivate", subscription })
  }

  const handleCancelSubscription = (subscription: Subscription) => {
    setActionDialog({ open: true, type: "cancel", subscription })
  }

  const confirmAction = () => {
    const { type, subscription } = actionDialog
    if (!subscription) return

    let message = ""
    switch (type) {
      case "suspend":
        message = `L'abonnement de ${subscription.customerName} a été suspendu.`
        break
      case "reactivate":
        message = `L'abonnement de ${subscription.customerName} a été réactivé.`
        break
      case "cancel":
        message = `L'abonnement de ${subscription.customerName} a été annulé.`
        break
    }

    toast({
      title: "Action effectuée",
      description: message,
    })

    setActionDialog({ open: false, type: null, subscription: null })
  }

  const handleBulkSuspend = () => {
    toast({
      title: "Abonnements suspendus",
      description: `${selectedIds.length} abonnement(s) ont été suspendus.`,
    })
    setSelectedIds([])
  }

  const handleBulkCancel = () => {
    toast({
      title: "Abonnements annulés",
      description: `${selectedIds.length} abonnement(s) ont été annulés.`,
    })
    setSelectedIds([])
  }

  const handleBulkExport = () => {
    toast({
      title: "Export en cours",
      description: `Export de ${selectedIds.length} abonnement(s)...`,
    })
  }

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedSubscriptions = filteredSubscriptions.slice(startIndex, endIndex)

  const goToFirstPage = () => setCurrentPage(1)
  const goToLastPage = () => setCurrentPage(totalPages)
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(1, prev - 1))
  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1))

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, planFilter, startDate, endDate])

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Abonnements</h1>
          <p className="text-muted-foreground text-balance">Gérez et suivez tous vos abonnements clients</p>
        </div>
        <Button onClick={() => setShowPlansModal(true)} size="lg" className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Souscrire à un abonnement
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Abonnements Actifs</CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.activeSubscriptions}</div>
            <p className="text-muted-foreground text-xs mt-1">Clients abonnés</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Revenus Mensuels</CardTitle>
            <div className="rounded-full bg-green-500/10 p-2">
              <Euro className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">€{stats.monthlyRevenue.toFixed(2)}</div>
            <p className="text-muted-foreground text-xs mt-1">Revenus récurrents</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Clients</CardTitle>
            <div className="rounded-full bg-blue-500/10 p-2">
              <CreditCard className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalCustomers}</div>
            <p className="text-muted-foreground text-xs mt-1">Tous statuts confondus</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Taux de Renouvellement</CardTitle>
            <div className="rounded-full bg-orange-500/10 p-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.renewalRate}%</div>
            <p className="text-muted-foreground text-xs mt-1">Auto-renouvellement</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle>Rechercher et Filtrer</CardTitle>
          <CardDescription>Trouvez rapidement les abonnements que vous recherchez</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email ou ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="expired">Expiré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
              </SelectContent>
            </Select>

            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les plans</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 lg:col-span-5">
              <div className="flex-1">
                <label className="mb-1 block font-medium text-sm">Date de début</label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="mb-1 block font-medium text-sm">Date de fin</label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleExportPDF} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exporter PDF
            </Button>
            <Button onClick={handleExportExcel} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exporter Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des Abonnements</CardTitle>
              <CardDescription>{filteredSubscriptions.length} abonnement(s) trouvé(s)</CardDescription>
            </div>
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedIds.length} sélectionné(s)</Badge>
                <Button variant="outline" size="sm" onClick={handleBulkSuspend}>
                  <Pause className="mr-2 h-4 w-4" />
                  Suspendre
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkCancel}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        paginatedSubscriptions.length > 0 &&
                        paginatedSubscriptions.every((s) => selectedIds.includes(s.id))
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date début</TableHead>
                  <TableHead>Date fin</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Auto-renouvellement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      Aucun abonnement trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(subscription.id)}
                          onCheckedChange={(checked) => handleSelectOne(subscription.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{subscription.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subscription.customerName}</div>
                          <div className="text-muted-foreground text-sm">{subscription.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{planLabels[subscription.plan]}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">€{subscription.amount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(subscription.startDate).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>{new Date(subscription.endDate).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[subscription.status]}>{statusLabels[subscription.status]}</Badge>
                      </TableCell>
                      <TableCell>
                        {subscription.autoRenew ? (
                          <Badge className="bg-blue-500/10 text-blue-700">Oui</Badge>
                        ) : (
                          <Badge variant="outline">Non</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => handleViewDetails(subscription)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadInvoice(subscription)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Télécharger la facture
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadReceipt(subscription)}>
                              <Receipt className="mr-2 h-4 w-4" />
                              Télécharger le reçu
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {subscription.status === "active" && (
                              <DropdownMenuItem onClick={() => handleSuspendSubscription(subscription)}>
                                <Pause className="mr-2 h-4 w-4" />
                                Suspendre
                              </DropdownMenuItem>
                            )}
                            {(subscription.status === "expired" || subscription.status === "cancelled") && (
                              <DropdownMenuItem onClick={() => handleReactivateSubscription(subscription)}>
                                <Play className="mr-2 h-4 w-4" />
                                Réactiver
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleCancelSubscription(subscription)}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Annuler l'abonnement
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredSubscriptions.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Afficher</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-20">
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
                <span className="text-muted-foreground text-sm">
                  Affichage de {startIndex + 1} à {Math.min(endIndex, filteredSubscriptions.length)} sur{" "}
                  {filteredSubscriptions.length} abonnement(s)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={goToFirstPage} disabled={currentPage === 1}>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} sur {totalPages}
                </span>
                <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToLastPage} disabled={currentPage === totalPages}>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'abonnement</DialogTitle>
            <DialogDescription>Informations complètes sur l'abonnement {selectedSubscription?.id}</DialogDescription>
          </DialogHeader>

          {selectedSubscription && (
            <div className="space-y-6">
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informations</TabsTrigger>
                  <TabsTrigger value="history">Historique</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="font-medium text-sm">Client</label>
                      <p className="text-muted-foreground">{selectedSubscription.customerName}</p>
                    </div>
                    <div>
                      <label className="font-medium text-sm">Email</label>
                      <p className="text-muted-foreground">{selectedSubscription.customerEmail}</p>
                    </div>
                    <div>
                      <label className="font-medium text-sm">Plan</label>
                      <p className="text-muted-foreground">{planLabels[selectedSubscription.plan]}</p>
                    </div>
                    <div>
                      <label className="font-medium text-sm">Montant</label>
                      <p className="text-muted-foreground">€{selectedSubscription.amount.toFixed(2)}/mois</p>
                    </div>
                    <div>
                      <label className="font-medium text-sm">Date de début</label>
                      <p className="text-muted-foreground">
                        {new Date(selectedSubscription.startDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div>
                      <label className="font-medium text-sm">Date de fin</label>
                      <p className="text-muted-foreground">
                        {new Date(selectedSubscription.endDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div>
                      <label className="font-medium text-sm">Statut</label>
                      <Badge className={statusColors[selectedSubscription.status]}>
                        {statusLabels[selectedSubscription.status]}
                      </Badge>
                    </div>
                    <div>
                      <label className="font-medium text-sm">Auto-renouvellement</label>
                      <p className="text-muted-foreground">{selectedSubscription.autoRenew ? "Activé" : "Désactivé"}</p>
                    </div>
                    <div>
                      <label className="font-medium text-sm">Méthode de paiement</label>
                      <p className="text-muted-foreground">{selectedSubscription.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleDownloadReceipt(selectedSubscription)}>
                      <FileText className="mr-2 h-4 w-4" />
                      Télécharger le reçu
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Abonnement créé</p>
                        <p className="text-muted-foreground text-sm">
                          {new Date(selectedSubscription.startDate).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <CreditCard className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Paiement effectué</p>
                        <p className="text-muted-foreground text-sm">
                          €{selectedSubscription.amount.toFixed(2)} - {selectedSubscription.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPlansModal} onOpenChange={setShowPlansModal}>
        <DialogContent className="max-w-[98vw] w-full max-h-[98vh] p-0 overflow-hidden">
          <div className="flex flex-col h-full max-h-[98vh]">
            <div className="flex-shrink-0 px-10 py-8 border-b bg-gradient-to-r from-orange-50 to-white">
              <DialogTitle className="text-4xl font-bold text-gray-900 mb-3">Choisissez votre abonnement</DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                Comparez nos plans et sélectionnez celui qui correspond le mieux à vos besoins
              </DialogDescription>
            </div>

            <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-white p-10">
              <div className="max-w-[1800px] mx-auto">
                {/* Plans Header */}
                <div className="grid grid-cols-5 gap-6 mb-8">
                  <div className="col-span-1">
                    <div className="h-full flex items-end pb-4">
                      <h3 className="text-xl font-bold text-gray-900">Fonctionnalités</h3>
                    </div>
                  </div>
                  {subscriptionPlans.map((plan) => (
                    <div key={plan.id} className="col-span-1">
                      <Card
                        className={`relative h-full transition-all hover:shadow-xl ${
                          plan.popular
                            ? "border-orange-500 border-2 shadow-lg ring-2 ring-orange-200 bg-gradient-to-br from-orange-50 to-white"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                            <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 text-sm font-semibold shadow-md">
                              ⭐ Populaire
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="text-center pb-6 pt-8">
                          <CardTitle className="text-3xl font-bold text-gray-900 mb-4">{plan.name}</CardTitle>
                          <div className="flex items-baseline justify-center gap-2 mb-4">
                            <span className="font-bold text-6xl text-gray-900">€{plan.price}</span>
                            <span className="text-gray-500 text-2xl font-medium">/{plan.period}</span>
                          </div>
                          {plan.trial && (
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-700 bg-green-50 text-sm py-1"
                            >
                              {plan.trial} jours d'essai gratuit
                            </Badge>
                          )}
                          <Button
                            className="w-full mt-6 h-12 text-base font-semibold"
                            size="lg"
                            variant={plan.popular ? "default" : "outline"}
                            onClick={() => handleSubscribe(plan)}
                          >
                            {plan.price === 0 ? "Commencer gratuitement" : "S'abonner maintenant"}
                          </Button>
                        </CardHeader>
                      </Card>
                    </div>
                  ))}
                </div>

                <Card className="shadow-lg border-2">
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {/* Get all unique features */}
                      {Array.from(new Set(subscriptionPlans.flatMap((plan) => plan.features))).map((feature, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-6 p-6 transition-colors hover:bg-gray-50 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <div className="col-span-1 flex items-center">
                            <span className="text-base font-medium text-gray-700 leading-relaxed">{feature}</span>
                          </div>
                          {subscriptionPlans.map((plan) => (
                            <div key={plan.id} className="col-span-1 flex items-center justify-center">
                              {plan.features.includes(feature) ? (
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                                  <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                              ) : (
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                                  <XCircle className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-5 gap-6 mt-8">
                  <div className="col-span-1" />
                  {subscriptionPlans.map((plan) => (
                    <div key={plan.id} className="col-span-1">
                      <Button
                        className="w-full h-14 text-lg font-semibold shadow-md"
                        size="lg"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleSubscribe(plan)}
                      >
                        {plan.price === 0 ? "Commencer" : "Choisir " + plan.name}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Garantie satisfait ou remboursé</h4>
                      <p className="text-gray-700 text-base leading-relaxed">
                        Tous nos abonnements incluent une période d'essai gratuite. Vous pouvez annuler à tout moment
                        sans frais. Paiement sécurisé SSL et protection 3D Secure. Support client disponible 24/7 pour
                        vous accompagner.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Finaliser votre abonnement</DialogTitle>
            <DialogDescription>
              Choisissez votre mode de paiement pour activer votre abonnement {selectedPlan?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-6 py-4">
              {/* Order Summary */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Récapitulatif de l'abonnement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan sélectionné:</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Période:</span>
                    <span className="font-medium">Mensuel</span>
                  </div>
                  {selectedPlan.trial && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Essai gratuit:</span>
                      <span className="font-medium text-green-600">{selectedPlan.trial} jours</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total à payer:</span>
                    <span className="font-bold text-2xl">€{selectedPlan.price}/mois</span>
                  </div>
                  {selectedPlan.trial && (
                    <p className="text-muted-foreground text-xs">Vous ne serez pas débité pendant la période d'essai</p>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label className="text-base">Mode de paiement</Label>
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors ${
                      paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Carte bancaire</span>
                      </div>
                      <div className="flex gap-2">
                        <img src="/visa-application-process.png" alt="Visa" className="h-6" />
                        <img src="/mastercard-logo-abstract.png" alt="Mastercard" className="h-6" />
                        <img src="/abstract-credit-card-design.png" alt="Amex" className="h-6" />
                      </div>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors ${
                      paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex flex-1 cursor-pointer items-center justify-between">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-medium">PayPal</span>
                      </div>
                      <img src="/paypal-digital-payment.png" alt="PayPal" className="h-6" />
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Numéro de carte</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                        maxLength={19}
                      />
                      <CreditCard className="-translate-y-1/2 absolute top-1/2 right-3 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nom sur la carte</Label>
                    <Input
                      id="cardName"
                      placeholder="JEAN DUPONT"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Date d'expiration</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">
                      Paiement sécurisé SSL • Protection 3D Secure • Données cryptées
                    </span>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="flex items-center gap-4 pt-6">
                    <img src="/paypal-digital-payment.png" alt="PayPal" className="h-12" />
                    <div className="flex-1">
                      <p className="font-medium">Paiement sécurisé avec PayPal</p>
                      <p className="text-muted-foreground text-sm">
                        Vous serez redirigé vers PayPal pour finaliser votre paiement de manière sécurisée.
                      </p>
                    </div>
                    <Lock className="h-8 w-8 text-blue-600" />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Annuler
            </Button>
            <Button onClick={handlePayment} size="lg" className="min-w-[200px]">
              {paymentMethod === "card" && `Payer €${selectedPlan?.price}`}
              {paymentMethod === "paypal" && "Continuer avec PayPal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionDialog.type === "suspend" && "Suspendre l'abonnement"}
              {actionDialog.type === "reactivate" && "Réactiver l'abonnement"}
              {actionDialog.type === "cancel" && "Annuler l'abonnement"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionDialog.type === "suspend" &&
                `Êtes-vous sûr de vouloir suspendre l'abonnement de ${actionDialog.subscription?.customerName} ? Le client ne pourra plus accéder aux services jusqu'à la réactivation.`}
              {actionDialog.type === "reactivate" &&
                `Êtes-vous sûr de vouloir réactiver l'abonnement de ${actionDialog.subscription?.customerName} ? Le client retrouvera l'accès à tous les services.`}
              {actionDialog.type === "cancel" &&
                `Êtes-vous sûr de vouloir annuler définitivement l'abonnement de ${actionDialog.subscription?.customerName} ? Cette action est irréversible.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
