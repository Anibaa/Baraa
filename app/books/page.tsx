import { Suspense } from "react"
import { getBooks } from "@/lib/api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterSidebar } from "@/components/articles/filter-sidebar"
import { BooksGrid } from "@/components/articles/books-grid"
import { Pagination } from "@/components/articles/pagination"
import { SearchResultsSummary } from "@/components/articles/search-results-summary"

const ITEMS_PER_PAGE = 12

export const metadata = {
  title: "Articles - Baraa | براءة",
  description: "Parcourez notre collection complète de vêtements islamiques pour femmes",
}

// Ensure this page is not statically cached
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface BooksPageProps {
  searchParams: Promise<{
    category?: string
    size?: string
    color?: string
    search?: string
    sort?: string
    page?: string
  }>
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams
  const category = params.category
  const size = params.size
  const color = params.color
  const search = params.search
  const sort = params.sort
  const page = Number.parseInt(params.page || "1")

  const allBooks = await getBooks({
    category: category as any,
    size: size as any,
    color: color as any,
    search: search,
    sort: sort,
  })

  const totalItems = allBooks.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const paginatedBooks = allBooks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/40">
        {/* Page Header */}
        <section className="bg-linear-to-r from-primary to-primary/80 text-white py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold animate-slideInLeft">Nos Articles</h1>
            <p className="text-white/85 mt-2 md:mt-3 text-sm md:text-base">
              Découvrez notre collection de vêtements islamiques élégants
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            {/* Results Summary */}
            <div className="mb-6 md:mb-8">
              <SearchResultsSummary 
                totalItems={totalItems}
                currentPage={page}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - More prominent on mobile */}
              <div className="lg:sticky lg:top-20 lg:h-fit">
                <Suspense fallback={<div className="text-muted-foreground text-sm">Chargement des filtres...</div>}>
                  <FilterSidebar />
                </Suspense>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Suspense fallback={<div className="text-muted-foreground text-sm">Chargement des livres...</div>}>
                  <BooksGrid books={paginatedBooks} searchQuery={search} />
                  <Pagination currentPage={page} totalPages={totalPages} totalItems={totalItems} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Floating Search for Mobile */}
      
      <Footer />
    </>
  )
}
