"use client"

import Link from "next/link"
import { User, Store, LogOut, Settings, UserCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n-context"
import { useAuth } from "@/lib/auth-context"
import { LanguageSelector } from "@/components/language-selector"
import { MobileNav } from "@/components/marketplace/mobile-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export function MarketplaceHeader() {
  const { t } = useLanguage()
  const { user, signOut, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const getUserInitials = () => {
    if (!user) return "U"
    const firstInitial = user.first_name?.[0] || ""
    const lastInitial = user.last_name?.[0] || ""
    return (firstInitial + lastInitial).toUpperCase() || "U"
  }

  const getRoleLabel = () => {
    if (!user) return ""
    switch (user.role) {
      case "customer":
        return "Client"
      case "merchant":
        return "Commerçant"
      case "restaurant":
        return "Restaurateur"
      default:
        return ""
    }
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MobileNav />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">A</span>
            </div>
            <span className="hidden font-bold sm:inline-block">{t("header.appName")}</span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-medium">{user.first_name} {user.last_name}</span>
                    <span className="text-xs text-muted-foreground">{getRoleLabel()}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.first_name} {user.last_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {user.role === "customer" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/customer" className="cursor-pointer">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Mon espace</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/customer/cart" className="cursor-pointer">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Panier</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/customer/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {user.role === "merchant" && (
                  <DropdownMenuItem asChild>
                    <Link href="/merchant" className="cursor-pointer font-medium">
                      <Store className="mr-2 h-4 w-4" />
                      <span>Accès commerçant</span>
                    </Link>
                  </DropdownMenuItem>
                )}

                {user.role === "restaurant" && (
                  <DropdownMenuItem asChild>
                    <Link href="/restaurant" className="cursor-pointer font-medium">
                      <Store className="mr-2 h-4 w-4" />
                      <span>Accès restaurateur</span>
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signin">
              <Button
                variant="default"
                size="sm"
                className="gap-2 focus:outline-none focus:ring-0 focus:text-inherit active:text-inherit"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{t("header.signIn")}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}