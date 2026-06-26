import type { Metadata } from "next";
import { site } from "@/lib/site-config";

const LAST_UPDATED = "June 24, 2026";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: `Terms and legal notice for ${site.name}.`,
};

export default function LegalPage() {
  return (
    <div className="pt-24">
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-3xl prose-blog">
          <h1 className="font-display text-4xl font-bold text-forest">
            Legal Notice & Merchant Policies
          </h1>
          <p className="mt-4 text-slate/70">Last updated: {LAST_UPDATED}</p>

          <h2>Business Information</h2>
          <p>
            <strong>{site.legalName}</strong>
            <br />
            {site.address}
            <br />
            Phone: <a href={site.phoneHref}>{site.phone}</a>
            <br />
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>

          <h2>Services</h2>
          <p>
            {site.name} provides construction clean up services including
            post-construction cleaning, emergency disaster cleanup, government
            and state agency clean up, and premium equipment solutions in{" "}
            {site.serviceArea}.
          </p>

          <h2>Quotes & Booking</h2>
          <p>
            Pricing is not listed online. Customers request a quote through our
            Book Now flow; we review the request and send a personalized quote.
            When you accept a quote, your appointment is confirmed. Preferred
            times submitted with a quote request are not guaranteed until your
            quote is accepted.
          </p>

          <h2>Payments</h2>
          <p>
            Payment for completed work is collected securely through Stripe
            after the job is finished. You will receive an invoice and payment
            link by email. Refunds for eligible disputes are handled on a
            case-by-case basis — contact us within 14 days of payment if you
            have a concern.
          </p>

          <h2>Cancellation Policy</h2>
          <p>
            Please provide at least 24 hours notice for appointment
            cancellations. Emergency and disaster response services may have
            different scheduling terms communicated at time of booking.
          </p>

          <h2>Liability</h2>
          <p>
            {site.name} maintains appropriate insurance for construction clean
            up operations. Service terms and liability limits are outlined in
            individual service agreements where applicable.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these policies, contact{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
