import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-x-auto p-4 md:p-6 bg-muted/30">{children}</main>
    </div>
  )
}
