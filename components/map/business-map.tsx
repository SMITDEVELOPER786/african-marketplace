"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Store, UtensilsCrossed } from "lucide-react"
import { useGeolocation, calculateDistance } from "@/lib/geolocation-hook"

interface Business {
  id: string
  name: string
  type: "store" | "restaurant"
  latitude: number
  longitude: number
  address: string
  rating: number
  imageUrl: string
}

interface BusinessMapProps {
  businesses: Business[]
}

export function BusinessMap({ businesses }: BusinessMapProps) {
  const { coordinates, getCurrentLocation, isLoading, error } = useGeolocation()
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)

  // Calculate distances if user location is available
  const businessesWithDistance = businesses.map((business) => ({
    ...business,
    distance: coordinates
      ? calculateDistance(coordinates.latitude, coordinates.longitude, business.latitude, business.longitude)
      : null,
  }))

  // Sort by distance if available
  const sortedBusinesses = coordinates
    ? [...businessesWithDistance].sort((a, b) => (a.distance || 0) - (b.distance || 0))
    : businessesWithDistance

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Map View */}
      <Card className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-muted">
          {/* Simplified map visualization */}
          <div className="relative h-full w-full">
            {/* Map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10" />

            {/* Grid lines for map effect */}
            <svg className="absolute inset-0 h-full w-full opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* User location marker */}
            {coordinates && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 animate-ping rounded-full bg-primary opacity-20" />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg">
                    <Navigation className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <Badge variant="secondary" className="text-xs">
                    You are here
                  </Badge>
                </div>
              </div>
            )}

            {/* Business markers */}
            {businessesWithDistance.slice(0, 10).map((business, index) => {
              // Position businesses in a circle around the center
              const angle = (index / Math.min(businessesWithDistance.length, 10)) * 2 * Math.PI
              const radius = 200
              const x = 50 + Math.cos(angle) * (radius / 6) // percentage
              const y = 50 + Math.sin(angle) * (radius / 6) // percentage

              return (
                <button
                  key={business.id}
                  onClick={() => setSelectedBusiness(business)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-colors ${
                      selectedBusiness?.id === business.id
                        ? "bg-secondary ring-2 ring-secondary ring-offset-2"
                        : "bg-card hover:bg-secondary"
                    }`}
                  >
                    {business.type === "store" ? (
                      <Store className="h-5 w-5 text-primary" />
                    ) : (
                      <UtensilsCrossed className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  {business.distance && (
                    <Badge variant="secondary" className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">
                      {business.distance.toFixed(1)} km
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>

          {/* Map controls */}
          <div className="absolute left-4 top-4 space-y-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="gap-2 shadow-lg"
            >
              <Navigation className="h-4 w-4" />
              {isLoading ? "Locating..." : "My Location"}
            </Button>
            {error && <div className="rounded-lg bg-destructive/10 p-2 text-xs text-destructive">{error}</div>}
          </div>

          {/* Selected business info */}
          {selectedBusiness && (
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={selectedBusiness.imageUrl || "/placeholder.svg"}
                      alt={selectedBusiness.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{selectedBusiness.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{selectedBusiness.address}</p>
                    {selectedBusiness.distance && (
                      <p className="mt-1 text-sm text-primary">{selectedBusiness.distance.toFixed(1)} km away</p>
                    )}
                  </div>
                  <Button size="sm">View</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Card>

      {/* Business List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            {coordinates ? "Nearest Businesses" : "All Businesses"} ({sortedBusinesses.length})
          </h3>
        </div>

        <div className="space-y-3 overflow-y-auto" style={{ maxHeight: "550px" }}>
          {sortedBusinesses.map((business) => (
            <Card
              key={business.id}
              className={`cursor-pointer p-4 transition-all hover:shadow-md ${
                selectedBusiness?.id === business.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedBusiness(business)}
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={business.imageUrl || "/placeholder.svg"}
                    alt={business.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium">{business.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {business.type === "store" ? "Store" : "Restaurant"}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{business.address}</span>
                  </div>
                  {business.distance && (
                    <p className="mt-1 text-sm font-medium text-primary">{business.distance.toFixed(1)} km away</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
