"use client"

import Link from "next/link"
import { Star, MapPin, ShoppingBag, Clock } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n-context"

interface BusinessCardProps {
  id: string
  name: string
  type: "store" | "restaurant"
  description: string
  imageUrl: string
  rating: number
  reviewCount: number
  location: string
  address?: string
  cuisineType?: string
  countryOrigin?: string
  isPremium?: boolean
  isOpen?: boolean
  openingHours?: string
}

export function BusinessCard({
  id,
  name,
  type,
  description,
  imageUrl,
  rating,
  reviewCount,
  location,
  address,
  cuisineType,
  countryOrigin,
  isPremium = false,
  isOpen = true,
  openingHours,
}: BusinessCardProps) {
  const { t } = useLanguage()
  const href = type === "store" ? `/stores/${id}` : `/restaurants/${id}`

  return (
    <Link href={href}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {isPremium && (
            <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">
              {t("results.featured")}
            </Badge>
          )}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="destructive">{t("store.closed")}</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-1">{name}</h3>
            <div className="flex items-center gap-1 text-sm shrink-0">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{description}</p>

          <div className="space-y-1.5 text-sm mt-auto">
            {countryOrigin && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {countryOrigin}
                </Badge>
                {cuisineType && (
                  <Badge variant="outline" className="text-xs">
                    {cuisineType}
                  </Badge>
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{address || location}</span>
            </div>

            {openingHours && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground text-xs">{openingHours}</span>
                <Badge variant={isOpen ? "default" : "secondary"} className="text-xs ml-auto">
                  {isOpen ? t("store.openNow") : t("store.closed")}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {type === "store" ? (
            <Button className="w-full gap-2" size="sm">
              <ShoppingBag className="h-4 w-4" />
              {t("store.shopNow")}
            </Button>
          ) : (
            <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
              <MapPin className="h-4 w-4" />
              {t("store.viewDetails")}
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
