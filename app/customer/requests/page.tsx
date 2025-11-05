"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Send, Inbox, Clock, CheckCircle2, XCircle, MessageSquare, Search } from "lucide-react"

interface Request {
  id: string
  type: "sent" | "received"
  businessName: string
  businessType: "store" | "restaurant"
  subject: string
  message: string
  status: "pending" | "accepted" | "rejected" | "completed"
  date: string
  response?: string
}

export default function RequestsPage() {
  const { toast } = useToast()
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [newRequest, setNewRequest] = useState({
    businessId: "",
    subject: "",
    message: "",
  })

  // Mock data
  const requests: Request[] = [
    {
      id: "1",
      type: "sent",
      businessName: "Afro Spice Market",
      businessType: "store",
      subject: "Demande de disponibilité produit",
      message: "Bonjour, avez-vous du piment Scotch Bonnet en stock ?",
      status: "completed",
      date: "2025-01-15",
      response: "Oui, nous avons du piment Scotch Bonnet frais disponible. Venez nous voir !",
    },
    {
      id: "2",
      type: "sent",
      businessName: "Mama Africa Restaurant",
      businessType: "restaurant",
      subject: "Réservation groupe",
      message: "Je souhaiterais réserver pour un groupe de 15 personnes le 25 janvier.",
      status: "accepted",
      date: "2025-01-18",
      response: "Réservation confirmée pour 15 personnes le 25 janvier à 19h00.",
    },
    {
      id: "3",
      type: "sent",
      businessName: "African Beauty Store",
      businessType: "store",
      subject: "Commande personnalisée",
      message: "Pouvez-vous commander des produits capillaires de la marque Shea Moisture ?",
      status: "pending",
      date: "2025-01-20",
    },
    {
      id: "4",
      type: "received",
      businessName: "Chez Fatou",
      businessType: "restaurant",
      subject: "Invitation événement spécial",
      message: "Nous organisons une soirée dégustation le 30 janvier. Seriez-vous intéressé ?",
      status: "pending",
      date: "2025-01-19",
    },
    {
      id: "5",
      type: "sent",
      businessName: "Wax & Fabrics",
      businessType: "store",
      subject: "Demande de prix",
      message: "Quel est le prix pour 5 mètres de tissu wax ?",
      status: "completed",
      date: "2025-01-12",
      response: "Le prix est de 45€ pour 5 mètres de tissu wax premium.",
    },
  ]

  const businesses = [
    { id: "1", name: "Afro Spice Market", type: "store" },
    { id: "2", name: "Mama Africa Restaurant", type: "restaurant" },
    { id: "3", name: "African Beauty Store", type: "store" },
    { id: "4", name: "Chez Fatou", type: "restaurant" },
    { id: "5", name: "Wax & Fabrics", type: "store" },
  ]

  const handleSendRequest = () => {
    if (!newRequest.businessId || !newRequest.subject || !newRequest.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Demande envoyée",
      description: "Votre demande a été envoyée avec succès",
    })
    setIsNewRequestOpen(false)
    setNewRequest({ businessId: "", subject: "", message: "" })
  }

  const handleRespondToRequest = (requestId: string, response: "accept" | "reject") => {
    toast({
      title: response === "accept" ? "Demande acceptée" : "Demande refusée",
      description: `Vous avez ${response === "accept" ? "accepté" : "refusé"} la demande`,
    })
  }

  const getStatusBadge = (status: Request["status"]) => {
    const variants = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      accepted: { label: "Acceptée", className: "bg-green-100 text-green-800 border-green-300" },
      rejected: { label: "Refusée", className: "bg-red-100 text-red-800 border-red-300" },
      completed: { label: "Complétée", className: "bg-blue-100 text-blue-800 border-blue-300" },
    }
    return variants[status]
  }

  const getStatusIcon = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "accepted":
        return <CheckCircle2 className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  const filteredRequests = (type: "sent" | "received") => {
    return requests
      .filter((req) => req.type === type)
      .filter(
        (req) =>
          req.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.message.toLowerCase().includes(searchQuery.toLowerCase()),
      )
  }

  const paginateRequests = (reqs: Request[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return reqs.slice(startIndex, endIndex)
  }

  const totalPages = (reqs: Request[]) => Math.ceil(reqs.length / itemsPerPage)

  return (
    <div className="section-spacing">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left">Demandes</h1>
          <p className="text-muted-foreground mt-2 text-center sm:text-left">Gérez vos demandes envoyées et reçues</p>
        </div>

        <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Send className="mr-2 h-4 w-4" />
              Nouvelle demande
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Envoyer une demande</DialogTitle>
              <DialogDescription>Contactez un commerce ou un restaurant</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="business">Commerce / Restaurant</Label>
                <Select
                  value={newRequest.businessId}
                  onValueChange={(value) => setNewRequest({ ...newRequest, businessId: value })}
                >
                  <SelectTrigger id="business">
                    <SelectValue placeholder="Sélectionner un commerce" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((business) => (
                      <SelectItem key={business.id} value={business.id}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {business.type === "store" ? "Magasin" : "Restaurant"}
                          </Badge>
                          <span>{business.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  placeholder="Ex: Demande de disponibilité produit"
                  value={newRequest.subject}
                  onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre demande en détail..."
                  rows={6}
                  value={newRequest.message}
                  onChange={(e) => setNewRequest({ ...newRequest, message: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSendRequest} className="bg-primary hover:bg-primary/90">
                <Send className="mr-2 h-4 w-4" />
                Envoyer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans vos demandes..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="sent" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="sent" className="gap-2">
            <Send className="h-4 w-4" />
            Envoyées ({filteredRequests("sent").length})
          </TabsTrigger>
          <TabsTrigger value="received" className="gap-2">
            <Inbox className="h-4 w-4" />
            Reçues ({filteredRequests("received").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sent" className="space-y-4">
          {paginateRequests(filteredRequests("sent")).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Send className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Aucune demande envoyée</p>
                <p className="text-sm text-muted-foreground mt-2">Commencez par envoyer une demande à un commerce</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-4">
                {paginateRequests(filteredRequests("sent")).map((request) => {
                  const statusInfo = getStatusBadge(request.status)
                  return (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{request.businessName}</CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {request.businessType === "store" ? "Magasin" : "Restaurant"}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">{request.subject}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={statusInfo.className} variant="outline">
                              <span className="flex items-center gap-1">
                                {getStatusIcon(request.status)}
                                {statusInfo.label}
                              </span>
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {new Date(request.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Votre message :</p>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{request.message}</p>
                        </div>

                        {request.response && (
                          <>
                            <Separator />
                            <div>
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Réponse du commerce :
                              </p>
                              <p className="text-sm text-muted-foreground bg-blue-50 border border-blue-200 p-3 rounded-md">
                                {request.response}
                              </p>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {totalPages(filteredRequests("sent")) > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} sur {totalPages(filteredRequests("sent"))}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages(filteredRequests("sent")), p + 1))}
                    disabled={currentPage === totalPages(filteredRequests("sent"))}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="received" className="space-y-4">
          {paginateRequests(filteredRequests("received")).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Aucune demande reçue</p>
                <p className="text-sm text-muted-foreground mt-2">Vous n'avez pas encore reçu de demandes</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-4">
                {paginateRequests(filteredRequests("received")).map((request) => {
                  const statusInfo = getStatusBadge(request.status)
                  return (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{request.businessName}</CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {request.businessType === "store" ? "Magasin" : "Restaurant"}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">{request.subject}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={statusInfo.className} variant="outline">
                              <span className="flex items-center gap-1">
                                {getStatusIcon(request.status)}
                                {statusInfo.label}
                              </span>
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {new Date(request.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Message :</p>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{request.message}</p>
                        </div>

                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                              onClick={() => handleRespondToRequest(request.id, "accept")}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Accepter
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                              onClick={() => handleRespondToRequest(request.id, "reject")}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Refuser
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {totalPages(filteredRequests("received")) > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} sur {totalPages(filteredRequests("received"))}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages(filteredRequests("received")), p + 1))}
                    disabled={currentPage === totalPages(filteredRequests("received"))}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
