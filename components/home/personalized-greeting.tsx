"use client"

export function PersonalizedGreeting() {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bienvenue le matin sur Najahi"
    if (hour < 18) return "Bon après-midi sur Najahi"
    return "Bonsoir sur Najahi"
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg md:rounded-xl p-6 md:p-8 animate-slideUp mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{getGreeting()}</h2>
      <p className="text-muted-foreground text-sm md:text-base">
        Explorez notre collection de livres éducatifs pour tous les niveaux scolaires
      </p>
    </div>
  )
}
