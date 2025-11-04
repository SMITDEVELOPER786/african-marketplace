"use client"

import { useState } from "react"

interface Coordinates {
  latitude: number
  longitude: number
}

interface GeolocationState {
  coordinates: Coordinates | null
  error: string | null
  isLoading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: false,
  })

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      })
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        })
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out"
            break
        }
        setState({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        })
      },
    )
  }

  return {
    ...state,
    getCurrentLocation,
  }
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
