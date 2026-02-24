"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppContact() {
  const whatsappLink = "https://wa.me/21698711586?text=مرحباً%20براءة،%20أود%20الحصول%20على%20مزيد%20من%20المعلومات"

  return (
    <section className="px-4 md:px-8 py-12 md:py-20 bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">تواصلي معنا بسهولة</h2>
        <p className="text-lg text-muted-foreground">لديك سؤال حول مجموعاتنا؟ فريق براءة متاح على واتساب لتقديم المشورة لك.</p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-soft hover:shadow-soft-hover"
        >
          <MessageCircle className="w-5 h-5" />
          تواصلي مع براءة عبر واتساب
        </a>
      </motion.div>
    </section>
  )
}
