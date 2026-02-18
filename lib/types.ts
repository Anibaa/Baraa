export type Category = "abaya" | "hijab" | "jilbab" | "kaftan" | "ensemble" | "accessories"
export type Size = "S" | "M" | "L" | "XL" | "XXL" | "Unique"

// Predefined colors
export type PredefinedColor = "noir" | "blanc" | "beige" | "or" | "bronze" | "rose" | "bleu" | "vert" | "bordeaux" | "gris" | "marron" | "turquoise"

// Color can be a predefined color, a custom color, or a combination
export type Color = PredefinedColor | string // Allows custom colors like "Noir et Or"

export type ProductStatus = "En stock" | "Hors stock" | "Préparation" | "Livraison" | "Livré"
export type OrderStatus = "Préparation" | "Confirmé" | "Livraison" | "Livré"

export interface ColorOption {
  value: string // The color value (can be predefined or custom)
  label: string // Display label
  isPredefined: boolean // Whether it's a predefined color
  colorCodes?: string[] // CSS color codes for display (supports multiple for combinations)
  imageUrl?: string | null // Image URL linked to this color
}

export interface ProductVariant {
  size: Size
  color: Color
  stock: number
}

export interface Book {
  id: string
  title: string
  author: string
  category: Category
  sizes: Size[] // Multiple sizes available
  colors: Color[] // Multiple colors available (can include custom colors)
  colorOptions?: ColorOption[] // Detailed color information for display
  variants?: ProductVariant[] // Stock per size/color combination
  price: number
  promoPrice?: number
  image: string
  images: string[]
  description: string
  rating: number
  reviews: number
  status: ProductStatus
  specifications?: Record<string, string>
  descriptionImages?: string[]
  createdAt?: string
  fabric?: string
  care?: string
}

export interface SliderItem {
  id: string
  title: string
  subtitle: string
  image: string
  cta: string
  link: string
}

export interface Slider {
  id: string
  title: string
  subtitle: string
  imageWeb: string
  imageMobile: string
  cta: string
  link: string
  order: number
}

export interface Partner {
  id: string
  name: string
  email: string
  phone: string
  productTitle: string
  category: Category
  sizes: Size[]
  colors: Color[]
  description: string
  createdAt: Date
}

export interface OrderItem {
  bookId: string
  quantity: number
  size: Size
  color: Color
  price: number
}

export interface Order {
  id: string
  items: OrderItem[] // Changed to support size/color per item
  totalPrice: number
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  paymentMethod: "Cash" | "Card"
  status: OrderStatus
  createdAt: Date
}

export interface CartItem {
  book: Book
  quantity: number
  selectedSize: Size
  selectedColor: Color
}

export interface CheckoutData {
  name: string
  email: string
  phone: string
  address: string
  paymentMethod: "Cash" | "Card"
}

export interface AdminUser {
  id: string
  username: string
  password: string // In real app, this would be hashed
}
