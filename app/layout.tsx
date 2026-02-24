import type React from "react"
import type { Metadata, Viewport } from "next"
import { Rubik } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const rubik = Rubik({ 
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  title: "براءة - Baraa | أزياء إسلامية نسائية فاخرة",
  description: "اكتشفي مجموعتنا الحصرية من الملابس الإسلامية للنساء. عباءات أنيقة، حجابات راقية، وأزياء محتشمة عالية الجودة.",
  keywords: ["أزياء إسلامية", "عباية", "حجاب", "ملابس محتشمة", "أزياء نسائية", "أناقة", "فخامة", "براءة", "baraa"],
  openGraph: {
    type: "website",
    locale: "ar_TN",
    url: "https://baraa.com",
    title: "براءة - Baraa | أزياء إسلامية نسائية",
    description: "مجموعة حصرية من الملابس الإسلامية الأنيقة للنساء العصريات",
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
    title: "براءة - Baraa",
    description: "أزياء إسلامية نسائية فاخرة",
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
    { media: "(prefers-color-scheme: light)", color: "#4f4537" },
    { media: "(prefers-color-scheme: dark)", color: "#b5a999" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${rubik.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
