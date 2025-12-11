export default function Page() {
  return (
    <div className="min-h-[75vh] py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Our Story</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            The story of God Seeking Generation began with a handful of people
            who shared a desire to see authentic faith lived out in everyday
            life. What started as a small home gathering quickly grew into a
            movement of neighbourhood communities, student groups, and outreach
            teams.
          </p>
        </header>

        <div className="p-6 mt-10 shadow-sm border rounded-lg bg-white">
          <section>
            <h2 className="text-2xl font-bold">Early Years</h2>
            <p className="text-muted-foreground">
              In the early years, GSG focused on simple rhythms: prayer, study,
              hospitality, and service. These practices drew people from
              different backgrounds into deep friendships and gave rise to a
              pattern of multiplying small groups and local ministries.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-bold">Growth & Impact</h2>
            <p className="text-muted-foreground">
              Over time, the movement established formal branches, launched
              youth and community programmes, and partnered with local
              organisations to meet practical needs like food distribution,
              mentoring, and tutoring. Stories of transformation—restored
              relationships, lives redirected, and deeper spiritual growth—became
              common among those involved.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-bold">Milestones</h2>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Founding home group and first public gathering</li>
              <li>Launch of first community outreach programme</li>
              <li>Establishment of multiple city branches</li>
              <li>Partnerships with local nonprofits and schools</li>
            </ul>
          </section>

          <p className="mt-6 text-muted-foreground">
            Today, GSG continues to learn and adapt—holding fast to practices
            that nurture discipleship while experimenting with new ways to reach
            the next generation.
          </p>
        </div>
      </div>
    </div>
  )
}
