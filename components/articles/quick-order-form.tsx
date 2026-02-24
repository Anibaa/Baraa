"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react"
import type { Book, Size, Color } from "@/lib/types"

interface QuickOrderFormProps {
  book: Book
  quantity: number
  selectedSize: Size
  selectedColor: Color
}

export function QuickOrderForm({ book, quantity, selectedSize, selectedColor }: QuickOrderFormProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  })

  const DELIVERY_FEE = 8
  const price = book.promoPrice || book.price
  const subtotal = price * quantity
  const totalPrice = subtotal + DELIVERY_FEE

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const orderData = {
        items: [{
          bookId: book.id,
          quantity,
          size: selectedSize,
          color: selectedColor,
          price
        }],
        totalPrice,
        customerName: formData.name,
        customerEmail: "",
        customerPhone: formData.phone,
        address: formData.address,
        paymentMethod: "Cash",
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "فشل في إنشاء الطلب")
      }

      setIsSuccess(true)
      setTimeout(() => {
        router.push("/order-confirmation")
      }, 1500)
    } catch (err) {
      console.error("Order error:", err)
      alert(err instanceof Error ? err.message : "حدث خطأ أثناء إنشاء الطلب")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-center text-xs text-primary hover:text-primary/80 font-semibold underline transition-colors"
      >
        طلب سريع
      </button>
    )
  }

  if (isSuccess) {
    return (
      <div className="p-3 bg-green-50 border border-green-200 rounded-lg animate-scaleIn">
        <div className="flex items-center gap-2 text-green-700 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-semibold">تم إرسال الطلب!</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-3 p-3 bg-accent/5 border border-accent/20 rounded-lg animate-slideDown">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold text-foreground">طلب سريع</h4>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-2 py-1.5 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
            placeholder="الاسم الكامل"
            disabled={isLoading}
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full pl-7 pr-2 py-1.5 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
            placeholder="رقم الهاتف"
            disabled={isLoading}
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-2 top-2 w-3 h-3 text-muted-foreground" />
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            rows={2}
            className="w-full pl-7 pr-2 py-1.5 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
            placeholder="عنوان التوصيل"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1 pt-1 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">المجموع الفرعي:</span>
            <span className="text-xs font-medium">{subtotal.toFixed(2)} د.ت</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">التوصيل:</span>
            <span className="text-xs font-medium">{DELIVERY_FEE.toFixed(2)} د.ت</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-border">
            <span className="text-xs font-semibold text-foreground">المجموع:</span>
            <span className="text-sm font-bold text-primary">{totalPrice.toFixed(2)} د.ت</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-accent-foreground font-semibold py-1.5  rounded-lg text-xs transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            "اشتر الآن"
          )}
        </button>
      </form>
    </div>
  )
}
