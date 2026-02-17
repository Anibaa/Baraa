"use client"

import { motion } from "framer-motion"

export function VisionSection() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Notre Vision</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Devenir la référence de la mode islamique féminine en Tunisie et au-delà, en créant une communauté de femmes confiantes qui embrassent leur beauté naturelle et leur foi avec fierté.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            Nous aspirons à redéfinir les standards de l'élégance islamique en proposant des collections qui allient tradition et modernité, confort et raffinement, accessibilité et qualité premium.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
