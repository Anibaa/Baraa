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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">رؤيتنا</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            أن نصبح المرجع في الأزياء الإسلامية النسائية في تونس وخارجها، من خلال إنشاء مجتمع من النساء الواثقات اللواتي يحتضن جمالهن الطبيعي وإيمانهن بفخر.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            نطمح لإعادة تعريف معايير الأناقة الإسلامية من خلال تقديم مجموعات تجمع بين التقليد والحداثة، الراحة والرقي، السهولة والجودة الفاخرة.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
