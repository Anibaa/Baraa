"use client"

import { AlertCircle, X } from "lucide-react"
import { useEffect, useState } from "react"

interface ErrorToastProps {
  message: string
  title: string
  onClose: () => void
  duration?: number
}

export function ErrorToast({ message, title, onClose, duration = 4000 }: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slideUp">
      <div className="bg-red-600 text-white rounded-lg p-4 md:p-5 shadow-lg flex items-start gap-3 max-w-sm border border-red-700">
        <AlertCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5 animate-scaleIn" />
        <div className="flex-1">
          <p className="font-semibold text-sm md:text-base">{title}</p>
          <p className="text-red-50 text-xs md:text-sm mt-1">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose()
          }}
          className="text-white hover:bg-red-700/50 rounded p-1 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
