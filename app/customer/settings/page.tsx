"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    language: "fr",
    currency: "EUR",
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacy: {
      profilePublic: false,
      showEmail: false,
      dataSharing: false,
    },
  })

  const handleSave = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos préférences ont été mises à jour avec succès.",
    })
  }

  return (
    <div className="section-spacing max-w-4xl pt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-center md:text-left">Paramètres</h1>
        <p className="text-muted-foreground mt-2 text-center md:text-left">Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Préférences régionales</CardTitle>
            <CardDescription>Configurez votre langue et devise préférées</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => setSettings({ ...settings, language: value })}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                  <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Devise</Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => setSettings({ ...settings, currency: value })}
              >
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                  <SelectItem value="USD">USD ($) - Dollar américain</SelectItem>
                  <SelectItem value="CAD">CAD ($) - Dollar canadien</SelectItem>
                  <SelectItem value="GBP">GBP (£) - Livre sterling</SelectItem>
                  <SelectItem value="CHF">CHF (Fr) - Franc suisse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choisissez comment vous souhaitez être notifié</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notif">Notifications par e-mail</Label>
                <p className="text-sm text-muted-foreground">Recevez des mises à jour par e-mail</p>
              </div>
              <Switch
                id="email-notif"
                checked={settings.notifications.email}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, email: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notif">Notifications push</Label>
                <p className="text-sm text-muted-foreground">Recevez des notifications sur votre appareil</p>
              </div>
              <Switch
                id="push-notif"
                checked={settings.notifications.push}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, push: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notif">Notifications SMS</Label>
                <p className="text-sm text-muted-foreground">Recevez des alertes par SMS</p>
              </div>
              <Switch
                id="sms-notif"
                checked={settings.notifications.sms}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, sms: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidentialité et données</CardTitle>
            <CardDescription>Gérez vos paramètres de confidentialité (RGPD/CCPA)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profile-public">Profil public</Label>
                <p className="text-sm text-muted-foreground">Rendre votre profil visible aux autres utilisateurs</p>
              </div>
              <Switch
                id="profile-public"
                checked={settings.privacy.profilePublic}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, profilePublic: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-email">Afficher l'e-mail</Label>
                <p className="text-sm text-muted-foreground">Permettre aux autres de voir votre adresse e-mail</p>
              </div>
              <Switch
                id="show-email"
                checked={settings.privacy.showEmail}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, showEmail: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-sharing">Partage de données</Label>
                <p className="text-sm text-muted-foreground">Autoriser le partage de données anonymisées</p>
              </div>
              <Switch
                id="data-sharing"
                checked={settings.privacy.dataSharing}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, dataSharing: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2 pt-4">
              <Button variant="outline" className="w-full bg-transparent">
                Télécharger mes données (RGPD)
              </Button>
              <Button variant="destructive" className="w-full">
                Supprimer mon compte
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Annuler</Button>
          <Button onClick={handleSave} className="bg-primary ">
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  )
}