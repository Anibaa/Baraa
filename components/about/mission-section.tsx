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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">مهمتنا</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            تقديم أزياء أنيقة ومحتشمة وعصرية للنساء المسلمات تحتفي بهويتهن مع احترام قيمهن. نؤمن بأن كل امرأة تستحق أن تشعر بالجمال والثقة والأصالة في ملابسها.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            في براءة، نجمع بين الجودة الاستثنائية والتصاميم المعاصرة واحترام التقاليد لإنشاء قطع خالدة ترافق المرأة العصرية في جميع لحظات حياتها.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
