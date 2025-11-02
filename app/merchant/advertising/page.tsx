"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  Users,
  DollarSign,
  Play,
  Pause,
  StopCircle,
  RefreshCw,
  CreditCard,
  Lock,
  Shield,
} from "lucide-react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

const Area = dynamic(() => import("recharts").then((mod) => mod.Area), { ssr: false })
const AreaChart = dynamic(() => import("recharts").then((mod) => mod.AreaChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />,
})
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false })

const performanceData = [
  { date: "Lun", impressions: 1200, clics: 45 },
  { date: "Mar", impressions: 1800, clics: 67 },
  { date: "Mer", impressions: 2100, clics: 89 },
  { date: "Jeu", impressions: 1600, clics: 54 },
  { date: "Ven", impressions: 2400, clics: 98 },
  { date: "Sam", impressions: 3200, clics: 145 },
  { date: "Dim", impressions: 2800, clics: 112 },
]

const campaigns = [
  {
    id: 1,
    name: "Boost Printemps 2025",
    status: "active",
    duration: "1 mois",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    budget: 99,
    impressions: 12500,
    clics: 456,
    conversions: 23,
  },
  {
    id: 2,
    name: "Promotion Hiver",
    status: "completed",
    duration: "2 semaines",
    startDate: "2024-12-01",
    endDate: "2024-12-15",
    budget: 49,
    impressions: 8900,
    clics: 234,
    conversions: 18,
  },
]

const pricingPlans = [
  { duration: "1 semaine", price: 29, impressions: "~2,000", highlight: false },
  { duration: "1 mois", price: 99, impressions: "~10,000", highlight: true },
  { duration: "3 mois", price: 249, impressions: "~35,000", highlight: false },
  { duration: "6 mois", price: 449, impressions: "~80,000", highlight: false },
  { duration: "1 an", price: 799, impressions: "~200,000", highlight: false },
]

