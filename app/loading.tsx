"use client"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-center px-4">
      {/* Shimmer Box */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#B85C38] via-[#E6B17E] to-[#B85C38] animate-[shimmer_2s_infinite] mb-6" />

      {/* Text */}
      <p className="text-muted-foreground text-sm animate-pulse">
        Chargement en cours...
      </p>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}
