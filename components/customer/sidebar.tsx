"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Heart,
  MessageSquare,
  Sparkles,
  Calendar,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Send,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const menuItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/customer" },
  { icon: User, label: "Mon profil", href: "/customer/profile" },
  { icon: ShoppingCart, label: "Panier", href: "/customer/cart" },
  { icon: ShoppingBag, label: "Commandes", href: "/customer/orders" },
  { icon: Heart, label: "Favoris", href: "/customer/favorites" },
  { icon: MessageSquare, label: "Commentaires", href: "/customer/reviews" },
  { icon: Send, label: "Demandes", href: "/customer/requests" },
  { icon: Sparkles, label: "Bonnes affaires", href: "/customer/deals" },
  { icon: Calendar, label: "Réservations", href: "/customer/reservations" },
]

export function CustomerSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("customer-sidebar-collapsed")
    if (saved !== null) {
      setIsCollapsed(saved === "true")
    }
  }, [])

  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("customer-sidebar-collapsed", String(newState))
    window.dispatchEvent(new Event("sidebar-toggle"))
  }

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col bg-sidebar">
      {!mobile && (
        <div className="flex h-10 items-center justify-end border-b border-sidebar-border px-4 py-1">
        <Button
  variant="outline"
  size="icon"
  onClick={toggleCollapsed}
  className="h-7 w-7 border-sidebar-border bg-transparent 
             hover:bg-sidebar-accent hover:text-gray-900 hover:font-semibold 
             transition-all duration-200"
  title={isCollapsed ? "Développer le menu" : "Réduire le menu"}
>
  {isCollapsed ? (
    <ChevronRight className="h-3.5 w-3.5 transition-transform " />
  ) : (
    <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:text-gray-900" />
  )}
  <span className="sr-only">{isCollapsed ? "Développer le menu" : "Réduire le menu"}</span>
</Button>

        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto p-2 pt-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href} onClick={() => mobile && setIsMobileOpen(false)}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 transition-all duration-200",
                  isCollapsed && !mobile && "justify-center px-2",
                  isActive && "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm",
                  !isActive && "hover:bg-sidebar-accent/50 hover:text-gray-800 hover:font-semibold",
                )}
                title={isCollapsed && !mobile ? item.label : undefined}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-sidebar-primary")} />
                {(!isCollapsed || mobile) && <span className="truncate">{item.label}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link href="/login" onClick={() => mobile && setIsMobileOpen(false)}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 hover:bg-sidebar-accent/50  transition-all duration-200",
              isCollapsed && !mobile && "justify-center px-2",
            )}
            title={isCollapsed && !mobile ? "Se déconnecter" : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || mobile) && <span className="truncate">Se déconnecter</span>}
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu */}
     <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
  <SheetTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      className="fixed left-4 top-[4.5rem] z-50 md:hidden shadow-lg hover:shadow-xl transition-shadow duration-200 bg-background border-2"
    >
      <Menu className="h-5 w-5 bottom-1.5" />
      <span className="sr-only ">Ouvrir le menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-64 p-0 mt-16">
    <SidebarContent mobile />
  </SheetContent>
</Sheet>


      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 z-40 hidden border-r border-sidebar-border bg-sidebar shadow-sm transition-all duration-300 md:block",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
