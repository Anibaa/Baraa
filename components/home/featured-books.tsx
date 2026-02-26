"use client"

import Link from "next/link"
import { ShoppingCart, Sparkles } from "lucide-react"
import type { Book } from "@/lib/types"

interface FeaturedBooksProps {
  books: Book[]
}

export function FeaturedBooks({ books }: FeaturedBooksProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-widest">مجموعة حصرية</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-4 tracking-wide">منتجات مميزة</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
            اكتشفي مجموعتنا المنتقاة من الملابس الإسلامية الأنيقة، المختارة بعناية لإبراز أسلوبك
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {books.map((book, idx) => (
            <div
              key={book.id}
              className="group relative bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-border/50 hover:border-primary/30 transition-all duration-700 animate-fadeInUp"
              style={{ animationDelay: `${(idx + 2) * 0.05}s` }}
            >
              {/* Image Container */}
              <Link href={`/articles/${book.id}`} className="block relative">
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
                      <span className="text-sm tracking-wide">أضف للسلة</span>
                    </button>
                  </div>
                </div>
              </Link>

              {/* Product Info - Clean & Minimal */}
              <div className="p-3 md:p-4">
                {/* Category Badge - Elegant */}
                <div className="mb-2">
                  <span className="text-[10px] font-medium text-primary/70 uppercase tracking-wider">
                    {book.category === "عباية" ? "عباية" : 
                     book.category === "حجاب" ? "حجاب" : 
                     book.category === "جلباب" ? "جلباب" : 
                     book.category === "قفطان" ? "قفطان" : 
                     book.category === "طقم" ? "طقم" : "إكسسوار"}
                  </span>
                </div>

                {/* Title - Prominent */}
                <Link href={`/articles/${book.id}`}>
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
                        <span className="text-lg md:text-xl font-semibold text-red-600">{book.promoPrice} د.ت</span>
                        <span className="text-xs text-muted-foreground line-through font-light">{book.price} د.ت</span>
                      </>
                    ) : (
                      <span className="text-lg md:text-xl font-semibold text-foreground">{book.price} د.ت</span>
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
