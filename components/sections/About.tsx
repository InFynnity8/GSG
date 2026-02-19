import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

function About() {
  return (
     <section className="w-full py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">About GSG</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                GSG is a welcoming community focused on faith, service, and
                meaningful connections. We gather for worship, learning, and
                outreach — offering places for people to belong, grow, and
                serve together.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </div>
            <div>
              <div className="max-h-80 rounded-lg flex items-center justify-center ">
                <Image src="/caro7.jpg" alt="About GSG" width={500} height={500} className="rounded-lg object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default About