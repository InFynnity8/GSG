import Link from "next/link"

export default function Contact() {
  return (
    <div className="min-h-[75vh] py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Contact & Locations</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            We’d love to hear from you. Find our main branch locations on the
            map below and use the contact details to get in touch. For specific
            branch information, select the branch from the map or message us.
          </p>
        </header>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <section className="rounded-lg bg-white border p-4">
            <div className="w-full h-80 md:h-[420px] rounded-md overflow-hidden">
              {/* Replace the src with your real Google Maps / Mapbox embed URL */}
              <iframe
                title="GSG Branches Map - Kwahu, Eastern Region"
                src="https://www.google.com/maps?q=Eastern+Region,+Ghana&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Head Office</h3>
                <p className="text-sm text-muted-foreground mt-1">123 Hope Street, Accra</p>
                <p className="text-sm text-muted-foreground">Phone: +233 30 000 0000</p>
                <p className="text-sm text-muted-foreground">Email: <a className="underline" href="mailto:info@gsg.org">info@gsg.org</a></p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Connect</h3>
                <p className="text-sm text-muted-foreground mt-1">Office Hours: Mon–Fri, 9:00am–5:00pm</p>
                <p className="text-sm text-muted-foreground">Prayer line: +233 24 000 0000</p>
                <p className="text-sm text-muted-foreground">Follow us: <Link className="underline" href="#">Facebook</Link> · <Link className="underline" href="#">Instagram</Link></p>
              </div>
            </div>
          </section>

          <aside className="rounded-lg bg-white border p-6">
            <h3 className="text-lg font-semibold">Other Branches</h3>
            <p className="mt-2 text-sm text-muted-foreground">Find your nearest gathering and contact them directly for branch-specific times and ministries.</p>

            <ul className="mt-4 space-y-3">
              <li className="p-3 border rounded-md">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">Adullam Branch</div>
                    <div className="text-sm text-muted-foreground">Sunday • 9:30am • +233 24 111 2222</div>
                  </div>
                  <Link href="/about/branches/adullam" className="text-sm underline">Details</Link>
                </div>
              </li>

              <li className="p-3 border rounded-md">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">Zion Branch</div>
                    <div className="text-sm text-muted-foreground">Saturday • 5:00pm • +233 20 333 4444</div>
                  </div>
                  <Link href="/about/branches/zion" className="text-sm underline">Details</Link>
                </div>
              </li>

              <li className="p-3 border rounded-md">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">Bethel Branch</div>
                    <div className="text-sm text-muted-foreground">Wednesday • 6:00pm • +233 24 555 6666</div>
                  </div>
                  <Link href="/about/branches/bethel" className="text-sm underline">Details</Link>
                </div>
              </li>
            </ul>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-semibold">Need assistance?</h4>
              <p className="text-sm text-muted-foreground mt-2">Use the contact form on the site or email <a className="underline" href="mailto:giving@gsg.org">giving@gsg.org</a> for giving-related queries.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}