
import { Book } from "@/lib/types"

interface BookDescriptionImageProps {
    images?: string[]
    alt: string
}

export function BookDescriptionImage({ images, alt }: BookDescriptionImageProps) {
    if (!images || images.length === 0) return null

    return (
        <div className="mt-8 md:mt-12 space-y-6 animate-fadeInUp">
            {images.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden border border-border shadow-soft">
                    <div className="bg-muted p-1 border-b border-border">
                        <p className="text-xs font-semibold text-muted-foreground px-3 py-1 uppercase tracking-wider">
                            Aperçu détaillé {images.length > 1 ? `${index + 1}` : ''}
                        </p>
                    </div>
                    <div className="relative w-full bg-muted">
                        <img
                            src={image}
                            alt={`Description visuelle de ${alt} ${index + 1}`}
                            className="w-full h-auto"
                            loading="lazy"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
