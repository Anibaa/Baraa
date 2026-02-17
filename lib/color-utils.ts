import type { Color, PredefinedColor, ColorOption } from "./types"

// Predefined color configurations
export const PREDEFINED_COLORS: Record<PredefinedColor, { label: string; bg: string; colorCode: string }> = {
  noir: { label: "Noir", bg: "bg-black", colorCode: "#000000" },
  blanc: { label: "Blanc", bg: "bg-white border-2 border-gray-300", colorCode: "#FFFFFF" },
  beige: { label: "Beige", bg: "bg-[#F5F5DC]", colorCode: "#F5F5DC" },
  or: { label: "Or", bg: "bg-[#FFD700]", colorCode: "#FFD700" },
  bronze: { label: "Bronze", bg: "bg-[#CD7F32]", colorCode: "#CD7F32" },
  rose: { label: "Rose", bg: "bg-[#FFC0CB]", colorCode: "#FFC0CB" },
  bleu: { label: "Bleu", bg: "bg-blue-500", colorCode: "#3B82F6" },
  vert: { label: "Vert", bg: "bg-green-500", colorCode: "#22C55E" },
  bordeaux: { label: "Bordeaux", bg: "bg-[#800020]", colorCode: "#800020" },
  gris: { label: "Gris", bg: "bg-gray-500", colorCode: "#6B7280" },
  marron: { label: "Marron", bg: "bg-[#8B4513]", colorCode: "#8B4513" },
  turquoise: { label: "Turquoise", bg: "bg-[#40E0D0]", colorCode: "#40E0D0" },
}

// Get color label
export function getColorLabel(color: Color): string {
  // Check if it's a predefined color
  if (color in PREDEFINED_COLORS) {
    return PREDEFINED_COLORS[color as PredefinedColor].label
  }
  // Return custom color as-is
  return color
}

// Get color display class
export function getColorDisplay(color: Color): string {
  if (color in PREDEFINED_COLORS) {
    return PREDEFINED_COLORS[color as PredefinedColor].bg
  }
  // For custom colors, return a default
  return "bg-gradient-to-r from-gray-400 to-gray-600"
}

// Get color code(s) for custom rendering
export function getColorCodes(color: Color): string[] {
  if (color in PREDEFINED_COLORS) {
    return [PREDEFINED_COLORS[color as PredefinedColor].colorCode]
  }
  
  // Parse combined colors (e.g., "Noir et Or")
  const parts = color.toLowerCase().split(/\s+et\s+|\s+&\s+|\s*\/\s*/)
  const codes: string[] = []
  
  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed in PREDEFINED_COLORS) {
      codes.push(PREDEFINED_COLORS[trimmed as PredefinedColor].colorCode)
    }
  }
  
  // If no valid colors found, return a default gradient
  return codes.length > 0 ? codes : ["#9CA3AF", "#6B7280"]
}

// Create a ColorOption from a Color string
export function createColorOption(color: Color): ColorOption {
  const isPredefined = color in PREDEFINED_COLORS
  
  return {
    value: color,
    label: getColorLabel(color),
    isPredefined,
    colorCodes: getColorCodes(color)
  }
}

// Parse color options from an array of colors
export function parseColorOptions(colors: Color[]): ColorOption[] {
  return colors.map(createColorOption)
}

// Common color combinations
export const COLOR_COMBINATIONS = [
  { value: "noir-et-or", label: "Noir et Or", colors: ["noir", "or"] },
  { value: "blanc-et-rose", label: "Blanc et Rose", colors: ["blanc", "rose"] },
  { value: "beige-et-bronze", label: "Beige et Bronze", colors: ["beige", "bronze"] },
  { value: "noir-et-blanc", label: "Noir et Blanc", colors: ["noir", "blanc"] },
  { value: "bleu-et-blanc", label: "Bleu et Blanc", colors: ["bleu", "blanc"] },
  { value: "vert-et-or", label: "Vert et Or", colors: ["vert", "or"] },
  { value: "bordeaux-et-or", label: "Bordeaux et Or", colors: ["bordeaux", "or"] },
]
