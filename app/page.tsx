"use client"

import { BusinessCard } from "@/components/marketplace/business-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Star, Users, StoreIcon, ShoppingBag, Award } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MarketplaceFooter } from "@/components/marketplace/footer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { SearchBar } from "@/components/marketplace/search-bar"
import { SecondaryNav } from "@/components/marketplace/secondary-nav"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

// Animated Number Component with mobile optimization
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Lower threshold for mobile
    rootMargin: '-50px 0px',
  })

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp end={value} duration={2.5} separator="," suffix={suffix} />
      ) : (
        `0${suffix}`
      )}
    </span>
  )
}

// Animation variants with mobile optimizations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 // Faster stagger for mobile
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // Shorter duration for mobile
      ease: "easeOut"
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 }, // Less aggressive scale for mobile
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Faster stagger for stats on mobile
    }
  }
}

const statItemVariants = {
  hidden: { opacity: 0, y: 15 }, // Smaller y movement for mobile
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const locations = {
  europe: {
    france: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux"],
    germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf"],
    uk: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Edinburgh"],
    belgium: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège"],
    netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
    italy: ["Rome", "Milan", "Naples", "Turin", "Florence"],
  },
  usa: {
    "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
    California: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
    Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
    Florida: ["Miami", "Orlando", "Tampa", "Jacksonville"],
    Illinois: ["Chicago", "Aurora", "Naperville"],
    Pennsylvania: ["Philadelphia", "Pittsburgh"],
    Georgia: ["Atlanta", "Augusta", "Columbus"],
    Massachusetts: ["Boston", "Worcester", "Springfield"],
  },
  canada: {
    Ontario: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
    Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby"],
    Alberta: ["Calgary", "Edmonton", "Red Deer"],
    Manitoba: ["Winnipeg", "Brandon"],
    Saskatchewan: ["Saskatoon", "Regina"],
  },
}

const featuredBusinesses = [
  {
    id: "1",
    name: "Afro Spice Market",
    type: "store" as const,
    description: "Premium African spices, seasonings, and traditional ingredients",
    imageUrl: "/african-spices.png",
    rating: 4.8,
    reviewCount: 124,
    location: "Paris, France",
    address: "123 Rue de la République, 75011 Paris",
    countryOrigin: "Senegal",
    isPremium: true,
    isOpen: true,
    openingHours: "Mon-Sat: 9:00 - 20:00",
  },
  {
    id: "2",
    name: "Mama Africa Restaurant",
    type: "restaurant" as const,
    description: "Authentic West African cuisine with a modern twist",
    imageUrl: "/african-restaurant.png",
    rating: 4.6,
    reviewCount: 89,
    location: "London, UK",
    address: "45 High Street, London E1 5AA",
    cuisineType: "West African",
    countryOrigin: "Nigeria",
    isPremium: false,
    isOpen: true,
    openingHours: "Tue-Sun: 12:00 - 22:00",
  },
  {
    id: "3",
    name: "Sahel Grocery",
    type: "store" as const,
    description: "Fresh African produce and specialty items",
    imageUrl: "/african-grocery.jpg",
    rating: 4.7,
    reviewCount: 156,
    location: "Brussels, Belgium",
    address: "78 Avenue Louise, 1050 Brussels",
    countryOrigin: "Mali",
    isPremium: true,
    isOpen: false,
    openingHours: "Mon-Sat: 8:00 - 19:00",
  },
  {
    id: "4",
    name: "Jollof Palace",
    type: "restaurant" as const,
    description: "Home of the best Jollof rice in Europe",
    imageUrl: "/vibrant-jollof-rice.png",
    rating: 4.9,
    reviewCount: 203,
    location: "Berlin, Germany",
    address: "12 Friedrichstraße, 10117 Berlin",
    cuisineType: "West African",
    countryOrigin: "Ghana",
    isPremium: true,
    isOpen: true,
    openingHours: "Daily: 11:00 - 23:00",
  },
]

const popularCategories = [
  {
    id: "1",
    name: "Épices & Assaisonnements",
    imageUrl: "/african-spices.png",
    count: 150,
  },
  {
    id: "2",
    name: "Artisanat Traditionnel",
    imageUrl: "/african-crafts.jpg",
    count: 89,
  },
  {
    id: "3",
    name: "Produits Frais",
    imageUrl: "/african-produce.jpg",
    count: 234,
  },
  {
    id: "4",
    name: "Tissus Africains",
    imageUrl: "/african-fabrics.jpg",
    count: 112,
  },
]

// Safe motion component wrapper
const SafeMotionSection = ({ children, className, ...props }: any) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <section className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section className={className} {...props}>
      {children}
    </motion.section>
  )
}

