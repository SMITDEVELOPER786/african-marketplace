import type { Language } from "@/lib/i18n-context"

interface TranslationCache {
  [key: string]: {
    [lang: string]: string
  }
}

// In-memory cache for translations (in production, use Redis)
const translationCache: TranslationCache = {}

// DeepL API configuration
const DEEPL_API_KEY = process.env.TRANSLATION_API_KEY || ""
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"

// Language code mapping for DeepL
const DEEPL_LANG_MAP: Record<Language, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
  es: "ES",
  it: "IT",
  pt: "PT",
  nl: "NL",
}

/**
 * Generate a cache key for a text and target language
 */
function getCacheKey(text: string, targetLang: Language): string {
  return `${text.substring(0, 50)}_${targetLang}`
}

/**
 * Get translation from cache
 */
function getFromCache(text: string, targetLang: Language): string | null {
  const cacheKey = getCacheKey(text, targetLang)
  return translationCache[cacheKey]?.[targetLang] || null
}

/**
 * Save translation to cache
 */
function saveToCache(text: string, targetLang: Language, translation: string): void {
  const cacheKey = getCacheKey(text, targetLang)
  if (!translationCache[cacheKey]) {
    translationCache[cacheKey] = {}
  }
  translationCache[cacheKey][targetLang] = translation

  // Also save to localStorage for persistence
  try {
    const storageKey = `translation_${cacheKey}`
    localStorage.setItem(storageKey, JSON.stringify({ [targetLang]: translation }))
  } catch (error) {
    console.error("[v0] Error saving translation to localStorage:", error)
  }
}

/**
 * Translate text using DeepL API
 */
export async function translateText(text: string, targetLang: Language, sourceLang?: Language): Promise<string> {
  // Return original text if empty or if target language is the same as source
  if (!text || text.trim() === "") {
    return text
  }

  if (sourceLang && sourceLang === targetLang) {
    return text
  }

  // Check cache first
  const cachedTranslation = getFromCache(text, targetLang)
  if (cachedTranslation) {
    console.log("[v0] Translation found in cache")
    return cachedTranslation
  }

  // If no API key, return original text
  if (!DEEPL_API_KEY) {
    console.warn("[v0] DeepL API key not configured, returning original text")
    return text
  }

  try {
    const params = new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      text: text,
      target_lang: DEEPL_LANG_MAP[targetLang],
    })

    if (sourceLang) {
      params.append("source_lang", DEEPL_LANG_MAP[sourceLang])
    }

    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.statusText}`)
    }

    const data = await response.json()
    const translation = data.translations[0]?.text || text

    // Save to cache
    saveToCache(text, targetLang, translation)

    console.log("[v0] Translation successful via DeepL API")
    return translation
  } catch (error) {
    console.error("[v0] Translation error:", error)
    return text // Fallback to original text
  }
}

/**
 * Translate multiple texts in batch
 */
export async function translateBatch(texts: string[], targetLang: Language, sourceLang?: Language): Promise<string[]> {
  if (!texts || texts.length === 0) {
    return []
  }

  // Check cache for all texts
  const results: string[] = []
  const textsToTranslate: { index: number; text: string }[] = []

  texts.forEach((text, index) => {
    const cached = getFromCache(text, targetLang)
    if (cached) {
      results[index] = cached
    } else {
      textsToTranslate.push({ index, text })
    }
  })

  // If all texts are cached, return immediately
  if (textsToTranslate.length === 0) {
    return results
  }

  // If no API key, return original texts
  if (!DEEPL_API_KEY) {
    textsToTranslate.forEach(({ index, text }) => {
      results[index] = text
    })
    return results
  }

  try {
    // DeepL supports batch translation
    const params = new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      target_lang: DEEPL_LANG_MAP[targetLang],
    })

    textsToTranslate.forEach(({ text }) => {
      params.append("text", text)
    })

    if (sourceLang) {
      params.append("source_lang", DEEPL_LANG_MAP[sourceLang])
    }

    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.statusText}`)
    }

    const data = await response.json()
    const translations = data.translations || []

    textsToTranslate.forEach(({ index, text }, i) => {
      const translation = translations[i]?.text || text
      results[index] = translation
      saveToCache(text, targetLang, translation)
    })

    return results
  } catch (error) {
    console.error("[v0] Batch translation error:", error)
    // Fallback to original texts
    textsToTranslate.forEach(({ index, text }) => {
      results[index] = text
    })
    return results
  }
}

/**
 * Translate an object's fields
 */
export async function translateObject<T extends Record<string, any>>(
  obj: T,
  fields: (keyof T)[],
  targetLang: Language,
  sourceLang?: Language,
): Promise<T> {
  const textsToTranslate = fields.map((field) => String(obj[field] || ""))
  const translations = await translateBatch(textsToTranslate, targetLang, sourceLang)

  const translatedObj = { ...obj }
  fields.forEach((field, index) => {
    translatedObj[field] = translations[index] as any
  })

  return translatedObj
}

/**
 * Translate an array of objects
 */
export async function translateArray<T extends Record<string, any>>(
  array: T[],
  fields: (keyof T)[],
  targetLang: Language,
  sourceLang?: Language,
): Promise<T[]> {
  const allTexts: string[] = []
  const fieldIndices: { objIndex: number; field: keyof T; textIndex: number }[] = []

  // Collect all texts to translate
  array.forEach((obj, objIndex) => {
    fields.forEach((field) => {
      const text = String(obj[field] || "")
      fieldIndices.push({ objIndex, field, textIndex: allTexts.length })
      allTexts.push(text)
    })
  })

  // Translate all texts in batch
  const translations = await translateBatch(allTexts, targetLang, sourceLang)

  // Create translated array
  const translatedArray = array.map((obj) => ({ ...obj }))

  // Apply translations
  fieldIndices.forEach(({ objIndex, field, textIndex }) => {
    translatedArray[objIndex][field] = translations[textIndex] as any
  })

  return translatedArray
}

/**
 * Clear translation cache
 */
export function clearTranslationCache(): void {
  Object.keys(translationCache).forEach((key) => {
    delete translationCache[key]
  })

  // Clear localStorage cache
  try {
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith("translation_")) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error("[v0] Error clearing translation cache from localStorage:", error)
  }
}
