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
  title: "À propos de Baraa - براءة | Mode Islamique Féminine",
  description:
    "Découvrez l'histoire de Baraa, notre passion pour la mode islamique élégante et notre engagement envers les femmes musulmanes modernes.",
  keywords: ["à propos", "Baraa", "براءة", "mode islamique", "histoire", "valeurs", "mission"],
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: "https://baraa.com/about",
    title: "À propos de Baraa - براءة",
    description: "Découvrez notre passion pour la mode islamique élégante",
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
    title: "À propos de Baraa - براءة",
    description: "Mode Islamique Féminine de Luxe",
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
        <WhatsAppContact />
      </main>
      <Footer />
    </>
  )
}
