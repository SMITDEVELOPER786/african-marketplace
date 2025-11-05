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
<<<<<<< HEAD
    <Card className="w-full">
=======
    <Card>
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>{t("customer.recommendedForYou")}</CardTitle>
        </div>
        <CardDescription>{t("customer.basedOnPreferences")}</CardDescription>
      </CardHeader>
<<<<<<< HEAD

      <CardContent className="p-4 sm:p-6">
       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">

          {recommendations.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute right-2 top-2 bg-primary text-white text-xs sm:text-sm">
=======
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  <Badge className="absolute right-2 top-2 bg-primary">
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
                    {item.reason === "basedOnPreferences" && t("customer.recommendedForYou")}
                    {item.reason === "trendingNow" && t("customer.trendingNow")}
                    {item.reason === "newArrivals" && t("customer.newArrivals")}
                  </Badge>
                </div>
<<<<<<< HEAD

                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm sm:text-base">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.store}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm sm:text-lg font-bold">{item.price}</span>
                    <Button size="sm" className="text-xs sm:text-sm">
                      {t("store.viewDetails")}
                    </Button>
=======
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.store}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">{item.price}</span>
                    <Button size="sm">{t("store.viewDetails")}</Button>
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
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
