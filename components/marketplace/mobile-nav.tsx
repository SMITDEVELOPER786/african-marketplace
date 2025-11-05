"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Store, UtensilsCrossed, Info, HelpCircle, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage, type Language } from "@/lib/i18n-context"
import { Separator } from "@/components/ui/separator"

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
]

export function MobileNav() {
  const { t, language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/search/results?type=store", label: t("nav.stores"), icon: Store },
    { href: "/search/results?type=restaurant", label: t("nav.restaurants"), icon: UtensilsCrossed },
    { href: "/about", label: t("nav.about"), icon: Info },
    { href: "/help", label: t("nav.help"), icon: HelpCircle },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {/* Let Sheet handle the toggle automatically, no onClick */}
        <Button variant="ghost" size="icon" className="md:hidden">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">{isOpen ? t("common.closeMenu") : t("common.openMenu")}</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[280px] sm:w-[320px]" modal>
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-4 mb-2">
          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground">
            <Languages className="h-4 w-4" />
            <span>Langue / Language</span>
          </div>
          <div className="grid grid-cols-2 gap-2 px-3 mt-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage(lang.code)}
                className="justify-start gap-2"
              >
                <span>{lang.flag}</span>
                <span className="text-xs">{lang.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // close menu when a link is clicked
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-muted"
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Separator className="my-4" />

        <div className="text-xs text-muted-foreground px-3">
          <p className="font-medium mb-1">AfroMarket</p>
          <p>La marketplace N°1 des produits africains</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
