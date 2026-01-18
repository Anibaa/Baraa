"use client"

import { SuccessToast } from "./success-toast"
import { ErrorToast } from "./error-toast"
import type { ToastMessage } from "@/hooks/use-toast-manager"

interface ToastContainerProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {toasts.map((toast) =>
        toast.type === "success" ? (
          <SuccessToast
            key={toast.id}
            title={toast.title}
            message={toast.message}
            onClose={() => onRemove(toast.id)}
            duration={toast.duration || 3000}
          />
        ) : (
          <ErrorToast
            key={toast.id}
            title={toast.title}
            message={toast.message}
            onClose={() => onRemove(toast.id)}
            duration={toast.duration || 4000}
          />
        ),
      )}
    </div>
  )
}
