import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Give = () => {
  return (
    <section className="w-full py-20 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-3">Partner With Us</p>
            <h3 className="text-3xl font-bold">Support the Mission</h3>
            <p className="mt-4 text-primary-foreground/80 leading-relaxed max-w-lg">
              Your generosity enables God Seeking Generation to run outreach programmes,
              conventions, camp meetings, and branch operations across Ghana.
              Every gift advances the Kingdom.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90 h-11 px-7 text-base">
                <Link href="/give">Give Now</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white/50 text-white hover:bg-white/10 h-11 px-7 text-base">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Year Founded', value: '2010' },
              { label: 'Active Branches', value: '8+' },
              { label: 'Denominations', value: '5+' },
              { label: 'Years of Ministry', value: '15+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-6 text-center border border-white/20">
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/70 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Give