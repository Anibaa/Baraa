"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ShoppingCart, Clock } from "lucide-react"
import { getRecentlyViewed } from "@/lib/personalization"
import type { Book } from "@/lib/types"

export function RecentlyViewed() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function loadRecentlyViewed() {
      const recentIds = getRecentlyViewed()
      if (recentIds.length === 0) return

      const recentBooks: Book[] = []
      for (const id of recentIds.slice(0, 4)) {
        try {
          const res = await fetch(`/api/books/${id}`)
          const data = await res.json()
          if (data.success && data.data) {
            recentBooks.push(data.data)
          }
        } catch (error) {
          console.error("Failed to load book:", id)
        }
      }
      setBooks(recentBooks)
      setIsLoaded(true)
    }

    loadRecentlyViewed()
  }, [])

  if (!isLoaded || books.length === 0) return null

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-card/50 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3 animate-fadeInUp">
          <Clock className="w-6 h-6 text-primary/70" />
          <h2 className="text-2xl md:text-4xl font-light text-foreground tracking-wide">Récemment Consultés</h2>
        </div>
        <p className="text-muted-foreground mb-10 font-light text-sm md:text-base">Retrouvez les articles que vous avez récemment découverts</p>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {books.map((book, idx) => (
            <div
              key={book.id}
              className="group relative bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-border/50 hover:border-primary/30 transition-all duration-700 animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Image Container */}
              <Link href={`/books/${book.id}`} className="block relative">
                <div className="relative overflow-hidden bg-linear-to-br from-muted/30 to-muted aspect-3/4">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Elegant Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {book.promoPrice && (
                      <div className="bg-linear-to-r from-red-600 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xl backdrop-blur-sm">
                        -{Math.round(((book.price - book.promoPrice) / book.price) * 100 / 5) * 5}%
                      </div>
                    )}
                  </div>

                  {/* Refined Add to Cart Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-md hover:bg-primary hover:text-white text-foreground font-medium rounded-xl transition-all duration-400 shadow-2xl hover:shadow-primary/20 hover:scale-[1.02]">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm tracking-wide">Ajouter</span>
                    </button>
                  </div>
                </div>
              </Link>

              {/* Product Info - Clean & Minimal */}
              <div className="p-3 md:p-4">
                {/* Category Badge - Elegant */}
                <div className="mb-2">
                  <span className="text-[10px] font-medium text-primary/70 uppercase tracking-wider">
                    {book.category === "abaya" ? "Abaya" : 
                     book.category === "hijab" ? "Hijab" : 
                     book.category === "jilbab" ? "Jilbab" : 
                     book.category === "kaftan" ? "Kaftan" : 
                     book.category === "ensemble" ? "Ensemble" : "Accessoire"}
                  </span>
                </div>

                {/* Title - Prominent */}
                <Link href={`/books/${book.id}`}>
                  <h3 className="font-medium text-card-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 text-base md:text-lg leading-snug mb-2">
                    {book.title}
                  </h3>
                </Link>

                {/* Author/Brand - Subtle */}
                <p className="text-xs text-muted-foreground/70 line-clamp-1 font-light mb-3">{book.author}</p>

                {/* Price - Elegant */}
                <div className="flex items-center justify-between pt-2.5 border-t border-border/30">
                  <div className="flex items-baseline gap-2">
                    {book.promoPrice ? (
                      <>
                        <span className="text-lg md:text-xl font-semibold text-red-600">{book.promoPrice} DT</span>
                        <span className="text-xs text-muted-foreground line-through font-light">{book.price} DT</span>
                      </>
                    ) : (
                      <span className="text-lg md:text-xl font-semibold text-foreground">{book.price} DT</span>
                    )}
                  </div>

                  {/* Mobile Quick Add - Refined */}
                  <button className="md:hidden p-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all duration-300 hover:scale-110">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
