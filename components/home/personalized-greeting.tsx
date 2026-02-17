"use client"

import { Sparkles } from "lucide-react"

export function PersonalizedGreeting() {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bienvenue chez Baraa"
    if (hour < 18) return "Bon après-midi chez Baraa"
    return "Bonsoir chez Baraa"
  }

  const getSubtitle = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Commencez votre journée avec élégance et style"
    if (hour < 18) return "Découvrez l'élégance intemporelle de la mode islamique"
    return "Explorez notre collection de mode féminine de luxe"
  }

  return (
    <div className="bg-linear-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 rounded-lg md:rounded-xl p-4 md:p-8 animate-slideUp mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      <div className="relative z-10 flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            {getGreeting()}
            <span className="text-primary text-lg md:text-2xl">🌙</span>
          </h2>
          <p className="text-muted-foreground text-xs md:text-base">
            {getSubtitle()}
          </p>
        </div>
      </div>
    </div>
  )
}
