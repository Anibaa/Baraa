"use client"

import { useCart } from "@/hooks/use-cart"
import { Trash2, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { getColorLabel } from "@/lib/color-utils"

export function CartItems() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className="divide-y divide-border">
        {cart.map((item, index) => {
          const price = item.book.promoPrice || item.book.price
          return (
            <div key={`${item.book.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="p-6 hover:bg-muted/30 transition-colors">
              <div className="flex gap-4">
                <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={item.book.image || "/placeholder.svg"}
                    alt={item.book.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{item.book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.book.author}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full font-medium">
                      Taille: {item.selectedSize}
                    </span>
                    <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full font-medium">
                      {getColorLabel(item.selectedColor)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-primary">{price} د.ت</p>
                    {item.book.promoPrice && (
                      <p className="text-sm text-muted-foreground line-through">{item.book.price} د.ت</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.book.id, item.selectedSize, item.selectedColor)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.book.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                      className="p-1 hover:bg-background rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.book.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                      className="p-1 hover:bg-background rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
