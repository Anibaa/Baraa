import { Suspense } from "react"
import { getBooks } from "@/lib/api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterSidebar } from "@/components/books/filter-sidebar"
import { BooksGrid } from "@/components/books/books-grid"
import { Pagination } from "@/components/books/pagination"

const ITEMS_PER_PAGE = 12

export const metadata = {
  title: "Livres - Tunitest",
  description: "Parcourez notre collection complète de livres éducatifs tunisiens",
}

// Ensure this page is not statically cached
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface BooksPageProps {
  searchParams: Promise<{
    category?: string
    level?: string
    language?: string
    page?: string
  }>
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams
  const category = params.category
  const level = params.level
  const language = params.language
  const page = Number.parseInt(params.page || "1")

  const allBooks = await getBooks({
    category: category as any,
    level: level as any,
    language: language as any,
  })

  const totalItems = allBooks.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const paginatedBooks = allBooks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/40">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold animate-slideInLeft">Parcourir les Livres</h1>
            <p className="text-white/85 mt-2 md:mt-3 text-sm md:text-base">
              Découvrez notre vaste collection de livres éducatifs
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:sticky lg:top-20 lg:h-fit">
                <Suspense fallback={<div className="text-muted-foreground text-sm">Chargement des filtres...</div>}>
                  <FilterSidebar />
                </Suspense>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Suspense fallback={<div className="text-muted-foreground text-sm">Chargement des livres...</div>}>
                  <BooksGrid books={paginatedBooks} />
                  <Pagination currentPage={page} totalPages={totalPages} totalItems={totalItems} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
