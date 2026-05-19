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
    title: "Prayer Ministry",
    icon: <Music className="w-6 h-6 text-primary" />,
    description: "Prayer is the foundation of GSG. Through Prayer Buffets (all-day prayer marathons), Prayer Walks across neighbourhoods, and dedicated intercession groups, we stand in the gap for individuals, families, and communities.",
    activity: "Prayer Buffet & Prayer Walk",
    lead: "Rev. James Attah"
  },
  {
    title: "Outreach & Evangelism",
    icon: <HandHeart className="w-6 h-6 text-emerald-500" />,
    description: "Reaching out with the Word of God, prayer, and support for material needs is at the heart of GSG's mission. Through field outreach, one-on-one witnessing, and community service, we spread hope and demonstrate Christ's love.",
    activity: "Field Outreach & Witnessing",
    lead: "Zonal Mobilisers"
  },
  {
    title: "Conventions & Gatherings",
    icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    description: "We cherish the fellowship of believers. Our conventions provide opportunities to gather in unity, strengthening faith and fostering spiritual growth. These gatherings are a source of inspiration, empowerment, and renewal.",
    activity: "Weekly & National Conventions",
    lead: "National Coordinator"
  },
  {
    title: "Tract & Media Ministry",
    icon: <Share2 className="w-6 h-6 text-amber-500" />,
    description: "One of our key evangelistic tools is the distribution of spiritually enriching tracts and uplifting messages. These materials reach hearts beyond the pulpit, offering spiritual guidance to those we may never meet in person.",
    activity: "Tract Sharing & Uplifting Messages",
    lead: "Media Team"
  },
  {
    title: "Camp Meetings",
    icon: <Users2 className="w-6 h-6 text-rose-500" />,
    description: "Our camp meetings are vibrant, spirit-filled events where we retreat from the busyness of life to focus on prayer, worship, and deep fellowship. These extended sessions provide a powerful space for spiritual growth and reflection.",
    activity: "Extended Retreat Events",
    lead: "Board of Patrons"
  },
  {
    title: "Administration & Finance",
    icon: <Settings className="w-6 h-6 text-slate-500" />,
    description: "Operations, branch coordination, financial accountability, and pastoral care are managed by our administration. A semi-annual internal audit ensures transparent stewardship across all branches.",
    activity: "Mon–Fri, Office Hours",
    lead: "Elvis A. Asiedu (Administrator)"
  }
]

export default function DepartmentsPage() {
  return (
    <>
      <PageCover
        imageUrl="/images/departments.jpg"
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
                  <p className="text-base text-slate-600 mb-8 grow leading-relaxed">
                    {dept.description}
                  </p>
                  
                  <div className="mt-auto space-y-3.5 pt-5 border-t border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Activity:</span>
                      <span className="font-medium text-slate-700 text-right max-w-[60%]">{dept.activity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Lead:</span>
                      <span className="font-medium text-slate-700 text-right max-w-[60%]">{dept.lead}</span>
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
