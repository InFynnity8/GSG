"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

function Unsubscribe() {
  const token = useSearchParams().get("token")
  const [status, setStatus] = useState<"loading" | "done" | "error">(
    token ? "loading" : "error",
  )

  useEffect(() => {
    if (!token) return
    api
      .post("/newsletter/unsubscribe", { token })
      .then(() => setStatus("done"))
      .catch(() => setStatus("error"))
  }, [token])

  return (
    <div className="max-w-md mx-auto text-center rounded-2xl border bg-white p-10 shadow-sm">
      {status === "loading" && (
        <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />
      )}
      {status === "done" && (
        <>
          <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">You&apos;re unsubscribed</h1>
          <p className="mt-2 text-muted-foreground">
            You won&apos;t receive our newsletter anymore. You can subscribe again anytime from the website footer.
          </p>
        </>
      )}
      {status === "error" && (
        <>
          <XCircle className="w-10 h-10 mx-auto text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Link not valid</h1>
          <p className="mt-2 text-muted-foreground">
            This unsubscribe link is invalid or has expired. Please contact us if you keep receiving emails.
          </p>
        </>
      )}
      <Button asChild className="mt-6">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <section className="w-full min-h-[60vh] flex items-center px-6 py-24 bg-slate-50">
      <Suspense fallback={<Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />}>
        <Unsubscribe />
      </Suspense>
    </section>
  )
}
