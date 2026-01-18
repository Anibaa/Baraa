import type { Book, SliderItem, Order, Partner } from "./types"
import { mockBooks, mockSliders, mockOrders, mockPartners } from "./mock-data"

// Books API
export async function getBooks(filters?: {
  category?: string
  level?: string
  language?: string
}): Promise<Book[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  let books = [...mockBooks]

  if (filters?.category) {
    books = books.filter((b) => b.category === filters.category)
  }
  if (filters?.level) {
    books = books.filter((b) => b.level === filters.level)
  }
  if (filters?.language) {
    books = books.filter((b) => b.language === filters.language)
  }

  return books
}

export async function getBookById(id: string): Promise<Book | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockBooks.find((b) => b.id === id) || null
}

export async function getRelatedBooks(bookId: string, limit = 4): Promise<Book[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const book = mockBooks.find((b) => b.id === bookId)
  if (!book) return []

  return mockBooks
    .filter((b) => b.id !== bookId && (b.category === book.category || b.level === book.level))
    .slice(0, limit)
}

// Slider API
export async function getSliders(): Promise<SliderItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockSliders
}

// Orders API
export async function getOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockOrders
}

export async function createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const newOrder: Order = {
    ...order,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  }
  mockOrders.push(newOrder)
  return newOrder
}

// Partners API
export async function getPartners(): Promise<Partner[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockPartners
}

export async function createPartner(partner: Omit<Partner, "id" | "createdAt">): Promise<Partner> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const newPartner: Partner = {
    ...partner,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  }
  mockPartners.push(newPartner)
  return newPartner
}
