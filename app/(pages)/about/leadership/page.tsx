import Image from "next/image"
import { PageCover } from "@/components/ui/page-cover"

const leaders = [
  {
    name: "Pastor James Atta",
    role: "Founder",
    bio: "James helped plant the first gatherings and focuses on preaching, pastoral care, and leadership development.",
    img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Pastor Elvis",
    role: "Administrator",
    bio: "Elvis oversees outreach programmes, volunteer coordination, and local partnerships.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Pastor Ernest",
    role: "President",
    bio: "Ernest leads youth ministry, campus groups, and discipleship for the next generation.",
    img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=400&auto=format&fit=crop",
  },
]

export default function Page() {
  return (
    <>
      <PageCover
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop"
        title="Leadership"
        subtitle="Meet the team guiding GSG with humility, service and vision."
      />
      <div className="min-h-[75vh] py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {leaders.map((l) => (
              <div key={l.name} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={l.img} alt={l.name} width={96} height={96} className="object-cover" />
                </div>
                <h3 className="text-lg font-semibold">{l.name}</h3>
                <p className="text-sm text-primary mb-2">{l.role}</p>
                <p className="text-sm text-muted-foreground">{l.bio}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-muted-foreground">
            Our leadership team is supported by volunteers and advisory elders
            from partner communities. Transparency, pastoral care, and
            mentorship are key priorities for the team.
          </p>
        </div>
      </div>
    </>
  )
}
