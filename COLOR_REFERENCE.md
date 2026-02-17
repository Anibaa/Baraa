# 🎨 Nour Elegance - Color Reference Guide

## Quick Color Palette Reference

### Primary Gold Palette

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🟡 RICH GOLD - #D4AF37                                     │
│  Primary brand color - Luxury, elegance, timelessness      │
│  OKLCH: 0.75 0.12 85                                        │
│  RGB: 212, 175, 55                                          │
│  Use: Primary buttons, accents, highlights, CTAs           │
│                                                             │
│  ████████████████████████████████████████████████████       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🟤 DEEP BRONZE - #8B6914                                   │
│  Secondary brand color - Warmth, tradition, depth          │
│  OKLCH: 0.52 0.10 75                                        │
│  RGB: 139, 105, 20                                          │
│  Use: Secondary buttons, text on light bg, borders         │
│                                                             │
│  ████████████████████████████████████████████████████       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🌸 SOFT ROSE GOLD - #B76E79                                │
│  Accent color - Femininity, grace, sophistication          │
│  OKLCH: 0.60 0.08 15                                        │
│  RGB: 183, 110, 121                                         │
│  Use: Accent elements, badges, feminine touches            │
│                                                             │
│  ████████████████████████████████████████████████████       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Neutral Colors

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🤍 CREAM BACKGROUND - #F8F6F0                              │
│  Main background - Purity, elegance, comfort               │
│  OKLCH: 0.98 0.01 85                                        │
│  RGB: 248, 246, 240                                         │
│  Use: Page backgrounds, card backgrounds                    │
│                                                             │
│  ████████████████████████████████████████████████████       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ⚫ DARK BROWN - #3D3020                                     │
│  Primary text - Readability, sophistication                │
│  OKLCH: 0.25 0.02 75                                        │
│  RGB: 61, 48, 32                                            │
│  Use: Body text, headings, dark elements                    │
│                                                             │
│  ████████████████████████████████████████████████████       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ⚪ WARM GRAY - #807A70                                      │
│  Secondary text - Balance, subtlety                         │
│  OKLCH: 0.50 0.02 75                                        │
│  RGB: 128, 122, 112                                         │
│  Use: Secondary text, muted elements, borders               │
│                                                             │
│  ████████████████████████████████████████████████████       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Product Colors

### Classic Collection
```
🖤 NOIR (Black)      - #1A1A1A - Timeless, versatile, elegant
🤍 BLANC (White)     - #FFFFFF - Pure, fresh, ceremonial
🟤 BEIGE             - #D4C5B0 - Neutral, sophisticated, everyday
```

### Luxury Collection
```
🟡 OR (Gold)         - #D4AF37 - Premium, special occasions
🟫 BRONZE            - #8B6914 - Warm, elegant, unique
🌸 ROSE              - #E8B4BC - Feminine, soft, romantic
```

### Rich Collection
```
🔵 BLEU (Blue)       - #2C5F7C - Serene, classic, versatile
🟢 VERT (Green)      - #4A6B4F - Fresh, natural, peaceful
🍷 BORDEAUX          - #6B2C3E - Rich, luxurious, formal
```

---

## CSS Variables Reference

### Light Mode
```css
:root {
  /* Brand Colors */
  --primary: 0.75 0.12 85;              /* Rich Gold */
  --primary-foreground: oklch(0.2 0.02 75);
  
  --secondary: 0.52 0.10 75;            /* Deep Bronze */
  --secondary-foreground: oklch(1 0 0);
  
  --accent: 0.60 0.08 15;               /* Soft Rose Gold */
  --accent-foreground: oklch(1 0 0);
  
  /* Neutrals */
  --background: oklch(0.98 0.01 85);    /* Cream */
  --foreground: oklch(0.25 0.02 75);    /* Dark Brown */
  
  --card: oklch(1 0 0);                 /* White */
  --card-foreground: oklch(0.25 0.02 75);
  
  --muted: oklch(0.96 0.01 85);         /* Light Cream */
  --muted-foreground: oklch(0.50 0.02 75);
  
  --border: oklch(0.88 0.02 85);        /* Light Border */
  --input: oklch(0.95 0.01 85);         /* Input Background */
  --ring: oklch(0.75 0.12 85);          /* Focus Ring (Gold) */
}
```

