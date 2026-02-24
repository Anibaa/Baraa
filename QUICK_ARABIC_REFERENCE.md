# مرجع سريع للعربية | Quick Arabic Reference

## 🔤 الترجمات الشائعة / Common Translations

### التنقل / Navigation
```
Home → الرئيسية
Products → المنتجات
About → من نحن
Blog → المدونة
FAQ → الأسئلة الشائعة
Cart → السلة
Admin → لوحة التحكم
```

### الفئات / Categories
```
Abaya → عباية
Hijab → حجاب
Jilbab → جلباب
Kaftan → قفطان
Ensemble → طقم
Accessories → إكسسوارات
```

### المقاسات / Sizes
```
S → S (صغير)
M → M (متوسط)
L → L (كبير)
XL → XL (كبير جداً)
XXL → XXL (كبير جداً جداً)
Unique → مقاس واحد
```

### الألوان / Colors
```
Black → أسود
White → أبيض
Beige → بيج
Gold → ذهبي
Bronze → برونزي
Pink → وردي
Blue → أزرق
Green → أخضر
Burgundy → عنابي
Gray → رمادي
Brown → بني
Turquoise → تركواز
```

### الحالات / Status
```
In Stock → متوفر
Out of Stock → غير متوفر
Preparing → قيد التحضير
Shipping → قيد التوصيل
Delivered → تم التوصيل
Confirmed → مؤكد
```

### الأزرار / Buttons
```
Add to Cart → أضف إلى السلة
Buy Now → اشتر الآن
Shop Now → تسوق الآن
View All → عرض الكل
Learn More → اعرف المزيد
Contact Us → اتصل بنا
Submit → إرسال
Save → حفظ
Cancel → إلغاء
Delete → حذف
Edit → تعديل
```

### النماذج / Forms
```
Name → الاسم
Email → البريد الإلكتروني
Phone → رقم الهاتف
Address → العنوان
Message → الرسالة
Required → مطلوب
Optional → اختياري
```

### السلة والدفع / Cart & Checkout
```
Cart → السلة
Checkout → إتمام الطلب
Quantity → الكمية
Size → المقاس
Color → اللون
Price → السعر
Total → المجموع
Subtotal → المجموع الفرعي
Shipping → الشحن
Payment Method → طريقة الدفع
Cash on Delivery → الدفع عند الاستلام
Credit Card → بطاقة ائتمان
```

## 💻 أمثلة الكود / Code Examples

### استخدام الترجمات / Using Translations
```typescript
import { translations, t } from '@/lib/translations'

// طريقة 1: استخدام مباشر
<h1>{translations.home.featuredProducts}</h1>
<button>{translations.product.addToCart}</button>

// طريقة 2: استخدام الدالة المساعدة
<h1>{t('home.featuredProducts')}</h1>
<button>{t('product.addToCart')}</button>
```

### تحديث الروابط / Updating Links
```typescript
// قبل / Before
<Link href="/books?category=abaya">Abayas</Link>

// بعد / After
<Link href="/books?category=عباية">عباءات</Link>
```

### تحديث الأنواع / Updating Types
```typescript
// قبل / Before
type Category = "abaya" | "hijab"

// بعد / After
type Category = "عباية" | "حجاب"
```

### شروط العرض / Conditional Display
```typescript
// قبل / Before
{book.category === "abaya" ? "Abaya" : "Hijab"}

// بعد / After
{book.category === "عباية" ? "عباية" : "حجاب"}
```

## 🎨 CSS للعربية / CSS for Arabic

### الاتجاه / Direction
```css
/* تطبيق RTL */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
```

### عكس الاتجاهات / Flip Directions
```css
/* النصوص */
[dir="rtl"] .text-left { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }

/* العوامات */
[dir="rtl"] .float-left { float: right; }
[dir="rtl"] .float-right { float: left; }

/* الهوامش */
[dir="rtl"] .ml-auto {
  margin-left: 0;
  margin-right: auto;
}
```

### الرسوم المتحركة / Animations
```css
[dir="rtl"] .animate-slideInLeft {
  animation: slideInRight 0.6s ease-out;
}

[dir="rtl"] .animate-slideInRight {
  animation: slideInLeft 0.6s ease-out;
}
```

## 📱 مواضع العناصر / Element Positions

### زر واتساب / WhatsApp Button
```typescript
// قبل (LTR) / Before (LTR)
className="fixed bottom-6 right-6"

// بعد (RTL) / After (RTL)
className="fixed bottom-6 left-6"
```

### النصوص التوضيحية / Tooltips
```typescript
// قبل (LTR) / Before (LTR)
className="absolute right-full mr-3"

// بعد (RTL) / After (RTL)
className="absolute left-full ml-3"
```

## 🔢 الأرقام / Numbers

### الأرقام الغربية (الحالية) / Western Numerals (Current)
```
0, 1, 2, 3, 4, 5, 6, 7, 8, 9
```

### الأرقام العربية الهندية (اختياري) / Arabic-Indic Numerals (Optional)
```
٠, ١, ٢, ٣, ٤, ٥, ٦, ٧, ٨, ٩
```

### دالة التحويل / Conversion Function
```typescript
function toArabicNumerals(num: number | string): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return String(num).replace(/\d/g, (d) => arabicNumerals[parseInt(d)])
}

// استخدام / Usage
toArabicNumerals(123) // "١٢٣"
toArabicNumerals("45.67") // "٤٥.٦٧"
```

## 📅 التواريخ / Dates

### تنسيق التاريخ العربي / Arabic Date Format
```typescript
const date = new Date()

// تنسيق عربي
const arabicDate = date.toLocaleDateString('ar-TN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// مثال: "٢٤ فبراير ٢٠٢٦"
```

## 💰 العملة / Currency

### الدينار التونسي / Tunisian Dinar
```typescript
// عرض السعر
{book.price} DT
{book.price} د.ت

// تنسيق العملة
const price = new Intl.NumberFormat('ar-TN', {
  style: 'currency',
  currency: 'TND'
}).format(book.price)
```

## ✅ قائمة التحقق السريعة / Quick Checklist

عند تحديث مكون / When updating a component:

- [ ] استيراد ملف الترجمات
- [ ] استبدال جميع النصوص الثابتة
- [ ] تحديث القيم في الشروط
- [ ] تحديث الروابط والمعاملات
- [ ] تحديث aria-labels
- [ ] التحقق من مواضع العناصر (RTL)
- [ ] اختبار المكون

## 🔗 روابط مفيدة / Useful Links

- `lib/translations.ts` - ملف الترجمات الكامل
- `lib/types.ts` - الأنواع المحدثة
- `app/globals.css` - قواعد CSS للعربية
- `ARABIC_CONVERSION_GUIDE.md` - الدليل الشامل
- `ARABIC_CONVERSION_COMPLETED.md` - ملخص التغييرات

## 📞 أرقام الاتصال / Contact Numbers

```
+216 98 711 586
```

تنسيق عربي / Arabic format:
```
٠٠٢١٦ ٩٨ ٧١١ ٥٨٦
```

---

تم الإنشاء: 2026
Created: 2026
