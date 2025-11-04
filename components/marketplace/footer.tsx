"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { Separator } from "@/components/ui/separator"

export function MarketplaceFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-muted/30 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid Section */}
        <div className="grid gap-10 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4 place-items-center">
          {/* About */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">A</span>
              </div>
              <span className="font-bold">{t("header.appName")}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <Link href="https://facebook.com" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/stores" className="text-muted-foreground hover:text-foreground">{t("nav.stores")}</Link></li>
              <li><Link href="/restaurants" className="text-muted-foreground hover:text-foreground">{t("nav.restaurants")}</Link></li>
              <li><Link href="/map" className="text-muted-foreground hover:text-foreground">{t("nav.mapView")}</Link></li>
              <li><Link href="/search" className="text-muted-foreground hover:text-foreground">{t("search.title")}</Link></li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.forBusinesses")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/register?role=merchant" className="text-muted-foreground hover:text-foreground">{t("footer.registerBusiness")}</Link></li>
              <li><Link href="/merchant" className="text-muted-foreground hover:text-foreground">{t("header.merchantDashboard")}</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">{t("footer.pricing")}</Link></li>
              <li><Link href="/help" className="text-muted-foreground hover:text-foreground">{t("footer.help")}</Link></li>
              <li>
                <a
                  href="/api/download-cahier-des-charges"
                  download
                  className="text-muted-foreground hover:text-foreground flex items-center justify-center sm:justify-start gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Cahier des charges
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@afromarket.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>© 2025 AfroMarket. {t("footer.allRightsReserved")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-foreground">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-foreground">{t("footer.terms")}</Link>
            <Link href="/cookies" className="hover:text-foreground">{t("footer.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
