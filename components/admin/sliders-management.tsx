"use client"

import { useState, useRef, useEffect } from "react"
import { Edit2, Trash2, Plus, X } from "lucide-react"
import type { SliderItem } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface SlidersManagementProps {
  sliders: SliderItem[]
}

export function SlidersManagement({ sliders }: SlidersManagementProps) {
  const [items, setItems] = useState<SliderItem[]>(sliders)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSlider, setEditingSlider] = useState<SliderItem | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [cta, setCta] = useState("")
  const [link, setLink] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const openCreateModal = () => {
    setEditingSlider(null)
    setTitle("")
    setImageUrl("")
    setFile(null)
    setIsModalOpen(true)
  }

  const handleEdit = (slider: SliderItem) => {
    setEditingSlider(slider)
    setTitle(slider.title)
    setImageUrl(slider.image || "")
    setFile(null)
    setIsModalOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setFile(f)
    if (f) {
      const obj = URL.createObjectURL(f)
      setPreviewUrl(obj)
      setImageUrl(obj)
    }
    // allow selecting same file again
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous certain de vouloir supprimer cette promotion?")) return
    try {
      const res = await fetch(`/api/sliders/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (res.ok) {
        setItems((prev) => prev.filter((s) => s.id !== id))
        toast({ title: "Succès", description: json.message || "Promotion supprimée avec succès" })
        router.refresh()
      } else {
        toast({ title: "Erreur", description: json.error || "Erreur lors de la suppression", variant: "destructive" })
      }
    } catch (err) {
      console.error(err)
      toast({ title: "Erreur réseau", description: "Erreur réseau lors de la suppression", variant: "destructive" })
    }
  }

  const uploadFileIfNeeded = async (): Promise<string | null> => {
    if (!file) return null
    const form = new FormData()
    form.append("file", file)
    const res = await fetch(`/api/upload`, { method: "POST", body: form })
    const json = await res.json()
    if (res.ok && json.url) {
      // revoke local preview URL if it was used
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      return json.url
    }
    throw new Error(json.error || "Upload failed")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Ensure image is provided either by URL input or file
      let finalImage = imageUrl
      if (!finalImage && !file) {
        toast({ title: "Erreur", description: "L'image est requise", variant: "destructive" })
        setIsSubmitting(false)
        return
      }

      if (file) {
        const uploaded = await uploadFileIfNeeded()
        if (uploaded) finalImage = uploaded
      }

      const payload = {
        title,
        image: finalImage,
      }

      if (editingSlider) {
        const res = await fetch(`/api/sliders/${editingSlider.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        const json = await res.json()
        if (res.ok) {
          setItems((prev) => prev.map((s) => (s.id === editingSlider.id ? json.data : s)))
          setIsModalOpen(false)
          toast({ title: "Succès", description: json.message || "Promotion mise à jour avec succès" })
          router.refresh()
        } else {
          toast({ title: "Erreur", description: json.error || "Erreur lors de la mise à jour", variant: "destructive" })
        }
      } else {
        const res = await fetch(`/api/sliders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        const json = await res.json()
        if (res.ok) {
          setItems((prev) => [json.data, ...prev])
          setIsModalOpen(false)
          toast({ title: "Succès", description: json.message || "Promotion créée avec succès" })
          router.refresh()
        } else {
          toast({ title: "Erreur", description: json.error || "Erreur lors de la création", variant: "destructive" })
        }
      }
    } catch (err: any) {
      console.error(err)
      toast({ title: "Erreur", description: err?.message || "Erreur inattendue", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="animate-fadeInUp">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Gestion des Promotions</h2>
          <p className="text-muted-foreground text-sm mt-1">Gérez les bannières promotionnelles</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 hover:shadow-soft-hover hover:scale-105 active:scale-95 font-semibold w-full md:w-auto justify-center md:justify-start"
        >
          <Plus className="w-5 h-5" />
          Ajouter une Promotion
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((slider, idx) => (
          <div
            key={slider.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-soft-hover transition-all duration-200 bg-white animate-fadeInUp"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <img
              src={slider.image || "/placeholder.svg"}
              alt={slider.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{slider.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(slider)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded transition-colors text-sm font-semibold"
                >
                  <Edit2 className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(slider.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded transition-colors text-sm font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeInUp">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {editingSlider ? "Modifier la Promotion" : "Ajouter une Nouvelle Promotion"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Titre</label>
                <input
                  type="text"
                  placeholder="Titre de la promotion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Image Web (ou uploadez depuis votre ordinateur)</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="URL de l'image pour le web"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    <button type="button" className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg border border-border h-full flex items-center justify-center min-w-[3rem]">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {imageUrl && (
                  <img src={imageUrl} alt="preview" className="mt-2 h-24 object-contain" />
                )}
              </div>


              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-semibold"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
