"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus, X } from "lucide-react"
import type { SliderItem } from "@/lib/types"

interface SlidersManagementProps {
  sliders: SliderItem[]
}

export function SlidersManagement({ sliders }: SlidersManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSlider, setEditingSlider] = useState<SliderItem | null>(null)

  const handleEdit = (slider: SliderItem) => {
    setEditingSlider(slider)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous certain de vouloir supprimer cette promotion?")) {
      alert("Promotion supprimée avec succès")
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
          onClick={() => {
            setEditingSlider(null)
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 hover:shadow-soft-hover hover:scale-105 active:scale-95 font-semibold w-full md:w-auto justify-center md:justify-start"
        >
          <Plus className="w-5 h-5" />
          Ajouter une Promotion
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sliders.map((slider, idx) => (
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
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{slider.subtitle}</p>

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

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Titre</label>
                <input
                  type="text"
                  placeholder="Titre de la promotion"
                  defaultValue={editingSlider?.title || ""}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Sous-titre / Description</label>
                <textarea
                  placeholder="Description courte"
                  defaultValue={editingSlider?.subtitle || ""}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Image Web</label>
                <input
                  type="text"
                  placeholder="URL de l'image pour le web"
                  defaultValue={editingSlider?.image || ""}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Texte du Bouton</label>
                  <input
                    type="text"
                    placeholder="ex: Découvrir"
                    defaultValue={editingSlider?.cta || ""}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Lien</label>
                  <input
                    type="text"
                    placeholder="ex: /books"
                    defaultValue={editingSlider?.link || ""}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-semibold"
                >
                  Enregistrer
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
