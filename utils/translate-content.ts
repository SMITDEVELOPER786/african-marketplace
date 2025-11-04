import type { Language } from "@/lib/i18n-context"

/**
 * Translates user-generated content to the target language
 * In production, this would integrate with a translation API like Google Translate or DeepL
 */
export async function translateUserContent(text: string, targetLang: Language): Promise<string> {
  if (!text || typeof text !== "string" || text.trim() === "") {
    return text
  }

  if (text.length > 5000) {
    console.warn("[v0] Text too long for translation, truncating")
    text = text.substring(0, 5000)
  }

  // For now, return the original text
  // In production, implement API call:
  /*
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // Add authentication header in production
        // 'Authorization': `Bearer ${process.env.TRANSLATION_API_KEY}`
      },
      body: JSON.stringify({ text, targetLang, sourceLang: 'auto' })
    })
    
    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Validate response
    if (!data.translatedText || typeof data.translatedText !== 'string') {
      throw new Error('Invalid translation response')
    }
    
    return data.translatedText
  } catch (error) {
    console.error('[v0] Translation error:', error)
    return text // Fallback to original text
  }
  */

  return text
}

/**
 * Translates multiple texts in batch
 */
export async function translateBatch(texts: string[], targetLang: Language): Promise<string[]> {
  if (!Array.isArray(texts) || texts.length === 0) {
    return texts
  }

  if (texts.length > 100) {
    console.warn("[v0] Batch size too large, processing in chunks")
    const chunks = []
    for (let i = 0; i < texts.length; i += 100) {
      chunks.push(texts.slice(i, i + 100))
    }
    const results = await Promise.all(chunks.map((chunk) => translateBatch(chunk, targetLang)))
    return results.flat()
  }

  // In production, use batch translation API for better performance
  return Promise.all(texts.map((text) => translateUserContent(text, targetLang)))
}

/**
 * Cache translated content to avoid repeated API calls
 */
const MAX_CACHE_SIZE = 1000
const translationCache = new Map<string, string>()

export function getCachedTranslation(text: string, targetLang: Language): string | null {
  const key = `${text}:${targetLang}`
  return translationCache.get(key) || null
}

export function setCachedTranslation(text: string, targetLang: Language, translation: string): void {
  if (translationCache.size >= MAX_CACHE_SIZE) {
    // Remove oldest entry
    const firstKey = translationCache.keys().next().value
    if (firstKey) {
      translationCache.delete(firstKey)
    }
  }

  const key = `${text}:${targetLang}`
  translationCache.set(key, translation)
}

export function clearTranslationCache(): void {
  translationCache.clear()
}
