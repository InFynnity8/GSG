import { PageCover } from "@/components/ui/page-cover"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Heart, BookOpen, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const commitments = [
  {
    title: "Worship",
    icon: <Heart className="w-7 h-7 text-rose-500" />,
    text: "Creating spaces (online and in-person) where people encounter God through honest worship and biblical teaching.",
  },
  {
    title: "Formation",
    icon: <BookOpen className="w-7 h-7 text-blue-500" />,
    text: "Offering discipleship and small groups to help people grow in faith, character, and calling.",
  },
  {
    title: "Service",
    icon: <Users className="w-7 h-7 text-emerald-500" />,
    text: "Mobilizing volunteers to serve neighbourhoods and respond to pressing needs with practical compassion.",
  },
  {
    title: "Multiplication",
    icon: <Globe className="w-7 h-7 text-amber-500" />,
    text: "Planting and supporting local branches so more communities can experience life-change.",
  },
]

export default function MissionPage() {
  return (
    <>
      <PageCover
        imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
        title="Mission & Vision"
        subtitle="Our purpose: know God deeply and foster communities where lives are transformed."
      />
      
      <div className="min-h-[75vh] py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          
          <ScrollReveal direction="up" distance={20}>
            <div className="bg-white rounded-lg p-10 md:p-14 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">What Drives Us</h2>
                <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                  "At the heart of GSG is a simple conviction: spiritual formation is communal. We believe that faith grows when people gather, share life, and engage in mission together."
                </p>
                <p className="mt-8 text-lg text-slate-600 leading-relaxed">
                  That belief shapes our gatherings, discipleship pathways, and outreach programmes. 
                  Our mission is expressed through weekly gatherings, community events, short-term projects, 
                  and long-term partnerships with local service organisations.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-20">
            <ScrollReveal direction="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Core Commitments</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
                These four pillars guide everything we do as a generation seeking after God's heart.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commitments.map((item, i) => (
                <ScrollReveal key={i} delay={i * 100} direction="up" distance={20}>
                  <div className="bg-white p-7 rounded-lg shadow-sm border border-slate-200 h-full transition-all duration-300 hover:shadow-md">
                    <div className="mb-5 bg-slate-50 w-14 h-14 rounded-md flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal direction="up" className="mt-20 bg-primary rounded-lg p-12 text-center text-white shadow-md">
            <h2 className="text-3xl font-bold mb-5">Join the Community</h2>
            <p className="text-base text-primary-foreground/90 max-w-xl mx-auto mb-10 leading-relaxed">
              We welcome people at all stages of faith and encourage everyone to take their next step in community.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild variant="secondary" className="h-11 px-8 text-base bg-white hover:bg-white/90 text-primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 h-11 px-8 text-base">
                <Link href="/events">Upcoming Events</Link>
              </Button>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </>
  )
}
