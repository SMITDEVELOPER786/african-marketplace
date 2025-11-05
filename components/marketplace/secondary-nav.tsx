"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
<<<<<<< HEAD
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
=======
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c

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

export function SecondaryNav() {
  const [selectedRegion, setSelectedRegion] = useState<string>("europe")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false)

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation")
    if (savedLocation) {
      const { region, location, city } = JSON.parse(savedLocation)
      setSelectedRegion(region)
      setSelectedLocation(location)
      setSelectedCity(city)
    }
  }, [])

  const handleSaveLocation = () => {
    if (selectedLocation && selectedCity) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          region: selectedRegion,
          location: selectedLocation,
          city: selectedCity,
<<<<<<< HEAD
        })
=======
        }),
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
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

  return (
    <>
<<<<<<< HEAD
      {/* NAVBAR */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Left Links */}
            <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm overflow-x-auto no-scrollbar">
              <Link
                href="/"
                className="font-medium transition-colors hover:text-primary hover:bg-primary/5 px-2 py-1 sm:px-3 sm:py-2 rounded-md whitespace-nowrap"
=======
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
              >
                Accueil
              </Link>
              <Link
                href="/search/results?type=store"
<<<<<<< HEAD
                className="font-medium transition-colors hover:text-primary hover:bg-primary/5 px-2 py-1 sm:px-3 sm:py-2 rounded-md whitespace-nowrap"
=======
                className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
              >
                Commerces
              </Link>
              <Link
                href="/search/results?type=restaurant"
<<<<<<< HEAD
                className="font-medium transition-colors hover:text-primary hover:bg-primary/5 px-2 py-1 sm:px-3 sm:py-2 rounded-md whitespace-nowrap"
=======
                className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
              >
                Restaurants
              </Link>
              <Link
                href="/about"
<<<<<<< HEAD
                className="font-medium transition-colors hover:text-primary hover:bg-primary/5 px-2 py-1 sm:px-3 sm:py-2 rounded-md whitespace-nowrap"
=======
                className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
              >
                À propos
              </Link>
              <Link
                href="/help"
<<<<<<< HEAD
                className="font-medium transition-colors hover:text-primary hover:bg-primary/5 px-2 py-1 sm:px-3 sm:py-2 rounded-md whitespace-nowrap"
=======
                className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
              >
                Aide
              </Link>
            </div>

<<<<<<< HEAD
            {/* Location Button for Desktop */}
            <div className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => setIsLocationDialogOpen(true)}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{getLocationDisplay()}</span>
              </Button>
            </div>
=======
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => setIsLocationDialogOpen(true)}
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">{getLocationDisplay()}</span>
            </Button>
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
          </div>
        </div>
      </nav>

<<<<<<< HEAD
      {/* Location Button for Mobile (Below Navbar) */}
      <div className="flex sm:hidden justify-center mt-2 mb-2 px-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-center gap-2 bg-transparent text-xs py-2"
          onClick={() => setIsLocationDialogOpen(true)}
        >
          <MapPin className="h-4 w-4" />
          <span>Localisation</span>
        </Button>
      </div>

      {/* LOCATION MODAL */}
      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent className="w-[95%] sm:max-w-[500px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl text-center">
              Choisissez votre localisation
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
=======
      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Choisissez votre localisation</DialogTitle>
            <DialogDescription>
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
              Sélectionnez votre pays et ville pour voir les commerces et restaurants près de chez vous
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Région</label>
              <Select
                value={selectedRegion}
                onValueChange={(value) => {
                  setSelectedRegion(value)
                  setSelectedLocation("")
                  setSelectedCity("")
                }}
              >
<<<<<<< HEAD
                <SelectTrigger className="text-sm sm:text-base">
=======
                <SelectTrigger>
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
                  <SelectValue placeholder="Sélectionner une région" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="usa">États-Unis</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRegion && (
              <div className="space-y-2">
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
<<<<<<< HEAD
                  <SelectTrigger className="text-sm sm:text-base">
=======
                  <SelectTrigger>
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Ville</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
<<<<<<< HEAD
                  <SelectTrigger className="text-sm sm:text-base">
=======
                  <SelectTrigger>
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
                    <SelectValue placeholder="Sélectionner une ville" />
                  </SelectTrigger>
                  <SelectContent>
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

<<<<<<< HEAD
            <Button
              className="w-full mt-2 text-sm sm:text-base"
              onClick={handleSaveLocation}
              disabled={!selectedCity || !selectedLocation}
            >
=======
            <Button className="w-full" onClick={handleSaveLocation} disabled={!selectedCity || !selectedLocation}>
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
              Enregistrer ma localisation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> e899e3933e2fb3ea988293be82ee60f3e5f0731c
