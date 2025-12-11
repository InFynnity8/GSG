import * as React from "react"

export default function ScrollArea({
  children,
  className = "",
  style = {},
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`overflow-auto rounded-md ${className}`}
      style={{ scrollbarWidth: "thin", ...style }}
    >
      {children}
    </div>
  )
}
