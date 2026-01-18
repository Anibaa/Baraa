"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "./admin-auth"

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  if (!isAdminAuthenticated()) {
    return <div>Redirection vers la connexion...</div>
  }

  return children
}
