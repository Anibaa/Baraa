# تحديث المكونات المتبقية إلى العربية
# Update Remaining Components to Arabic

## ✅ تم التحديث / Updated

### الملفات الأساسية / Core Files
- [x] `app/layout.tsx` - RTL + Arabic metadata
- [x] `app/page.tsx` - Arabic titles
- [x] `app/globals.css` - RTL support
- [x] `lib/types.ts` - Arabic types
- [x] `lib/translations.ts` - Complete translations file

### المكونات / Components
- [x] `components/layout/header.tsx`
- [x] `components/layout/footer.tsx`
- [x] `components/home/category-section.tsx`
- [x] `components/home/featured-books.tsx`
- [x] `components/home/personalized-greeting.tsx`
- [x] `components/home/promotion-banner.tsx`
- [x] `components/home/whatsapp-button.tsx`
- [x] `app/articles/page.tsx`
- [x] `components/articles/filter-sidebar.tsx` - FULLY ARABIC

## 🔄 يحتاج للتحديث اليدوي / Needs Manual Update

نظراً لحجم الملفات، يرجى تحديث الملفات التالية يدوياً باستخدام الترجمات من `lib/translations.ts`:

Due to file size, please manually update the following files using translations from `lib/translations.ts`:

### 1. app/faq/page.tsx
استبدل جميع النصوص الفرنسية بالعربية:

```typescript
// العنوان / Title
"الأسئلة الشائعة"
"اعثري بسرعة على إجابات لأسئلتك حول براءة"

// الفئات / Categories
"الطلبات والمنتجات"
"الدفع"
"التوصيل"
"الإرجاع والاستبدال"
"المنتجات والجودة"
"الحساب وخدمة العملاء"

// الأسئلة / Questions - translate all Q&A
"كيف يمكنني تقديم طلب؟"
"ما هي طرق الدفع المقبولة؟"
"ما هي مدة التوصيل؟"
// ... etc

// الأزرار / Buttons
"تواصل معنا عبر واتساب"
"البريد الإلكتروني"
"زوري مدونتنا"
"لا تزال لديك أسئلة؟"
```

### 2. app/blog/page.tsx
استبدل جميع النصوص:

```typescript
// العنوان / Title
"مدونة براءة"
"إلهام ونصائح وصيحات للاحتفال بالأزياء الإسلامية بأناقة"

// الفئات / Categories
["الكل", "أسلوب ونصائح", "صيحات", "العناية", "ثقافة", "دروس", "مناسبات خاصة"]

// المقالات / Articles
{
  title: "كيف تختارين العباية المثالية لكل مناسبة",
  excerpt: "اكتشفي نصائحنا لاختيار العباية المثالية حسب المناسبة والموسم وأسلوبك الشخصي.",
  category: "أسلوب ونصائح",
  author: "فريق براءة",
  date: "١٥ فبراير ٢٠٢٦",
  readTime: "٥ دقائق",
}

// الأزرار / Buttons
"اقرأي المقال"
"اقرأي المزيد"
"ابقي ملهمة"
"اشتركي في نشرتنا الإخبارية"
```

### 3. components/home/testimonials.tsx
```typescript
const testimonials = [
  {
    name: "أميرة بن سالم",
    role: "عميلة مخلصة",
    content: "ملابس أنيقة وجودة استثنائية. براءة تفهم حقاً الأسلوب النسائي العصري",
    rating: 5,
  },
  {
    name: "سلمى الطرابلسي",
    role: "عاشقة الموضة",
    content: "أحب مجموعة براءة! قطع فريدة تجعلني أشعر بالجمال والثقة",
    rating: 5,
  },
  {
    name: "نور الحمدي",
    role: "محترفة",
    content: "مثالية للمكتب والخروجات. براءة تقدم التوازن المثالي بين الأناقة والراحة",
    rating: 4.5,
  },
]

// العنوان / Title
"آراء عميلاتنا"
"اكتشفي ما تقوله عميلاتنا عن تجربتهن مع براءة"
```

