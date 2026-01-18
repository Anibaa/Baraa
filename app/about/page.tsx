import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { MissionSection } from "@/components/about/mission-section"
import { VisionSection } from "@/components/about/vision-section"
import { WhyNajahi } from "@/components/about/why-najahi"
import { ImpactStatistics } from "@/components/about/impact-statistics"
import { PartnerCTA } from "@/components/about/partner-cta"
import { WhatsAppContact } from "@/components/about/whatsapp-contact"

export const metadata: Metadata = {
  title: "À propos de Najahi – Livres scolaires en Tunisie",
  description:
    "Découvrez la mission et la vision de Najahi, la plateforme qui accompagne les étudiants tunisiens vers la réussite avec accès à des livres scolaires et universitaires.",
  keywords: ["à propos", "najahi", "mission", "vision", "éducation", "tunisie"],
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: "https://najahi.com/about",
    title: "À propos de Najahi",
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
    title: "À propos de Najahi",
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
        <WhyNajahi />
        <ImpactStatistics />
        <PartnerCTA />
        <WhatsAppContact />
      </main>
      <Footer />
    </>
  )
}
