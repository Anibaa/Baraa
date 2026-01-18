"use client"

import { useEffect, useState } from "react"
import { getRecentlyViewed, getFavorites } from "@/lib/personalization"

export function usePersonalization() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed())
    setFavorites(getFavorites())
    setIsLoaded(true)
  }, [])

  return { recentlyViewed, favorites, isLoaded }
}
