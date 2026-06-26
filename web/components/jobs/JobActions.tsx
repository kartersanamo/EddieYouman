"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatCents } from "@/lib/money";

export function JobActions({
  token,
  amountCents,
  paid,
}: {
  token: string;
  amountCents: number;
  paid: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [payError, setPayError] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentTimedOut, setPaymentTimedOut] = useState(false);

  useEffect(() => {
    if (searchParams.get("paid") !== "1" || paid) return;

    setProcessingPayment(true);
    router.replace(`/jobs/${token}`, { scroll: false });

    const refreshInterval = window.setInterval(() => {
      router.refresh();
    }, 2000);

    const timeout = window.setTimeout(() => {
      setPaymentTimedOut(true);
      setProcessingPayment(false);
      window.clearInterval(refreshInterval);
    }, 30000);

    return () => {
      window.clearInterval(refreshInterval);
      window.clearTimeout(timeout);
    };
  }, [searchParams, router, token, paid]);

  useEffect(() => {
    if (paid) {
      setProcessingPayment(false);
      setPaymentTimedOut(false);
    }
  }, [paid]);

  const pay = async () => {
    setPayError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPayError(data.error ?? "Could not start checkout.");
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setPayError("Could not start checkout.");
    }
  };

  return (
    <div className="space-y-6">
      {paid ? (
        <p className="rounded-xl bg-mint px-4 py-3 text-sm font-semibold text-forest">
          Payment received — thank you! Your invoice is below.
        </p>
      ) : processingPayment ? (
        <p className="rounded-xl border border-slate/10 bg-white px-4 py-3 text-sm text-slate/70">
          Processing payment… This usually takes a few seconds.
        </p>
      ) : paymentTimedOut ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          If your payment completed, refresh this page to see your receipt.
        </p>
      ) : null}

      <section id="pay" className="rounded-2xl border border-slate/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold text-forest">Pay for your service</h2>
        <p className="mt-2 text-3xl font-bold text-teal">{formatCents(amountCents)}</p>
        {paid ? (
          <p className="mt-2 text-sm text-forest">Paid in full.</p>
        ) : (
          <>
            <button
              type="button"
              onClick={pay}
              className="mt-4 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-light"
            >
              Pay securely with Stripe
            </button>
            {payError ? <p className="mt-2 text-sm text-red-700">{payError}</p> : null}
          </>
        )}
      </section>
    </div>
  );
}
