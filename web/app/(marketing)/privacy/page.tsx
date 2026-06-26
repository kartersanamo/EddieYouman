import type { Metadata } from "next";
import { site } from "@/lib/site-config";

const LAST_UPDATED = "June 24, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-3xl prose-blog">
          <h1 className="font-display text-4xl font-bold text-forest">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate/70">Last updated: {LAST_UPDATED}</p>

          <h2>Information We Collect</h2>
          <p>
            When you contact us, request a quote, or book a service through{" "}
            {site.name}, we may collect your name, email address, phone number,
            service address, project details, preferred appointment times, and
            photos of completed work when you authorize payment.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use your information to respond to inquiries, prepare and send
            quotes, schedule and perform construction clean up services, send
            appointment confirmations and invoices, and improve our services. We
            do not sell your personal information to third parties.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We use trusted providers to operate this website:
          </p>
          <ul>
            <li>
              <strong>Mailgun</strong> — sends transactional email (quote
              confirmations, contact messages, appointment updates).
            </li>
            <li>
              <strong>Stripe</strong> — processes card payments for completed
              jobs. We do not store full card numbers on our servers.
            </li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain quote requests, booking records, and customer contact
            information as long as needed to provide services, comply with legal
            obligations, and resolve disputes. You may request deletion of your
            data by contacting us.
          </p>

          <h2>Cookies</h2>
          <p>
            This website uses essential cookies for authentication (admin area)
            and session management. We do not use third-party advertising
            cookies.
          </p>

          <h2>Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
            <a href={site.phoneHref}>{site.phone}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
