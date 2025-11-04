import type React from "react"
import { MerchantSidebar } from "@/components/merchant/sidebar"
import { MerchantHeader } from "@/components/merchant/header"

export default function MerchantLayout({ children }: { children: React.NodeNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Fixed at top with backdrop blur */}
      <MerchantHeader />

      {/* Container for sidebar and main content */}
      <div className="flex pt-16">
        {/* Sidebar - Fixed on left with smooth transitions */}
        <MerchantSidebar />

        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container-spacing section-spacing max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
