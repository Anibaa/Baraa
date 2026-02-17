# 🌙 Nour Elegance - Mode Islamique Féminine de Luxe

<div align="center">

![Nour Elegance](https://img.shields.io/badge/Nour-Elegance-D4AF37?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)

**Plateforme e-commerce de vêtements islamiques pour femmes**

[Démo](#) • [Documentation](#) • [Guide des Tailles](#) • [Contact](#)

</div>

---

## ✨ À Propos

**Nour Elegance** est une plateforme e-commerce moderne dédiée à la mode islamique féminine de luxe. Notre mission est d'offrir des vêtements élégants et modestes qui célèbrent l'identité musulmane tout en embrassant le style contemporain.

### 🎯 Notre Vision
Illuminer la mode modeste avec élégance, qualité et authenticité.

### 💎 Nos Valeurs
- **Modestie** - Designs respectueux des principes islamiques
- **Qualité** - Tissus premium et finitions soignées
- **Élégance** - Style sophistiqué et intemporel
- **Authenticité** - Respect de l'héritage culturel

---

## 🛍️ Collections

### 👗 Abayas
Robes traditionnelles élégantes pour toutes occasions
- Abayas quotidiennes
- Abayas de cérémonie
- Abayas brodées

### 🧕 Hijabs
Voiles de qualité premium en divers tissus
- Hijabs en soie
- Hijabs en mousseline
- Hijabs jersey

### 👘 Jilbabs
Vêtements d'extérieur confortables et modestes
- Jilbabs deux pièces
- Jilbabs une pièce
- Jilbabs à capuche

### ✨ Kaftans
Robes majestueuses pour événements spéciaux
- Kaftans brodés
- Kaftans perlés
- Kaftans en velours

### 👔 Ensembles
Sets complets coordonnés
- Ensembles de prière
- Ensembles détente
- Ensembles assortis

### 💍 Accessoires
Compléments élégants
- Broches et épingles
- Sous-hijabs
- Sacs et pochettes

---

## 🎨 Palette de Couleurs

Notre identité visuelle s'articule autour d'une palette dorée luxueuse :

| Couleur | Hex | Usage |
|---------|-----|-------|
| 🟡 Or Riche | `#D4AF37` | Accents principaux, boutons CTA |
| 🟤 Bronze Profond | `#8B6914` | Éléments secondaires, texte |
| 🌸 Or Rose | `#B76E79` | Touches féminines, accents |
| 🤍 Crème | `#F8F6F0` | Arrière-plans, cartes |
| ⚫ Brun Foncé | `#3D3020` | Texte principal |

---

## 🚀 Technologies

### Frontend
- **Next.js 16** - Framework React avec SSR
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **Radix UI** - Composants accessibles

### Backend
- **Next.js API Routes** - API RESTful
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **Vercel Blob** - Stockage d'images

### Outils
- **React Hook Form** - Gestion de formulaires
- **Zod** - Validation de schémas
- **Lucide React** - Icônes
- **Sonner** - Notifications toast

---

## 📦 Installation

### Prérequis
- Node.js 18+
- MongoDB
- npm ou pnpm

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/nour-elegance.git
cd nour-elegance
```

2. **Installer les dépendances**
```bash
npm install
# ou
pnpm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditer `.env` :
```env
MONGODB_URI=mongodb://localhost:27017/nour-elegance
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_WHATSAPP_NUMBER=+216XXXXXXXX
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

---

## 📁 Structure du Projet

```
nour-elegance/
├── app/                      # Pages Next.js App Router
│   ├── (routes)/
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── books/           # Pages produits (à renommer)
│   │   ├── cart/            # Panier
│   │   ├── checkout/        # Paiement
│   │   └── admin/           # Panel admin
│   ├── api/                 # Routes API
│   │   ├── books/           # API produits
│   │   ├── orders/          # API commandes
│   │   └── upload/          # Upload images
│   ├── layout.tsx           # Layout principal
│   └── globals.css          # Styles globaux
├── components/              # Composants React
│   ├── home/               # Composants page d'accueil
│   ├── books/              # Composants produits
│   ├── cart/               # Composants panier
│   ├── layout/             # Header, Footer, Nav
│   └── ui/                 # Composants UI réutilisables
├── lib/                    # Utilitaires et config
│   ├── models/            # Modèles MongoDB
│   ├── types.ts           # Types TypeScript
│   ├── api.ts             # Fonctions API
│   └── db.ts              # Connexion MongoDB
├── hooks/                 # Hooks React personnalisés
├── public/                # Assets statiques
└── docs/                  # Documentation
    ├── TRANSFORMATION.md  # Guide de transformation
    ├── BRAND_GUIDE.md     # Guide de marque
    └── DEVELOPER_GUIDE.md # Guide développeur
```

---

## 🎯 Fonctionnalités

### ✅ Implémentées
- [x] Catalogue de produits avec filtres
- [x] Panier d'achat persistant
- [x] Système de commande
- [x] Panel d'administration
- [x] Upload d'images
- [x] Gestion des sliders
- [x] Système de notation
- [x] Mode sombre/clair
- [x] Design responsive
- [x] Animations fluides
- [x] Support WhatsApp

### 🚧 En Développement
- [ ] Guide des tailles interactif
- [ ] Sélecteur de couleurs avec swatches
- [ ] Système de wishlist
- [ ] Avis clients avec photos
- [ ] Recommandations personnalisées
- [ ] Programme de fidélité

### 💡 Futures Fonctionnalités
- [ ] Essayage virtuel (AR)
- [ ] Quiz de style
- [ ] Abonnement mensuel
- [ ] Application mobile
- [ ] Chat en direct
- [ ] Blog mode

---

## 🎨 Personnalisation

### Couleurs
Modifier les couleurs dans `app/globals.css` :

```css
:root {
  --primary: 0.75 0.12 85;      /* Or */
  --secondary: 0.52 0.10 75;    /* Bronze */
  --accent: 0.60 0.08 15;       /* Rose Gold */
}
```

### Catégories de Produits
Modifier dans `lib/types.ts` :

```typescript
export type Category = 
  | "abaya" 
  | "hijab" 
  | "jilbab" 
  | "kaftan" 
  | "ensemble" 
  | "accessories"
```

### Tailles
Modifier dans `lib/types.ts` :

```typescript
export type Size = 
  | "S" 
  | "M" 
  | "L" 
  | "XL" 
  | "XXL" 
  | "Unique"
```

---

## 🔐 Administration

### Accès Admin
```
URL: /admin/login
Username: admin (configurable dans .env)
Password: (défini dans .env)
```

### Fonctionnalités Admin
- Gestion des produits (CRUD)
- Gestion des commandes
- Gestion des sliders
- Gestion des partenaires
- Statistiques et analytics
- Upload d'images

---

## 📱 Responsive Design

Le site est optimisé pour tous les appareils :

- 📱 **Mobile** : 320px - 767px
- 📱 **Tablette** : 768px - 1023px
- 💻 **Desktop** : 1024px+
- 🖥️ **Large Desktop** : 1440px+

---

## 🌐 Déploiement

### Vercel (Recommandé)

1. **Connecter le repository**
```bash
vercel
```

2. **Configurer les variables d'environnement**
Dans le dashboard Vercel, ajouter :
- `MONGODB_URI`
- `BLOB_READ_WRITE_TOKEN`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

3. **Déployer**
```bash
vercel --prod
```

### Autres Plateformes
- **Netlify** : Compatible avec Next.js
- **Railway** : Avec MongoDB intégré
- **DigitalOcean** : App Platform

---

## 🧪 Tests

### Lancer les tests
```bash
npm run test
```

### Linter
```bash
npm run lint
```

### Build de production
```bash
npm run build
npm run start
```

---

## 📊 Performance

### Optimisations
- ⚡ Images optimisées avec Next.js Image
- 🚀 Lazy loading des composants
- 💾 Cache des données API
- 📦 Code splitting automatique
- 🎯 Prefetching des routes
- 🗜️ Compression Gzip/Brotli

### Métriques Cibles
- **LCP** : < 2.5s
- **FID** : < 100ms
- **CLS** : < 0.1
- **Lighthouse Score** : > 90

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 📞 Contact

### Support Client
- 📧 Email : contact@nourelegance.com
- 💬 WhatsApp : +216 XX XXX XXX
- 📱 Instagram : @nourelegance
- 📘 Facebook : /nourelegance

### Support Technique
- 🐛 Issues : [GitHub Issues](https://github.com/votre-username/nour-elegance/issues)
- 📖 Documentation : [Wiki](https://github.com/votre-username/nour-elegance/wiki)

---

## 🙏 Remerciements

- Design inspiré par la beauté de la mode islamique
- Communauté Next.js pour les outils exceptionnels
- Tous nos clients pour leur confiance

---

## 📚 Documentation Complète

- [📋 Guide de Transformation](./TRANSFORMATION.md) - Détails de la transformation du projet
- [🎨 Guide de Marque](./BRAND_GUIDE.md) - Identité visuelle et valeurs
- [👨‍💻 Guide Développeur](./DEVELOPER_GUIDE.md) - Référence technique complète

---

<div align="center">

**Nour Elegance** - *Illuminer la mode modeste*

Made with 💛 in Tunisia

[⬆ Retour en haut](#-nour-elegance---mode-islamique-féminine-de-luxe)

</div>
