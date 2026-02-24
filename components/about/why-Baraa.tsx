"use client"

import { motion } from "framer-motion"
import { Sparkles, Heart, Shield, Truck } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "تصاميم حصرية",
    description: "مجموعات فريدة من تصميم مصممينا للجمع بين الأناقة والحشمة بأسلوب راقٍ.",
  },
  {
    icon: Heart,
    title: "جودة فاخرة",
    description: "أقمشة نبيلة ولمسات نهائية دقيقة لراحة مثالية ومتانة استثنائية.",
  },
  {
    icon: Shield,
    title: "احترام القيم",
    description: "أزياء محتشمة وأنيقة تحتفي بجمال المرأة المسلمة العصرية.",
  },
  {
    icon: Truck,
    title: "توصيل مميز",
    description: "تغليف أنيق وتوصيل سريع في جميع أنحاء تونس لتجربة فاخرة.",
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
          لماذا براءة؟
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
