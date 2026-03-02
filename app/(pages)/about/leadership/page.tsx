import { PageCover } from "@/components/ui/page-cover"

export default function Page() {
  return (
    <>
      <PageCover
        imageUrl="/images/coverphoto.jpg"
        title="Leadership"
        subtitle="Meet the team guiding GSG with humility, service and vision."
      />
      <div className="min-h-[75vh] py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
        

        <div className="p-6 mt-10 shadow-sm border rounded-lg bg-white">
          <section className="mt-2 grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg border bg-background">
              <h3 className="font-semibold">Pastor James Atta (Founder)</h3>
              <p className="text-sm text-muted-foreground mt-2">
                James helped plant the first gatherings and focuses on
                preaching, pastoral care, and leadership development.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-background">
              <h3 className="font-semibold">Pastor Elvis (Administrator)</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Elvis oversees outreach programmes, volunteer coordination, and
                local partnerships.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-background">
              <h3 className="font-semibold">Pastor Akron (President)</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Akron leads youth ministry, campus groups, and discipleship for
                the next generation.
              </p>
            </div>
          </section>

          <p className="mt-6 text-muted-foreground">
            Our leadership team is supported by volunteers and advisory elders
            from partner communities. Transparency, pastoral care, and
            mentorship are key priorities for the team.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
