"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  MoreVertical,
  RefreshCw,
  Eye,
  Ban,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Mail,
  MessageCircle,
  Send,
  X,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const subscriptions = [
  {
    id: "1",
    business: "Afro Delights Market",
    businessType: "commerce",
    owner: "John Doe",
    email: "john@afrodelights.com",
    phone: "+33612345678",
    plan: "Premium",
    price: 49.99,
    status: "active" as const,
    startDate: "2024-12-01",
    endDate: "2025-12-01",
    autoRenew: true,
  },
  {
    id: "2",
    business: "Mama Africa Restaurant",
    businessType: "restaurant",
    owner: "Jane Smith",
    email: "jane@mamaafrica.com",
    phone: "+33623456789",
    plan: "Premium",
    price: 49.99,
    status: "active" as const,
    startDate: "2024-11-15",
    endDate: "2025-11-15",
    autoRenew: true,
  },
  {
    id: "3",
    business: "Jollof Palace",
    businessType: "restaurant",
    owner: "Sarah Williams",
    email: "sarah@jollofpalace.com",
    phone: "+33634567890",
    plan: "Basic",
    price: 19.99,
    status: "expired" as const,
    startDate: "2024-06-20",
    endDate: "2025-01-20",
    autoRenew: false,
  },
  {
    id: "4",
    business: "Sahel Spice Market",
    businessType: "commerce",
    owner: "Mike Johnson",
    email: "mike@sahelspice.com",
    phone: "+33645678901",
    plan: "Standard",
    price: 29.99,
    status: "cancelled" as const,
    startDate: "2024-08-10",
    endDate: "2025-01-10",
    autoRenew: false,
  },
  {
    id: "5",
    business: "Afro Cuisine Express",
    businessType: "restaurant",
    owner: "David Brown",
    email: "david@afrocuisine.com",
    phone: "+33656789012",
    plan: "Premium",
    price: 49.99,
    status: "active" as const,
    startDate: "2024-09-01",
    endDate: "2025-09-01",
    autoRenew: true,
  },
]

