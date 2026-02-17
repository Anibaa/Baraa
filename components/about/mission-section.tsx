"use client"

import { motion } from "framer-motion"

export function MissionSection() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Notre Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Offrir aux femmes musulmanes une mode élégante, pudique et moderne qui célèbre leur identité tout en respectant leurs valeurs. Nous croyons que chaque femme mérite de se sentir belle, confiante et authentique dans ses vêtements.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            Chez Baraa - براءة, nous combinons qualité exceptionnelle, designs contemporains et respect des traditions pour créer des pièces intemporelles qui accompagnent la femme moderne dans tous les moments de sa vie.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
