"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, X, CheckCircle2, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

// Paystack InlineJS v2 — the transaction is initialised on our server (which
// sets the price), the popup only resumes it with the returned access code.
interface PaystackPopup {
  resumeTransaction: (
    accessCode: string,
    callbacks: {
      onSuccess?: (transaction: { reference: string }) => void;
      onCancel?: () => void;
      onError?: (error: { message?: string }) => void;
    },
  ) => void;
}

declare global {
  interface Window {
    PaystackPop: new () => PaystackPopup;
  }
}

interface Props {
  itemId: string;
  itemName: string;
  priceGHS: number;
  itemType: "book" | "merchandise";
}

interface CheckoutResponse {
  reference: string;
  accessCode: string;
}

export function PayButton({ itemId, itemName, priceGHS, itemType }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ email: "", name: "" });
  const [paid, setPaid] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (document.querySelector('script[src*="paystack"]')) return;
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
    scriptRef.current = script;
    document.body.appendChild(script);
    return () => { scriptRef.current?.remove(); };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!window.PaystackPop) {
      setError("Payment service failed to load. Please refresh and try again.");
      return;
    }

    setBusy(true);
    let checkout: CheckoutResponse;
    try {
      checkout = await api.post<CheckoutResponse>("/orders/checkout", {
        itemType: itemType === "book" ? "BOOK" : "MERCHANDISE",
        itemId,
        buyerName: form.name,
        buyerEmail: form.email,
      });
    } catch (err) {
      setBusy(false);
      setError(
        err instanceof Error && err.message.includes("not configured")
          ? "Online payment is not available yet. Please contact us at godseekinggeneration01@gmail.com to purchase."
          : err instanceof Error
            ? err.message
            : "Could not start payment. Please try again.",
      );
      return;
    }

    setShowModal(false);
    new window.PaystackPop().resumeTransaction(checkout.accessCode, {
      onSuccess: async () => {
        // Confirm with our server (which checks with Paystack) before
        // showing success — the popup alone is not proof of payment.
        try {
          const order = await api.get<{ status: string }>(
            `/orders/verify/${encodeURIComponent(checkout.reference)}`,
          );
          if (order.status === "PAID") setPaid(true);
          else {
            setError("We couldn't confirm your payment yet. If you were charged, please contact us with your reference: " + checkout.reference);
            setShowModal(true);
          }
        } catch {
          setError("We couldn't confirm your payment yet. If you were charged, please contact us with your reference: " + checkout.reference);
          setShowModal(true);
        } finally {
          setBusy(false);
        }
      },
      onCancel: () => setBusy(false),
      onError: (err) => {
        setBusy(false);
        setError(err?.message || "Payment failed. Please try again.");
        setShowModal(true);
      },
    });
  }

  if (paid) {
    return (
      <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 text-white text-xs font-bold rounded-md">
        <CheckCircle2 className="w-4 h-4" />
        Payment Successful — Thank you!
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary/90 transition-colors shadow-sm active:scale-[0.98]"
      >
        <ShoppingCart className="w-4 h-4" />
        Buy Now · GHS {priceGHS.toFixed(2)}
      </button>

      {showModal && createPortal(
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); setError(""); } }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setShowModal(false); setError(""); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">Complete Purchase</h3>
            <p className="text-sm text-muted-foreground mb-5 line-clamp-2 pr-6">{itemName}</p>

            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Total</span>
                  <span className="font-bold text-primary text-base">GHS {priceGHS.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 leading-relaxed">{error}</p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                Pay via Paystack
              </button>
              <p className="text-[10px] text-slate-400 text-center">
                Secured by Paystack · MTN MoMo · Telecel Cash · Card
              </p>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
