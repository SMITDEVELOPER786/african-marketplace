"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, Users, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { SecondaryNav } from "@/components/marketplace/secondary-nav"
import { SearchBar } from "@/components/marketplace/search-bar"

const MOCK_RESTAURANT = {
  id: "1",
  name: "Mama Africa Restaurant",
  imageUrl: "/african-restaurant-interior.jpg",
  location: "45 Rue de Belleville, 75019 Paris, France",
}

export default function ReservationPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Réservation confirmée !",
      description: "Vous recevrez un email de confirmation sous peu.",
    })

    setIsSubmitting(false)
    router.push(`/restaurants/${params.id}`)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <SecondaryNav />

      <div className="border-b bg-muted/30 sticky top-[64px] z-30 backdrop-blur supports-[backdrop-filter]:bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar variant="compact" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href={`/restaurants/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au restaurant
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Réserver une table</CardTitle>
                <CardDescription>Remplissez le formulaire pour réserver votre table</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Vos informations</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="jean.dupont@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Détails de la réservation</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="date"
                            type="date"
                            required
                            className="pl-9"
                            value={formData.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Heure *</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="time"
                            type="time"
                            required
                            className="pl-9"
                            value={formData.time}
                            onChange={(e) => handleChange("time", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Nombre de personnes *</Label>
                      <Select value={formData.guests} onValueChange={(value) => handleChange("guests", value)}>
                        <SelectTrigger id="guests">
                          <Users className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={String(num)}>
                              {num} {num === 1 ? "personne" : "personnes"}
                            </SelectItem>
                          ))}
                          <SelectItem value="10+">Plus de 10 personnes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Demandes spéciales (optionnel)</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleChange("specialRequests", e.target.value)}
                      placeholder="Allergies, régime alimentaire, occasion spéciale..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Envoi en cours...</>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Confirmer la réservation
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Restaurant Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <img
                    src={MOCK_RESTAURANT.imageUrl || "/placeholder.svg?height=200&width=400"}
                    alt={MOCK_RESTAURANT.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">{MOCK_RESTAURANT.name}</h3>
                  <p className="text-sm text-muted-foreground">{MOCK_RESTAURANT.location}</p>
                </div>

                {formData.date && formData.time && (
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(formData.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {formData.guests} {formData.guests === "1" ? "personne" : "personnes"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                    Confirmation immédiate par email
                  </p>
                  <p className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                    Annulation gratuite jusqu'à 24h avant
                  </p>
                  <p className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                    Service client disponible 7j/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
