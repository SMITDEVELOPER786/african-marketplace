"use client"

import { MarketplaceFooter } from "@/components/marketplace/footer"
import { SearchBar } from "@/components/marketplace/search-bar"
import { SecondaryNav } from "@/components/marketplace/secondary-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Globe, Users, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n-context"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <SecondaryNav />

      <div className="border-b bg-muted/30 sticky top-[64px] z-30 backdrop-blur supports-[backdrop-filter]:bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar variant="compact" />
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-5xl font-bold tracking-tight text-balance">
                {t("footer.aboutUs")} - {t("header.appName")}
              </h1>
              <p className="mt-6 text-xl text-muted-foreground text-balance">{t("footer.tagline")}</p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{t("common.learnMore")} - Notre Mission</h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  AfroMarket a été créé avec une vision simple mais puissante : rendre les produits et la cuisine
                  africaine authentiques accessibles à tous, où qu'ils soient en Europe, aux États-Unis et au Canada.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Nous croyons que la nourriture est bien plus qu'un simple repas - c'est un lien avec nos racines,
                  notre culture et notre communauté. C'est pourquoi nous nous efforçons de créer une plateforme qui
                  célèbre la diversité culinaire africaine tout en soutenant les entrepreneurs locaux.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src="/african-community-marketplace.jpg"
                  alt="Communauté AfroMarket"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/50 py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Nos Valeurs</h2>
              <p className="mt-3 text-lg text-muted-foreground">Les principes qui guident notre travail chaque jour</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Authenticité</h3>
                <p className="text-muted-foreground">
                  Nous garantissons des produits 100% authentiques provenant directement d'Afrique ou préparés selon des
                  recettes traditionnelles.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Communauté</h3>
                <p className="text-muted-foreground">
                  Nous créons des ponts entre la diaspora africaine et les commerces locaux pour renforcer les liens
                  communautaires.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibilité</h3>
                <p className="text-muted-foreground">
                  Nous rendons les produits africains accessibles partout en Europe, aux États-Unis et au Canada grâce à
                  notre réseau de partenaires.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Croissance</h3>
                <p className="text-muted-foreground">
                  Nous aidons les entrepreneurs africains à développer leur activité et à atteindre de nouveaux clients.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Confiance</h3>
                <p className="text-muted-foreground">
                  Nous vérifions tous nos partenaires et garantissons la qualité des produits et services proposés.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  Nous utilisons la technologie pour simplifier l'accès aux produits africains et améliorer l'expérience
                  utilisateur.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Notre Histoire</h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  AfroMarket est né d'une expérience personnelle. En 2020, nos fondateurs, membres de la diaspora
                  africaine vivant en Europe, ont réalisé à quel point il était difficile de trouver des produits
                  africains authentiques et de qualité.
                </p>

                <p>
                  Les petits commerces africains, bien que proposant d'excellents produits, avaient du mal à se faire
                  connaître au-delà de leur quartier. De l'autre côté, les clients potentiels ne savaient pas où trouver
                  ces trésors culinaires.
                </p>

                <p>
                  C'est ainsi qu'est née l'idée d'AfroMarket : une plateforme qui réunit tous les acteurs de
                  l'écosystème africain en Europe, aux États-Unis et au Canada. Aujourd'hui, nous sommes fiers de
                  compter plus de 1,200 commerces partenaires et 50,000 utilisateurs satisfaits.
                </p>

                <p>
                  Notre voyage ne fait que commencer. Nous continuons à innover et à élargir notre réseau pour rendre la
                  culture africaine accessible à tous, partout.
                </p>
              </div>

              <div className="mt-12 text-center">
                <Button size="lg" asChild>
                  <Link href="/search/results">{t("home.featuredBusinesses")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
