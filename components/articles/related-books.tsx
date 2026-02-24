"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import type { Book } from "@/lib/types"

interface RelatedBooksProps {
  books: Book[]
}

export function RelatedBooks({ books }: RelatedBooksProps) {
  if (!books.length) return null

  return (
    <section className="py-12 md:py-16 border-t border-border animate-fadeInUp">
      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2 md:mb-3">Livres Connexes</h2>
      <p className="text-muted-foreground mb-8 md:mb-10 text-sm md:text-base">
        Découvrez d'autres livres similaires qui pourraient vous intéresser
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book, idx) => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="group bg-card rounded-lg md:rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="relative overflow-hidden bg-muted aspect-[3/4]">
              <img
                src={book.image || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 md:px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                {book.language === "ar" ? "Arabe" : book.language === "fr" ? "FR" : "EN"}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="p-3 rounded-full bg-secondary hover:bg-secondary/90 text-foreground transition-all duration-200 hover:scale-110 shadow-lg">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-5">
              <h3 className="font-semibold text-card-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors text-sm md:text-base">
                {book.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-1">{book.author}</p>

              <div className="flex items-center justify-between">
                <span className="text-base md:text-lg font-bold text-primary">{book.price} د.ت</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
