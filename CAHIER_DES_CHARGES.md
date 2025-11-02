# Cahier des Charges - AfroMarket

**Plateforme N°1 des produits africains dans le monde**

---

## Table des Matières

1. [Introduction](#1-introduction)
2. [Contexte et Objectifs](#2-contexte-et-objectifs)
3. [Périmètre Fonctionnel](#3-périmètre-fonctionnel)
4. [Spécifications Fonctionnelles](#4-spécifications-fonctionnelles)
5. [Architecture Technique](#5-architecture-technique)
6. [Interfaces et Maquettes](#6-interfaces-et-maquettes)
7. [Exigences Non Fonctionnelles](#7-exigences-non-fonctionnelles)
8. [Planning et Livrables](#8-planning-et-livrables)
9. [Annexes](#9-annexes)

---

## 1. Introduction

### 1.1 Présentation du Projet

**AfroMarket** est une plateforme marketplace innovante dédiée à la promotion et à la vente de produits africains authentiques à travers le monde. L'application connecte les commerçants africains avec une clientèle internationale en Europe, aux États-Unis et au Canada.

### 1.2 Vision

Devenir la plateforme de référence mondiale pour la découverte, l'achat et la livraison de produits africains authentiques, tout en valorisant le patrimoine culturel et gastronomique africain.

### 1.3 Objectifs Stratégiques

- Faciliter l'accès aux produits africains authentiques pour la diaspora et les amateurs de culture africaine
- Offrir une vitrine digitale aux commerçants et restaurants africains
- Créer une communauté engagée autour de la culture africaine
- Générer des revenus durables pour les commerçants partenaires

---

## 2. Contexte et Objectifs

### 2.1 Contexte du Marché

Le marché des produits africains en Europe et en Amérique du Nord connaît une croissance significative, portée par :

- Une diaspora africaine en expansion (plus de 10 millions de personnes en Europe)
- Un intérêt croissant pour les cuisines du monde et les produits authentiques
- Une demande pour des plateformes digitales facilitant l'accès à ces produits
- Un besoin de visibilité pour les commerçants africains

### 2.2 Solutions Apportées

AfroMarket répond à ces problématiques en proposant :

- Une plateforme de recherche avancée avec filtres géographiques et catégoriels
- Un système de réservation en ligne pour les restaurants
- Des profils détaillés pour chaque commerce avec photos, descriptions et avis
- Un système de favoris et de recommandations personnalisées
- Une interface multilingue (7 langues supportées)
- Un design responsive optimisé pour mobile

---

## 3. Périmètre Fonctionnel

### 3.1 Utilisateurs Cibles

| Type d'Utilisateur | Description | Besoins Principaux |
|-------------------|-------------|-------------------|
| **Clients** | Particuliers recherchant des produits africains | Recherche, réservation, favoris, avis |
| **Commerçants** | Propriétaires de magasins de produits africains | Gestion catalogue, commandes, statistiques |
| **Restaurateurs** | Propriétaires de restaurants africains | Gestion menu, réservations, avis clients |
| **Administrateurs** | Équipe de gestion de la plateforme | Modération, statistiques, support |

### 3.2 Zones Géographiques Couvertes

**Europe :** France, Allemagne, Royaume-Uni, Belgique, Pays-Bas, Italie, Espagne

**Amérique du Nord :** États-Unis (New York, Los Angeles, Chicago, Houston, Atlanta), Canada (Toronto, Montréal, Vancouver)

---

## 4. Spécifications Fonctionnelles Détaillées

### 4.1 Module de Recherche

#### 4.1.1 Recherche Avancée

**Fonctionnalités :**
- Barre de recherche intelligente avec suggestions en temps réel
- Filtres multiples : Pays, Villes, Catégories, Type d'établissement, Statut, Note, Distance, Prix
- Tri des résultats : Pertinence, Note, Distance, Prix, Nouveauté
- Modes d'affichage : Grille, Liste, Carte
- Pagination : 12 résultats par page

### 4.2 Module de Réservation

#### 4.2.1 Gestion des Réservations

**Fonctionnalités Client :**
- Consultation : Liste des réservations (en cours, historique)
- Modification : Date, heure, nombre de personnes
- Annulation : Avec raison et conditions d'annulation
- Téléchargement PDF : Confirmation de réservation avec QR code
- Ajout au calendrier : Export au format .ics
- Rappel WhatsApp : Notification programmable (1h à 48h avant)

### 4.3 Module Multilingue

**Langues Supportées :** Français 🇫🇷, Anglais 🇬🇧, Allemand 🇩🇪, Espagnol 🇪🇸, Italien 🇮🇹, Portugais 🇵🇹, Néerlandais 🇳🇱

**Fonctionnalités :**
- Détection automatique de la langue du navigateur
- Sélecteur visible avec drapeaux dans le header
- Traduction complète de l'interface
- Traduction des contenus utilisateurs (via API)
- Persistance de la préférence utilisateur

---

## 5. Architecture Technique

### 5.1 Stack Technologique

**Frontend :**
- Next.js 16 (Framework React)
- React 19.2 (Bibliothèque UI)
- TypeScript (Typage statique)
- Tailwind CSS v4 (Framework CSS)
- shadcn/ui (Composants UI)

**Backend :**
- Next.js API Routes (API REST)
- Server Actions (Mutations serveur)
- Supabase (Base de données PostgreSQL)

**Sécurité :**
- Supabase Auth (Authentification)
- Row Level Security (RLS)
- JWT Tokens
- HTTPS, CORS, Rate Limiting

---

## 6. Interfaces et Maquettes

### 6.1 Page d'Accueil

**Éléments Principaux :**
- Header : Logo, sélecteur de langue, compte utilisateur
- Navigation : Accueil, Commerces, Restaurants, À propos, Aide
- Hero Section : Badge "Plateforme N°1", slogan, barre de recherche
- Catégories Populaires : Grille de 4-8 catégories avec images
- Commerces les Mieux Notés : Carrousel de cartes
- Commerces Vedettes : Mise en avant des partenaires premium
- Statistiques : Compteurs animés
- Footer : Liens, réseaux sociaux, newsletter

### 6.2 Page de Résultats de Recherche

**Éléments Principaux :**
- Header + Navigation sticky
- Barre de recherche avec bouton de lancement
- Titre + nombre de résultats
- Contrôles : Tri + Modes d'affichage
- Sidebar Filtres avec compteurs
- Grille de résultats avec boutons favoris
- Pagination

---

## 7. Exigences Non Fonctionnelles

### 7.1 Performance

| Métrique | Objectif |
|----------|----------|
| Temps de chargement initial | < 2 secondes |
| First Contentful Paint (FCP) | < 1.5 secondes |
| Largest Contentful Paint (LCP) | < 2.5 secondes |
| Cumulative Layout Shift (CLS) | < 0.1 |

### 7.2 Accessibilité

- WCAG 2.1 Level AA : Conformité complète
- Navigation au clavier
- Support des lecteurs d'écran
- Contraste minimum 4.5:1

### 7.3 Scalabilité

- Utilisateurs simultanés : 10,000+
- Commerces : 50,000+
- Produits : 500,000+
- Réservations/jour : 10,000+

---

## 8. Planning et Livrables

### Phase 1 : MVP - 8 semaines ✅ Complété

- Architecture technique
- Page d'accueil et recherche
- Authentification et profils
- Système multilingue

### Phase 2 : Fonctionnalités Avancées - 6 semaines 🔄 En cours

- Profils commerçants et restaurants complets
- Système de paiement
- Notifications avancées

### Phase 3 : Optimisation et Lancement - 4 semaines 📅 Planifié

- Tests de charge
- Audit sécurité
- Beta testing
- Lancement production

---

## 9. Annexes

### 9.1 Budget Estimatif

| Poste | Coût Estimé |
|-------|-------------|
| Développement (18 semaines) | 150,000 - 200,000 € |
| Infrastructure (1 an) | 5,000 - 10,000 € |
| Services Tiers | 3,000 - 5,000 € |
| Marketing | 10,000 - 20,000 € |
| Divers | 5,000 - 10,000 € |
| **TOTAL** | **173,000 - 245,000 €** |

### 9.2 Contacts

- **Email Projet :** project@afromarket.com
- **Support Technique :** support@afromarket.com
- **Développement :** dev@afromarket.com

---

© 2025 AfroMarket - Tous droits réservés
