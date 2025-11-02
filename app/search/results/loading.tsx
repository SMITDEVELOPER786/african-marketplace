import { Skeleton } from "@/components/ui/skeleton"

export default function SearchResultsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container py-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="container py-6">
        <div className="flex gap-6">
          <Skeleton className="hidden lg:block w-64 h-96" />
          <div className="flex-1 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
