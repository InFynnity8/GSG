"use client"

import { PageCover } from "@/components/ui/page-cover"
import { Clock, Target, TrendingUp, Rocket } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const sections = [
  {
    title: "The Beginning (2010)",
    icon: <Clock className="w-6 h-6" />,
    text: "God Seeking Generation was officially registered at the Registrar General's Department on October 5, 2010 (Registration No. G-33,926), headquartered at Obomeng-Kwahu in the Eastern Region of Ghana. The ministry was founded by Reverend James Attah, Head Pastor of New Birth Church, Obomeng-Kwahu, with a burning vision to see the glory of God restored and manifested in the Body of Christ.",
    color: "bg-blue-500",
  },
  {
    title: "Building Bridges Across Denominations",
    icon: <TrendingUp className="w-6 h-6" />,
    text: "From its inception, GSG distinguished itself as a non-denominational ministry — a bold and deliberate decision. Reverend Attah gathered a diverse team of like-minded ministers from The Methodist Church Ghana, the Presbyterian Church of Ghana, The Church of Pentecost, and Living Word Restoration. This unity across denominational lines became a hallmark of the ministry's identity and a testament to its core belief in unity in the faith.",
    color: "bg-emerald-500",
  },
  {
    title: "Expanding Across Ghana",
    icon: <Target className="w-6 h-6" />,
    text: "Starting from its Obomeng-Kwahu headquarters, the ministry grew steadily to establish branches in major cities and campuses across Ghana.",
    list: [
      "Zion Branch – KNUST Campus, Kumasi",
      "Bethel Branch – Gaza, Kumasi",
      "Adullam Branch – Ayeduase, Kumasi",
      "New Jerusalem Branch – Bomso, Kumasi",
      "Asafo Fellowship – Kumasi",
      "UHAS Fellowship – Ho, Volta Region",
      "New Abirem Fellowship – Eastern Region",
    ],
    color: "bg-amber-500",
  },
  {
    title: "Seeking God in This Generation",
    icon: <Rocket className="w-6 h-6" />,
    text: "Today, God Seeking Generation continues to pursue its founding mission — seeking the LORD's face, saving the lost, equipping the saints, and demonstrating the power of God through signs and wonders. Through outreach, conventions, camp meetings, prayer walks, and one-on-one evangelism, GSG is actively fulfilling the call to bring unity in the faith and in the knowledge of the Son of God.",
    color: "bg-primary",
  },
]

function TimelineCard({ sec, i }: { sec: typeof sections[0], i: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col sm:flex-row items-center justify-between transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
    >
      {/* Timeline Node Icon */}
      <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-slate-50 shadow-sm z-10 sm:flex">
        <div className={`p-2 rounded-full text-white ${sec.color}`}>
          {sec.icon}
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full sm:w-[45%] group">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
          <div className="flex items-center gap-3 mb-4 sm:hidden">
            <div className={`p-2 rounded-lg text-white ${sec.color}`}>
              {sec.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{sec.title}</h2>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 hidden sm:block">{sec.title}</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            {sec.text}
          </p>

          {sec.list && (
            <ul className="mt-6 space-y-3">
              {sec.list.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-500">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${sec.color}`} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden sm:block w-[45%]" />
    </div>
  )
}

export default function Page() {
  return (
    <>
      <PageCover
        imageUrl="/images/history.jpg"
        title="Our Story"
        subtitle="The journey of God Seeking Generation — from Obomeng-Kwahu to a growing national ministry since 2010."
      />

      <div className="min-h-[75vh] py-20 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-16 relative">
            {sections.map((sec, i) => (
              <TimelineCard key={i} sec={sec} i={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
