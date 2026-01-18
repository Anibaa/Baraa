import { Skeleton } from "@/components/ui/skeleton"

export function BookCardSkeleton() {
  return (
    <div className="bg-card rounded-lg md:rounded-xl overflow-hidden border border-border p-4">
      <Skeleton className="aspect-[3/4] mb-4 rounded-lg" />
      <Skeleton className="h-4 mb-3 rounded" />
      <Skeleton className="h-3 mb-3 w-2/3 rounded" />
      <Skeleton className="h-3 mb-3 rounded" />
      <div className="flex justify-between gap-2">
        <Skeleton className="h-6 flex-1 rounded" />
        <Skeleton className="h-6 w-1/3 rounded" />
      </div>
    </div>
  )
}
