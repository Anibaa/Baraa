import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Baraa - براءة | Mode Islamique Féminine de Luxe",
  description: "Découvrez notre collection exclusive de vêtements islamiques pour femmes. Abayas, hijabs, et tenues modestes élégantes.",
  keywords: ["mode islamique", "abaya", "hijab", "vêtements modestes", "mode féminine", "élégance", "luxe", "baraa", "براءة"],
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: "https://baraa.com",
    title: "Baraa - براءة | Mode Islamique Féminine",
    description: "Collection exclusive de vêtements islamiques élégants pour femmes modernes",
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
    title: "Baraa - براءة",
    description: "Mode Islamique Féminine de Luxe",
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
    { media: "(prefers-color-scheme: light)", color: "#D4AF37" },
    { media: "(prefers-color-scheme: dark)", color: "#D4AF37" },
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
