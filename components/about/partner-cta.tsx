"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function PartnerCTA() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 border border-primary/20 text-center space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">هل أنت مصممة أو متجر أزياء؟</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          انضمي إلى براءة وشاركي في ثورة الأزياء الإسلامية النسائية في تونس والعالم العربي.
        </p>
        <Link
          href="/partner"
          className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-soft hover:shadow-soft-hover"
        >
          كوني شريكة
        </Link>
      </motion.div>
    </section>
  )
}
