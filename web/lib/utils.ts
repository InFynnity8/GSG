import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a time string (e.g. "18:05:14") to 12-hour AM/PM format (e.g. "06:05 PM")
 */
export function formatEventTime(timeString: string | undefined | null) {
  if (!timeString) return ""
  
  try {
    // Expected format HH:mm:ss or HH:mm
    const [hours, minutes] = timeString.split(":")
    const h = parseInt(hours, 10)
    const ampm = h >= 12 ? "PM" : "AM"
    const displayHours = h % 12 || 12
    const displayMinutes = minutes || "00"
    
    return `${String(displayHours).padStart(2, "0")}:${displayMinutes} ${ampm}`
  } catch (err) {
    console.error("Error formatting time:", err)
    return timeString // fallback to original
  }
}
