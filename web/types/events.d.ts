export type EventItem = {
  id: string
  title: string
  date: string
  type: string
  time: string | null
  endDate?: string | null
  endTime?: string | null
  slug?: string
  description: string
  venue: string
  image?: string | null
}
