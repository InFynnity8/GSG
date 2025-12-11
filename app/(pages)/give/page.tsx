import Link from "next/link"

export default function Donate() {
  return (
    <div className="min-h-[75vh] py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Give / Donate</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Thank you for supporting God Seeking Generation. Below are the
            secure ways you can give — mobile money, bank transfer, or in-person.
            Follow the instructions for each method and contact us if you need
            any assistance.
          </p>
        </header>

        <main className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Mobile Money - MTN */}
          <section className="rounded-lg bg-white p-6 shadow-sm border">
            <h2 className="text-lg font-semibold">MTN Mobile Money</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Send funds directly to our MTN Mobile Money account.
            </p>

            <div className="mt-4 space-y-2">
              <div className="text-sm">
                <span className="font-medium">Account name:</span> God Seeking Generation
              </div>
              <div className="text-sm">
                <span className="font-medium">Number:</span> <span className="">+233 24 000 0000</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Network:</span> MTN Mobile Money
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center text-slate-400">QR</div>
              <div className="text-sm text-muted-foreground">
                Scan the QR code in person, or use the number above for transfers.
              </div>
            </div>
          </section>

          {/* Mobile Money - Vodafone */}
          <section className="rounded-lg bg-white p-6 shadow-sm border">
            <h2 className="text-lg font-semibold">Vodafone Cash</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use Vodafone Cash for quick transfers.</p>

            <div className="mt-4 space-y-2">
              <div className="text-sm">
                <span className="font-medium">Account name:</span> God Seeking Generation
              </div>
              <div className="text-sm">
                <span className="font-medium">Number:</span> <span className="">+233 20 000 0000</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Network:</span> Vodafone Cash
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center text-slate-400">QR</div>
              <div className="text-sm text-muted-foreground">Include your name in the reference for easy acknowledgement.</div>
            </div>
          </section>

          {/* Bank Transfer */}
          <section className="rounded-lg bg-white p-6 shadow-sm border">
            <h2 className="text-lg font-semibold">Bank Transfer</h2>
            <p className="mt-2 text-sm text-muted-foreground">Wire transfers may be used for larger gifts or institutional donors.</p>

            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Account name:</span> God Seeking Generation
              </div>
              <div>
                <span className="font-medium">Bank:</span> Example Bank
              </div>
              <div>
                <span className="font-medium">Account number:</span> 1234567890
              </div>
              <div>
                <span className="font-medium">Branch:</span> Main Branch
              </div>
              <div>
                <span className="font-medium">SWIFT/Sort:</span> EXAMPGB2L
              </div>
            </div>

            <div className="mt-4 text-sm">
              Please include a reference (your name or email) so we can send a
              receipt. For international donors, contact us first for guidance.
            </div>
          </section>
        </main>

        <section className="mt-8 rounded-lg bg-white p-6 shadow-sm border">
          <h3 className="text-lg font-semibold">How to confirm your gift</h3>
          <ol className="mt-3 list-decimal list-inside text-sm text-muted-foreground space-y-2">
            <li>Complete the transfer using the details for your chosen method.</li>
            <li>Note the transaction reference (or take a screenshot of the receipt).</li>
            <li>Message us via the contact page with your name, amount, method, and reference so we can acknowledge your gift.</li>
          </ol>

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-muted-foreground max-w-xl">We are committed to transparent stewardship and will issue receipts for all gifts. If you need a donation receipt for tax purposes, include a note when you contact us.</p>
            <Link href="/contact" className=" rounded-md bg-primary px-4 py-2 text-white flex items-center justify-center">Contact Us</Link>
          </div>
        </section>

        <footer className="mt-6 text-center text-sm text-muted-foreground">
          <div>Questions about giving? Email: <a className="underline" href="mailto:giving@gsg.org">giving@gsg.org</a></div>
          <div className="mt-2">All gifts are received and stewarded by God Seeking Generation.</div>
        </footer>
      </div>
    </div>
  )
}