import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "المدونة - براءة | Baraa",
  description: "اكتشفي مقالاتنا حول الأزياء الإسلامية، الصيحات، نصائح الأسلوب والإلهام للنساء المسلمات العصريات",
}

// Mock blog posts data - ALL IN ARABIC
const blogPosts = [
  {
    id: "1",
    title: "كيف تختارين العباية المثالية لكل مناسبة",
    excerpt: "اكتشفي نصائحنا لاختيار العباية المثالية حسب المناسبة والموسم وأسلوبك الشخصي.",
    image: "/placeholder.jpg",
    category: "أسلوب ونصائح",
    author: "فريق براءة",
    date: "١٥ فبراير ٢٠٢٦",
    readTime: "٥ دقائق",
  },
  {
    id: "2",
    title: "صيحات الحجاب لربيع وصيف ٢٠٢٦",
    excerpt: "استكشفي أحدث صيحات الحجاب: الألوان والأقمشة والأساليب التي ستحدث ضجة هذا الموسم.",
    image: "/placeholder.jpg",
    category: "صيحات",
    author: "فريق براءة",
    date: "١٠ فبراير ٢٠٢٦",
    readTime: "٤ دقائق",
  },
  {
    id: "3",
    title: "دليل العناية بملابسك الحريرية",
    excerpt: "تعلمي كيفية العناية بحجاباتك وعباءاتك الحريرية للحفاظ على جمالها وجودتها.",
    image: "/placeholder.jpg",
    category: "العناية",
    author: "فريق براءة",
    date: "٥ فبراير ٢٠٢٦",
    readTime: "٦ دقائق",
  },
  {
    id: "4",
    title: "الأناقة المحتشمة: الجمع بين التقليد والحداثة",
    excerpt: "كيف تحتفي الأزياء الإسلامية المعاصرة بالهوية مع احتضان الصيحات الحالية.",
    image: "/placeholder.jpg",
    category: "ثقافة",
    author: "فريق براءة",
    date: "١ فبراير ٢٠٢٦",
    readTime: "٧ دقائق",
  },
  {
    id: "5",
    title: "٥ طرق لارتداء حجابك بأناقة",
    excerpt: "دروس بسيطة لتنويع إطلالاتك اليومية وإبراز أسلوبك الشخصي.",
    image: "/placeholder.jpg",
    category: "دروس",
    author: "فريق براءة",
    date: "٢٨ يناير ٢٠٢٦",
    readTime: "٥ دقائق",
  },
  {
    id: "6",
    title: "تحضير خزانة ملابسك لرمضان",
    excerpt: "اقتراحاتنا لتكوين مجموعة أنيقة ومريحة للشهر الفضيل.",
    image: "/placeholder.jpg",
    category: "مناسبات خاصة",
    author: "فريق براءة",
    date: "٢٥ يناير ٢٠٢٦",
    readTime: "٦ دقائق",
  },
]

const categories = ["الكل", "أسلوب ونصائح", "صيحات", "العناية", "ثقافة", "دروس", "مناسبات خاصة"]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="bg-gold-gradient text-primary-foreground py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance animate-slideInLeft">
              مدونة براءة
            </h1>
            <p className="text-primary-foreground/90 text-base md:text-lg max-w-2xl text-pretty">
              إلهام ونصائح وصيحات للاحتفال بالأزياء الإسلامية بأناقة
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === "Tous"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Image à la une
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      مميز
                    </span>
                    <span className="text-sm text-muted-foreground">{blogPosts[0].category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    اقرأي المقال
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-card-foreground mb-8">مقالات حديثة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.slice(1).map((post, idx) => (
                <article
                  key={post.id}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="relative h-48 bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                      Image article
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-card text-primary text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime} قراءة</span>
                    </div>
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      اقرأي المزيد
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-gold-gradient">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              ابقي ملهمة
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              اشتركي في نشرتنا الإخبارية لتلقي أحدث مقالاتنا ونصائح الأسلوب والعروض الحصرية
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <button className="px-6 py-3 bg-card text-primary font-semibold rounded-lg hover:bg-card/90 transition-colors">
                اشتركي
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
