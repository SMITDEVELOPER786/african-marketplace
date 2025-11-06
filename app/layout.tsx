import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { LanguageProvider } from "@/lib/i18n-context"
import { MarketplaceHeader } from "@/components/marketplace/header"
import { AIChatbot } from "@/components/ai/chatbot"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AfroMarket - Découvrez les Commerces et Restaurants Africains",
  description:
    "Trouvez des épiceries et restaurants africains authentiques près de chez vous. Achetez en ligne ou visitez en personne pour les meilleurs produits et cuisine africains.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <MarketplaceHeader />
              <main className="flex-1 pt-16">{/* ← ADD pt-16 HERE */}
                {children}
              </main>
              <AIChatbot />
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}