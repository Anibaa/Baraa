"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit2, Trash2, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getColorLabel, getColorCodes } from "@/lib/color-utils"
import type { Book } from "@/lib/types"

interface BooksManagementProps {
  books: Book[]
}

const statusColors: Record<string, string> = {
  "En stock": "text-green-600",
  "Hors stock": "text-red-600",
  Préparation: "text-yellow-600",
  Livraison: "text-blue-600",
  Livré: "text-gray-600",
}

export function BooksManagement({ books }: BooksManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [formData, setFormData] = useState<Partial<Book>>({
    images: [],
    descriptionImages: [],
  })
  const [galleryImageInput, setGalleryImageInput] = useState("")
  const [descriptionImageInput, setDescriptionImageInput] = useState("")
  const [customColorInput, setCustomColorInput] = useState("")
  const [customColorHex1, setCustomColorHex1] = useState("")
  const [customColorHex2, setCustomColorHex2] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingGallery, setIsUploadingGallery] = useState(false)
  const [isUploadingDescription, setIsUploadingDescription] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    
    // Ensure colorOptions exist for all colors
    const ensuredColorOptions = book.colors.map(color => {
      // Check if colorOption already exists for this color
      const existingOption = book.colorOptions?.find(opt => opt.value === color)
      if (existingOption) {
        return existingOption
      }
      // Create new colorOption with proper color codes
      return {
        value: color,
        label: getColorLabel(color),
        isPredefined: true,
        colorCodes: getColorCodes(color),
        imageUrl: null
      }
    })
    
    setFormData({
      ...book,
      colorOptions: ensuredColorOptions
    })
    setGalleryImageInput("")
    setDescriptionImageInput("")
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous certain de vouloir supprimer cet article?")) {
      try {
        const res = await fetch(`/api/books/${id}`, {
          method: "DELETE",
        })

        if (!res.ok) throw new Error("Failed to delete")

        toast({
          title: "Succès",
          description: "Article supprimé avec succès",
        })

        // Refresh the current page
        router.refresh()

        // Also trigger a refresh of the home page cache
        fetch('/', {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        }).catch(() => { }) // Silent fail if this doesn't work

      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer l'article",
          variant: "destructive",
        })
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Handle multi-select for sizes and colors
    if (name === "sizes" || name === "colors") {
      const select = e.target as HTMLSelectElement
      const selectedOptions = Array.from(select.selectedOptions).map(option => option.value)
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" || name === "promoPrice" ? (value === "" ? undefined : Number.parseFloat(value)) : value,
      }))
    }
  }

  const toggleSize = (size: import("@/lib/types").Size) => {
    setFormData((prev) => {
      const sizes = prev.sizes || []
      if (sizes.includes(size)) {
        return { ...prev, sizes: sizes.filter(s => s !== size) }
      } else {
        return { ...prev, sizes: [...sizes, size] }
      }
    })
  }

  const toggleColor = (color: import("@/lib/types").Color) => {
    setFormData((prev) => {
      const colors = prev.colors || []
      const colorOptions = prev.colorOptions || []
      
      if (colors.includes(color)) {
        return { 
          ...prev, 
          colors: colors.filter(c => c !== color),
          colorOptions: colorOptions.filter(opt => opt.value !== color)
        }
      } else {
        // Add color with proper color option using color-utils
        const newColorOption: import("@/lib/types").ColorOption = {
          value: color,
          label: getColorLabel(color),
          isPredefined: true,
          colorCodes: getColorCodes(color),
          imageUrl: null
        }
        return { 
          ...prev, 
          colors: [...colors, color],
          colorOptions: [...colorOptions, newColorOption]
        }
      }
    })
  }

  const addCustomColor = () => {
    if (customColorInput.trim()) {
      const customColor = customColorInput.trim()
      
      // Create color option with hex codes if provided
      const colorOption: import("@/lib/types").ColorOption = {
        value: customColor,
        label: customColor,
        isPredefined: false,
        colorCodes: [],
        imageUrl: null
      }
      
      if (customColorHex1.trim()) {
        colorOption.colorCodes!.push(customColorHex1.trim())
      }
      if (customColorHex2.trim()) {
        colorOption.colorCodes!.push(customColorHex2.trim())
      }
      
      setFormData((prev) => {
        const colors = prev.colors || []
        const colorOptions = prev.colorOptions || []
        
        if (!colors.includes(customColor)) {
          return { 
            ...prev, 
            colors: [...colors, customColor],
            colorOptions: [...colorOptions, colorOption]
          }
        }
        return prev
      })
      
      setCustomColorInput("")
      setCustomColorHex1("")
      setCustomColorHex2("")
      
      toast({
        title: "Couleur ajoutée",
        description: `La couleur "${customColor}" a été ajoutée`,
      })
    }
  }

  const removeCustomColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: (prev.colors || []).filter(c => c !== color),
      colorOptions: (prev.colorOptions || []).filter(opt => opt.value !== color)
    }))
  }

  const handleAddGalleryImage = () => {
    if (galleryImageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), galleryImageInput.trim()],
        image: prev.image || galleryImageInput.trim(), // Set primary image if empty
      }))
      setGalleryImageInput("")
      toast({
        title: "Image ajoutée",
        description: "L'image a été ajoutée à la galerie",
      })
    }
  }

  const handleAddDescriptionImage = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      descriptionImages: [...(prev.descriptionImages || []), imageUrl],
    }))
    toast({
      title: "Image descriptive ajoutée",
      description: "L'image a été ajoutée aux images descriptives",
    })
  }

  const handleAddDescriptionImageFromInput = () => {
    if (descriptionImageInput.trim()) {
      handleAddDescriptionImage(descriptionImageInput.trim())
      setDescriptionImageInput("")
    }
  }

  const handleRemoveImage = (index: number) => {
    const imageToRemove = formData.images?.[index]
    setFormData((prev) => {
      const newImages = prev.images?.filter((_, i) => i !== index) || []
      return {
        ...prev,
        images: newImages,
        image: newImages.length > 0 ? newImages[0] : "", // Sync primary image
      }
    })

    // Delete from Vercel Blob if it's a blob URL
    if (imageToRemove && imageToRemove.includes('blob.vercel-storage.com')) {
      deleteFromBlob(imageToRemove)
    }
  }

  const handleRemoveDescriptionImage = (index: number) => {
    const imageToRemove = formData.descriptionImages?.[index]
    setFormData((prev) => ({
      ...prev,
      descriptionImages: prev.descriptionImages?.filter((_, i) => i !== index) || [],
    }))

    // Delete from Vercel Blob if it's a blob URL
    if (imageToRemove && imageToRemove.includes('blob.vercel-storage.com')) {
      deleteFromBlob(imageToRemove)
    }
  }

  const deleteFromBlob = async (url: string) => {
    try {
      await fetch(`/api/upload?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Failed to delete from blob:', error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'descriptionImages' | 'gallery') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (field === 'gallery') {
      setIsUploadingGallery(true)
    } else {
      setIsUploadingDescription(true)
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("uploadType", field) // Add upload type for unique naming

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      const data = await res.json()

      if (field === 'descriptionImages') {
        handleAddDescriptionImage(data.url)
      } else {
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), data.url],
          image: prev.image || data.url // Set primary if empty
        }))
        toast({
          title: "Succès",
          description: "Image ajoutée à la galerie",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec du téléchargement",
        variant: "destructive",
      })
    } finally {
      if (field === 'gallery') {
        setIsUploadingGallery(false)
      } else {
        setIsUploadingDescription(false)
      }
      // Reset input value to allow selecting same file again
      e.target.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Ensure at least one image
    if (!formData.images || formData.images.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter au moins une image à la galerie",
      })
      setIsLoading(false)
      return
    }

    // Ensure at least one size
    if (!formData.sizes || formData.sizes.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une taille",
      })
      setIsLoading(false)
      return
    }

    // Ensure at least one color
    if (!formData.colors || formData.colors.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une couleur",
      })
      setIsLoading(false)
      return
    }

    try {
      const url = editingBook ? `/api/books/${editingBook.id}` : "/api/books"
      const method = editingBook ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Correction failed")

      toast({
        title: "Succès",
        description: editingBook
          ? `Article "${formData.title}" modifié avec succès`
          : `Article "${formData.title}" ajouté avec succès`,
      })

      // Refresh the current page and clear cache
      router.refresh()

      // Also trigger a refresh of the home page cache
      fetch('/', {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }).catch(() => { }) // Silent fail if this doesn't work

      setIsModalOpen(false)
      setFormData({ images: [], descriptionImages: [] })
      setGalleryImageInput("")
      setDescriptionImageInput("")
      setEditingBook(null)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="animate-fadeInUp">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Gestion des Articles</h2>
          <p className="text-muted-foreground text-sm mt-1">Gérez votre catalogue d'articles</p>
        </div>
        <button
          onClick={() => {
            setEditingBook(null)
            setFormData({ images: [], descriptionImages: [] })
            setGalleryImageInput("")
            setDescriptionImageInput("")
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-soft-hover hover:scale-105 active:scale-95 w-full md:w-auto justify-center md:justify-start"
        >
          <Plus className="w-5 h-5" />
          Ajouter un Article
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-lg bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-foreground">Article</th>
              <th className="px-6 py-4 text-left font-semibold text-foreground hidden sm:table-cell">Marque</th>
              <th className="px-6 py-4 text-left font-semibold text-foreground">Prix</th>
              <th className="px-6 py-4 text-left font-semibold text-foreground">Statut</th>
              <th className="px-6 py-4 text-left font-semibold text-foreground hidden md:table-cell">Note</th>
              <th className="px-6 py-4 text-center font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {books.map((book, idx) => (
              <tr
                key={book.id}
                className="hover:bg-muted/50 transition-colors animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <td className="px-6 py-4 font-semibold text-foreground line-clamp-1">{book.title}</td>
                <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell text-sm">{book.author}</td>
                <td className="px-6 py-4 font-bold text-primary">
                  {book.promoPrice ? (
                    <div className="flex flex-col">
                      <span className="text-red-500 font-bold">{book.promoPrice} د.ت</span>
                      <span className="text-muted-foreground line-through text-xs">{book.price} د.ت</span>
                    </div>
                  ) : (
                    <span>{book.price} د.ت</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`text - sm font - semibold ${statusColors[book.status]}`}>{book.status}</span>
                </td>

                <td className="px-6 py-4 text-muted-foreground hidden md:table-cell text-sm">{book.rating || 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(book)}
                      className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-all hover:scale-110 active:scale-95"
                      aria-label="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-all hover:scale-110 active:scale-95"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeInUp">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-lg border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {editingBook ? "Modifier l'Article" : "Ajouter un Nouvel Article"}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setFormData({ images: [], descriptionImages: [] })
                  setGalleryImageInput("")
                  setDescriptionImageInput("")
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Titre</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Titre de l'article"
                    value={formData.title || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Marque</label>
                  <input
                    type="text"
                    name="author"
                    placeholder="Nom de la marque"
                    value={formData.author || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">السعر (د.ت)</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Prix"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Prix Promo (Optionnel)</label>
                  <input
                    type="number"
                    name="promoPrice"
                    placeholder="Prix Promo"
                    value={formData.promoPrice || ""}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Catégorie</label>
                  <select
                    name="category"
                    value={formData.category || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="" disabled>Choisir une catégorie</option>
                    <option value="abaya">Abaya</option>
                    <option value="hijab">Hijab</option>
                    <option value="jilbab">Jilbab</option>
                    <option value="kaftan">Kaftan</option>
                    <option value="ensemble">Ensemble</option>
                    <option value="accessories">Accessoires</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Statut</label>
                  <select
                    name="status"
                    value={formData.status || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="" disabled>Choisir un statut</option>
                    <option value="En stock">En stock</option>
                    <option value="Hors stock">Hors stock</option>
                    <option value="Préparation">Préparation</option>
                    <option value="Livraison">Livraison</option>
                    <option value="Livré">Livré</option>
                  </select>
                </div>
              </div>

              {/* Tailles Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Tailles disponibles <span className="text-destructive">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["S", "M", "L", "XL", "XXL", "Unique"] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                        formData.sizes?.includes(size)
                          ? "border-primary bg-primary text-white shadow-md"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {(!formData.sizes || formData.sizes.length === 0) && (
                  <p className="text-xs text-destructive mt-2">Veuillez sélectionner au moins une taille</p>
                )}
              </div>

              {/* Couleurs Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Couleurs disponibles <span className="text-destructive">*</span>
                </label>
                
                {/* Predefined Colors */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {([
                    { value: "noir", label: "Noir", bg: "bg-black" },
                    { value: "blanc", label: "Blanc", bg: "bg-white border-2 border-gray-300" },
                    { value: "beige", label: "Beige", bg: "bg-[#F5F5DC]" },
                    { value: "or", label: "Or", bg: "bg-[#FFD700]" },
                    { value: "bronze", label: "Bronze", bg: "bg-[#CD7F32]" },
                    { value: "rose", label: "Rose", bg: "bg-[#FFC0CB]" },
                    { value: "bleu", label: "Bleu", bg: "bg-blue-500" },
                    { value: "vert", label: "Vert", bg: "bg-green-500" },
                    { value: "bordeaux", label: "Bordeaux", bg: "bg-[#800020]" },
                    { value: "gris", label: "Gris", bg: "bg-gray-500" },
                    { value: "marron", label: "Marron", bg: "bg-[#8B4513]" },
                    { value: "turquoise", label: "Turquoise", bg: "bg-[#40E0D0]" },
                  ] as const).map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => toggleColor(color.value)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
                        formData.colors?.includes(color.value)
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full ${color.bg} ring-2 ring-border`} />
                      <span className="text-xs font-medium">{color.label}</span>
                    </button>
                  ))}
                </div>

                {/* Add Custom Color */}
                <div className="border-t border-border pt-4">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Ajouter une couleur personnalisée
                  </label>
                  
                  <div className="space-y-3">
                    {/* Color Name */}
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Nom de la couleur</label>
                      <input
                        type="text"
                        value={customColorInput}
                        onChange={(e) => setCustomColorInput(e.target.value)}
                        placeholder='Ex: "Noir et Or", "Vert Émeraude"'
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                      />
                    </div>

                    {/* Hex Codes */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Code Hex 1 (optionnel)</label>
                        <input
                          type="text"
                          value={customColorHex1}
                          onChange={(e) => setCustomColorHex1(e.target.value)}
                          placeholder="#000000"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Code Hex 2 (optionnel)</label>
                        <input
                          type="text"
                          value={customColorHex2}
                          onChange={(e) => setCustomColorHex2(e.target.value)}
                          placeholder="#FFD700"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-mono"
                        />
                      </div>
                    </div>

                    {/* Preview */}
                    {(customColorHex1 || customColorHex2) && (
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <span className="text-xs text-muted-foreground">Aperçu:</span>
                        <div className="flex gap-2">
                          {customColorHex1 && (
                            <div
                              className="w-8 h-8 rounded-full ring-2 ring-border"
                              style={{ backgroundColor: customColorHex1 }}
                            />
                          )}
                          {customColorHex2 && (
                            <div
                              className="w-8 h-8 rounded-full ring-2 ring-border"
                              style={{ backgroundColor: customColorHex2 }}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Add Button */}
                    <button
                      type="button"
                      onClick={addCustomColor}
                      disabled={!customColorInput.trim()}
                      className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 disabled:bg-secondary/50 text-secondary-foreground font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Ajouter la couleur
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3">
                    💡 Astuce: Ajoutez 2 codes hex pour créer une combinaison de couleurs
                  </p>
                </div>

                {(!formData.colors || formData.colors.length === 0) && (
                  <p className="text-xs text-destructive mt-2">Veuillez sélectionner au moins une couleur</p>
                )}
              </div>

              {/* Stock Management per Size/Color Combination */}
              {formData.sizes && formData.sizes.length > 0 && formData.colors && formData.colors.length > 0 && (
                <div className="border border-accent/20 rounded-lg p-5 bg-accent/5">
                  <label className="block text-sm font-semibold text-foreground mb-4">
                    Gestion du Stock par Taille et Couleur
                  </label>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-border">
                          <th className="text-left py-2 px-3 font-semibold text-foreground">Taille</th>
                          <th className="text-left py-2 px-3 font-semibold text-foreground">Couleur</th>
                          <th className="text-left py-2 px-3 font-semibold text-foreground">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.sizes.map((size) =>
                          formData.colors!.map((color) => {
                            const variant = formData.variants?.find(
                              (v) => v.size === size && v.color === color
                            )
                            return (
                              <tr key={`${size}-${color}`} className="border-b border-border hover:bg-muted/30">
                                <td className="py-3 px-3 font-medium">{size}</td>
                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-2">
                                    {(() => {
                                      const colorOption = formData.colorOptions?.find(opt => opt.value === color)
                                      const colorCodes = colorOption?.colorCodes || []
                                      
                                      if (colorCodes.length > 1) {
                                        return (
                                          <div className="flex gap-1">
                                            {colorCodes.map((code, idx) => (
                                              <div
                                                key={idx}
                                                className="w-4 h-4 rounded-full border border-gray-300"
                                                style={{ backgroundColor: code }}
                                              />
                                            ))}
                                          </div>
                                        )
                                      } else if (colorCodes.length === 1) {
                                        return (
                                          <div
                                            className="w-5 h-5 rounded-full border border-gray-300"
                                            style={{ backgroundColor: colorCodes[0] }}
                                          />
                                        )
                                      }
                                      return null
                                    })()}
                                    <span className="text-sm">{color}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3">
                                  <input
                                    type="number"
                                    min="0"
                                    value={variant?.stock ?? 0}
                                    onChange={(e) => {
                                      const stock = Number.parseInt(e.target.value) || 0
                                      setFormData((prev) => {
                                        const variants = prev.variants || []
                                        const existingIndex = variants.findIndex(
                                          (v) => v.size === size && v.color === color
                                        )
                                        
                                        if (existingIndex >= 0) {
                                          const newVariants = [...variants]
                                          newVariants[existingIndex] = { size, color, stock }
                                          return { ...prev, variants: newVariants }
                                        } else {
                                          return {
                                            ...prev,
                                            variants: [...variants, { size, color, stock }],
                                          }
                                        }
                                      })
                                    }}
                                    className="w-24 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                  />
                                </td>
                              </tr>
                            )
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3">
                    💡 Définissez le stock disponible pour chaque combinaison taille/couleur
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Tissu</label>
                  <input
                    type="text"
                    name="fabric"
                    placeholder="Type de tissu (ex: Coton, Soie, Polyester)"
                    value={formData.fabric || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Description de l'article..."
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Instructions d'entretien</label>
                <textarea
                  name="care"
                  placeholder="Instructions d'entretien (ex: Lavage à la main, Ne pas repasser)"
                  value={formData.care || ""}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>

              {/* Image Gallery Management */}
              <div className="border border-primary/20 rounded-lg p-5 bg-primary/5">
                <label className="block text-sm font-semibold text-foreground mb-4">Galerie d'Images</label>

                {/* Add Image Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Ajouter une URL d'image..."
                    value={galleryImageInput}
                    onChange={(e) => setGalleryImageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddGalleryImage()
                      }
                    }}
                    className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'gallery')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploadingGallery}
                    />
                    <button
                      type="button"
                      className={`px-4 py-3 ${isUploadingGallery ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary/80'} rounded-lg border border-border h-full flex items-center justify-center min-w-[3rem] mr-2`}
                      title="Upload"
                      disabled={isUploadingGallery}
                    >
                      {isUploadingGallery ? (
                        <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-4 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Image Thumbnails */}
                {formData.images && formData.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Galerie ${index + 1}`}
                          className="w-full aspect-[3/4] object-cover rounded-lg border-2 border-primary/30"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-destructive hover:bg-destructive/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                            Principale
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Aucune image ajoutée</p>
                )}
              </div>

              {/* Color-Image Association - Only show if both colors and images exist */}
              {formData.colors && formData.colors.length > 0 && formData.images && formData.images.length > 0 && (
                <div className="border border-accent/20 rounded-lg p-5 bg-accent/5">
                  <label className="block text-sm font-semibold text-foreground mb-4">
                    Association Couleurs - Images
                  </label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Associez chaque couleur à une image de la galerie. L'image changera automatiquement quand le client sélectionne une couleur.
                  </p>
                  
                  <div className="space-y-3">
                    {formData.colors.map((color) => {
                      const colorOption = formData.colorOptions?.find(opt => opt.value === color)
                      return (
                        <div
                          key={color}
                          className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:border-accent/50 transition-colors"
                        >
                          {/* Color preview */}
                          <div className="flex items-center gap-2 min-w-[140px]">
                            {colorOption?.colorCodes && colorOption.colorCodes.length > 0 && (
                              <div className="flex gap-1">
                                {colorOption.colorCodes.map((code, idx) => (
                                  <div
                                    key={idx}
                                    className="w-7 h-7 rounded-full border-2 border-gray-300 shadow-sm"
                                    style={{ backgroundColor: code }}
                                  />
                                ))}
                              </div>
                            )}
                            <span className="font-semibold text-sm">{color}</span>
                          </div>
                          
                          {/* Select from gallery dropdown */}
                          <div className="flex-1">
                            <select
                              value={colorOption?.imageUrl || ""}
                              onChange={(e) => {
                                const newImageUrl = e.target.value
                                setFormData((prev) => {
                                  const colorOptions = prev.colorOptions || []
                                  const optionIndex = colorOptions.findIndex(opt => opt.value === color)
                                  
                                  if (optionIndex >= 0) {
                                    const newOptions = [...colorOptions]
                                    newOptions[optionIndex] = {
                                      ...newOptions[optionIndex],
                                      imageUrl: newImageUrl || null
                                    }
                                    return { ...prev, colorOptions: newOptions }
                                  } else {
                                    // Create new color option if it doesn't exist
                                    const newOption: import("@/lib/types").ColorOption = {
                                      value: color,
                                      label: color,
                                      isPredefined: false,
                                      colorCodes: [],
                                      imageUrl: newImageUrl || null
                                    }
                                    return { ...prev, colorOptions: [...colorOptions, newOption] }
                                  }
                                })
                              }}
                              className="w-full px-4 py-2.5 border-2 border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-background hover:border-accent/50 transition-colors"
                            >
                              <option value="">🖼️ Aucune image (défaut)</option>
                              {(formData.images || []).map((img, idx) => (
                                <option key={idx} value={img}>
                                  📷 Image {idx + 1} {idx === 0 ? '(Principale)' : ''}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {/* Image preview */}
                          {colorOption?.imageUrl ? (
                            <div className="relative group">
                              <img
                                src={colorOption.imageUrl}
                                alt={color}
                                className="w-20 h-20 object-cover rounded-lg border-2 border-accent/40 shadow-md hover:shadow-lg transition-shadow"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">✓ Liée</span>
                              </div>
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                              <span className="text-gray-400 text-xs">Défaut</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800 flex items-start gap-2">
                      <span className="text-base">💡</span>
                      <span>
                        <strong>Astuce:</strong> Sélectionnez une image pour chaque couleur. 
                        Sur la page produit, l'image changera automatiquement quand le client clique sur une couleur. 
                        Les couleurs sans image associée afficheront l'image principale par défaut.
                      </span>
                    </p>
                  </div>
                </div>
              )}
              
              {/* Warning if colors selected but no images */}
              {formData.colors && formData.colors.length > 0 && (!formData.images || formData.images.length === 0) && (
                <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                  <p className="text-sm text-yellow-900 font-medium flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    Ajoutez des images à la galerie pour pouvoir les associer aux couleurs
                  </p>
                </div>
              )}

              <div className=" gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Images Descriptives</label>
                  <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                    {/* Add Description Image Input */}
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="Ajouter une URL d'image descriptive..."
                        value={descriptionImageInput}
                        onChange={(e) => setDescriptionImageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddDescriptionImageFromInput()
                          }
                        }}
                        className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                      />
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'descriptionImages')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={isUploadingDescription}
                        />
                        <button
                          type="button"
                          className={`px-4 py-3 ${isUploadingDescription ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary/80'} rounded-lg border border-border h-full flex items-center justify-center min-w-[3rem]`}
                          title="Upload"
                          disabled={isUploadingDescription}
                        >
                          {isUploadingDescription ? (
                            <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Plus className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddDescriptionImageFromInput}
                        className="px-4 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Description Image Thumbnails */}
                    {formData.descriptionImages && formData.descriptionImages.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {formData.descriptionImages.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Description ${index + 1}`}
                              className="w-full aspect-[3/4] object-cover rounded-lg border-2 border-primary/30"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveDescriptionImage(index)}
                              className="absolute top-1 right-1 bg-destructive hover:bg-destructive/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  images: [...(prev.images || []), img],
                                  image: prev.image || img
                                }))
                                toast({
                                  title: "Image copiée",
                                  description: "L'image a été ajoutée à la galerie",
                                })
                              }}
                              className="absolute bottom-1 right-1 bg-primary hover:bg-primary/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                              title="Copier vers la galerie"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Aucune image descriptive ajoutée</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-soft-hover hover:scale-105 active:scale-95"
                >
                  {isLoading ? "Traitement..." : "Enregistrer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setFormData({ images: [], descriptionImages: [] })
                    setGalleryImageInput("")
                    setDescriptionImageInput("")
                  }}
                  className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-all duration-200 font-semibold"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div >
        </div >
      )}
    </div>
  )
}
