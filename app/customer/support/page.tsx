"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MessageSquare, HelpCircle } from "lucide-react"

export default function SupportPage() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message envoyé",
      description: "Notre équipe vous répondra dans les plus brefs délais.",
    })
  }

  return (
    <div className="section-spacing">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground mt-2">Besoin d'aide ? Contactez notre équipe</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Mail className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Email</CardTitle>
            <CardDescription>support@afromarket.com</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Phone className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Téléphone</CardTitle>
            <CardDescription>+33 1 23 45 67 89</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Chat en direct</CardTitle>
            <CardDescription>Assistance instantanée</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Démarrer le chat</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Envoyer un message</CardTitle>
          <CardDescription>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Select required>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Sélectionnez un sujet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Problème de compte</SelectItem>
                  <SelectItem value="order">Question sur une commande</SelectItem>
                  <SelectItem value="payment">Problème de paiement</SelectItem>
                  <SelectItem value="technical">Problème technique</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Décrivez votre problème ou votre question..." rows={6} required />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              Envoyer le message
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <HelpCircle className="h-8 w-8 text-blue-600 mb-2" />
          <CardTitle>Questions fréquentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Comment modifier mon profil ?</h3>
            <p className="text-sm text-muted-foreground">
              Allez dans "Mon profil" et cliquez sur "Modifier le profil" pour mettre à jour vos informations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Comment suivre ma commande ?</h3>
            <p className="text-sm text-muted-foreground">
              Rendez-vous dans la section "Commandes" pour voir l'état de toutes vos commandes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Comment changer mon abonnement ?</h3>
            <p className="text-sm text-muted-foreground">
              Visitez "Mes abonnements" pour voir les plans disponibles et changer votre abonnement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
