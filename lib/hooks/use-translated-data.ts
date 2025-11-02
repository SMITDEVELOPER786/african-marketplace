"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { translateObject, translateArray } from "@/lib/translation-service"

/**
 * Hook to translate a single object
 */
export function useTranslatedObject<T extends Record<string, any>>(
  data: T | null,
  fields: (keyof T)[],
  sourceLang: "fr" | "en" | "de" | "es" | "it" | "pt" | "nl" = "fr",
) {
  const { language } = useLanguage()
  const [translatedData, setTranslatedData] = useState<T | null>(data)
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    if (!data) {
      setTranslatedData(null)
      return
    }

    // If target language is the same as source, no translation needed
    if (language === sourceLang) {
      setTranslatedData(data)
      return
    }

    setIsTranslating(true)

    translateObject(data, fields, language, sourceLang)
      .then((translated) => {
        setTranslatedData(translated)
      })
      .catch((error) => {
        console.error("[v0] Translation error:", error)
        setTranslatedData(data) // Fallback to original data
      })
      .finally(() => {
        setIsTranslating(false)
      })
  }, [data, language, sourceLang, fields])

  return { data: translatedData, isTranslating }
}

/**
 * Hook to translate an array of objects
 */
export function useTranslatedArray<T extends Record<string, any>>(
  data: T[],
  fields: (keyof T)[],
  sourceLang: "fr" | "en" | "de" | "es" | "it" | "pt" | "nl" = "fr",
) {
  const { language } = useLanguage()
  const [translatedData, setTranslatedData] = useState<T[]>(data)
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    if (!data || data.length === 0) {
      setTranslatedData([])
      return
    }

    // If target language is the same as source, no translation needed
    if (language === sourceLang) {
      setTranslatedData(data)
      return
    }

    setIsTranslating(true)

    translateArray(data, fields, language, sourceLang)
      .then((translated) => {
        setTranslatedData(translated)
      })
      .catch((error) => {
        console.error("[v0] Translation error:", error)
        setTranslatedData(data) // Fallback to original data
      })
      .finally(() => {
        setIsTranslating(false)
      })
  }, [data, language, sourceLang, fields])

  return { data: translatedData, isTranslating }
}
