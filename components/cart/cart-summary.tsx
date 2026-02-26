"use client"

import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CartSummary() {
  const { cart, subtotal, total } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 sticky top-20">
      <h2 className="text-lg font-bold text-foreground mb-6">ملخص السلة</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">المنتجات ({cart.length})</span>
          <span className="font-semibold text-foreground">{subtotal.toFixed(2)} د.ت</span>
        </div>
        <div className="flex justify-between pt-4 border-t border-border">
          <span className="font-bold text-foreground">المجموع</span>
          <span className="font-bold text-lg text-primary">{total.toFixed(2)} د.ت</span>
        </div>
      </div>

      {cart.length > 0 ? (
        <Link href="/checkout" className="w-full block">
          <Button className="w-full py-3 rounded-lg font-semibold">المتابعة للدفع</Button>
        </Link>
      ) : (
        <Button disabled className="w-full py-3 rounded-lg font-semibold">
          السلة فارغة
        </Button>
      )}

      <Link
        href="/articles"
        className="block text-center text-sm text-primary hover:text-primary/80 mt-4 transition-colors"
      >
        متابعة التسوق
      </Link>
    </div>
  )
}
