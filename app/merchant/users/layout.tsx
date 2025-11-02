"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Users, UserCog } from "lucide-react"

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const tabs = [
    {
      name: "Clients",
      href: "/merchant/users/clients",
      icon: Users,
      active: pathname === "/merchant/users/clients",
    },
    {
      name: "Personnel",
      href: "/merchant/users/staff",
      icon: UserCog,
      active: pathname === "/merchant/users/staff",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b">
        <nav className="flex gap-4 px-6" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors",
                  tab.active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>
      {children}
    </div>
  )
}
