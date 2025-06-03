# Projet Montpellier

Application mobile développée avec Expo/React Native (frontend) et Node.js/Express (backend).

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou plus récente)
- **npm** ou **yarn**
- **Expo CLI** : `npm install -g @expo/cli`
- **Base de données MySQL**

Pour le développement mobile :
- **Android Studio** (pour Android)
- **Xcode** (pour iOS, macOS uniquement)

## 🏗️ Structure du projet

```
├── back/          # Backend API (Node.js/Express)
├── front/         # Frontend mobile (Expo/React Native)
└── README.md
```

## ⚙️ Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Sharko303/MontpellierEtMoi.git
cd MontpellierEtMoi
```

### 2. Installation du Backend

```bash
cd back
npm install
```

#### Configuration de la base de données

1. Copiez le fichier `.env.example` vers `.env` :
```bash
cp .env.example .env
```

2. Configurez vos variables d'environnement dans `.env` :
```env
# Configuration base de données MySQL
DATABASE_URL="mysql://username:password@localhost:3306/montpellier_db"
JWT_SECRET="your-jwt-secret-key"
```

3. Initialisez la base de données avec Prisma :
```bash
npx prisma migrate dev
npx prisma generate
```

### 3. Installation du Frontend

```bash
cd ../front
npm install
```

## 🚀 Démarrage de l'application

### Backend (API)

```bash
cd back
npm run dev
```

Le serveur backend sera accessible sur `http://localhost:3000` (ou le port configuré).

### Frontend (Application mobile)

```bash
cd front
npm start
```

Puis choisissez votre plateforme :
- **Web** : `w` (pour tester sur navigateur)
- **Android** : `a` (nécessite Android Studio/émulateur)
- **iOS** : `i` (nécessite Xcode, macOS uniquement)

Vous pouvez aussi utiliser l'application **Expo Go** sur votre téléphone pour scanner le QR code.

## 🔗 API Endpoints

Le backend expose les endpoints suivants :

### 🏠 Routes générales
- `GET /` - Page d'accueil de l'API
- `GET /api` - Informations générales de l'API

### 👤 Utilisateurs
- `POST /users` - Inscription utilisateur
- `POST /users/pro` - Inscription commerçant
- `POST /users/login` - Connexion
- `POST /users/logout` - Déconnexion
- `GET /users` - Liste des utilisateurs
- `GET /users/me` - Profil utilisateur connecté (🔒 Auth requise)
- `GET /users/auth` - Vérification d'authentification (🔒 Auth requise)

### 🏪 Commerçants
- `GET /commercants` - Liste des commerçants de Montpellier
- `POST /commercants/qr` - Création de code promo via QR (🔒 Auth requise)
- `POST /commercants/payment` - Traitement des paiements (🔒 Auth requise)
- `GET /commercants/remainingPromoCodes/:userId` - Codes promo restants
- `GET /commercants/contract` - Contrat commerçant

### 🎟️ Codes Promo
- `GET /code-promo/:id` - Détails d'un code promo
- `GET /code-promo/` - Codes promo par utilisateur
- `GET /code-promo-pro/` - Codes promo par commerçant

### 🛍️ Boutique & Favoris
- `GET /shop` - Catalogue boutique
- `GET /shop/search` - Recherche dans la boutique
- `GET /favorites/:id` - Favoris d'un utilisateur
- `POST /favorites` - Ajouter aux favoris

### 🎮 Jeux
- `GET /games` - Liste des jeux disponibles
- `GET /game/:id` - Détails d'un jeu
- `POST /game` - Créer un jeu
- `POST /game/play` - Jouer à un jeu

### 📧 Abonnements
- `GET /subscription` - Liste des abonnements disponibles

**🔒 Auth requise** : Ces endpoints nécessitent un token Bearer dans l'en-tête Authorization

## 📱 Commandes utiles

### Backend
```bash
# Développement avec rechargement automatique
npm run dev

# Réinitialiser la base de données
npx prisma migrate reset

# Visualiser la base de données
npx prisma studio
```

### Frontend
```bash
# Démarrer en mode développement
npm start

# Build pour Android
npm run android

# Build pour iOS
npm run ios

# Version web
npm run web

# Tests
npm test
```

## 🛠️ Technologies utilisées

### Backend
- **Node.js** avec **TypeScript**
- **Express.js** - Framework web
- **Prisma** - ORM pour base de données
- **Passport.js** - Authentification
- **JWT** - Gestion des tokens
- **bcrypt** - Hashage des mots de passe
- **QR Code** - Génération de codes QR

### Frontend
- **Expo** - Plateforme de développement React Native
- **React Native** - Framework mobile
- **TypeScript** - Typage statique
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation des schémas
- **Expo Camera** - Fonctionnalités caméra
- **Firebase** - Services cloud (auth, messaging, crashlytics) *à venir

## 🔧 Configuration Firebase (Frontend) *à venir

1. Créez un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Ajoutez votre application Android/iOS
3. Téléchargez les fichiers de configuration :
   - `google-services.json` pour Android
   - `GoogleService-Info.plist` pour iOS
4. Placez ces fichiers dans les dossiers appropriés de votre projet Expo

## 📝 Variables d'environnement

### Backend (.env)
```env
# Base de données MySQL
DATABASE_URL="mysql://username:password@localhost:3306/montpellier_db"

# JWT
JWT_SECRET="your-secret-key"
```

### Frontend
Les variables d'environnement Expo peuvent être configurées dans `app.config.js` ou via les variables d'environnement système (non utilisé pour l'instant)

## 🐛 Résolution de problèmes

### Erreurs courantes

**Erreur Prisma :** Si vous avez des erreurs liées à Prisma, essayez :
```bash
npx prisma generate
npx prisma db push
```

**Erreur Expo :** Si l'application ne se lance pas :
```bash
npx expo install --fix
```

**Erreur de dépendances :** Supprimez `node_modules` et réinstallez :
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

Pour toute question ou problème, n'hésitez pas à créer une issue sur le repository.

## 📄 Licence

Ce projet est sous licence ISC.