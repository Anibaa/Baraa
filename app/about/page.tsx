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
  title: "من نحن - براءة | Baraa | أزياء إسلامية نسائية",
  description:
    "اكتشفي قصة براءة، شغفنا بالأزياء الإسلامية الأنيقة والتزامنا تجاه النساء المسلمات العصريات.",
  keywords: ["من نحن", "براءة", "Baraa", "أزياء إسلامية", "قصة", "قيم", "مهمة"],
  openGraph: {
    type: "website",
    locale: "ar_TN",
    url: "https://baraa.com/about",
    title: "من نحن - براءة | Baraa",
    description: "اكتشفي شغفنا بالأزياء الإسلامية الأنيقة",
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
    title: "من نحن - براءة | Baraa",
    description: "أزياء إسلامية نسائية فاخرة",
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
