"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SubscriptionsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const subscriptionsNav = [
    { name: "Gestion", href: "/admin/subscriptions/management" },
    { name: "Synthèse", href: "/admin/subscriptions/overview" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b">
        {subscriptionsNav.map((item) => (
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
