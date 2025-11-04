"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Percent, Edit, Trash2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

export default function MerchantPromotionsPage() {
  const { t } = useLanguage()

  const promotions = [
    {
      id: "1",
      name: "Réduction de Printemps",
      code: "SPRING25",
      discount: "25%",
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      status: "active" as const,
      uses: 45,
    },
    {
      id: "2",
      name: "Livraison Gratuite",
      code: "FREESHIP",
      discount: "Livraison gratuite",
      startDate: "2025-01-15",
      endDate: "2025-12-31",
      status: "active" as const,
      uses: 128,
    },
    {
      id: "3",
      name: "Soldes d'Hiver",
      code: "WINTER20",
      discount: "20%",
      startDate: "2024-12-01",
      endDate: "2025-01-15",
      status: "expired" as const,
      uses: 89,
    },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("merchant.promotions")}</h1>
          <p className="mt-2 text-muted-foreground">{t("merchant.managePromotions")}</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("merchant.createPromotion")}
        </Button>
      </div>

      <div className="grid gap-4">
        {promotions.map((promo) => (
          <Card key={promo.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {promo.name}
                    <Badge variant={promo.status === "active" ? "default" : "secondary"}>
                      {promo.status === "active" ? t("merchant.active") : t("merchant.expired")}
                    </Badge>
                  </CardTitle>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      {t("merchant.code")}: <code className="rounded bg-muted px-1">{promo.code}</code>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(promo.startDate).toLocaleDateString("fr-FR")} -{" "}
                      {new Date(promo.endDate).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{promo.discount}</p>
                  <p className="text-sm text-muted-foreground">{t("merchant.discount")}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{promo.uses}</p>
                  <p className="text-sm text-muted-foreground">{t("merchant.timesUsed")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
