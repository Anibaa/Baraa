"use client"

import { useSearchParams } from "next/navigation"
import { Search, BookOpen } from "lucide-react"

interface SearchResultsSummaryProps {
  totalItems: number
  currentPage: number
  itemsPerPage: number
}

export function SearchResultsSummary({ totalItems, currentPage, itemsPerPage }: SearchResultsSummaryProps) {
  const searchParams = useSearchParams()
  
  const search = searchParams.get("search")
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        {search ? (
          <Search className="w-4 h-4 text-primary" />
        ) : (
          <BookOpen className="w-4 h-4" />
        )}
        <span>
          <strong className="text-foreground">{totalItems}</strong> livre{totalItems !== 1 ? 's' : ''}
          {search && (
            <span className="ml-1">
              pour <strong className="text-primary">"{search}"</strong>
            </span>
          )}
        </span>
      </div>
      
      {totalItems > 0 && (
        <>
          <span className="text-muted-foreground/60">•</span>
          <span>
            Page <strong className="text-foreground">{currentPage}</strong>
            {" "}({startItem}-{endItem})
          </span>
        </>
      )}
    </div>
  )
}