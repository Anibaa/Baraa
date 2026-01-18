"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
}

export function Pagination({ currentPage, totalPages, totalItems }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }
    router.push(`/books?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter((p) => Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages)

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-12 animate-fadeInUp">
      {/* Left Side - Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-border hover:bg-muted hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
        aria-label="Page précédente"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Center - Page Numbers */}
      <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
        {visiblePages.map((page, idx) => {
          const prevPage = visiblePages[idx - 1]
          return (
            <div key={page}>
              {prevPage && page - prevPage > 1 && <span className="px-2 py-1 text-muted-foreground text-sm">...</span>}
              <button
                onClick={() => goToPage(page)}
                className={`px-3 md:px-4 py-2 rounded-lg transition-all duration-200 text-sm md:text-base font-medium ${
                  page === currentPage
                    ? "bg-primary text-white shadow-soft hover:shadow-soft-hover"
                    : "border border-border hover:border-primary/50 hover:bg-muted hover:scale-105 active:scale-95"
                }`}
              >
                {page}
              </button>
            </div>
          )
        })}
      </div>

      {/* Right Side - Next Button and Info */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-border hover:bg-muted hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
          aria-label="Page suivante"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">{totalItems} livres</div>
      </div>
    </div>
  )
}
