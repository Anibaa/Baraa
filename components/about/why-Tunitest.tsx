"use client"

import { motion } from "framer-motion"
import { Package, CheckCircle2, Users, MessageCircle } from "lucide-react"

const features = [
  {
    icon: Package,
    title: "Livraison rapide",
    description: "Accédez à vos livres rapidement avec nos partenaires logistiques de confiance.",
  },
  {
    icon: CheckCircle2,
    title: "Livres vérifiés",
    description: "Tous nos livres sont contrôlés pour garantir leur authenticité et qualité.",
  },
  {
    icon: Users,
    title: "Partenaires locaux",
    description: "Nous collaborons avec les meilleures librairies et éditeurs tunisiens.",
  },
  {
    icon: MessageCircle,
    title: "Support client réactif",
    description: "Notre équipe est disponible pour répondre à vos questions 24/7.",
  },
]

export function WhyTunitest() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
        >
          Pourquoi Tunitest ?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-3 p-6 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-lg text-foreground">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
