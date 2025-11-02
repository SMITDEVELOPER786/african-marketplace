"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Search,
  Filter,
  Mail,
  MessageCircle,
  MoreVertical,
  Download,
  Plus,
  Trash2,
  Info,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const advertisingPlans = [
  { id: "1week", name: "1 semaine", duration: 7, price: 29, impressions: 2000 },
  { id: "1month", name: "1 mois", duration: 30, price: 99, impressions: 10000, popular: true },
  { id: "3months", name: "3 mois", duration: 90, price: 249, impressions: 35000 },
  { id: "6months", name: "6 mois", duration: 180, price: 449, impressions: 80000 },
  { id: "1year", name: "1 an", duration: 365, price: 799, impressions: 200000 },
]

// Mock data for advertising campaigns
const campaigns = [
  {
    id: 1,
    businessName: "Restaurant Le Baobab",
    businessType: "restaurant",
    owner: "Amadou Diallo",
    ownerEmail: "amadou@example.com",
    ownerPhone: "+33 6 12 34 56 78",
    duration: "1 mois",
    price: 99,
    status: "pending",
    startDate: "2025-01-20",
    endDate: "2025-02-20",
    impressions: 0,
    clics: 0,
    createdAt: "2025-01-18",
  },
  {
    id: 2,
    businessName: "Boutique Afro Style",
    businessType: "merchant",
    owner: "Fatou Sow",
    ownerEmail: "fatou@example.com",
    ownerPhone: "+33 6 98 76 54 32",
    duration: "3 mois",
    price: 249,
    status: "active",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    impressions: 15600,
    clics: 487,
    createdAt: "2025-01-08",
  },
  {
    id: 3,
    businessName: "Épicerie Tropicale",
    businessType: "merchant",
    owner: "Moussa Traoré",
    ownerEmail: "moussa@example.com",
    ownerPhone: "+33 6 11 22 33 44",
    duration: "1 semaine",
    price: 29,
    status: "active",
    startDate: "2025-01-15",
    endDate: "2025-01-22",
    impressions: 3200,
    clics: 98,
    createdAt: "2025-01-14",
  },
  {
    id: 4,
    businessName: "Restaurant Chez Maman",
    businessType: "restaurant",
    owner: "Aïcha Koné",
    ownerEmail: "aicha@example.com",
    ownerPhone: "+33 6 55 66 77 88",
    duration: "6 mois",
    price: 449,
    status: "suspended",
    startDate: "2024-12-01",
    endDate: "2025-06-01",
    impressions: 28900,
    clics: 1234,
    createdAt: "2024-11-28",
  },
  {
    id: 5,
    businessName: "Salon de Coiffure Afro",
    businessType: "merchant",
    owner: "Mariama Diop",
    ownerEmail: "mariama@example.com",
    ownerPhone: "+33 6 33 44 55 66",
    duration: "1 mois",
    price: 99,
    status: "completed",
    startDate: "2024-12-15",
    endDate: "2025-01-15",
    impressions: 12400,
    clics: 456,
    createdAt: "2024-12-13",
  },
]

