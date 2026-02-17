# 👨‍💻 Developer Guide - Nour Elegance

## Quick Reference for Transformed Codebase

### 🔄 Key Changes Summary

This project was transformed from a bookstore e-commerce platform to an Islamic women's clothing brand. Here's what changed:

---

## 📊 Type System Changes

### Before → After

```typescript
// OLD (Books)
type Category = "writing" | "cours" | "devoirs" | "histoire"
type Level = "college" | "lycee" | "preparatoire"
type Language = "ar" | "fr" | "en"

// NEW (Clothing)
type Category = "abaya" | "hijab" | "jilbab" | "kaftan" | "ensemble" | "accessories"
type Size = "S" | "M" | "L" | "XL" | "XXL" | "Unique"
type Color = "noir" | "blanc" | "beige" | "or" | "bronze" | "rose" | "bleu" | "vert" | "bordeaux"
```

### Product Interface

```typescript
interface Book {
  // Core fields (unchanged)
  id: string
  title: string
  author: string // Now represents brand/designer
  price: number
  promoPrice?: number
  image: string
  images: string[]
  description: string
  rating: number
  reviews: number
  status: ProductStatus
  
  // CHANGED fields
  category: Category // Now clothing categories
  size: Size // Replaced 'level'
  color: Color // Replaced 'language'
  
  // NEW fields
  fabric?: string // Material information
  care?: string // Care instructions
  
  // Existing optional fields
  specifications?: Record<string, string>
  descriptionImages?: string[]
  createdAt?: string
}
```

---

## 🎨 Color Palette (CSS Variables)

### Light Mode
```css
--primary: 0.75 0.12 85;        /* Rich Gold #D4AF37 */
--secondary: 0.52 0.10 75;      /* Deep Bronze #8B6914 */
--accent: 0.60 0.08 15;         /* Soft Rose Gold #B76E79 */
--background: oklch(0.98 0.01 85); /* Cream */
--foreground: oklch(0.25 0.02 75); /* Dark Brown */
```

### Dark Mode
```css
--primary: 0.80 0.14 85;        /* Brighter Gold */
--secondary: 0.58 0.12 75;      /* Lighter Bronze */
--accent: 0.65 0.10 15;         /* Lighter Rose Gold */
--background: oklch(0.18 0.02 75); /* Dark Brown */
--foreground: oklch(0.95 0.01 85); /* Light Cream */
```

### Usage in Components
```tsx
// Primary gold button
<button className="bg-primary text-primary-foreground">
  Acheter
</button>

// Secondary bronze button
<button className="bg-secondary text-secondary-foreground">
  Voir plus
</button>

// Accent rose gold
<div className="border-accent text-accent">
  Nouveau
</div>
```

---

## 🗂️ File Structure

### Modified Files
```
app/
├── globals.css          ✅ Updated color palette
├── layout.tsx           ✅ Updated metadata & theme
├── page.tsx             ✅ Updated terminology
└── ...

lib/
├── types.ts             ✅ Complete type overhaul
├── mock-data.ts         ✅ New product data
└── models/
    ├── book.model.ts    ✅ Updated schema
    └── partner.model.ts ✅ Updated schema

package.json             ✅ Project name updated
```

### Files Needing Updates
```
components/
├── books/               ⚠️ Rename to 'products'
├── home/                ⚠️ Update copy/content
└── layout/              ⚠️ Update navigation

app/
├── books/               ⚠️ Rename to 'products'
└── api/books/           ⚠️ Rename to 'api/products'
```

---

## 🔧 Database Schema Updates

### MongoDB Schema (book.model.ts)

```typescript
const BookSchema = new Schema({
  // Unchanged
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  promoPrice: { type: Number },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  description: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  status: { type: String, enum: [...], default: "En stock" },
  
  // CHANGED
  category: { 
    type: String, 
    enum: ["abaya", "hijab", "jilbab", "kaftan", "ensemble", "accessories"],
    required: true 
  },
  size: { 
    type: String, 
    enum: ["S", "M", "L", "XL", "XXL", "Unique"],
    required: true 
  },
  color: { 
    type: String, 
    enum: ["noir", "blanc", "beige", "or", "bronze", "rose", "bleu", "vert", "bordeaux"],
    required: true 
  },
  
  // NEW
  fabric: { type: String },
  care: { type: String },
  
  // Existing optional
  specifications: { type: Map, of: String },
  descriptionImages: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});
```

---

## 🎯 Component Updates Needed

### 1. Filter Sidebar
**File**: `components/books/filter-sidebar.tsx`

```typescript
// OLD filters
- Category: writing, cours, devoirs, histoire
- Level: college, lycee, preparatoire
- Language: ar, fr, en

// NEW filters needed
- Category: abaya, hijab, jilbab, kaftan, ensemble, accessories
- Size: S, M, L, XL, XXL, Unique
- Color: noir, blanc, beige, or, bronze, rose, bleu, vert, bordeaux
- Price range: 0-400€
- Fabric type: silk, cotton, jersey, velvet, etc.
```

### 2. Product Cards
**Files**: `components/books/book-*.tsx`

Update to show:
- Size badge instead of level
- Color swatch instead of language
- Fabric information
- "Ajouter au panier" button with gold styling

### 3. Product Details
**File**: `components/books/book-details.tsx`

Add sections for:
- Size selector with size guide link
- Color selector with swatches
- Fabric composition
- Care instructions
- Fit information

### 4. Category Section
**File**: `components/home/category-section.tsx`

