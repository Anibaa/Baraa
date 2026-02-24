# دليل التحويل إلى اللغة العربية
# Arabic Conversion Guide

## التغييرات الرئيسية / Main Changes

### 1. إعدادات اللغة والاتجاه / Language & Direction Settings

تم تحديث الموقع بالكامل ليدعم اللغة العربية مع الاتجاه من اليمين إلى اليسار (RTL).

The entire website has been updated to support Arabic language with Right-to-Left (RTL) direction.

**الملفات المحدثة / Updated Files:**
- `app/layout.tsx` - تغيير `lang="ar"` و `dir="rtl"`
- `app/globals.css` - إضافة دعم RTL
- `lib/types.ts` - تحديث الأنواع للغة العربية

### 2. ملف الترجمة / Translation File

تم إنشاء ملف شامل للترجمات العربية:
- `lib/translations.ts` - يحتوي على جميع النصوص بالعربية

A comprehensive Arabic translations file has been created:
- `lib/translations.ts` - Contains all Arabic text

**الاستخدام / Usage:**
```typescript
import { t, translations } from '@/lib/translations'

// استخدام مباشر / Direct usage
const text = translations.nav.home // "الرئيسية"

// استخدام الدالة المساعدة / Using helper function
const text = t('nav.home') // "الرئيسية"
```

### 3. المكونات المحدثة / Updated Components

تم تحديث المكونات التالية بالنصوص العربية:

The following components have been updated with Arabic text:

- ✅ `components/layout/header.tsx` - الترويسة
- ✅ `components/layout/footer.tsx` - التذييل
- ✅ `components/home/category-section.tsx` - قسم الفئات
- ✅ `app/layout.tsx` - التخطيط الرئيسي
- ✅ `app/page.tsx` - الصفحة الرئيسية

### 4. الأنواع والبيانات / Types & Data

تم تحديث الأنواع لتدعم القيم العربية:

Types have been updated to support Arabic values:

```typescript
// الفئات / Categories
type Category = "عباية" | "حجاب" | "جلباب" | "قفطان" | "طقم" | "إكسسوارات"

// الألوان / Colors
type PredefinedColor = "أسود" | "أبيض" | "بيج" | "ذهبي" | "برونزي" | "وردي" | "أزرق" | "أخضر" | "عنابي" | "رمادي" | "بني" | "تركواز"

// حالة المنتج / Product Status
type ProductStatus = "متوفر" | "غير متوفر" | "قيد التحضير" | "قيد التوصيل" | "تم التوصيل"

// حالة الطلب / Order Status
type OrderStatus = "قيد التحضير" | "مؤكد" | "قيد التوصيل" | "تم التوصيل"
```

### 5. دعم CSS للغة العربية / CSS Support for Arabic

تم إضافة قواعد CSS خاصة بالاتجاه RTL:

Special RTL CSS rules have been added:

```css
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* عكس الاتجاهات / Flip directions */
[dir="rtl"] .text-left { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
[dir="rtl"] .float-left { float: right; }
[dir="rtl"] .float-right { float: left; }

/* عكس الرسوم المتحركة / Flip animations */
[dir="rtl"] .animate-slideInLeft { animation: slideInRight 0.6s ease-out; }
[dir="rtl"] .animate-slideInRight { animation: slideInLeft 0.6s ease-out; }
```

## المكونات المتبقية للتحديث / Remaining Components to Update

يجب تحديث المكونات التالية بالنصوص العربية:

The following components need to be updated with Arabic text:

### صفحات / Pages
- [ ] `app/books/page.tsx` - صفحة المنتجات
- [ ] `app/books/[id]/page.tsx` - صفحة تفاصيل المنتج
- [ ] `app/cart/page.tsx` - صفحة السلة
- [ ] `app/checkout/page.tsx` - صفحة الدفع
- [ ] `app/order-confirmation/page.tsx` - صفحة تأكيد الطلب
- [ ] `app/about/page.tsx` - صفحة من نحن
- [ ] `app/blog/page.tsx` - صفحة المدونة
- [ ] `app/faq/page.tsx` - صفحة الأسئلة الشائعة
- [ ] `app/partner/page.tsx` - صفحة الشراكة
- [ ] `app/admin/page.tsx` - لوحة التحكم
- [ ] `app/admin/login/page.tsx` - تسجيل دخول الإدارة

