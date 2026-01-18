import Link from "next/link"
import { BookPlus, Users, Zap } from "lucide-react"

export function PromotionBanner() {
  const features = [
    {
      icon: Users,
      text: "Accès à des millions d'étudiants",
      delay: "0s",
    },
    {
      icon: Zap,
      text: "Support technique spécialisé",
      delay: "0.1s",
    },
    {
      icon: BookPlus,
      text: "Outils marketing puissants",
      delay: "0.2s",
    },
  ]

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-r from-primary via-primary/90 to-primary/80 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl animate-float"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 animate-slideInLeft">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-balance">
              Ajoutez vos livres et devenez partenaire
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8">
              Rejoignez notre réseau de partenaires et faites partie d'une plateforme éducative intégrée pour les
              étudiants tunisiens
            </p>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-secondary hover:bg-secondary/90 text-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-soft-hover hover:scale-105 active:scale-95 animate-slideUp"
            >
              <BookPlus className="w-5 h-5" />
              Ajouter votre livre
            </Link>
          </div>

          <div className="flex-1 flex justify-center md:justify-end animate-slideInRight">
            <div className="w-full md:w-auto p-6 md:p-8 bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 group">
              <div className="space-y-4">
                {features.map((feature, idx) => {
                  const IconComponent = feature.icon
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 group/item animate-slideUp"
                      style={{ animationDelay: feature.delay }}
                    >
                      <div className="p-2 rounded-lg bg-secondary/20 group-hover/item:bg-secondary/40 group-hover/item:scale-110 transition-all duration-300 flex-shrink-0 mt-1">
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                      </div>
                      <span className="text-white text-sm md:text-base font-medium group-hover/item:text-yellow-200 transition-colors duration-300">
                        {feature.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
