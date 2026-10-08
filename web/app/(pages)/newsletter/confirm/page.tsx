"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

function Confirm() {
  const token = useSearchParams().get("token")
  const [status, setStatus] = useState<"loading" | "done" | "error">(
    token ? "loading" : "error",
  )

  useEffect(() => {
    if (!token) return
    api
      .post("/newsletter/confirm", { token })
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
          <h1 className="mt-4 text-2xl font-bold text-slate-900">You&apos;re subscribed</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for confirming. You&apos;ll receive news about upcoming events and what God is doing across our branches.
          </p>
        </>
      )}
      {status === "error" && (
        <>
          <XCircle className="w-10 h-10 mx-auto text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Link not valid</h1>
          <p className="mt-2 text-muted-foreground">
            This confirmation link is invalid or has already been used. You can sign up again from the website footer.
          </p>
        </>
      )}
      <Button asChild className="mt-6">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}

export default function ConfirmSubscriptionPage() {
  return (
    <section className="w-full min-h-[60vh] flex items-center px-6 py-24 bg-slate-50">
      <Suspense fallback={<Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />}>
        <Confirm />
      </Suspense>
    </section>
  )
}
