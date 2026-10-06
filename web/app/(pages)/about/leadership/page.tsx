import Image from "next/image"
import { PageCover } from "@/components/ui/page-cover"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const keyLeaders = [
  {
    name: "Rev. James Attah",
    role: "Founder",
    bio: "Reverend James Attah is the founder of God Seeking Generation and Head Pastor of New Birth Church, Obomeng-Kwahu. He established the ministry on October 5, 2010 with a vision to see the glory of God restored and manifested in the Body of Christ.",
    img: "/images/psJames.jpg",
    contact: "+233 24 330 3897",
  },
  {
    name: "Elvis A. Asiedu",
    role: "Administrator",
    bio: "Elvis serves as the National Administrator — the chief operational officer of GSG. He mediates between the Board of Patrons and all branches, executes board policies, and oversees day-to-day operations across the ministry.",
    img: "/images/psElvis.jpg",
    contact: "+233 55 952 5262",
  },
  {
    name: "Kwaah Ernest",
    role: "Kumasi Zonal President",
    bio: "Ernest coordinates all GSG branches within the Kumasi Zone, consolidating reports, mobilising members, and planning region-wide programmes to strengthen the ministry across the Ashanti Region.",
    img: "/images/psErnest.jpg",
    contact: "+233 59 205 4043",
  },
]

const boardOfPatrons = [
  { name: "Rev. James Attah", title: "Founder & Board Member" },
  { name: "Rev. Bernard Ameyaw", title: "Patron" },
  { name: "Rev. Alexander Gyampoh", title: "Patron" },
  { name: "Pastor Anyei Darko", title: "Patron" },
  { name: "Lady Pastor Obenewaa", title: "Patron" },
  { name: "Mr. Henry Kwaku Boafo", title: "Patron" },
  { name: "Dr. Emmanuel Odame Owiredu", title: "Patron" },
  { name: "Mr. Emmanuel Gyimah Koranteng", title: "National Coordinator" },
]

export default function Page() {
  return (
    <>
      <PageCover
        imageUrl="/images/leadership.jpg"
        title="Leadership"
        subtitle="Meet the team guiding God Seeking Generation with humility, service, and vision."
      />
      <div className="min-h-[75vh] py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">

          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Key Leaders</h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              Our operational leadership team works daily to advance the ministry's mission across Ghana.
            </p>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {keyLeaders.map((l, i) => (
              <ScrollReveal key={l.name} delay={i * 100} direction="up" distance={20}>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/10">
                    <Image src={l.img} alt={l.name} width={112} height={112} className="object-cover w-full h-full" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{l.name}</h3>
                  <p className="text-sm font-semibold text-primary mb-3">{l.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed grow">{l.bio}</p>
                  <p className="mt-4 text-xs text-slate-400 font-mono">{l.contact}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" className="mt-20">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-slate-900">Board of Patrons</h2>
                <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  The Board of Patrons provides ultimate spiritual oversight and governance — setting policy,
                  offering counsel, and approving constitutional amendments, budgets, and senior appointments.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {boardOfPatrons.map((patron) => (
                  <div key={patron.name} className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold text-sm">{patron.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">{patron.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{patron.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <p className="mt-10 text-center text-muted-foreground text-sm">
              GSG operates with a transparent governance structure. All zonal presidents and branch leaders
              report through the Administrator to the Board of Patrons.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}
