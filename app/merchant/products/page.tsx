"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n-context"

// Mock data
const products = [
  {
    id: "1",
    name: "Premium Palm Oil",
    category: "Oils & Fats",
    price: 24.99,
    stock: 45,
    status: "active" as const,
    imageUrl: "/palm-oil-bottle.jpg",
  },
  {
    id: "2",
    name: "Cassava Flour",
    category: "Flours & Starches",
    price: 12.99,
    stock: 120,
    status: "active" as const,
    imageUrl: "/cassava-flour.jpg",
  },
  {
    id: "3",
    name: "African Spice Mix",
    category: "Spices & Seasonings",
    price: 8.99,
    stock: 5,
    status: "active" as const,
    imageUrl: "/african-spices-colorful.jpg",
  },
  {
    id: "4",
    name: "Dried Fish",
    category: "Dried Fish & Meat",
    price: 34.99,
    stock: 0,
    status: "out_of_stock" as const,
    imageUrl: "/dried-fish-display.png",
  },
]

export default function MerchantProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLanguage()

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("merchant.products")}</h1>
          <p className="mt-2 text-muted-foreground">{t("merchant.manageProducts")}</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("merchant.addProduct")}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("search.searchProducts")}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">{t("search.filters")}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-4 text-left text-sm font-medium">{t("merchant.product")}</th>
                  <th className="p-4 text-left text-sm font-medium">{t("search.category")}</th>
                  <th className="p-4 text-left text-sm font-medium">{t("merchant.price")}</th>
                  <th className="p-4 text-left text-sm font-medium">{t("merchant.stock")}</th>
                  <th className="p-4 text-left text-sm font-medium">{t("merchant.status")}</th>
                  <th className="p-4 text-right text-sm font-medium">{t("merchant.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{product.category}</td>
                    <td className="p-4 font-medium">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={
                          product.stock === 0
                            ? "text-destructive"
                            : product.stock < 10
                              ? "text-secondary"
                              : "text-muted-foreground"
                        }
                      >
                        {product.stock} {t("merchant.units")}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status === "active" ? t("merchant.active") : t("merchant.outOfStock")}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            {t("merchant.edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            {t("merchant.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
