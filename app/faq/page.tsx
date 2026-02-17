import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HelpCircle, Package, CreditCard, Truck, RefreshCw, Shield, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ - Questions Fréquentes | Baraa - براءة",
  description: "Trouvez des réponses à vos questions sur nos produits, la livraison, les paiements et les retours. Service client Baraa.",
  keywords: ["faq", "questions", "aide", "support", "livraison", "paiement", "retours", "baraa"],
}

const faqCategories = [
  {
    title: "Commandes & Produits",
    icon: Package,
    questions: [
      {
        q: "Comment puis-je passer une commande?",
        a: "Pour passer une commande, parcourez notre collection, ajoutez les articles souhaités à votre panier, puis cliquez sur 'Passer la commande'. Remplissez vos informations de livraison et choisissez votre mode de paiement."
      },
      {
        q: "Puis-je modifier ma commande après l'avoir passée?",
        a: "Vous pouvez modifier votre commande dans les 2 heures suivant sa validation en nous contactant via WhatsApp au +216 53 386 886. Après ce délai, la commande est en préparation."
      },
      {
        q: "Comment choisir la bonne taille?",
        a: "Consultez notre guide des tailles disponible sur chaque page produit. Nous proposons des tailles S à XXL. En cas de doute, contactez notre service client pour des conseils personnalisés."
      },
      {
        q: "Les couleurs des produits sont-elles fidèles aux photos?",
        a: "Nous faisons de notre mieux pour représenter fidèlement les couleurs. Cependant, elles peuvent légèrement varier selon votre écran. Contactez-nous pour plus de détails sur un produit spécifique."
      },
    ]
  },
  {
    title: "Paiement",
    icon: CreditCard,
    questions: [
      {
        q: "Quels modes de paiement acceptez-vous?",
        a: "Nous acceptons le paiement en espèces à la livraison (Cash on Delivery) et les paiements par carte bancaire. Tous les paiements sont sécurisés."
      },
      {
        q: "Le paiement en ligne est-il sécurisé?",
        a: "Oui, absolument. Nous utilisons des protocoles de sécurité SSL et nos paiements par carte sont traités via des plateformes sécurisées conformes aux normes PCI DSS."
      },
      {
        q: "Puis-je payer en plusieurs fois?",
        a: "Actuellement, nous n'offrons pas de paiement échelonné. Cependant, nous travaillons à intégrer cette option prochainement."
      },
      {
        q: "Recevrai-je une facture?",
        a: "Oui, une facture détaillée vous sera envoyée par email après confirmation de votre commande et sera également incluse dans votre colis."
      },
    ]
  },
  {
    title: "Livraison",
    icon: Truck,
    questions: [
      {
        q: "Quels sont les délais de livraison?",
        a: "Les délais de livraison sont de 2 à 5 jours ouvrables pour la Tunisie. Pour les zones éloignées, comptez 3 à 7 jours ouvrables."
      },
      {
        q: "Quels sont les frais de livraison?",
        a: "Les frais de livraison sont de 7 DT pour toute la Tunisie. La livraison est gratuite pour les commandes supérieures à 200 DT."
      },
      {
        q: "Livrez-vous à l'international?",
        a: "Actuellement, nous livrons uniquement en Tunisie. Nous prévoyons d'étendre nos services à l'international prochainement."
      },
      {
        q: "Comment puis-je suivre ma commande?",
        a: "Vous recevrez un numéro de suivi par SMS et email dès l'expédition de votre commande. Vous pouvez également nous contacter via WhatsApp pour connaître l'état de votre livraison."
      },
      {
        q: "Que faire si je ne suis pas disponible à la livraison?",
        a: "Le livreur vous contactera avant la livraison. Si vous n'êtes pas disponible, vous pouvez convenir d'un autre créneau ou désigner une personne pour réceptionner le colis."
      },
    ]
  },
  {
    title: "Retours & Échanges",
    icon: RefreshCw,
    questions: [
      {
        q: "Quelle est votre politique de retour?",
        a: "Vous disposez de 14 jours à compter de la réception pour retourner un article non porté, avec étiquettes, dans son emballage d'origine. Les frais de retour sont à votre charge."
      },
      {
        q: "Comment effectuer un retour?",
        a: "Contactez notre service client via WhatsApp au +216 53 386 886 pour initier un retour. Nous vous fournirons les instructions et l'adresse de retour."
      },
      {
        q: "Puis-je échanger un article?",
        a: "Oui, les échanges sont possibles dans les 14 jours. Contactez-nous pour organiser l'échange. Si la différence de prix existe, elle sera ajustée."
      },
      {
        q: "Quand serai-je remboursé?",
        a: "Le remboursement est effectué dans les 7 à 10 jours ouvrables après réception et vérification de l'article retourné, sur le même mode de paiement utilisé."
      },
      {
        q: "Les articles en promotion sont-ils échangeables?",
        a: "Oui, les articles en promotion suivent la même politique de retour et d'échange que les articles à prix normal."
      },
    ]
  },
  {
    title: "Produits & Qualité",
    icon: Shield,
    questions: [
      {
        q: "Quelle est la qualité de vos tissus?",
        a: "Nous utilisons uniquement des tissus premium : soie naturelle, crêpe de haute qualité, jersey stretch, coton égyptien et velours côtelé. Chaque produit indique sa composition."
      },
      {
        q: "Comment entretenir mes vêtements?",
        a: "Chaque article est accompagné d'instructions d'entretien détaillées. En général, nous recommandons un lavage délicat à 30°C et un séchage à plat pour préserver la qualité."
      },
      {
        q: "Vos produits sont-ils conformes aux normes islamiques?",
        a: "Oui, tous nos vêtements sont conçus dans le respect des principes de modestie islamique, avec des coupes amples et des tissus opaques."
      },
      {
        q: "Proposez-vous des produits pour occasions spéciales?",
        a: "Oui, nous avons une collection spéciale pour le Ramadan, l'Aïd et les mariages, avec des kaftans brodés et des abayas de cérémonie."
      },
      {
        q: "Les broderies sont-elles faites à la main?",
        a: "Nos pièces de luxe comportent des broderies faites à la main par des artisans qualifiés. Les détails sont précisés sur chaque fiche produit."
      },
    ]
  },
  {
    title: "Compte & Service Client",
    icon: MessageCircle,
    questions: [
      {
        q: "Dois-je créer un compte pour commander?",
        a: "Non, vous pouvez commander en tant qu'invité. Cependant, créer un compte vous permet de suivre vos commandes et de bénéficier d'offres exclusives."
      },
      {
        q: "Comment contacter le service client?",
        a: "Vous pouvez nous contacter via WhatsApp au +216 53 386 886, par email à contact@baraa.com, ou via le formulaire de contact sur notre site."
      },
      {
        q: "Quels sont vos horaires de service client?",
        a: "Notre service client est disponible du dimanche au jeudi de 9h à 18h, et le samedi de 9h à 13h. Fermé le vendredi."
      },
      {
        q: "Proposez-vous un programme de fidélité?",
        a: "Oui, nous préparons actuellement un programme de fidélité qui sera lancé prochainement. Inscrivez-vous à notre newsletter pour être informé."
      },
      {
        q: "Comment puis-je recevoir les promotions?",
        a: "Inscrivez-vous à notre newsletter et suivez-nous sur les réseaux sociaux (Instagram, Facebook) pour ne manquer aucune promotion ou nouveauté."
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gold-gradient text-primary-foreground py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4 animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideInLeft">
              Questions Fréquentes
            </h1>
            <p className="text-primary-foreground/90 text-base md:text-lg max-w-2xl mx-auto">
              Trouvez rapidement des réponses à vos questions sur Baraa - براءة
            </p>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-8 px-4 md:px-8 bg-muted/30 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-xl p-6 md:p-8 border border-primary/20 shadow-soft">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    Vous ne trouvez pas votre réponse?
                  </h3>
                  <p className="text-muted-foreground">
                    Notre équipe est là pour vous aider
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/21653386886"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:contact@baraa.com"
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {faqCategories.map((category, catIdx) => {
              const IconComponent = category.icon
              return (
                <div
                  key={catIdx}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${catIdx * 0.1}s` }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions */}
                  <div className="space-y-4">
                    {category.questions.map((item, qIdx) => (
                      <details
                        key={qIdx}
                        className="group bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300"
                      >
                        <summary className="cursor-pointer p-5 md:p-6 font-semibold text-card-foreground hover:text-primary transition-colors list-none flex items-center justify-between">
                          <span className="flex-1 pr-4">{item.q}</span>
                          <svg
                            className="w-5 h-5 text-primary transition-transform group-open:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                          <p className="text-muted-foreground leading-relaxed border-t border-border pt-4">
                            {item.a}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              Encore des questions?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              N'hésitez pas à nous contacter. Notre équipe se fera un plaisir de vous aider et de répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/21653386886"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                Contactez-nous sur WhatsApp
              </a>
              <a
                href="/blog"
                className="px-8 py-4 bg-card text-card-foreground border-2 border-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Visitez notre Blog
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
