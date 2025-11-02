"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Mail, Send, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmailsSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [testSent, setTestSent] = useState(false)

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
        <h1 className="text-2xl font-bold">Paramètres des Emails</h1>
        <p className="text-sm text-muted-foreground">Configurez les emails et templates</p>
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
          <AlertDescription>Email de test envoyé avec succès.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="smtp" className="space-y-6">
        <TabsList>
          <TabsTrigger value="smtp">Configuration SMTP</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="smtp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configuration SMTP
              </CardTitle>
              <CardDescription>Paramètres du serveur d'envoi d'emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex gap-2">
                <Button onClick={handleSendTest} variant="outline" className="gap-2 bg-transparent">
                  <Send className="h-4 w-4" />
                  Envoyer un email de test
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email de Bienvenue</CardTitle>
              <CardDescription>Template envoyé lors de l'inscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-subject">Sujet</Label>
                <Input id="welcome-subject" defaultValue="Bienvenue sur AfroMarket !" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcome-body">Corps du message</Label>
                <Textarea
                  id="welcome-body"
                  rows={6}
                  defaultValue="Bonjour {{name}},\n\nBienvenue sur AfroMarket ! Nous sommes ravis de vous compter parmi nous.\n\nVous pouvez dès maintenant découvrir nos commerces et restaurants.\n\nÀ bientôt,\nL'équipe AfroMarket"
                />
                <p className="text-xs text-muted-foreground">
                  Variables disponibles: {`{{name}}, {{email}}, {{date}}`}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confirmation de Commande</CardTitle>
              <CardDescription>Template envoyé après une commande</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order-subject">Sujet</Label>
                <Input id="order-subject" defaultValue="Confirmation de votre commande #{{order_id}}" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-body">Corps du message</Label>
                <Textarea
                  id="order-body"
                  rows={6}
                  defaultValue="Bonjour {{name}},\n\nVotre commande #{{order_id}} a bien été confirmée.\n\nMontant total: {{amount}}€\nStatut: {{status}}\n\nMerci pour votre confiance !\n\nL'équipe AfroMarket"
                />
                <p className="text-xs text-muted-foreground">
                  Variables disponibles: {`{{name}}, {{order_id}}, {{amount}}, {{status}}, {{items}}`}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Réinitialisation de Mot de Passe</CardTitle>
              <CardDescription>Template pour la réinitialisation du mot de passe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-subject">Sujet</Label>
                <Input id="reset-subject" defaultValue="Réinitialisation de votre mot de passe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reset-body">Corps du message</Label>
                <Textarea
                  id="reset-body"
                  rows={6}
                  defaultValue="Bonjour {{name}},\n\nVous avez demandé la réinitialisation de votre mot de passe.\n\nCliquez sur le lien suivant pour créer un nouveau mot de passe:\n{{reset_link}}\n\nCe lien expire dans 24 heures.\n\nSi vous n'avez pas fait cette demande, ignorez cet email.\n\nL'équipe AfroMarket"
                />
                <p className="text-xs text-muted-foreground">
                  Variables disponibles: {`{{name}}, {{email}}, {{reset_link}}`}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}