export default function HomePage() {
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState<string>("europe")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation")
    if (savedLocation) {
      const { region, location, city } = JSON.parse(savedLocation)
      setSelectedRegion(region)
      setSelectedLocation(location)
      setSelectedCity(city)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate AI suggestions based on search query
      const suggestions = generateAISuggestions(searchQuery)
      setAiSuggestions(suggestions)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const generateAISuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase()
    const allSuggestions = [
      "Jollof rice ingredients",
      "Plantain chips",
      "Shea butter organic",
      "African print fabric",
      "Palm oil red",
      "Cassava flour",
      "Fufu powder",
      "Egusi seeds",
      "Suya spice mix",
      "Hibiscus tea",
      "African black soap",
      "Kente cloth",
      "Dashiki shirts",
      "Ankara fabric",
      "Yam tubers",
      "Scotch bonnet peppers",
      "Okra fresh",
      "Bitter leaf",
      "Ugu leaves",
      "Maggi cubes",
    ]

    return allSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(lowerQuery)).slice(0, 5)
  }

  const handleSaveLocation = () => {
    if (selectedLocation && selectedCity) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          region: selectedRegion,
          location: selectedLocation,
          city: selectedCity,
        }),
      )
      setIsLocationDialogOpen(false)
    }
  }

  const getLocationDisplay = () => {
    if (selectedCity && selectedLocation) {
      return `${selectedCity}, ${selectedLocation}`
    }
    return "Choisir ma localisation"
  }

  const handleSearch = () => {
    // Navigate to search results page with query params
    const params = new URLSearchParams({
      q: searchQuery,
      country: selectedCountry,
      category: selectedCategory,
      ...(selectedCity && { city: selectedCity }),
      ...(selectedLocation && { location: selectedLocation }),
    })
    window.location.href = `/search/results?${params.toString()}`
  }

  return (
    <div className="min-h-screen">
      <SecondaryNav />

      {/* Hero Section */}
      <SafeMotionSection 
        className="border-b bg-gradient-to-b from-background to-muted/20 py-6 sm:py-12 lg:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-xs sm:text-sm">
              🏆 Plateforme N°1 des produits africains dans le monde
            </Badge>

            <motion.h1 
              className="mt-4 sm:mt-6 text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Découvrez les saveurs et produits{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                africains authentiques
              </span>
            </motion.h1>

            <motion.p 
              className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground text-balance mx-auto max-w-[700px] px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              La meilleure marketplace pour trouver des produits africains authentiques et des restaurants près de chez
              vous
            </motion.p>
          </motion.div>

          <motion.div 
            className="mx-auto mt-4 sm:mt-6 lg:mt-8 max-w-4xl w-full px-2 sm:px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SearchBar variant="full" />
          </motion.div>
        </div>
      </SafeMotionSection>

      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto mx-4 w-[calc(100vw-2rem)] sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Choisissez votre localisation</DialogTitle>
            <DialogDescription>
              Sélectionnez votre pays et ville pour voir les commerces et restaurants près de chez vous
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 w-full">
            <div className="space-y-2 w-full">
              <label className="text-sm font-medium">Région</label>
              <Select
                value={selectedRegion}
                onValueChange={(value) => {
                  setSelectedRegion(value)
                  setSelectedLocation("")
                  setSelectedCity("")
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une région" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="usa">États-Unis</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRegion && (
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium">
                  {selectedRegion === "europe" ? "Pays" : selectedRegion === "usa" ? "État" : "Province"}
                </label>
                <Select
                  value={selectedLocation}
                  onValueChange={(value) => {
                    setSelectedLocation(value)
                    setSelectedCity("")
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {Object.keys(locations[selectedRegion as keyof typeof locations]).map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc.charAt(0).toUpperCase() + loc.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedLocation && (
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium">Ville</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une ville" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {locations[selectedRegion as keyof typeof locations][
                      selectedLocation as keyof (typeof locations)[keyof typeof locations]
                    ]?.map((city: string) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button className="w-full" onClick={handleSaveLocation} disabled={!selectedCity || !selectedLocation}>
              Enregistrer ma localisation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Popular Categories Section */}
      <SafeMotionSection 
        className="py-8 sm:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true, 
          amount: 0.1, // Lower threshold for mobile
          margin: "-30px 0px" 
        }}
        variants={containerVariants}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-6 sm:mb-8 text-center sm:text-left"
            variants={itemVariants}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Catégories populaires</h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">Explorez nos catégories de produits les plus populaires</p>
          </motion.div>

          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full"
            variants={containerVariants}
          >
            {popularCategories.map((category, index) => (
              <motion.div key={category.id} variants={cardVariants} className="w-full">
                <Link href={`/search/results?category=${category.id}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer w-full">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={category.imageUrl || "/placeholder.svg"}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                        <h3 className="font-semibold text-base sm:text-lg">{category.name}</h3>
                        <p className="text-xs sm:text-sm text-white/90">
                          <AnimatedNumber value={category.count} suffix=" produits" />
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SafeMotionSection>

      {/* Top Rated Businesses Section */}
      <SafeMotionSection 
        className="bg-muted/50 py-8 sm:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true, 
          amount: 0.1,
          margin: "-30px 0px" 
        }}
        variants={containerVariants}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full"
            variants={itemVariants}
          >
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Commerces les mieux notés</h2>
              </div>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
                Les commerces et restaurants les mieux notés près de chez vous
              </p>
            </div>
            <Button variant="outline" asChild className="shrink-0 bg-transparent text-xs sm:text-sm w-full sm:w-auto mt-3 sm:mt-0">
              <Link href="/search/results?sort=rating">{t("common.viewAll")}</Link>
            </Button>
          </motion.div>

          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
            variants={containerVariants}
          >
            {featuredBusinesses.map((business, index) => (
              <motion.div key={business.id} variants={cardVariants} className="w-full">
                <BusinessCard {...business} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SafeMotionSection>

      {/* Featured Businesses Section */}
      <SafeMotionSection 
        className="py-8 sm:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true, 
          amount: 0.1,
          margin: "-30px 0px" 
        }}
        variants={containerVariants}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full"
            variants={itemVariants}
          >
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Commerces vedettes</h2>
              </div>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
                Découvrez nos commerces et restaurants partenaires mis en avant
              </p>
            </div>
            <Button variant="outline" asChild className="shrink-0 bg-transparent text-xs sm:text-sm w-full sm:w-auto mt-3 sm:mt-0">
              <Link href="/search/results?featured=true">{t("common.viewAll")}</Link>
            </Button>
          </motion.div>

          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
            variants={containerVariants}
          >
            {featuredBusinesses.slice(0, 4).map((business, index) => (
              <motion.div key={business.id} className="relative w-full" variants={cardVariants}>
                {business.isPremium && <Badge className="absolute top-2 right-2 z-10 bg-primary text-xs">Vedette</Badge>}
                <BusinessCard {...business} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SafeMotionSection>

      {/* Stats Section */}
      <SafeMotionSection 
        className="bg-primary py-8 sm:py-12 lg:py-16 text-primary-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true, 
          amount: 0.1,
          margin: "-30px 0px" 
        }}
        variants={statsVariants}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div className="mx-auto max-w-5xl w-full" variants={itemVariants}>
            <div className="text-center mb-6 sm:mb-8 lg:mb-12 w-full">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Rejoignez la plus grande communauté africaine en Europe</h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-primary-foreground/90 px-2 sm:px-0">
                Des milliers d'utilisateurs nous font confiance chaque jour
              </p>
            </div>

            <motion.div 
              className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8 lg:mb-12 w-full"
              variants={statsVariants}
            >
              <motion.div className="text-center" variants={statItemVariants}>
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold">
                  <AnimatedNumber value={50000} suffix="+" />
                </div>
                <div className="mt-1 text-xs sm:text-sm text-primary-foreground/80">Utilisateurs inscrits</div>
              </motion.div>

              <motion.div className="text-center" variants={statItemVariants}>
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <StoreIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold">
                  <AnimatedNumber value={1200} suffix="+" />
                </div>
                <div className="mt-1 text-xs sm:text-sm text-primary-foreground/80">Commerces partenaires</div>
              </motion.div>

              <motion.div className="text-center" variants={statItemVariants}>
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold">
                  <AnimatedNumber value={100000} suffix="+" />
                </div>
                <div className="mt-1 text-xs sm:text-sm text-primary-foreground/80">Commandes réalisées</div>
              </motion.div>

              <motion.div className="text-center" variants={statItemVariants}>
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold">4.8/5</div>
                <div className="mt-1 text-xs sm:text-sm text-primary-foreground/80">Note moyenne</div>
              </motion.div>
            </motion.div>

            {!isAuthenticated && (
              <motion.div className="text-center w-full" variants={itemVariants}>
                <Button 
  size="lg"
  className="
    bg-white
    hover:bg-gray-50
    text-primary font-bold
    shadow-lg
    animate-pulse hover:animate-none
    border-2 border-primary
    hover:border-primary/80
    transition-all duration-300
    hover:scale-105
    relative overflow-hidden
    group
  "
>
  <span className="relative z-10">🎯 Télécharger maintenant</span>
  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
</Button>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-primary-foreground/80">Rejoignez-nous en moins de 2 minutes</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </SafeMotionSection>

      {/* Download Section */}
      <SafeMotionSection 
        className="py-8 sm:py-12 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true, 
          amount: 0.1,
          margin: "-30px 0px" 
        }}
        variants={containerVariants}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div className="mx-auto max-w-3xl text-center w-full" variants={itemVariants}>
            <motion.div 
              className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 mb-3 sm:mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </motion.div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Téléchargez notre cahier des charges</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2 sm:px-0">
              Découvrez tous les détails techniques et fonctionnels de la plateforme AfroMarket dans notre cahier des
              charges complet.
            </p>
            <Button size="lg" asChild className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto">
              <a href="/api/download-cahier-des-charges" download>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Télécharger le cahier des charges (HTML)
              </a>
            </Button>
            <p className="mt-2 sm:mt-3 text-xs text-muted-foreground">
              Format HTML - Ouvrez dans votre navigateur ou Word pour convertir en .docx
            </p>
          </motion.div>
        </div>
      </SafeMotionSection>

      <MarketplaceFooter />
    </div>
  )
}