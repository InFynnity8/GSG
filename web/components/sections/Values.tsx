'use client'

import React from 'react'
import { Shield, Scale, Star, Heart, Users, HeartHandshake, Leaf } from 'lucide-react'

const values = [
  {
    title: 'Faithfulness',
    icon: <Shield className="w-5 h-5 text-primary" />,
    description:
      'We remain steadfast in our commitment to God and His word — reliable, consistent, and true to our promises to God, each other, and our community.',
  },
  {
    title: 'Accountability',
    icon: <Scale className="w-5 h-5 text-blue-500" />,
    description:
      'We take responsibility for our actions and decisions. Accountability ensures transparency and integrity, building trust within our congregation and the wider community.',
  },
  {
    title: 'Excellence',
    icon: <Star className="w-5 h-5 text-amber-500" />,
    description:
      'We pursue excellence in all our endeavors — striving to give our best in service, worship, and outreach as an expression of our reverence for God.',
  },
  {
    title: 'Sacrifice',
    icon: <Heart className="w-5 h-5 text-rose-500" />,
    description:
      'We believe in giving selflessly for the greater good. Sacrifice embodies the spirit of service, putting the needs of others before our own interests.',
  },
  {
    title: 'Unity',
    icon: <Users className="w-5 h-5 text-emerald-500" />,
    description:
      'We are committed to building a strong, unified community — celebrating our diversity across denominations while standing together in faith and mutual support.',
  },
  {
    title: 'Love',
    icon: <HeartHandshake className="w-5 h-5 text-red-500" />,
    description:
      'Love is the foundation of everything we do. We express love through compassion, kindness, and service to all members of our congregation and beyond.',
  },
  {
    title: 'Humility',
    icon: <Leaf className="w-5 h-5 text-green-600" />,
    description:
      'We practice humility by recognizing our limitations and remaining open to growth — staying grounded as we journey together in pursuit of God\'s glory.',
  },
]

const Values = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What We Stand For</p>
          <h3 className="text-3xl font-bold">Our Core Values</h3>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            At God Seeking Generation, we are guided by values rooted in scripture — uniting believers
            from diverse denominations around a common pursuit of God's glory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-primary/5 transition-colors">
                {value.icon}
              </div>
              <h4 className="text-lg font-bold mb-2 text-slate-900">{value.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values