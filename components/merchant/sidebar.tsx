"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Store,
  FolderTree,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Users,
  ChevronDown,
  CreditCard,
  Calendar,
  LayoutGrid,
  MessageSquare,
  UtensilsCrossed,
  Megaphone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MerchantSidebarProps {
  isRestaurant?: boolean
}

export function MerchantSidebar({ isRestaurant = false }: MerchantSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const basePath = isRestaurant ? "/restaurant" : "/merchant"
  const [isUsersOpen, setIsUsersOpen] = useState(pathname.startsWith(`${basePath}/users`))

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setIsCollapsed(saved === "true")
    }
  }, [])

  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  const navigation = isRestaurant
    ? [
        { name: "Tableau de bord", href: basePath, icon: LayoutDashboard },
        { name: "Profil du restaurant", href: `${basePath}/profile`, icon: Store },
        { name: "Menu & Formules", href: `${basePath}/menu`, icon: UtensilsCrossed },
        { name: "Commandes", href: `${basePath}/orders`, icon: ShoppingBag },
        { name: "Réservations", href: `${basePath}/reservations`, icon: Calendar },
        { name: "Tables", href: `${basePath}/tables`, icon: LayoutGrid },
        { name: "Demandes", href: `${basePath}/requests`, icon: Mail },
        { name: "Commentaires", href: `${basePath}/reviews`, icon: MessageSquare },
        { name: "Publicité", href: `${basePath}/advertising`, icon: Megaphone },
        { name: "Abonnements", href: `${basePath}/subscriptions`, icon: CreditCard },
        { name: "Paramètres", href: `${basePath}/settings`, icon: Settings },
      ]
    : [
        { name: "Tableau de bord", href: basePath, icon: LayoutDashboard },
        { name: "Profil du commerce", href: `${basePath}/profile`, icon: Store },
        { name: "Catalogue", href: `${basePath}/catalog`, icon: FolderTree },
        { name: "Clic & Collect", href: `${basePath}/click-collect`, icon: ShoppingBag },
        { name: "Demandes", href: `${basePath}/requests`, icon: Mail },
        { name: "Commentaires", href: `${basePath}/reviews`, icon: MessageSquare },
        { name: "Publicité", href: `${basePath}/advertising`, icon: Megaphone },
        { name: "Abonnements", href: `${basePath}/subscriptions`, icon: CreditCard },
        { name: "Paramètres", href: `${basePath}/settings`, icon: Settings },
      ]

  const usersSubmenu = [
    { name: "Clients", href: `${basePath}/users/clients` },
    { name: "Personnel", href: `${basePath}/users/staff` },
  ]

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col bg-sidebar">
      {!mobile && (
        <div className="flex h-10 items-center justify-end border-b border-sidebar-border px-4 py-1">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCollapsed}
            className="h-7 w-7 border-sidebar-border bg-transparent hover:bg-sidebar-accent transition-all duration-200"
            title={isCollapsed ? "Développer le menu" : "Réduire le menu"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3.5 w-3.5 transition-transform" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5 transition-transform" />
            )}
            <span className="sr-only">{isCollapsed ? "Développer le menu" : "Réduire le menu"}</span>
          </Button>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto p-2 pt-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href} onClick={() => mobile && setIsMobileOpen(false)}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 transition-all duration-200 mb-1",
                  isCollapsed && !mobile && "justify-center px-2",
                  isActive && "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm",
                  !isActive && "hover:bg-sidebar-accent hover:text-sidebar-primary hover:font-medium hover:shadow-sm",
                )}
                title={isCollapsed && !mobile ? item.name : undefined}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-sidebar-primary")} />
                {(!isCollapsed || mobile) && <span className="truncate">{item.name}</span>}
              </Button>
            </Link>
          )
        })}

        <Collapsible open={isUsersOpen} onOpenChange={setIsUsersOpen} className="space-y-1">
          <CollapsibleTrigger asChild>
            <Button
              variant={pathname.startsWith(`${basePath}/users`) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all duration-200",
                isCollapsed && !mobile && "justify-center px-2",
                pathname.startsWith(`${basePath}/users`) &&
                  "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm",
             !pathname.startsWith(`${basePath}/users`) &&
  "hover:bg-sidebar-accent hover:text-sidebar-primary hover:font-medium hover:shadow-sm",
              )}
              title={isCollapsed && !mobile ? "Utilisateurs" : undefined}
            >
              <Users
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  pathname.startsWith(`${basePath}/users`) && "text-sidebar-primary",
                )}
              />
              {(!isCollapsed || mobile) && (
                <>
                  <span className="flex-1 text-left truncate">Utilisateurs</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isUsersOpen && "rotate-180",
                      pathname.startsWith(`${basePath}/users`) && "text-sidebar-primary",
                    )}
                  />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          {(!isCollapsed || mobile) && (
            <CollapsibleContent className="space-y-1 pl-4 pt-1 animate-in slide-in-from-top-2 duration-200">
              {usersSubmenu.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} onClick={() => mobile && setIsMobileOpen(false)}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start transition-all duration-200",
                        isActive && "bg-sidebar-accent text-sidebar-primary font-medium",
                       !isActive && "hover:bg-sidebar-accent hover:text-sidebar-primary hover:font-medium",
                      )}
                    >
                      <span className="truncate">{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
            </CollapsibleContent>
          )}
        </Collapsible>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link href="/" onClick={() => mobile && setIsMobileOpen(false)}>
          <Button
            variant="ghost"
            className={cn(
           "w-full justify-start gap-3  transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-primary hover:font-medium hover:shadow-sm",
              isCollapsed && !mobile && "justify-center px-2",
            )}
            title={isCollapsed && !mobile ? "Retour au site" : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || mobile) && <span className="truncate">Retour au site</span>}
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-20 z-50 md:hidden shadow-lg hover:shadow-xl transition-shadow duration-200 bg-transparent"
          >
            <Menu className="h-5 w-5  " />
            <span className="sr-only">Ouvrir le menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 mt-16">
          <SidebarContent mobile />
        </SheetContent>
      </Sheet>

      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 z-40 hidden border-r border-sidebar-border bg-sidebar shadow-sm transition-all duration-300 md:block",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Spacer pour le contenu principal */}
      <div
        className={cn("hidden md:block flex-shrink-0 transition-all duration-300", isCollapsed ? "w-16" : "w-64")}
        aria-hidden="true"
      />
    </>
  )
}
