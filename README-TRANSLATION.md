# Système de Traduction AfroMarket

## Vue d'ensemble

AfroMarket dispose d'un système de traduction complet qui gère à la fois :
- **Traductions statiques** : Textes de l'interface (boutons, labels, menus)
- **Traductions dynamiques** : Données provenant de la base de données (noms de produits, descriptions, etc.)

## Langues supportées

- 🇫🇷 Français (FR)
- 🇬🇧 Anglais (EN)
- 🇩🇪 Allemand (DE)
- 🇪🇸 Espagnol (ES)
- 🇮🇹 Italien (IT)
- 🇵🇹 Portugais (PT)
- 🇳🇱 Néerlandais (NL)

## Architecture

### 1. Traductions statiques

Les traductions statiques sont gérées via le contexte `LanguageProvider` dans `lib/i18n-context.tsx`.

**Utilisation :**

\`\`\`tsx
import { useLanguage } from "@/lib/i18n-context"

function MyComponent() {
  const { t, language, setLanguage } = useLanguage()
  
  return (
    <div>
      <h1>{t("header.appName")}</h1>
      <p>{t("common.search")}</p>
    </div>
  )
}
\`\`\`

### 2. Traductions dynamiques

Les traductions dynamiques utilisent l'API DeepL pour traduire automatiquement les données.

**Configuration :**

Ajoutez votre clé API DeepL dans les variables d'environnement :

\`\`\`env
TRANSLATION_API_KEY=your_deepl_api_key_here
\`\`\`

**Service de traduction :**

Le service `lib/translation-service.ts` fournit plusieurs fonctions :

- `translateText(text, targetLang, sourceLang?)` : Traduit un texte simple
- `translateBatch(texts[], targetLang, sourceLang?)` : Traduit plusieurs textes en batch
- `translateObject(obj, fields[], targetLang, sourceLang?)` : Traduit les champs d'un objet
- `translateArray(array[], fields[], targetLang, sourceLang?)` : Traduit un tableau d'objets

**Exemple d'utilisation :**

\`\`\`tsx
import { translateText, translateArray } from "@/lib/translation-service"

// Traduire un texte simple
const translatedText = await translateText("Bonjour", "en", "fr")
// Result: "Hello"

// Traduire un tableau d'objets
const products = [
  { name: "Huile de palme", description: "Huile rouge authentique" },
  { name: "Farine de manioc", description: "Farine fine pour gari" }
]

const translatedProducts = await translateArray(
  products,
  ["name", "description"],
  "en",
  "fr"
)
// Result: [
//   { name: "Palm oil", description: "Authentic red oil" },
//   { name: "Cassava flour", description: "Fine flour for gari" }
// ]
\`\`\`

### 3. Hooks React pour la traduction

Le fichier `lib/hooks/use-translated-data.ts` fournit des hooks React pour traduire automatiquement les données :

**Hook `useTranslatedObject` :**

\`\`\`tsx
import { useTranslatedObject } from "@/lib/hooks/use-translated-data"

function ProductDetail({ product }) {
  const { data: translatedProduct, isTranslating } = useTranslatedObject(
    product,
    ["name", "description"],
    "fr" // langue source
  )
  
  if (isTranslating) return <div>Traduction en cours...</div>
  
  return (
    <div>
      <h1>{translatedProduct.name}</h1>
      <p>{translatedProduct.description}</p>
    </div>
  )
}
\`\`\`

**Hook `useTranslatedArray` :**

\`\`\`tsx
import { useTranslatedArray } from "@/lib/hooks/use-translated-data"

function ProductList({ products }) {
  const { data: translatedProducts, isTranslating } = useTranslatedArray(
    products,
    ["name", "description"],
    "fr" // langue source
  )
  
  return (
    <div>
      {translatedProducts.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  )
}
\`\`\`

## Système de cache

Le système de traduction inclut un cache automatique pour optimiser les performances :

- **Cache en mémoire** : Les traductions sont stockées en mémoire pendant la session
- **Cache localStorage** : Les traductions sont persistées dans le navigateur
- **Vérification automatique** : Avant d'appeler l'API, le système vérifie si la traduction existe déjà

**Effacer le cache :**

\`\`\`tsx
import { clearTranslationCache } from "@/lib/translation-service"

// Effacer tout le cache de traduction
clearTranslationCache()
\`\`\`

## Sélecteur de langue

Le sélecteur de langue est disponible dans :
- **Header desktop** : Visible en permanence
- **Menu burger mobile** : Accessible via le menu hamburger

Le changement de langue est instantané et met à jour toute l'interface sans rechargement de page.

## Bonnes pratiques

### 1. Toujours utiliser les clés de traduction

❌ **Mauvais :**
\`\`\`tsx
<button>Se connecter</button>
\`\`\`

✅ **Bon :**
\`\`\`tsx
<button>{t("header.signIn")}</button>
\`\`\`

### 2. Traduire les données dynamiques

❌ **Mauvais :**
\`\`\`tsx
<h1>{product.name}</h1>
\`\`\`

✅ **Bon :**
\`\`\`tsx
const { data: translatedProduct } = useTranslatedObject(product, ["name"], "fr")
<h1>{translatedProduct.name}</h1>
\`\`\`

### 3. Gérer les états de chargement

\`\`\`tsx
const { data, isTranslating } = useTranslatedArray(products, ["name"], "fr")

if (isTranslating) {
  return <Skeleton />
}

return <ProductList products={data} />
\`\`\`

### 4. Spécifier la langue source

Toujours spécifier la langue source des données pour une traduction plus précise :

\`\`\`tsx
// Si vos données sont en français
useTranslatedObject(data, ["name"], "fr")

// Si vos données sont en anglais
useTranslatedObject(data, ["name"], "en")
\`\`\`

## Limitations

- **Quota API** : L'API DeepL a des limites de caractères par mois (500,000 caractères gratuits)
- **Délai de traduction** : La première traduction peut prendre quelques secondes
- **Langues supportées** : Seules les 7 langues listées sont supportées

## Migration vers Redis (Production)

Pour la production, il est recommandé d'utiliser Redis pour le cache :

1. Installer Redis :
\`\`\`bash
npm install redis
\`\`\`

2. Créer un client Redis :
\`\`\`ts
import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL
})

await redis.connect()
\`\`\`

3. Modifier le service de traduction pour utiliser Redis au lieu de localStorage

## Support

Pour toute question sur le système de traduction, consultez la documentation ou contactez l'équipe de développement.
