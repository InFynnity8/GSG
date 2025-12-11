import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-[75vh] py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Ministry Departments</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            God Seeking Generation is organised into focused departments that
            serve the congregation and the neighbourhood. Below are our core
            departments, their purpose, meeting times, and the best way to get
            involved.
          </p>
        </header>

        <div className="p-6 mt-10 shadow-sm border rounded-lg bg-white">
          <section>
            <h2 className="text-2xl font-bold">Departments</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-md border bg-background">
                <h3 className="text-lg font-semibold">Worship</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  The Worship department leads musical and liturgical elements
                  for our gatherings. They train teams in music, audio, and
                  stage production to create spaces of meaningful worship.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">Meeting: Sundays, 8:30am (rehearsal)</p>
                <p className="mt-2 text-sm">Lead: Pastor James • <Link href="/contact" className="underline">Contact</Link></p>
              </div>

              <div className="p-4 rounded-md border bg-background">
                <h3 className="text-lg font-semibold">Outreach & Community</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Focused on practical service — food distribution, mentoring,
                  and local partnerships. This team organizes community projects
                  and short-term mission efforts.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">Meeting: Tuesdays, 6:00pm</p>
                <p className="mt-2 text-sm">Lead: Leah • <Link href="/contact" className="underline">Contact</Link></p>
              </div>

              <div className="p-4 rounded-md border bg-background">
                <h3 className="text-lg font-semibold">Youth & Students</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ministry for young people and students. Small-group discipleship,
                  campus outreach, and weekend programmes designed for the next
                  generation.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">Meeting: Fridays, 5:30pm</p>
                <p className="mt-2 text-sm">Lead: Daniel • <Link href="/contact" className="underline">Contact</Link></p>
              </div>

              <div className="p-4 rounded-md border bg-background">
                <h3 className="text-lg font-semibold">Media & Communications</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Handles social media, live-streaming, and promotional
                  materials. Volunteers help record services, edit content, and
                  manage online engagement.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">Meeting: Wednesdays, 7:00pm</p>
                <p className="mt-2 text-sm">Lead: Media Team • <Link href="/contact" className="underline">Contact</Link></p>
              </div>

              <div className="p-4 rounded-md border bg-background">
                <h3 className="text-lg font-semibold">Discipleship & Small Groups</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This department coordinates small groups, Bible studies, and
                  training for spiritual growth and leadership development.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">Meeting: Various small groups throughout the week</p>
                <p className="mt-2 text-sm">Lead: Discipleship Team • <Link href="/contact" className="underline">Contact</Link></p>
              </div>

              <div className="p-4 rounded-md border bg-background">
                <h3 className="text-lg font-semibold">Administration & Care</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Manages operations, finances, pastoral care, and volunteer
                  coordination. This team ensures ministries are resourced and
                  cared for.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">Office Hours: Mon–Fri, 9am–5pm</p>
                <p className="mt-2 text-sm">Lead: Office • <Link href="/contact" className="underline">Contact</Link></p>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-semibold">Get Involved</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Interested in serving on a team? We welcome volunteers from all
              backgrounds. Reach out to the department lead above or use the
              <Link href="/contact" className="underline ml-1">contact page</Link> to let us know where you'd like to serve.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}