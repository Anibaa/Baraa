import Image from "next/image"

const PARTNERS = [
    { name: "Ministère de l'Éducation", logo: "/logo.png" },
    { name: "CNP", logo: "/placeholder.svg" },
    { name: "Université de Tunis", logo: "/placeholder.svg" },
    { name: "Institut Français", logo: "/placeholder.svg" },

]

export function TrustedBy() {
    return (
        <section className="border-y border-border/50 bg-muted/10 py-12 md:py-20 px-4 md:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Title */}
                <div className="mb-8 md:mb-10 text-center">
                    <h3 className="text-sm md:text-base font-semibold tracking-wide text-foreground uppercase opacity-70">
                        Ils nous font confiance
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                        Institutions et partenaires officiels
                    </p>
                </div>

                {/* Logos */}
                <ul
                    role="list"
                    className="
            flex flex-wrap items-center justify-center
            gap-8 md:gap-16
          "
                >
                    {PARTNERS.map((partner) => (
                        <li
                            key={partner.name}
                            className="
                relative
                h-10 w-14 md:h-14 md:w-40
              "
                        >
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                sizes="(max-width: 768px) 112px, 160px"
                                className="
                  object-contain
                  grayscale opacity-60
                  transition-all duration-300
                  hover:grayscale-0 hover:opacity-100 hover:scale-105
                "
                            />
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    )
}