export default function MerchantAdvertisingPage() {
  const [selectedPlan, setSelectedPlan] = useState("1 mois")
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const activeCampaign = campaigns.find((c) => c.status === "active")

  const handleLaunchCampaign = () => {
    setShowPaymentModal(true)
  }

  const handlePayment = () => {
    console.log("[v0] Processing payment for campaign:", selectedPlan)
    console.log("[v0] Payment method:", paymentMethod)

    if (paymentMethod === "card") {
      // Validate card details
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez remplir tous les champs de la carte bancaire.",
          variant: "destructive",
        })
        return
      }
    }

    // TODO: Implement actual payment processing
    toast({
      title: "Paiement en cours",
      description: "Votre campagne publicitaire sera activée après validation du paiement.",
    })

    setShowPaymentModal(false)
    // Reset form
    setCardDetails({ number: "", name: "", expiry: "", cvv: "" })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4)
    }
    return v
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-bold text-3xl">Publicité & Boost</h1>
        <p className="text-muted-foreground">Boostez votre visibilité et attirez plus de clients</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Impressions totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">21,400</div>
            <p className="text-muted-foreground text-xs">+12.5% vs mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Clics</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">690</div>
            <p className="text-muted-foreground text-xs">Taux de clic: 3.2%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Conversions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">41</div>
            <p className="text-muted-foreground text-xs">Taux: 5.9%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Budget dépensé</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">€148</div>
            <p className="text-muted-foreground text-xs">Sur 2 campagnes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Créer une campagne</TabsTrigger>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="campaigns">Mes campagnes</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pricing Plans */}
            <Card>
              <CardHeader>
                <CardTitle>Choisissez votre formule</CardTitle>
                <CardDescription>Sélectionnez la durée de votre campagne publicitaire</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-3">
                  {pricingPlans.map((plan) => (
                    <div
                      key={plan.duration}
                      className={`relative flex items-center space-x-3 rounded-lg border p-4 ${
                        plan.highlight ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value={plan.duration} id={plan.duration} />
                      <Label
                        htmlFor={plan.duration}
                        className="flex flex-1 cursor-pointer items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold">{plan.duration}</p>
                          <p className="text-muted-foreground text-sm">{plan.impressions} impressions estimées</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl">€{plan.price}</p>
                          {plan.highlight && <Badge className="mt-1">Populaire</Badge>}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Campaign Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu de votre annonce boostée</CardTitle>
                <CardDescription>Voici comment votre commerce apparaîtra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative overflow-hidden rounded-lg border">
                  <Badge className="absolute top-2 right-2 bg-yellow-500">Sponsorisé</Badge>
                  <div className="aspect-video bg-muted" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">Votre Commerce</h3>
                    <p className="text-muted-foreground text-sm">Catégorie • Ville</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary">⭐ 4.8</Badge>
                      <span className="text-muted-foreground text-sm">125 avis</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 rounded-lg bg-muted p-4">
                  <h4 className="font-semibold text-sm">Avantages du boost :</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      Apparaît en haut des résultats de recherche
                    </li>
                    <li className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      Badge "Sponsorisé" pour plus de visibilité
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      Recommandé aux utilisateurs de votre zone
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Durée sélectionnée</span>
                    <span className="font-semibold">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Prix</span>
                    <span className="font-semibold">
                      €{pricingPlans.find((p) => p.duration === selectedPlan)?.price}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Impressions estimées</span>
                    <span className="font-semibold">
                      {pricingPlans.find((p) => p.duration === selectedPlan)?.impressions}
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleLaunchCampaign}>
                  <Play className="mr-2 h-4 w-4" />
                  Lancer la campagne
                </Button>
                <p className="text-center text-muted-foreground text-xs">
                  Votre campagne démarrera immédiatement après validation
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance de la semaine</CardTitle>
              <CardDescription>Impressions et clics sur les 7 derniers jours</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  impressions: { label: "Impressions", color: "hsl(var(--chart-1))" },
                  clics: { label: "Clics", color: "hsl(var(--chart-2))" },
                }}
                className="h-[300px]"
              >
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="impressions"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="clics"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Active Campaign */}
          {activeCampaign && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campagne active</CardTitle>
                    <CardDescription>{activeCampaign.name}</CardDescription>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground text-sm">Durée</p>
                    <p className="font-semibold">{activeCampaign.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Début</p>
                    <p className="font-semibold">{new Date(activeCampaign.startDate).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Fin</p>
                    <p className="font-semibold">{new Date(activeCampaign.endDate).toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Budget</p>
                    <p className="font-semibold">€{activeCampaign.budget}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Impressions</p>
                    <p className="font-semibold">{activeCampaign.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Clics</p>
                    <p className="font-semibold">{activeCampaign.clics}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Conversions</p>
                    <p className="font-semibold">{activeCampaign.conversions}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Pause className="mr-2 h-4 w-4" />
                    Mettre en pause
                  </Button>
                  <Button variant="outline" size="sm">
                    <StopCircle className="mr-2 h-4 w-4" />
                    Arrêter
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des campagnes</CardTitle>
              <CardDescription>Toutes vos campagnes publicitaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                          {campaign.status === "active" ? "Active" : "Terminée"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {campaign.duration} • {new Date(campaign.startDate).toLocaleDateString("fr-FR")} -{" "}
                        {new Date(campaign.endDate).toLocaleDateString("fr-FR")}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span>
                          <Eye className="mr-1 inline h-3 w-3" />
                          {campaign.impressions.toLocaleString()}
                        </span>
                        <span>
                          <MousePointerClick className="mr-1 inline h-3 w-3" />
                          {campaign.clics}
                        </span>
                        <span>
                          <Users className="mr-1 inline h-3 w-3" />
                          {campaign.conversions}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-semibold">€{campaign.budget}</p>
                        <p className="text-muted-foreground text-xs">Budget</p>
                      </div>
                      {campaign.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Renouveler
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Finaliser votre campagne publicitaire</DialogTitle>
            <DialogDescription>Paiement sécurisé pour activer votre campagne de boost</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Order Summary */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-primary" />
                  Récapitulatif de la commande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Formule sélectionnée:</span>
                  <span className="font-semibold">{selectedPlan}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Impressions estimées:</span>
                  <span className="font-semibold">
                    {pricingPlans.find((p) => p.duration === selectedPlan)?.impressions}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Durée:</span>
                  <span className="font-semibold">{selectedPlan}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total à payer:</span>
                  <span className="font-bold text-3xl text-primary">
                    €{pricingPlans.find((p) => p.duration === selectedPlan)?.price}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Choisissez votre mode de paiement</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: any) => setPaymentMethod(value)}
                className="grid gap-4"
              >
                <div
                  className={`relative flex items-center space-x-4 rounded-xl border-2 p-5 transition-all cursor-pointer hover:border-primary/50 ${
                    paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <RadioGroupItem value="card" id="card" className="mt-0" />
                  <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-base">Carte bancaire</p>
                        <p className="text-muted-foreground text-sm">Paiement instantané et sécurisé</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Card logos */}
                      <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 border">
                        <div className="font-bold text-blue-600 text-xs">VISA</div>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 border">
                        <div className="font-bold text-red-600 text-xs">MC</div>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 border">
                        <div className="font-bold text-blue-500 text-xs">AMEX</div>
                      </div>
                    </div>
                  </Label>
                </div>

                <div
                  className={`relative flex items-center space-x-4 rounded-xl border-2 p-5 transition-all cursor-pointer hover:border-primary/50 ${
                    paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <RadioGroupItem value="paypal" id="paypal" className="mt-0" />
                  <Label htmlFor="paypal" className="flex flex-1 cursor-pointer items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                        <span className="font-bold text-white text-lg">P</span>
                      </div>
                      <div>
                        <p className="font-semibold text-base">PayPal</p>
                        <p className="text-muted-foreground text-sm">Paiement rapide avec votre compte PayPal</p>
                      </div>
                    </div>
                    <div className="rounded-md bg-[#0070ba] px-3 py-1.5">
                      <span className="font-bold text-white text-sm">PayPal</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "card" && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CreditCard className="h-5 w-5" />
                    Informations de carte bancaire
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-sm font-medium">
                      Numéro de carte
                    </Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                        maxLength={19}
                        className="h-12 pr-24 text-base"
                      />
                      <div className="absolute top-1/2 right-3 flex -translate-y-1/2 gap-1">
                        <div className="rounded bg-gray-100 px-1.5 py-0.5">
                          <span className="font-bold text-blue-600 text-[10px]">VISA</span>
                        </div>
                        <div className="rounded bg-gray-100 px-1.5 py-0.5">
                          <span className="font-bold text-red-600 text-[10px]">MC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-sm font-medium">
                      Nom du titulaire
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="JEAN DUPONT"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-sm font-medium">
                        Date d'expiration
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                        maxLength={5}
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-sm font-medium">
                        Code CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                        maxLength={3}
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 rounded-lg bg-muted p-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground text-xs">Paiement sécurisé SSL</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-muted-foreground text-xs">Protection 3D Secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "paypal" && (
              <Card className="border-2 border-[#0070ba]/20 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="flex flex-col items-center gap-4 py-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0070ba]">
                    <span className="font-bold text-white text-2xl">P</span>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-semibold text-lg">Paiement via PayPal</p>
                    <p className="text-muted-foreground text-sm max-w-md">
                      Vous serez redirigé vers PayPal pour finaliser votre paiement de manière sécurisée. Connectez-vous
                      à votre compte PayPal ou payez par carte bancaire.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Lock className="h-3 w-3" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPaymentModal(false)} size="lg">
              Annuler
            </Button>
            <Button onClick={handlePayment} size="lg" className="min-w-[200px]">
              {paymentMethod === "card" && (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Payer €{pricingPlans.find((p) => p.duration === selectedPlan)?.price}
                </>
              )}
              {paymentMethod === "paypal" && <>Continuer avec PayPal</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
