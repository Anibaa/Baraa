import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HelpCircle, Package, CreditCard, Truck, RefreshCw, Shield, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | براءة - Baraa",
  description: "اعثري على إجابات لأسئلتك حول منتجاتنا، التوصيل، الدفع والإرجاع. خدمة عملاء براءة.",
  keywords: ["أسئلة شائعة", "أسئلة", "مساعدة", "دعم", "توصيل", "دفع", "إرجاع", "براءة"],
}

const faqCategories = [
  {
    title: "الطلبات والمنتجات",
    icon: Package,
    questions: [
      {
        q: "كيف يمكنني تقديم طلب؟",
        a: "لتقديم طلب، تصفحي مجموعتنا، أضيفي المنتجات المرغوبة إلى سلتك، ثم اضغطي على 'إتمام الطلب'. املأي معلومات التوصيل واختاري طريقة الدفع."
      },
      {
        q: "هل يمكنني تعديل طلبي بعد تقديمه؟",
        a: "يمكنك تعديل طلبك خلال ساعتين من تأكيده بالتواصل معنا عبر واتساب على +216 98 711 586. بعد هذه المدة، يكون الطلب قيد التحضير."
      },
      {
        q: "كيف أختار المقاس المناسب؟",
        a: "راجعي دليل المقاسات المتوفر على كل صفحة منتج. نقدم مقاسات من S إلى XXL. في حالة الشك، تواصلي مع خدمة العملاء للحصول على نصائح شخصية."
      },
      {
        q: "هل ألوان المنتجات مطابقة للصور؟",
        a: "نبذل قصارى جهدنا لتمثيل الألوان بدقة. ومع ذلك، قد تختلف قليلاً حسب شاشتك. تواصلي معنا للحصول على مزيد من التفاصيل حول منتج معين."
      },
    ]
  },
  {
    title: "الدفع",
    icon: CreditCard,
    questions: [
      {
        q: "ما هي طرق الدفع المقبولة؟",
        a: "نقبل الدفع نقداً عند التوصيل والدفع ببطاقة الائتمان. جميع المدفوعات آمنة ومحمية."
      },
      {
        q: "هل الدفع عبر الإنترنت آمن؟",
        a: "نعم، بالتأكيد. نستخدم بروتوكولات أمان SSL ومدفوعاتنا بالبطاقة تتم معالجتها عبر منصات آمنة متوافقة مع معايير PCI DSS."
      },
      {
        q: "هل يمكنني الدفع على أقساط؟",
        a: "حالياً، لا نقدم خيار الدفع بالتقسيط. ومع ذلك، نعمل على دمج هذا الخيار قريباً."
      },
      {
        q: "هل سأحصل على فاتورة؟",
        a: "نعم، سيتم إرسال فاتورة مفصلة إليك عبر البريد الإلكتروني بعد تأكيد طلبك وستكون أيضاً مرفقة في طردك."
      },
    ]
  },
  {
    title: "التوصيل",
    icon: Truck,
    questions: [
      {
        q: "ما هي مدة التوصيل؟",
        a: "مدة التوصيل من 2 إلى 5 أيام عمل لتونس. للمناطق البعيدة، احسبي من 3 إلى 7 أيام عمل."
      },
      {
        q: "ما هي تكلفة التوصيل؟",
        a: "تكلفة التوصيل 7 د.ت لجميع أنحاء تونس. التوصيل مجاني للطلبات التي تزيد عن 200 د.ت."
      },
      {
        q: "هل تقومون بالتوصيل الدولي؟",
        a: "حالياً، نقوم بالتوصيل فقط داخل تونس. نخطط لتوسيع خدماتنا دولياً قريباً."
      },
      {
        q: "كيف يمكنني تتبع طلبي؟",
        a: "ستتلقين رقم تتبع عبر الرسائل القصيرة والبريد الإلكتروني بمجرد شحن طلبك. يمكنك أيضاً التواصل معنا عبر واتساب لمعرفة حالة التوصيل."
      },
      {
        q: "ماذا أفعل إذا لم أكن متواجدة عند التوصيل؟",
        a: "سيتصل بك مندوب التوصيل قبل الوصول. إذا لم تكوني متواجدة، يمكنك الاتفاق على موعد آخر أو تعيين شخص لاستلام الطرد."
      },
    ]
  },
  {
    title: "الإرجاع والاستبدال",
    icon: RefreshCw,
    questions: [
      {
        q: "ما هي سياسة الإرجاع؟",
        a: "لديك 14 يوماً من تاريخ الاستلام لإرجاع منتج غير مستعمل، مع الملصقات، في عبوته الأصلية. تكاليف الإرجاع على عاتقك."
      },
      {
        q: "كيف أقوم بالإرجاع؟",
        a: "تواصلي مع خدمة العملاء عبر واتساب على +216 98 711 586 لبدء عملية الإرجاع. سنزودك بالتعليمات وعنوان الإرجاع."
      },
      {
        q: "هل يمكنني استبدال منتج؟",
        a: "نعم، الاستبدال ممكن خلال 14 يوماً. تواصلي معنا لترتيب الاستبدال. إذا كان هناك فرق في السعر، سيتم تعديله."
      },
      {
        q: "متى سأحصل على استرداد المبلغ؟",
        a: "يتم الاسترداد خلال 7 إلى 10 أيام عمل بعد استلام والتحقق من المنتج المرتجع، بنفس طريقة الدفع المستخدمة."
      },
      {
        q: "هل المنتجات المخفضة قابلة للاستبدال؟",
        a: "نعم، المنتجات المخفضة تتبع نفس سياسة الإرجاع والاستبدال مثل المنتجات بالسعر العادي."
      },
    ]
  },
  {
    title: "المنتجات والجودة",
    icon: Shield,
    questions: [
      {
        q: "ما هي جودة أقمشتكم؟",
        a: "نستخدم فقط أقمشة فاخرة: حرير طبيعي، كريب عالي الجودة، جيرسي مطاطي، قطن مصري وقطيفة مضلعة. كل منتج يوضح تركيبته."
      },
      {
        q: "كيف أعتني بملابسي؟",
        a: "كل منتج مرفق بتعليمات عناية مفصلة. بشكل عام، نوصي بالغسيل الرقيق على 30 درجة مئوية والتجفيف المسطح للحفاظ على الجودة."
      },
      {
        q: "هل منتجاتكم متوافقة مع المعايير الإسلامية؟",
        a: "نعم، جميع ملابسنا مصممة باحترام مبادئ الحشمة الإسلامية، مع قصات واسعة وأقمشة معتمة."
      },
      {
        q: "هل تقدمون منتجات للمناسبات الخاصة؟",
        a: "نعم، لدينا مجموعة خاصة لرمضان، العيد والأعراس، مع قفاطين مطرزة وعباءات احتفالية."
      },
      {
        q: "هل التطريزات مصنوعة يدوياً؟",
        a: "قطعنا الفاخرة تحتوي على تطريزات يدوية من قبل حرفيين مهرة. التفاصيل محددة في كل بطاقة منتج."
      },
    ]
  },
  {
    title: "الحساب وخدمة العملاء",
    icon: MessageCircle,
    questions: [
      {
        q: "هل يجب إنشاء حساب للطلب؟",
        a: "لا، يمكنك الطلب كضيف. ومع ذلك، إنشاء حساب يسمح لك بتتبع طلباتك والاستفادة من عروض حصرية."
      },
      {
        q: "كيف أتواصل مع خدمة العملاء؟",
        a: "يمكنك التواصل معنا عبر واتساب على +216 98 711 586، بالبريد الإلكتروني على contact@baraa.com، أو عبر نموذج الاتصال على موقعنا."
      },
      {
        q: "ما هي ساعات عمل خدمة العملاء؟",
        a: "خدمة العملاء متاحة من الأحد إلى الخميس من 9 صباحاً إلى 6 مساءً، والسبت من 9 صباحاً إلى 1 ظهراً. مغلق يوم الجمعة."
      },
      {
        q: "هل تقدمون برنامج ولاء؟",
        a: "نعم، نحن نحضر حالياً برنامج ولاء سيتم إطلاقه قريباً. اشتركي في نشرتنا الإخبارية لتكوني على اطلاع."
      },
      {
        q: "كيف يمكنني تلقي العروض الترويجية؟",
        a: "اشتركي في نشرتنا الإخبارية وتابعينا على وسائل التواصل الاجتماعي (إنستغرام، فيسبوك) لعدم تفويت أي عرض أو جديد."
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gold-gradient text-primary-foreground py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4 animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideInLeft">
              الأسئلة الشائعة
            </h1>
            <p className="text-primary-foreground/90 text-base md:text-lg max-w-2xl mx-auto">
              اعثري بسرعة على إجابات لأسئلتك حول براءة
            </p>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-8 px-4 md:px-8 bg-muted/30 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-xl p-6 md:p-8 border border-primary/20 shadow-soft">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-right">
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    لم تجدي إجابتك؟
                  </h3>
                  <p className="text-muted-foreground">
                    فريقنا هنا لمساعدتك
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/21698711586"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    واتساب
                  </a>
                  <a
                    href="mailto:contact@baraa.com"
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                  >
                    البريد الإلكتروني
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {faqCategories.map((category, catIdx) => {
              const IconComponent = category.icon
              return (
                <div
                  key={catIdx}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${catIdx * 0.1}s` }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions */}
                  <div className="space-y-4">
                    {category.questions.map((item, qIdx) => (
                      <details
                        key={qIdx}
                        className="group bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300"
                      >
                        <summary className="cursor-pointer p-5 md:p-6 font-semibold text-card-foreground hover:text-primary transition-colors list-none flex items-center justify-between">
                          <span className="flex-1 pl-4">{item.q}</span>
                          <svg
                            className="w-5 h-5 text-primary transition-transform group-open:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                          <p className="text-muted-foreground leading-relaxed border-t border-border pt-4">
                            {item.a}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              لا تزال لديك أسئلة؟
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              لا تترددي في التواصل معنا. سيسعد فريقنا بمساعدتك والإجابة على جميع أسئلتك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/21698711586"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                تواصلي معنا عبر واتساب
              </a>
              <a
                href="/blog"
                className="px-8 py-4 bg-card text-card-foreground border-2 border-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                زوري مدونتنا
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
