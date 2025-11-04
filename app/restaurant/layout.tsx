import type React from "react"
import { MerchantSidebar } from "@/components/merchant/sidebar"

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <MerchantSidebar isRestaurant />
      <main className="flex-1 pt-4 px-6 pb-6 md:pt-6 md:px-8 md:pb-8 bg-muted/30">{children}</main>
    </div>
  )
}
