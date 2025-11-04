import { NextResponse } from "next/server"

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cahier des Charges - AfroMarket</title>
  <style>
    @page {
      margin: 2cm;
      size: A4;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .cover-page {
      text-align: center;
      padding: 100px 0;
      border-bottom: 3px solid #c2410c;
      margin-bottom: 60px;
      page-break-after: always;
    }
    
    .cover-page h1 {
      font-size: 48px;
      color: #c2410c;
      margin-bottom: 20px;
      font-weight: 700;
    }
    
    .cover-page .subtitle {
      font-size: 24px;
      color: #666;
      margin-bottom: 40px;
    }
    
    .cover-page .version {
      font-size: 18px;
      color: #999;
      margin-top: 40px;
    }
    
    .cover-page .date {
      font-size: 16px;
      color: #999;
      margin-top: 10px;
    }
    
    h1 {
      color: #c2410c;
      font-size: 32px;
      margin: 40px 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #c2410c;
      page-break-before: always;
    }
    
    h2 {
      color: #ea580c;
      font-size: 24px;
      margin: 30px 0 15px 0;
      padding-left: 10px;
      border-left: 4px solid #ea580c;
    }
    
    h3 {
      color: #f97316;
      font-size: 20px;
      margin: 25px 0 12px 0;
    }
    
    h4 {
      color: #fb923c;
      font-size: 18px;
      margin: 20px 0 10px 0;
    }
    
    p {
      margin: 12px 0;
      text-align: justify;
    }
    
    ul, ol {
      margin: 15px 0 15px 30px;
    }
    
    li {
      margin: 8px 0;
    }
    
    .toc {
      background: #f9fafb;
      padding: 30px;
      border-radius: 8px;
      margin: 30px 0;
      page-break-after: always;
    }
    
    .toc h2 {
      border: none;
      padding: 0;
      margin-bottom: 20px;
    }
    
    .toc ul {
      list-style: none;
      margin: 0;
    }
    
    .toc li {
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .toc a {
      color: #c2410c;
      text-decoration: none;
      display: flex;
      justify-content: space-between;
    }
    
    .toc a:hover {
      color: #ea580c;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    th {
      background: #c2410c;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }
    
    td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    tr:hover {
      background: #fef2f2;
    }
    
    .info-box {
      background: #fef2f2;
      border-left: 4px solid #c2410c;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    
    .warning-box {
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    
    .success-box {
      background: #f0fdf4;
      border-left: 4px solid #10b981;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    
    .screenshot {
      margin: 30px 0;
      text-align: center;
    }
    
    .screenshot img {
      max-width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .screenshot-caption {
      margin-top: 10px;
      font-style: italic;
      color: #666;
      font-size: 14px;
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    
    .feature-card {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    
    .feature-card h4 {
      color: #c2410c;
      margin-top: 0;
    }
    
    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      color: #c2410c;
    }
    
    pre {
      background: #1f2937;
      color: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 20px 0;
    }
    
    pre code {
      background: none;
      color: #f9fafb;
      padding: 0;
    }
    
    .page-break {
      page-break-after: always;
    }
    
    @media print {
      body {
        padding: 0;
      }
      
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <!-- Page de couverture -->
  <div class="cover-page">
    <h1>CAHIER DES CHARGES</h1>
    <div class="subtitle">AfroMarket - Plateforme de Marketplace Africaine</div>
    <div style="margin: 60px 0;">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24' fill='none' stroke='%23c2410c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20'/%3E%3Cpath d='M2 12h20'/%3E%3C/svg%3E" alt="AfroMarket Logo" />
    </div>
    <div class="version">Version 1.0</div>
    <div class="date">${new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</div>
  </div>

  <!-- Table des matières -->
  <div class="toc">
    <h2>📋 Table des Matières</h2>
    <ul>
      <li><a href="#introduction"><span>1. Introduction et Contexte</span><span>3</span></a></li>
      <li><a href="#objectifs"><span>2. Objectifs du Projet</span><span>4</span></a></li>
      <li><a href="#perimetre"><span>3. Périmètre Fonctionnel</span><span>5</span></a></li>
      <li><a href="#specifications"><span>4. Spécifications Fonctionnelles</span><span>7</span></a></li>
      <li><a href="#technique"><span>5. Spécifications Techniques</span><span>15</span></a></li>
      <li><a href="#architecture"><span>6. Architecture de l'Application</span><span>18</span></a></li>
      <li><a href="#interfaces"><span>7. Interfaces et Maquettes</span><span>20</span></a></li>
      <li><a href="#exigences"><span>8. Exigences Non Fonctionnelles</span><span>25</span></a></li>
      <li><a href="#planning"><span>9. Planning et Livrables</span><span>28</span></a></li>
      <li><a href="#budget"><span>10. Budget Estimatif</span><span>30</span></a></li>
      <li><a href="#annexes"><span>11. Annexes</span><span>31</span></a></li>
    </ul>
  </div>

  <!-- 1. Introduction et Contexte -->
  <h1 id="introduction">1. Introduction et Contexte</h1>
  
  <h2>1.1 Présentation du Projet</h2>
  <p>
    <strong>AfroMarket</strong> est une plateforme marketplace innovante dédiée à la promotion et à la commercialisation de produits africains authentiques en Europe, aux États-Unis et au Canada. Notre mission est de connecter les commerçants africains avec une clientèle internationale désireuse de découvrir et d'acheter des produits authentiques du continent africain.
  </p>
  
  <div class="info-box">
    <h4>🎯 Vision du Projet</h4>
    <p>Devenir la plateforme de référence pour les produits africains dans le monde occidental, en offrant une expérience utilisateur exceptionnelle et en valorisant le patrimoine culturel et gastronomique africain.</p>
  </div>

  <h2>1.2 Contexte du Marché</h2>
  <p>
    Le marché des produits africains en Europe et en Amérique du Nord connaît une croissance significative, portée par :
  </p>
  <ul>
    <li>Une diaspora africaine importante et en expansion (plus de 10 millions de personnes en Europe)</li>
    <li>Un intérêt croissant pour les cuisines du monde et les produits authentiques</li>
    <li>Une demande pour des produits naturels et biologiques (huile de palme, beurre de karité, etc.)</li>
    <li>Le développement du e-commerce et des marketplaces spécialisées</li>
    <li>Une volonté de soutenir l'économie africaine et le commerce équitable</li>
  </ul>

  <h2>1.3 Problématiques Identifiées</h2>
  <p>Les consommateurs et commerçants font face à plusieurs défis :</p>
  <ul>
    <li><strong>Pour les consommateurs :</strong> Difficulté à trouver des produits africains authentiques, manque de visibilité des commerces locaux, absence de plateforme centralisée</li>
    <li><strong>Pour les commerçants :</strong> Visibilité limitée, difficulté à atteindre une clientèle plus large, manque d'outils digitaux adaptés</li>
    <li><strong>Pour les restaurants :</strong> Besoin de systèmes de réservation et de gestion des menus en ligne</li>
  </ul>

  <!-- 2. Objectifs du Projet -->
  <h1 id="objectifs">2. Objectifs du Projet</h1>

  <h2>2.1 Objectifs Stratégiques</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <h4>🌍 Expansion Géographique</h4>
      <p>Couvrir l'Europe, les États-Unis et le Canada avec une présence dans les principales villes</p>
    </div>
    <div class="feature-card">
      <h4>📈 Croissance</h4>
      <p>Atteindre 10 000 utilisateurs actifs et 500 commerces partenaires la première année</p>
    </div>
    <div class="feature-card">
      <h4>💰 Rentabilité</h4>
      <p>Modèle économique basé sur les commissions et les abonnements premium</p>
    </div>
    <div class="feature-card">
      <h4>🤝 Partenariats</h4>
      <p>Établir des partenariats avec des associations et organisations africaines</p>
    </div>
  </div>

  <h2>2.2 Objectifs Fonctionnels</h2>
  <ul>
    <li>Créer une plateforme intuitive et multilingue (FR, EN, ES, DE, IT, PT, NL)</li>
    <li>Permettre aux commerçants de créer et gérer leur vitrine en ligne</li>
    <li>Offrir un système de recherche avancée avec filtres géographiques et catégoriels</li>
    <li>Intégrer un système de réservation pour les restaurants</li>
    <li>Mettre en place un système de favoris et de recommandations personnalisées</li>
    <li>Garantir une expérience mobile optimale (responsive design)</li>
  </ul>

  <h2>2.3 Objectifs Techniques</h2>
  <ul>
    <li>Développer une application web performante et scalable</li>
    <li>Assurer une sécurité optimale des données utilisateurs</li>
    <li>Garantir un temps de chargement inférieur à 2 secondes</li>
    <li>Atteindre un score Lighthouse supérieur à 90/100</li>
    <li>Assurer une disponibilité de 99.9%</li>
  </ul>

  <!-- 3. Périmètre Fonctionnel -->
  <h1 id="perimetre">3. Périmètre Fonctionnel</h1>

  <h2>3.1 Fonctionnalités Incluses (MVP)</h2>
  
  <h3>3.1.1 Espace Public</h3>
  <ul>
    <li>Page d'accueil avec recherche avancée</li>
    <li>Sélecteur de localisation (pays et ville)</li>
    <li>Recherche par mots-clés, catégories et localisation</li>
    <li>Affichage des résultats avec filtres multiples</li>
    <li>Fiches détaillées des commerces et restaurants</li>
    <li>Système de favoris</li>
    <li>Système multilingue (7 langues)</li>
    <li>Pages institutionnelles (À propos, Aide, CGU)</li>
  </ul>

  <h3>3.1.2 Espace Client</h3>
  <ul>
    <li>Inscription et connexion sécurisées</li>
    <li>Profil utilisateur personnalisable</li>
    <li>Gestion des favoris</li>
    <li>Historique des réservations</li>
    <li>Notifications par email</li>
    <li>Système de notation et d'avis</li>
  </ul>

  <h3>3.1.3 Espace Commerçant</h3>
  <ul>
    <li>Inscription et création de profil commerce</li>
    <li>Gestion de la vitrine (photos, description, horaires)</li>
    <li>Gestion du catalogue produits</li>
    <li>Tableau de bord avec statistiques</li>
    <li>Gestion des avis clients</li>
    <li>Options de mise en avant (vedette, publicité)</li>
  </ul>

  <h3>3.1.4 Espace Restaurant</h3>
  <ul>
    <li>Toutes les fonctionnalités commerçant</li>
    <li>Gestion des menus et cartes</li>
    <li>Système de réservation en ligne</li>
    <li>Calendrier de disponibilités</li>
    <li>Gestion des réservations</li>
    <li>Notifications de réservation</li>
  </ul>

  <h2>3.2 Fonctionnalités Futures (Phase 2)</h2>
  <ul>
    <li>Système de paiement en ligne intégré</li>
    <li>Livraison à domicile</li>
    <li>Programme de fidélité</li>
    <li>Application mobile native (iOS/Android)</li>
    <li>Système de chat en temps réel</li>
    <li>Marketplace de produits artisanaux</li>
    <li>Événements et promotions</li>
  </ul>

  <h2>3.3 Hors Périmètre</h2>
  <ul>
    <li>Gestion logistique et livraison (Phase 1)</li>
    <li>Paiement en ligne (Phase 1)</li>
    <li>Application mobile native (Phase 1)</li>
    <li>Système de messagerie instantanée (Phase 1)</li>
  </ul>

  <!-- 4. Spécifications Fonctionnelles -->
  <h1 id="specifications">4. Spécifications Fonctionnelles Détaillées</h1>

  <h2>4.1 Module de Recherche</h2>
  
  <h3>4.1.1 Recherche Avancée</h3>
  <div class="info-box">
    <h4>Fonctionnalités Clés</h4>
    <ul>
      <li>Recherche par mots-clés avec suggestions intelligentes</li>
      <li>Filtrage par pays (France, Allemagne, UK, USA, Canada, etc.)</li>
      <li>Filtrage par ville (Paris, Londres, New York, Toronto, etc.)</li>
      <li>Filtrage par catégorie (Épicerie, Restaurant, Boucherie, etc.)</li>
      <li>Filtrage par type (Magasin, Restaurant)</li>
      <li>Filtrage par statut (Ouvert maintenant, Fermé)</li>
      <li>Filtrage par note (1-5 étoiles)</li>
      <li>Filtrage par distance</li>
      <li>Tri par pertinence, note, distance, nouveauté</li>
    </ul>
  </div>

  <h3>4.1.2 Affichage des Résultats</h3>
  <table>
    <thead>
      <tr>
        <th>Élément</th>
        <th>Description</th>
        <th>Comportement</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Vue Grille</td>
        <td>Affichage en cartes (2-3 colonnes)</td>
        <td>Vue par défaut, responsive</td>
      </tr>
      <tr>
        <td>Vue Liste</td>
        <td>Affichage en liste détaillée</td>
        <td>Plus d'informations visibles</td>
      </tr>
      <tr>
        <td>Vue Carte</td>
        <td>Affichage sur carte interactive</td>
        <td>Géolocalisation des commerces</td>
      </tr>
      <tr>
        <td>Pagination</td>
        <td>12 résultats par page</td>
        <td>Navigation entre les pages</td>
      </tr>
      <tr>
        <td>Compteurs</td>
        <td>Nombre de résultats par filtre</td>
        <td>Aide à la décision</td>
      </tr>
    </tbody>
  </table>

  <h2>4.2 Module Profil Client</h2>
  
  <h3>4.2.1 Informations Personnelles</h3>
  <ul>
    <li><strong>Nom et Prénom :</strong> Champs obligatoires, validation</li>
    <li><strong>Email :</strong> Unique, validation format email</li>
    <li><strong>Téléphone :</strong> Format international, validation</li>
    <li><strong>Adresse :</strong> Complète avec code postal et ville</li>
    <li><strong>Photo de profil :</strong> Upload d'image (max 5MB)</li>
    <li><strong>Langue préférée :</strong> Sélection parmi 7 langues</li>
  </ul>

  <h3>4.2.2 Gestion des Favoris</h3>
  <ul>
    <li>Ajout/retrait de commerces en favoris</li>
    <li>Liste des favoris avec filtres</li>
    <li>Notifications sur les favoris (nouveautés, promotions)</li>
    <li>Export de la liste de favoris</li>
  </ul>

  <h3>4.2.3 Historique des Réservations</h3>
  <table>
    <thead>
      <tr>
        <th>Statut</th>
        <th>Description</th>
        <th>Actions Disponibles</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>En attente</td>
        <td>Réservation en attente de confirmation</td>
        <td>Annuler</td>
      </tr>
      <tr>
        <td>Confirmée</td>
        <td>Réservation confirmée par le restaurant</td>
        <td>Modifier, Annuler, Ajouter au calendrier</td>
      </tr>
      <tr>
        <td>Terminée</td>
        <td>Réservation passée</td>
        <td>Laisser un avis, Réserver à nouveau</td>
      </tr>
      <tr>
        <td>Annulée</td>
        <td>Réservation annulée</td>
        <td>Réserver à nouveau</td>
      </tr>
    </tbody>
  </table>

  <h2>4.3 Module Profil Commerçant</h2>
  
  <h3>4.3.1 Informations du Commerce</h3>
  <ul>
    <li><strong>Nom du commerce :</strong> Obligatoire, unique</li>
    <li><strong>Description :</strong> Texte riche, multilingue</li>
    <li><strong>Catégorie :</strong> Sélection multiple</li>
    <li><strong>Adresse complète :</strong> Avec géolocalisation</li>
    <li><strong>Horaires d'ouverture :</strong> Par jour de la semaine</li>
    <li><strong>Téléphone et email :</strong> Contact public</li>
    <li><strong>Site web et réseaux sociaux :</strong> Liens optionnels</li>
    <li><strong>Photos :</strong> Galerie (max 20 photos, 5MB chacune)</li>
  </ul>

  <h3>4.3.2 Gestion du Catalogue</h3>
  <div class="feature-grid">
    <div class="feature-card">
      <h4>Ajout de Produits</h4>
      <ul>
        <li>Nom et description</li>
        <li>Prix et devise</li>
        <li>Photos (max 5)</li>
        <li>Catégorie</li>
        <li>Stock disponible</li>
      </ul>
    </div>
    <div class="feature-card">
      <h4>Organisation</h4>
      <ul>
        <li>Catégories personnalisées</li>
        <li>Tri et filtrage</li>
        <li>Recherche interne</li>
        <li>Import/Export CSV</li>
      </ul>
    </div>
    <div class="feature-card">
      <h4>Mise en Avant</h4>
      <ul>
        <li>Produits vedettes</li>
        <li>Promotions</li>
        <li>Nouveautés</li>
        <li>Rupture de stock</li>
      </ul>
    </div>
  </div>

  <h3>4.3.3 Tableau de Bord</h3>
  <ul>
    <li><strong>Statistiques de visites :</strong> Vues de profil, clics, favoris</li>
    <li><strong>Statistiques de produits :</strong> Produits les plus vus</li>
    <li><strong>Avis clients :</strong> Note moyenne, nombre d'avis, derniers avis</li>
    <li><strong>Graphiques :</strong> Évolution des visites, répartition géographique</li>
  </ul>

  <h2>4.4 Module Profil Restaurant</h2>
  
  <h3>4.4.1 Gestion des Menus</h3>
  <ul>
    <li>Création de menus (Entrées, Plats, Desserts, Boissons)</li>
    <li>Description détaillée des plats</li>
    <li>Prix et options (végétarien, épicé, etc.)</li>
    <li>Photos des plats</li>
    <li>Menus du jour et spécialités</li>
    <li>Traduction automatique des menus</li>
  </ul>

  <h3>4.4.2 Système de Réservation</h3>
  <div class="info-box">
    <h4>Fonctionnement</h4>
    <ol>
      <li>Le client sélectionne date, heure et nombre de personnes</li>
      <li>Le système vérifie la disponibilité en temps réel</li>
      <li>Le client confirme la réservation</li>
      <li>Le restaurant reçoit une notification</li>
      <li>Le restaurant confirme ou refuse la réservation</li>
      <li>Le client reçoit une confirmation par email</li>
      <li>Rappel automatique 24h avant</li>
    </ol>
  </div>

  <h3>4.4.3 Calendrier de Disponibilités</h3>
  <ul>
    <li>Configuration des créneaux horaires</li>
    <li>Nombre de couverts par créneau</li>
    <li>Jours de fermeture</li>
    <li>Événements spéciaux</li>
    <li>Blocage de créneaux</li>
  </ul>

  <h2>4.5 Module Multilingue</h2>
  
  <h3>4.5.1 Langues Supportées</h3>
  <table>
    <thead>
      <tr>
        <th>Langue</th>
        <th>Code</th>
        <th>Pays Cibles</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Français</td>
        <td>FR</td>
        <td>France, Belgique, Suisse, Canada</td>
        <td>✅ Complet</td>
      </tr>
      <tr>
        <td>Anglais</td>
        <td>EN</td>
        <td>UK, USA, Canada</td>
        <td>✅ Complet</td>
      </tr>
      <tr>
        <td>Espagnol</td>
        <td>ES</td>
        <td>Espagne, USA</td>
        <td>✅ Complet</td>
      </tr>
      <tr>
        <td>Allemand</td>
        <td>DE</td>
        <td>Allemagne, Autriche, Suisse</td>
        <td>🔄 En cours</td>
      </tr>
      <tr>
        <td>Italien</td>
        <td>IT</td>
        <td>Italie</td>
        <td>🔄 En cours</td>
      </tr>
      <tr>
        <td>Portugais</td>
        <td>PT</td>
        <td>Portugal</td>
        <td>🔄 En cours</td>
      </tr>
      <tr>
        <td>Néerlandais</td>
        <td>NL</td>
        <td>Pays-Bas, Belgique</td>
        <td>🔄 En cours</td>
      </tr>
    </tbody>
  </table>

  <h3>4.5.2 Traduction des Contenus</h3>
  <ul>
    <li><strong>Interface :</strong> Traduction complète de tous les textes statiques</li>
    <li><strong>Contenus utilisateurs :</strong> Traduction automatique optionnelle des descriptions, produits et menus</li>
    <li><strong>Détection automatique :</strong> Langue du navigateur détectée au premier chargement</li>
    <li><strong>Sélecteur visible :</strong> Changement de langue à tout moment</li>
  </ul>

  <!-- 5. Spécifications Techniques -->
  <h1 id="technique">5. Spécifications Techniques</h1>

  <h2>5.1 Stack Technologique</h2>
  
  <h3>5.1.1 Frontend</h3>
  <table>
    <thead>
      <tr>
        <th>Technologie</th>
        <th>Version</th>
        <th>Utilisation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Next.js</td>
        <td>16.x</td>
        <td>Framework React avec App Router</td>
      </tr>
      <tr>
        <td>React</td>
        <td>19.x</td>
        <td>Bibliothèque UI</td>
      </tr>
      <tr>
        <td>TypeScript</td>
        <td>5.x</td>
        <td>Typage statique</td>
      </tr>
      <tr>
        <td>Tailwind CSS</td>
        <td>4.x</td>
        <td>Framework CSS utility-first</td>
      </tr>
      <tr>
        <td>shadcn/ui</td>
        <td>Latest</td>
        <td>Composants UI réutilisables</td>
      </tr>
    </tbody>
  </table>

  <h3>5.1.2 Backend & Base de Données</h3>
  <table>
    <thead>
      <tr>
        <th>Technologie</th>
        <th>Version</th>
        <th>Utilisation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Supabase</td>
        <td>Latest</td>
        <td>Backend as a Service (BaaS)</td>
      </tr>
      <tr>
        <td>PostgreSQL</td>
        <td>15.x</td>
        <td>Base de données relationnelle</td>
      </tr>
      <tr>
        <td>Supabase Auth</td>
        <td>Latest</td>
        <td>Authentification et autorisation</td>
      </tr>
      <tr>
        <td>Supabase Storage</td>
        <td>Latest</td>
        <td>Stockage de fichiers (images)</td>
      </tr>
    </tbody>
  </table>

  <h3>5.1.3 Déploiement & Infrastructure</h3>
  <table>
    <thead>
      <tr>
        <th>Service</th>
        <th>Utilisation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Vercel</td>
        <td>Hébergement et déploiement continu</td>
      </tr>
      <tr>
        <td>Vercel Analytics</td>
        <td>Analyse de performance</td>
      </tr>
      <tr>
        <td>Vercel Edge Network</td>
        <td>CDN global</td>
      </tr>
    </tbody>
  </table>

  <h2>5.2 Architecture de la Base de Données</h2>
  
  <h3>5.2.1 Schéma Principal</h3>
  <pre><code>-- Table users (Supabase Auth)
users
  - id (uuid, PK)
  - email (text, unique)
  - created_at (timestamp)

-- Table profiles
profiles
  - id (uuid, PK, FK users.id)
  - user_type (enum: 'customer', 'merchant', 'restaurant')
  - first_name (text)
  - last_name (text)
  - phone (text)
  - avatar_url (text)
  - preferred_language (text)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Table businesses
businesses
  - id (uuid, PK)
  - owner_id (uuid, FK profiles.id)
  - name (text)
  - description (text)
  - category (text[])
  - business_type (enum: 'store', 'restaurant')
  - address (text)
  - city (text)
  - country (text)
  - latitude (decimal)
  - longitude (decimal)
  - phone (text)
  - email (text)
  - website (text)
  - opening_hours (jsonb)
  - is_featured (boolean)
  - rating (decimal)
  - review_count (integer)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Table products
products
  - id (uuid, PK)
  - business_id (uuid, FK businesses.id)
  - name (text)
  - description (text)
  - price (decimal)
  - currency (text)
  - category (text)
  - stock (integer)
  - images (text[])
  - is_featured (boolean)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Table menus (pour restaurants)
menus
  - id (uuid, PK)
  - business_id (uuid, FK businesses.id)
  - name (text)
  - description (text)
  - category (enum: 'starter', 'main', 'dessert', 'drink')
  - price (decimal)
  - currency (text)
  - images (text[])
  - dietary_info (text[])
  - created_at (timestamp)
  - updated_at (timestamp)

-- Table reservations
reservations
  - id (uuid, PK)
  - customer_id (uuid, FK profiles.id)
  - business_id (uuid, FK businesses.id)
  - date (date)
  - time (time)
  - guests (integer)
  - status (enum: 'pending', 'confirmed', 'completed', 'cancelled')
  - special_requests (text)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Table favorites
favorites
  - id (uuid, PK)
  - user_id (uuid, FK profiles.id)
  - business_id (uuid, FK businesses.id)
  - created_at (timestamp)

-- Table reviews
reviews
  - id (uuid, PK)
  - user_id (uuid, FK profiles.id)
  - business_id (uuid, FK businesses.id)
  - rating (integer, 1-5)
  - comment (text)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Table business_images
business_images
  - id (uuid, PK)
  - business_id (uuid, FK businesses.id)
  - url (text)
  - is_primary (boolean)
  - order (integer)
  - created_at (timestamp)</code></pre>

  <h3>5.2.2 Politiques de Sécurité (RLS)</h3>
  <div class="warning-box">
    <h4>⚠️ Row Level Security (RLS)</h4>
    <p>Toutes les tables utilisent RLS pour garantir que les utilisateurs ne peuvent accéder qu'à leurs propres données ou aux données publiques autorisées.</p>
  </div>

  <ul>
    <li><strong>profiles :</strong> Les utilisateurs peuvent lire et modifier uniquement leur propre profil</li>
    <li><strong>businesses :</strong> Lecture publique, modification uniquement par le propriétaire</li>
    <li><strong>products/menus :</strong> Lecture publique, modification uniquement par le propriétaire du commerce</li>
    <li><strong>reservations :</strong> Lecture et modification uniquement par le client ou le restaurant concerné</li>
    <li><strong>favorites :</strong> Lecture et modification uniquement par l'utilisateur propriétaire</li>
    <li><strong>reviews :</strong> Lecture publique, création uniquement par utilisateurs authentifiés, modification uniquement par l'auteur</li>
  </ul>

  <h2>5.3 API et Endpoints</h2>
  
  <h3>5.3.1 API Routes Next.js</h3>
  <table>
    <thead>
      <tr>
        <th>Endpoint</th>
        <th>Méthode</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>/api/search</td>
        <td>GET</td>
        <td>Recherche de commerces avec filtres</td>
      </tr>
      <tr>
        <td>/api/businesses/[id]</td>
        <td>GET</td>
        <td>Détails d'un commerce</td>
      </tr>
      <tr>
        <td>/api/reservations</td>
        <td>POST</td>
        <td>Créer une réservation</td>
      </tr>
      <tr>
        <td>/api/reservations/[id]</td>
        <td>PUT, DELETE</td>
        <td>Modifier/Annuler une réservation</td>
      </tr>
      <tr>
        <td>/api/favorites</td>
        <td>GET, POST</td>
        <td>Gérer les favoris</td>
      </tr>
      <tr>
        <td>/api/reviews</td>
        <td>GET, POST</td>
        <td>Gérer les avis</td>
      </tr>
    </tbody>
  </table>

  <h2>5.4 Sécurité</h2>
  
  <h3>5.4.1 Authentification</h3>
  <ul>
    <li>Authentification par email/mot de passe via Supabase Auth</li>
    <li>Politique de mot de passe fort (min 8 caractères, majuscule, minuscule, chiffre, caractère spécial)</li>
    <li>Vérification d'email obligatoire</li>
    <li>Réinitialisation de mot de passe sécurisée</li>
    <li>Sessions sécurisées avec tokens JWT</li>
  </ul>

  <h3>5.4.2 Protection des Données</h3>
  <ul>
    <li>Chiffrement des données sensibles en base de données</li>
    <li>HTTPS obligatoire (TLS 1.3)</li>
    <li>Protection CSRF sur tous les formulaires</li>
    <li>Validation et sanitization de toutes les entrées utilisateur</li>
    <li>Rate limiting sur les API</li>
    <li>Protection contre les injections SQL (via Supabase)</li>
  </ul>

  <h3>5.4.3 Conformité RGPD</h3>
  <ul>
    <li>Consentement explicite pour les cookies</li>
    <li>Droit à l'oubli (suppression de compte)</li>
    <li>Export des données personnelles</li>
    <li>Politique de confidentialité claire</li>
    <li>Minimisation des données collectées</li>
  </ul>

  <!-- 6. Architecture de l'Application -->
  <h1 id="architecture">6. Architecture de l'Application</h1>

  <h2>6.1 Architecture Globale</h2>
  <pre><code>┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Next.js App (React 19)                 │   │
│  │  ┌────────────┐  ┌────────────┐  ┌───────────┐  │   │
│  │  │   Pages    │  │ Components │  │   Hooks   │  │   │
│  │  └────────────┘  └────────────┘  └───────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTPS
┌─────────────────────────────────────────────────────────┐
│              Vercel Edge Network (CDN)                   │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                  Next.js API Routes                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │  /api/search  │  /api/reservations  │  /api/...  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                    Supabase Backend                      │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐   │
│  │  PostgreSQL  │  │  Auth        │  │  Storage    │   │
│  │  Database    │  │  (JWT)       │  │  (Images)   │   │
│  └──────────────┘  └──────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────┘</code></pre>

  <h2>6.2 Structure des Dossiers</h2>
  <pre><code>afromarket/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Routes d'authentification
│   │   ├── login/
│   │   └── register/
│   ├── customer/                 # Espace client
│   │   ├── profile/
│   │   ├── reservations/
│   │   └── favorites/
│   ├── merchant/                 # Espace commerçant
│   │   ├── profile/
│   │   ├── products/
│   │   └── dashboard/
│   ├── restaurant/               # Espace restaurant
│   │   ├── profile/
│   │   ├── menus/
│   │   ├── reservations/
│   │   └── dashboard/
│   ├── search/                   # Recherche
│   │   └── results/
│   ├── business/                 # Détails commerce
│   │   └── [id]/
│   ├── about/                    # Pages institutionnelles
│   ├── help/
│   ├── api/                      # API Routes
│   │   ├── search/
│   │   ├── reservations/
│   │   └── favorites/
│   ├── layout.tsx                # Layout racine
│   ├── page.tsx                  # Page d'accueil
│   └── globals.css               # Styles globaux
├── components/                   # Composants réutilisables
│   ├── ui/                       # Composants UI (shadcn)
│   ├── marketplace/              # Composants métier
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── business-card.tsx
│   │   └── search-bar.tsx
│   └── language-selector.tsx
├── lib/                          # Utilitaires
│   ├── supabase/                 # Client Supabase
│   │   ├── client.ts
│   │   └── server.ts
│   ├── i18n-context.tsx          # Système de traduction
│   └── utils.ts
├── utils/                        # Fonctions utilitaires
│   ├── translate-content.ts
│   └── addToCalendar.ts
├── hooks/                        # Custom hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── public/                       # Fichiers statiques
│   └── images/
├── scripts/                      # Scripts SQL
│   └── init-database.sql
└── package.json</code></pre>

  <h2>6.3 Flux de Données</h2>
  
  <h3>6.3.1 Flux de Recherche</h3>
  <ol>
    <li>L'utilisateur saisit une recherche et applique des filtres</li>
    <li>Le composant SearchBar envoie une requête à l'API /api/search</li>
    <li>L'API interroge Supabase avec les filtres appropriés</li>
    <li>Les résultats sont retournés et affichés dans la grille</li>
    <li>L'utilisateur peut changer de vue (grille/liste/carte)</li>
    <li>La pagination permet de naviguer entre les pages</li>
  </ol>

  <h3>6.3.2 Flux de Réservation</h3>
  <ol>
    <li>Le client sélectionne un restaurant et clique sur "Réserver"</li>
    <li>Un formulaire s'affiche avec date, heure et nombre de personnes</li>
    <li>Le système vérifie la disponibilité en temps réel</li>
    <li>Le client confirme la réservation</li>
    <li>Une entrée est créée dans la table reservations (statut: pending)</li>
    <li>Le restaurant reçoit une notification par email</li>
    <li>Le restaurant confirme ou refuse via son dashboard</li>
    <li>Le client reçoit une confirmation par email</li>
    <li>Un rappel est envoyé 24h avant la réservation</li>
  </ol>

  <!-- 7. Interfaces et Maquettes -->
  <h1 id="interfaces">7. Interfaces et Maquettes</h1>

  <h2>7.1 Page d'Accueil</h2>
  <div class="screenshot">
    <img src="https://xurtccytrzafbfk3.public.blob.vercel-storage.com/agent-assets/fa1220f66d5cec32525316b7940b12d3f1e3d94ce242b7ac3ff40cd5b72518f9.jpeg" alt="Page d'accueil AfroMarket" />
    <div class="screenshot-caption">Figure 1 : Page d'accueil avec recherche avancée et sélecteur de localisation</div>
  </div>

  <h3>7.1.1 Éléments Clés</h3>
  <ul>
    <li><strong>Header :</strong> Logo, sélecteur de langue, compte utilisateur</li>
    <li><strong>Navigation :</strong> Accueil, Commerces, Restaurants, À propos, Aide</li>
    <li><strong>Hero Section :</strong> Badge "Plateforme N°1", sous-titre accrocheur</li>
    <li><strong>Recherche :</strong> Barre de recherche avec suggestions IA, filtres pays/catégories</li>
    <li><strong>Catégories Populaires :</strong> Grille de catégories avec images</li>
    <li><strong>Commerces les Mieux Notés :</strong> Cartes de commerces avec notes</li>
    <li><strong>Commerces Vedettes :</strong> Mise en avant des commerces premium</li>
    <li><strong>Statistiques :</strong> Compteurs animés (utilisateurs, commerces, produits)</li>
    <li><strong>CTA Inscription :</strong> Bouton pour les non-inscrits</li>
    <li><strong>Footer :</strong> Liens utiles, réseaux sociaux, newsletter</li>
  </ul>

  <h2>7.2 Page de Résultats de Recherche</h2>
  <div class="screenshot">
    <img src="https://xurtccytrzafbfk3.public.blob.vercel-storage.com/agent-assets/e868bc12cb6e55278965bb091f1982494ba0398d414f400f5b06144c47ffa5b6.jpg" alt="Page de résultats de recherche" />
    <div class="screenshot-caption">Figure 2 : Page de résultats avec filtres avancés et vues multiples</div>
  </div>

  <h3>7.2.1 Éléments Clés</h3>
  <ul>
    <li><strong>Header Sticky :</strong> Logo et compte utilisateur toujours visibles</li>
    <li><strong>Navigation Sticky :</strong> Menus principaux fixés</li>
    <li><strong>Barre de Recherche :</strong> Affiner la recherche en cours</li>
    <li><strong>Titre et Compteur :</strong> "Résultats de recherche - X résultats pour..."</li>
    <li><strong>Contrôles :</strong> Boutons de vue (grille/liste/carte) et tri</li>
    <li><strong>Sidebar Filtres :</strong> Filtres multiples avec compteurs et "Voir plus"</li>
    <li><strong>Grille de Résultats :</strong> Cartes de commerces avec bouton favori</li>
    <li><strong>Pagination :</strong> Navigation entre les pages de résultats</li>
    <li><strong>Footer :</strong> Liens et informations</li>
  </ul>

  <h2>7.3 Page À Propos</h2>
  <div class="screenshot">
    <img src="https://xurtccytrzafbfk3.public.blob.vercel-storage.com/agent-assets/0e0705238b19a436732a99b54bfe0f0a1c10b555d7e846c61f03dfb1d8f6453c.jpeg" alt="Page À propos" />
    <div class="screenshot-caption">Figure 3 : Page À propos avec présentation de la plateforme</div>
  </div>

  <h3>7.3.1 Sections</h3>
  <ul>
    <li><strong>Hero :</strong> Titre et description de la mission</li>
    <li><strong>Notre Mission :</strong> Texte et image illustrative</li>
    <li><strong>Notre Histoire :</strong> Timeline de l'évolution</li>
    <li><strong>Nos Valeurs :</strong> Cartes avec icônes</li>
    <li><strong>Équipe :</strong> Photos et descriptions des membres</li>
    <li><strong>Statistiques :</strong> Chiffres clés de la plateforme</li>
    <li><strong>CTA :</strong> Appel à l'action pour rejoindre la plateforme</li>
  </ul>

  <h2>7.4 Design Responsive</h2>
  
  <h3>7.4.1 Breakpoints</h3>
  <table>
    <thead>
      <tr>
        <th>Device</th>
        <th>Breakpoint</th>
        <th>Adaptations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mobile</td>
        <td>< 640px</td>
        <td>Menu hamburger, grille 1 colonne, filtres en modal</td>
      </tr>
      <tr>
        <td>Tablet</td>
        <td>640px - 1024px</td>
        <td>Grille 2 colonnes, navigation compacte</td>
      </tr>
      <tr>
        <td>Desktop</td>
        <td>> 1024px</td>
        <td>Grille 3 colonnes, sidebar filtres visible</td>
      </tr>
    </tbody>
  </table>

  <h3>7.4.2 Optimisations Mobile</h3>
  <ul>
    <li>Touch-friendly : Boutons et liens de taille minimale 44x44px</li>
    <li>Navigation simplifiée : Menu hamburger avec sous-menus</li>
    <li>Recherche optimisée : Champs empilés verticalement</li>
    <li>Filtres en modal : Overlay plein écran pour les filtres</li>
    <li>Images optimisées : Lazy loading et formats WebP</li>
    <li>Formulaires adaptés : Claviers appropriés (email, tel, number)</li>
  </ul>

  <!-- 8. Exigences Non Fonctionnelles -->
  <h1 id="exigences">8. Exigences Non Fonctionnelles</h1>

  <h2>8.1 Performance</h2>
  
  <h3>8.1.1 Objectifs de Performance</h3>
  <table>
    <thead>
      <tr>
        <th>Métrique</th>
        <th>Objectif</th>
        <th>Mesure</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>First Contentful Paint (FCP)</td>
        <td>< 1.5s</td>
        <td>Lighthouse</td>
      </tr>
      <tr>
        <td>Largest Contentful Paint (LCP)</td>
        <td>< 2.5s</td>
        <td>Lighthouse</td>
      </tr>
      <tr>
        <td>Time to Interactive (TTI)</td>
        <td>< 3.5s</td>
        <td>Lighthouse</td>
      </tr>
      <tr>
        <td>Cumulative Layout Shift (CLS)</td>
        <td>< 0.1</td>
        <td>Lighthouse</td>
      </tr>
      <tr>
        <td>Score Lighthouse</td>
        <td>> 90/100</td>
        <td>Lighthouse</td>
      </tr>
    </tbody>
  </table>

  <h3>8.1.2 Optimisations</h3>
  <ul>
    <li><strong>Images :</strong> Lazy loading, formats modernes (WebP, AVIF), responsive images</li>
    <li><strong>Code :</strong> Code splitting, tree shaking, minification</li>
    <li><strong>Cache :</strong> Cache navigateur, CDN, cache API</li>
    <li><strong>Fonts :</strong> Préchargement, font-display: swap</li>
    <li><strong>JavaScript :</strong> Defer/async, bundle optimization</li>
  </ul>

  <h2>8.2 Accessibilité (WCAG 2.1 AA)</h2>
  
  <h3>8.2.1 Exigences</h3>
  <ul>
    <li><strong>Contraste :</strong> Ratio minimum 4.5:1 pour le texte normal, 3:1 pour le texte large</li>
    <li><strong>Navigation clavier :</strong> Tous les éléments interactifs accessibles au clavier</li>
    <li><strong>ARIA :</strong> Attributs ARIA appropriés pour les composants complexes</li>
    <li><strong>Alt text :</strong> Textes alternatifs pour toutes les images informatives</li>
    <li><strong>Focus visible :</strong> Indicateurs de focus clairs et visibles</li>
    <li><strong>Formulaires :</strong> Labels associés, messages d'erreur clairs</li>
    <li><strong>Lecteurs d'écran :</strong> Contenu structuré et sémantique</li>
  </ul>

  <h3>8.2.2 Tests</h3>
  <ul>
    <li>Tests automatisés avec axe-core</li>
    <li>Tests manuels avec lecteurs d'écran (NVDA, JAWS, VoiceOver)</li>
    <li>Tests de navigation au clavier</li>
    <li>Validation WCAG avec WAVE</li>
  </ul>

  <h2>8.3 SEO</h2>
  
  <h3>8.3.1 Optimisations On-Page</h3>
  <ul>
    <li><strong>Meta tags :</strong> Title, description, Open Graph, Twitter Cards</li>
    <li><strong>Structured data :</strong> Schema.org (LocalBusiness, Restaurant, Product)</li>
    <li><strong>URLs :</strong> URLs propres et descriptives</li>
    <li><strong>Sitemap :</strong> Sitemap XML généré automatiquement</li>
    <li><strong>Robots.txt :</strong> Configuration appropriée</li>
    <li><strong>Canonical URLs :</strong> Éviter le contenu dupliqué</li>
  </ul>

  <h3>8.3.2 Performance SEO</h3>
  <ul>
    <li>Server-Side Rendering (SSR) pour les pages publiques</li>
    <li>Static Site Generation (SSG) pour les pages statiques</li>
    <li>Temps de chargement optimisé</li>
    <li>Mobile-first indexing</li>
  </ul>

  <h2>8.4 Disponibilité et Fiabilité</h2>
  
  <h3>8.4.1 Objectifs</h3>
  <table>
    <thead>
      <tr>
        <th>Métrique</th>
        <th>Objectif</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Disponibilité (Uptime)</td>
        <td>99.9% (8.76h de downtime/an max)</td>
      </tr>
      <tr>
        <td>MTTR (Mean Time To Repair)</td>
        <td>< 1 heure</td>
      </tr>
      <tr>
        <td>RPO (Recovery Point Objective)</td>
        <td>< 1 heure</td>
      </tr>
      <tr>
        <td>RTO (Recovery Time Objective)</td>
        <td>< 4 heures</td>
      </tr>
    </tbody>
  </table>

  <h3>8.4.2 Stratégies</h3>
  <ul>
    <li><strong>Monitoring :</strong> Vercel Analytics, Sentry pour les erreurs</li>
    <li><strong>Backups :</strong> Sauvegardes quotidiennes de la base de données</li>
    <li><strong>Redondance :</strong> Déploiement multi-régions avec Vercel</li>
    <li><strong>Alertes :</strong> Notifications en cas de downtime ou d'erreurs</li>
  </ul>

  <h2>8.5 Scalabilité</h2>
  
  <h3>8.5.1 Capacité</h3>
  <ul>
    <li><strong>Utilisateurs simultanés :</strong> Support de 10 000+ utilisateurs simultanés</li>
    <li><strong>Commerces :</strong> Support de 50 000+ commerces</li>
    <li><strong>Produits :</strong> Support de 500 000+ produits</li>
    <li><strong>Réservations :</strong> Support de 100 000+ réservations/mois</li>
  </ul>

  <h3>8.5.2 Stratégies de Scalabilité</h3>
  <ul>
    <li>Architecture serverless avec Next.js et Vercel</li>
    <li>Base de données PostgreSQL avec connection pooling</li>
    <li>CDN global pour les assets statiques</li>
    <li>Cache multi-niveaux (navigateur, CDN, API)</li>
    <li>Optimisation des requêtes SQL avec indexes</li>
  </ul>

  <!-- 9. Planning et Livrables -->
  <h1 id="planning">9. Planning et Livrables</h1>

  <h2>9.1 Phases du Projet</h2>
  
  <h3>Phase 1 : MVP (3 mois)</h3>
  <table>
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
        <td>Repo Git, maquettes validées</td>
      </tr>
      <tr>
        <td>3-4</td>
        <td>Authentification, profils utilisateurs</td>
        <td>Système d'auth fonctionnel</td>
      </tr>
      <tr>
        <td>5-6</td>
        <td>Page d'accueil, recherche, filtres</td>
        <td>Recherche fonctionnelle</td>
      </tr>
      <tr>
        <td>7-8</td>
        <td>Profils commerces, gestion produits</td>
        <td>Espace commerçant fonctionnel</td>
      </tr>
      <tr>
        <td>9-10</td>
        <td>Système de réservation restaurants</td>
        <td>Réservations fonctionnelles</td>
      </tr>
      <tr>
        <td>11</td>
        <td>Tests, corrections bugs</td>
        <td>Application stable</td>
      </tr>
      <tr>
        <td>12</td>
        <td>Déploiement, documentation</td>
        <td>MVP en production</td>
      </tr>
    </tbody>
  </table>

  <h3>Phase 2 : Améliorations (2 mois)</h3>
  <ul>
    <li><strong>Mois 4 :</strong> Système de paiement, livraison, notifications push</li>
    <li><strong>Mois 5 :</strong> Programme de fidélité, événements, optimisations</li>
  </ul>

  <h3>Phase 3 : Application Mobile (3 mois)</h3>
  <ul>
    <li><strong>Mois 6-7 :</strong> Développement iOS et Android</li>
    <li><strong>Mois 8 :</strong> Tests, publication sur les stores</li>
  </ul>

  <h2>9.2 Jalons Clés</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <h4>🎯 Jalon 1 (Mois 1)</h4>
      <p>Architecture validée, design system prêt, authentification fonctionnelle</p>
    </div>
    <div class="feature-card">
      <h4>🎯 Jalon 2 (Mois 2)</h4>
      <p>Recherche et filtres opérationnels, profils commerces créés</p>
    </div>
    <div class="feature-card">
      <h4>🎯 Jalon 3 (Mois 3)</h4>
      <p>MVP complet déployé en production, premiers utilisateurs</p>
    </div>
    <div class="feature-card">
      <h4>🎯 Jalon 4 (Mois 5)</h4>
      <p>Paiement et livraison intégrés, 1000+ utilisateurs actifs</p>
    </div>
  </div>

  <h2>9.3 Livrables</h2>
  
  <h3>9.3.1 Livrables Techniques</h3>
  <ul>
    <li>Code source sur GitHub (repository privé)</li>
    <li>Application web déployée sur Vercel</li>
    <li>Base de données Supabase configurée</li>
    <li>Documentation technique (README, API docs)</li>
    <li>Tests automatisés (unit, integration, e2e)</li>
  </ul>

  <h3>9.3.2 Livrables Fonctionnels</h3>
  <ul>
    <li>Cahier des charges (ce document)</li>
    <li>Maquettes et design system</li>
    <li>Guide utilisateur (clients, commerçants, restaurants)</li>
    <li>Guide d'administration</li>
    <li>Politique de confidentialité et CGU</li>
  </ul>

  <!-- 10. Budget Estimatif -->
  <h1 id="budget">10. Budget Estimatif</h1>

  <h2>10.1 Coûts de Développement</h2>
  <table>
    <thead>
      <tr>
        <th>Poste</th>
        <th>Durée</th>
        <th>Coût Unitaire</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Développeur Full-Stack Senior</td>
        <td>3 mois</td>
        <td>8 000€/mois</td>
        <td>24 000€</td>
      </tr>
      <tr>
        <td>Designer UI/UX</td>
        <td>1 mois</td>
        <td>5 000€/mois</td>
        <td>5 000€</td>
      </tr>
      <tr>
        <td>Chef de Projet</td>
        <td>3 mois</td>
        <td>6 000€/mois</td>
        <td>18 000€</td>
      </tr>
      <tr>
        <td>QA Tester</td>
        <td>1 mois</td>
        <td>4 000€/mois</td>
        <td>4 000€</td>
      </tr>
      <tr>
        <td colspan="3"><strong>Sous-total Développement</strong></td>
        <td><strong>51 000€</strong></td>
      </tr>
    </tbody>
  </table>

  <h2>10.2 Coûts d'Infrastructure (Annuel)</h2>
  <table>
    <thead>
      <tr>
        <th>Service</th>
        <th>Plan</th>
        <th>Coût Mensuel</th>
        <th>Coût Annuel</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Vercel (Hébergement)</td>
        <td>Pro</td>
        <td>20€</td>
        <td>240€</td>
      </tr>
      <tr>
        <td>Supabase (Database + Auth)</td>
        <td>Pro</td>
        <td>25€</td>
        <td>300€</td>
      </tr>
      <tr>
        <td>Domaine + SSL</td>
        <td>-</td>
        <td>2€</td>
        <td>24€</td>
      </tr>
      <tr>
        <td>Monitoring (Sentry)</td>
        <td>Team</td>
        <td>26€</td>
        <td>312€</td>
      </tr>
      <tr>
        <td>Email (SendGrid)</td>
        <td>Essentials</td>
        <td>15€</td>
        <td>180€</td>
      </tr>
      <tr>
        <td colspan="3"><strong>Sous-total Infrastructure</strong></td>
        <td><strong>1 056€</strong></td>
      </tr>
    </tbody>
  </table>

  <h2>10.3 Budget Total</h2>
  <div class="success-box">
    <h4>💰 Budget Total Estimé</h4>
    <ul>
      <li><strong>Développement MVP (3 mois) :</strong> 51 000€</li>
      <li><strong>Infrastructure (Année 1) :</strong> 1 056€</li>
      <li><strong>Contingence (10%) :</strong> 5 206€</li>
      <li><strong>TOTAL :</strong> <strong>57 262€</strong></li>
    </ul>
  </div>

  <div class="warning-box">
    <h4>⚠️ Notes sur le Budget</h4>
    <ul>
      <li>Les coûts d'infrastructure augmenteront avec le nombre d'utilisateurs</li>
      <li>Budget marketing et acquisition non inclus</li>
      <li>Coûts de maintenance et support non inclus (estimé 20% du coût de développement/an)</li>
      <li>Phase 2 et 3 nécessiteront un budget additionnel</li>
    </ul>
  </div>

  <!-- 11. Annexes -->
  <h1 id="annexes">11. Annexes</h1>

  <h2>11.1 Glossaire</h2>
  <table>
    <thead>
      <tr>
        <th>Terme</th>
        <th>Définition</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>MVP</td>
        <td>Minimum Viable Product - Version minimale fonctionnelle du produit</td>
      </tr>
      <tr>
        <td>SSR</td>
        <td>Server-Side Rendering - Rendu côté serveur</td>
      </tr>
      <tr>
        <td>RLS</td>
        <td>Row Level Security - Sécurité au niveau des lignes de base de données</td>
      </tr>
      <tr>
        <td>WCAG</td>
        <td>Web Content Accessibility Guidelines - Directives d'accessibilité</td>
      </tr>
      <tr>
        <td>RGPD</td>
        <td>Règlement Général sur la Protection des Données</td>
      </tr>
      <tr>
        <td>CDN</td>
        <td>Content Delivery Network - Réseau de distribution de contenu</td>
      </tr>
    </tbody>
  </table>

  <h2>11.2 Références</h2>
  <ul>
    <li><strong>Next.js Documentation :</strong> https://nextjs.org/docs</li>
    <li><strong>Supabase Documentation :</strong> https://supabase.com/docs</li>
    <li><strong>Tailwind CSS Documentation :</strong> https://tailwindcss.com/docs</li>
    <li><strong>WCAG 2.1 Guidelines :</strong> https://www.w3.org/WAI/WCAG21/quickref/</li>
    <li><strong>RGPD :</strong> https://www.cnil.fr/fr/reglement-europeen-protection-donnees</li>
  </ul>

  <h2>11.3 Contacts</h2>
  <div class="info-box">
    <h4>📧 Équipe Projet</h4>
    <ul>
      <li><strong>Chef de Projet :</strong> [Nom] - [email]</li>
      <li><strong>Lead Developer :</strong> [Nom] - [email]</li>
      <li><strong>Designer UI/UX :</strong> [Nom] - [email]</li>
      <li><strong>Support Technique :</strong> support@afromarket.com</li>
    </ul>
  </div>

  <h2>11.4 Historique des Versions</h2>
  <table>
    <thead>
      <tr>
        <th>Version</th>
        <th>Date</th>
        <th>Auteur</th>
        <th>Modifications</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.0</td>
        <td>${new Date().toLocaleDateString("fr-FR")}</td>
        <td>Équipe AfroMarket</td>
        <td>Version initiale du cahier des charges</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <div style="text-align: center; padding: 60px 0; border-top: 3px solid #c2410c;">
    <h2 style="color: #c2410c; margin-bottom: 20px;">Fin du Document</h2>
    <p style="color: #666;">Ce cahier des charges est un document confidentiel propriété d'AfroMarket.</p>
    <p style="color: #999; font-size: 14px; margin-top: 20px;">
      © ${new Date().getFullYear()} AfroMarket - Tous droits réservés
    </p>
  </div>

</body>
</html>`

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Cahier_des_Charges_AfroMarket.html"',
    },
  })
}
