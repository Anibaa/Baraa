"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import type { Category, Level, Language } from "@/lib/types"

export function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Reset to page 1 when filters change
    params.delete("page")
    router.push(`/books?${params.toString()}`)
  }

  const currentCategory = searchParams.get("category") || ""
  const currentLevel = searchParams.get("level") || ""
  const currentLanguage = searchParams.get("language") || ""

  const categories: { value: Category; label: string }[] = [
    { value: "writing", label: "Writing" },
    { value: "cours", label: "Cours" },
    { value: "devoirs", label: "Devoirs" },
  ]

  const levels: { value: Level; label: string }[] = [
    { value: "primary", label: "Niveau Primaire" },
    { value: "secondary", label: "Niveau Secondaire" },
    { value: "university", label: "Niveau Université" },
  ]

  const languages: { value: Language; label: string }[] = [
    { value: "ar", label: "Arabe" },
    { value: "fr", label: "Français" },
    { value: "en", label: "Anglais" },
  ]

  const hasActiveFilters = currentCategory || currentLevel || currentLanguage

  return (
    <aside className="space-y-6 animate-slideInLeft">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={() => router.push("/books")}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-all duration-200 hover:border-primary font-medium"
        >
          <X className="w-4 h-4" />
          Réinitialiser les Filtres
        </button>
      )}

      {/* Category Filter */}
      <div className="p-4 md:p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
        <h3 className="font-semibold text-card-foreground mb-4 text-sm md:text-base">Catégorie</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat.value}
                checked={currentCategory === cat.value}
                onChange={() => handleFilterChange("category", cat.value)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <span className="text-sm text-muted-foreground group-hover:text-card-foreground transition-colors">
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Level Filter */}
      <div className="p-4 md:p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
        <h3 className="font-semibold text-card-foreground mb-4 text-sm md:text-base">Niveau</h3>
        <div className="space-y-3">
          {levels.map((level) => (
            <label key={level.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value={level.value}
                checked={currentLevel === level.value}
                onChange={() => handleFilterChange("level", currentLevel === level.value ? null : level.value)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
              <span className="text-sm text-muted-foreground group-hover:text-card-foreground transition-colors">
                {level.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Language Filter */}
      <div className="p-4 md:p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
        <h3 className="font-semibold text-card-foreground mb-4 text-sm md:text-base">Langue</h3>
        <div className="space-y-3">
          {languages.map((lang) => (
            <label key={lang.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value={lang.value}
                checked={currentLanguage === lang.value}
                onChange={() => handleFilterChange("language", currentLanguage === lang.value ? null : lang.value)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
              <span className="text-sm text-muted-foreground group-hover:text-card-foreground transition-colors">
                {lang.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
