"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
  MessageSquare,
  Download,
  Bell,
  CalendarPlus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { addToCalendar } from "@/utils/addToCalendar" // Import the handleAddToCalendar function

const allReservations = [
  {
    id: 1,
    restaurant: "Restaurant Le Baobab",
    date: "2024-12-20",
    time: "19:00",
    guests: 4,
    status: "confirmed",
    address: "123 Rue de la République, Paris",
    phone: "+33 1 23 45 67 89",
    review: null,
  },
  {
    id: 2,
    restaurant: "Chez Mama Africa",
    date: "2024-12-22",
    time: "20:30",
    guests: 2,
    status: "pending",
    address: "45 Avenue des Champs, Lyon",
    phone: "+33 4 56 78 90 12",
    review: null,
  },
  {
    id: 3,
    restaurant: "Le Sahel",
    date: "2024-11-15",
    time: "18:30",
    guests: 6,
    status: "completed",
    address: "78 Boulevard Saint-Germain, Paris",
    phone: "+33 1 45 67 89 01",
    review: { rating: 5, comment: "Excellent service et cuisine délicieuse !" },
  },
  {
    id: 4,
    restaurant: "Afro Fusion",
    date: "2024-11-08",
    time: "19:45",
    guests: 3,
    status: "completed",
    address: "12 Rue de la Paix, Marseille",
    phone: "+33 4 91 23 45 67",
    review: null,
  },
  {
    id: 5,
    restaurant: "Saveurs d'Afrique",
    date: "2024-10-22",
    time: "20:00",
    guests: 2,
    status: "completed",
    address: "34 Avenue Victor Hugo, Nice",
    phone: "+33 4 93 87 65 43",
    review: { rating: 4, comment: "Très bon restaurant, ambiance chaleureuse." },
  },
  {
    id: 6,
    restaurant: "Le Baobab",
    date: "2024-09-30",
    time: "19:15",
    guests: 4,
    status: "cancelled",
    address: "123 Rue de la République, Paris",
    phone: "+33 1 23 45 67 89",
    review: null,
  },
]

const statusConfig = {
  confirmed: { label: "Confirmée", variant: "default" as const, color: "bg-green-500" },
  pending: { label: "En attente", variant: "secondary" as const, color: "bg-yellow-500" },
  completed: { label: "Terminée", variant: "outline" as const, color: "bg-gray-500" },
  cancelled: { label: "Annulée", variant: "destructive" as const, color: "bg-red-500" },
}

const ITEMS_PER_PAGE = 4

