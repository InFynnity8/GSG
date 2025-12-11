export default function Page() {
  return (
    <div className="min-h-[75vh] py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Branches & Gatherings
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            GSG operates through a network of local branches that gather weekly
            for worship, teaching, and community life. Each branch adapts to the
            needs of its neighbourhood while holding to shared rhythms of
            prayer, discipleship, and service.
          </p>
        </header>

        <div className="p-6 mt-10   shadow-sm border rounded-lg bg-white">
          <section className="">
            <h2 className="text-2xl font-bold">What to Expect</h2>
            <p className="text-muted-foreground">
              Newcomers can expect a warm welcome, a brief time of worship, a
              scripture-based message, and opportunities to connect in small
              groups. Many branches also run midweek community groups and
              service projects.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-bold">Branches</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 mt-3">
              <li>
                Adullam — Sunday morning gathering with an emphasis on
                neighbourhood outreach.
              </li>
              <li>
                Zion — Student-led gatherings with worship, study, and mission
                projects.
              </li>
              <li>
                New Jerusalem — Sunday morning gathering with an emphasis on
                neighbourhood outreach.
              </li>
              <li>
                Bethel — Midweek food distribution, tutoring, and family support
                programmes.
              </li>
            </ul>
          </section>

          <p className="mt-6 text-muted-foreground">
            If youd like to find a local branch or start a new gathering, please
            reach out through our contact page — we love helping people connect.
          </p>
        </div>
      </div>
    </div>
  );
}
