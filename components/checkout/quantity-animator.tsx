"use client"

import { useEffect, useState } from "react"

interface QuantityAnimatorProps {
  value: number
  onAnimationComplete?: () => void
}

export function QuantityAnimator({ value, onAnimationComplete }: QuantityAnimatorProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (displayValue !== value) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setDisplayValue(value)
        setIsAnimating(false)
        onAnimationComplete?.()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [value, displayValue, onAnimationComplete])

  return (
    <span
      className={`inline-block transition-all duration-300 ${
        isAnimating ? "opacity-50 scale-110 text-primary font-bold" : "opacity-100 scale-100"
      }`}
    >
      {displayValue}
    </span>
  )
}
