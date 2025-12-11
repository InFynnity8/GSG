import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Give = () => {
  return (
    <section className="w-full py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold">Support the Mission</h3>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Your generosity helps fund community programs, outreach, and weekly
            gatherings. Every gift makes a difference.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button asChild>
              <Link href="/give">Give Now</Link>
            </Button>
            <Button asChild variant="outline" className='bg-transparent hover:bg-transparent hover:text-black'>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
  )
}

export default Give