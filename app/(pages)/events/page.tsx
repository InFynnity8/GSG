"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { supabase } from '../../../utils/supabase'
import { EventItem } from "@/types/events"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X as XIcon } from "lucide-react"



function formatDateParts(iso: string) {
  const d = new Date(iso)
  return {
    month: d.toLocaleString(undefined, { month: "short" }),
    day: String(d.getDate()),
    year: String(d.getFullYear()),
  }
}

export default function EventsPage() {
  const [query, setQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [events, setEvents] = useState<EventItem[]>([])
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [showCalendarDrawer, setShowCalendarDrawer] = useState(false)


  useEffect(() => {
    async function getEvents() {
      let query = supabase.from("events").select("*")
      if (showUpcomingOnly) {
        const now = new Date().toISOString()
        query = query.gt("date", now)
      }

      const { data, error } = await query

      if (error) {
        console.error("error fetching events", error)
        return
      }
      setEvents((data as EventItem[]) ?? [])
    }

    getEvents()
  }, [showUpcomingOnly])


  const types = useMemo(() => {
    const set = new Set<string>()
    events.forEach((e) => set.add(e.type))
    return Array.from(set)
  }, [events])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const now = Date.now()

    return events
      .filter((e) => {
        // server already filters future events when the checkbox is active,
        // but we'll keep this as a fallback.
        if (showUpcomingOnly && new Date(e.date).getTime() < now) return false
        if (selectedTypes.length > 0 && !selectedTypes.includes(e.type))
          return false
        if (!q) return true
        return (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.type.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => {
        if (sortOrder === "asc")
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  }, [query, selectedTypes, showUpcomingOnly, sortOrder, events])

  function toggleType(t: string) {
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }

  const eventDates = useMemo(() => {
    return events.map((e) => new Date(e.date))
  }, [events])

  const eventsOnSelectedDay = useMemo(() => {
    if (!selectedDay) return []
    const start = new Date(selectedDay)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + 1)
    return events.filter((e) => {
      const d = new Date(e.date)
      return d >= start && d < end
    })
  }, [selectedDay, events])

  return (
    <div className="min-h-[75vh] py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Events & Timeline</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Explore upcoming and past ministry events. Use the filters or
            search to find a specific event. Click an event to view more details.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <div className="p-4 bg-white border rounded-md shadow-sm">
              <label className="block text-sm font-medium">Search</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="mt-2 w-full rounded-md border px-3 py-2"
              />

        

              <div className="mt-4 flex items-center justify-between">
                <label className="text-sm">Upcoming only</label>
                <input
                  type="checkbox"
                  checked={showUpcomingOnly}
                  onChange={(e) => setShowUpcomingOnly(e.target.checked)}
                  className="h-4 w-4"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm">Sort</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                  className="mt-2 w-full rounded-md border px-2 py-2"
                >
                  <option value="asc">Soonest first</option>
                  <option value="desc">Newest first</option>
                </select>
              </div>

              <div className="mt-6">
                <Dialog open={showCalendarDrawer} onOpenChange={setShowCalendarDrawer}>
                  <DialogTrigger asChild>
                    <Button className="w-full">View calendar</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Event Calendar</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      selected={selectedDay}
                      onSelect={setSelectedDay}
                      modifiers={{ hasEvent: eventDates }}
                      modifiersClassNames={{ hasEvent: "bg-primary text-primary-foreground" }}
                    />
                    {selectedDay && eventsOnSelectedDay.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold">
                          Events on {selectedDay.toLocaleDateString()}
                        </h3>
                        <ul className="mt-2 space-y-2">
                          {eventsOnSelectedDay.map((e) => (
                            <li key={e.id} className="border rounded p-2 bg-white flex justify-between items-center">
                              <div>
                                <p className="font-semibold">{e.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(e.date).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                              <Button asChild variant="outline" size="sm" className="bg-white hover:bg-primary">
                                <Link href="/events">Details</Link>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </aside>

          <section className="md:col-span-3">
            <div className="h-[70vh] overflow-auto md:p-4">
              <div className="relative">
                {/* vertical connector line */}
                <div className="absolute left-8 top-6 bottom-6 w-px bg-slate-200" />

                <div className="space-y-12 md:pr-6">
                  {filtered.length === 0 ? (
                    <div className="p-6 bg-white border rounded-md text-center text-muted-foreground">No events match your filters.</div>
                  ) : (
                    filtered.map((e, idx) => {
                      const parts = formatDateParts(e.date)
                      return (
                        <article key={e.id} className="relative pl-20 pr-4 pb-2">
                          {/* dot */}
                          <div className="absolute left-8 top-3 -translate-x-1/2">
                            <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow" />
                          </div>

                          {/* date to the left of the dot - stacked column */}
                          <div className="absolute -left-4 top-0 w-28 text-right flex flex-col items-end">
                            <div className="text-sm text-muted-foreground uppercase">{parts.month}</div>
                            <div className="text-2xl font-semibold">{parts.day}</div>
                            <div className="text-sm text-muted-foreground">{parts.year}</div>
                          </div>

                          <div className="ml-16 bg-white border rounded-md p-4 flex md:flex-row flex-col items-center justify-between gap-4 shadow-sm">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold">{e.title}</h3>
                              <div className="text-sm text-muted-foreground mt-1">{new Date(e.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                              <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                            </div>

                            <div className="w-full md:w-36 min-h-24 bg-slate-100 rounded-md flex items-center justify-center text-slate-400">Image</div>
                          </div>
                        </article>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>

  )
}