"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'
import { EventItem } from '@/types/events'
import { formatEventTime } from '@/lib/utils'

const UpcomingEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([])

  useEffect(() => {
    async function load() {
      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gt('date', now)
        .order('date', { ascending: true })
        .limit(3)

      if (error) {
        console.error('failed to load events', error)
        return
      }
      setEvents(data ?? [])
    }
    load()
  }, [])

  return (
    <section className="w-full py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What's Coming</p>
            <h3 className="text-3xl font-bold text-slate-900">Upcoming Events</h3>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Join us for conventions, camp meetings, outreach, and prayer gatherings — all are welcome.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 border-slate-300 hover:bg-primary hover:text-white hover:border-primary">
            <Link href="/events">View all events</Link>
          </Button>
        </div>

        <ul className="space-y-3">
          {events.length === 0 ? (
            <li className="p-8 rounded-xl border bg-white text-center text-muted-foreground">
              <p className="font-medium">No upcoming events at this time.</p>
              <p className="text-sm mt-1">Check back soon or follow us on social media for updates.</p>
            </li>
          ) : (
            events.map((e) => (
              <li key={e.id} className="group rounded-xl border bg-white hover:border-primary hover:shadow-sm transition-all duration-200">
                <div className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="min-w-[52px] text-center bg-primary/5 rounded-lg py-2 px-3 border border-primary/10">
                      <p className="text-xs font-bold uppercase text-primary/70">
                        {new Date(e.date).toLocaleString(undefined, { month: 'short' })}
                      </p>
                      <p className="text-xl font-extrabold text-primary leading-none">
                        {new Date(e.date).getDate()}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{e.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{formatEventTime(e.time)}{e.venue ? ` · ${e.venue}` : ''}</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="shrink-0 bg-white hover:bg-primary hover:text-white hover:border-primary font-semibold">
                    <Link href={`/events/${e.id}`}>Details</Link>
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  )
}

export default UpcomingEvents