import type { Metadata } from "next";
import { site } from "@/lib/site-config";

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
          <p className="mt-4 text-slate/70">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you contact us, book a service, or request a quote through{" "}
            {site.name}, we may collect your name, email address, phone number,
            service address, and any details you provide about your project.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use your information to respond to inquiries, schedule and
            perform construction clean up services, send appointment
            confirmations, and improve our services. We do not sell your personal
            information to third parties.
          </p>

          <h2>Cookies</h2>
          <p>
            This website may use essential cookies for authentication (admin
            area) and session management. We do not use third-party advertising
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
