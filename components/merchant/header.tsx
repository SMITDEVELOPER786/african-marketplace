"use client"

import { Bell, Globe, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { logout } from "@/app/actions/auth"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

interface MerchantHeaderProps {
  userName?: string
  userRole?: string
  userAvatar?: string
}

export function MerchantHeader({ userName = "Com ANIKA", userRole = "Commerçant", userAvatar }: MerchantHeaderProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const result = await logout()

        if (result.success) {
          // Redirection côté client après déconnexion réussie
          router.push("/login")
          router.refresh()
        } else {
          console.error("Erreur lors de la déconnexion:", result.error)
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error)
      }
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-500 h-16 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <Link href="/merchant" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-sm">
            <span className="font-bold text-primary-foreground text-lg">A</span>
          </div>
          {/* <span className="font-bold text-xl hidden sm:inline">AfroMarket</span> */}
          <span className="font-bold text-xl hidden sm:inline truncate">AfroMarket</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Selector */}
          <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-accent">
            <Globe className="h-5 w-5" />
            <span className="sr-only">Changer de langue</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-accent">
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
            >
              3
            </Badge>
            <span className="sr-only">3 nouvelles notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 md:gap-3 h-10 hover:bg-accent">
                <Avatar className="h-8 w-8 ring-2 ring-border">
                  <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium leading-none">{userName}</span>
                  <span className="text-xs text-muted-foreground leading-none mt-1">{userRole}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userRole}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/merchant/profile" className="w-full cursor-pointer">
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/merchant/settings" className="w-full cursor-pointer">
                  Paramètres
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout} disabled={isPending}>
                {isPending ? "Déconnexion..." : "Déconnexion"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
