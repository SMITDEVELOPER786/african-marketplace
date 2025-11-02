export default function Loading() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 h-10 w-48 animate-pulse rounded bg-muted" />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-lg bg-muted" />
    </div>
  )
}
