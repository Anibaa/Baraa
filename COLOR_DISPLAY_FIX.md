# Correction de l'affichage des couleurs

## Problème identifié

Les couleurs n'étaient pas affichées correctement dans `book-details.tsx` car:

1. Les `colorOptions` n'étaient pas créées avec les bons `colorCodes` lors du toggle des couleurs prédéfinies
2. La logique de parsing des couleurs ne préservait pas correctement les `colorOptions` existantes
3. Les livres existants sans `colorOptions` n'avaient pas leurs options générées automatiquement

## Solutions appliquées

### 1. Correction de `toggleColor` dans books-management.tsx

**Avant:**
```typescript
const newColorOption = {
  value: color,
  label: color,
  isPredefined: true,
  colorCodes: [], // ❌ Vide!
  imageUrl: null
}
```

**Après:**
```typescript
const newColorOption = {
  value: color,
  label: getColorLabel(color),      // ✅ Label correct
  isPredefined: true,
  colorCodes: getColorCodes(color), // ✅ Codes hex corrects
  imageUrl: null
}
```

### 2. Amélioration du parsing dans book-details.tsx

**Avant:**
```typescript
const colorOptions = (() => {
  const allColors = new Set<string>()
  const optionsMap = new Map<string, ColorOption>()
  
  book.colors.forEach(color => allColors.add(color))
  
  if (book.colorOptions) {
    book.colorOptions.forEach(option => {
      allColors.add(option.value)
      optionsMap.set(option.value, option)
    })
  }
  
  return Array.from(allColors).map(color => {
    return optionsMap.get(color) || parseColorOptions([color])[0]
  })
})()
```

**Après:**
```typescript
const colorOptions = (() => {
  const optionsMap = new Map<string, ColorOption>()
  
  // D'abord, ajouter toutes les colorOptions existantes (avec imageUrl)
  if (book.colorOptions && book.colorOptions.length > 0) {
    book.colorOptions.forEach(option => {
      optionsMap.set(option.value, option)
    })
  }
  
  // Ensuite, pour chaque couleur, utiliser l'option existante ou en créer une
  return book.colors.map(color => {
    if (optionsMap.has(color)) {
      return optionsMap.get(color)!
    } else {
      const parsed = parseColorOptions([color])[0]
      return {
        ...parsed,
        imageUrl: null
      }
    }
  })
})()
```

### 3. Génération automatique des colorOptions dans handleEdit

**Ajout:**
```typescript
const handleEdit = (book: Book) => {
  setEditingBook(book)
  
  // Assurer que colorOptions existent pour toutes les couleurs
  const ensuredColorOptions = book.colors.map(color => {
    const existingOption = book.colorOptions?.find(opt => opt.value === color)
    if (existingOption) {
      return existingOption
    }
    // Créer une nouvelle colorOption avec les bons codes
    return {
      value: color,
      label: getColorLabel(color),
      isPredefined: true,
      colorCodes: getColorCodes(color),
      imageUrl: null
    }
  })
  
  setFormData({
    ...book,
    colorOptions: ensuredColorOptions
  })
  // ...
}
```

### 4. Import des utilitaires de couleur

**Ajout dans books-management.tsx:**
```typescript
import { getColorLabel, getColorCodes } from "@/lib/color-utils"
```

## Résultat

✅ Les couleurs prédéfinies s'affichent maintenant avec leurs codes hex corrects
✅ Les couleurs personnalisées avec combinaisons (ex: "Noir et Or") s'affichent correctement
✅ Les images liées aux couleurs sont préservées
✅ Les livres existants sont automatiquement mis à jour avec les colorOptions manquantes
✅ L'ordre des couleurs est préservé (suit book.colors)

## Test

Pour tester:

1. Créer un nouveau produit avec des couleurs prédéfinies
2. Vérifier que les cercles de couleur s'affichent correctement
3. Éditer un produit existant
4. Vérifier que les couleurs s'affichent correctement
5. Associer des images aux couleurs
6. Vérifier que les images changent lors du clic sur les couleurs
