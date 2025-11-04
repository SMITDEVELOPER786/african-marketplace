"use client"

import Link from "next/link"
import { Store, UtensilsCrossed, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n-context"

export function CategoryNav() {
  const { t } = useLanguage()

  const categories = [
    { name: t("nav.all"), href: "/", icon: Sparkles },
    { name: t("nav.stores"), href: "/stores", icon: Store },
    { name: t("nav.restaurants"), href: "/restaurants", icon: UtensilsCrossed },
  ]

  return (
    <nav className="border-b bg-card">
      <div className="container">
        <div className="flex items-center gap-2 overflow-x-auto py-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Button variant="ghost" className="gap-2 whitespace-nowrap">
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
