"use client"

import Link from "next/link"
import { Sparkles, Heart, Star, Crown, Gift, Gem } from "lucide-react"

export function CategorySection() {
  const categories = [
    {
      id: "عباية",
      label: "عباءات",
      icon: Sparkles,
      description: "عباءات أنيقة لجميع المناسبات",
      href: "/books?category=عباية",
    },
    {
      id: "حجاب",
      label: "حجابات",
      icon: Heart,
      description: "حجابات فاخرة من الحرير والشيفون",
      href: "/books?category=حجاب",
    },
    {
      id: "جلباب",
      label: "جلابيب",
      icon: Star,
      description: "جلابيب عصرية ومريحة",
      href: "/books?category=جلباب",
    },
    {
      id: "قفطان",
      label: "قفاطين",
      icon: Crown,
      description: "قفاطين فاخرة للمناسبات",
      href: "/books?category=قفطان",
    },
    {
      id: "طقم",
      label: "أطقم",
      icon: Gift,
      description: "أطقم كاملة منسقة",
      href: "/books?category=طقم",
    },
    {
      id: "إكسسوارات",
      label: "إكسسوارات",
      icon: Gem,
      description: "بروشات ودبابيس وأكثر",
      href: "/books?category=إكسسوارات",
    },
  ]

  return (
    <section className="py-8 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 text-primary animate-fadeInUp">
          مجموعاتنا
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-sm md:text-base animate-slideUp">
          اكتشفي مجموعتنا من الملابس الإسلامية الأنيقة والمحتشمة
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group p-2 md:p-7 rounded-lg md:rounded-xl border border-border bg-card hover:shadow-soft-hover hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-2 md:gap-3 mb-0 md:mb-2">
                  <div className="p-3 md:p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-125 group-hover:rotate-3">
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold text-center text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {cat.label}
                  </h3>
                </div>
                <p className="text-muted-foreground text-xs md:text-sm text-center group-hover:text-foreground transition-colors duration-300 hidden lg:block">
                  {cat.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
