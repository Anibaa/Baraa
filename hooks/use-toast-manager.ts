"use client"

import { useState, useCallback } from "react"

export interface ToastMessage {
  id: string
  type: "success" | "error" | "info"
  title: string
  message: string
  duration?: number
}

export function useToastManager() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    (title: string, message: string, type: "success" | "error" = "success", duration = 3000) => {
      const id = Math.random().toString(36).substr(2, 9)
      setToasts((prev) => [...prev, { id, type, title, message, duration }])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }

      return id
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = useCallback((title: string, message: string) => addToast(title, message, "success"), [addToast])

  const error = useCallback((title: string, message: string) => addToast(title, message, "error", 4000), [addToast])

  return { toasts, addToast, removeToast, success, error }
}
