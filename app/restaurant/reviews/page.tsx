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
import { Search, Star, MessageSquare, Reply, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  customerName: string
  customerAvatar?: string
  rating: number
  comment: string
  date: string
  response?: string
  responseDate?: string
  status: "pending" | "responded" | "archived"
}

export default function RestaurantReviewsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [ratingFilter, setRatingFilter] = useState<string>("all")
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [replyText, setReplyText] = useState("")

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      customerName: "Marie Dupont",
      rating: 5,
      comment:
        "Excellent restaurant ! Les plats sont délicieux et le service impeccable. Je recommande vivement le poulet yassa.",
      date: "2025-01-20",
      status: "responded",
      response: "Merci beaucoup pour votre retour ! Nous sommes ravis que vous ayez apprécié votre expérience.",
      responseDate: "2025-01-21",
    },
    {
      id: "2",
      customerName: "Jean Martin",
      rating: 4,
      comment: "Très bon restaurant, ambiance agréable. Seul bémol : un peu d'attente pour être servi.",
      date: "2025-01-19",
      status: "pending",
    },
    {
      id: "3",
      customerName: "Sophie Bernard",
      rating: 5,
      comment:
        "Une découverte culinaire incroyable ! Les saveurs africaines sont authentiques et les portions généreuses.",
      date: "2025-01-18",
      status: "responded",
      response: "Merci pour ce merveilleux commentaire ! Au plaisir de vous revoir bientôt.",
      responseDate: "2025-01-18",
    },
    {
      id: "4",
      customerName: "Pierre Dubois",
      rating: 3,
      comment: "Correct mais sans plus. Les prix sont un peu élevés pour la qualité proposée.",
      date: "2025-01-17",
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

  const handleDelete = (reviewId: string) => {
    setReviews(reviews.filter((review) => review.id !== reviewId))
    toast({
      title: "Commentaire supprimé",
      description: "Le commentaire a été supprimé avec succès",
    })
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    return matchesSearch && matchesStatus && matchesRating
  })

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 : 0,
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Commentaires & Avis</h1>
          <p className="text-muted-foreground">Gérez les avis de vos clients</p>
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
                  <div className="flex items-center gap-1 w-20">
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

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Client ou commentaire..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Label htmlFor="status">Statut</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
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
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
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
                  <Button variant="outline" size="sm" onClick={() => handleDelete(review.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
