"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Store,
  MessageSquare,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Menu,
  TrendingUp,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar-collapsed")
    if (saved !== null) {
      setIsCollapsed(saved === "true")
    }
  }, [pathname])

  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("admin-sidebar-collapsed", String(newState))
  }

  const navigation = [
    { name: t("admin.dashboard"), href: "/admin", icon: LayoutDashboard },
    { name: t("admin.users"), href: "/admin/users", icon: Users },
    { name: t("admin.businesses"), href: "/admin/businesses", icon: Store },
    { name: "Commentaires", href: "/admin/comments", icon: MessageSquare },
    { name: "Publicités", href: "/admin/advertising", icon: TrendingUp },
  ]

  const subscriptionsLink = {
    name: "Abonnements",
    href: "/admin/subscriptions/management",
    icon: CreditCard,
  }

  const settingsLink = {
    name: t("admin.settings"),
    href: "/admin/settings/general",
    icon: Settings,
  }

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {(!isCollapsed || mobile) && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive">
              <Shield className="h-4 w-4 text-destructive-foreground" />
            </div>
            <span className="font-semibold text-sm">{t("admin.panelTitle")}</span>
          </Link>
        )}
        {!mobile && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCollapsed}
            className={cn("h-9 w-9 flex-shrink-0 border-2 hover:bg-accent", isCollapsed && "mx-auto")}
            title={isCollapsed ? "Développer le menu" : "Réduire le menu"}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href} onClick={() => mobile && setIsMobileOpen(false)}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isCollapsed && !mobile && "justify-center px-2",
                  isActive && "bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive",
                )}
                title={isCollapsed && !mobile ? item.name : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {(!isCollapsed || mobile) && <span>{item.name}</span>}
              </Button>
            </Link>
          )
        })}

        <Link href={subscriptionsLink.href} onClick={() => mobile && setIsMobileOpen(false)}>
          <Button
            variant={pathname.startsWith("/admin/subscriptions") ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3",
              isCollapsed && !mobile && "justify-center px-2",
              pathname.startsWith("/admin/subscriptions") &&
                "bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive",
            )}
            title={isCollapsed && !mobile ? subscriptionsLink.name : undefined}
          >
            <CreditCard className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || mobile) && <span>{subscriptionsLink.name}</span>}
          </Button>
        </Link>

        <Link href={settingsLink.href} onClick={() => mobile && setIsMobileOpen(false)}>
          <Button
            variant={pathname.startsWith("/admin/settings") ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3",
              isCollapsed && !mobile && "justify-center px-2",
              pathname.startsWith("/admin/settings") &&
                "bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive",
            )}
            title={isCollapsed && !mobile ? settingsLink.name : undefined}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || mobile) && <span>{settingsLink.name}</span>}
          </Button>
        </Link>
      </nav>

      {/* Footer */}
      <div className="border-t p-2">
        <Link href="/" onClick={() => mobile && setIsMobileOpen(false)}>
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-3", isCollapsed && !mobile && "justify-center px-2")}
            title={isCollapsed && !mobile ? t("admin.backToSite") : undefined}
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || mobile) && <span>{t("admin.backToSite")}</span>}
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent mobile />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen border-r bg-card transition-all duration-300 md:block",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Spacer for fixed sidebar */}
      <div className={cn("hidden md:block transition-all duration-300", isCollapsed ? "w-16" : "w-64")} />
    </>
  )
}
