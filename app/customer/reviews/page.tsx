"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Search,
  MessageSquare,
  ThumbsUp,
  Edit,
  Trash2,
  Store,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  businessId: string
  businessName: string
  businessType: "store" | "restaurant"
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  response?: {
    text: string
    date: string
  }
}

const ITEMS_PER_PAGE = 5

export default function CustomerReviewsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [editFormData, setEditFormData] = useState({ rating: 5, title: "", comment: "" })

  // Mock data with more reviews for pagination
  const reviews: Review[] = Array.from({ length: 18 }, (_, i) => ({
    id: `review-${i + 1}`,
    businessId: `b${(i % 3) + 1}`,
    businessName: i % 3 === 0 ? "Afro Spice Market" : i % 3 === 1 ? "Mama Africa Restaurant" : "Sahel Grocery",
    businessType: i % 2 === 0 ? ("store" as const) : ("restaurant" as const),
    rating: 4 + (i % 2),
    title: `Excellent produits et service ${i + 1}`,
    comment:
      "J'ai trouvé tous les ingrédients dont j'avais besoin pour préparer un plat traditionnel. La qualité est exceptionnelle et le personnel très accueillant.",
    date: `2025-01-${20 - i}`,
    helpful: 12 + i,
    response:
      i % 3 === 0
        ? {
            text: "Merci beaucoup pour votre avis ! Nous sommes ravis que vous ayez trouvé tout ce dont vous aviez besoin.",
            date: `2025-01-${21 - i}`,
          }
        : undefined,
  }))

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "stores" && review.businessType === "store") ||
      (selectedTab === "restaurants" && review.businessType === "restaurant")

    return matchesSearch && matchesTab
  })

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleMarkHelpful = (reviewId: string) => {
    toast({
      title: "Merci !",
      description: "Votre avis a été enregistré.",
    })
  }

  const handleDeleteReview = (reviewId: string) => {
    toast({
      title: "Avis supprimé",
      description: "Votre avis a été supprimé avec succès.",
    })
  }

  const handleEditReview = (review: Review) => {
    setEditingReview(review)
    setEditFormData({
      rating: review.rating,
      title: review.title,
      comment: review.comment,
    })
  }

  const handleSaveEdit = () => {
    toast({
      title: "Avis modifié",
      description: "Votre avis a été mis à jour avec succès.",
    })
    setEditingReview(null)
  }

  const handleSubmitReview = () => {
    toast({
      title: "Avis publié",
      description: "Votre avis a été publié avec succès.",
    })
    setIsWriteReviewOpen(false)
  }

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    setCurrentPage(1)
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange?.(star)}
            disabled={!interactive}
            className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}
          >
            <Star className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: "Total des avis",
      value: reviews.length,
      icon: MessageSquare,
    },
    {
      title: "Note moyenne",
      value: "4.7",
      icon: Star,
    },
    {
      title: "Avis utiles",
      value: reviews.reduce((acc, r) => acc + r.helpful, 0),
      icon: ThumbsUp,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <div className="text-center sm:text-left">
    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mes avis</h1>
    <p className="text-muted-foreground text-sm sm:text-base pt-1">
      Gérez vos avis et commentaires sur les commerces
    </p>
  </div>

  <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
    <DialogTrigger asChild>
      <Button className="!px-3 !py-1.5 sm:!px-4 sm:!py-2 bg-[#B85C38] hover:bg-[#9A4A2E] text-sm sm:text-base mx-auto sm:mx-0">
        <MessageSquare className="mr-2 h-4 w-4" />
        Écrire un avis
      </Button>
   

          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Écrire un avis</DialogTitle>
              <DialogDescription>Partagez votre expérience avec la communauté</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="business">Commerce ou restaurant</Label>
                <Select>
                  <SelectTrigger id="business">
                    <SelectValue placeholder="Sélectionnez un établissement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b1">Afro Spice Market</SelectItem>
                    <SelectItem value="b2">Mama Africa Restaurant</SelectItem>
                    <SelectItem value="b3">Sahel Grocery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Note</Label>
                <div className="mt-2">{renderStars(5, true, () => {})}</div>
              </div>
              <div>
                <Label htmlFor="title">Titre de l'avis</Label>
                <Input id="title" placeholder="Résumez votre expérience" />
              </div>
              <div>
                <Label htmlFor="comment">Votre commentaire</Label>
                <Textarea
                  id="comment"
                  placeholder="Partagez les détails de votre expérience..."
                  rows={5}
                  className="resize-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsWriteReviewOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSubmitReview} className="bg-[#B85C38] hover:bg-[#9A4A2E]">
                  Publier l'avis
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
     <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
  {stats.map((stat) => {
    const Icon = stat.icon
    return (
      <Card key={stat.title} className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-grow-0">
          <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex-grow flex items-end">
          <div className="text-2xl font-bold">{stat.value}</div>
        </CardContent>
      </Card>
    )
  })}
</div>


      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans vos avis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">Tous les avis</TabsTrigger>
          <TabsTrigger value="stores">
            <Store className="mr-2 h-4 w-4" />
            Magasins
          </TabsTrigger>
          <TabsTrigger value="restaurants">
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Restaurants
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
          {paginatedReviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">Aucun avis trouvé</h3>
                <p className="text-sm text-muted-foreground mt-2">Commencez par écrire votre premier avis</p>
                <Button className="mt-6 bg-[#B85C38] hover:bg-[#9A4A2E]" onClick={() => setIsWriteReviewOpen(true)}>
                  Écrire un avis
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {paginatedReviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {review.businessType === "store" ? (
                              <Store className="h-6 w-6" />
                            ) : (
                              <UtensilsCrossed className="h-6 w-6" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{review.businessName}</h3>
                            <Badge variant="secondary" className="bg-yellow-500 text-white">
                              Magasins
                            </Badge>
                          </div>
                          {renderStars(review.rating)}
                          <p className="text-sm text-muted-foreground mt-1">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditReview(review)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(review.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>

                    {review.response && (
                      <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                        <p className="text-sm font-semibold mb-2">Réponse du commerce</p>
                        <p className="text-sm text-muted-foreground">{review.response.text}</p>
                        <p className="text-xs text-muted-foreground mt-2">{review.response.date}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-2">
                      <Button variant="outline" size="sm" onClick={() => handleMarkHelpful(review.id)}>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Utile ({review.helpful})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

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
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
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

      <Dialog open={!!editingReview} onOpenChange={(open) => !open && setEditingReview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier votre avis</DialogTitle>
            <DialogDescription>Mettez à jour votre avis sur {editingReview?.businessName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Note</Label>
              <div className="mt-2">
                {renderStars(editFormData.rating, true, (rating) => setEditFormData({ ...editFormData, rating }))}
              </div>
            </div>
            <div>
              <Label htmlFor="edit-title">Titre de l'avis</Label>
              <Input
                id="edit-title"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-comment">Votre commentaire</Label>
              <Textarea
                id="edit-comment"
                value={editFormData.comment}
                onChange={(e) => setEditFormData({ ...editFormData, comment: e.target.value })}
                rows={5}
                className="resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingReview(null)}>
                Annuler
              </Button>
              <Button onClick={handleSaveEdit} className="bg-[#B85C38] hover:bg-[#9A4A2E]">
                Enregistrer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
