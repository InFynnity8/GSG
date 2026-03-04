import { PageCover } from "@/components/ui/page-cover"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const branches = [
  {
    name: "Adullam",
    schedule: "Thursdays",
    description: "Emphasis on neighbourhood outreach and building deep local roots in the community through prayer and service.",
    accent: "bg-emerald-500",
  },
  {
    name: "Zion",
    schedule: "Thursdays",
    description: "Gatherings with worship, study, and mission projects tailored for the next generation of campus students.",
    accent: "bg-blue-500",
  },
  {
    name: "New Jerusalem",
    schedule: "Thursdays",
    description: "Centred on neighbourhood outreach and creating a warm, welcoming environment for all backgrounds.",
    accent: "bg-[#8B4513]", // Brown
  },
  {
    name: "Bethel",
    schedule: "Thursdays",
    description: "Includes food distribution, tutoring, and comprehensive family support programmes to meet practical needs.",
    accent: "bg-[#722F37]", // Wine
  },
]

export default function BranchesPage() {
  return (
    <>
      <PageCover
        imageUrl="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1600&auto=format&fit=crop"
        title="Branches & Gatherings"
        subtitle="Explore our local branches and how to connect with a community near you."
      />
      
      <div className="min-h-[75vh] py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-3xl font-bold text-slate-900">What to Expect</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
                Newcomers can expect a warm welcome, a brief time of worship, a scripture-based message, 
                and opportunities to connect in small groups.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, i) => (
              <ScrollReveal key={i} delay={i * 100} direction="up" distance={20}>
                <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-[300px]">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-11 h-11 rounded-md ${branch.accent} bg-opacity-10 flex items-center justify-center`}>
                      <MapPin className={`w-6 h-6 ${branch.accent.startsWith('bg-[') ? '' : branch.accent.replace('bg-', 'text-')}`} style={branch.accent.startsWith('bg-[') ? { color: branch.accent.match(/#\w+/)?.[0] } : {}} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded">
                      {branch.schedule}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{branch.name}</h3>
                  <p className="text-base text-slate-600 leading-relaxed overflow-hidden line-clamp-4">
                    {branch.description}
                  </p>
                  
                  <div className="mt-auto pt-4">
                    <Link href="/contact" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1.5">
                      Contact Branch
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" className="mt-20">
            <div className="bg-white rounded-lg p-10 shadow-sm border border-slate-200 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Start a New Gathering?</h3>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
                If you don't find a local branch near you and would like to start a new gathering, 
                please reach out — we love helping people connect.
              </p>
              <Button asChild className="h-11 px-8 text-base">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </>
  )
}