export default function ReservationsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("current")
  const [currentPage, setCurrentPage] = useState(1)

  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [modifyDate, setModifyDate] = useState("")
  const [modifyTime, setModifyTime] = useState("")
  const [modifyGuests, setModifyGuests] = useState("")

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")

  const [pdfDialogOpen, setPdfDialogOpen] = useState(false)
  const [pdfReservation, setPdfReservation] = useState<any>(null)

  const [reminderDialogOpen, setReminderDialogOpen] = useState(false)
  const [reminderReservation, setReminderReservation] = useState<any>(null)
  const [reminderTime, setReminderTime] = useState("24h")
  const [whatsappNumber, setWhatsappNumber] = useState("")

  const getCurrentReservations = () => allReservations.filter((r) => r.status === "confirmed" || r.status === "pending")

  const getHistoryReservations = () =>
    allReservations.filter((r) => r.status === "completed" || r.status === "cancelled")

  const getFilteredReservations = () => {
    return activeTab === "current" ? getCurrentReservations() : getHistoryReservations()
  }

  const filteredReservations = getFilteredReservations()
  const totalPages = Math.ceil(filteredReservations.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedReservations = filteredReservations.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentPage(1)
  }

  const handleCancelReservation = (reservation: any) => {
    setSelectedReservation(reservation)
    setCancelDialogOpen(true)
  }

  const confirmCancelReservation = () => {
    toast({
      title: "Réservation annulée",
      description: `Votre réservation chez ${selectedReservation?.restaurant} a été annulée avec succès.`,
      variant: "destructive",
    })
    setCancelDialogOpen(false)
    setCancelReason("")
  }

  const handleModifyReservation = (reservation: any) => {
    setSelectedReservation(reservation)
    setModifyDate(reservation.date)
    setModifyTime(reservation.time)
    setModifyGuests(reservation.guests.toString())
    setModifyDialogOpen(true)
  }

  const confirmModifyReservation = () => {
    toast({
      title: "Réservation modifiée",
      description: `Votre réservation chez ${selectedReservation?.restaurant} a été mise à jour.`,
    })
    setModifyDialogOpen(false)
  }

  const handleAddReview = (reservation: any) => {
    setSelectedReservation(reservation)
    setReviewRating(reservation.review?.rating || 0)
    setReviewComment(reservation.review?.comment || "")
    setReviewDialogOpen(true)
  }

  const submitReview = () => {
    toast({
      title: "Avis publié",
      description: `Merci pour votre avis sur ${selectedReservation?.restaurant} !`,
    })
    setReviewDialogOpen(false)
    setReviewRating(0)
    setReviewComment("")
  }

  const handleDownloadPDF = (reservation: any) => {
    setPdfReservation(reservation)
    setPdfDialogOpen(true)
  }

  const generateAndDownloadPDF = () => {
    // Generate PDF content
    const pdfContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmation de Réservation - ${pdfReservation?.restaurant}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #B85C38;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #B85C38;
              margin-bottom: 10px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .info-section {
              background: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e0e0e0;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: #666;
            }
            .value {
              color: #333;
            }
            .qr-section {
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              background: #fff;
              border: 2px dashed #B85C38;
              border-radius: 8px;
            }
            .qr-code {
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              color: #666;
              font-size: 12px;
            }
            .status-badge {
              display: inline-block;
              padding: 5px 15px;
              background: #22c55e;
              color: white;
              border-radius: 20px;
              font-size: 14px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">AfroMarket</div>
            <div class="title">Confirmation de Réservation</div>
            <span class="status-badge">CONFIRMÉE</span>
          </div>

          <div class="info-section">
            <h2 style="margin-top: 0; color: #B85C38;">Détails de la réservation</h2>
            <div class="info-row">
              <span class="label">Restaurant</span>
              <span class="value">${pdfReservation?.restaurant}</span>
            </div>
            <div class="info-row">
              <span class="label">Adresse</span>
              <span class="value">${pdfReservation?.address}</span>
            </div>
            <div class="info-row">
              <span class="label">Date</span>
              <span class="value">${new Date(pdfReservation?.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
            </div>
            <div class="info-row">
              <span class="label">Heure</span>
              <span class="value">${pdfReservation?.time}</span>
            </div>
            <div class="info-row">
              <span class="label">Nombre de personnes</span>
              <span class="value">${pdfReservation?.guests} ${pdfReservation?.guests === 1 ? "personne" : "personnes"}</span>
            </div>
            <div class="info-row">
              <span class="label">Téléphone du restaurant</span>
              <span class="value">${pdfReservation?.phone}</span>
            </div>
          </div>

          <div class="qr-section">
            <h3 style="margin-top: 0; color: #B85C38;">Code de réservation</h3>
            <p style="color: #666; font-size: 14px;">Présentez ce code à votre arrivée</p>
            <div class="qr-code">
              <svg width="200" height="200" viewBox="0 0 200 200" style="margin: 0 auto; display: block;">
                <rect width="200" height="200" fill="white"/>
                ${generateQRCodeSVG(`RES-${pdfReservation?.id}-${pdfReservation?.date}`)}
              </svg>
            </div>
            <p style="font-size: 18px; font-weight: bold; margin: 10px 0;">RES-${pdfReservation?.id}-${new Date(pdfReservation?.date).getFullYear()}</p>
          </div>

          <div class="info-section">
            <h3 style="margin-top: 0; color: #B85C38;">Informations importantes</h3>
            <ul style="line-height: 1.8; color: #666;">
              <li>Veuillez arriver 10 minutes avant l'heure de votre réservation</li>
              <li>En cas d'empêchement, merci d'annuler au moins 24h à l'avance</li>
              <li>Présentez ce document ou le code QR à votre arrivée</li>
              <li>Pour toute modification, contactez directement le restaurant</li>
            </ul>
          </div>

          <div class="footer">
            <p><strong>AfroMarket</strong> - Votre marketplace africaine</p>
            <p>Pour toute question, contactez-nous à support@afromarket.com</p>
            <p>Document généré le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}</p>
          </div>
        </body>
      </html>
    `

    // Create blob and download
    const blob = new Blob([pdfContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reservation-${pdfReservation?.restaurant.replace(/\s+/g, "-")}-${pdfReservation?.date}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "PDF téléchargé",
      description: "Votre confirmation de réservation a été téléchargée avec succès.",
    })

    setPdfDialogOpen(false)
  }

  const generateQRCodeSVG = (data: string) => {
    // Simple QR code pattern (in production, use a proper QR code library)
    const size = 5
    const pattern = []
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        if ((i + j + data.length) % 3 === 0) {
          pattern.push(
            `<rect x="${j * size + 20}" y="${i * size + 20}" width="${size}" height="${size}" fill="black"/>`,
          )
        }
      }
    }
    return pattern.join("")
  }

  const handleSetReminder = (reservation: any) => {
    setReminderReservation(reservation)
    setWhatsappNumber(reservation.phone)
    setReminderDialogOpen(true)
  }

  const sendWhatsAppReminder = async () => {
    // In production, this would call a backend API that uses WhatsApp Business API or Twilio
    const message = `Bonjour ! Rappel de votre réservation chez ${reminderReservation?.restaurant} le ${new Date(
      reminderReservation?.date,
    ).toLocaleDateString(
      "fr-FR",
    )} à ${reminderReservation?.time} pour ${reminderReservation?.guests} personne(s). À bientôt !`

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Rappel programmé",
      description: `Vous recevrez un message WhatsApp ${reminderTime} avant votre réservation au ${whatsappNumber}.`,
    })

    setReminderDialogOpen(false)
  }

  const handleAddToCalendar = (reservation: any) => {
    addToCalendar(reservation)
    toast({
      title: "Réservation ajoutée au calendrier",
      description: `Votre réservation chez ${reservation.restaurant} a été ajoutée à votre calendrier.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Réservations</h1>
          <p className="text-muted-foreground mt-2">Gérez vos réservations de restaurants</p>
        </div>
        <Link href="/restaurants">
          <Button className="bg-[#B85C38] hover:bg-[#9A4A2E]">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle réservation
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="current">En cours ({getCurrentReservations().length})</TabsTrigger>
          <TabsTrigger value="history">Historique ({getHistoryReservations().length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {paginatedReservations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">
                  {activeTab === "current" ? "Aucune réservation en cours" : "Aucun historique"}
                </h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {activeTab === "current"
                    ? "Réservez une table dans l'un de nos restaurants partenaires"
                    : "Vos anciennes réservations apparaîtront ici"}
                </p>
                {activeTab === "current" && (
                  <Link href="/restaurants">
                    <Button className="mt-6 bg-[#B85C38] hover:bg-[#9A4A2E]">Découvrir les restaurants</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-6">
                {paginatedReservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{reservation.restaurant}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4" />
                            {reservation.address}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={statusConfig[reservation.status as keyof typeof statusConfig].variant}
                          className={statusConfig[reservation.status as keyof typeof statusConfig].color}
                        >
                          {statusConfig[reservation.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Date</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(reservation.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Heure</p>
                            <p className="text-sm text-muted-foreground">{reservation.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Personnes</p>
                            <p className="text-sm text-muted-foreground">{reservation.guests}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Téléphone</p>
                            <p className="text-sm text-muted-foreground">{reservation.phone}</p>
                          </div>
                        </div>
                      </div>

                      {reservation.status === "completed" && reservation.review && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">Votre avis</p>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < reservation.review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{reservation.review.comment}</p>
                        </div>
                      )}

                      {(reservation.status === "confirmed" || reservation.status === "pending") && (
                        <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row gap-2">

                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() => handleModifyReservation(reservation)}
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleCancelReservation(reservation)}
                            >
                              Annuler
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent w-full sm:w-auto"
                              onClick={() => handleDownloadPDF(reservation)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              PDF
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent"
                              onClick={() => handleAddToCalendar(reservation)}
                            >
                              <CalendarPlus className="mr-2 h-4 w-4 " />
                              Calendrier
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent w-full sm:w-auto"
                              onClick={() => handleSetReminder(reservation)}
                            >
                              <Bell className="mr-2 h-4 w-4" />
                              Rappel
                            </Button>
                          </div>
                        </div>
                      )}
                      {reservation.status === "completed" && (
                        <div className="flex gap-2">
                          {!reservation.review && (
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() => handleAddReview(reservation)}
                            >
                              <Star className="mr-2 h-4 w-4" />
                              Laisser un avis
                            </Button>
                          )}
                          <Link href={`/restaurants/${reservation.id}`} className="flex-1">
                            <Button variant="outline" className="w-full bg-transparent">
                              Réserver à nouveau
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 ${currentPage === page ? "bg-[#B85C38] hover:bg-[#9A4A2E]" : ""}`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-[#B85C38]" />
              Télécharger la confirmation
            </DialogTitle>
            <DialogDescription>
              Téléchargez votre confirmation de réservation au format PDF avec code QR
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Restaurant</span>
                <span className="text-sm text-muted-foreground">{pdfReservation?.restaurant}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-muted-foreground">
                  {pdfReservation?.date && new Date(pdfReservation.date).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Heure</span>
                <span className="text-sm text-muted-foreground">{pdfReservation?.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Personnes</span>
                <span className="text-sm text-muted-foreground">{pdfReservation?.guests}</span>
              </div>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Le PDF inclut un code QR unique à présenter lors de votre arrivée au restaurant.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPdfDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={generateAndDownloadPDF} className="bg-[#B85C38] hover:bg-[#9A4A2E]">
              <Download className="mr-2 h-4 w-4" />
              Télécharger le PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#B85C38]" />
              Configurer un rappel WhatsApp
            </DialogTitle>
            <DialogDescription>
              Recevez un rappel par WhatsApp avant votre réservation chez {reminderReservation?.restaurant}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number">Numéro WhatsApp</Label>
              <Input
                id="whatsapp-number"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Le rappel sera envoyé à ce numéro. Assurez-vous qu'il est actif sur WhatsApp.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-time">Quand souhaitez-vous recevoir le rappel ?</Label>
              <Select value={reminderTime} onValueChange={setReminderTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 heure avant</SelectItem>
                  <SelectItem value="3h">3 heures avant</SelectItem>
                  <SelectItem value="6h">6 heures avant</SelectItem>
                  <SelectItem value="24h">24 heures avant</SelectItem>
                  <SelectItem value="48h">48 heures avant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Le message inclura les détails de votre réservation : restaurant, date, heure et nombre de personnes.
              </AlertDescription>
            </Alert>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                <strong>Aperçu du message :</strong>
                <br />
                "Bonjour ! Rappel de votre réservation chez {reminderReservation?.restaurant} le{" "}
                {reminderReservation?.date && new Date(reminderReservation.date).toLocaleDateString("fr-FR")} à{" "}
                {reminderReservation?.time} pour {reminderReservation?.guests} personne(s). À bientôt !"
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={sendWhatsAppReminder}
              disabled={!whatsappNumber}
              className="bg-[#25D366] hover:bg-[#1DA851] text-white"
            >
              <Bell className="mr-2 h-4 w-4" />
              Programmer le rappel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Annuler la réservation
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir annuler votre réservation chez {selectedReservation?.restaurant} ?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-muted-foreground">
                  {selectedReservation?.date && new Date(selectedReservation.date).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Heure</span>
                <span className="text-sm text-muted-foreground">{selectedReservation?.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Personnes</span>
                <span className="text-sm text-muted-foreground">{selectedReservation?.guests}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancel-reason">Raison de l'annulation (optionnel)</Label>
              <Textarea
                id="cancel-reason"
                placeholder="Dites-nous pourquoi vous annulez (cela nous aide à améliorer nos services)..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={4}
              />
            </div>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Conditions d'annulation :</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Annulation gratuite jusqu'à 24h avant la réservation</li>
                  <li>• Annulation entre 24h et 12h : frais possibles selon le restaurant</li>
                  <li>• Annulation moins de 12h avant : non remboursable</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Retour
            </Button>
            <Button variant="destructive" onClick={confirmCancelReservation}>
              <AlertCircle className="mr-2 h-4 w-4" />
              Confirmer l'annulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modifyDialogOpen} onOpenChange={setModifyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la réservation</DialogTitle>
            <DialogDescription>
              Modifiez les détails de votre réservation chez {selectedReservation?.restaurant}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modify-date">Date</Label>
              <Input id="modify-date" type="date" value={modifyDate} onChange={(e) => setModifyDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modify-time">Heure</Label>
              <Input id="modify-time" type="time" value={modifyTime} onChange={(e) => setModifyTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modify-guests">Nombre de personnes</Label>
              <Select value={modifyGuests} onValueChange={setModifyGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "personne" : "personnes"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Note :</strong> La modification sera soumise à validation par le restaurant. Vous recevrez une
                confirmation par email.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModifyDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmModifyReservation} className="bg-[#B85C38] hover:bg-[#9A4A2E]">
              Confirmer la modification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Laisser un avis</DialogTitle>
            <DialogDescription>Partagez votre expérience chez {selectedReservation?.restaurant}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Note</Label>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} type="button" onClick={() => setReviewRating(i + 1)} className="focus:outline-none">
                    <Star
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        i < reviewRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {reviewRating > 0 ? `${reviewRating}/5` : "Cliquez pour noter"}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="review-comment">Votre commentaire</Label>
              <Textarea
                id="review-comment"
                placeholder="Partagez votre expérience..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={submitReview} disabled={reviewRating === 0} className="bg-[#B85C38] hover:bg-[#9A4A2E]">
              Publier l'avis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
