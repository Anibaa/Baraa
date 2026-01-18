"use client"

import { useCallback, useEffect, useState } from "react"
import type { CartItem, Book } from "@/lib/types"

const CART_STORAGE_KEY = "najahi_cart"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to load cart:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart, isLoading])

  const addToCart = useCallback((book: Book, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book.id === book.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prevCart, { book, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.book.id !== bookId))
  }, [])

  const updateQuantity = useCallback(
    (bookId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(bookId)
      } else {
        setCart((prevCart) => prevCart.map((item) => (item.book.id === bookId ? { ...item, quantity } : item)))
      }
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  const total = subtotal

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    total,
    itemCount: cart.length,
    isLoading,
  }
}
