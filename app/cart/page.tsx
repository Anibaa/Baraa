"use client"

import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartSummary } from "@/components/cart/cart-summary"
import { CartItems } from "@/components/cart/cart-items"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { cart } = useCart()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للمنتجات
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 animate-fadeInUp">سلة التسوق</h1>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">سلتك فارغة</p>
              <Link
                href="/books"
                className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                متابعة التسوق
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CartItems />
              </div>
              <div>
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
