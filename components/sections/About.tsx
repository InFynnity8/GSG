import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const stats = [
  { label: 'Founded', value: '2010' },
  { label: 'Branches', value: '8+' },
  { label: 'Denominations', value: '5+' },
]

function About() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Est. October 5, 2010 · Reg. No. G-33,926</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              About God Seeking Generation
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              God Seeking Generation is a registered non-denominational Christian ministry
              headquartered at Obomeng-Kwahu, Ghana. Founded by Reverend James Attah alongside
              ministers from diverse denominations, we are united by one mission — to seek the
              LORD's face, save the lost, and manifest His glory in this generation.
            </p>

            <div className="mt-8 flex gap-6 border-t border-slate-100 pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/about/history">Our Story</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent hover:bg-transparent hover:text-black border-slate-300">
                <Link href="/about/mission">Our Mission</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/caro7.jpg"
              alt="God Seeking Generation community"
              width={600}
              height={450}
              className="rounded-2xl object-cover w-full shadow-lg"
            />
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-5 py-3 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Vision</p>
              <p className="text-sm font-bold leading-snug max-w-[200px] mt-0.5">
                Seeing God's glory restored in the Body of Christ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
