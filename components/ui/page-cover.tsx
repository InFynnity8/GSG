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
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative flex flex-col items-center justify-center text-center text-white py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
