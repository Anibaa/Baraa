import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { MissionSection } from "@/components/about/mission-section"
import { VisionSection } from "@/components/about/vision-section"
import { WhyBaraa } from "@/components/about/why-Baraa"
import { ImpactStatistics } from "@/components/about/impact-statistics"
import { PartnerCTA } from "@/components/about/partner-cta"
import { WhatsAppContact } from "@/components/about/whatsapp-contact"

export const metadata: Metadata = {
  title: "À propos de Baraa – Livres scolaires en Tunisie",
  description:
    "Découvrez la mission et la vision de Baraa, la plateforme qui accompagne les étudiants tunisiens vers la réussite avec accès à des livres scolaires.",
  keywords: ["à propos", "Baraa", "mission", "vision", "éducation", "tunisie"],
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: "https://Baraa.com/about",
    title: "À propos de Baraa",
    description: "Découvrez la plateforme qui accompagne les étudiants tunisiens",
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
    title: "À propos de Baraa",
    description: "Découvrez la plateforme qui accompagne les étudiants tunisiens",
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <AboutHero />
        <MissionSection />
        <VisionSection />
        <WhyBaraa />
        <ImpactStatistics />
        <PartnerCTA />
        <WhatsAppContact />
      </main>
      <Footer />
    </>
  )
}