export default function AdminAdvertisingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")

  const [newCampaign, setNewCampaign] = useState({
    businessId: "",
    planId: "1month",
    startDate: "",
    autoActivate: true,
  })

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.owner.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    const matchesType = typeFilter === "all" || campaign.businessType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === "active").length,
    pending: campaigns.filter((c) => c.status === "pending").length,
    revenue: campaigns.reduce((sum, c) => (c.status !== "pending" ? sum + c.price : sum), 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClics: campaigns.reduce((sum, c) => sum + c.clics, 0),
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(filteredCampaigns.map((c) => c.id))
    } else {
      setSelectedCampaigns([])
    }
  }

  const handleSelectCampaign = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedCampaigns([...selectedCampaigns, id])
    } else {
      setSelectedCampaigns(selectedCampaigns.filter((cid) => cid !== id))
    }
  }

  const handleBulkApprove = () => {
    console.log("[v0] Bulk approving campaigns:", selectedCampaigns)
    // TODO: Implement bulk approval logic
    setSelectedCampaigns([])
  }

  const handleBulkSuspend = () => {
    console.log("[v0] Bulk suspending campaigns:", selectedCampaigns)
    // TODO: Implement bulk suspension logic
    setSelectedCampaigns([])
  }

  const handleBulkActivate = () => {
    console.log("[v0] Bulk activating campaigns:", selectedCampaigns)
    // TODO: Implement bulk activation logic
    setSelectedCampaigns([])
  }

  const handleBulkDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedCampaigns.length} campagne(s) ?`)) {
      console.log("[v0] Bulk deleting campaigns:", selectedCampaigns)
      // TODO: Implement bulk deletion logic
      setSelectedCampaigns([])
    }
  }

  const handleBulkEmail = () => {
    setShowEmailModal(true)
  }

  const handleApprove = (id: number) => {
    console.log("[v0] Approving campaign:", id)
    // TODO: Implement approval logic with auto-activation
  }

  const handleReject = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir rejeter cette campagne ?")) {
      console.log("[v0] Rejecting campaign:", id)
      // TODO: Implement rejection logic
    }
  }

  const handleSuspend = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir suspendre cette campagne ?")) {
      console.log("[v0] Suspending campaign:", id)
      // TODO: Implement suspension logic
    }
  }

  const handleResume = (id: number) => {
    console.log("[v0] Resuming campaign:", id)
    // TODO: Implement resume logic
  }

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette campagne ?")) {
      console.log("[v0] Deleting campaign:", id)
      // TODO: Implement deletion logic
    }
  }

  const handleViewDetails = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowDetailsModal(true)
  }

  const handleSendEmail = (campaign: any) => {
    setSelectedCampaign(campaign)
    setEmailSubject(`Concernant votre campagne publicitaire - ${campaign.businessName}`)
    setEmailMessage("")
    setShowEmailModal(true)
  }

  const handleWhatsApp = (phone: string, businessName: string) => {
    const message = encodeURIComponent(`Bonjour, concernant votre campagne publicitaire pour ${businessName}`)
    window.open(`https://wa.me/${phone.replace(/\s/g, "")}?text=${message}`, "_blank")
  }

  const handleCreateCampaign = () => {
    console.log("[v0] Creating campaign:", newCampaign)
    // TODO: Implement campaign creation logic
    setShowCreateModal(false)
    setNewCampaign({
      businessId: "",
      planId: "1month",
      startDate: "",
      autoActivate: true,
    })
  }

  const handleSendEmailSubmit = () => {
    const recipients = selectedCampaign
      ? [selectedCampaign.ownerEmail]
      : campaigns.filter((c) => selectedCampaigns.includes(c.id)).map((c) => c.ownerEmail)

    console.log("[v0] Sending email to:", recipients)
    console.log("[v0] Subject:", emailSubject)
    console.log("[v0] Message:", emailMessage)
    // TODO: Implement email sending logic

    setShowEmailModal(false)
    setEmailSubject("")
    setEmailMessage("")
    setSelectedCampaign(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "suspended":
        return <Badge className="bg-red-500">Suspendue</Badge>
      case "completed":
        return <Badge variant="secondary">Terminée</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    return type === "restaurant" ? (
      <Badge variant="outline">Restaurant</Badge>
    ) : (
      <Badge variant="outline">Commerce</Badge>
    )
  }

  const selectedPlan = advertisingPlans.find((p) => p.id === newCampaign.planId)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl">Gestion des Publicités</h1>
          <p className="text-muted-foreground">Gérez les campagnes publicitaires des commerçants et restaurateurs</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Créer une campagne
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Campagnes totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.total}</div>
            <p className="text-muted-foreground text-xs">
              {stats.active} actives • {stats.pending} en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Revenus générés</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">€{stats.revenue}</div>
            <p className="text-muted-foreground text-xs">Depuis le début</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Impressions totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalImpressions.toLocaleString()}</div>
            <p className="text-muted-foreground text-xs">Toutes campagnes confondues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Clics totaux</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalClics.toLocaleString()}</div>
            <p className="text-muted-foreground text-xs">
              Taux moyen: {((stats.totalClics / stats.totalImpressions) * 100).toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {selectedCampaigns.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedCampaigns.length === filteredCampaigns.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="font-medium">{selectedCampaigns.length} campagne(s) sélectionnée(s)</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkApprove}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approuver
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkActivate}>
                <Play className="mr-2 h-4 w-4" />
                Activer
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkSuspend}>
                <Pause className="mr-2 h-4 w-4" />
                Suspendre
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Envoyer un email
              </Button>
              <Button variant="outline" size="sm" onClick={() => console.log("Export")}>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkDelete} className="text-red-600 bg-transparent">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCampaigns([])}>
                ✕
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toutes les campagnes</TabsTrigger>
          <TabsTrigger value="pending">En attente ({stats.pending})</TabsTrigger>
          <TabsTrigger value="active">Actives ({stats.active})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Toutes les campagnes publicitaires</CardTitle>
                  <CardDescription>Liste complète des campagnes de boost</CardDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-full sm:w-[200px]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspendue</SelectItem>
                      <SelectItem value="completed">Terminée</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="merchant">Commerce</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedCampaigns.length === filteredCampaigns.length && filteredCampaigns.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Propriétaire</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Performances</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCampaigns.includes(campaign.id)}
                          onCheckedChange={(checked) => handleSelectCampaign(campaign.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.businessName}</p>
                          <p className="text-muted-foreground text-xs">
                            {new Date(campaign.startDate).toLocaleDateString("fr-FR")} -{" "}
                            {new Date(campaign.endDate).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(campaign.businessType)}</TableCell>
                      <TableCell>{campaign.owner}</TableCell>
                      <TableCell>{campaign.duration}</TableCell>
                      <TableCell className="font-semibold">€{campaign.price}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {campaign.impressions.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MousePointerClick className="h-3 w-3" />
                            {campaign.clics}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSendEmail(campaign)}
                            title="Envoyer un email"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleWhatsApp(campaign.ownerPhone, campaign.businessName)}
                            title="Contacter via WhatsApp"
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
                              <DropdownMenuItem onClick={() => handleViewDetails(campaign)}>
                                <Info className="mr-2 h-4 w-4" />
                                Voir les détails
                              </DropdownMenuItem>
                              {campaign.status === "pending" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleApprove(campaign.id)}>
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    Approuver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleReject(campaign.id)}>
                                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                    Rejeter
                                  </DropdownMenuItem>
                                </>
                              )}
                              {campaign.status === "active" && (
                                <DropdownMenuItem onClick={() => handleSuspend(campaign.id)}>
                                  <Pause className="mr-2 h-4 w-4 text-orange-500" />
                                  Suspendre
                                </DropdownMenuItem>
                              )}
                              {campaign.status === "suspended" && (
                                <DropdownMenuItem onClick={() => handleResume(campaign.id)}>
                                  <Play className="mr-2 h-4 w-4 text-green-500" />
                                  Réactiver
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDelete(campaign.id)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campagnes en attente d'approbation</CardTitle>
              <CardDescription>Validez ou rejetez les nouvelles demandes de boost</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Propriétaire</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Date de demande</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns
                    .filter((c) => c.status === "pending")
                    .map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.businessName}</TableCell>
                        <TableCell>{getTypeBadge(campaign.businessType)}</TableCell>
                        <TableCell>{campaign.owner}</TableCell>
                        <TableCell>{campaign.duration}</TableCell>
                        <TableCell className="font-semibold">€{campaign.price}</TableCell>
                        <TableCell>{new Date(campaign.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(campaign.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approuver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(campaign.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Rejeter
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campagnes actives</CardTitle>
              <CardDescription>Campagnes publicitaires en cours d'exécution</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Durée restante</TableHead>
                    <TableHead>Performances</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns
                    .filter((c) => c.status === "active")
                    .map((campaign) => {
                      const daysLeft = Math.ceil(
                        (new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )
                      return (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{campaign.businessName}</p>
                              <p className="text-muted-foreground text-xs">{campaign.owner}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getTypeBadge(campaign.businessType)}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{daysLeft} jours</p>
                              <p className="text-muted-foreground text-xs">
                                Fin: {new Date(campaign.endDate).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <Eye className="h-3 w-3" />
                                <span>{campaign.impressions.toLocaleString()} impressions</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MousePointerClick className="h-3 w-3" />
                                <span>{campaign.clics} clics</span>
                              </div>
                              <div className="text-muted-foreground">
                                Taux: {((campaign.clics / campaign.impressions) * 100).toFixed(2)}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuspend(campaign.id)}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <Pause className="mr-1 h-4 w-4" />
                              Suspendre
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer une campagne publicitaire</DialogTitle>
            <DialogDescription>Créez une nouvelle campagne de boost pour un commerce ou restaurant</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="business">Commerce / Restaurant</Label>
              <Select
                value={newCampaign.businessId}
                onValueChange={(value) => setNewCampaign({ ...newCampaign, businessId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un commerce" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Afro Delights Market</SelectItem>
                  <SelectItem value="2">Mama Africa Restaurant</SelectItem>
                  <SelectItem value="3">Sahel Spice Market</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Formule publicitaire</Label>
              <div className="space-y-2">
                {advertisingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                      newCampaign.planId === plan.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setNewCampaign({ ...newCampaign, planId: plan.id })}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-4 w-4 rounded-full border-2 ${
                            newCampaign.planId === plan.id ? "border-orange-500 bg-orange-500" : "border-gray-300"
                          }`}
                        >
                          {newCampaign.planId === plan.id && (
                            <div className="h-full w-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{plan.name}</p>
                          <p className="text-muted-foreground text-sm">
                            ~{plan.impressions.toLocaleString()} impressions estimées
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {plan.popular && <Badge className="bg-red-500">Populaire</Badge>}
                        <p className="font-bold text-xl">€{plan.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={newCampaign.startDate}
                onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoActivate"
                checked={newCampaign.autoActivate}
                onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, autoActivate: checked as boolean })}
              />
              <Label htmlFor="autoActivate" className="cursor-pointer">
                Activer automatiquement la campagne après création
              </Label>
            </div>

            {selectedPlan && (
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée:</span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impressions estimées:</span>
                      <span className="font-medium">{selectedPlan.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prix:</span>
                      <span className="font-bold text-lg">€{selectedPlan.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateCampaign}>Créer la campagne</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails de la campagne</DialogTitle>
            <DialogDescription>Informations complètes sur la campagne publicitaire</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entreprise:</span>
                      <span className="font-medium">{selectedCampaign.businessName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      {getTypeBadge(selectedCampaign.businessType)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Propriétaire:</span>
                      <span className="font-medium">{selectedCampaign.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Statut:</span>
                      {getStatusBadge(selectedCampaign.status)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Formule et tarification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée:</span>
                      <span className="font-medium">{selectedCampaign.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prix:</span>
                      <span className="font-bold">€{selectedCampaign.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Début:</span>
                      <span className="font-medium">
                        {new Date(selectedCampaign.startDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fin:</span>
                      <span className="font-medium">
                        {new Date(selectedCampaign.endDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Performances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Eye className="h-4 w-4" />
                        <span>Impressions</span>
                      </div>
                      <p className="font-bold text-2xl">{selectedCampaign.impressions.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MousePointerClick className="h-4 w-4" />
                        <span>Clics</span>
                      </div>
                      <p className="font-bold text-2xl">{selectedCampaign.clics}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <TrendingUp className="h-4 w-4" />
                        <span>Taux de clic</span>
                      </div>
                      <p className="font-bold text-2xl">
                        {selectedCampaign.impressions > 0
                          ? ((selectedCampaign.clics / selectedCampaign.impressions) * 100).toFixed(2)
                          : 0}
                        %
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{selectedCampaign.ownerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Téléphone:</span>
                    <span className="font-medium">{selectedCampaign.ownerPhone}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Envoyer un email</DialogTitle>
            <DialogDescription>
              {selectedCampaign
                ? `Envoyer un email à ${selectedCampaign.owner}`
                : `Envoyer un email à ${selectedCampaigns.length} propriétaire(s)`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input
                id="subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Objet de l'email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                placeholder="Votre message..."
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendEmailSubmit}>
              <Mail className="mr-2 h-4 w-4" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
