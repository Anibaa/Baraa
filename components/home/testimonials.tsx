import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "أميرة بن سالم",
      role: "عميلة مخلصة",
      content: "ملابس أنيقة وجودة استثنائية. براءة تفهم حقاً الأسلوب النسائي العصري",
      rating: 5,
    },
    {
      name: "سلمى الطرابلسي",
      role: "عاشقة الموضة",
      content: "أحب مجموعة براءة! قطع فريدة تجعلني أشعر بالجمال والثقة",
      rating: 5,
    },
    {
      name: "نور الحمدي",
      role: "محترفة",
      content: "مثالية للمكتب والخروجات. براءة تقدم التوازن المثالي بين الأناقة والراحة",
      rating: 4.5,
    },
  ]

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-primary animate-fadeInUp">
          آراء عميلاتنا
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-sm md:text-base animate-slideUp">
          اكتشفي ما تقوله عميلاتنا عن تجربتهن مع براءة
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group p-6 md:p-7 rounded-lg md:rounded-xl bg-white border border-border hover:border-primary/50 hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4 group-hover:gap-2 transition-all duration-300">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${i < Math.floor(testimonial.rating)
                      ? "fill-secondary text-secondary group-hover:scale-110"
                      : i < testimonial.rating
                        ? "fill-secondary text-secondary group-hover:scale-110"
                        : "fill-muted text-muted"
                      }`}
                  />
                ))}
              </div>

              <p className="text-card-foreground mb-4 text-pretty text-sm md:text-base group-hover:text-foreground transition-colors duration-300">
                {testimonial.content}
              </p>

              <div className="border-t border-border pt-4 group-hover:border-primary/20 transition-colors duration-300">
                <p className="font-semibold text-card-foreground text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
