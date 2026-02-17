"use client"

import React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface BookGalleryProps {
  images: string[]
  title: string
}

export function BookGallery({ images, title }: BookGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    // Simulate image loading
    setIsLoading(false)
  }, [])

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      // Swiped left
      handleNext()
    } else if (touchEnd - touchStart > 50) {
      // Swiped right
      handlePrevious()
    }
  }

  if (!images || images.length === 0) {
    return (
      <div className="bg-muted rounded-lg md:rounded-xl p-8 flex items-center justify-center min-h-96">
        <p className="text-muted-foreground">Aucune image disponible</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-muted rounded-lg md:rounded-xl overflow-hidden group">
        {isLoading ? (
          <Skeleton className="w-full aspect-[3/4]" />
        ) : (
          <>
            <div
              className="relative w-full aspect-[3/4] overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[selectedIndex] || "/placeholder.svg"}
                alt={`${title} - Image ${selectedIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-grab active:cursor-grabbing"
              />

              {/* Zoom on hover indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/50 px-3 py-1 rounded-full text-xs font-medium">
                  Zoom
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 z-10"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 z-10"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </>
        )}
      </div>

      {/* Thumbnail List */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-110 active:scale-95 ${
                selectedIndex === index
                  ? "border-primary ring-2 ring-primary/30 shadow-lg"
                  : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
              }`}
              aria-label={`Voir image ${index + 1}`}
              aria-current={selectedIndex === index}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
