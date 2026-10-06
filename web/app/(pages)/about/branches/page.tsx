import { PageCover } from "@/components/ui/page-cover"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const branches = [
  {
    name: "Headquarters",
    fullName: "Obomeng-Kwahu (HQ)",
    location: "Eastern Region",
    description: "The founding home of God Seeking Generation, established on October 5, 2010. All national leadership and the Board of Patrons operate from the Obomeng-Kwahu headquarters.",
    accent: "bg-primary",
    phone: "+233 24 330 3897",
    isHQ: true,
  },
  {
    name: "Zion",
    fullName: "Zion – KNUST Campus",
    location: "Kumasi",
    description: "A vibrant campus-based fellowship at KNUST, bringing together students in worship, prayer, and outreach. A centre of spiritual awakening for the next generation of leaders.",
    accent: "bg-blue-500",
    phone: "+233 55 952 5262",
  },
  {
    name: "Bethel",
    fullName: "Bethel – Gaza",
    location: "Kumasi",
    description: "Located in the Gaza area of Kumasi, Bethel serves its community through fellowship, outreach, and practical support, embodying the spirit of God's dwelling among the people.",
    accent: "bg-[#722F37]",
    phone: "+233 55 642 9544",
  },
  {
    name: "Adullam",
    fullName: "Adullam – Ayeduase",
    location: "Kumasi",
    description: "Serving the Ayeduase community, Adullam is a refuge for all who seek God — a place of strength, fellowship, and transformative outreach in its neighbourhood.",
    accent: "bg-emerald-500",
    phone: "+233 55 861 5167",
  },
  {
    name: "New Jerusalem",
    fullName: "New Jerusalem – Bomso",
    location: "Kumasi",
    description: "Situated in Bomso, New Jerusalem is committed to spreading hope and the Gospel through conventions, prayer, and one-on-one evangelism among its residents.",
    accent: "bg-[#8B4513]",
    phone: "+233 59 205 4043",
  },
  {
    name: "Asafo Fellowship",
    fullName: "Asafo Fellowship",
    location: "Kumasi",
    description: "The Asafo Fellowship gathers believers from across the Asafo area of Kumasi, providing a consistent space for worship, teaching, and community outreach.",
    accent: "bg-orange-500",
    phone: "+233 55 390 4808",
  },
  {
    name: "UHAS Fellowship",
    fullName: "UHAS Fellowship – Ho",
    location: "Ho, Volta Region",
    description: "God Seeking Generation at the University of Health and Allied Sciences, nurturing a community of healthcare students and professionals united in faith and calling.",
    accent: "bg-violet-500",
    phone: "+233 20 265 8447",
  },
  {
    name: "New Abirem",
    fullName: "New Abirem Fellowship",
    location: "Eastern Region",
    description: "Serving the New Abirem community in the Eastern Region, this fellowship carries forward GSG's founding mission of seeking God's face and reaching the lost.",
    accent: "bg-green-600",
    phone: null,
  },
]

export default function BranchesPage() {
  return (
    <>
      <PageCover
        imageUrl="/images/branches.avif"
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
              <ScrollReveal key={i} delay={i * 80} direction="up" distance={20}>
                <div className={`bg-white rounded-lg p-6 border shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-full ${branch.isHQ ? 'border-primary/30 ring-1 ring-primary/20' : 'border-slate-200'}`}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full ${branch.accent}`} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {branch.isHQ && (
                        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded">HQ</span>
                      )}
                      <span className="text-xs font-medium uppercase tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded">
                        {branch.location}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{branch.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{branch.fullName}</p>
                  <p className="text-sm text-slate-600 leading-relaxed grow">
                    {branch.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {branch.phone && (
                      <p className="text-xs font-mono text-slate-500">{branch.phone}</p>
                    )}
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
