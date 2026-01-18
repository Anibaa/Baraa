import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PartnerForm } from "@/components/partner/partner-form"
import { Users, TrendingUp, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Devenir Partenaire - Najahi",
  description: "Rejoignez le réseau de partenaires Najahi et partagez vos livres avec des millions d'étudiants",
}

export default function PartnerPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance animate-slideInLeft">
              Devenez Partenaire Najahi
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl text-pretty">
              Partagez vos livres avec des millions d'étudiants tunisiens et générez des revenus supplémentaires grâce à
              la plateforme Najahi de confiance
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-muted/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-primary animate-fadeInUp">
              Avantages de Devenir Partenaire
            </h2>
            <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
              Accédez à des outils puissants et une communauté de milliers d'étudiants
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div
                className="p-6 md:p-8 bg-card rounded-lg md:rounded-xl border border-border hover:border-primary/50 hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: "0s" }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-card-foreground mb-3">Accès Massif</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Présentez votre livre à des millions d'étudiants tunisiens à travers tous les niveaux d'études
                </p>
              </div>

              <div
                className="p-6 md:p-8 bg-card rounded-lg md:rounded-xl border border-border hover:border-primary/50 hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-card-foreground mb-3">Revenus Attrayants</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Recevez une commission intéressante sur chaque vente directe, avec des paiements sécurisés et rapides
                </p>
              </div>

              <div
                className="p-6 md:p-8 bg-card rounded-lg md:rounded-xl border border-border hover:border-primary/50 hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-card-foreground mb-3">Support Expert</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Bénéficiez de notre support technique spécialisé et d'outils marketing avancés
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-3 md:mb-4 text-center animate-fadeInUp">
              Soumettez Votre Livre
            </h2>
            <p className="text-muted-foreground text-center mb-8 md:mb-12 text-sm md:text-base max-w-xl mx-auto">
              Remplissez le formulaire ci-dessous et notre équipe examinera votre demande et vérifiera les détails du
              livre
            </p>

            <PartnerForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-muted/40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-8 md:mb-12 text-center animate-fadeInUp">
              Questions Fréquemment Posées
            </h2>

            <div className="space-y-4 md:space-y-6">
              {[
                {
                  q: "Combien de temps faut-il pour approuver une demande de partenariat?",
                  a: "Généralement, il faut 3 à 5 jours ouvrables pour approuver votre demande et vérifier les détails",
                },
                {
                  q: "Puis-je ajouter plusieurs livres?",
                  a: "Oui, vous pouvez ajouter plusieurs livres à la fois ou par étapes",
                },
                {
                  q: "Comment fonctionnent les paiements?",
                  a: "Les paiements sont effectués mensuellement par virement bancaire ou portefeuilles numériques",
                },
                {
                  q: "Quel est le pourcentage de commission?",
                  a: "Le taux de commission varie selon le type de livre et la transaction, généralement entre 20-30%",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 md:p-7 bg-card rounded-lg md:rounded-xl border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className="font-bold text-card-foreground mb-3 text-base md:text-lg">{item.q}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
