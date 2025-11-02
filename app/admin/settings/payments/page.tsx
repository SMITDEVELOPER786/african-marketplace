"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Save,
  CreditCard,
  Wallet,
  Building2,
  Receipt,
  TrendingUp,
  Calendar,
  Tag,
  FileText,
  Upload,
  Eye,
  Download,
  Mail,
  X,
  Check,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function PaymentsSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [previewReceipt, setPreviewReceipt] = useState<"subscription" | "advertising" | null>(null)
  const [sendTestEmailOpen, setSendTestEmailOpen] = useState(false)
  const [testEmailSent, setTestEmailSent] = useState(false)
  const [logoUploaded, setLogoUploaded] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogoUpload = () => {
    // Simulate logo upload
    setLogoUploaded(true)
    setTimeout(() => setLogoUploaded(false), 3000)
  }

  const handleSendTestEmail = () => {
    // Simulate sending test email
    setTestEmailSent(true)
    setTimeout(() => {
      setTestEmailSent(false)
      setSendTestEmailOpen(false)
    }, 2000)
  }

  const ReceiptPreview = ({ type }: { type: "subscription" | "advertising" }) => {
    const isSubscription = type === "subscription"

    return (
      <div className="mx-auto max-w-2xl rounded-lg border bg-white p-8 shadow-lg dark:bg-gray-900">
        {/* Header with logo */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-orange-600 text-white">
              <span className="text-xl font-bold">A</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AfroMarket</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">123 Rue de la République</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">75001 Paris, France</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-red-600">
              {isSubscription ? "Reçu d'Abonnement" : "Reçu de Publicité"}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">REC-2025-0042</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">20 janvier 2025</p>
          </div>
        </div>

        {/* Customer info */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Facturé à</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">Afro Delights Market</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">John Doe</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">+33 6 12 34 56 78</p>
        </div>

        {/* Custom header message */}
        <div className="mb-6 rounded-lg border-l-4 border-red-600 bg-red-50 p-4 dark:bg-red-950/20">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {isSubscription
              ? "Merci pour votre abonnement à AfroMarket. Voici votre reçu de paiement."
              : "Merci pour votre campagne publicitaire. Voici votre reçu de paiement."}
          </p>
        </div>

        {/* Transaction details */}
        <div className="mb-6">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Détails de la transaction</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Description</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {isSubscription ? "Plan Standard - Mensuel" : "Campagne Publicitaire - 1 Mois"}
              </span>
            </div>
            {isSubscription ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Période</span>
                  <span className="text-gray-900 dark:text-white">20 Jan 2025 - 20 Fév 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Prochain renouvellement</span>
                  <span className="text-gray-900 dark:text-white">20 Février 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Annonces incluses</span>
                  <span className="text-gray-900 dark:text-white">50 annonces</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Durée</span>
                  <span className="text-gray-900 dark:text-white">1 mois (20 Jan - 20 Fév 2025)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Impressions estimées</span>
                  <span className="text-gray-900 dark:text-white">~10,000 impressions</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Statut</span>
                  <span className="text-green-600 dark:text-green-400">Activée</span>
                </div>
              </>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Méthode de paiement</span>
              <span className="text-gray-900 dark:text-white">Carte bancaire •••• 4242</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Date de paiement</span>
              <span className="text-gray-900 dark:text-white">20 Janvier 2025, 14:32</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Pricing breakdown */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Sous-total</span>
            <span className="text-gray-900 dark:text-white">{isSubscription ? "49,17 €" : "82,50 €"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">TVA (20%)</span>
            <span className="text-gray-900 dark:text-white">{isSubscription ? "9,83 €" : "16,50 €"}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-red-600">{isSubscription ? "59,00 €" : "99,00 €"}</span>
          </div>
        </div>

        {/* Custom footer message */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {isSubscription
              ? "Votre abonnement sera automatiquement renouvelé le 20 février 2025. Vous recevrez un rappel 7 jours avant."
              : "Votre campagne sera activée sous 24h. Vous recevrez un rapport détaillé à la fin de la campagne."}
          </p>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Pour toute question, contactez-nous à contact@afromarket.com
          </p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Merci de votre confiance !</p>
        </div>

        {/* Legal mentions */}
        <div className="border-t pt-4">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            AfroMarket SAS - Capital social: 50 000€ - SIRET: 123 456 789 00012 - RCS Paris
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">TVA intracommunautaire: FR12345678901</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Siège social: 123 Rue de la République, 75001 Paris, France
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Ce reçu fait office de justificatif de paiement.
          </p>
        </div>

        {/* QR Code placeholder */}
        <div className="mt-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <span className="text-xs text-gray-400">QR Code</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres des Paiements</h1>
        <p className="text-sm text-muted-foreground">
          Configurez les méthodes de paiement, abonnements, publicités et reçus
        </p>
      </div>

      {saved && (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertDescription>Les paramètres ont été enregistrés avec succès.</AlertDescription>
        </Alert>
      )}

      {logoUploaded && (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertDescription>Le logo a été téléchargé avec succès.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="payment-methods" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="payment-methods">Méthodes</TabsTrigger>
          <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
          <TabsTrigger value="advertising">Publicités</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
          <TabsTrigger value="receipts">Reçus</TabsTrigger>
        </TabsList>

        <TabsContent value="payment-methods" className="space-y-6">
          {/* Stripe Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Configuration Stripe
              </CardTitle>
              <CardDescription>Paramètres de connexion à Stripe pour les paiements par carte bancaire</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer Stripe</Label>
                  <p className="text-xs text-muted-foreground">Autoriser les paiements par carte bancaire</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stripe-public-key">Clé publique Stripe</Label>
                  <Input id="stripe-public-key" placeholder="pk_live_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret-key">Clé secrète Stripe</Label>
                  <Input id="stripe-secret-key" type="password" placeholder="sk_live_..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-webhook">URL Webhook</Label>
                <Input id="stripe-webhook" defaultValue="https://afromarket.com/api/webhooks/stripe" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-mode">Mode</Label>
                <Select defaultValue="live">
                  <SelectTrigger id="stripe-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="live">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* PayPal Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Configuration PayPal
              </CardTitle>
              <CardDescription>Paramètres de connexion à PayPal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer PayPal</Label>
                  <p className="text-xs text-muted-foreground">Autoriser les paiements via PayPal</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paypal-client-id">Client ID</Label>
                  <Input id="paypal-client-id" placeholder="AYSq3RDGsmBLJE-otTkBtM-jBc..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paypal-secret">Secret</Label>
                  <Input id="paypal-secret" type="password" placeholder="EGnHDxD_qRPdaLdZz8iCr8N7..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-webhook">URL Webhook</Label>
                <Input id="paypal-webhook" defaultValue="https://afromarket.com/api/webhooks/paypal" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-mode">Mode</Label>
                <Select defaultValue="live">
                  <SelectTrigger id="paypal-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                    <SelectItem value="live">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* SEPA Direct Debit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Prélèvement SEPA
              </CardTitle>
              <CardDescription>Configuration du prélèvement automatique SEPA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer SEPA</Label>
                  <p className="text-xs text-muted-foreground">Autoriser les prélèvements automatiques</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sepa-creditor-id">Identifiant créancier SEPA (ICS)</Label>
                <Input id="sepa-creditor-id" placeholder="FR12ZZZ123456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sepa-creditor-name">Nom du créancier</Label>
                <Input id="sepa-creditor-name" placeholder="AfroMarket SAS" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sepa-iban">IBAN du compte</Label>
                <Input id="sepa-iban" placeholder="FR76 1234 5678 9012 3456 7890 123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sepa-bic">BIC/SWIFT</Label>
                <Input id="sepa-bic" placeholder="BNPAFRPPXXX" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Plans d'Abonnement
              </CardTitle>
              <CardDescription>Configurez les plans d'abonnement pour les commerces et restaurants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan Gratuit */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Plan Gratuit</h3>
                    <p className="text-sm text-muted-foreground">Pour découvrir la plateforme</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="free-price">Prix (€/mois)</Label>
                    <Input id="free-price" type="number" defaultValue="0" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="free-trial">Durée d'essai (jours)</Label>
                    <Input id="free-trial" type="number" defaultValue="30" min="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-listings">Nombre d'annonces</Label>
                  <Input id="free-listings" type="number" defaultValue="5" min="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-description">Description</Label>
                  <Textarea
                    id="free-description"
                    defaultValue="Idéal pour tester la plateforme. Jusqu'à 5 annonces, support par email."
                    rows={2}
                  />
                </div>
              </div>

              {/* Plan Basic */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Plan Basic</h3>
                    <p className="text-sm text-muted-foreground">Pour les petits commerces</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="basic-price-monthly">Prix mensuel (€)</Label>
                    <Input id="basic-price-monthly" type="number" defaultValue="29" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basic-price-quarterly">Prix trimestriel (€)</Label>
                    <Input id="basic-price-quarterly" type="number" defaultValue="79" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basic-price-yearly">Prix annuel (€)</Label>
                    <Input id="basic-price-yearly" type="number" defaultValue="290" min="0" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="basic-listings">Nombre d'annonces</Label>
                    <Input id="basic-listings" type="number" defaultValue="20" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basic-photos">Photos par annonce</Label>
                    <Input id="basic-photos" type="number" defaultValue="5" min="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basic-features">Fonctionnalités incluses</Label>
                  <Textarea
                    id="basic-features"
                    defaultValue="• Jusqu'à 20 annonces&#10;• 5 photos par annonce&#10;• Support par email&#10;• Statistiques basiques"
                    rows={4}
                  />
                </div>
              </div>

              {/* Plan Standard */}
              <div className="space-y-4 rounded-lg border-2 border-primary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Plan Standard</h3>
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        Populaire
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Pour les commerces en croissance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="standard-price-monthly">Prix mensuel (€)</Label>
                    <Input id="standard-price-monthly" type="number" defaultValue="59" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standard-price-quarterly">Prix trimestriel (€)</Label>
                    <Input id="standard-price-quarterly" type="number" defaultValue="159" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standard-price-yearly">Prix annuel (€)</Label>
                    <Input id="standard-price-yearly" type="number" defaultValue="590" min="0" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="standard-listings">Nombre d'annonces</Label>
                    <Input id="standard-listings" type="number" defaultValue="50" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standard-photos">Photos par annonce</Label>
                    <Input id="standard-photos" type="number" defaultValue="10" min="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standard-features">Fonctionnalités incluses</Label>
                  <Textarea
                    id="standard-features"
                    defaultValue="• Jusqu'à 50 annonces&#10;• 10 photos par annonce&#10;• Support prioritaire&#10;• Statistiques avancées&#10;• Badge 'Vérifié'&#10;• Mise en avant hebdomadaire"
                    rows={6}
                  />
                </div>
              </div>

              {/* Plan Premium */}
              <div className="space-y-4 rounded-lg border p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Plan Premium</h3>
                      <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-xs text-white">
                        VIP
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Pour les grands établissements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="premium-price-monthly">Prix mensuel (€)</Label>
                    <Input id="premium-price-monthly" type="number" defaultValue="99" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium-price-quarterly">Prix trimestriel (€)</Label>
                    <Input id="premium-price-quarterly" type="number" defaultValue="269" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium-price-yearly">Prix annuel (€)</Label>
                    <Input id="premium-price-yearly" type="number" defaultValue="990" min="0" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="premium-listings">Nombre d'annonces</Label>
                    <Input id="premium-listings" type="number" defaultValue="999" min="0" />
                    <p className="text-xs text-muted-foreground">Illimité</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium-photos">Photos par annonce</Label>
                    <Input id="premium-photos" type="number" defaultValue="20" min="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premium-features">Fonctionnalités incluses</Label>
                  <Textarea
                    id="premium-features"
                    defaultValue="• Annonces illimitées&#10;• 20 photos par annonce&#10;• Support VIP 24/7&#10;• Statistiques complètes&#10;• Badge 'Premium'&#10;• Mise en avant permanente&#10;• Commission réduite (8%)&#10;• Campagne publicitaire offerte"
                    rows={8}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres Généraux des Abonnements</CardTitle>
              <CardDescription>Configuration globale des abonnements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Renouvellement automatique</Label>
                  <p className="text-xs text-muted-foreground">Renouveler automatiquement les abonnements</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Période de grâce</Label>
                  <p className="text-xs text-muted-foreground">Maintenir l'accès après expiration</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grace-period">Durée de la période de grâce (jours)</Label>
                <Input id="grace-period" type="number" defaultValue="7" min="0" max="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-days">Rappel avant expiration (jours)</Label>
                <Input id="reminder-days" type="number" defaultValue="7" min="1" max="30" />
                <p className="text-xs text-muted-foreground">Envoyer un rappel X jours avant l'expiration</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="advertising" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Formules Publicitaires
              </CardTitle>
              <CardDescription>Configurez les prix et durées des campagnes publicitaires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 1 semaine */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Formule 1 Semaine</h3>
                    <p className="text-sm text-muted-foreground">Boost court terme</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="ad-1week-price">Prix (€)</Label>
                    <Input id="ad-1week-price" type="number" defaultValue="29" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-1week-impressions">Impressions estimées</Label>
                    <Input id="ad-1week-impressions" type="number" defaultValue="2000" min="0" step="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-1week-clicks">Clics estimés</Label>
                    <Input id="ad-1week-clicks" type="number" defaultValue="60" min="0" />
                  </div>
                </div>
              </div>

              {/* 1 mois */}
              <div className="space-y-4 rounded-lg border-2 border-primary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Formule 1 Mois</h3>
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        Populaire
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Le plus choisi</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="ad-1month-price">Prix (€)</Label>
                    <Input id="ad-1month-price" type="number" defaultValue="99" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-1month-impressions">Impressions estimées</Label>
                    <Input id="ad-1month-impressions" type="number" defaultValue="10000" min="0" step="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-1month-clicks">Clics estimés</Label>
                    <Input id="ad-1month-clicks" type="number" defaultValue="300" min="0" />
                  </div>
                </div>
              </div>

              {/* 3 mois */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Formule 3 Mois</h3>
                    <p className="text-sm text-muted-foreground">Visibilité prolongée</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="ad-3months-price">Prix (€)</Label>
                    <Input id="ad-3months-price" type="number" defaultValue="249" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-3months-impressions">Impressions estimées</Label>
                    <Input id="ad-3months-impressions" type="number" defaultValue="35000" min="0" step="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-3months-clicks">Clics estimés</Label>
                    <Input id="ad-3months-clicks" type="number" defaultValue="1050" min="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ad-3months-discount">Remise (%)</Label>
                  <Input id="ad-3months-discount" type="number" defaultValue="15" min="0" max="100" />
                  <p className="text-xs text-muted-foreground">Remise par rapport au prix mensuel</p>
                </div>
              </div>

              {/* 6 mois */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Formule 6 Mois</h3>
                    <p className="text-sm text-muted-foreground">Engagement moyen terme</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="ad-6months-price">Prix (€)</Label>
                    <Input id="ad-6months-price" type="number" defaultValue="449" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-6months-impressions">Impressions estimées</Label>
                    <Input id="ad-6months-impressions" type="number" defaultValue="80000" min="0" step="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-6months-clicks">Clics estimés</Label>
                    <Input id="ad-6months-clicks" type="number" defaultValue="2400" min="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ad-6months-discount">Remise (%)</Label>
                  <Input id="ad-6months-discount" type="number" defaultValue="25" min="0" max="100" />
                </div>
              </div>

              {/* 1 an */}
              <div className="space-y-4 rounded-lg border p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Formule 1 An</h3>
                      <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-xs text-white">
                        Meilleure offre
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Maximum de visibilité</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="ad-1year-price">Prix (€)</Label>
                    <Input id="ad-1year-price" type="number" defaultValue="799" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-1year-impressions">Impressions estimées</Label>
                    <Input id="ad-1year-impressions" type="number" defaultValue="200000" min="0" step="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ad-1year-clicks">Clics estimés</Label>
                    <Input id="ad-1year-clicks" type="number" defaultValue="6000" min="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ad-1year-discount">Remise (%)</Label>
                  <Input id="ad-1year-discount" type="number" defaultValue="33" min="0" max="100" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'Affichage</CardTitle>
              <CardDescription>Configuration de l'affichage des publicités</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad-position">Position des publicités</Label>
                <Select defaultValue="top-sidebar">
                  <SelectTrigger id="ad-position">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">En haut de page</SelectItem>
                    <SelectItem value="top-sidebar">En haut + Sidebar</SelectItem>
                    <SelectItem value="carousel">Carrousel</SelectItem>
                    <SelectItem value="grid">Grille de résultats</SelectItem>
                    <SelectItem value="all">Toutes les positions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ad-frequency">Fréquence d'affichage</Label>
                <Select defaultValue="every-5">
                  <SelectTrigger id="ad-frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="every-3">Tous les 3 résultats</SelectItem>
                    <SelectItem value="every-5">Tous les 5 résultats</SelectItem>
                    <SelectItem value="every-10">Tous les 10 résultats</SelectItem>
                    <SelectItem value="random">Aléatoire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ad-rotation">Rotation des publicités</Label>
                <Select defaultValue="weighted">
                  <SelectTrigger id="ad-rotation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">Égale</SelectItem>
                    <SelectItem value="weighted">Pondérée (par prix)</SelectItem>
                    <SelectItem value="performance">Par performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Badge "Sponsorisé"</Label>
                  <p className="text-xs text-muted-foreground">Afficher un badge sur les annonces sponsorisées</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activation automatique</Label>
                  <p className="text-xs text-muted-foreground">Activer automatiquement après paiement</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Remises et Promotions
              </CardTitle>
              <CardDescription>Offres spéciales pour les campagnes publicitaires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Première campagne offerte</Label>
                  <p className="text-xs text-muted-foreground">Offrir la première campagne 1 semaine</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bulk-discount">Remise achat multiple (%)</Label>
                <Input id="bulk-discount" type="number" defaultValue="10" min="0" max="100" />
                <p className="text-xs text-muted-foreground">Remise pour l'achat de plusieurs campagnes</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="premium-discount">Remise abonnés Premium (%)</Label>
                <Input id="premium-discount" type="number" defaultValue="20" min="0" max="100" />
                <p className="text-xs text-muted-foreground">Remise pour les abonnés Premium</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Devises et Taxes</CardTitle>
              <CardDescription>Configuration des devises et de la TVA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-currency">Devise par défaut</Label>
                <Select defaultValue="eur">
                  <SelectTrigger id="default-currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">Dollar ($)</SelectItem>
                    <SelectItem value="xof">Franc CFA (XOF)</SelectItem>
                    <SelectItem value="mad">Dirham (MAD)</SelectItem>
                    <SelectItem value="tnd">Dinar Tunisien (TND)</SelectItem>
                    <SelectItem value="dzd">Dinar Algérien (DZD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Conversion automatique</Label>
                  <p className="text-xs text-muted-foreground">
                    Convertir automatiquement les prix selon la localisation
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="vat-rate">Taux de TVA (%)</Label>
                <Input id="vat-rate" type="number" defaultValue="20" min="0" max="100" step="0.1" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>TVA incluse dans les prix</Label>
                  <p className="text-xs text-muted-foreground">Afficher les prix TTC</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat-number">Numéro de TVA intracommunautaire</Label>
                <Input id="vat-number" placeholder="FR12345678901" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facturation</CardTitle>
              <CardDescription>Paramètres de génération des factures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Génération automatique</Label>
                  <p className="text-xs text-muted-foreground">Générer automatiquement les factures</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-prefix">Préfixe des factures</Label>
                <Input id="invoice-prefix" defaultValue="AFM" placeholder="AFM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-start">Numéro de départ</Label>
                <Input id="invoice-start" type="number" defaultValue="1000" min="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-footer">Pied de page des factures</Label>
                <Textarea
                  id="invoice-footer"
                  placeholder="Mentions légales, conditions de paiement..."
                  rows={3}
                  defaultValue="AfroMarket SAS - Capital social: 50 000€ - SIRET: 123 456 789 00012&#10;TVA intracommunautaire: FR12345678901&#10;Paiement à réception. Pas d'escompte en cas de paiement anticipé."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Remboursements</CardTitle>
              <CardDescription>Politique de remboursement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autoriser les remboursements</Label>
                  <p className="text-xs text-muted-foreground">Permettre les demandes de remboursement</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refund-period">Période de remboursement (jours)</Label>
                <Input id="refund-period" type="number" defaultValue="14" min="0" max="90" />
                <p className="text-xs text-muted-foreground">Délai pour demander un remboursement</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="refund-fee">Frais de remboursement (%)</Label>
                <Input id="refund-fee" type="number" defaultValue="5" min="0" max="100" step="0.1" />
                <p className="text-xs text-muted-foreground">Frais retenus lors d'un remboursement</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Remboursement automatique</Label>
                  <p className="text-xs text-muted-foreground">Rembourser automatiquement après validation</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Configuration des Reçus
              </CardTitle>
              <CardDescription>Personnalisez les reçus générés pour les abonnements et publicités</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Génération automatique des reçus</Label>
                  <p className="text-xs text-muted-foreground">Générer et envoyer automatiquement les reçus</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Envoi automatique par email</Label>
                  <p className="text-xs text-muted-foreground">Envoyer le reçu par email après paiement</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="receipt-format">Format des reçus</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="receipt-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="both">PDF + HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-language">Langue des reçus</Label>
                <Select defaultValue="fr">
                  <SelectTrigger id="receipt-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                    <SelectItem value="auto">Automatique (selon utilisateur)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informations de l'Entreprise
              </CardTitle>
              <CardDescription>Informations affichées sur les reçus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nom de l'entreprise</Label>
                <Input id="company-name" defaultValue="AfroMarket SAS" placeholder="AfroMarket SAS" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Adresse complète</Label>
                <Textarea
                  id="company-address"
                  placeholder="123 Rue de la République&#10;75001 Paris, France"
                  rows={3}
                  defaultValue="123 Rue de la République&#10;75001 Paris, France"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-siret">SIRET</Label>
                  <Input id="company-siret" placeholder="123 456 789 00012" defaultValue="123 456 789 00012" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-vat">Numéro de TVA</Label>
                  <Input id="company-vat" placeholder="FR12345678901" defaultValue="FR12345678901" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email de contact</Label>
                  <Input
                    id="company-email"
                    type="email"
                    placeholder="contact@afromarket.com"
                    defaultValue="contact@afromarket.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Téléphone</Label>
                  <Input id="company-phone" placeholder="+33 1 23 45 67 89" defaultValue="+33 1 23 45 67 89" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Site web</Label>
                <Input
                  id="company-website"
                  placeholder="https://afromarket.com"
                  defaultValue="https://afromarket.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-logo">Logo de l'entreprise</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="gap-2 bg-transparent" onClick={handleLogoUpload}>
                    <Upload className="h-4 w-4" />
                    Télécharger le logo
                  </Button>
                  <p className="text-xs text-muted-foreground">Format recommandé: PNG, 200x200px</p>
                </div>
                {logoUploaded && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    Logo téléchargé avec succès
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Numérotation des Reçus
              </CardTitle>
              <CardDescription>Configuration du format de numérotation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receipt-prefix">Préfixe des reçus</Label>
                <Input id="receipt-prefix" defaultValue="REC" placeholder="REC" />
                <p className="text-xs text-muted-foreground">Exemple: REC-2025-0001</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-format-pattern">Format de numérotation</Label>
                <Select defaultValue="year-number">
                  <SelectTrigger id="receipt-format-pattern">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Numéro simple (REC-0001)</SelectItem>
                    <SelectItem value="year-number">Année + Numéro (REC-2025-0001)</SelectItem>
                    <SelectItem value="year-month-number">Année + Mois + Numéro (REC-2025-01-0001)</SelectItem>
                    <SelectItem value="date-number">Date complète + Numéro (REC-20250120-0001)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-start-number">Numéro de départ</Label>
                <Input id="receipt-start-number" type="number" defaultValue="1" min="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-padding">Nombre de chiffres</Label>
                <Select defaultValue="4">
                  <SelectTrigger id="receipt-padding">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 chiffres (001)</SelectItem>
                    <SelectItem value="4">4 chiffres (0001)</SelectItem>
                    <SelectItem value="5">5 chiffres (00001)</SelectItem>
                    <SelectItem value="6">6 chiffres (000001)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Templates de Reçus</CardTitle>
              <CardDescription>Personnalisez les templates pour chaque type de transaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Reçu Abonnement */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Reçu d'Abonnement</h3>
                    <p className="text-sm text-muted-foreground">Template pour les paiements d'abonnement</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => setPreviewReceipt("subscription")}
                  >
                    <Eye className="h-4 w-4" />
                    Prévisualiser
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="subscription-receipt-title">Titre du reçu</Label>
                  <Input
                    id="subscription-receipt-title"
                    defaultValue="Reçu de Paiement - Abonnement"
                    placeholder="Reçu de Paiement - Abonnement"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subscription-receipt-header">En-tête personnalisé</Label>
                  <Textarea
                    id="subscription-receipt-header"
                    placeholder="Texte affiché en haut du reçu..."
                    rows={2}
                    defaultValue="Merci pour votre abonnement à AfroMarket. Voici votre reçu de paiement."
                  />
                  <p className="text-xs text-muted-foreground">
                    Variables disponibles: {"{"}
                    {"{"}nom{"}"}, {"{"}
                    {"{"}plan{"}"}, {"{"}
                    {"{"}montant{"}"}, {"{"}
                    {"{"}date{"}"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subscription-receipt-footer">Pied de page</Label>
                  <Textarea
                    id="subscription-receipt-footer"
                    placeholder="Mentions légales, conditions..."
                    rows={3}
                    defaultValue="Ce reçu fait office de justificatif de paiement.&#10;Pour toute question, contactez-nous à contact@afromarket.com&#10;Merci de votre confiance !"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Afficher les détails du plan</Label>
                    <p className="text-xs text-muted-foreground">Inclure les fonctionnalités du plan</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Afficher la date de renouvellement</Label>
                    <p className="text-xs text-muted-foreground">Indiquer la prochaine date de facturation</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              {/* Reçu Publicité */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Reçu de Publicité</h3>
                    <p className="text-sm text-muted-foreground">Template pour les campagnes publicitaires</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => setPreviewReceipt("advertising")}
                  >
                    <Eye className="h-4 w-4" />
                    Prévisualiser
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="advertising-receipt-title">Titre du reçu</Label>
                  <Input
                    id="advertising-receipt-title"
                    defaultValue="Reçu de Paiement - Campagne Publicitaire"
                    placeholder="Reçu de Paiement - Campagne Publicitaire"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advertising-receipt-header">En-tête personnalisé</Label>
                  <Textarea
                    id="advertising-receipt-header"
                    placeholder="Texte affiché en haut du reçu..."
                    rows={2}
                    defaultValue="Merci pour votre campagne publicitaire. Voici votre reçu de paiement."
                  />
                  <p className="text-xs text-muted-foreground">
                    Variables disponibles: {"{"}
                    {"{"}nom{"}"}, {"{"}
                    {"{"}durée{"}"}, {"{"}
                    {"{"}montant{"}"}, {"{"}
                    {"{"}impressions{"}"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advertising-receipt-footer">Pied de page</Label>
                  <Textarea
                    id="advertising-receipt-footer"
                    placeholder="Mentions légales, conditions..."
                    rows={3}
                    defaultValue="Votre campagne sera activée sous 24h.&#10;Vous recevrez un rapport détaillé à la fin de la campagne.&#10;Pour toute question, contactez-nous à contact@afromarket.com"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Afficher les détails de la campagne</Label>
                    <p className="text-xs text-muted-foreground">Inclure durée, impressions estimées, etc.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Afficher les dates de diffusion</Label>
                    <p className="text-xs text-muted-foreground">Indiquer les dates de début et fin</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              {/* Reçu Général */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Reçu Général</h3>
                    <p className="text-sm text-muted-foreground">Template pour les autres transactions</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Eye className="h-4 w-4" />
                    Prévisualiser
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="general-receipt-title">Titre du reçu</Label>
                  <Input id="general-receipt-title" defaultValue="Reçu de Paiement" placeholder="Reçu de Paiement" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="general-receipt-header">En-tête personnalisé</Label>
                  <Textarea
                    id="general-receipt-header"
                    placeholder="Texte affiché en haut du reçu..."
                    rows={2}
                    defaultValue="Merci pour votre paiement. Voici votre reçu."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="general-receipt-footer">Pied de page</Label>
                  <Textarea
                    id="general-receipt-footer"
                    placeholder="Mentions légales, conditions..."
                    rows={3}
                    defaultValue="Ce reçu fait office de justificatif de paiement.&#10;Pour toute question, contactez-nous à contact@afromarket.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Style et Apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence des reçus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receipt-color-primary">Couleur principale</Label>
                <div className="flex items-center gap-4">
                  <Input id="receipt-color-primary" type="color" defaultValue="#dc2626" className="h-10 w-20" />
                  <Input defaultValue="#dc2626" placeholder="#dc2626" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-color-secondary">Couleur secondaire</Label>
                <div className="flex items-center gap-4">
                  <Input id="receipt-color-secondary" type="color" defaultValue="#ea580c" className="h-10 w-20" />
                  <Input defaultValue="#ea580c" placeholder="#ea580c" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-font">Police de caractères</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="receipt-font">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                    <SelectItem value="arial">Arial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Afficher le logo</Label>
                  <p className="text-xs text-muted-foreground">Inclure le logo de l'entreprise</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Afficher le QR code</Label>
                  <p className="text-xs text-muted-foreground">QR code pour vérification en ligne</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mentions Légales</CardTitle>
              <CardDescription>Textes légaux obligatoires sur les reçus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="legal-mentions">Mentions légales</Label>
                <Textarea
                  id="legal-mentions"
                  placeholder="Mentions légales obligatoires..."
                  rows={4}
                  defaultValue="AfroMarket SAS - Capital social: 50 000€&#10;SIRET: 123 456 789 00012 - RCS Paris&#10;TVA intracommunautaire: FR12345678901&#10;Siège social: 123 Rue de la République, 75001 Paris, France"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-terms">Conditions de paiement</Label>
                <Textarea
                  id="payment-terms"
                  placeholder="Conditions de paiement..."
                  rows={3}
                  defaultValue="Paiement à réception. Pas d'escompte en cas de paiement anticipé.&#10;En cas de retard de paiement, des pénalités de 3 fois le taux d'intérêt légal seront appliquées.&#10;Une indemnité forfaitaire de 40€ pour frais de recouvrement sera due."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Test d'Envoi
              </CardTitle>
              <CardDescription>Envoyez un reçu de test pour vérifier la configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Envoyer un reçu de test</p>
                  <p className="text-sm text-muted-foreground">
                    Recevez un exemple de reçu par email pour vérifier le rendu
                  </p>
                </div>
                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setSendTestEmailOpen(true)}>
                  <Mail className="h-4 w-4" />
                  Envoyer un test
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exporter la configuration
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={previewReceipt !== null} onOpenChange={() => setPreviewReceipt(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Prévisualisation du Reçu {previewReceipt === "subscription" ? "d'Abonnement" : "de Publicité"}
            </DialogTitle>
            <DialogDescription>Aperçu du reçu tel qu'il sera envoyé aux clients</DialogDescription>
          </DialogHeader>
          {previewReceipt && <ReceiptPreview type={previewReceipt} />}
          <DialogFooter className="gap-2">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setPreviewReceipt(null)}>
              <X className="h-4 w-4" />
              Fermer
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Télécharger PDF
            </Button>
            <Button className="gap-2" onClick={() => setSendTestEmailOpen(true)}>
              <Mail className="h-4 w-4" />
              Envoyer par email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={sendTestEmailOpen} onOpenChange={setSendTestEmailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un Reçu de Test</DialogTitle>
            <DialogDescription>Entrez l'adresse email où vous souhaitez recevoir le reçu de test</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">Adresse email</Label>
              <Input id="test-email" type="email" placeholder="votre@email.com" defaultValue="admin@afromarket.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-receipt-type">Type de reçu</Label>
              <Select defaultValue="subscription">
                <SelectTrigger id="test-receipt-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscription">Reçu d'Abonnement</SelectItem>
                  <SelectItem value="advertising">Reçu de Publicité</SelectItem>
                  <SelectItem value="general">Reçu Général</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {testEmailSent && (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertDescription>Le reçu de test a été envoyé avec succès !</AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendTestEmailOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendTestEmail} className="gap-2">
              <Mail className="h-4 w-4" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
