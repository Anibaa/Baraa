"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            من نحن <span className="text-primary">براءة</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          أزياء إسلامية أنيقة وعصرية للمرأة المسلمة اليوم.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/books"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-soft hover:shadow-soft-hover"
          >
            اكتشفي المجموعة
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
