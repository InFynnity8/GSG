import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const UpcomingEvents = () => {
  return (
     <section className="w-full py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold">Upcoming Events</h3>
          <p className="mt-2 text-muted-foreground">
            Join us for community gatherings, worship nights, and service
            opportunities. All are welcome — bring a friend.
          </p>

          <ul className="mt-6 space-y-4">
            <li className="p-4 rounded-lg border bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Community Potluck</p>
                  <p className="text-sm text-muted-foreground">Sat • Jan 10 • 5:30pm</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button asChild variant="outline" size="sm" className="bg-white hover:bg-primary"  >
                    <Link href="/events">Details</Link>
                  </Button>
                </div>
              </div>
            </li>

            <li className="p-4 rounded-lg border bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Worship Night</p>
                  <p className="text-sm text-muted-foreground">Fri • Feb 6 • 7:00pm</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button asChild variant="outline" size="sm" className="bg-white hover:bg-primary"  >
                    <Link href="/events">Details</Link>
                  </Button>
                </div>
              </div>
            </li>
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