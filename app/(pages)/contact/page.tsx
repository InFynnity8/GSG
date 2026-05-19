import Link from "next/link"
import { PageCover } from "@/components/ui/page-cover"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const branchContacts = [
  { name: "Zion – KNUST Campus", location: "Kumasi", phone: "+233 55 952 5262" },
  { name: "Bethel – Gaza", location: "Kumasi", phone: "+233 55 642 9544" },
  { name: "Adullam – Ayeduase", location: "Kumasi", phone: "+233 55 861 5167" },
  { name: "New Jerusalem – Bomso", location: "Kumasi", phone: "+233 59 205 4043" },
  { name: "Asafo Fellowship", location: "Kumasi", phone: "+233 55 390 4808" },
  { name: "UHAS Fellowship", location: "Ho, Volta Region", phone: "+233 20 265 8447" },
]

const leadership = [
  { name: "Rev. James Attah", role: "Founder", phone: "+233 24 330 3897" },
  { name: "Mr. Henry K. Boafo", role: "Patron", phone: "+233 20 766 0005" },
  { name: "Dr. Emmanuel O. Owiredu", role: "Patron", phone: "+233 54 255 8774" },
  { name: "Mr. Emmanuel G. Koranteng", role: "National Coordinator", phone: "+233 54 969 9001" },
  { name: "Elvis A. Asiedu", role: "Administrator", phone: "+233 55 952 5262" },
]

export default function Contact() {
  return (
    <>
      <PageCover
        imageUrl="/images/coverphoto2.jpg"
        title="Contact & Locations"
        subtitle="Get in touch or find one of our branches near you."
      />
      <div className="min-h-[75vh] py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal direction="up">
              <section className="rounded-xl bg-white border border-slate-200 shadow-sm p-6 h-full">
                <div className="w-full h-72 md:h-[320px] rounded-md overflow-hidden">
                  <iframe
                    title="GSG Headquarters – Obomeng-Kwahu, Eastern Region, Ghana"
                    src="https://www.google.com/maps?q=Obomeng+Kwahu+Eastern+Region+Ghana&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Headquarters</h3>
                    <p className="text-sm text-muted-foreground">Obomeng-Kwahu, Eastern Region, Ghana</p>
                    <p className="text-sm text-muted-foreground mt-1">P.O. Box AN 7933, Obomeng-Kwahu</p>
                    <p className="text-sm text-muted-foreground mt-1">Founder: <span className="font-medium text-slate-700">+233 24 330 3897</span></p>
                    <p className="text-sm text-muted-foreground mt-1">Admin: <span className="font-medium text-slate-700">+233 55 952 5262</span></p>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">National Coordinator</h3>
                    <p className="text-sm text-muted-foreground">Mr. Emmanuel G. Koranteng</p>
                    <p className="text-sm text-muted-foreground mt-1"><span className="font-medium text-slate-700">+233 54 969 9001</span></p>
                    <p className="text-sm text-muted-foreground mt-3">Online Service:</p>
                    <Link href="https://gsg.online.church/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">gsg.online.church</Link>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            <div className="flex flex-col gap-6">
              <ScrollReveal direction="up" delay={100}>
                <aside className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
                  <h3 className="text-base font-bold text-slate-900 mb-1">Branch Contacts</h3>
                  <p className="mt-1 text-sm text-muted-foreground mb-4">Contact any branch directly for local service times and programmes.</p>

                  <ul className="space-y-2">
                    {branchContacts.map((branch) => (
                      <li key={branch.name} className="p-3 border border-slate-100 rounded-lg bg-slate-50 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-sm text-slate-800">{branch.name}</p>
                          <p className="text-xs text-muted-foreground">{branch.location}</p>
                        </div>
                        <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-xs font-mono text-primary hover:underline whitespace-nowrap">
                          {branch.phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={150}>
                <aside className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
                  <h3 className="text-base font-bold text-slate-900 mb-4">National Leadership Directory</h3>
                  <ul className="space-y-2">
                    {leadership.map((person) => (
                      <li key={person.name} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium text-slate-800">{person.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">· {person.role}</span>
                        </div>
                        <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="text-xs font-mono text-primary hover:underline">
                          {person.phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}