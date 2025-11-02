"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, MessageSquare, Reply, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  customerName: string
  customerAvatar?: string
  rating: number
  comment: string
  date: string
  product?: string
  response?: string
  responseDate?: string
  status: "pending" | "responded" | "archived"
}

export default function MerchantReviewsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [ratingFilter, setRatingFilter] = useState<string>("all")
  const [productFilter, setProductFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [replyText, setReplyText] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      customerName: "Marie Dupont",
      rating: 5,
      comment:
        "Excellent produit ! La qualité est au rendez-vous et la livraison a été rapide. Je recommande vivement ce commerce.",
      date: "2025-01-20",
      product: "Sac en cuir artisanal",
      status: "responded",
      response: "Merci beaucoup pour votre retour ! Nous sommes ravis que vous soyez satisfaite de votre achat.",
      responseDate: "2025-01-21",
    },
    {
      id: "2",
      customerName: "Jean Martin",
      rating: 4,
      comment: "Très bon produit, conforme à la description. Seul bémol : l'emballage pourrait être amélioré.",
      date: "2025-01-19",
      product: "Tissu Wax Premium",
      status: "pending",
    },
    {
      id: "3",
      customerName: "Sophie Bernard",
      rating: 5,
      comment:
        "Une découverte incroyable ! Les produits sont authentiques et de très bonne qualité. Je reviendrai certainement.",
      date: "2025-01-18",
      product: "Épices africaines",
      status: "responded",
      response: "Merci pour ce merveilleux commentaire ! Au plaisir de vous revoir bientôt.",
      responseDate: "2025-01-18",
    },
    {
      id: "4",
      customerName: "Pierre Dubois",
      rating: 3,
      comment: "Produit correct mais les prix sont un peu élevés. La qualité est là mais j'attendais mieux.",
      date: "2025-01-17",
      product: "Huile de palme bio",
      status: "pending",
    },
    {
      id: "5",
      customerName: "Fatou Diallo",
      rating: 5,
      comment: "Parfait ! Exactement ce que je cherchais. Le service client est très réactif et professionnel.",
      date: "2025-01-16",
      product: "Bijoux traditionnels",
      status: "responded",
      response: "Merci infiniment ! Votre satisfaction est notre priorité.",
      responseDate: "2025-01-16",
    },
    {
      id: "6",
      customerName: "Ahmed Kone",
      rating: 4,
      comment: "Bonne qualité, livraison rapide. Je recommande !",
      date: "2025-01-15",
      product: "Sac en cuir artisanal",
      status: "responded",
      response: "Merci pour votre confiance !",
      responseDate: "2025-01-15",
    },
    {
      id: "7",
      customerName: "Aminata Sow",
      rating: 5,
      comment: "Produits authentiques et de qualité. Service impeccable.",
      date: "2025-01-14",
      product: "Tissu Wax Premium",
      status: "pending",
    },
    {
      id: "8",
      customerName: "Moussa Diop",
      rating: 2,
      comment: "Déçu par la qualité. Le produit ne correspond pas à la description.",
      date: "2025-01-13",
      product: "Épices africaines",
      status: "pending",
    },
    {
      id: "9",
      customerName: "Khadija Ba",
      rating: 5,
      comment: "Excellente expérience d'achat. Je reviendrai !",
      date: "2025-01-12",
      product: "Huile de palme bio",
      status: "responded",
      response: "Merci beaucoup ! À très bientôt.",
      responseDate: "2025-01-12",
    },
    {
      id: "10",
      customerName: "Ibrahima Fall",
      rating: 4,
      comment: "Bon rapport qualité-prix. Livraison dans les délais.",
      date: "2025-01-11",
      product: "Bijoux traditionnels",
      status: "responded",
      response: "Merci pour votre retour positif !",
      responseDate: "2025-01-11",
    },
    {
      id: "11",
      customerName: "Aissatou Diallo",
      rating: 5,
      comment: "Produits de très bonne qualité. Je suis ravie !",
      date: "2025-01-10",
      product: "Sac en cuir artisanal",
      status: "pending",
    },
    {
      id: "12",
      customerName: "Ousmane Sy",
      rating: 3,
      comment: "Correct mais rien d'exceptionnel.",
      date: "2025-01-09",
      product: "Tissu Wax Premium",
      status: "pending",
    },
  ])

  const handleReply = () => {
    if (!selectedReview || !replyText.trim()) return

    setReviews(
      reviews.map((review) =>
        review.id === selectedReview.id
          ? {
              ...review,
              response: replyText,
              responseDate: new Date().toISOString().split("T")[0],
              status: "responded" as const,
            }
          : review,
      ),
    )

    toast({
      title: "Réponse envoyée",
      description: "Votre réponse a été publiée avec succès",
    })

    setIsReplyDialogOpen(false)
    setReplyText("")
    setSelectedReview(null)
  }

  const handleExport = () => {
    const csvContent = [
      ["Date", "Client", "Note", "Produit", "Commentaire", "Réponse", "Statut"],
      ...reviews.map((r) => [
        r.date,
        r.customerName,
        r.rating.toString(),
        r.product || "",
        r.comment,
        r.response || "",
        r.status === "pending" ? "En attente" : "Répondu",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `avis-clients-${new Date().toISOString().split("T")[0]}.csv`
    link.click()

    toast({
      title: "Export réussi",
      description: "Les avis ont été exportés en CSV",
    })
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.product && review.product.toLowerCase().includes(searchQuery.toLowerCase())) ||
      review.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    const matchesProduct = productFilter === "all" || review.product === productFilter

    let matchesDate = true
    if (dateFilter !== "all") {
      const reviewDate = new Date(review.date)
      const today = new Date()
      const daysDiff = Math.floor((today.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24))

      if (dateFilter === "today") matchesDate = daysDiff === 0
      else if (dateFilter === "week") matchesDate = daysDiff <= 7
      else if (dateFilter === "month") matchesDate = daysDiff <= 30
      else if (dateFilter === "year") matchesDate = daysDiff <= 365
    }

    return matchesSearch && matchesStatus && matchesRating && matchesProduct && matchesDate
  })

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 : 0,
  }))

  const uniqueProducts = Array.from(new Set(reviews.map((r) => r.product).filter(Boolean))) as string[]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">Commentaires & Avis</h1>
            <p className="text-muted-foreground">Gérez les avis de vos clients sur vos produits</p>
          </div>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="font-bold text-3xl">{averageRating.toFixed(1)}</span>
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-muted-foreground text-xs">Sur {reviews.length} avis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{reviews.filter((r) => r.status === "pending").length}</div>
              <p className="text-muted-foreground text-xs">Nécessitent une réponse</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Répondus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{reviews.filter((r) => r.status === "responded").length}</div>
              <p className="text-muted-foreground text-xs">Avec réponse</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Ce mois-ci</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{reviews.length}</div>
              <p className="text-muted-foreground text-xs">Nouveaux avis</p>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribution des notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex w-20 items-center gap-1">
                    <span className="font-medium text-sm">{rating}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                  <span className="w-12 text-muted-foreground text-sm">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1">
                  <Label htmlFor="search">Rechercher</Label>
                  <div className="relative">
                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="ID, client, produit ou commentaire..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleFilterChange()
                      }}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                      setStatusFilter(value)
                      handleFilterChange()
                    }}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="responded">Répondus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48">
                  <Label htmlFor="rating">Note</Label>
                  <Select
                    value={ratingFilter}
                    onValueChange={(value) => {
                      setRatingFilter(value)
                      handleFilterChange()
                    }}
                  >
                    <SelectTrigger id="rating">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="5">5 étoiles</SelectItem>
                      <SelectItem value="4">4 étoiles</SelectItem>
                      <SelectItem value="3">3 étoiles</SelectItem>
                      <SelectItem value="2">2 étoiles</SelectItem>
                      <SelectItem value="1">1 étoile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1">
                  <Label htmlFor="product">Produit</Label>
                  <Select
                    value={productFilter}
                    onValueChange={(value) => {
                      setProductFilter(value)
                      handleFilterChange()
                    }}
                  >
                    <SelectTrigger id="product">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les produits</SelectItem>
                      {uniqueProducts.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="date">Période</Label>
                  <Select
                    value={dateFilter}
                    onValueChange={(value) => {
                      setDateFilter(value)
                      handleFilterChange()
                    }}
                  >
                    <SelectTrigger id="date">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les périodes</SelectItem>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Cette semaine</SelectItem>
                      <SelectItem value="month">Ce mois-ci</SelectItem>
                      <SelectItem value="year">Cette année</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="perPage">Afficher</Label>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number(value))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger id="perPage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 par page</SelectItem>
                      <SelectItem value="10">10 par page</SelectItem>
                      <SelectItem value="25">25 par page</SelectItem>
                      <SelectItem value="50">50 par page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {paginatedReviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Aucun commentaire trouvé</p>
              </CardContent>
            </Card>
          ) : (
            paginatedReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.customerAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.customerName}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-muted-foreground text-sm">{review.date}</span>
                        </div>
                        {review.product && <p className="text-muted-foreground text-xs">Produit : {review.product}</p>}
                      </div>
                    </div>
                    <Badge variant={review.status === "pending" ? "secondary" : "default"}>
                      {review.status === "pending" ? "En attente" : "Répondu"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{review.comment}</p>

                  {review.response && (
                    <div className="rounded-lg border bg-muted/50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Reply className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Votre réponse</span>
                        <span className="text-muted-foreground text-xs">• {review.responseDate}</span>
                      </div>
                      <p className="text-sm">{review.response}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {review.status === "pending" && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review)
                          setIsReplyDialogOpen(true)
                        }}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Répondre
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {filteredReviews.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-muted-foreground text-sm">
                  Affichage de {startIndex + 1} à {Math.min(endIndex, filteredReviews.length)} sur{" "}
                  {filteredReviews.length} commentaire(s)
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                    Première
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="h-9 w-9"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    Dernière
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Répondre au commentaire</DialogTitle>
            <DialogDescription>Rédigez votre réponse au client</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{selectedReview.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">{selectedReview.customerName}</span>
                </div>
                {selectedReview.product && (
                  <p className="mb-2 text-muted-foreground text-xs">Produit : {selectedReview.product}</p>
                )}
                <p className="text-sm">{selectedReview.comment}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reply">Votre réponse</Label>
                <Textarea
                  id="reply"
                  placeholder="Écrivez votre réponse..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleReply} disabled={!replyText.trim()}>
              Envoyer la réponse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
