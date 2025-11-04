"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Store, User, Heart, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  icon: React.ElementType
  label: string
  activePattern: RegExp
}

const navItems: NavItem[] = [
  {
    href: "/",
    icon: Home,
    label: "Accueil",
    activePattern: /^\/$/,
  },
  {
    href: "/search/results",
    icon: Store,
    label: "Recherche",
    activePattern: /^\/search/,
  },
  {
    href: "/customer/favorites",
    icon: Heart,
    label: "Favoris",
    activePattern: /^\/customer\/favorites/,
  },
  {
    href: "/customer/profile",
    icon: User,
    label: "Profil",
    activePattern: /^\/customer\/profile/,
  },
  {
    href: "/customer/settings",
    icon: Settings,
    label: "Paramètres",
    activePattern: /^\/customer\/settings/,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.activePattern.test(pathname)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