export default function SubscriptionsManagementPage() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [emailTemplate, setEmailTemplate] = useState("")

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (activeTab === "active" && sub.status !== "active") return false
    if (activeTab === "expired" && sub.status !== "expired") return false
    if (activeTab === "cancelled" && sub.status !== "cancelled") return false

    if (
      searchQuery &&
      !sub.business.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sub.owner.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (typeFilter !== "all" && sub.businessType !== typeFilter) return false
    if (planFilter !== "all" && sub.plan.toLowerCase() !== planFilter) return false

    return true
  })

  const totalRevenue = subscriptions.filter((s) => s.status === "active").reduce((sum, s) => sum + s.price, 0)
  const activeCount = subscriptions.filter((s) => s.status === "active").length
  const expiredCount = subscriptions.filter((s) => s.status === "expired").length
  const renewalRate = ((activeCount / subscriptions.length) * 100).toFixed(1)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredSubscriptions.map((sub) => sub.id))
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

  const isAllSelected = filteredSubscriptions.length > 0 && selectedIds.length === filteredSubscriptions.length
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < filteredSubscriptions.length

  const handleTemplateChange = (template: string) => {
    setEmailTemplate(template)
    switch (template) {
      case "renewal":
        setEmailSubject("Renouvellement de votre abonnement AfroMarket")
        setEmailMessage(
          "Bonjour,\n\nNous vous informons que votre abonnement arrive à échéance prochainement. Pour continuer à profiter de nos services, veuillez renouveler votre abonnement.\n\nCordialement,\nL'équipe AfroMarket",
        )
        break
      case "expired":
        setEmailSubject("Votre abonnement AfroMarket a expiré")
        setEmailMessage(
          "Bonjour,\n\nVotre abonnement AfroMarket a expiré. Pour continuer à bénéficier de nos services, veuillez renouveler votre abonnement dès maintenant.\n\nCordialement,\nL'équipe AfroMarket",
        )
        break
      case "welcome":
        setEmailSubject("Bienvenue sur AfroMarket !")
        setEmailMessage(
          "Bonjour,\n\nNous sommes ravis de vous accueillir sur AfroMarket ! Votre abonnement est maintenant actif. N'hésitez pas à nous contacter si vous avez des questions.\n\nCordialement,\nL'équipe AfroMarket",
        )
        break
      default:
        setEmailSubject("")
        setEmailMessage("")
    }
  }

  const handleWhatsApp = (phone: string, business: string) => {
    const message = encodeURIComponent(
      `Bonjour ${business}, nous vous contactons concernant votre abonnement AfroMarket.`,
    )
    const whatsappUrl = `https://wa.me/${phone.replace(/\+/g, "")}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleBulkEmail = () => {
    setEmailModalOpen(true)
  }

  const handleSendEmail = () => {
    console.log("[v0] Sending email to:", selectedIds)
    console.log("[v0] Subject:", emailSubject)
    console.log("[v0] Message:", emailMessage)
    // Here you would implement the actual email sending logic
    setEmailModalOpen(false)
    setSelectedIds([])
    setEmailSubject("")
    setEmailMessage("")
    setEmailTemplate("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion des Abonnements</h1>
        <p className="mt-2 text-muted-foreground">Gérez tous les abonnements des commerces et restaurants</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Mensuels</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12.5% vs mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnements Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount}</div>
            <p className="text-xs text-muted-foreground">Sur {subscriptions.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnements Expirés</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiredCount}</div>
            <p className="text-xs text-muted-foreground">À relancer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Renouvellement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{renewalRate}%</div>
            <p className="text-xs text-muted-foreground">+2.3% vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par commerce ou propriétaire..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>

              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les plans</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedIds.length > 0 && (
        <Card className="border-primary">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{selectedIds.length} sélectionné(s)</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Envoyer un email
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Relancer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tous ({subscriptions.length})</TabsTrigger>
          <TabsTrigger value="active">Actifs ({activeCount})</TabsTrigger>
          <TabsTrigger value="expired">Expirés ({expiredCount})</TabsTrigger>
          <TabsTrigger value="cancelled">
            Annulés ({subscriptions.filter((s) => s.status === "cancelled").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="w-12 p-3">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={handleSelectAll}
                          aria-label="Tout sélectionner"
                          className={isSomeSelected ? "data-[state=checked]:bg-primary/50" : ""}
                        />
                      </th>
                      <th className="p-3 text-left text-sm font-medium">Commerce</th>
                      <th className="p-3 text-left text-sm font-medium">Propriétaire</th>
                      <th className="p-3 text-left text-sm font-medium">Type</th>
                      <th className="p-3 text-left text-sm font-medium">Plan</th>
                      <th className="p-3 text-left text-sm font-medium">Prix</th>
                      <th className="p-3 text-left text-sm font-medium">Statut</th>
                      <th className="p-3 text-left text-sm font-medium">Début</th>
                      <th className="p-3 text-left text-sm font-medium">Fin</th>
                      <th className="p-3 text-left text-sm font-medium">Renouv.</th>
                      <th className="p-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscriptions.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="p-12 text-center text-muted-foreground">
                          Aucun abonnement trouvé
                        </td>
                      </tr>
                    ) : (
                      filteredSubscriptions.map((sub) => (
                        <tr key={sub.id} className="border-b last:border-0">
                          <td className="p-3">
                            <Checkbox
                              checked={selectedIds.includes(sub.id)}
                              onCheckedChange={(checked) => handleSelectOne(sub.id, checked as boolean)}
                              aria-label={`Sélectionner ${sub.business}`}
                            />
                          </td>
                          <td className="p-3 font-medium">{sub.business}</td>
                          <td className="p-3 text-sm text-muted-foreground">{sub.owner}</td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-xs">
                              {sub.businessType === "commerce" ? "Commerce" : "Restaurant"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant="secondary" className="text-xs">
                              {sub.plan}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">€{sub.price}/mois</td>
                          <td className="p-3">
                            <Badge
                              className="text-xs"
                              variant={
                                sub.status === "active"
                                  ? "default"
                                  : sub.status === "expired"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {sub.status === "active" ? "Actif" : sub.status === "expired" ? "Expiré" : "Annulé"}
                            </Badge>
                          </td>
                          <td className="p-3 text-xs text-muted-foreground">{sub.startDate}</td>
                          <td className="p-3 text-xs text-muted-foreground">{sub.endDate}</td>
                          <td className="p-3">
                            <Badge variant={sub.autoRenew ? "default" : "outline"} className="text-xs">
                              {sub.autoRenew ? "Auto" : "Manuel"}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedIds([sub.id])
                                  setEmailModalOpen(true)
                                }}
                                title="Envoyer un email"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleWhatsApp(sub.phone, sub.business)}
                                title="Contacter sur WhatsApp"
                              >
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="gap-2">
                                    <Eye className="h-4 w-4" />
                                    Voir détails
                                  </DropdownMenuItem>
                                  {sub.status === "expired" && (
                                    <DropdownMenuItem className="gap-2">
                                      <RefreshCw className="h-4 w-4" />
                                      Relancer
                                    </DropdownMenuItem>
                                  )}
                                  {sub.status === "active" && (
                                    <DropdownMenuItem className="gap-2 text-destructive">
                                      <Ban className="h-4 w-4" />
                                      Annuler
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Envoyer un email</DialogTitle>
            <DialogDescription>Envoi d'email à {selectedIds.length} destinataire(s)</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Modèle d'email</Label>
              <Select value={emailTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Choisir un modèle..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Email personnalisé</SelectItem>
                  <SelectItem value="renewal">Relance renouvellement</SelectItem>
                  <SelectItem value="expired">Abonnement expiré</SelectItem>
                  <SelectItem value="welcome">Bienvenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Objet</Label>
              <Input
                id="subject"
                placeholder="Objet de l'email..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Votre message..."
                rows={8}
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendEmail} disabled={!emailSubject || !emailMessage}>
              <Send className="mr-2 h-4 w-4" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
