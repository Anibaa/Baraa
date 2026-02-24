"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { X, Search, Loader2, ChevronDown, Filter, ArrowUpDown } from "lucide-react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Category, Size, Color } from "@/lib/types"
import { cn } from "@/lib/utils"

export function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Mobile collapsible state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Get current filters
  const currentFilters = useMemo(() => ({
    category: searchParams.get("category") || "",
    size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
    sort: searchParams.get("sort") || "",
    search: searchParams.get("search") || ""
  }), [searchParams])

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(currentFilters.search)
  }, [currentFilters.search])

  // Search handler
  const handleSearch = useCallback((query: string) => {
    setIsSearching(true)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams)

      if (query.trim()) {
        params.set("search", query.trim())
      } else {
        params.delete("search")
      }

      params.delete("page")
      router.push(`/books?${params.toString()}`)
      setIsSearching(false)
    }, 300)
  }, [router, searchParams])

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    handleSearch(value)
  }, [handleSearch])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    handleSearch("")
  }, [handleSearch])

  // Filter change handler
  const handleFilterChange = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    params.delete("page")
    router.push(`/books?${params.toString()}`)
  }, [router, searchParams])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    router.push("/books")
  }, [router])

  // Filter data - ALL IN ARABIC
  const filterData = useMemo(() => ({
    categories: [
      { value: "عباية" as Category, label: "عباءات", icon: "👗", shortLabel: "عباية" },
      { value: "حجاب" as Category, label: "حجابات", icon: "🧕", shortLabel: "حجاب" },
      { value: "جلباب" as Category, label: "جلابيب", icon: "👘", shortLabel: "جلباب" },
      { value: "قفطان" as Category, label: "قفاطين", icon: "✨", shortLabel: "قفطان" },
      { value: "طقم" as Category, label: "أطقم", icon: "👔", shortLabel: "طقم" },
      { value: "إكسسوارات" as Category, label: "إكسسوارات", icon: "💎", shortLabel: "إكسسوارات" },
    ],
    colors: [
      { value: "أسود" as Color, label: "أسود", icon: "⚫", shortLabel: "أسود" },
      { value: "أبيض" as Color, label: "أبيض", icon: "⚪", shortLabel: "أبيض" },
      { value: "بيج" as Color, label: "بيج", icon: "🟤", shortLabel: "بيج" },
      { value: "ذهبي" as Color, label: "ذهبي", icon: "🟡", shortLabel: "ذهبي" },
      { value: "برونزي" as Color, label: "برونزي", icon: "🟠", shortLabel: "برونزي" },
      { value: "وردي" as Color, label: "وردي", icon: "🌸", shortLabel: "وردي" },
      { value: "أزرق" as Color, label: "أزرق", icon: "🔵", shortLabel: "أزرق" },
      { value: "أخضر" as Color, label: "أخضر", icon: "🟢", shortLabel: "أخضر" },
      { value: "عنابي" as Color, label: "عنابي", icon: "🔴", shortLabel: "عنابي" },
    ],
    sortOptions: [
      { value: "newest", label: "الأحدث", icon: "🆕" },
      { value: "price-asc", label: "السعر: من الأقل للأعلى", icon: "💰" },
      { value: "price-desc", label: "السعر: من الأعلى للأقل", icon: "💎" },
      { value: "popular", label: "الأكثر شعبية", icon: "⭐" },
    ]
  }), [])

  const hasActiveFilters = currentFilters.category || currentFilters.size || currentFilters.color || currentFilters.search
  const activeFiltersCount = Object.values(currentFilters).filter(v => v && v !== "newest").length

  // Mobile Quick Filters
  const MobileQuickFilters = () => (
    <div className="lg:hidden">
      <Collapsible open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-11 px-4 border-2 border-dashed hover:border-solid hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">تصفية</span>
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs text-primary font-semibold">
                    {activeFiltersCount}
                  </span>
                </div>
              )}
            </div>
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-200",
              isMobileFiltersOpen && "rotate-180"
            )} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3">
          <div className="space-y-4 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-sm">
            {/* Categories */}
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground font-medium">الفئة</span>
              <div className="flex flex-wrap gap-2">
                {filterData.categories.map((item) => {
                  const isSelected = currentFilters.category === item.value
                  return (
                    <button
                      key={item.value}
                      onClick={() => handleFilterChange("category", isSelected ? "" : item.value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                          : "bg-background hover:bg-muted border-border hover:border-primary/30 hover:scale-105"
                      )}
                    >
                      <span>{item.icon}</span>
                      <span>{item.shortLabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground font-medium">اللون</span>
              <div className="flex flex-wrap gap-2">
                {filterData.colors.map((item) => {
                  const isSelected = currentFilters.color === item.value
                  return (
                    <button
                      key={item.value}
                      onClick={() => handleFilterChange("color", isSelected ? "" : item.value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                          : "bg-background hover:bg-muted border-border hover:border-primary/30 hover:scale-105"
                      )}
                    >
                      <span>{item.icon}</span>
                      <span>{item.shortLabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground font-medium">ترتيب حسب</span>
              <div className="flex flex-wrap gap-2">
                {filterData.sortOptions.map((item) => {
                  const isSelected = currentFilters.sort === item.value
                  return (
                    <button
                      key={item.value}
                      onClick={() => handleFilterChange("sort", isSelected ? "" : item.value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                          : "bg-background hover:bg-muted border-border hover:border-primary/30 hover:scale-105"
                      )}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="w-full px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                مسح جميع الفلاتر
              </button>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )

  // Desktop RadioGroup component
  const DesktopRadioGroup = ({ title, items, currentValue, filterKey }: {
    title: string
    items: Array<{ value: string; label: string; icon: string; shortLabel: string }>
    currentValue: string
    filterKey: string
  }) => (
    <div className="hidden lg:block space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <div className="w-1 h-4 bg-primary rounded-full" />
        {title}
      </h3>
      <div className="space-y-2 pl-3">
        {items.map((item) => {
          const isSelected = currentValue === item.value
          return (
            <button
              key={item.value}
              onClick={() => handleFilterChange(filterKey, isSelected ? "" : item.value)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group border-2",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg border-primary/30 scale-[1.02]"
                  : "bg-muted/20 hover:bg-muted/40 border-transparent hover:scale-[1.01] hover:shadow-md hover:border-border/50"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {isSelected && (
                <div className="w-2.5 h-2.5 bg-primary-foreground rounded-full shadow-sm" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Search Section */}
      <div className="space-y-3 lg:space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <div className="w-1 h-4 bg-primary rounded-full" />
          بحث
          {currentFilters.search && (
            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-primary rounded-full animate-pulse shadow-sm" />
          )}
        </h3>
        <div className="relative group">
          <Search className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="ابحث عن المنتجات..."
            className="pr-10 pl-10 lg:pr-12 lg:pl-12 h-10 lg:h-12 text-sm bg-background/90 border-2 border-border/60 focus:border-primary focus:bg-background transition-all duration-200 rounded-xl shadow-sm focus:shadow-md"
          />
          <div className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 flex items-center">
            {isSearching ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            ) : searchQuery ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-6 w-6 p-0 hover:bg-muted rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile Quick Filters */}
      <MobileQuickFilters />

      {/* Desktop Filter Sections */}
      <div className="hidden lg:block space-y-6">
        {/* Sort Options */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            ترتيب حسب
          </h3>
          <select
            value={currentFilters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background transition-all"
          >
            <option value="">افتراضي</option>
            {filterData.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
        </div>

        <DesktopRadioGroup
          title="الفئة"
          items={filterData.categories}
          currentValue={currentFilters.category}
          filterKey="category"
        />

        <DesktopRadioGroup
          title="اللون"
          items={filterData.colors}
          currentValue={currentFilters.color}
          filterKey="color"
        />

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="w-full px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors border-2 border-dashed border-destructive/30"
          >
            مسح جميع الفلاتر
          </button>
        )}
      </div>

      {/* Tip */}
      <div className="relative bg-linear-to-r from-muted/60 to-muted/40 rounded-xl p-3 lg:p-4 border border-border/50 shadow-sm">
        <p className="text-xs text-muted-foreground flex items-center gap-2 font-medium">
          <span className="text-base lg:text-lg">💡</span>
          <span className="lg:hidden">استخدمي الفلاتر للتحديد</span>
          <span className="hidden lg:inline">اجمعي بين الفلاتر للعثور على المنتج المثالي</span>
        </p>
      </div>
    </div>
  )
}
