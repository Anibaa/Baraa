# Guide des Couleurs Personnalisées - Baraa

## 🎨 Fonctionnalités

Le système de couleurs de Baraa supporte maintenant:

### 1. Couleurs Prédéfinies (12 couleurs)
- Noir, Blanc, Beige, Or, Bronze, Rose
- Bleu, Vert, Bordeaux, Gris, Marron, Turquoise

### 2. Couleurs Personnalisées
Vous pouvez ajouter n'importe quelle couleur avec un nom personnalisé.

### 3. Combinaisons de Couleurs (2 cercles séparés)
Créez des combinaisons en spécifiant 2 codes hexadécimaux.

## 📝 Comment Ajouter une Couleur Personnalisée

### Dans le Panel Admin:

1. **Nom de la couleur** (requis)
   - Exemple: "Noir et Or", "Vert Émeraude", "Bleu Nuit"

2. **Code Hex 1** (optionnel)
   - Format: #000000
   - Premier cercle de couleur

3. **Code Hex 2** (optionnel)
   - Format: #FFD700
   - Deuxième cercle de couleur (pour les combinaisons)

4. **Aperçu en temps réel**
   - Visualisez les cercles avant d'ajouter

### Exemples:

#### Couleur Simple
```
Nom: "Vert Émeraude"
Hex 1: #50C878
Hex 2: (vide)
→ Affiche 1 cercle vert émeraude
```

#### Combinaison de Couleurs
```
Nom: "Noir et Or"
Hex 1: #000000
Hex 2: #FFD700
→ Affiche 2 cercles séparés (noir | or)
```

## 🎯 Affichage sur la Page Produit

### Couleur Simple
- 1 cercle rond de 48x48px
- Bordure si couleur blanche

### Combinaison (2 couleurs)
- 2 demi-cercles côte à côte (24x48px chacun)
- Forme de pilule arrondie
- Ring de sélection autour des 2 cercles

## 💾 Structure des Données

### Dans la Base de Données (MongoDB)

```typescript
{
  colors: ["noir", "or", "Noir et Or"],
  colorOptions: [
    {
      value: "noir",
      label: "Noir",
      isPredefined: true,
      colorCodes: ["#000000"]
    },
    {
      value: "Noir et Or",
      label: "Noir et Or",
      isPredefined: false,
      colorCodes: ["#000000", "#FFD700"]
    }
  ]
}
```

### Dans le Panier

```typescript
{
  selectedColor: "Noir et Or",
  // Le label sera affiché: "Noir et Or"
}
```

## 🔧 Fichiers Modifiés

1. **lib/types.ts** - Types ColorOption et Color étendu
2. **lib/color-utils.ts** - Utilitaires de gestion des couleurs
3. **lib/models/book.model.ts** - Schéma avec colorOptions
4. **components/admin/books-management.tsx** - Formulaire d'ajout
5. **components/articles/book-details.tsx** - Affichage 2 cercles
6. **lib/mock-data.ts** - Exemples de données

## 🎨 Codes Couleurs Recommandés

### Couleurs Classiques
- Noir: #000000
- Blanc: #FFFFFF
- Beige: #F5F5DC
- Or: #FFD700
- Bronze: #CD7F32

### Couleurs Vives
- Rose: #FFC0CB
- Bleu: #3B82F6
- Vert: #22C55E
- Bordeaux: #800020

### Couleurs Neutres
- Gris: #6B7280
- Marron: #8B4513
- Turquoise: #40E0D0

## 💡 Conseils

1. **Nommage**: Utilisez des noms descriptifs et élégants
2. **Combinaisons**: Choisissez des couleurs contrastées pour un meilleur effet visuel
3. **Codes Hex**: Toujours commencer par # suivi de 6 caractères hexadécimaux
4. **Aperçu**: Vérifiez toujours l'aperçu avant d'ajouter

## 🚀 Exemples de Combinaisons Populaires

- **Noir et Or** - Élégance classique
- **Blanc et Rose** - Douceur féminine
- **Beige et Bronze** - Chaleur naturelle
- **Bordeaux et Or** - Luxe royal
- **Bleu et Blanc** - Fraîcheur marine
- **Vert et Or** - Nature précieuse
