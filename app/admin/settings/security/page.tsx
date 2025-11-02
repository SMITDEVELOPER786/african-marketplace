"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Shield, Key, Clock, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SecuritySettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres de Sécurité</h1>
        <p className="text-sm text-muted-foreground">Configurez la sécurité de la plateforme</p>
      </div>

      {saved && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Les paramètres ont été enregistrés avec succès.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Authentification
            </CardTitle>
            <CardDescription>Paramètres d'authentification et de connexion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Authentification à deux facteurs (2FA)</Label>
                <p className="text-xs text-muted-foreground">Exiger la 2FA pour les administrateurs</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Connexion avec Google</Label>
                <p className="text-xs text-muted-foreground">Autoriser la connexion via Google OAuth</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Connexion avec Facebook</Label>
                <p className="text-xs text-muted-foreground">Autoriser la connexion via Facebook</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Durée de session (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" min="5" max="1440" />
              <p className="text-xs text-muted-foreground">Déconnexion automatique après inactivité</p>
            </div>
          </CardContent>
        </Card>

        {/* Password Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Politique de Mots de Passe
            </CardTitle>
            <CardDescription>Définissez les règles de sécurité des mots de passe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="min-length">Longueur minimale</Label>
              <Input id="min-length" type="number" defaultValue="8" min="6" max="32" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exiger des majuscules</Label>
                <p className="text-xs text-muted-foreground">Au moins une lettre majuscule</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exiger des chiffres</Label>
                <p className="text-xs text-muted-foreground">Au moins un chiffre</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exiger des caractères spéciaux</Label>
                <p className="text-xs text-muted-foreground">Au moins un caractère spécial (!@#$%...)</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Expiration du mot de passe (jours)</Label>
              <Input id="password-expiry" type="number" defaultValue="90" min="0" max="365" />
              <p className="text-xs text-muted-foreground">0 = pas d'expiration</p>
            </div>
          </CardContent>
        </Card>

        {/* Login Security */}
        <Card>
          <CardHeader>
            <CardTitle>Sécurité des Connexions</CardTitle>
            <CardDescription>Protection contre les tentatives de connexion malveillantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="max-attempts">Tentatives de connexion maximales</Label>
              <Input id="max-attempts" type="number" defaultValue="5" min="3" max="10" />
              <p className="text-xs text-muted-foreground">Nombre de tentatives avant blocage</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lockout-duration">Durée de blocage (minutes)</Label>
              <Input id="lockout-duration" type="number" defaultValue="30" min="5" max="1440" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Captcha sur la connexion</Label>
                <p className="text-xs text-muted-foreground">Afficher un captcha après plusieurs échecs</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notification de connexion suspecte</Label>
                <p className="text-xs text-muted-foreground">Alerter en cas de connexion inhabituelle</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Activity Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Journaux d'Activité
            </CardTitle>
            <CardDescription>Configuration des logs de sécurité</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enregistrer les connexions</Label>
                <p className="text-xs text-muted-foreground">Logger toutes les tentatives de connexion</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enregistrer les modifications</Label>
                <p className="text-xs text-muted-foreground">Logger les modifications de données sensibles</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-retention">Durée de conservation des logs (jours)</Label>
              <Input id="log-retention" type="number" defaultValue="90" min="30" max="365" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  )
}
