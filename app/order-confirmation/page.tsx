"use client"

import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckCircle2 } from "lucide-react"

export default function OrderConfirmationPage() {
  const orderNumber = `TND-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-16 animate-fadeInUp">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-2 border-green-400/40 animate-scaleIn"></div>
              <CheckCircle2 className="w-24 h-24 text-green-600 relative animate-scaleIn" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 animate-slideUp">Commande Confirmée!</h1>
          <p
            className="text-muted-foreground mb-8 text-sm md:text-base animate-slideUp"
            style={{ animationDelay: "0.1s" }}
          >
            Merci pour votre achat. Vous recevrez bientôt un email de confirmation avec les détails de votre commande.
          </p>

          {/* <div
            className="bg-white rounded-lg shadow-soft p-6 mb-8 border border-primary/20 animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-xs md:text-sm text-muted-foreground mb-2 font-medium">Numéro de suivi</p>
            <p className="text-xl md:text-2xl font-mono font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer">
              {orderNumber}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Conservez ce numéro pour votre référence</p>
          </div> */}

          <div className="space-y-3 animate-slideUp" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/books"
              className="block w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold hover:shadow-soft-hover hover:scale-105 active:scale-95"
            >
              Continuer vos achats
            </Link>
            <Link
              href="/"
              className="block w-full border border-border text-foreground py-3 rounded-lg hover:bg-muted transition-all duration-200 font-semibold hover:scale-105 active:scale-95"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