### مكونات المنتجات / Product Components
- [ ] `components/articles/books-grid.tsx`
- [ ] `components/articles/book-details.tsx`
- [ ] `components/articles/book-gallery.tsx`
- [ ] `components/articles/filter-sidebar.tsx`
- [ ] `components/articles/pagination.tsx`
- [ ] `components/articles/quick-order-form.tsx`
- [ ] `components/articles/related-books.tsx`
- [ ] `components/articles/search-results-summary.tsx`

### مكونات السلة والدفع / Cart & Checkout Components
- [ ] `components/cart/cart-items.tsx`
- [ ] `components/cart/cart-summary.tsx`
- [ ] `components/checkout/*`

### مكونات الصفحة الرئيسية / Home Components
- [ ] `components/home/featured-books.tsx`
- [ ] `components/home/personalized-greeting.tsx`
- [ ] `components/home/promotion-banner.tsx`
- [ ] `components/home/recently-viewed.tsx`
- [ ] `components/home/testimonials.tsx`
- [ ] `components/home/trusted-by.tsx`
- [ ] `components/home/whatsapp-button.tsx`

### مكونات الإدارة / Admin Components
- [ ] `components/admin/admin-nav.tsx`
- [ ] `components/admin/admin-statistics.tsx`
- [ ] `components/admin/books-management.tsx`
- [ ] `components/admin/orders-management.tsx`
- [ ] `components/admin/partners-management.tsx`
- [ ] `components/admin/sliders-management.tsx`

### مكونات الشراكة / Partner Components
- [ ] `components/partner/partner-form.tsx`

### مكونات عامة / Common Components
- [ ] `components/common/error-toast.tsx`
- [ ] `components/common/success-toast.tsx`
- [ ] `components/common/loading-spinner.tsx`

## كيفية تحديث المكونات / How to Update Components

### الخطوة 1: استيراد الترجمات / Step 1: Import Translations

```typescript
import { translations, t } from '@/lib/translations'
```

### الخطوة 2: استبدال النصوص / Step 2: Replace Text

**قبل / Before:**
```typescript
<h1>Featured Products</h1>
<button>Add to Cart</button>
```

**بعد / After:**
```typescript
<h1>{translations.home.featuredProducts}</h1>
<button>{translations.product.addToCart}</button>
```

### الخطوة 3: تحديث الروابط / Step 3: Update Links

تأكد من تحديث معاملات الاستعلام للفئات:

Make sure to update query parameters for categories:

**قبل / Before:**
```typescript
href="/books?category=abaya"
```

**بعد / After:**
```typescript
href="/books?category=عباية"
```

## البيانات الوهمية / Mock Data

يجب تحديث البيانات الوهمية في:
Mock data needs to be updated in:

- `lib/mock-data.ts` - تحديث جميع النصوص والفئات والألوان

## واجهات API / API Routes

يجب تحديث واجهات API لدعم القيم العربية:
API routes need to be updated to support Arabic values:

- `app/api/books/route.ts`
- `app/api/orders/route.ts`
- `app/api/partners/route.ts`
- `app/api/sliders/route.ts`

## قاعدة البيانات / Database

إذا كنت تستخدم قاعدة بيانات، تأكد من:
If using a database, ensure:

1. دعم ترميز UTF-8 / UTF-8 encoding support
2. تحديث البيانات الموجودة / Update existing data
3. تحديث نماذج البيانات / Update data models

## الاختبار / Testing

تأكد من اختبار:
Make sure to test:

- ✅ الاتجاه RTL يعمل بشكل صحيح / RTL direction works correctly
- ✅ جميع النصوص تظهر بالعربية / All text displays in Arabic
- ✅ التنقل يعمل بشكل صحيح / Navigation works correctly
- [ ] النماذج تعمل بشكل صحيح / Forms work correctly
- [ ] عملية الدفع تعمل / Checkout process works
- [ ] لوحة التحكم تعمل / Admin panel works

## ملاحظات مهمة / Important Notes

1. **الخط / Font**: يستخدم الموقع خط Rubik الذي يدعم العربية
   The site uses Rubik font which supports Arabic

2. **الأرقام / Numbers**: استخدم الأرقام العربية الهندية إذا لزم الأمر
   Use Arabic-Indic numerals if needed

3. **التواريخ / Dates**: تأكد من تنسيق التواريخ بشكل صحيح للعربية
   Ensure dates are formatted correctly for Arabic

4. **العملة / Currency**: استخدم الدينار التونسي (TND) أو العملة المناسبة
   Use Tunisian Dinar (TND) or appropriate currency

## الدعم / Support

للمساعدة أو الأسئلة، يرجى الاتصال بفريق التطوير.
For help or questions, please contact the development team.

---

تم التحديث: 2026
Last Updated: 2026
