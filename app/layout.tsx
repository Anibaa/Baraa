import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Najahi - Plateforme de Livres Éducatifs Tunisienne",
  description: "Découvrez les meilleurs livres éducatifs pour les étudiants tunisiens à tous les niveaux scolaires",
  keywords: ["livres", "éducation", "tunisie", "étudiants", "apprentissage"],
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: "https://najahi.com",
    title: "Najahi - Plateforme de Livres Éducatifs",
    description: "Plateforme intégrée pour acheter et vendre des livres éducatifs tunisiens",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Najahi",
    description: "Plateforme de Livres Éducatifs Tunisienne",
  },
  icons: {
    icon: [
      {
        url: "/logo.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.ico",
        type: "image/svg+xml",
      },
    ],
    apple: "//logo.ico",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1742f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1742f8" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" dir="ltr">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