### 4. components/home/recently-viewed.tsx
```typescript
// العنوان / Title
"شاهدت مؤخراً"
"اعثري على المنتجات التي اكتشفتها مؤخراً"

// الأزرار / Buttons
"أضف للسلة" // Already updated in featured-books

// الفئات / Categories - use Arabic values
{book.category === "عباية" ? "عباية" : 
 book.category === "حجاب" ? "حجاب" : 
 book.category === "جلباب" ? "جلباب" : 
 book.category === "قفطان" ? "قفطان" : 
 book.category === "طقم" ? "طقم" : "إكسسوار"}
```

### 5. components/articles/articles-grid.tsx
```typescript
// رسائل / Messages
"لا توجد منتجات"
"لم نعثر على منتجات تطابق بحثك"
"جربي تعديل الفلاتر أو البحث"
"عرض الكل"
"أضف للسلة"
"متوفر"
"غير متوفر"
```

### 6. components/articles/pagination.tsx
```typescript
// النصوص / Text
"السابق"
"التالي"
"صفحة"
"من"
"عرض {start} - {end} من {total} منتجات"
```

### 7. components/articles/search-results-summary.tsx
```typescript
// النصوص / Text
"عرض {start} - {end} من {total} نتيجة"
"لم يتم العثور على نتائج"
"جربي تعديل البحث أو الفلاتر"
```

### 8. components/articles/book-details.tsx
```typescript
// علامات التبويب / Tabs
"الوصف"
"المواصفات"
"المراجعات"
"العناية"

// الأزرار / Buttons
"اختر المقاس"
"اختر اللون"
"أضف إلى السلة"
"اشتر الآن"

// الحالة / Status
"متوفر"
"غير متوفر"
"قطع محدودة"
```

### 9. components/cart/cart-items.tsx
```typescript
// النصوص / Text
"سلة التسوق"
"سلتك فارغة"
"متابعة التسوق"
"المنتج"
"السعر"
"الكمية"
"المجموع"
"إزالة"
"المقاس"
"اللون"
```

### 10. components/cart/cart-summary.tsx
```typescript
// النصوص / Text
"ملخص الطلب"
"المجموع الفرعي"
"الشحن"
"الضريبة"
"المجموع الكلي"
"المتابعة للدفع"
"شحن مجاني للطلبات فوق 200 د.ت"
```

## 📝 نصائح سريعة / Quick Tips

### استخدام ملف الترجمات / Using Translations File
```typescript
import { translations } from '@/lib/translations'

// مثال / Example
<h1>{translations.faq.title}</h1>
<button>{translations.common.submit}</button>
<p>{translations.product.addToCart}</p>
```

### تحديث القيم في الشروط / Update Values in Conditions
```typescript
// قبل / Before
if (category === "abaya") return "Abaya"

// بعد / After
if (category === "عباية") return "عباية"
```

### تحديث الروابط / Update Links
```typescript
// قبل / Before
href="/articles?category=abaya"

// بعد / After
href="/articles?category=عباية"
```

### الأرقام العربية (اختياري) / Arabic Numerals (Optional)
```typescript
function toArabicNumerals(num: number | string): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return String(num).replace(/\d/g, (d) => arabicNumerals[parseInt(d)])
}

// استخدام / Usage
<span>{toArabicNumerals(book.price)} د.ت</span>
```

## 🎯 الأولوية / Priority

1. **عالية جداً / Very High**
   - components/articles/articles-grid.tsx
   - components/articles/pagination.tsx
   - components/articles/search-results-summary.tsx

2. **عالية / High**
   - app/cart/page.tsx
   - components/cart/cart-items.tsx
   - components/cart/cart-summary.tsx

3. **متوسطة / Medium**
   - app/faq/page.tsx
   - app/blog/page.tsx
   - components/home/testimonials.tsx
   - components/home/recently-viewed.tsx

4. **منخفضة / Low**
   - app/about/page.tsx
   - app/partner/page.tsx
   - app/admin/* (Admin panel)

## ✅ قائمة التحقق / Checklist

عند تحديث كل ملف، تأكد من:
When updating each file, ensure:

- [ ] استبدال جميع النصوص الثابتة / Replace all static text
- [ ] تحديث القيم في الشروط / Update values in conditions
- [ ] تحديث الروابط والمعاملات / Update links and parameters
- [ ] تحديث aria-labels / Update aria-labels
- [ ] التحقق من مواضع العناصر (RTL) / Check element positions (RTL)
- [ ] اختبار المكون / Test the component

---

آخر تحديث: 2026
Last Updated: 2026
