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
          <h3 className="text-2xl font-bold">Upcoming Events</h3>
          <p className="mt-2 text-muted-foreground">
            Join us for community gatherings, worship nights, and service
            opportunities. All are welcome — bring a friend.
          </p>

          <ul className="mt-6 space-y-4">
            {events.length === 0 ? (
              <li className="p-4 rounded-lg border bg-white text-center text-muted-foreground">No upcoming events</li>
            ) : (
              events.map((e) => (
                <li key={e.id} className="p-4 rounded-lg border bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{e.title}</p>
                      <p className="text-sm text-muted-foreground">{new Date(e.date).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} • {formatEventTime(e.time)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button asChild variant="outline" size="sm" className="bg-white hover:bg-primary font-bold h-9 px-5"  >
                        <Link href={`/events/${e.id}`}>Details</Link>
                      </Button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>

          <div className="mt-6">
            <Button asChild>
              <Link href="/events">View all events</Link>
            </Button>
          </div>
        </div>
      </section>
  )
}

export default UpcomingEvents