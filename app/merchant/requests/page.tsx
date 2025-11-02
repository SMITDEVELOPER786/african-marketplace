"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Search, Mail, Clock, CheckCircle2, Send, User, Calendar, MessageSquare } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Request {
  id: string
  customerName: string
  customerEmail: string
  subject: string
  message: string
  status: "pending" | "answered" | "closed"
  date: string
  response?: string
  responseDate?: string
}

export default function MerchantRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("received")
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false)
  const [responseText, setResponseText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Mock data - À remplacer par des données réelles de Supabase
  const receivedRequests: Request[] = [
    {
      id: "1",
      customerName: "Marie Dupont",
      customerEmail: "marie.dupont@example.com",
      subject: "Disponibilité produit",
      message: "Bonjour, avez-vous du fonio en stock ? J'aimerais en commander 2kg.",
      status: "pending",
      date: "2025-01-28",
    },
    {
      id: "2",
      customerName: "Jean Martin",
      customerEmail: "jean.martin@example.com",
      subject: "Commande personnalisée",
      message:
        "Je souhaiterais commander un panier cadeau avec des produits africains. Pouvez-vous me faire une proposition ?",
      status: "answered",
      date: "2025-01-27",
      response: "Bonjour Jean, nous pouvons vous préparer un panier personnalisé. Contactez-nous au 01 23 45 67 89.",
      responseDate: "2025-01-27",
    },
    {
      id: "3",
      customerName: "Sophie Laurent",
      customerEmail: "sophie.laurent@example.com",
      subject: "Horaires d'ouverture",
      message: "Êtes-vous ouverts le dimanche ? Je voudrais venir faire mes courses.",
      status: "closed",
      date: "2025-01-26",
      response: "Oui, nous sommes ouverts le dimanche de 10h à 18h.",
      responseDate: "2025-01-26",
    },
  ]

  const filteredRequests = receivedRequests.filter(
    (request) =>
      request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage)

  const handleRespond = (request: Request) => {
    setSelectedRequest(request)
    setResponseText(request.response || "")
    setIsResponseDialogOpen(true)
  }

  const handleSendResponse = () => {
    console.log("[v0] Sending response:", responseText)
    // TODO: Implémenter l'envoi de la réponse via Supabase
    setIsResponseDialogOpen(false)
    setResponseText("")
    setSelectedRequest(null)
  }

  const handleCloseRequest = (requestId: string) => {
    console.log("[v0] Closing request:", requestId)
    // TODO: Implémenter la fermeture de la demande via Supabase
  }

  const getStatusBadge = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            En attente
          </Badge>
        )
      case "answered":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Send className="mr-1 h-3 w-3" />
            Répondu
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Clôturé
          </Badge>
        )
    }
  }

  const stats = {
    total: receivedRequests.length,
    pending: receivedRequests.filter((r) => r.status === "pending").length,
    answered: receivedRequests.filter((r) => r.status === "answered").length,
    closed: receivedRequests.filter((r) => r.status === "closed").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Demandes</h1>
        <p className="text-muted-foreground mt-2">Gérez les demandes de vos clients</p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Répondues</CardTitle>
            <Send className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.answered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clôturées</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.closed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans les demandes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="received" className="gap-2">
            <Mail className="h-4 w-4" />
            Demandes reçues
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4 mt-6">
          {paginatedRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucune demande trouvée</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? "Essayez de modifier votre recherche" : "Vous n'avez pas encore reçu de demande"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-4">
                {paginatedRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{request.subject}</CardTitle>
                            {getStatusBadge(request.status)}
                          </div>
                          <CardDescription className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {request.customerName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(request.date).toLocaleDateString("fr-FR")}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Message du client :</p>
                        <p className="text-sm bg-muted p-3 rounded-md">{request.message}</p>
                      </div>

                      {request.response && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Votre réponse :</p>
                          <p className="text-sm bg-blue-50 p-3 rounded-md border border-blue-200">{request.response}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Répondu le {new Date(request.responseDate!).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {request.status !== "closed" && (
                          <>
                            <Button onClick={() => handleRespond(request)} size="sm" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              {request.status === "pending" ? "Répondre" : "Modifier la réponse"}
                            </Button>
                            {request.status === "answered" && (
                              <Button
                                onClick={() => handleCloseRequest(request.id)}
                                variant="outline"
                                size="sm"
                                className="gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Clôturer
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog de réponse */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Répondre à la demande</DialogTitle>
            <DialogDescription>
              Envoyez une réponse à {selectedRequest?.customerName} ({selectedRequest?.customerEmail})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Sujet</Label>
              <Input value={selectedRequest?.subject || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Message du client</Label>
              <Textarea value={selectedRequest?.message || ""} disabled rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="response">Votre réponse</Label>
              <Textarea
                id="response"
                placeholder="Écrivez votre réponse ici..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendResponse} disabled={!responseText.trim()} className="gap-2">
              <Send className="h-4 w-4" />
              Envoyer la réponse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
