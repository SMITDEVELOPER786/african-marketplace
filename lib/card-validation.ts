/**
 * Valide un numéro de carte bancaire avec l'algorithme de Luhn
 * @param cardNumber - Numéro de carte sans espaces
 * @returns true si valide, false sinon
 */
export function validateCardNumberLuhn(cardNumber: string): boolean {
  // Supprimer les espaces et vérifier que ce sont des chiffres
  const cleaned = cardNumber.replace(/\s/g, "")
  if (!/^\d+$/.test(cleaned)) return false

  let sum = 0
  let isEven = false

  // Parcourir de droite à gauche
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cleaned[i])

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Détecte le type de carte bancaire
 * @param cardNumber - Numéro de carte
 * @returns Type de carte (visa, mastercard, amex, etc.)
 */
export function detectCardType(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, "")

  if (/^4/.test(cleaned)) return "visa"
  if (/^5[1-5]/.test(cleaned)) return "mastercard"
  if (/^3[47]/.test(cleaned)) return "amex"
  if (/^6(?:011|5)/.test(cleaned)) return "discover"

  return "unknown"
}
