"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, X, CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

interface Props {
  itemName: string;
  priceGHS: number;
  itemType: "book" | "merchandise";
}

export function PayButton({ itemName, priceGHS, itemType }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ email: "", name: "" });
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (document.querySelector('script[src*="paystack"]')) return;
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
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

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";
    if (!publicKey || publicKey.includes("your_paystack")) {
      setError("Payment gateway is not yet configured. Please contact us at godseekinggeneration01@gmail.com to purchase.");
      return;
    }

    if (!window.PaystackPop) {
      setError("Payment service failed to load. Please refresh and try again.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: form.email,
      amount: Math.round(priceGHS * 100),
      currency: "GHS",
      ref: `gsg_${itemType}_${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Item", variable_name: "item", value: itemName },
          { display_name: "Buyer", variable_name: "buyer", value: form.name },
        ],
      },
      callback: () => {
        setShowModal(false);
        setPaid(true);
      },
      onClose: () => {},
    });
    handler.openIframe();
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
                className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Pay via Paystack
              </button>
              <p className="text-[10px] text-slate-400 text-center">
                Secured by Paystack · MTN MoMo · Vodafone Cash · Card
              </p>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
