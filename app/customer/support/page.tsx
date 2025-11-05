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
    <section className="px-4 py-10 sm:px-6 lg:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Support</h1>
        <p className="text-muted-foreground mt-2 text-base">
          Besoin d'aide ? Contactez notre équipe, nous sommes là pour vous aider.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Mail, title: "Email", desc: "support@afromarket.com", note: "Réponse sous 24h" },
          { icon: Phone, title: "Téléphone", desc: "+33 1 23 45 67 89", note: "Lun-Ven 9h-18h" },
          { icon: MessageSquare, title: "Chat en direct", desc: "Assistance instantanée", note: "", button: true },
        ].map((item, index) => {
          const Icon = item.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-col items-center lg:items-start">
                <Icon className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                <CardDescription className="text-base">{item.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center lg:items-start">
                {item.button ? (
                  <Button className="w-full sm:w-auto mt-2">Démarrer le chat</Button>
                ) : (
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Message Form */}
      <Card className="mt-10 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Envoyer un message</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="John Doe" required className="focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Select required>
                <SelectTrigger id="subject" className="focus:ring-2 focus:ring-blue-500">
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
              <Textarea
                id="message"
                placeholder="Décrivez votre problème ou votre question..."
                rows={6}
                required
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            >
              Envoyer le message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ Section */}
     {/* FAQ Section */}
<Card className="mt-10 shadow-sm hover:shadow-md transition-all duration-300">
  <CardHeader className="flex flex-col items-center lg:items-start">
    <HelpCircle className="h-8 w-8 text-blue-600 mb-2" />
    <CardTitle className="text-2xl font-semibold">Questions fréquentes</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {[
      {
        q: "Comment modifier mon profil ?",
        a: 'Allez dans "Mon profil" et cliquez sur "Modifier le profil" pour mettre à jour vos informations.',
      },
      {
        q: "Comment suivre ma commande ?",
        a: 'Rendez-vous dans la section "Commandes" pour voir l\'état de toutes vos commandes.',
      },
      {
        q: "Comment changer mon abonnement ?",
        a: 'Visitez "Mes abonnements" pour voir les plans disponibles et changer votre abonnement.',
      },
    ].map((faq, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-xl p-4 hover:bg-blue-50 transition-all duration-300"
      >
        <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-blue-600" />
          {faq.q}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
      </div>
    ))}
  </CardContent>
</Card>

    </section>
  )
}
