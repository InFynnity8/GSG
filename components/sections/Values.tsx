'use client'

import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const Values = () => {
  const values = [
    {
      title: 'Faithfulness',
      description:
        'We remain steadfast in our commitment to God and His word. Faithfulness means being reliable, consistent, and true to our promises to ourselves, each other, and our community.',
    },
    {
      title: 'Accountability',
      description:
        'We take responsibility for our actions and decisions. Accountability ensures transparency and integrity in all that we do, building trust within our congregation and the wider community.',
    },
    {
      title: 'Excellence',
      description:
        'We pursue excellence in all our endeavors, striving to give our best in service, worship, and community outreach. Excellence reflects our respect for God and our commitment to serving others.',
    },
    {
      title: 'Sacrifice',
      description:
        'We believe in giving selflessly for the greater good. Sacrifice embodies the spirit of service, putting the needs of others before our own interests.',
    },
    {
      title: 'Unity',
      description:
        'We are committed to building a strong, unified community. Unity means celebrating our diversity while standing together in faith, purpose, and mutual support.',
    },
    {
      title: 'Love',
      description:
        'Love is the foundation of everything we do. We express love through compassion, kindness, and service to all members of our congregation and beyond.',
    },
    {
      title: 'Humility',
      description:
        'We practice humility by recognizing our limitations and remaining open to growth. Humility keeps us grounded and reminds us that we are all on a spiritual journey together.',
    },
  ]

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold">Our Core Values</h3>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            At GSG, we are guided by our core values of faith, service, and
            community. We strive to create a welcoming environment where
            everyone can grow spiritually, serve others, and build meaningful
            relationships.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {values.map((value, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="py-4 text-lg font-semibold hover:no-underline">
                  {value.title}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {value.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default Values