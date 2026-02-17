export const STORAGE_KEYS = {
  RECENTLY_VIEWED: "Baraa_recently_viewed",
  LAST_VIEWED: "Baraa_last_viewed",
  FAVORITES: "Baraa_favorites",
}

export interface ViewedBook {
  id: string
  viewedAt: number
}

export function saveViewedBook(bookId: string): void {
  if (typeof window === "undefined") return

  const viewed: ViewedBook[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED) || "[]")
  const filtered = viewed.filter((v) => v.id !== bookId)
  const updated = [{ id: bookId, viewedAt: Date.now() }, ...filtered].slice(0, 10)
  localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(updated))
}

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return []
  const viewed: ViewedBook[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED) || "[]")
  return viewed.map((v) => v.id)
}

export function saveFavorite(bookId: string): void {
  if (typeof window === "undefined") return

  const favorites: string[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || "[]")
  const updated = favorites.includes(bookId) ? favorites.filter((id) => id !== bookId) : [...favorites, bookId]
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated))
}

export function getFavorites(): string[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || "[]")
}

export function isFavorited(bookId: string): boolean {
  return getFavorites().includes(bookId)
}
