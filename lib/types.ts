export type Category = "abaya" | "hijab" | "jilbab" | "kaftan" | "ensemble" | "accessories"
export type Size = "S" | "M" | "L" | "XL" | "XXL" | "Unique"
export type Color = "noir" | "blanc" | "beige" | "or" | "bronze" | "rose" | "bleu" | "vert" | "bordeaux"

export type ProductStatus = "En stock" | "Hors stock" | "Préparation" | "Livraison" | "Livré"
export type OrderStatus = "Préparation" | "Livraison" | "Livré"

export interface Book {
  id: string
  title: string
  author: string
  category: Category
  size: Size
  color: Color
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
  size: Size
  color: Color
  description: string
  createdAt: Date
}

export interface Order {
  id: string
  bookIds: string[] // Changed to support multiple books
  quantities: number[] // Parallel quantities array
  totalPrice: number
  customerName: string
  customerEmail: string
  customerPhone: string // Added phone
  address: string // Added address
  paymentMethod: "Cash" | "Card" // Added payment method
  status: OrderStatus // Added status
  createdAt: Date
}

export interface CartItem {
  book: Book
  quantity: number
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
