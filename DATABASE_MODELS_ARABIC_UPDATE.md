# ✅ Modèles de Base de Données - Mise à Jour Arabe

## Date: 2026-02-24

---

## 🎯 Problème Résolu

### Erreur Initiale:
```
ValidatorError: `حجاب` is not a valid enum value for path `category`.
enumValues: [ 'abaya', 'hijab', 'jilbab', 'kaftan', 'ensemble', 'accessories' ]

ValidatorError: `متوفر` is not a valid enum value for path `status`.
enumValues: [ 'En stock', 'Hors stock', 'Préparation', 'Livraison', 'Livré' ]
```

### Cause:
Les modèles Mongoose avaient encore les anciennes valeurs enum en français/anglais, alors que le formulaire admin envoyait des valeurs en arabe.

---

## 🔧 Corrections Effectuées

### 1. Modèle Book (`lib/models/book.model.ts`) ✅

#### Catégories:
```typescript
// Avant:
category: { type: String, enum: ["abaya", "hijab", "jilbab", "kaftan", "ensemble", "accessories"], required: true }

// Après:
category: { type: String, enum: ["عباية", "حجاب", "جلباب", "قفطان", "طقم", "إكسسوارات"], required: true }
```

#### Statuts:
```typescript
// Avant:
status: { type: String, enum: ["En stock", "Hors stock", "Préparation", "Livraison", "Livré"], default: "En stock" }

// Après:
status: { type: String, enum: ["متوفر", "غير متوفر", "قيد التحضير", "قيد التوصيل", "تم التوصيل"], default: "متوفر" }
```

#### Tailles:
```typescript
// Avant:
sizes: { type: [String], enum: ["S", "M", "L", "XL", "XXL", "Unique"], required: true }

// Après:
sizes: { type: [String], enum: ["S", "M", "L", "XL", "XXL", "مقاس واحد"], required: true }
```

#### Variants:
```typescript
// Avant:
size: { type: String, enum: ["S", "M", "L", "XL", "XXL", "Unique"], required: true }

// Après:
size: { type: String, enum: ["S", "M", "L", "XL", "XXL", "مقاس واحد"], required: true }
```

---

### 2. Modèle Order (`lib/models/order.model.ts`) ✅

#### Statuts de Commande:
```typescript
// Avant:
status: { type: String, enum: ['Préparation', 'Confirmé', 'Livraison', 'Livré'], default: 'Préparation' }

// Après:
status: { type: String, enum: ['قيد التحضير', 'مؤكد', 'قيد التوصيل', 'تم التوصيل'], default: 'قيد التحضير' }
```

#### Tailles dans OrderItem:
```typescript
// Avant:
size: { type: String, enum: ["S", "M", "L", "XL", "XXL", "Unique"], required: true }

// Après:
size: { type: String, enum: ["S", "M", "L", "XL", "XXL", "مقاس واحد"], required: true }
```

---

### 3. Composants Admin Mis à Jour ✅

#### `components/admin/books-management.tsx`:
```typescript
// Avant:
const statusColors: Record<string, string> = {
  "En stock": "text-green-600",
  "Hors stock": "text-red-600",
  Préparation: "text-yellow-600",
  Livraison: "text-blue-600",
  Livré: "text-gray-600",
}

// Après:
const statusColors: Record<string, string> = {
  "متوفر": "text-green-600",
  "غير متوفر": "text-red-600",
  "قيد التحضير": "text-yellow-600",
  "قيد التوصيل": "text-blue-600",
  "تم التوصيل": "text-gray-600",
}
```

#### `components/admin/orders-management.tsx`:
```typescript
// Avant:
const statusColors: Record<string, string> = {
  Préparation: "bg-yellow-100 text-yellow-800",
  Confirmé: "bg-purple-100 text-purple-800",
  Livraison: "bg-blue-100 text-blue-800",
  Livré: "bg-green-100 text-green-800",
}

// Après:
const statusColors: Record<string, string> = {
  "قيد التحضير": "bg-yellow-100 text-yellow-800",
  "مؤكد": "bg-purple-100 text-purple-800",
  "قيد التوصيل": "bg-blue-100 text-blue-800",
  "تم التوصيل": "bg-green-100 text-green-800",
}
```

#### Options de Statut:
```typescript
// Avant:
<option value="Préparation">Préparation</option>
<option value="Confirmé">Confirmé</option>
<option value="Livraison">Livraison</option>
<option value="Livré">Livré</option>

// Après:
<option value="قيد التحضير">قيد التحضير</option>
<option value="مؤكد">مؤكد</option>
<option value="قيد التوصيل">قيد التوصيل</option>
<option value="تم التوصيل">تم التوصيل</option>
```

