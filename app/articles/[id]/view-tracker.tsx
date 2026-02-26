"use client"

import { saveViewedBook } from "@/lib/personalization"
import { useEffect } from "react"

export function ViewTracker({ bookId }: { bookId: string }) {
  useEffect(() => {
    saveViewedBook(bookId)
  }, [bookId])
  return null
}