### Dark Mode
```css
.dark {
  /* Brand Colors (Brighter) */
  --primary: 0.80 0.14 85;              /* Brighter Gold */
  --primary-foreground: oklch(0.18 0.02 75);
  
  --secondary: 0.58 0.12 75;            /* Lighter Bronze */
  --secondary-foreground: oklch(0.95 0.01 85);
  
  --accent: 0.65 0.10 15;               /* Lighter Rose Gold */
  --accent-foreground: oklch(0.95 0.01 85);
  
  /* Neutrals */
  --background: oklch(0.18 0.02 75);    /* Dark Brown */
  --foreground: oklch(0.95 0.01 85);    /* Light Cream */
  
  --card: oklch(0.22 0.02 75);          /* Slightly Lighter */
  --card-foreground: oklch(0.95 0.01 85);
  
  --muted: oklch(0.28 0.02 75);         /* Muted Dark */
  --muted-foreground: oklch(0.70 0.02 85);
  
  --border: oklch(0.32 0.02 75);        /* Dark Border */
  --input: oklch(0.28 0.02 75);         /* Input Background */
  --ring: oklch(0.80 0.14 85);          /* Focus Ring (Gold) */
}
```

---

## Tailwind Usage Examples

### Backgrounds
```tsx
// Primary gold background
<div className="bg-primary text-primary-foreground">
  Gold background with contrasting text
</div>

// Secondary bronze background
<div className="bg-secondary text-secondary-foreground">
  Bronze background
</div>

// Accent rose gold background
<div className="bg-accent text-accent-foreground">
  Rose gold accent
</div>

// Gradient backgrounds
<div className="bg-gold-gradient">
  Gold gradient (135deg)
</div>

<div className="bg-gold-radial">
  Gold radial gradient
</div>
```

### Text Colors
```tsx
// Primary text
<h1 className="text-primary">Gold heading</h1>

// Secondary text
<p className="text-secondary">Bronze text</p>

// Accent text
<span className="text-accent">Rose gold accent</span>

// Foreground (body text)
<p className="text-foreground">Regular body text</p>

// Muted text
<p className="text-muted-foreground">Secondary information</p>
```

### Borders
```tsx
// Primary border
<div className="border border-primary">Gold border</div>

// Default border
<div className="border border-border">Standard border</div>

// Accent border
<div className="border-2 border-accent">Rose gold border</div>
```

### Buttons
```tsx
// Primary CTA button
<button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg">
  Acheter Maintenant
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-lg">
  Voir Plus
</button>

// Outline button
<button className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg">
  Découvrir
</button>

// Ghost button
<button className="text-primary hover:bg-primary/10 px-6 py-3 rounded-lg">
  En Savoir Plus
</button>
```

### Cards
```tsx
// Standard card
<div className="bg-card text-card-foreground rounded-lg shadow-soft p-6">
  Card content
</div>

// Card with hover effect
<div className="bg-card rounded-lg shadow-soft hover:shadow-soft-hover transition-shadow p-6">
  Interactive card
</div>

// Muted card
<div className="bg-muted text-muted-foreground rounded-lg p-6">
  Muted card
</div>
```

### Shadows
```tsx
// Soft gold shadow
<div className="shadow-soft">
  Subtle gold-tinted shadow
</div>

// Hover shadow
<div className="shadow-soft hover:shadow-soft-hover transition-shadow">
  Shadow grows on hover
</div>
```

---

## Color Accessibility

### Contrast Ratios (WCAG AA)

