"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  MessageSquare,
  TrendingUp,
  CreditCard,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n-context"
import Link from "next/link"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useRef, useState } from "react"

// CountUp component for animated numbers
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          let start = 0
          const increment = end / (duration / 16) // 60fps
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

// Animated Card wrapper
function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 transform",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      )}
    >
      {children}
    </div>
  )
}

export default function AdminDashboardPage() {
  const { t } = useLanguage()

  const stats = [
    {
      title: "Utilisateurs totaux",
      value: 12345,
      change: "+12.5%",
      icon: Users,
      trend: "up" as const,
      href: "/admin/users",
      description: "Gérer tous les utilisateurs",
    },
    {
      title: "Commerces actifs",
      value: 456,
      change: "+8.2%",
      icon: Store,
      trend: "up" as const,
      href: "/admin/businesses",
      description: "Voir tous les commerces",
    },
    {
      title: "Commentaires",
      value: 2847,
      change: "+23.1%",
      icon: MessageSquare,
      trend: "up" as const,
      href: "/admin/comments",
      description: "Modérer les commentaires",
    },
    {
      title: "Revenu de la plateforme",
      value: 89234,
      change: "+18.7%",
      icon: DollarSign,
      trend: "up" as const,
      href: "/admin/subscriptions/overview",
      description: "Voir les revenus",
    },
  ]

  const moduleCards = [
    {
      title: "Abonnements",
      description: "Gérer les abonnements des commerces",
      icon: CreditCard,
      stats: "156 actifs",
      href: "/admin/subscriptions/management",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Publicités",
      description: "Gérer les campagnes publicitaires",
      icon: TrendingUp,
      stats: "23 en attente",
      href: "/admin/advertising",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Réservations",
      description: "Voir les statistiques détaillées",
      icon: ShoppingCart,
      stats: "8,921 réservations",
      href: "/admin/reservations",
      color: "bg-green-500/10 text-green-600",
    },
  ]

  const recentActivity = [
    {
      type: "business" as const,
      title: "Nouvelle inscription de commerce",
      description: `Sahel Spice Market - En attente d'approbation`,
      time: `5 min`,
      status: "pending" as const,
    },
    {
      type: "review" as const,
      title: "Avis signalé pour modération",
      description: "Contenu inapproprié signalé par un utilisateur",
      time: `15 min`,
      status: "flagged" as const,
    },
    {
      type: "user" as const,
      title: "Nouvelle inscription d'utilisateur",
      description: `John Doe a rejoint la plateforme`,
      time: `1 h`,
      status: "success" as const,
    },
    {
      type: "payment" as const,
      title: "Paiement traité",
      description: `Paiement de commission à Afro Delights Market`,
      time: `2 h`,
      status: "success" as const,
    },
  ]

  const pendingApprovals = [
    {
      id: "1",
      business: "Sahel Spice Market",
      type: "Nouveau commerce",
      date: "2025-01-18",
      href: "/admin/businesses",
    },
    {
      id: "2",
      business: "Mama Africa Restaurant",
      type: "Mise à niveau Premium",
      date: "2025-01-18",
      href: "/admin/subscriptions/management",
    },
    {
      id: "3",
      business: "Jollof Palace",
      type: "Mise à jour du profil",
      date: "2025-01-17",
      href: "/admin/businesses",
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Fév", revenue: 52000 },
    { month: "Mar", revenue: 61000 },
    { month: "Avr", revenue: 58000 },
    { month: "Mai", revenue: 70000 },
    { month: "Juin", revenue: 89234 },
  ]

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
        <p className="mt-2 text-muted-foreground">Surveillez et gérez la plateforme AfroMarket</p>
      </div>

      {/* Stats Cards with Count Animation */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <AnimatedCard key={stat.title} delay={index * 100}>
              <Link href={stat.href}>
                <Card className="transition-all hover:shadow-md hover:border-primary/50 cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stat.title.includes("Revenu") ? "€" : ""}
                      <CountUp end={stat.value} duration={2000} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className={stat.trend === "up" ? "text-primary" : "text-destructive"}>{stat.change}</span> par
                      rapport au mois dernier
                    </p>
                    <p className="mt-2 text-xs text-primary flex items-center gap-1">
                      {stat.description}
                      <ArrowRight className="h-3 w-3" />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedCard>
          )
        })}
      </div>

      {/* Module Cards with Staggered Animation */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Accès rapide aux modules</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moduleCards.map((module, index) => {
            const Icon = module.icon
            return (
              <AnimatedCard key={module.title} delay={index * 150}>
                <Link href={module.href}>
                  <Card className="transition-all hover:shadow-md hover:border-primary/50 cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className={cn("p-3 rounded-lg transition-transform duration-300 hover:scale-110", module.color)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                      <h3 className="mt-4 font-semibold text-lg">{module.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{module.description}</p>
                      <p className="mt-3 text-sm font-medium text-primary">{module.stats}</p>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedCard>
            )
          })}
        </div>
      </div>

      {/* Revenue Chart with Animation */}
      <div className="mb-6">
        <AnimatedCard delay={300}>
          <Card>
            <CardHeader>
              <CardTitle>Évolution des revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>

      {/* Recent Activity and Pending Approvals with Staggered Animation */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <AnimatedCard delay={400}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Activité récente</CardTitle>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 rounded-lg border p-4 transition-all duration-500 hover:shadow-md hover:border-primary/50"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110",
                        activity.status === "pending" && "bg-secondary/20",
                        activity.status === "flagged" && "bg-destructive/20",
                        activity.status === "success" && "bg-primary/20",
                      )}
                    >
                      {activity.type === "business" && <Store className="h-5 w-5" />}
                      {activity.type === "review" && <AlertCircle className="h-5 w-5 text-destructive" />}
                      {activity.type === "user" && <Users className="h-5 w-5" />}
                      {activity.type === "payment" && <DollarSign className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Pending Approvals */}
        <AnimatedCard delay={500}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Approbations en attente</CardTitle>
              <Badge variant="secondary">{pendingApprovals.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between rounded-lg border p-4 transition-all duration-500 hover:shadow-md hover:border-primary/50"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div>
                      <p className="font-medium">{item.business}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={item.href}>
                        <Button size="sm" variant="outline" className="bg-transparent transition-all duration-300 hover:scale-105">
                          Examiner
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}