#### `components/admin/admin-statistics.tsx`:
```typescript
// Avant:
status: "En livraison"
count: books.filter((b) => b.status === "Livraison").length

// Après:
status: "قيد التوصيل"
count: books.filter((b) => b.status === "قيد التوصيل").length
```

---

## 📊 Valeurs Enum Complètes

### Catégories (Book.category):
- ✅ "عباية" (Abaya)
- ✅ "حجاب" (Hijab)
- ✅ "جلباب" (Jilbab)
- ✅ "قفطان" (Kaftan)
- ✅ "طقم" (Ensemble)
- ✅ "إكسسوارات" (Accessoires)

### Statuts Produit (Book.status):
- ✅ "متوفر" (En stock) - DEFAULT
- ✅ "غير متوفر" (Hors stock)
- ✅ "قيد التحضير" (Préparation)
- ✅ "قيد التوصيل" (Livraison)
- ✅ "تم التوصيل" (Livré)

### Statuts Commande (Order.status):
- ✅ "قيد التحضير" (Préparation) - DEFAULT
- ✅ "مؤكد" (Confirmé)
- ✅ "قيد التوصيل" (Livraison)
- ✅ "تم التوصيل" (Livré)

### Tailles (Book.sizes, Order.items.size):
- ✅ "S"
- ✅ "M"
- ✅ "L"
- ✅ "XL"
- ✅ "XXL"
- ✅ "مقاس واحد" (Unique)

### Couleurs (Book.colors):
- ✅ Aucune restriction enum (permet les couleurs personnalisées)
- ✅ Couleurs prédéfinies en arabe dans `lib/color-utils.ts`

---

## ✅ Vérification

### Test de Création de Produit:
1. ✅ Aller sur `/admin?tab=books`
2. ✅ Cliquer sur "إضافة منتج"
3. ✅ Remplir le formulaire avec:
   - Catégorie: "حجاب"
   - Couleurs: "أسود", "أبيض"
   - Tailles: "S", "M", "مقاس واحد"
   - Statut: "متوفر"
4. ✅ Sauvegarder → Succès!
5. ✅ Vérifier dans la base de données → Valeurs en arabe ✅

### Test de Mise à Jour de Commande:
1. ✅ Aller sur `/admin?tab=orders`
2. ✅ Modifier le statut d'une commande
3. ✅ Sélectionner "مؤكد" ou "قيد التوصيل"
4. ✅ Sauvegarder → Succès!

---

## 🎉 Résultat Final

**Tous les modèles de base de données sont maintenant alignés avec les valeurs arabes:**

1. ✅ Modèle Book mis à jour
2. ✅ Modèle Order mis à jour
3. ✅ Composants admin mis à jour
4. ✅ Validation Mongoose fonctionne avec les valeurs arabes
5. ✅ Aucune erreur de validation
6. ✅ Cohérence totale entre frontend, admin et base de données

---

## 🔄 Migration des Données Existantes

**Important**: Si vous avez des données existantes dans la base de données avec les anciennes valeurs (français/anglais), vous devrez les migrer vers les nouvelles valeurs arabes.

### Script de Migration (exemple):
```javascript
// Mettre à jour les catégories
await Book.updateMany({ category: "abaya" }, { category: "عباية" })
await Book.updateMany({ category: "hijab" }, { category: "حجاب" })
await Book.updateMany({ category: "jilbab" }, { category: "جلباب" })
await Book.updateMany({ category: "kaftan" }, { category: "قفطان" })
await Book.updateMany({ category: "ensemble" }, { category: "طقم" })
await Book.updateMany({ category: "accessories" }, { category: "إكسسوارات" })

// Mettre à jour les statuts
await Book.updateMany({ status: "En stock" }, { status: "متوفر" })
await Book.updateMany({ status: "Hors stock" }, { status: "غير متوفر" })
await Book.updateMany({ status: "Préparation" }, { status: "قيد التحضير" })
await Book.updateMany({ status: "Livraison" }, { status: "قيد التوصيل" })
await Book.updateMany({ status: "Livré" }, { status: "تم التوصيل" })

// Mettre à jour les tailles
await Book.updateMany(
  { sizes: "Unique" },
  { $set: { "sizes.$": "مقاس واحد" } }
)
```

---

**Date de Complétion: 24 Février 2026**
**Statut: ✅ COMPLET - Base de données alignée avec l'arabe**
