"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Package, Truck, ShieldCheck, Zap, Ruler, Palette, Shirt } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { isFavorited } from "@/lib/personalization"
import { BookGallery } from "./book-gallery"
import { QuickOrderForm } from "./quick-order-form"
import { getColorLabel, getColorCodes, parseColorOptions } from "@/lib/color-utils"
import type { Book, Size, Color, ColorOption } from "@/lib/types"

interface BookDetailsProps {
  book: Book
}

export function BookDetails({ book }: BookDetailsProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<Size>(book.sizes[0])
  const [selectedColor, setSelectedColor] = useState<Color>(book.colors[0])
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentImage, setCurrentImage] = useState<string>(book.image)

  // Parse color options - merge both colors and colorOptions
  const colorOptions: ColorOption[] = (() => {
    const optionsMap = new Map<string, ColorOption>()
    
    // First, add all colorOptions from book.colorOptions (these have imageUrl)
    if (book.colorOptions && book.colorOptions.length > 0) {
      book.colorOptions.forEach(option => {
        optionsMap.set(option.value, option)
      })
    }
    
    // Then, for each color in book.colors, use existing option or create new one
    return book.colors.map(color => {
      if (optionsMap.has(color)) {
        return optionsMap.get(color)!
      } else {
        // Create a new ColorOption using parseColorOptions
        const parsed = parseColorOptions([color])[0]
        return {
          ...parsed,
          imageUrl: null // Ensure imageUrl is set to null for colors without options
        }
      }
    })
  })()

  useEffect(() => {
    setIsFavorite(isFavorited(book.id))
  }, [book.id])

  // Handle color selection and image change
  const handleColorSelect = (color: Color) => {
    setSelectedColor(color)
    
    // Find the color option to check if it has a linked image
    const colorOption = colorOptions.find(opt => opt.value === color)
    if (colorOption?.imageUrl) {
      setCurrentImage(colorOption.imageUrl)
    } else {
      // Fallback to default image
      setCurrentImage(book.image)
    }
  }

  const handleAddToCart = () => {
    addToCart(book, quantity, selectedSize, selectedColor)
    toast({
      title: "نجح",
      description: `تمت إضافة ${quantity} منتج "${book.title}" (${selectedSize}, ${getColorLabel(selectedColor)}) إلى السلة`,
    })
  }

  const handleBuyNow = async () => {
    setIsLoading(true)
    addToCart(book, quantity, selectedSize, selectedColor)
    await new Promise((resolve) => setTimeout(resolve, 300))
    router.push("/checkout")
  }

  // Category labels in Arabic
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      "عباية": "عباية",
      "حجاب": "حجاب",
      "جلباب": "جلباب",
      "قفطان": "قفطان",
      "طقم": "طقم",
      "إكسسوارات": "إكسسوارات",
      // Legacy support
      abaya: "عباية",
      hijab: "حجاب",
      jilbab: "جلباب",
      kaftan: "قفطان",
      ensemble: "طقم",
      accessories: "إكسسوارات"
    }
    return labels[category] || category
  }

  // Render color circle (supports single or combined colors with separate circles)
  const renderColorCircle = (colorOption: ColorOption, isSelected: boolean) => {
    const { colorCodes } = colorOption
    
    if (colorCodes && colorCodes.length > 1) {
      // Combined colors - show 2 separate circles side by side (reversed for RTL)
      return (
        <div
          className={`flex gap-1 p-1 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
            isSelected
              ? "ring-4 ring-primary ring-offset-2 shadow-lg bg-background"
              : "ring-2 ring-border hover:ring-primary/50 bg-background"
          }`}
          title={colorOption.label}
        >
          {colorCodes.slice().reverse().map((code, index) => {
            const needsBorder = code.toLowerCase() === "#ffffff" || code.toLowerCase() === "#fff"
            return (
              <div
                key={index}
                className={`w-5 h-10 ${index === 0 ? 'rounded-r-full' : 'rounded-l-full'} ${
                  needsBorder ? "border border-gray-300" : ""
                }`}
                style={{ backgroundColor: code }}
              />
            )
          })}
        </div>
      )
    } else {
      // Single color
      const bgColor = colorCodes && colorCodes[0] ? colorCodes[0] : "#9CA3AF"
      const needsBorder = bgColor.toLowerCase() === "#ffffff" || bgColor.toLowerCase() === "#fff"
      
      return (
        <div
          className={`w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
            needsBorder ? "border-2 border-gray-300" : ""
          } ${
            isSelected
              ? "ring-4 ring-primary ring-offset-2 shadow-lg"
              : "ring-2 ring-border hover:ring-primary/50"
          }`}
          style={{ backgroundColor: bgColor }}
          title={colorOption.label}
        />
      )
    }
  }

  // Use images array if available, otherwise fall back to single image
  const galleryImages = book.images && book.images.length > 0 ? book.images : [book.image]
  
  // Create gallery with current image as first
  const displayGallery = [currentImage, ...galleryImages.filter(img => img !== currentImage)]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 animate-fadeInUp">
      {/* Gallery */}
      <div>
        <BookGallery images={displayGallery} title={book.title} />
      </div>

      {/* Details */}
      <div className="flex flex-col h-full">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-white bg-primary px-2.5 py-1 rounded-full font-semibold">
            {getCategoryLabel(book.category)}
          </span>
          <span className="text-xs text-foreground bg-accent px-2.5 py-1 rounded-full font-semibold">
            {book.sizes.length} مقاس{book.sizes.length > 1 ? 'ات' : ''}
          </span>
          <span className="text-xs text-foreground bg-secondary px-2.5 py-1 rounded-full font-semibold">
            {book.colors.length} لون{book.colors.length > 1 ? '' : ''}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2 text-balance">{book.title}</h1>

        <p className="text-base md:text-lg text-muted-foreground mb-4 font-medium">من: {book.author}</p>

        {/* Size Selection */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-foreground mb-2">
            المقاس
          </label>
          <div className="flex flex-wrap gap-2">
            {book.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1.5 text-sm rounded-lg border-2 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                  selectedSize === size
                    ? "border-primary bg-primary text-white shadow-md"
                    : "border-border bg-background hover:border-primary/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-foreground mb-2">
            اللون: <span className="text-primary">{getColorLabel(selectedColor)}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption.value}
                onClick={() => handleColorSelect(colorOption.value)}
                className="relative"
              >
                {renderColorCircle(colorOption, selectedColor === colorOption.value)}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors overflow-hidden">
            <h3 className="font-semibold text-card-foreground mb-2 text-sm">الوصف</h3>
            <p
              className={`text-muted-foreground text-pretty text-xs md:text-sm leading-relaxed wrap-break-word whitespace-pre-wrap ${!isExpanded ? "line-clamp-2" : ""
                }`}
            >
              {book.description}
            </p>
            {book.description.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1.5 text-primary font-semibold hover:underline text-xs"
              >
                {isExpanded ? "عرض أقل" : "عرض المزيد"}
              </button>
            )}
          </div>
        )}

        {/* Specifications */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="p-2.5 border border-border rounded-lg hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-1.5 mb-1">
              <Ruler className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <p className="text-[10px] text-muted-foreground">المقاس</p>
            </div>
            <p className="font-semibold text-card-foreground text-sm">
              {selectedSize}
            </p>
          </div>

          <div className="p-2.5 border border-border rounded-lg hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-1.5 mb-1">
              <Palette className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <p className="text-[10px] text-muted-foreground">اللون</p>
            </div>
            <p className="font-semibold text-card-foreground text-sm truncate">
              {getColorLabel(selectedColor)}
            </p>
          </div>

          <div className="p-2.5 border border-border rounded-lg hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-1.5 mb-1">
              <Shirt className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <p className="text-[10px] text-muted-foreground">الفئة</p>
            </div>
            <p className="font-semibold text-card-foreground text-sm">
              {getCategoryLabel(book.category)}
            </p>
          </div>

          {book.fabric && (
            <div className="p-2.5 border border-border rounded-lg hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-1.5 mb-1">
                <Package className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <p className="text-[10px] text-muted-foreground">القماش</p>
              </div>
              <p className="font-semibold text-card-foreground text-sm">
                {book.fabric}
              </p>
            </div>
          )}
        </div>

        {/* Care Instructions */}
        {book.care && (
          <div className="mb-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <h3 className="font-semibold text-card-foreground mb-2 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              العناية
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {book.care}
            </p>
          </div>
        )}

        {/* Price and Actions */}
        <div className="mt-auto p-4 bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors relative overflow-hidden">
          {book.promoPrice && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md animate-pulse">
              -{Math.round(((book.price - book.promoPrice) / book.price) * 100 / 5) * 5}%
            </div>
          )}

          <div className="flex items-end gap-2 mb-3">
            <div className="text-3xl font-bold text-primary">
              {book.promoPrice ? `${book.promoPrice} د.ت` : `${book.price} د.ت`}
            </div>
            {book.promoPrice && (
              <div className="text-lg text-muted-foreground line-through mb-1 opacity-70">
                {book.price} د.ت
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95 font-semibold text-sm"
            >
              −
            </button>
            <span className="text-lg font-bold text-card-foreground min-w-10 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95 font-semibold text-sm"
            >
              +
            </button>
          </div>

          <div className="flex flex-col gap-2 mb-3">

            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-soft-hover hover:scale-105 active:scale-95 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              أضف إلى السلة
            </button>
            
            {/* Quick Order Form */}
            <QuickOrderForm 
              book={book}
              quantity={quantity}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />
          </div>

          {/* Trust Badges */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>توصيل سريع</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>دفع آمن</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>منتجات أصلية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
