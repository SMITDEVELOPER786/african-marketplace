"use client"

import { useLanguage } from "@/lib/i18n-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function AIRecommendations() {
  const { t } = useLanguage()

  const recommendations = [
    {
      id: 1,
      name: "Riz Jollof Premium",
      store: "Afro Spice Market",
      price: "€8.99",
      image: "/jollof-rice-west-african.jpg",
      reason: "basedOnPreferences",
    },
    {
      id: 2,
      name: "Thiéboudienne",
      store: "Mama Africa Restaurant",
      price: "€16.99",
      image: "/thieboudienne-senegal.jpg",
      reason: "trendingNow",
    },
    {
      id: 3,
      name: "Mafé Poulet",
      store: "Sahel Restaurant",
      price: "€14.99",
      image: "/mafe-poulet-chicken-peanut.jpg",
      reason: "newArrivals",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>{t("customer.recommendedForYou")}</CardTitle>
        </div>
        <CardDescription>{t("customer.basedOnPreferences")}</CardDescription>
      </CardHeader>
      <CardContent>
       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
  {recommendations.map((item) => (
    <Link key={item.id} href={`/products/${item.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover"
          />
          <Badge className="absolute right-2 top-2 bg-primary text-white">
            {item.reason === "basedOnPreferences" && t("customer.recommendedForYou")}
            {item.reason === "trendingNow" && t("customer.trendingNow")}
            {item.reason === "newArrivals" && t("customer.newArrivals")}
          </Badge>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.store}</p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold">{item.price}</span>
            <Button size="sm">{t("store.viewDetails")}</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  ))}
</div>

             
      </CardContent>
    </Card>
  )
}
