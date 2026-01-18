"use client"

import { useEffect } from "react"
import { saveViewedBook } from "@/lib/personalization"

interface ViewTrackerProps {
  bookId: string
}

export function ViewTracker({ bookId }: ViewTrackerProps) {
  useEffect(() => {
    saveViewedBook(bookId)
  }, [bookId])

  return null
}
