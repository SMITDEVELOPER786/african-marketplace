"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, Ban, Star, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const comments = [
  {
    id: "1",
    business: "Afro Delights Market",
    businessType: "commerce",
    user: "John Doe",
    rating: 5,
    comment: "Amazing products and great service! Highly recommend.",
    status: "approved" as const,
    date: "2025-01-18",
    city: "Paris",
    country: "France",
  },
  {
    id: "2",
    business: "Mama Africa Restaurant",
    businessType: "restaurant",
    user: "Jane Smith",
    rating: 1,
    comment: "This is inappropriate content that should be removed.",
    status: "flagged" as const,
    date: "2025-01-18",
    city: "Lyon",
    country: "France",
  },
  {
    id: "3",
    business: "Jollof Palace",
    businessType: "restaurant",
    user: "Mike Johnson",
    rating: 4,
    comment: "Good food, but service could be better.",
    status: "pending" as const,
    date: "2025-01-17",
    city: "Marseille",
    country: "France",
  },
  {
    id: "4",
    business: "Sahel Spice Market",
    businessType: "commerce",
    user: "Sarah Williams",
    rating: 5,
    comment: "Excellent quality spices! Will definitely order again.",
    status: "approved" as const,
    date: "2025-01-16",
    city: "Toulouse",
    country: "France",
  },
  {
    id: "5",
    business: "Afro Cuisine Express",
    businessType: "restaurant",
    user: "David Brown",
    rating: 3,
    comment: "Average experience. Nothing special but not bad either.",
    status: "approved" as const,
    date: "2025-01-15",
    city: "Paris",
    country: "France",
  },
]

export default function AdminCommentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const filteredComments = comments.filter((comment) => {
    // Tab filter
    if (activeTab === "all") return true
    if (activeTab === "pending") return comment.status === "pending"
    if (activeTab === "flagged") return comment.status === "flagged"
    if (activeTab === "approved") return comment.status === "approved"

    if (
      searchQuery &&
      !comment.business.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !comment.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !comment.comment.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (countryFilter !== "all" && comment.country !== countryFilter) return false

    if (cityFilter !== "all" && comment.city !== cityFilter) return false

    if (typeFilter !== "all" && comment.businessType !== typeFilter) return false

    if (ratingFilter !== "all" && comment.rating !== Number.parseInt(ratingFilter)) return false

    return true
  })

  const cities = Array.from(new Set(comments.map((c) => c.city)))
  const countries = Array.from(new Set(comments.map((c) => c.country)))

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gestion des Commentaires</h1>
        <p className="mt-2 text-muted-foreground">Gérez tous les commentaires et avis effectués sur la plateforme</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par commerce, utilisateur ou commentaire..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les pays</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Note" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les notes</SelectItem>
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous ({comments.length})</TabsTrigger>
          <TabsTrigger value="pending">
            En attente ({comments.filter((c) => c.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="flagged">Signalés ({comments.filter((c) => c.status === "flagged").length})</TabsTrigger>
          <TabsTrigger value="approved">
            Approuvés ({comments.filter((c) => c.status === "approved").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {filteredComments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">Aucun commentaire trouvé</CardContent>
              </Card>
            ) : (
              filteredComments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">{comment.business}</span>
                          <Badge variant="outline">
                            {comment.businessType === "commerce" ? "Commerce" : "Restaurant"}
                          </Badge>
                          <Badge
                            variant={
                              comment.status === "approved"
                                ? "default"
                                : comment.status === "flagged"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {comment.status === "approved"
                              ? "Approuvé"
                              : comment.status === "flagged"
                                ? "Signalé"
                                : "En attente"}
                          </Badge>
                        </div>

                        <div className="mb-2 flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < comment.rating ? "fill-secondary text-secondary" : "text-muted-foreground",
                              )}
                            />
                          ))}
                        </div>

                        <p className="mb-2 text-sm">{comment.comment}</p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <span>Par {comment.user}</span>
                          <span>•</span>
                          <span>{comment.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {comment.city}, {comment.country}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {comment.status !== "approved" && (
                          <Button size="sm" className="gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Approuver
                          </Button>
                        )}
                        {comment.status !== "flagged" && (
                          <Button variant="destructive" size="sm" className="gap-2">
                            <Ban className="h-4 w-4" />
                            Supprimer
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
