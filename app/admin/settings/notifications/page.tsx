"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bell, Mail, MessageSquare, AlertCircle, Send, Phone, Eye, Copy, Plus, Edit } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Types de notifications disponibles dans l'application
const notificationTypes = [
  {
    id: "user_welcome",
    name: "Bienvenue utilisateur",
    description: "Envoyé lors de l'inscription d'un nouvel utilisateur",
    category: "Utilisateurs",
    variables: ["{{name}}", "{{email}}", "{{date}}"],
  },
  {
    id: "user_password_reset",
    name: "Réinitialisation mot de passe",
    description: "Envoyé lors d'une demande de réinitialisation",
    category: "Utilisateurs",
    variables: ["{{name}}", "{{email}}", "{{reset_link}}", "{{expiry}}"],
  },
  {
    id: "reservation_confirmed",
    name: "Réservation confirmée",
    description: "Confirmation de réservation pour le client",
    category: "Réservations",
    variables: ["{{name}}", "{{business}}", "{{date}}", "{{time}}", "{{reference}}"],
  },
  {
    id: "reservation_reminder",
    name: "Rappel de réservation",
    description: "Rappel envoyé avant la réservation",
    category: "Réservations",
    variables: ["{{name}}", "{{business}}", "{{date}}", "{{time}}"],
  },
  {
    id: "reservation_cancelled",
    name: "Réservation annulée",
    description: "Notification d'annulation de réservation",
    category: "Réservations",
    variables: ["{{name}}", "{{business}}", "{{date}}", "{{reason}}"],
  },
  {
    id: "business_approved",
    name: "Commerce approuvé",
    description: "Notification d'approbation du commerce",
    category: "Commerces",
    variables: ["{{business_name}}", "{{owner_name}}", "{{approval_date}}"],
  },
  {
    id: "business_rejected",
    name: "Commerce rejeté",
    description: "Notification de rejet du commerce",
    category: "Commerces",
    variables: ["{{business_name}}", "{{owner_name}}", "{{reason}}"],
  },
  {
    id: "subscription_expiring",
    name: "Abonnement expirant",
    description: "Rappel avant expiration de l'abonnement",
    category: "Abonnements",
    variables: ["{{business_name}}", "{{plan}}", "{{expiry_date}}", "{{days_left}}"],
  },
  {
    id: "subscription_expired",
    name: "Abonnement expiré",
    description: "Notification d'expiration de l'abonnement",
    category: "Abonnements",
    variables: ["{{business_name}}", "{{plan}}", "{{expired_date}}"],
  },
  {
    id: "payment_received",
    name: "Paiement reçu",
    description: "Confirmation de réception de paiement",
    category: "Paiements",
    variables: ["{{name}}", "{{amount}}", "{{date}}", "{{reference}}", "{{invoice_link}}"],
  },
  {
    id: "review_received",
    name: "Nouvel avis reçu",
    description: "Notification de nouvel avis pour le commerce",
    category: "Avis",
    variables: ["{{business_name}}", "{{customer_name}}", "{{rating}}", "{{comment}}"],
  },
  {
    id: "ad_approved",
    name: "Publicité approuvée",
    description: "Notification d'approbation de campagne publicitaire",
    category: "Publicités",
    variables: ["{{business_name}}", "{{campaign_name}}", "{{duration}}", "{{start_date}}"],
  },
]

