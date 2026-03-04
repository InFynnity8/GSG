import Link from "next/link"
import { PageCover } from "@/components/ui/page-cover"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Smartphone, Building2, CheckCircle2, Mail, ExternalLink } from "lucide-react"

export default function Donate() {
  return (
    <>
      <PageCover
        imageUrl="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600&auto=format&fit=crop"
        title="Give / Donate"
        subtitle="Support God Seeking Generation through secure giving options."
      />
      
      <div className="min-h-[75vh] py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          
          <ScrollReveal direction="up" className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Giving Options</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Your generosity helps us continue our mission. Choose the method that is most convenient for you.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {/* MTN Mobile Money */}
            <ScrollReveal delay={0} direction="up" distance={20}>
              <div className="rounded-lg bg-white p-7 shadow-sm border border-slate-200 h-full flex flex-col transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-md bg-amber-100 flex items-center justify-center text-amber-600">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">MTN MoMo</h2>
                </div>
                
                <div className="space-y-5 flex-grow">
                  <div className="p-4 bg-slate-50 rounded-md border border-slate-100">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1.5">Account Name</p>
                    <p className="text-base font-semibold text-slate-700">God Seeking Generation</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-md border border-slate-100">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1.5">Number</p>
                    <p className="text-base font-mono font-bold text-primary">+233 24 000 0000</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4 p-4 border border-dashed border-slate-200 rounded-md">
                   <div className="w-14 h-14 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400 font-bold">QR</div>
                   <p className="text-xs text-slate-500 leading-normal">Scan QR in person or use the number for transfers.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vodafone Cash */}
            <ScrollReveal delay={100} direction="up" distance={20}>
              <div className="rounded-lg bg-white p-7 shadow-sm border border-slate-200 h-full flex flex-col transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-md bg-rose-100 flex items-center justify-center text-rose-600">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Vodafone Cash</h2>
                </div>

                <div className="space-y-5 flex-grow">
                  <div className="p-4 bg-slate-50 rounded-md border border-slate-100">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1.5">Account Name</p>
                    <p className="text-base font-semibold text-slate-700">God Seeking Generation</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-md border border-slate-100">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1.5">Number</p>
                    <p className="text-base font-mono font-bold text-primary">+233 20 000 0000</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4 p-4 border border-dashed border-slate-200 rounded-md">
                   <div className="w-14 h-14 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400 font-bold">QR</div>
                   <p className="text-xs text-slate-500 leading-normal">Include your name in the reference for easy acknowledgement.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Bank Transfer */}
            <ScrollReveal delay={200} direction="up" distance={20}>
              <div className="rounded-lg bg-white p-7 shadow-sm border border-slate-200 h-full flex flex-col transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Bank Transfer</h2>
                </div>

                <div className="space-y-4 flex-grow">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                        <p className="text-xs uppercase font-bold text-slate-400 mb-1">Bank</p>
                        <p className="text-sm font-semibold text-slate-700">Example Bank</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                        <p className="text-xs uppercase font-bold text-slate-400 mb-1">Branch</p>
                        <p className="text-sm font-semibold text-slate-700">Main Branch</p>
                      </div>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                      <p className="text-xs uppercase font-bold text-slate-400 mb-1">Account Number</p>
                      <p className="text-sm font-mono font-bold text-primary tracking-wider">1234567890</p>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                      <p className="text-xs uppercase font-bold text-slate-400 mb-1">SWIFT / Sort Code</p>
                      <p className="text-sm font-mono font-semibold text-slate-700">EXAMPGB2L</p>
                   </div>
                </div>

                <p className="mt-6 text-xs text-slate-400 leading-relaxed italic">
                  Include your name/email as reference. For international gifts, contact us first.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Confirmation & Footer */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <ScrollReveal direction="up" className="md:col-span-2">
              <div className="bg-white rounded-lg p-10 shadow-sm border border-slate-200 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-900">How to confirm your gift</h3>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-8 relative">
                  <div className="relative z-10">
                    <span className="text-4xl font-black text-slate-100 absolute -top-5 -left-3 -z-10">01</span>
                    <p className="text-sm text-slate-600 leading-relaxed pt-5">Complete the transfer using your chosen method.</p>
                  </div>
                  <div className="relative z-10">
                    <span className="text-4xl font-black text-slate-100 absolute -top-5 -left-3 -z-10">02</span>
                    <p className="text-sm text-slate-600 leading-relaxed pt-5">Note the transaction reference or take a screenshot.</p>
                  </div>
                  <div className="relative z-10">
                    <span className="text-4xl font-black text-slate-100 absolute -top-5 -left-3 -z-10">03</span>
                    <p className="text-sm text-slate-600 leading-relaxed pt-5">Message us via contact page with your details & reference.</p>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                   <p className="text-xs text-slate-400 max-w-md italic leading-relaxed">
                     We are committed to transparent stewardship and will issue receipts for all gifts.
                   </p>
                   <Button asChild className="h-11 px-8 text-base">
                     <Link href="/contact">Confirm Gift</Link>
                   </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
               <div className="bg-primary rounded-lg p-10 text-white h-full flex flex-col justify-center items-center text-center shadow-md">
                  <Mail className="w-10 h-10 mb-5 opacity-50" />
                  <h3 className="text-xl font-bold mb-3">Have Questions?</h3>
                  <p className="text-sm text-primary-foreground/80 mb-8 leading-relaxed">
                    Our giving team is here to help with any queries regarding your donations.
                  </p>
                  <a href="mailto:giving@gsg.org" className="text-base font-semibold flex items-center gap-2 hover:underline">
                    giving@gsg.org
                    <ExternalLink className="w-4 h-4" />
                  </a>
               </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" className="mt-12 text-center">
            <p className="text-sm text-slate-400">
              All gifts are received and stewarded by God Seeking Generation. Thank you for your support.
            </p>
          </ScrollReveal>

        </div>
      </div>
    </>
  )
}
