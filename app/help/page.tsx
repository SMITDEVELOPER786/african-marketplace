"use client"

import { MarketplaceFooter } from "@/components/marketplace/footer"
import { SecondaryNav } from "@/components/marketplace/secondary-nav"
import { SearchBar } from "@/components/marketplace/search-bar"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, ShoppingCart, Store, HelpCircle, Video } from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const guides = [
    {
      id: "customer",
      title: "Guide Client",
      icon: ShoppingCart,
      description: "Apprenez à utiliser AfroMarket en tant que client",
      steps: [
        {
          title: "1. Créer un compte",
          description:
            "Cliquez sur 'Se connecter' puis 'Créer un compte'. Choisissez le profil 'Client' et remplissez vos informations.",
          image: "/help/signup-customer.jpg",
        },
        {
          title: "2. Rechercher des produits",
          description:
            "Utilisez la barre de recherche sur la page d'accueil. Vous pouvez filtrer par pays, catégorie et localisation.",
          image: "/help/search-products.jpg",
        },
        {
          title: "3. Ajouter au panier",
          description:
            "Cliquez sur un produit pour voir les détails, puis sur 'Ajouter au panier'. Gérez les quantités depuis votre panier.",
          image: "/help/add-to-cart.jpg",
        },
        {
          title: "4. Valider la commande",
          description:
            "Accédez à votre panier, vérifiez les articles et cliquez sur 'Valider la commande'. Vous recevrez un PDF avec les codes-barres.",
          image: "/help/checkout.jpg",
        },
        {
          title: "5. Récupérer en magasin",
          description: "Présentez-vous au magasin avec votre PDF et les codes-barres. Payez sur place lors du retrait.",
          image: "/help/pickup.jpg",
        },
      ],
    },
    {
      id: "merchant",
      title: "Guide Commerçant",
      icon: Store,
      description: "Gérez votre commerce sur AfroMarket",
      steps: [
        {
          title: "1. Créer un compte commerçant",
          description:
            "Inscrivez-vous en choisissant le profil 'Commerçant'. Remplissez les informations de votre commerce.",
          image: "/help/signup-merchant.jpg",
        },
        {
          title: "2. Compléter votre profil",
          description: "Ajoutez des photos, horaires d'ouverture, description et coordonnées de votre commerce.",
          image: "/help/merchant-profile.jpg",
        },
        {
          title: "3. Ajouter des produits",
          description: "Créez votre catalogue en ajoutant des produits avec photos, prix et descriptions.",
          image: "/help/add-products.jpg",
        },
        {
          title: "4. Gérer les commandes",
          description: "Recevez les commandes, scannez les codes-barres clients et validez les retraits.",
          image: "/help/manage-orders.jpg",
        },
      ],
    },
  ]

  const faqs = [
    {
      question: "Comment créer un compte sur AfroMarket ?",
      answer:
        "Cliquez sur le bouton 'Se connecter' en haut à droite, puis sur 'Créer un compte'. Choisissez votre profil (Client, Commerçant ou Restaurant) et remplissez le formulaire d'inscription.",
    },
    {
      question: "Comment fonctionne le système de click & collect ?",
      answer:
        "Après avoir validé votre commande, vous recevez un PDF avec les codes-barres de chaque article. Présentez-vous au magasin, montrez vos codes-barres et payez sur place lors du retrait.",
    },
    {
      question: "Puis-je payer en ligne ?",
      answer:
        "Non, AfroMarket fonctionne uniquement en click & collect avec paiement en magasin. Cela permet de soutenir les commerces locaux et d'éviter les frais de transaction en ligne.",
    },
    {
      question: "Comment choisir ma localisation ?",
      answer:
        "Cliquez sur 'Choisir ma localisation' dans la barre de navigation. Sélectionnez votre région (Europe, USA, Canada), puis votre pays/état et votre ville. Votre choix sera sauvegardé.",
    },
    {
      question: "Comment faire une réservation dans un restaurant ?",
      answer:
        "Accédez à la page du restaurant, cliquez sur 'Réserver' et remplissez le formulaire avec la date, l'heure et le nombre de personnes. Vous recevrez une confirmation par email.",
    },
    {
      question: "Comment ajouter un commerce à mes favoris ?",
      answer:
        "Sur la page d'un commerce ou restaurant, cliquez sur l'icône cœur. Retrouvez tous vos favoris dans votre espace client sous 'Favoris'.",
    },
    {
      question: "Comment laisser un avis ?",
      answer:
        "Après avoir effectué une commande ou une réservation, accédez à votre espace client, section 'Commentaires', et cliquez sur 'Écrire un avis'. Notez le commerce et partagez votre expérience.",
    },
    {
      question: "Comment contacter le support ?",
      answer:
        "Vous pouvez nous contacter via le formulaire de contact dans le footer, ou par email à support@afromarket.com. Nous répondons sous 24h.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* SecondaryNav and SearchBar */}
      <SecondaryNav />
      <div className="border-b bg-background">
        <div className="container py-4">
          <SearchBar variant="compact" />
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <HelpCircle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-primary" />
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-balance">Centre d'Aide</h1>
              <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-muted-foreground text-balance">
                Trouvez des réponses à vos questions et apprenez à utiliser AfroMarket
              </p>

              <div className="mt-6 sm:mt-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher dans l'aide..."
                    className="h-12 sm:h-14 pl-12 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-12 sm:py-16">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8 sm:mb-12">
              Guides d'utilisation
            </h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {guides.map((guide) => (
                <Card key={guide.id} className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                      <guide.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">{guide.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{guide.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {guide.steps.map((step, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-sm sm:text-base font-semibold">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                        <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                          <img
                            src={step.image || "/placeholder.svg?height=400&width=600"}
                            alt={step.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Tutorials Section */}
        <section className="bg-muted/50 py-12 sm:py-16">
          <div className="container">
            <div className="text-center mb-8 sm:mb-12">
              <Video className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Tutoriels Vidéo</h2>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted-foreground">
                Apprenez en regardant nos tutoriels vidéo
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Comment créer un compte", duration: "2:30" },
                { title: "Rechercher et commander des produits", duration: "4:15" },
                { title: "Faire une réservation restaurant", duration: "3:00" },
                { title: "Gérer son profil commerçant", duration: "5:45" },
                { title: "Ajouter des produits à son catalogue", duration: "4:30" },
                { title: "Scanner les codes-barres clients", duration: "2:00" },
              ].map((video, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={`/video-tutorial-.jpg?key=j5q0i&height=300&width=400&query=video tutorial ${index + 1}`}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                      <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white">
                        <Video className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-semibold">{video.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8 sm:mb-12">
                Questions Fréquentes
              </h2>

              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 sm:px-6">
                    <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-3 sm:py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 sm:pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
