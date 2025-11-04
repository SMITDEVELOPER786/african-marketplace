"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const settingsNav = [
    { name: "Général", href: "/admin/settings/general" },
    { name: "Notifications", href: "/admin/settings/notifications" },
    { name: "Sécurité", href: "/admin/settings/security" },
    { name: "Paiements", href: "/admin/settings/payments" },
    { name: "Apparence", href: "/admin/settings/appearance" },
    { name: "Libellés", href: "/admin/settings/labels" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b overflow-x-auto">
        {settingsNav.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button variant={pathname === item.href ? "default" : "ghost"} className="rounded-b-none whitespace-nowrap">
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
      {children}
    </div>
  )
}
