export default function Page() {
  return (
    <div className="min-h-[75vh] py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Mission & Vision</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            God Seeking Generation (GSG) exists to pursue two intertwined
            callings: to know God more deeply and to create communities where
            transformed lives can flourish. Our vision is a generation that seeks
            God with purpose, worships with authenticity, and serves with
            compassion.
          </p>
        </header>

        <div className="p-6 mt-10 shadow-sm border rounded-lg bg-white">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">What Drives Us</h2>
            <p className="text-muted-foreground">
              At the heart of GSG is a simple conviction: spiritual formation is
              communal. We believe that faith grows when people gather, share
              life, and engage in mission together. That belief shapes our
              gatherings, discipleship pathways, and outreach programmes.
            </p>

            <h3 className="text-xl font-semibold mt-4">Core Commitments</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>
                Worship: Creating spaces (online and in-person) where people
                encounter God through honest worship and biblical teaching.
              </li>
              <li>
                Formation: Offering discipleship and small groups to help people
                grow in faith, character, and calling.
              </li>
              <li>
                Service: Mobilizing volunteers to serve neighbourhoods and respond
                to pressing needs with practical compassion.
              </li>
              <li>
                Multiplication: Planting and supporting local branches so more
                communities can experience life-change.
              </li>
            </ul>

            <p className="mt-6 text-muted-foreground">
              Our mission is expressed through weekly gatherings, community
              events, short-term projects, and long-term partnerships with local
              service organisations. We welcome people at all stages of faith
              and encourage everyone to take their next step in community.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
