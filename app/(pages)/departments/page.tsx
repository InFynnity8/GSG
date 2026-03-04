import Link from "next/link"
import { PageCover } from "@/components/ui/page-cover"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { 
  Music, 
  HandHeart, 
  GraduationCap, 
  Share2, 
  Users2, 
  Settings
} from "lucide-react"

const departments = [
  {
    title: "Worship",
    icon: <Music className="w-6 h-6 text-primary" />,
    description: "Leading musical and liturgical elements for our gatherings. We train teams in music, audio, and stage production.",
    meeting: "Sundays, 8:30am",
    lead: "Pastor James"
  },
  {
    title: "Outreach & Community",
    icon: <HandHeart className="w-6 h-6 text-emerald-500" />,
    description: "Practical service — food distribution, mentoring, and local partnerships to meet neighbourhood needs.",
    meeting: "Tuesdays, 6:00pm",
    lead: "Leah"
  },
  {
    title: "Youth & Students",
    icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    description: "Small-group discipleship, campus outreach, and weekend programmes for the next generation.",
    meeting: "Fridays, 5:30pm",
    lead: "Daniel"
  },
  {
    title: "Media & Communications",
    icon: <Share2 className="w-6 h-6 text-amber-500" />,
    description: "Social media, live-streaming, and promotional materials to manage online and in-person engagement.",
    meeting: "Wednesdays, 7:00pm",
    lead: "Media Team"
  },
  {
    title: "Discipleship & Small Groups",
    icon: <Users2 className="w-6 h-6 text-rose-500" />,
    description: "Coordinating Bible studies and training for spiritual growth and leadership development.",
    meeting: "Various times",
    lead: "Discipleship Team"
  },
  {
    title: "Administration & Care",
    icon: <Settings className="w-6 h-6 text-slate-500" />,
    description: "Operations, finances, pastoral care, and volunteer coordination to ensure ministries are resourced.",
    meeting: "Mon–Fri, 9am–5pm",
    lead: "Office"
  }
]

export default function DepartmentsPage() {
  return (
    <>
      <PageCover
        imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
        title="Ministry Departments"
        subtitle="Learn about the teams that serve our congregation and neighbourhood."
      />
      
      <div className="min-h-[75vh] py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          
          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our Departments</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
              Explore the various ways our community serves together.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => (
              <ScrollReveal key={i} delay={i * 50} direction="up" distance={20}>
                <div className="bg-white rounded-lg p-7 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md h-full flex flex-col">
                  <div className="mb-5 p-3 bg-slate-50 rounded-md w-fit">
                    {dept.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{dept.title}</h3>
                  <p className="text-base text-slate-600 mb-8 flex-grow leading-relaxed">
                    {dept.description}
                  </p>
                  
                  <div className="mt-auto space-y-3.5 pt-5 border-t border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Meeting:</span>
                      <span className="font-medium text-slate-700">{dept.meeting}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Lead:</span>
                      <span className="font-medium text-slate-700">{dept.lead}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" className="mt-16">
            <div className="bg-white rounded-lg p-10 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Interested in Joining?</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  We welcome volunteers from all backgrounds. Reach out to join a team and start serving.
                </p>
              </div>
              <Button asChild className="shrink-0 h-11 px-8 text-base">
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}
