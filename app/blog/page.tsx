import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog - Baraa | براءة",
  description: "Découvrez nos articles sur la mode islamique, les tendances, les conseils de style et l'inspiration pour femmes musulmanes modernes",
}

// Mock blog posts data
const blogPosts = [
  {
    id: "1",
    title: "Comment choisir la parfaite abaya pour chaque occasion",
    excerpt: "Découvrez nos conseils pour sélectionner l'abaya idéale selon l'événement, la saison et votre style personnel.",
    image: "/placeholder.jpg",
    category: "Style & Conseils",
    author: "Équipe Baraa",
    date: "15 Février 2026",
    readTime: "5 min",
  },
  {
    id: "2",
    title: "Les tendances hijab printemps-été 2026",
    excerpt: "Explorez les dernières tendances en matière de hijabs : couleurs, tissus et styles qui feront sensation cette saison.",
    image: "/placeholder.jpg",
    category: "Tendances",
    author: "Équipe Baraa",
    date: "10 Février 2026",
    readTime: "4 min",
  },
  {
    id: "3",
    title: "Guide d'entretien pour vos vêtements en soie",
    excerpt: "Apprenez à prendre soin de vos hijabs et abayas en soie pour préserver leur beauté et leur qualité.",
    image: "/placeholder.jpg",
    category: "Entretien",
    author: "Équipe Baraa",
    date: "5 Février 2026",
    readTime: "6 min",
  },
  {
    id: "4",
    title: "L'élégance modeste : allier tradition et modernité",
    excerpt: "Comment la mode islamique contemporaine célèbre l'identité tout en embrassant les tendances actuelles.",
    image: "/placeholder.jpg",
    category: "Culture",
    author: "Équipe Baraa",
    date: "1 Février 2026",
    readTime: "7 min",
  },
  {
    id: "5",
    title: "5 façons de porter votre hijab avec style",
    excerpt: "Des tutoriels simples pour varier vos looks quotidiens et affirmer votre style personnel.",
    image: "/placeholder.jpg",
    category: "Tutoriels",
    author: "Équipe Baraa",
    date: "28 Janvier 2026",
    readTime: "5 min",
  },
  {
    id: "6",
    title: "Préparer sa garde-robe pour le Ramadan",
    excerpt: "Nos suggestions pour constituer une collection élégante et confortable pour le mois sacré.",
    image: "/placeholder.jpg",
    category: "Occasions Spéciales",
    author: "Équipe Baraa",
    date: "25 Janvier 2026",
    readTime: "6 min",
  },
]

const categories = ["Tous", "Style & Conseils", "Tendances", "Entretien", "Culture", "Tutoriels", "Occasions Spéciales"]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="bg-gold-gradient text-primary-foreground py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance animate-slideInLeft">
              Blog Baraa
            </h1>
            <p className="text-primary-foreground/90 text-base md:text-lg max-w-2xl text-pretty">
              Inspiration, conseils et tendances pour célébrer la mode islamique avec élégance
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
                      À la une
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
                    Lire l'article
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
            <h2 className="text-3xl font-bold text-card-foreground mb-8">Articles récents</h2>
            
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
                      <span>{post.readTime} de lecture</span>
                    </div>
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Lire plus
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
              Restez inspirée
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers articles, conseils de style et offres exclusives
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <button className="px-6 py-3 bg-card text-primary font-semibold rounded-lg hover:bg-card/90 transition-colors">
                S'inscrire
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
