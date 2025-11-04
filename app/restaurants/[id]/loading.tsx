export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-muted rounded-lg" />
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      </div>
    </div>
  )
}
