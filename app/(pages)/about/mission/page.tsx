import { PageCover } from "@/components/ui/page-cover"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Heart, Search, Users, Zap, BookOpen, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const missionPoints = [
  {
    title: "Seek God's Face",
    icon: <Search className="w-7 h-7 text-primary" />,
    text: "To seek the LORD's face, glory, power and wisdom in our generation — placing prayer and intimacy with God at the centre of all we do.",
  },
  {
    title: "Save the Lost",
    icon: <Heart className="w-7 h-7 text-rose-500" />,
    text: "To seek and save the lost through outreach, evangelism, tract sharing, and one-on-one witnessing, bringing the Gospel to communities far and near.",
  },
  {
    title: "Equip the Saints",
    icon: <BookOpen className="w-7 h-7 text-blue-500" />,
    text: "To equip and perfect the saints by the revelation of God's word and the ministry of the Holy Spirit, raising a generation grounded in scripture.",
  },
  {
    title: "Demonstrate God's Power",
    icon: <Zap className="w-7 h-7 text-amber-500" />,
    text: "To demonstrate the power of the LORD through signs, wonders and miracles to confirm that Jesus is alive and active in this generation.",
  },
  {
    title: "Unity in the Faith",
    icon: <Users className="w-7 h-7 text-emerald-500" />,
    text: "To bring about unity in the faith and in the knowledge of the Son of God — bridging denominations and building one body in Christ.",
  },
]

export default function MissionPage() {
  return (
    <>
      <PageCover
        imageUrl="/images/mission.jpg"
        title="Mission & Vision"
        subtitle="Seeking the LORD's face, glory, power and wisdom in our generation."
      />

      <div className="min-h-[75vh] py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">

          <ScrollReveal direction="up" distance={20}>
            <div className="bg-white rounded-lg p-10 md:p-14 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Our Vision</p>
                <p className="text-2xl md:text-3xl text-slate-800 leading-relaxed font-semibold italic border-l-4 border-primary pl-6 py-2">
                  "To see the Glory of God restored and manifested in the Body of Christ."
                </p>
                <p className="mt-8 text-lg text-slate-600 leading-relaxed">
                  God Seeking Generation was founded on the conviction that this generation can experience the
                  fullness of God's glory. Every programme, every branch, and every gathering is shaped by
                  this singular vision — a generation wholly surrendered to God's purposes.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-20">
            <ScrollReveal direction="up" className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Mission</p>
              <h2 className="text-3xl font-bold text-slate-900">Five Mission Commitments</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
                These five pillars guide everything God Seeking Generation does.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missionPoints.map((item, i) => (
                <ScrollReveal key={i} delay={i * 80} direction="up" distance={20}>
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
            <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/60 mb-4">Join the Journey</p>
            <h2 className="text-3xl font-bold mb-5">Seek God With Us</h2>
            <p className="text-base text-primary-foreground/90 max-w-xl mx-auto mb-10 leading-relaxed">
              Whether you are just starting your faith journey or have walked with God for years,
              there is a place for you in God Seeking Generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild variant="secondary" className="h-11 px-8 text-base bg-white hover:bg-white/90 text-primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 h-11 px-8 text-base">
                <Link href="/about/branches">Find a Branch</Link>
              </Button>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </>
  )
}
