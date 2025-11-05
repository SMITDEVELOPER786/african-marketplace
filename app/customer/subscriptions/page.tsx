"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export default function SubscriptionsPage() {
  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "/mois",
      features: [
        { text: "5 annonces maximum", included: true },
        { text: "3 photos par annonce", included: true },
        { text: "Support par email", included: true },
        { text: "Statistique de base", included: true },
        { text: "Badge vérifié", included: false },
      ],
      current: true,
    },
    {
      name: "Basic",
      price: "29€",
      period: "/mois",
      features: [
        { text: "20 annonces", included: true },
        { text: "10 photos par annonce", included: true },
        { text: "Support prioritaire", included: true },
        { text: "Statistiques avancées", included: true },
        { text: "Badge vérifié", included: true },
      ],
      current: false,
    },
    {
      name: "Standard",
      price: "59€",
      period: "/mois",
      popular: true,
      features: [
        { text: "50 annonces", included: true },
        { text: "20 photos par annonce", included: true },
        { text: "Support 24/7", included: true },
        { text: "Statistiques complètes", included: true },
        { text: "Badge vérifié", included: true },
        { text: "Mise en avant", included: true },
      ],
      current: false,
    },
    {
      name: "Premium",
      price: "99€",
      period: "/mois",
      features: [
        { text: "Annonces illimitées", included: true },
        { text: "Photos illimitées", included: true },
        { text: "Support VIP 24/7", included: true },
        { text: "Statistiques complètes", included: true },
        { text: "Badge vérifié VIP", included: true },
        { text: "Mise en avant prioritaire", included: true },
        { text: "Réservation en ligne", included: true },
        { text: "API access", included: true },
      ],
      current: false,
    },
  ]

  return (
    <div className="section-spacing pt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-center md:text-left">Mes abonnements</h1>
        <p className="text-muted-foreground mt-2 text-center md:text-left">Gérez votre abonnement et découvrez nos offres</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Abonnement actuel</CardTitle>
          <CardDescription>Vous êtes actuellement sur le plan Gratuit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">Plan Gratuit</p>
              <p className="text-muted-foreground">0€ / mois</p>
            </div>
            <Badge variant="secondary">Actif</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Choisissez votre abonnement</h2>
        <p className="text-muted-foreground">Sélectionnez le plan qui correspond le mieux à vos besoins</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn("relative", plan.popular && "border-primary border-2")}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary ">Populaire</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
          <CardContent className="flex flex-col space-y-4 h-full">

              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={cn("text-sm", !feature.included && "text-muted-foreground")}>{feature.text}</span>
                  </li>
                ))}
              </ul>
             <Button
  className="mt-auto w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
  disabled={plan.current}
>
  {plan.current ? "Plan actuel" : "S'abonner"}
</Button>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
