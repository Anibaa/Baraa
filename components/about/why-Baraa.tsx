"use client"

import { motion } from "framer-motion"
import { Sparkles, Heart, Shield, Truck } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Designs exclusifs",
    description: "Collections uniques créées par nos designers pour allier élégance et pudeur avec raffinement.",
  },
  {
    icon: Heart,
    title: "Qualité premium",
    description: "Tissus nobles et finitions soignées pour un confort optimal et une durabilité exceptionnelle.",
  },
  {
    icon: Shield,
    title: "Respect des valeurs",
    description: "Mode pudique et élégante qui célèbre la beauté de la femme musulmane moderne.",
  },
  {
    icon: Truck,
    title: "Livraison soignée",
    description: "Emballage élégant et livraison rapide partout en Tunisie pour une expérience premium.",
  },
]

export function WhyBaraa() {
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
          Pourquoi Baraa ?
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
