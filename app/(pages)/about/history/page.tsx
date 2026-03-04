import { PageCover } from "@/components/ui/page-cover"
import Image from "next/image"

const sections = [
  {
    title: "Early Years",
    text: "In the early years, GSG focused on simple rhythms: prayer, study, hospitality, and service. These practices drew people from different backgrounds into deep friendships and gave rise to a pattern of multiplying small groups and local ministries.",
    img: "https://source.unsplash.com/600x400/?prayer,smallgroup",
  },
  {
    title: "Growth & Impact",
    text: "Over time, the movement established formal branches, launched youth and community programmes, and partnered with local organisations to meet practical needs like food distribution, mentoring, and tutoring. Stories of transformation—restored relationships, lives redirected, and deeper spiritual growth—became common among those involved.",
    img: "https://source.unsplash.com/600x400/?community,growth",
  },
  {
    title: "Milestones",
    text: "Several key milestones mark our journey, from the founding home group and first public gathering to the launch of outreach programmes and partnerships with local nonprofits and schools.",
    list: [
      "Founding home group and first public gathering",
      "Launch of first community outreach programme",
      "Establishment of multiple city branches",
      "Partnerships with local nonprofits and schools",
    ],
    img: "https://source.unsplash.com/600x400/?milestone,timeline",
  },
  {
    title: "Looking Ahead",
    text: "Today, GSG continues to learn and adapt—holding fast to practices that nurture discipleship while experimenting with new ways to reach the next generation.",
    img: "https://source.unsplash.com/600x400/?future,vision",
  },
]

export default function Page() {
  return (
    <>
      <PageCover
        imageUrl="https://source.unsplash.com/1600x900/?history,community"
        title="Our Story"
        subtitle="The journey of God Seeking Generation from a small gathering to a growing movement."
      />

      <div className="min-h-[75vh] py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          {sections.map((sec, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-6 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/3">
                <Image
                  src={sec.img}
                  alt={sec.title}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
              <div className="w-full md:w-2/3 prose prose-lg">
                <h2>{sec.title}</h2>
                <p>{sec.text}</p>
                {sec.list && (
                  <ul className="list-disc pl-5">
                    {sec.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