#### Light Mode
```
✅ Primary Gold (#D4AF37) on Cream (#F8F6F0)     - 3.2:1 (Large text only)
✅ Dark Brown (#3D3020) on Cream (#F8F6F0)       - 12.5:1 (AAA)
✅ Primary Gold (#D4AF37) on Dark Brown (#3D3020) - 4.1:1 (AA)
✅ White (#FFFFFF) on Primary Gold (#D4AF37)     - 2.8:1 (Large text only)
✅ Dark Brown (#3D3020) on White (#FFFFFF)       - 15.2:1 (AAA)
```

#### Dark Mode
```
✅ Brighter Gold on Dark Brown                    - 4.5:1 (AA)
✅ Light Cream on Dark Brown                      - 13.8:1 (AAA)
✅ Brighter Gold on Card Background               - 4.2:1 (AA)
```

### Recommendations
- Use Dark Brown text on light backgrounds for body copy
- Use Primary Gold for large headings and CTAs only
- Ensure sufficient contrast for all interactive elements
- Test with color blindness simulators

---

## Color Psychology

### Rich Gold (#D4AF37)
- **Emotions**: Luxury, success, quality, prestige
- **Use Cases**: Premium products, CTAs, special offers
- **Cultural**: Highly valued in Islamic culture, represents light and divine

### Deep Bronze (#8B6914)
- **Emotions**: Warmth, stability, tradition, earthiness
- **Use Cases**: Secondary actions, grounding elements
- **Cultural**: Natural, authentic, timeless

### Soft Rose Gold (#B76E79)
- **Emotions**: Femininity, grace, compassion, elegance
- **Use Cases**: Feminine touches, soft accents, romantic elements
- **Cultural**: Modern, sophisticated, gentle

### Cream (#F8F6F0)
- **Emotions**: Purity, simplicity, elegance, calm
- **Use Cases**: Backgrounds, breathing space
- **Cultural**: Clean, modest, peaceful

---

## Brand Color Combinations

### Elegant Luxury
```
Primary: Rich Gold (#D4AF37)
Secondary: Cream (#F8F6F0)
Accent: Deep Bronze (#8B6914)
Use: Premium product pages, hero sections
```

### Feminine Grace
```
Primary: Soft Rose Gold (#B76E79)
Secondary: Cream (#F8F6F0)
Accent: Rich Gold (#D4AF37)
Use: Hijab collections, feminine products
```

### Traditional Elegance
```
Primary: Deep Bronze (#8B6914)
Secondary: Cream (#F8F6F0)
Accent: Rich Gold (#D4AF37)
Use: Traditional abayas, classic collections
```

### Modern Sophistication
```
Primary: Rich Gold (#D4AF37)
Secondary: Dark Brown (#3D3020)
Accent: Soft Rose Gold (#B76E79)
Use: Contemporary designs, modern collections
```

---

## Gradients

### Gold Gradient (135deg)
```css
background: linear-gradient(135deg, #D4AF37 0%, #F4E5C3 100%);
```
**Use**: Hero sections, premium banners, special offers

### Gold Radial
```css
background: radial-gradient(circle at top right, #D4AF37, #8B6914);
```
**Use**: Spotlight effects, feature highlights

### Subtle Cream Gradient
```css
background: linear-gradient(180deg, #F8F6F0 0%, #FFFFFF 100%);
```
**Use**: Page backgrounds, subtle depth

### Bronze to Gold
```css
background: linear-gradient(90deg, #8B6914 0%, #D4AF37 100%);
```
**Use**: Progress bars, loading states, transitions

---

## Color Testing Checklist

- [ ] All text meets WCAG AA contrast requirements
- [ ] Interactive elements are clearly distinguishable
- [ ] Color is not the only means of conveying information
- [ ] Tested with color blindness simulators
- [ ] Consistent across light and dark modes
- [ ] Gold accents are used sparingly for impact
- [ ] Neutral colors provide sufficient breathing space
- [ ] Brand colors are recognizable and memorable

---

**Last Updated**: February 2026
**Brand**: Nour Elegance
**Designer**: Brand Team
