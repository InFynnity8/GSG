import * as React from "react"
import { cn } from "@/lib/utils"

interface PageCoverProps {
  imageUrl: string
  title: string
  subtitle?: React.ReactNode
  className?: string
}

export function PageCover({ imageUrl, title, subtitle, className }: PageCoverProps) {
  return (
    <div
      className={cn(
        "relative w-full bg-cover bg-center bg-no-repeat",
        className
      )}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      <div className="relative flex flex-col items-center justify-center text-center text-white py-20 md:py-28 px-6">
        <div className="w-12 h-0.5 bg-primary mb-6 opacity-80" />
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight leading-tight">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/80 drop-shadow leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
