"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { ArrowLeft, Save, Calendar, Users } from "lucide-react"

export default function ModifyReservationPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    date: "2025-11-10",
    time: "19:00",
    guests: "2",
    specialRequest: "",
  })

  const handleSave = () => {
    if (!formData.date || !formData.time || !formData.guests) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Réservation modifiée",
      description: "Vos modifications ont été enregistrées avec succès.",
    })

    // Go back to the reservation list
    window.history.back()
  }

  return (
    <>
      <div className="min-h-screen pb-20 md:pb-8 pt-10">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Link href="/customer/reservations">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Modifier la réservation</h1>
              <p className="text-muted-foreground mt-1">
                Mettez à jour la date, l’heure ou le nombre d’invités
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-time">Heure</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-guests">Nombre d’invités</Label>
                  <Input
                    id="edit-guests"
                    type="number"
                    min="1"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-specialRequest">Demande spéciale (facultatif)</Label>
                  <Input
                    id="edit-specialRequest"
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  />
                </div>
              </div>

              <Separator className="my-6" />

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end mt-8">
                <Link href="/customer/reservations" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full hover:bg-accent">
                    Annuler
                  </Button>
                </Link>
                <Button onClick={handleSave} className="w-full bg-primary sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileBottomNav />
    </>
  )
}
