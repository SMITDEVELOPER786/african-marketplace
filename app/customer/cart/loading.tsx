import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function CartLoading() {
  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-8">
        <Skeleton className="h-4 w-40 mb-4" />
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex gap-4">
                <Skeleton className="h-24 w-24 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-20" />
                  <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <Skeleton className="h-7 w-40 mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="h-12 w-full mt-6" />
          </Card>
        </div>
      </div>
    </div>
  )
}
