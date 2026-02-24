# ✅ Correction de la Réduction de Stock

## Date: 2026-02-24

---

## 🎯 Problème

Quand un administrateur change le statut d'une commande à "مؤكد" (Confirmé) dans `/admin?tab=orders`, le stock des produits n'était pas réduit correctement car:

1. Le code vérifiait `body.status === "Confirmé"` (français) au lieu de `"مؤكد"` (arabe)
2. La fonction `reduceStock` mettait à jour le statut à `'Hors stock'` (français) au lieu de `'غير متوفر'` (arabe)

---

## 🔧 Corrections Effectuées

### 1. API Orders Update (`app/api/orders/[id]/route.ts`) ✅

#### Avant:
```typescript
// Check if status is changing to "Confirmé"
const isConfirming = body.status === "Confirmé" && currentOrder.status !== "Confirmé"
```

#### Après:
```typescript
// Check if status is changing to "مؤكد" (Confirmé)
const isConfirming = body.status === "مؤكد" && currentOrder.status !== "مؤكد"
```

**Impact**: La vérification du changement de statut fonctionne maintenant avec les valeurs arabes.

---

### 2. Stock Reduction Function (`lib/api.ts`) ✅

#### Avant:
```typescript
// Update book status if all variants are out of stock
const allOutOfStock = book.variants.every((v: any) => v.stock === 0);
if (allOutOfStock) {
  book.status = 'Hors stock';
}
```

#### Après:
```typescript
// Update book status if all variants are out of stock
const allOutOfStock = book.variants.every((v: any) => v.stock === 0);
if (allOutOfStock) {
  book.status = 'غير متوفر';
}
```

**Impact**: Quand tous les variants d'un produit sont en rupture de stock, le statut est correctement mis à jour en arabe.

---

## 📊 Flux de Réduction de Stock

### Étapes:
1. ✅ Admin ouvre une commande dans `/admin?tab=orders`
2. ✅ Admin change le statut de "قيد التحضير" → "مؤكد"
3. ✅ API détecte le changement: `isConfirming = true`
4. ✅ Pour chaque article de la commande:
   - Trouve le variant (size + color)
   - Vérifie le stock disponible
   - Réduit le stock: `variant.stock -= quantity`
   - Si tous les variants sont à 0, met le statut du produit à "غير متوفر"
5. ✅ Sauvegarde les changements dans la base de données
6. ✅ Retourne le nombre d'articles dont le stock a été réduit

### Exemple de Log:
```
Stock reduced for book 699d9680a1d25616c710b1ee, size S, color أسود أحمر. New stock: 9
```

---

## 🔍 Fonction reduceStock

### Paramètres:
- `bookId`: ID du produit
- `size`: Taille (ex: "S", "M", "L", "مقاس واحد")
- `color`: Couleur (ex: "أسود", "أسود أحمر")
- `quantity`: Quantité à réduire

### Logique:
1. Trouve le produit par ID
2. Trouve le variant correspondant (size + color)
3. Vérifie si le stock est suffisant
4. Réduit le stock
5. Si tous les variants sont à 0, met le statut à "غير متوفر"
6. Sauvegarde et retourne `true` si succès

### Gestion des Erreurs:
- ❌ Produit non trouvé → `return false`
- ❌ Variant non trouvé → `return false`
- ❌ Stock insuffisant → `return false`
- ✅ Succès → `return true`

---

## ✅ Vérification

### Test de Confirmation de Commande:

#### Étape 1: Créer une commande
```json
{
  "items": [{
    "bookId": "699d9680a1d25616c710b1ee",
    "quantity": 1,
    "size": "S",
    "color": "أسود أحمر",
    "price": 50
  }],
  "totalPrice": 58,
  "customerName": "Test",
  "customerPhone": "90522465",
  "address": "Test Address"
}
```
- ✅ Commande créée avec statut: "قيد التحضير"

#### Étape 2: Vérifier le stock initial
- Produit: `699d9680a1d25616c710b1ee`
- Variant: Size "S", Color "أسود أحمر"
- Stock initial: 10 (par exemple)

#### Étape 3: Confirmer la commande
- Admin change le statut: "قيد التحضير" → "مؤكد"
- ✅ API détecte le changement
- ✅ Stock réduit: 10 → 9
- ✅ Log: "Stock reduced for book..."

#### Étape 4: Vérifier le stock final
- Stock final: 9 ✅
- Statut produit: "متوفر" (si stock > 0) ou "غير متوفر" (si stock = 0)

---

## 🎉 Résultat Final

**La réduction de stock fonctionne maintenant correctement:**

1. ✅ Détection du changement de statut à "مؤكد"
2. ✅ Réduction du stock pour chaque article
3. ✅ Mise à jour du statut produit à "غير متوفر" si nécessaire
4. ✅ Logs détaillés pour le débogage
5. ✅ Gestion des erreurs (produit/variant non trouvé, stock insuffisant)
6. ✅ Cohérence totale avec les valeurs arabes

---

## 📝 Statuts de Commande

### Workflow:
1. **قيد التحضير** (En préparation) - Commande créée, stock non réduit
2. **مؤكد** (Confirmé) - ✅ Stock réduit automatiquement
3. **قيد التوصيل** (En livraison) - En cours de livraison
4. **تم التوصيل** (Livré) - Commande livrée

### Important:
- ⚠️ Le stock est réduit **uniquement** lors du passage à "مؤكد"
- ⚠️ Si le statut est déjà "مؤكد", le stock n'est pas réduit à nouveau
- ⚠️ Si le stock est insuffisant, la réduction échoue mais la commande est quand même mise à jour

---

## 🔄 Exemple Complet

### Commande:
```json
{
  "id": "order123",
  "status": "قيد التحضير",
  "items": [
    {
      "bookId": "book456",
      "size": "M",
      "color": "أسود",
      "quantity": 2
    }
  ]
}
```

### Produit Avant:
```json
{
  "id": "book456",
  "status": "متوفر",
  "variants": [
    {
      "size": "M",
      "color": "أسود",
      "stock": 5
    }
  ]
}
```

### Action Admin:
- Change statut: "قيد التحضير" → "مؤكد"

### Produit Après:
```json
{
  "id": "book456",
  "status": "متوفر",
  "variants": [
    {
      "size": "M",
      "color": "أسود",
      "stock": 3  // 5 - 2 = 3 ✅
    }
  ]
}
```

---

**Date de Complétion: 24 Février 2026**
**Statut: ✅ COMPLET - Réduction de stock fonctionne avec statuts arabes**
