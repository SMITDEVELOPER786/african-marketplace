"use client"

import { Button } from "@/components/ui/button"
import { Download, Printer, FileText } from "lucide-react"
import { useState } from "react"

export default function CahierDesChargesPage() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadHTML = () => {
    const content = document.getElementById("cahier-content")?.innerHTML || ""
    const fullHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cahier des Charges - AfroMarket</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      color: #333;
    }
    h1 { color: #c2410c; font-size: 2.5em; margin-bottom: 0.5em; }
    h2 { color: #ea580c; font-size: 2em; margin-top: 1.5em; border-bottom: 2px solid #fed7aa; padding-bottom: 0.3em; }
    h3 { color: #f97316; font-size: 1.5em; margin-top: 1.2em; }
    h4 { color: #fb923c; font-size: 1.2em; margin-top: 1em; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #fed7aa; color: #7c2d12; font-weight: bold; }
    tr:nth-child(even) { background-color: #fff7ed; }
    img { max-width: 100%; height: auto; margin: 20px 0; border: 1px solid #ddd; border-radius: 8px; }
    .page-break { page-break-after: always; }
    ul, ol { margin: 15px 0; padding-left: 30px; }
    li { margin: 8px 0; }
    .highlight { background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
    `

    const blob = new Blob([fullHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Cahier_des_Charges_AfroMarket.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    // Utiliser window.print() qui permet de sauvegarder en PDF
    setTimeout(() => {
      window.print()
      setIsGenerating(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header avec boutons de téléchargement */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Cahier des Charges</h1>
                <p className="text-sm text-gray-600">AfroMarket - Marketplace Africaine</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleDownloadHTML} className="bg-orange-600 hover:bg-orange-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Télécharger HTML
              </Button>

              <Button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparen t"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? "Génération..." : "Télécharger PDF"}
              </Button>

              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu du cahier des charges */}
      <div id="cahier-content" className="max-w-5xl mx-auto px-4 py-12">
        {/* Page de garde */}
        <div className="text-center mb-16 page-break">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-600 rounded-full mb-6">
              <span className="text-4xl font-bold text-white">A</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Cahier des Charges</h1>
          <h2 className="text-3xl font-semibold text-orange-600 mb-8">AfroMarket</h2>
          <p className="text-xl text-gray-600 mb-12">Plateforme N°1 des produits africains dans le monde</p>
          <div className="border-t border-b border-gray-300 py-6 mb-8">
            <p className="text-lg text-gray-700">Version 1.0</p>
            <p className="text-gray-600">
              {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="text-left max-w-md mx-auto space-y-2 text-gray-700">
            <p>
              <strong>Client :</strong> AfroMarket
            </p>
            <p>
              <strong>Type de projet :</strong> Application Web Marketplace
            </p>
            <p>
              <strong>Statut :</strong> En développement
            </p>
          </div>
        </div>

        {/* Table des matières */}
        <div className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            Table des Matières
          </h2>
          <ol className="space-y-3 text-lg">
            <li>
              <a href="#introduction" className="text-orange-600 hover:underline">
                1. Introduction et Contexte
              </a>
            </li>
            <li>
              <a href="#objectifs" className="text-orange-600 hover:underline">
                2. Objectifs du Projet
              </a>
            </li>
            <li>
              <a href="#perimetre" className="text-orange-600 hover:underline">
                3. Périmètre Fonctionnel
              </a>
            </li>
            <li>
              <a href="#specifications" className="text-orange-600 hover:underline">
                4. Spécifications Fonctionnelles Détaillées
              </a>
            </li>
            <li>
              <a href="#technique" className="text-orange-600 hover:underline">
                5. Spécifications Techniques
              </a>
            </li>
            <li>
              <a href="#architecture" className="text-orange-600 hover:underline">
                6. Architecture de l'Application
              </a>
            </li>
            <li>
              <a href="#interfaces" className="text-orange-600 hover:underline">
                7. Interfaces et Maquettes
              </a>
            </li>
            <li>
              <a href="#exigences" className="text-orange-600 hover:underline">
                8. Exigences Non Fonctionnelles
              </a>
            </li>
            <li>
              <a href="#planning" className="text-orange-600 hover:underline">
                9. Planning et Livrables
              </a>
            </li>
            <li>
              <a href="#budget" className="text-orange-600 hover:underline">
                10. Budget Estimatif
              </a>
            </li>
          </ol>
        </div>

        {/* 1. Introduction et Contexte */}
        <section id="introduction" className="mb-16">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            1. Introduction et Contexte
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1.1 Présentation du Projet</h3>
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>AfroMarket</strong> est une plateforme marketplace innovante dédiée à la promotion et à la vente de
            produits africains authentiques à travers le monde. L'application vise à connecter les commerçants africains
            avec une clientèle internationale, principalement en Europe, aux États-Unis et au Canada.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">1.2 Contexte du Marché</h3>
          <p className="mb-4 text-gray-700 leading-relaxed">
            La diaspora africaine représente un marché en forte croissance avec une demande croissante pour des produits
            authentiques : épices, tissus, artisanat, cosmétiques naturels, et produits alimentaires traditionnels.
            AfroMarket répond à ce besoin en créant un pont numérique entre les producteurs/commerçants africains et les
            consommateurs internationaux.
          </p>

          <div className="highlight">
            <h4 className="font-semibold text-gray-900 mb-2">🎯 Mission</h4>
            <p className="text-gray-700">
              Devenir la plateforme de référence pour l'achat de produits africains authentiques, en offrant une
              expérience utilisateur exceptionnelle, multilingue et adaptée aux besoins spécifiques de chaque marché.
            </p>
          </div>
        </section>

        {/* 2. Objectifs du Projet */}
        <section id="objectifs" className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            2. Objectifs du Projet
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2.1 Objectifs Principaux</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              ✅ <strong>Créer une marketplace multilingue</strong> accessible en français, anglais, espagnol, allemand,
              italien, portugais et néerlandais
            </li>
            <li>
              ✅ <strong>Faciliter la recherche</strong> de produits et commerces africains avec un système de recherche
              intelligent et des filtres avancés
            </li>
            <li>
              ✅ <strong>Offrir une expérience mobile-first</strong> optimisée pour tous les appareils (smartphone,
              tablette, desktop)
            </li>
            <li>
              ✅ <strong>Permettre la géolocalisation</strong> des commerces et restaurants africains par pays et ville
            </li>
            <li>
              ✅ <strong>Intégrer un système de réservation</strong> pour les restaurants et services
            </li>
            <li>
              ✅ <strong>Créer des profils différenciés</strong> pour clients, commerçants et restaurateurs
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">2.2 Objectifs Secondaires</h3>
          <ul className="space-y-3 text-gray-700">
            <li>📊 Fournir des statistiques et analytics aux commerçants</li>
            <li>⭐ Mettre en place un système de notation et d'avis clients</li>
            <li>🎁 Créer un système de commerces "vedettes" et promotions</li>
            <li>📱 Développer une application mobile native (phase 2)</li>
            <li>💳 Intégrer des solutions de paiement internationales</li>
          </ul>
        </section>

        {/* 3. Périmètre Fonctionnel */}
        <section id="perimetre" className="mb-16">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            3. Périmètre Fonctionnel
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3.1 Fonctionnalités Incluses (Phase 1)</h3>

          <h4 className="text-xl font-semibold text-gray-700 mb-3 mt-6">🔍 Recherche et Navigation</h4>
          <ul className="space-y-2 text-gray-700 ml-6">
            <li>• Recherche avancée avec suggestions IA</li>
            <li>• Filtres multiples (pays, ville, catégorie, prix, note, distance)</li>
            <li>• Sélecteur de localisation (pays/ville favoris)</li>
            <li>• Affichage des résultats en grille, liste ou carte</li>
            <li>• Pagination des résultats</li>
            <li>• Système de favoris</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-700 mb-3 mt-6">👤 Gestion des Utilisateurs</h4>
          <ul className="space-y-2 text-gray-700 ml-6">
            <li>• Inscription/Connexion avec email et mot de passe</li>
            <li>• Profils différenciés : Client, Commerçant, Restaurant</li>
            <li>• Gestion du profil (informations personnelles, photo, préférences)</li>
            <li>• Historique des commandes et réservations</li>
            <li>• Liste de favoris</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-700 mb-3 mt-6">🏪 Espace Commerçant</h4>
          <ul className="space-y-2 text-gray-700 ml-6">
            <li>• Création et gestion de la fiche commerce</li>
            <li>• Ajout et gestion des produits (photos, descriptions, prix)</li>
            <li>• Gestion des horaires d'ouverture</li>
            <li>• Statistiques de visibilité</li>
            <li>• Gestion des avis clients</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-700 mb-3 mt-6">🍽️ Espace Restaurant</h4>
          <ul className="space-y-2 text-gray-700 ml-6">
            <li>• Création et gestion de la fiche restaurant</li>
            <li>• Gestion du menu (plats, prix, photos)</li>
            <li>• Système de réservation de tables</li>
            <li>• Calendrier des disponibilités</li>
            <li>• Notifications de réservations</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-700 mb-3 mt-6">🌍 Internationalisation</h4>
          <ul className="space-y-2 text-gray-700 ml-6">
            <li>• Support de 7 langues (FR, EN, ES, DE, IT, PT, NL)</li>
            <li>• Détection automatique de la langue du navigateur</li>
            <li>• Sélecteur de langue visible avec drapeaux</li>
            <li>• Traduction des contenus utilisateurs (descriptions, menus)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            3.2 Fonctionnalités Exclues (Phases Futures)
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>❌ Paiement en ligne intégré (Phase 2)</li>
            <li>❌ Livraison et tracking (Phase 2)</li>
            <li>❌ Application mobile native (Phase 3)</li>
            <li>❌ Programme de fidélité (Phase 3)</li>
            <li>❌ Chat en direct commerçant-client (Phase 2)</li>
          </ul>
        </section>

        {/* 4. Spécifications Fonctionnelles Détaillées */}
        <section id="specifications" className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            4. Spécifications Fonctionnelles Détaillées
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4.1 Module de Recherche</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Fonctionnalité</th>
                <th>Description</th>
                <th>Priorité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Recherche textuelle</td>
                <td>Recherche par mots-clés dans les noms, descriptions, catégories</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Suggestions IA</td>
                <td>Suggestions intelligentes basées sur l'historique et les tendances</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Filtres avancés</td>
                <td>Pays, ville, catégorie, prix, note, distance, statut (ouvert/fermé)</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Tri des résultats</td>
                <td>Par pertinence, note, distance, prix, nouveauté</td>
                <td>Moyenne</td>
              </tr>
              <tr>
                <td>Géolocalisation</td>
                <td>Recherche par proximité avec calcul de distance</td>
                <td>Moyenne</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">4.2 Module de Réservation</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Fonctionnalité</th>
                <th>Description</th>
                <th>Priorité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sélection date/heure</td>
                <td>Calendrier interactif avec créneaux disponibles</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Nombre de personnes</td>
                <td>Sélection du nombre de convives (1-20+)</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Demandes spéciales</td>
                <td>Champ texte pour allergies, préférences, occasions</td>
                <td>Moyenne</td>
              </tr>
              <tr>
                <td>Confirmation</td>
                <td>Email de confirmation avec détails et bouton calendrier</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Gestion réservations</td>
                <td>Annulation, modification, historique</td>
                <td>Haute</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">4.3 Module d'Authentification</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Fonctionnalité</th>
                <th>Description</th>
                <th>Priorité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inscription</td>
                <td>Email, mot de passe, type de compte (client/commerçant/restaurant)</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Connexion</td>
                <td>Email et mot de passe avec option "Se souvenir de moi"</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Réinitialisation</td>
                <td>Récupération de mot de passe par email</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>Sécurité</td>
                <td>Validation email, mot de passe fort, protection CSRF</td>
                <td>Haute</td>
              </tr>
              <tr>
                <td>OAuth (futur)</td>
                <td>Connexion via Google, Facebook (Phase 2)</td>
                <td>Basse</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 5. Spécifications Techniques */}
        <section id="technique" className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            5. Spécifications Techniques
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5.1 Stack Technologique</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Composant</th>
                <th>Technologie</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Framework Frontend</td>
                <td>Next.js (App Router)</td>
                <td>15.x</td>
              </tr>
              <tr>
                <td>Langage</td>
                <td>TypeScript</td>
                <td>5.x</td>
              </tr>
              <tr>
                <td>UI Framework</td>
                <td>React</td>
                <td>19.x</td>
              </tr>
              <tr>
                <td>Styling</td>
                <td>Tailwind CSS</td>
                <td>4.x</td>
              </tr>
              <tr>
                <td>Composants UI</td>
                <td>shadcn/ui + Radix UI</td>
                <td>Latest</td>
              </tr>
              <tr>
                <td>Base de données</td>
                <td>Supabase (PostgreSQL)</td>
                <td>Latest</td>
              </tr>
              <tr>
                <td>Authentification</td>
                <td>Supabase Auth</td>
                <td>Latest</td>
              </tr>
              <tr>
                <td>Stockage fichiers</td>
                <td>Supabase Storage</td>
                <td>Latest</td>
              </tr>
              <tr>
                <td>Déploiement</td>
                <td>Vercel</td>
                <td>Latest</td>
              </tr>
              <tr>
                <td>Internationalisation</td>
                <td>React Context + localStorage</td>
                <td>Custom</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">5.2 Architecture Base de Données</h3>

          <h4 className="text-xl font-semibold text-gray-700 mb-3">Tables Principales</h4>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Table</th>
                <th>Description</th>
                <th>Champs Principaux</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>users</td>
                <td>Utilisateurs de la plateforme</td>
                <td>id, email, role, name, phone, avatar_url, created_at</td>
              </tr>
              <tr>
                <td>businesses</td>
                <td>Commerces et restaurants</td>
                <td>
                  id, owner_id, name, type, category, description, address, city, country, phone, email, website,
                  rating, is_featured
                </td>
              </tr>
              <tr>
                <td>products</td>
                <td>Produits des commerces</td>
                <td>id, business_id, name, description, price, currency, images, stock, category</td>
              </tr>
              <tr>
                <td>menu_items</td>
                <td>Plats des restaurants</td>
                <td>id, restaurant_id, name, description, price, category, image, allergens, is_available</td>
              </tr>
              <tr>
                <td>reservations</td>
                <td>Réservations restaurants</td>
                <td>id, restaurant_id, user_id, date, time, guests, status, special_requests</td>
              </tr>
              <tr>
                <td>reviews</td>
                <td>Avis clients</td>
                <td>id, business_id, user_id, rating, comment, created_at</td>
              </tr>
              <tr>
                <td>favorites</td>
                <td>Favoris des utilisateurs</td>
                <td>id, user_id, business_id, created_at</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">5.3 APIs et Intégrations</h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              🗺️ <strong>Google Maps API</strong> : Géolocalisation, cartes, calcul de distance
            </li>
            <li>
              📧 <strong>Service Email</strong> : Confirmations de réservation, notifications
            </li>
            <li>
              🌐 <strong>API de Traduction</strong> : Traduction automatique des contenus (Google Translate ou DeepL)
            </li>
            <li>
              📊 <strong>Analytics</strong> : Vercel Analytics pour le suivi des performances
            </li>
            <li>
              🔒 <strong>Sécurité</strong> : Supabase Row Level Security (RLS) pour la protection des données
            </li>
          </ul>
        </section>

        {/* 6. Architecture de l'Application */}
        <section id="architecture" className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            6. Architecture de l'Application
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">6.1 Structure des Dossiers</h3>

          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm mb-6">
            <pre>{`afromarket/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── customer/
│   │   ├── profile/
│   │   ├── reservations/
│   │   └── favorites/
│   ├── merchant/
│   │   ├── profile/
│   │   ├── products/
│   │   └── analytics/
│   ├── restaurant/
│   │   ├── profile/
│   │   ├── menu/
│   │   └── reservations/
│   ├── search/
│   │   └── results/
│   ├── about/
│   ├── help/
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── marketplace/
│   └── language-selector.tsx
├── lib/
│   ├── i18n-context.tsx
│   └── supabase/
├── utils/
│   ├── translate-content.ts
│   └── addToCalendar.ts
└── public/`}</pre>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">6.2 Flux de Navigation</h3>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Parcours Utilisateur Client</h4>
            <ol className="space-y-2 text-gray-700">
              <li>1️⃣ Arrivée sur la page d'accueil</li>
              <li>2️⃣ Sélection de la localisation (pays/ville)</li>
              <li>3️⃣ Recherche de produits/commerces/restaurants</li>
              <li>4️⃣ Consultation des résultats avec filtres</li>
              <li>5️⃣ Consultation de la fiche détaillée</li>
              <li>6️⃣ Ajout aux favoris ou réservation</li>
              <li>7️⃣ Confirmation et gestion dans le profil</li>
            </ol>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Parcours Utilisateur Commerçant</h4>
            <ol className="space-y-2 text-gray-700">
              <li>1️⃣ Inscription en tant que commerçant</li>
              <li>2️⃣ Création de la fiche commerce</li>
              <li>3️⃣ Ajout des produits avec photos et descriptions</li>
              <li>4️⃣ Configuration des horaires et informations</li>
              <li>5️⃣ Consultation des statistiques</li>
              <li>6️⃣ Gestion des avis clients</li>
            </ol>
          </div>
        </section>

        {/* 7. Interfaces et Maquettes */}
        <section id="interfaces" className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            7. Interfaces et Maquettes
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">7.1 Page d'Accueil</h3>
          <p className="mb-4 text-gray-700">
            La page d'accueil présente le slogan "Plateforme N°1 des produits africains dans le monde", une barre de
            recherche avancée avec sélection de pays/ville et catégorie, les catégories populaires, les commerces les
            mieux notés, les commerces vedettes, et une section statistiques avec bouton d'inscription.
          </p>
          <img
            src="https://xurtccytrzafbfk3.public.blob.vercel-storage.com/agent-assets/fa1220f66d5cec32525316b7940b12d3f1e3d94ce242b7ac3ff40cd5b72518f9.jpeg"
            alt="Page d'accueil AfroMarket"
            className="w-full mb-8"
          />

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">7.2 Page de Résultats de Recherche</h3>
          <p className="mb-4 text-gray-700">
            La page de résultats affiche les commerces et restaurants correspondant à la recherche, avec une sidebar de
            filtres (type d'annonce, statut, pays, ville, catégorie, prix, distance, note), des options de tri et
            d'affichage (grille/liste/carte), et une pagination.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">7.3 Page À Propos</h3>
          <p className="mb-4 text-gray-700">
            La page À propos présente la mission d'AfroMarket, l'histoire de la plateforme, les valeurs (authenticité,
            qualité, communauté, innovation), et l'équipe.
          </p>
          <img
            src="https://xurtccytrzafbfk3.public.blob.vercel-storage.com/agent-assets/e868bc12cb6e55278965bb091f1982494ba0398d414f400f5b06144c47ffa5b6.jpg"
            alt="Page À propos"
            className="w-full mb-8"
          />

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">7.4 Page d'Aide</h3>
          <p className="mb-4 text-gray-700">
            La page d'aide propose des guides d'utilisation détaillés avec captures d'écran, des tutoriels vidéo, et une
            FAQ complète pour aider les utilisateurs à naviguer sur la plateforme.
          </p>
          <img
            src="https://xurtccytrzafbfk3.public.blob.vercel-storage.com/agent-assets/0e0705238b19a436732a99b54bfe0f0a1c10b555d7e846c61f03dfb1d8f6453c.jpeg"
            alt="Page d'aide"
            className="w-full mb-8"
          />

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">7.5 Design System</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Élément</th>
                <th>Spécification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Couleur Principale</td>
                <td>Orange (#ea580c, #f97316, #fb923c)</td>
              </tr>
              <tr>
                <td>Couleurs Secondaires</td>
                <td>Ambre (#f59e0b), Gris (#6b7280)</td>
              </tr>
              <tr>
                <td>Police Principale</td>
                <td>Geist (sans-serif)</td>
              </tr>
              <tr>
                <td>Police Monospace</td>
                <td>Geist Mono</td>
              </tr>
              <tr>
                <td>Espacement</td>
                <td>Échelle Tailwind (4px, 8px, 12px, 16px, 24px, 32px, 48px)</td>
              </tr>
              <tr>
                <td>Bordures</td>
                <td>Arrondies (8px, 12px, 16px)</td>
              </tr>
              <tr>
                <td>Ombres</td>
                <td>Subtiles (shadow-sm, shadow-md, shadow-lg)</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 8. Exigences Non Fonctionnelles */}
        <section id="exigences" className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            8. Exigences Non Fonctionnelles
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">8.1 Performance</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              ⚡ <strong>Temps de chargement initial</strong> : &lt; 2 secondes
            </li>
            <li>
              ⚡ <strong>Time to Interactive (TTI)</strong> : &lt; 3 secondes
            </li>
            <li>
              ⚡ <strong>Largest Contentful Paint (LCP)</strong> : &lt; 2.5 secondes
            </li>
            <li>
              ⚡ <strong>First Input Delay (FID)</strong> : &lt; 100ms
            </li>
            <li>
              ⚡ <strong>Cumulative Layout Shift (CLS)</strong> : &lt; 0.1
            </li>
            <li>
              ⚡ <strong>Optimisation images</strong> : Lazy loading, formats modernes (WebP, AVIF)
            </li>
            <li>
              ⚡ <strong>Mise en cache</strong> : Stratégie de cache agressive pour les assets statiques
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">8.2 Sécurité</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              🔒 <strong>Authentification sécurisée</strong> : Supabase Auth avec JWT
            </li>
            <li>
              🔒 <strong>Protection des données</strong> : Row Level Security (RLS) sur toutes les tables
            </li>
            <li>
              🔒 <strong>Validation des entrées</strong> : Validation côté client et serveur
            </li>
            <li>
              🔒 <strong>Protection CSRF</strong> : Tokens CSRF sur toutes les actions sensibles
            </li>
            <li>
              🔒 <strong>Mots de passe</strong> : Hachage bcrypt, politique de mot de passe fort
            </li>
            <li>
              🔒 <strong>HTTPS</strong> : Obligatoire sur toute la plateforme
            </li>
            <li>
              🔒 <strong>Headers de sécurité</strong> : CSP, X-Frame-Options, X-Content-Type-Options
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">8.3 Accessibilité</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              ♿ <strong>Conformité WCAG 2.1</strong> : Niveau AA minimum
            </li>
            <li>
              ♿ <strong>Navigation au clavier</strong> : Tous les éléments interactifs accessibles
            </li>
            <li>
              ♿ <strong>Lecteurs d'écran</strong> : ARIA labels et rôles appropriés
            </li>
            <li>
              ♿ <strong>Contraste</strong> : Ratio de contraste minimum 4.5:1
            </li>
            <li>
              ♿ <strong>Taille de texte</strong> : Minimum 16px, redimensionnable jusqu'à 200%
            </li>
            <li>
              ♿ <strong>Focus visible</strong> : Indicateurs de focus clairs
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">8.4 Compatibilité</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Plateforme</th>
                <th>Versions Supportées</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chrome</td>
                <td>2 dernières versions</td>
              </tr>
              <tr>
                <td>Firefox</td>
                <td>2 dernières versions</td>
              </tr>
              <tr>
                <td>Safari</td>
                <td>2 dernières versions</td>
              </tr>
              <tr>
                <td>Edge</td>
                <td>2 dernières versions</td>
              </tr>
              <tr>
                <td>Mobile (iOS)</td>
                <td>iOS 14+</td>
              </tr>
              <tr>
                <td>Mobile (Android)</td>
                <td>Android 10+</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">8.5 Responsive Design</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              📱 <strong>Mobile First</strong> : Design optimisé pour mobile en priorité
            </li>
            <li>
              📱 <strong>Breakpoints</strong> : Mobile (&lt;640px), Tablet (640-1024px), Desktop (&gt;1024px)
            </li>
            <li>
              📱 <strong>Touch-friendly</strong> : Zones tactiles minimum 44x44px
            </li>
            <li>
              📱 <strong>Orientation</strong> : Support portrait et paysage
            </li>
          </ul>
        </section>

        {/* 9. Planning et Livrables */}
        <section id="planning" className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            9. Planning et Livrables
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">9.1 Phase 1 : MVP (8 semaines)</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Semaine</th>
                <th>Tâches</th>
                <th>Livrables</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1-2</td>
                <td>Setup projet, architecture, design system</td>
                <td>Environnement de développement, maquettes validées</td>
              </tr>
              <tr>
                <td>3-4</td>
                <td>Authentification, profils utilisateurs, base de données</td>
                <td>Système d'inscription/connexion fonctionnel</td>
              </tr>
              <tr>
                <td>5-6</td>
                <td>Recherche, filtres, affichage des résultats</td>
                <td>Module de recherche complet</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Système de réservation, favoris</td>
                <td>Réservations fonctionnelles</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Tests, optimisations, déploiement</td>
                <td>Application en production</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            9.2 Phase 2 : Fonctionnalités Avancées (6 semaines)
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Intégration paiement en ligne (Stripe)</li>
            <li>• Système de livraison et tracking</li>
            <li>• Chat en direct commerçant-client</li>
            <li>• Notifications push</li>
            <li>• Programme de fidélité</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            9.3 Phase 3 : Application Mobile (8 semaines)
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Développement application mobile native (React Native)</li>
            <li>• Publication sur App Store et Google Play</li>
            <li>• Fonctionnalités spécifiques mobile (géolocalisation avancée, notifications)</li>
          </ul>
        </section>

        {/* 10. Budget Estimatif */}
        <section id="budget" className="mb-16">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">
            10. Budget Estimatif
          </h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">10.1 Coûts de Développement (Phase 1)</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Poste</th>
                <th>Détails</th>
                <th>Coût Estimé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Développement Frontend</td>
                <td>320 heures × 80€/h</td>
                <td>25 600 €</td>
              </tr>
              <tr>
                <td>Développement Backend</td>
                <td>160 heures × 80€/h</td>
                <td>12 800 €</td>
              </tr>
              <tr>
                <td>Design UI/UX</td>
                <td>80 heures × 70€/h</td>
                <td>5 600 €</td>
              </tr>
              <tr>
                <td>Tests et QA</td>
                <td>80 heures × 60€/h</td>
                <td>4 800 €</td>
              </tr>
              <tr>
                <td>Gestion de projet</td>
                <td>80 heures × 70€/h</td>
                <td>5 600 €</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Phase 1</strong>
                </td>
                <td></td>
                <td>
                  <strong>54 400 €</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">10.2 Coûts d'Infrastructure (Annuels)</h3>

          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Service</th>
                <th>Détails</th>
                <th>Coût Mensuel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hébergement (Vercel)</td>
                <td>Plan Pro</td>
                <td>20 €</td>
              </tr>
              <tr>
                <td>Base de données (Supabase)</td>
                <td>Plan Pro</td>
                <td>25 €</td>
              </tr>
              <tr>
                <td>Stockage fichiers</td>
                <td>100 GB</td>
                <td>10 €</td>
              </tr>
              <tr>
                <td>API Traduction</td>
                <td>Google Translate API</td>
                <td>50 €</td>
              </tr>
              <tr>
                <td>Email (SendGrid)</td>
                <td>Plan Essentials</td>
                <td>15 €</td>
              </tr>
              <tr>
                <td>Monitoring</td>
                <td>Sentry, Analytics</td>
                <td>30 €</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Mensuel</strong>
                </td>
                <td></td>
                <td>
                  <strong>150 €</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Total Annuel</strong>
                </td>
                <td></td>
                <td>
                  <strong>1 800 €</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="highlight">
            <h4 className="font-semibold text-gray-900 mb-2">💰 Budget Total Phase 1</h4>
            <p className="text-gray-700 text-lg">
              <strong>Développement :</strong> 54 400 € + <strong>Infrastructure (1ère année) :</strong> 1 800 € ={" "}
              <strong className="text-2xl text-orange-600">56 200 €</strong>
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16 page-break">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-200 pb-3">Conclusion</h2>

          <p className="mb-4 text-gray-700 leading-relaxed">
            AfroMarket représente une opportunité unique de créer une plateforme de référence pour les produits
            africains authentiques à l'échelle mondiale. Ce cahier des charges définit une vision claire et réalisable
            pour la Phase 1 (MVP), avec une architecture technique solide, une expérience utilisateur optimisée, et un
            système multilingue complet.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            Le projet est conçu avec une approche mobile-first, des standards de sécurité élevés, et une scalabilité
            permettant d'évoluer vers les phases 2 et 3 (paiement en ligne, livraison, application mobile native).
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">🚀 Prêt à Démarrer</h3>
            <p className="text-gray-700 text-lg mb-4">
              AfroMarket est prêt à révolutionner l'accès aux produits africains authentiques dans le monde entier.
            </p>
            <p className="text-gray-600">Pour toute question ou clarification, contactez l'équipe projet.</p>
          </div>
        </section>

        {/* Footer du document */}
        <footer className="text-center text-gray-500 text-sm border-t border-gray-300 pt-6 mt-16">
          <p>© {new Date().getFullYear()} AfroMarket - Tous droits réservés</p>
          <p className="mt-2">Document confidentiel - Ne pas diffuser sans autorisation</p>
        </footer>
      </div>
    </div>
  )
}
