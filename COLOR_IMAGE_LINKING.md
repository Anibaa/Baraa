# Liaison Couleurs-Images

## Fonctionnalité

Cette fonctionnalité permet de lier chaque couleur d'un produit à une image spécifique de la galerie. Lorsqu'un utilisateur clique sur une couleur, l'image principale du produit change pour afficher l'image associée à cette couleur.

## Comment ça marche

### 1. Dans l'administration (books-management)

Le flux de travail est optimisé pour une utilisation intuitive:

1. **Ajoutez vos images** dans la section "Galerie d'Images"
   - Téléchargez des fichiers ou ajoutez des URLs
   - La première image devient l'image principale par défaut

2. **Sélectionnez vos couleurs** (prédéfinies ou personnalisées)
   - Choisissez parmi les couleurs prédéfinies
   - Ou ajoutez des couleurs personnalisées avec codes hex

3. **Associez les couleurs aux images** (section apparaît automatiquement)
   - Une nouvelle section "Association Couleurs - Images" apparaît après la galerie
   - Pour chaque couleur, sélectionnez une image depuis le menu déroulant
   - Prévisualisation en temps réel de l'image associée
   - Option "Aucune image (défaut)" pour utiliser l'image principale

### 2. Sur la page produit (book-details)

Expérience utilisateur fluide:

1. L'image par défaut (première image de la galerie) s'affiche initialement
2. Quand l'utilisateur clique sur une couleur:
   - ✅ Si la couleur a une image liée → l'image principale change instantanément
   - ⚪ Si la couleur n'a pas d'image liée → l'image par défaut s'affiche
3. La galerie se réorganise pour mettre l'image sélectionnée en premier

## Interface d'administration

### Section "Association Couleurs - Images"

Cette section apparaît uniquement si:
- ✅ Au moins une couleur est sélectionnée
- ✅ Au moins une image est dans la galerie

Pour chaque couleur, vous verrez:
- 🎨 Aperçu de la couleur (avec codes hex si disponibles)
- 📋 Menu déroulant pour sélectionner une image
- 🖼️ Prévisualisation de l'image associée (ou "Défaut" si aucune)

### Avertissements

Si vous sélectionnez des couleurs mais n'avez pas encore ajouté d'images:
- ⚠️ Un message vous rappelle d'ajouter des images à la galerie

## Structure des données

### ColorOption (lib/types.ts)

```typescript
export interface ColorOption {
  value: string              // Valeur de la couleur (ex: "noir", "Noir et Or")
  label: string              // Label d'affichage
  isPredefined: boolean      // Si c'est une couleur prédéfinie
  colorCodes?: string[]      // Codes hex pour l'affichage (supporte les combinaisons)
  imageUrl?: string | null   // URL de l'image liée (depuis la galerie uniquement)
}
```

### Book Model (lib/models/book.model.ts)

Le schéma MongoDB inclut `imageUrl` dans `ColorOptionSchema`:

```javascript
const ColorOptionSchema = new Schema({
    value: { type: String, required: true },
    label: { type: String, required: true },
    isPredefined: { type: Boolean, default: false },
    colorCodes: { type: [String], default: [] },
    imageUrl: { type: String, default: null }
}, { _id: false });
```

## Exemples d'utilisation

### Cas 1: Abaya avec différentes couleurs

**Configuration admin:**
- Galerie: 3 images (noire, beige, bordeaux)
- Couleurs: Noir → Image 1, Beige → Image 2, Bordeaux → Image 3

**Résultat client:**
- Clique sur "Noir" → Affiche l'abaya noire
- Clique sur "Beige" → Affiche l'abaya beige
- Clique sur "Bordeaux" → Affiche l'abaya bordeaux

### Cas 2: Hijab avec couleurs partiellement liées

**Configuration admin:**
- Galerie: 2 images (rose, bleu)
- Couleurs: Rose → Image 1, Bleu → Image 2, Vert → Aucune image

**Résultat client:**
- Clique sur "Rose" → Affiche l'image rose
- Clique sur "Bleu" → Affiche l'image bleue
- Clique sur "Vert" → Affiche l'image principale (défaut)

### Cas 3: Ensemble avec combinaisons de couleurs

**Configuration admin:**
- Galerie: 4 images
- Couleurs: "Noir et Or" → Image 1, "Blanc et Argent" → Image 2

**Résultat client:**
- Clique sur "Noir et Or" → Affiche l'ensemble noir et or
- Clique sur "Blanc et Argent" → Affiche l'ensemble blanc et argent

## Avantages

✅ **Expérience utilisateur améliorée** - Voir le produit dans la couleur choisie
✅ **Flexibilité totale** - Certaines couleurs peuvent avoir des images, d'autres non
✅ **Simplicité** - Sélection depuis la galerie existante, pas d'URLs externes
✅ **Prévisualisation** - Voir l'image liée directement dans l'admin
✅ **Organisation** - Section apparaît au bon moment dans le flux de travail
✅ **Feedback visuel** - Indicateurs clairs (✓ Liée / Défaut)

## Workflow recommandé

1. Créer/éditer un article
2. Ajouter toutes les images nécessaires à la galerie
3. Sélectionner les couleurs disponibles
4. Associer chaque couleur à son image correspondante
5. Sauvegarder

## Notes techniques

- Les images sont uniquement sélectionnables depuis la galerie (pas d'URLs externes)
- Si aucune image n'est liée à une couleur, l'image par défaut (`book.image`) s'affiche
- Les images sont réorganisées dynamiquement dans la galerie pour mettre l'image sélectionnée en premier
- La fonctionnalité est rétrocompatible - les produits existants sans images liées fonctionnent normalement
- La section d'association n'apparaît que si des couleurs ET des images existent
