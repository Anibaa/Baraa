"use client"

import { CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"

interface OrderSuccessAnimationProps {
  orderNumber: string
}

export function OrderSuccessAnimation({ orderNumber }: OrderSuccessAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 transition-all duration-500 ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      <div className="relative w-24 h-24 mb-6">
        <div
          className={`absolute inset-0 rounded-full ${
            isAnimating ? "animate-pulse bg-green-400/20" : "bg-transparent"
          } transition-all duration-500`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <CheckCircle2 className={`w-16 h-16 text-green-600 ${isAnimating ? "animate-scaleIn" : ""}`} />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Commande Réussie!</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Votre commande n° {orderNumber} a été créée avec succès. Vous recevrez bientôt une confirmation par email.
      </p>
    </div>
  )
}
