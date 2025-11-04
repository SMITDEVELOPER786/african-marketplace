export default function Loading() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 animate-pulse">
        <div className="h-8 w-48 rounded bg-muted" />
        <div className="mt-2 h-4 w-96 rounded bg-muted" />
      </div>
      <div className="space-y-4">
        <div className="h-32 rounded-lg bg-muted" />
        <div className="h-96 rounded-lg bg-muted" />
      </div>
    </div>
  )
}
