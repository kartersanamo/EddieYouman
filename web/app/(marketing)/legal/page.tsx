import type { Metadata } from "next";
import { site } from "@/lib/site-config";

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
          <p className="mt-4 text-slate/70">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>

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

          <h2>Booking & Quotes</h2>
          <p>
            Online bookings are subject to confirmation. Quotes are provided
            based on project scope and are valid for the period stated at time
            of issue. Pricing is not listed online; all quotes are customized.
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
