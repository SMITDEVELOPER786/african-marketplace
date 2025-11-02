"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, Palette, Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AppearanceSettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres d'Apparence</h1>
        <p className="text-sm text-muted-foreground">Personnalisez l'apparence de la plateforme</p>
      </div>

      {saved && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Les paramètres ont été enregistrés avec succès.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle>Identité Visuelle</CardTitle>
            <CardDescription>Logo et favicon de la plateforme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Logo principal</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-muted">
                  <span className="text-2xl font-bold">A</span>
                </div>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Télécharger un logo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Format recommandé: PNG, 512x512px</p>
            </div>
            <div className="space-y-2">
              <Label>Favicon</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded border bg-muted">
                  <span className="text-sm font-bold">A</span>
                </div>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Télécharger un favicon
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Format recommandé: ICO ou PNG, 32x32px</p>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Couleurs de Marque
            </CardTitle>
            <CardDescription>Personnalisez les couleurs de la plateforme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Couleur primaire</Label>
                <div className="flex gap-2">
                  <Input id="primary-color" type="color" defaultValue="#ef4444" className="h-10 w-20" />
                  <Input defaultValue="#ef4444" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Couleur secondaire</Label>
                <div className="flex gap-2">
                  <Input id="secondary-color" type="color" defaultValue="#3b82f6" className="h-10 w-20" />
                  <Input defaultValue="#3b82f6" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accent-color">Couleur d'accent</Label>
                <div className="flex gap-2">
                  <Input id="accent-color" type="color" defaultValue="#10b981" className="h-10 w-20" />
                  <Input defaultValue="#10b981" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="background-color">Couleur de fond</Label>
                <div className="flex gap-2">
                  <Input id="background-color" type="color" defaultValue="#ffffff" className="h-10 w-20" />
                  <Input defaultValue="#ffffff" className="flex-1" />
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Réinitialiser les couleurs par défaut
            </Button>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typographie</CardTitle>
            <CardDescription>Polices de caractères utilisées</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-heading">Police des titres</Label>
              <Input id="font-heading" defaultValue="Inter" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-body">Police du texte</Label>
              <Input id="font-body" defaultValue="Inter" />
            </div>
          </CardContent>
        </Card>

        {/* Custom CSS */}
        <Card>
          <CardHeader>
            <CardTitle>CSS Personnalisé</CardTitle>
            <CardDescription>Ajoutez du CSS personnalisé (avancé)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-css">Code CSS</Label>
              <textarea
                id="custom-css"
                className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                placeholder="/* Votre CSS personnalisé */"
              />
              <p className="text-xs text-muted-foreground">
                Attention: Un CSS mal formaté peut affecter l'apparence du site
              </p>
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