export default function NotificationsSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [testSent, setTestSent] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [previewChannel, setPreviewChannel] = useState<"email" | "sms" | "whatsapp">("email")

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSendTest = () => {
    setTestSent(true)
    setTimeout(() => setTestSent(false), 3000)
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Notifications & Communications</h1>
        <p className="text-sm text-muted-foreground">
          Gérez tous les canaux de communication (Email, SMS, WhatsApp) et personnalisez les messages
        </p>
      </div>

      {saved && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Les paramètres ont été enregistrés avec succès.</AlertDescription>
        </Alert>
      )}

      {testSent && (
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>Message de test envoyé avec succès.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="channels" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="channels" className="gap-2">
            <Bell className="h-4 w-4" />
            Canaux
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Mail className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="rules" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Règles
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Eye className="h-4 w-4" />
            Historique
          </TabsTrigger>
          <TabsTrigger value="stats" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Statistiques
          </TabsTrigger>
        </TabsList>

        {/* ONGLET 1: CONFIGURATION DES CANAUX */}
        <TabsContent value="channels" className="space-y-6">
          {/* Configuration Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configuration Email (SMTP)
              </CardTitle>
              <CardDescription>Paramètres du serveur d'envoi d'emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer les emails</Label>
                  <p className="text-xs text-muted-foreground">Autoriser l'envoi d'emails</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">Serveur SMTP</Label>
                  <Input id="smtp-host" placeholder="smtp.example.com" defaultValue="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Port</Label>
                  <Input id="smtp-port" type="number" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">Nom d'utilisateur</Label>
                  <Input id="smtp-user" type="email" placeholder="noreply@afromarket.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Mot de passe</Label>
                  <Input id="smtp-password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-encryption">Chiffrement</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="smtp-encryption">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="none">Aucun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-email">Email expéditeur</Label>
                  <Input id="from-email" type="email" defaultValue="noreply@afromarket.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-name">Nom expéditeur</Label>
                  <Input id="from-name" defaultValue="AfroMarket" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reply-to">Email de réponse</Label>
                  <Input id="reply-to" type="email" defaultValue="support@afromarket.com" />
                </div>
              </div>
              <Button onClick={handleSendTest} variant="outline" className="gap-2 bg-transparent">
                <Send className="h-4 w-4" />
                Envoyer un email de test
              </Button>
            </CardContent>
          </Card>

          {/* Configuration SMS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Configuration SMS
              </CardTitle>
              <CardDescription>Paramètres du service d'envoi de SMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer les SMS</Label>
                  <p className="text-xs text-muted-foreground">Autoriser l'envoi de SMS</p>
                </div>
                <Switch />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sms-provider">Fournisseur SMS</Label>
                  <Select defaultValue="twilio">
                    <SelectTrigger id="sms-provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="vonage">Vonage</SelectItem>
                      <SelectItem value="messagebird">MessageBird</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-sender">Numéro expéditeur</Label>
                  <Input id="sms-sender" placeholder="+33 1 23 45 67 89" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-api-key">Clé API</Label>
                  <Input id="sms-api-key" type="password" placeholder="Entrez votre clé API" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-api-secret">Secret API</Label>
                  <Input id="sms-api-secret" type="password" placeholder="Entrez votre secret API" />
                </div>
              </div>
              <Button onClick={handleSendTest} variant="outline" className="gap-2 bg-transparent">
                <Send className="h-4 w-4" />
                Envoyer un SMS de test
              </Button>
            </CardContent>
          </Card>

          {/* Configuration WhatsApp */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Configuration WhatsApp Business
              </CardTitle>
              <CardDescription>Paramètres du service WhatsApp Business API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer WhatsApp</Label>
                  <p className="text-xs text-muted-foreground">Autoriser l'envoi de messages WhatsApp</p>
                </div>
                <Switch />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">Numéro WhatsApp Business</Label>
                  <Input id="whatsapp-number" placeholder="+33 1 23 45 67 89" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-business-id">ID Business</Label>
                  <Input id="whatsapp-business-id" placeholder="Entrez votre Business ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-token">Token d'accès</Label>
                  <Input id="whatsapp-token" type="password" placeholder="Entrez votre token" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone-id">ID du téléphone</Label>
                  <Input id="whatsapp-phone-id" placeholder="Entrez l'ID du téléphone" />
                </div>
              </div>
              <Button onClick={handleSendTest} variant="outline" className="gap-2 bg-transparent">
                <Send className="h-4 w-4" />
                Envoyer un message WhatsApp de test
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ONGLET 2: TEMPLATES DE MESSAGES */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Templates de Messages</CardTitle>
                  <CardDescription>Personnalisez les messages pour chaque événement de l'application</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Nouveau template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau template</DialogTitle>
                      <DialogDescription>Créez un template personnalisé pour un événement spécifique</DialogDescription>
                    </DialogHeader>
                    {/* Formulaire de création de template */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Type d'événement</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un événement" />
                          </SelectTrigger>
                          <SelectContent>
                            {notificationTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name} - {type.category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Nom du template</Label>
                        <Input placeholder="Ex: Bienvenue utilisateur - Version 2" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filtres par catégorie */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer">
                    Tous
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Utilisateurs
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Réservations
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Commerces
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Abonnements
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Paiements
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Avis
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Publicités
                  </Badge>
                </div>

                {/* Liste des templates */}
                <div className="space-y-3">
                  {notificationTypes.map((type) => (
                    <Dialog key={type.id}>
                      <DialogTrigger asChild>
                        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{type.name}</h4>
                                  <Badge variant="secondary" className="text-xs">
                                    {type.category}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs gap-1">
                                    <Mail className="h-3 w-3" />
                                    Email
                                  </Badge>
                                  <Badge variant="outline" className="text-xs gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    SMS
                                  </Badge>
                                  <Badge variant="outline" className="text-xs gap-1">
                                    <Phone className="h-3 w-3" />
                                    WhatsApp
                                  </Badge>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Edit className="h-4 w-4" />
                                Modifier
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{type.name}</DialogTitle>
                          <DialogDescription>{type.description}</DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="email" className="space-y-4">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="email" className="gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </TabsTrigger>
                            <TabsTrigger value="sms" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              SMS
                            </TabsTrigger>
                            <TabsTrigger value="whatsapp" className="gap-2">
                              <Phone className="h-4 w-4" />
                              WhatsApp
                            </TabsTrigger>
                          </TabsList>

                          {/* Template Email */}
                          <TabsContent value="email" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label>Activer l'email</Label>
                                    <Switch defaultChecked />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`${type.id}-email-subject`}>Sujet de l'email</Label>
                                  <Input id={`${type.id}-email-subject`} placeholder="Ex: Bienvenue sur AfroMarket !" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`${type.id}-email-body`}>Corps du message</Label>
                                  <Textarea
                                    id={`${type.id}-email-body`}
                                    rows={12}
                                    placeholder="Rédigez votre message ici..."
                                  />
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    <p className="text-xs text-muted-foreground w-full mb-1">Variables disponibles:</p>
                                    {type.variables.map((variable) => (
                                      <Button
                                        key={variable}
                                        variant="outline"
                                        size="sm"
                                        className="h-6 text-xs gap-1 bg-transparent"
                                        onClick={() => {
                                          navigator.clipboard.writeText(variable)
                                        }}
                                      >
                                        {variable}
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Prévisualisation</Label>
                                <div className="border rounded-lg p-4 bg-muted/50 min-h-[400px]">
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium">De: AfroMarket</div>
                                    <div className="text-sm font-medium">Sujet: Bienvenue sur AfroMarket !</div>
                                    <hr className="my-4" />
                                    <div className="text-sm whitespace-pre-wrap">
                                      Bonjour John Doe,
                                      {"\n\n"}
                                      Bienvenue sur AfroMarket ! Nous sommes ravis de vous compter parmi nous.
                                      {"\n\n"}
                                      Vous pouvez dès maintenant découvrir nos commerces et restaurants.
                                      {"\n\n"}À bientôt,
                                      {"\n"}
                                      L'équipe AfroMarket
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          {/* Template SMS */}
                          <TabsContent value="sms" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label>Activer le SMS</Label>
                                    <Switch />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`${type.id}-sms-body`}>Message SMS</Label>
                                  <Textarea
                                    id={`${type.id}-sms-body`}
                                    rows={6}
                                    placeholder="Rédigez votre SMS (max 160 caractères)..."
                                    maxLength={160}
                                  />
                                  <p className="text-xs text-muted-foreground">0 / 160 caractères</p>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    <p className="text-xs text-muted-foreground w-full mb-1">Variables disponibles:</p>
                                    {type.variables.map((variable) => (
                                      <Button
                                        key={variable}
                                        variant="outline"
                                        size="sm"
                                        className="h-6 text-xs gap-1 bg-transparent"
                                        onClick={() => {
                                          navigator.clipboard.writeText(variable)
                                        }}
                                      >
                                        {variable}
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Prévisualisation</Label>
                                <div className="border rounded-lg p-4 bg-muted/50">
                                  <div className="bg-background rounded-lg p-3 shadow-sm">
                                    <div className="text-xs text-muted-foreground mb-2">
                                      De: AfroMarket (+33 1 23 45 67 89)
                                    </div>
                                    <div className="text-sm">
                                      Bonjour John, bienvenue sur AfroMarket ! Découvrez nos commerces dès maintenant.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          {/* Template WhatsApp */}
                          <TabsContent value="whatsapp" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label>Activer WhatsApp</Label>
                                    <Switch />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`${type.id}-whatsapp-body`}>Message WhatsApp</Label>
                                  <Textarea
                                    id={`${type.id}-whatsapp-body`}
                                    rows={8}
                                    placeholder="Rédigez votre message WhatsApp..."
                                  />
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    <p className="text-xs text-muted-foreground w-full mb-1">Variables disponibles:</p>
                                    {type.variables.map((variable) => (
                                      <Button
                                        key={variable}
                                        variant="outline"
                                        size="sm"
                                        className="h-6 text-xs gap-1 bg-transparent"
                                        onClick={() => {
                                          navigator.clipboard.writeText(variable)
                                        }}
                                      >
                                        {variable}
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Prévisualisation</Label>
                                <div className="border rounded-lg p-4 bg-muted/50">
                                  <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-3 shadow-sm">
                                    <div className="text-xs text-muted-foreground mb-2">AfroMarket Business</div>
                                    <div className="text-sm">
                                      Bonjour John,
                                      {"\n\n"}
                                      Bienvenue sur AfroMarket ! 🎉{"\n\n"}
                                      Découvrez nos commerces et restaurants africains dès maintenant.
                                      {"\n\n"}À bientôt !
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={handleSendTest} className="gap-2 bg-transparent">
                            <Send className="h-4 w-4" />
                            Envoyer un test
                          </Button>
                          <Button onClick={handleSave} className="gap-2">
                            <Save className="h-4 w-4" />
                            Enregistrer
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ONGLET 3: RÈGLES D'ENVOI */}
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Règles d'Envoi Automatique</CardTitle>
              <CardDescription>Configurez les règles d'envoi automatique des notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Horaires d'envoi */}
              <div className="space-y-4">
                <h3 className="font-medium">Horaires d'envoi</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="send-start">Heure de début</Label>
                    <Input id="send-start" type="time" defaultValue="08:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="send-end">Heure de fin</Label>
                    <Input id="send-end" type="time" defaultValue="22:00" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Les notifications ne seront pas envoyées en dehors de ces horaires
                </p>
              </div>

              {/* Fréquence d'envoi */}
              <div className="space-y-4">
                <h3 className="font-medium">Fréquence d'envoi</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Limiter les emails par utilisateur</Label>
                      <p className="text-xs text-muted-foreground">Nombre maximum d'emails par jour</p>
                    </div>
                    <Input type="number" className="w-20" defaultValue="5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Limiter les SMS par utilisateur</Label>
                      <p className="text-xs text-muted-foreground">Nombre maximum de SMS par jour</p>
                    </div>
                    <Input type="number" className="w-20" defaultValue="3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Limiter les messages WhatsApp</Label>
                      <p className="text-xs text-muted-foreground">Nombre maximum de messages par jour</p>
                    </div>
                    <Input type="number" className="w-20" defaultValue="3" />
                  </div>
                </div>
              </div>

              {/* Groupes de destinataires */}
              <div className="space-y-4">
                <h3 className="font-medium">Groupes de Destinataires</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Envoyer aux clients</Label>
                      <p className="text-xs text-muted-foreground">Notifications pour les utilisateurs clients</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Envoyer aux commerçants</Label>
                      <p className="text-xs text-muted-foreground">Notifications pour les commerçants</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Envoyer aux restaurateurs</Label>
                      <p className="text-xs text-muted-foreground">Notifications pour les restaurateurs</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Envoyer aux administrateurs</Label>
                      <p className="text-xs text-muted-foreground">Notifications pour les administrateurs</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              {/* Rappels automatiques */}
              <div className="space-y-4">
                <h3 className="font-medium">Rappels Automatiques</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rappel de réservation</Label>
                      <p className="text-xs text-muted-foreground">Envoyer un rappel avant la réservation</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" className="w-16" defaultValue="24" />
                      <span className="text-sm">heures avant</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rappel d'abonnement expirant</Label>
                      <p className="text-xs text-muted-foreground">Rappel avant expiration de l'abonnement</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" className="w-16" defaultValue="7" />
                      <span className="text-sm">jours avant</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ONGLET 4: HISTORIQUE */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Notifications</CardTitle>
              <CardDescription>Consultez l'historique des notifications envoyées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filtres */}
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="sent">Envoyé</SelectItem>
                      <SelectItem value="failed">Échoué</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Rechercher..." className="max-w-xs" />
                </div>

                {/* Tableau d'historique */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Canal</TableHead>
                        <TableHead>Destinataire</TableHead>
                        <TableHead>Sujet</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-sm">2025-01-20 14:30</TableCell>
                        <TableCell>
                          <Badge variant="outline">Bienvenue</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="gap-1">
                            <Mail className="h-3 w-3" />
                            Email
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">john@example.com</TableCell>
                        <TableCell className="text-sm">Bienvenue sur AfroMarket !</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Envoyé</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-sm">2025-01-20 14:25</TableCell>
                        <TableCell>
                          <Badge variant="outline">Réservation</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="gap-1">
                            <MessageSquare className="h-3 w-3" />
                            SMS
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">+33 6 12 34 56 78</TableCell>
                        <TableCell className="text-sm">Votre réservation est confirmée</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Envoyé</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-sm">2025-01-20 14:20</TableCell>
                        <TableCell>
                          <Badge variant="outline">Rappel</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="gap-1">
                            <Phone className="h-3 w-3" />
                            WhatsApp
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">+33 6 98 76 54 32</TableCell>
                        <TableCell className="text-sm">Rappel de réservation demain</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Envoyé</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-sm">2025-01-20 14:15</TableCell>
                        <TableCell>
                          <Badge variant="outline">Paiement</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="gap-1">
                            <Mail className="h-3 w-3" />
                            Email
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">jane@example.com</TableCell>
                        <TableCell className="text-sm">Paiement reçu - Facture #1234</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Échoué</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ONGLET 5: STATISTIQUES */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Emails envoyés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">Ce mois-ci</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">SMS envoyés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-xs text-muted-foreground">Ce mois-ci</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Messages WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">789</div>
                <p className="text-xs text-muted-foreground">Ce mois-ci</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux de succès</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">Tous canaux</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques Détaillées</CardTitle>
              <CardDescription>Performance des notifications par canal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Email Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="font-medium">Email</span>
                    </div>
                    <span className="text-sm text-muted-foreground">1,234 envoyés</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux d'ouverture</p>
                      <p className="text-lg font-bold">45.2%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux de clic</p>
                      <p className="text-lg font-bold">12.8%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux d'échec</p>
                      <p className="text-lg font-bold">1.2%</p>
                    </div>
                  </div>
                </div>

                {/* SMS Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="font-medium">SMS</span>
                    </div>
                    <span className="text-sm text-muted-foreground">456 envoyés</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux de livraison</p>
                      <p className="text-lg font-bold">99.1%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux de réponse</p>
                      <p className="text-lg font-bold">8.5%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux d'échec</p>
                      <p className="text-lg font-bold">0.9%</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">WhatsApp</span>
                    </div>
                    <span className="text-sm text-muted-foreground">789 envoyés</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux de livraison</p>
                      <p className="text-lg font-bold">98.7%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux de lecture</p>
                      <p className="text-lg font-bold">87.3%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Taux d'échec</p>
                      <p className="text-lg font-bold">1.3%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Enregistrer toutes les modifications
        </Button>
      </div>
    </div>
  )
}