Update categories:
```typescript
const categories = [
  { name: "Abayas", icon: "👗", link: "/books?category=abaya" },
  { name: "Hijabs", icon: "🧕", link: "/books?category=hijab" },
  { name: "Jilbabs", icon: "👘", link: "/books?category=jilbab" },
  { name: "Kaftans", icon: "✨", link: "/books?category=kaftan" },
  { name: "Ensembles", icon: "👔", link: "/books?category=ensemble" },
  { name: "Accessoires", icon: "💎", link: "/books?category=accessories" },
];
```

---

## 🎨 Styling Guidelines

### Gold Gradient Backgrounds
```css
/* Available utility classes */
.bg-gold-gradient {
  background: linear-gradient(135deg, #D4AF37 0%, #F4E5C3 100%);
}

.bg-gold-radial {
  background: radial-gradient(circle at top right, #D4AF37, #8B6914);
}
```

### Shadow Utilities
```css
.shadow-soft {
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
}

.shadow-soft-hover {
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
}
```

### Usage Examples
```tsx
// Hero section with gold gradient
<section className="bg-gold-gradient py-20">
  <h1 className="text-4xl font-bold text-primary-foreground">
    Nour Elegance
  </h1>
</section>

// Product card with gold shadow
<div className="bg-card rounded-lg shadow-soft hover:shadow-soft-hover transition-shadow">
  {/* Product content */}
</div>

// Primary CTA button
<button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold">
  Découvrir la collection
</button>
```

---

## 📝 Content Updates Needed

### Navigation
```typescript
// OLD
{ name: "Livres", href: "/books" }
{ name: "Catégories", href: "/books" }
{ name: "Devenir Partenaire", href: "/partner" }

// NEW
{ name: "Collections", href: "/books" }
{ name: "Nouveautés", href: "/books?sort=new" }
{ name: "Promotions", href: "/books?promo=true" }
{ name: "Guide des Tailles", href: "/size-guide" }
{ name: "Devenir Revendeur", href: "/partner" }
```

### Footer
Update to include:
- About Nour Elegance
- Modest fashion philosophy
- Fabric & care guides
- Size guide
- Shipping & returns
- Contact & WhatsApp

---

## 🔄 API Routes Updates

### Rename Routes
```bash
# OLD
/api/books
/api/books/[id]

# NEW (or keep as is, just update logic)
/api/products
/api/products/[id]

# Or keep /api/books but treat as products internally
```

### Query Parameters
```typescript
// OLD
?category=cours&level=lycee&language=fr

// NEW
?category=abaya&size=M&color=or&minPrice=0&maxPrice=200
```

---

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Product filtering by category, size, color
- [ ] Size guide modal/page
- [ ] Color swatch selection
- [ ] Add to cart with size/color
- [ ] Checkout with product details
- [ ] Admin panel product management
- [ ] Image gallery for products
- [ ] Fabric and care information display

### Visual Tests
- [ ] Gold color palette throughout
- [ ] Responsive design on mobile
- [ ] Dark mode with gold accents
- [ ] Hover effects with gold shadows
- [ ] Product cards styling
- [ ] Category icons and layout

### Content Tests
- [ ] All text updated from books to clothing
- [ ] French language consistency
- [ ] Product descriptions appropriate
- [ ] Metadata and SEO updated
- [ ] Images placeholder or actual products

---

## 🚀 Deployment Checklist

### Before Deploy
- [ ] Update all component names (books → products)
- [ ] Replace placeholder images with actual products
- [ ] Test all filters and sorting
- [ ] Verify database migrations
- [ ] Update environment variables
- [ ] Test payment integration
- [ ] Verify shipping calculations
- [ ] Test email notifications

### After Deploy
- [ ] Monitor error logs
- [ ] Check analytics setup
- [ ] Verify SEO indexing
- [ ] Test on multiple devices
- [ ] Gather user feedback
- [ ] Monitor performance

---

## 📚 Additional Resources

### Design Assets Needed
- Product photography (abayas, hijabs, etc.)
- Model photos (modest poses)
- Fabric texture images
- Brand logo (gold theme)
- Social media graphics
- Email templates

### Content Needed
- Product descriptions (8+ products)
- Size guide content
- Fabric care instructions
- About page content
- Shipping & returns policy
- Privacy policy
- Terms & conditions

---

## 🆘 Common Issues & Solutions

### Issue: Old book terminology showing
**Solution**: Search and replace in components
```bash
# Find all instances
grep -r "livre" components/
grep -r "book" components/

# Update terminology
livre → produit
book → product
author → marque/designer
```

### Issue: Filters not working with new types
**Solution**: Update filter logic in `filter-sidebar.tsx`
```typescript
// Update enum checks
if (category === "abaya") { /* ... */ }
if (size === "M") { /* ... */ }
if (color === "or") { /* ... */ }
```

### Issue: Database validation errors
**Solution**: Update Mongoose schemas and re-seed data
```bash
# Clear old data
# Re-seed with new product data
npm run seed
```

---

## 💡 Future Enhancements

### Phase 1 (Immediate)
- Complete component renaming
- Add size guide modal
- Implement color swatches
- Update all copy/content

### Phase 2 (Short-term)
- Virtual try-on feature
- Style quiz/recommendations
- Customer reviews with photos
- Wishlist functionality

### Phase 3 (Long-term)
- AR fitting room
- Custom design requests
- Subscription boxes
- Mobile app

---

**Last Updated**: February 2026
**Project**: Nour Elegance - Islamic Women's Fashion
**Status**: Core transformation complete, component updates in progress
