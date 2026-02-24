import type { Color, PredefinedColor, ColorOption } from "./types"

// Predefined color configurations (Arabic)
export const PREDEFINED_COLORS: Record<PredefinedColor, { label: string; bg: string; colorCode: string }> = {
  "أسود": { label: "أسود", bg: "bg-black", colorCode: "#000000" },
  "أبيض": { label: "أبيض", bg: "bg-white border-2 border-gray-300", colorCode: "#FFFFFF" },
  "بيج": { label: "بيج", bg: "bg-[#F5F5DC]", colorCode: "#F5F5DC" },
  "ذهبي": { label: "ذهبي", bg: "bg-[#FFD700]", colorCode: "#FFD700" },
  "برونزي": { label: "برونزي", bg: "bg-[#CD7F32]", colorCode: "#CD7F32" },
  "وردي": { label: "وردي", bg: "bg-[#FFC0CB]", colorCode: "#FFC0CB" },
  "أزرق": { label: "أزرق", bg: "bg-blue-500", colorCode: "#3B82F6" },
  "أخضر": { label: "أخضر", bg: "bg-green-500", colorCode: "#22C55E" },
  "عنابي": { label: "عنابي", bg: "bg-[#800020]", colorCode: "#800020" },
  "رمادي": { label: "رمادي", bg: "bg-gray-500", colorCode: "#6B7280" },
  "بني": { label: "بني", bg: "bg-[#8B4513]", colorCode: "#8B4513" },
  "تركواز": { label: "تركواز", bg: "bg-[#40E0D0]", colorCode: "#40E0D0" },
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
  
  // Parse combined colors in Arabic (e.g., "أسود وذهبي")
  const parts = color.split(/\s+و\s+|\s+&\s+|\s*\/\s*/)
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
    colorCodes: getColorCodes(color),
    imageUrl: null
  }
}

// Parse color options from an array of colors
export function parseColorOptions(colors: Color[]): ColorOption[] {
  return colors.map(createColorOption)
}

// Common color combinations (Arabic)
export const COLOR_COMBINATIONS = [
  { value: "أسود وذهبي", label: "أسود وذهبي", colors: ["أسود", "ذهبي"] },
  { value: "أبيض ووردي", label: "أبيض ووردي", colors: ["أبيض", "وردي"] },
  { value: "بيج وبرونزي", label: "بيج وبرونزي", colors: ["بيج", "برونزي"] },
  { value: "أسود وأبيض", label: "أسود وأبيض", colors: ["أسود", "أبيض"] },
  { value: "أزرق وأبيض", label: "أزرق وأبيض", colors: ["أزرق", "أبيض"] },
  { value: "أخضر وذهبي", label: "أخضر وذهبي", colors: ["أخضر", "ذهبي"] },
  { value: "عنابي وذهبي", label: "عنابي وذهبي", colors: ["عنابي", "ذهبي"] },
]
