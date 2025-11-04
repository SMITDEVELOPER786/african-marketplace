"use client"

import type React from "react"
import { CustomerSidebar } from "@/components/customer/sidebar"
import { useEffect, useState } from "react"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("customer-sidebar-collapsed")
    if (saved !== null) {
      setIsCollapsed(saved === "true")
    }

    // Listen for storage changes to sync across components
    const handleStorageChange = () => {
      const saved = localStorage.getItem("customer-sidebar-collapsed")
      if (saved !== null) {
        setIsCollapsed(saved === "true")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    // Custom event for same-tab updates
    window.addEventListener("sidebar-toggle", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("sidebar-toggle", handleStorageChange)
    }
  }, [])

  return (
    <div className="flex min-h-screen">
      <CustomerSidebar />
      <div
        className={`hidden md:block flex-shrink-0 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
        aria-hidden="true"
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">{children}</main>
    </div>
  )
}
