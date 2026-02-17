"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Package, Truck, ShieldCheck, Zap, Ruler, Palette, Shirt } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { isFavorited } from "@/lib/personalization"
import { BookGallery } from "./book-gallery"
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

  // Parse color options - merge both colors and colorOptions
  const colorOptions: ColorOption[] = (() => {
    const allColors = new Set<string>()
    const optionsMap = new Map<string, ColorOption>()
    
    // Add all colors from book.colors
    book.colors.forEach(color => allColors.add(color))
    
    // Add all colors from book.colorOptions
    if (book.colorOptions) {
      book.colorOptions.forEach(option => {
        allColors.add(option.value)
        optionsMap.set(option.value, option)
      })
    }
    
    // Create ColorOption for each unique color
    return Array.from(allColors).map(color => {
      // Use existing colorOption if available, otherwise parse it
      return optionsMap.get(color) || parseColorOptions([color])[0]
    })
  })()

  useEffect(() => {
    setIsFavorite(isFavorited(book.id))
  }, [book.id])

  const handleAddToCart = () => {
    addToCart(book, quantity, selectedSize, selectedColor)
    toast({
      title: "Succès",
      description: `${quantity} article(s) "${book.title}" (${selectedSize}, ${getColorLabel(selectedColor)}) ajouté(s) au panier`,
    })
  }

  const handleBuyNow = async () => {
    setIsLoading(true)
    addToCart(book, quantity, selectedSize, selectedColor)
    await new Promise((resolve) => setTimeout(resolve, 300))
    router.push("/checkout")
  }

  // Category labels
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      abaya: "Abaya",
      hijab: "Hijab",
      jilbab: "Jilbab",
      kaftan: "Kaftan",
      ensemble: "Ensemble",
      accessories: "Accessoires"
    }
    return labels[category] || category
  }

  // Render color circle (supports single or combined colors with separate circles)
  const renderColorCircle = (colorOption: ColorOption, isSelected: boolean) => {
    const { colorCodes } = colorOption
    
    if (colorCodes && colorCodes.length > 1) {
      // Combined colors - show 2 separate circles side by side
      return (
        <div
          className={`flex gap-1 p-1 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
            isSelected
              ? "ring-4 ring-primary ring-offset-2 shadow-lg bg-background"
              : "ring-2 ring-border hover:ring-primary/50 bg-background"
          }`}
          title={colorOption.label}
        >
          {colorCodes.map((code, index) => {
            const needsBorder = code.toLowerCase() === "#ffffff" || code.toLowerCase() === "#fff"
            return (
              <div
                key={index}
                className={`w-5 h-10 ${index === 0 ? 'rounded-l-full' : 'rounded-r-full'} ${
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 animate-fadeInUp">
      {/* Gallery */}
      <div>
        <BookGallery images={galleryImages} title={book.title} />
      </div>

      {/* Details */}
      <div>
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs md:text-sm text-white bg-primary px-3 py-1 rounded-full font-semibold">
            {getCategoryLabel(book.category)}
          </span>
          <span className="text-xs md:text-sm text-foreground bg-accent px-3 py-1 rounded-full font-semibold">
            {book.sizes.length} taille{book.sizes.length > 1 ? 's' : ''} disponible{book.sizes.length > 1 ? 's' : ''}
          </span>
          <span className="text-xs md:text-sm text-foreground bg-secondary px-3 py-1 rounded-full font-semibold">
            {book.colors.length} couleur{book.colors.length > 1 ? 's' : ''} disponible{book.colors.length > 1 ? 's' : ''}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-3 md:mb-4 text-balance">{book.title}</h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 font-medium">Par: {book.author}</p>

        {/* Size Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Choisir la taille
          </label>
          <div className="flex flex-wrap gap-2">
            {book.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
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
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Choisir la couleur: <span className="text-primary">{getColorLabel(selectedColor)}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption.value}
                onClick={() => setSelectedColor(colorOption.value)}
                className="relative"
              >
                {renderColorCircle(colorOption, selectedColor === colorOption.value)}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <div className="mb-8 p-6 md:p-7 bg-primary/5 border border-primary/20 rounded-lg md:rounded-xl hover:border-primary/40 transition-colors overflow-hidden">
            <h3 className="font-semibold text-card-foreground mb-3 text-base md:text-lg">Description</h3>
            <p
              className={`text-muted-foreground text-pretty text-sm md:text-base leading-relaxed wrap-break-word whitespace-pre-wrap ${!isExpanded ? "line-clamp-2" : ""
                }`}
            >
              {book.description}
            </p>
            {book.description.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-primary font-semibold hover:underline text-sm"
              >
                {isExpanded ? "Voir moins" : "Voir plus"}
              </button>
            )}
          </div>
        )}

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 md:p-5 border border-border rounded-lg md:rounded-xl hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="w-4 h-4 text-primary" />
              <p className="text-xs md:text-sm text-muted-foreground">Taille sélectionnée</p>
            </div>
            <p className="font-semibold text-card-foreground text-sm md:text-base">
              {selectedSize}
            </p>
          </div>

          <div className="p-4 md:p-5 border border-border rounded-lg md:rounded-xl hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-primary" />
              <p className="text-xs md:text-sm text-muted-foreground">Couleur sélectionnée</p>
            </div>
            <p className="font-semibold text-card-foreground text-sm md:text-base">
              {getColorLabel(selectedColor)}
            </p>
          </div>

          <div className="p-4 md:p-5 border border-border rounded-lg md:rounded-xl hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Shirt className="w-4 h-4 text-primary" />
              <p className="text-xs md:text-sm text-muted-foreground">Catégorie</p>
            </div>
            <p className="font-semibold text-card-foreground text-sm md:text-base">
              {getCategoryLabel(book.category)}
            </p>
          </div>

          {book.fabric && (
            <div className="p-4 md:p-5 border border-border rounded-lg md:rounded-xl hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-primary" />
                <p className="text-xs md:text-sm text-muted-foreground">Tissu</p>
              </div>
              <p className="font-semibold text-card-foreground text-sm md:text-base">
                {book.fabric}
              </p>
            </div>
          )}
        </div>

        {/* Care Instructions */}
        {book.care && (
          <div className="mb-8 p-6 md:p-7 bg-accent/5 border border-accent/20 rounded-lg md:rounded-xl">
            <h3 className="font-semibold text-card-foreground mb-3 text-base md:text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              Instructions d'entretien
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {book.care}
            </p>
          </div>
        )}

        {/* Price and Actions */}
        <div className="mb-8 p-6 md:p-8 bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg md:rounded-xl hover:border-primary/40 transition-colors relative overflow-hidden">
          {book.promoPrice && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md animate-pulse">
              -{Math.round(((book.price - book.promoPrice) / book.price) * 100 / 5) * 5}%
            </div>
          )}

          <div className="flex items-end gap-3 mb-6">
            <div className="text-4xl md:text-5xl font-bold text-primary">
              {book.promoPrice ? `${book.promoPrice} DT` : `${book.price} DT`}
            </div>
            {book.promoPrice && (
              <div className="text-xl md:text-2xl text-muted-foreground line-through mb-2 opacity-70">
                {book.price} DT
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 md:px-4 py-2 md:py-3 border border-border rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95 font-semibold"
            >
              −
            </button>
            <span className="text-xl md:text-2xl font-bold text-card-foreground min-w-12 md:min-w-16 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 md:px-4 py-2 md:py-3 border border-border rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95 font-semibold"
            >
              +
            </button>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={handleBuyNow}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-accent-foreground font-bold rounded-lg transition-all duration-200 hover:shadow-soft-hover hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              <Zap className="w-5 h-5 md:w-6 md:h-6" />
              {isLoading ? "Traitement..." : "Acheter maintenant"}
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-soft-hover hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              Ajouter au Panier
            </button>
          </div>

          {/* Trust Badges */}
          <div className="space-y-2 text-sm md:text-base">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Truck className="w-5 h-5 text-accent" />
              <span>Livraison rapide et sécurisée</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Package className="w-5 h-5 text-accent" />
              <span>Produits authentiques garantis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
