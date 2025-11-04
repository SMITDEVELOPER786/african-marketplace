"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Save, Globe, Clock, AlertCircle, Building2, FileText, MapPin, Share2, Upload, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function GeneralSettingsPage() {
  const pathname = usePathname()
  const [saved, setSaved] = useState(false)
  const [logo, setLogo] = useState<string | null>(null)
  const [favicon, setFavicon] = useState<string | null>(null)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFavicon(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const settingsNav = [
    { name: "Général", href: "/admin/settings/general" },
    { name: "Notifications", href: "/admin/settings/notifications" },
    { name: "Sécurité", href: "/admin/settings/security" },
    { name: "Emails", href: "/admin/settings/emails" },
    { name: "Paiements", href: "/admin/settings/payments" },
    { name: "Apparence", href: "/admin/settings/appearance" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres Généraux</h1>
        <p className="text-sm text-muted-foreground">
          Configurez les informations d'identification de l'application. Ces informations seront utilisées
          automatiquement partout dans l'application.
        </p>
      </div>

      {saved && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Les paramètres ont été enregistrés avec succès et seront appliqués partout dans l'application.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Identité & Image de Marque
            </CardTitle>
            <CardDescription>Logo, favicon et informations de base de l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Logo de l'application</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        {logo ? (
                          <div className="relative">
                            <img src={logo || "/placeholder.svg"} alt="Logo" className="h-20 mx-auto object-contain" />
                            <Button
                              size="icon"
                              variant="destructive"
                              className="absolute -top-2 -right-2 h-6 w-6"
                              onClick={(e) => {
                                e.preventDefault()
                                setLogo(null)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Cliquez pour télécharger</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max. 2MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Utilisé dans l'en-tête, les emails, les reçus et documents officiels
                </p>
              </div>

              {/* Favicon Upload */}
              <div className="space-y-2">
                <Label htmlFor="favicon-upload">Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        id="favicon-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFaviconUpload}
                      />
                      <label htmlFor="favicon-upload" className="cursor-pointer">
                        {favicon ? (
                          <div className="relative">
                            <img
                              src={favicon || "/placeholder.svg"}
                              alt="Favicon"
                              className="h-20 mx-auto object-contain"
                            />
                            <Button
                              size="icon"
                              variant="destructive"
                              className="absolute -top-2 -right-2 h-6 w-6"
                              onClick={(e) => {
                                e.preventDefault()
                                setFavicon(null)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Cliquez pour télécharger</p>
                            <p className="text-xs text-muted-foreground">ICO, PNG (32x32 ou 64x64)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Icône affichée dans l'onglet du navigateur</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-name">Nom de la plateforme</Label>
              <Input id="platform-name" defaultValue="AfroMarket" />
              <p className="text-xs text-muted-foreground">
                Utilisé dans le titre du site, les emails et les documents
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-description">Description</Label>
              <Textarea
                id="platform-description"
                defaultValue="Plateforme de mise en relation entre commerçants et clients"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Affichée dans les métadonnées SEO et les présentations</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website-url">Site web</Label>
              <Input id="website-url" type="url" placeholder="https://www.afromarket.com" />
              <p className="text-xs text-muted-foreground">URL principale de votre site web</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informations Légales
            </CardTitle>
            <CardDescription>Informations juridiques et administratives de l'entreprise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-legal-name">Raison sociale</Label>
                <Input id="company-legal-name" placeholder="AfroMarket SAS" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legal-form">Forme juridique</Label>
                <Select defaultValue="sas">
                  <SelectTrigger id="legal-form">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sas">SAS (Société par Actions Simplifiée)</SelectItem>
                    <SelectItem value="sarl">SARL (Société à Responsabilité Limitée)</SelectItem>
                    <SelectItem value="sa">SA (Société Anonyme)</SelectItem>
                    <SelectItem value="eurl">EURL (Entreprise Unipersonnelle à Responsabilité Limitée)</SelectItem>
                    <SelectItem value="sasu">SASU (Société par Actions Simplifiée Unipersonnelle)</SelectItem>
                    <SelectItem value="ei">EI (Entreprise Individuelle)</SelectItem>
                    <SelectItem value="auto">Auto-entrepreneur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siret">Numéro SIRET</Label>
                <Input id="siret" placeholder="123 456 789 00012" maxLength={17} />
                <p className="text-xs text-muted-foreground">14 chiffres (obligatoire pour les factures)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siren">Numéro SIREN</Label>
                <Input id="siren" placeholder="123 456 789" maxLength={11} />
                <p className="text-xs text-muted-foreground">9 chiffres</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vat-number">Numéro de TVA intracommunautaire</Label>
                <Input id="vat-number" placeholder="FR 12 345678901" />
                <p className="text-xs text-muted-foreground">Format: FR + 11 chiffres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rcs">RCS (Registre du Commerce et des Sociétés)</Label>
                <Input id="rcs" placeholder="Paris B 123 456 789" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capital">Capital social</Label>
                <Input id="capital" placeholder="10000" type="number" />
                <p className="text-xs text-muted-foreground">Montant en euros</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ape-code">Code APE/NAF</Label>
                <Input id="ape-code" placeholder="6201Z" />
                <p className="text-xs text-muted-foreground">Code d'activité principale</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Coordonnées & Adresse
            </CardTitle>
            <CardDescription>Adresse du siège social et informations de contact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address-street">Adresse</Label>
              <Input id="address-street" placeholder="123 Rue de la République" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address-postal">Code postal</Label>
                <Input id="address-postal" placeholder="75001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address-city">Ville</Label>
                <Input id="address-city" placeholder="Paris" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address-country">Pays</Label>
                <Select defaultValue="fr">
                  <SelectTrigger id="address-country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="be">Belgique</SelectItem>
                    <SelectItem value="ch">Suisse</SelectItem>
                    <SelectItem value="sn">Sénégal</SelectItem>
                    <SelectItem value="ci">Côte d'Ivoire</SelectItem>
                    <SelectItem value="cm">Cameroun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de contact</Label>
                <Input id="contact-email" type="email" defaultValue="contact@afromarket.com" />
                <p className="text-xs text-muted-foreground">Email principal pour les clients</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Email support</Label>
                <Input id="support-email" type="email" placeholder="support@afromarket.com" />
                <p className="text-xs text-muted-foreground">Email pour le support technique</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="support-phone">Téléphone support</Label>
                <Input id="support-phone" type="tel" defaultValue="+33 1 23 45 67 89" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">Numéro WhatsApp Business</Label>
                <Input id="whatsapp-number" type="tel" placeholder="+33 6 12 34 56 78" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Réseaux Sociaux
            </CardTitle>
            <CardDescription>Liens vers vos profils sur les réseaux sociaux</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook-url">Facebook</Label>
                <Input id="facebook-url" type="url" placeholder="https://facebook.com/afromarket" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram-url">Instagram</Label>
                <Input id="instagram-url" type="url" placeholder="https://instagram.com/afromarket" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter-url">Twitter / X</Label>
                <Input id="twitter-url" type="url" placeholder="https://twitter.com/afromarket" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin-url">LinkedIn</Label>
                <Input id="linkedin-url" type="url" placeholder="https://linkedin.com/company/afromarket" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="youtube-url">YouTube</Label>
                <Input id="youtube-url" type="url" placeholder="https://youtube.com/@afromarket" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok-url">TikTok</Label>
                <Input id="tiktok-url" type="url" placeholder="https://tiktok.com/@afromarket" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de la Plateforme</CardTitle>
            <CardDescription>Informations générales affichées sur le site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Nom de la plateforme</Label>
              <Input id="platform-name" defaultValue="AfroMarket" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-description">Description</Label>
              <Textarea
                id="platform-description"
                defaultValue="Plateforme de mise en relation entre commerçants et clients"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Localization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Localisation
            </CardTitle>
            <CardDescription>Paramètres de langue et de fuseau horaire</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-language">Langue par défaut</Label>
              <Select defaultValue="fr">
                <SelectTrigger id="default-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select defaultValue="europe/paris">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe/paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="africa/dakar">Africa/Dakar (GMT+0)</SelectItem>
                  <SelectItem value="africa/abidjan">Africa/Abidjan (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Devise par défaut</Label>
              <Select defaultValue="eur">
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                  <SelectItem value="usd">Dollar ($)</SelectItem>
                  <SelectItem value="xof">Franc CFA (XOF)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres Commerciaux</CardTitle>
            <CardDescription>Configuration des règles commerciales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="commission-rate">Taux de commission (%)</Label>
              <Input id="commission-rate" type="number" defaultValue="15" min="0" max="100" step="0.1" />
              <p className="text-xs text-muted-foreground">Commission prélevée sur chaque transaction</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-order">Montant minimum de commande (€)</Label>
              <Input id="min-order" type="number" defaultValue="10" min="0" step="0.5" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validation manuelle des commerces</Label>
                <p className="text-xs text-muted-foreground">Les nouveaux commerces doivent être approuvés</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modération des avis</Label>
                <p className="text-xs text-muted-foreground">Les avis doivent être approuvés avant publication</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Mode Maintenance
            </CardTitle>
            <CardDescription>Activer le mode maintenance pour effectuer des mises à jour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Activer le mode maintenance</Label>
                <p className="text-xs text-muted-foreground">Le site affichera un message de maintenance</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Message de maintenance</Label>
              <Textarea
                id="maintenance-message"
                defaultValue="Nous effectuons actuellement une maintenance. Nous serons de retour bientôt."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Réinitialiser</Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  )
}
