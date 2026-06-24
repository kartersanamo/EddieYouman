import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { QuickContact } from "@/components/contact/QuickContact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { businessHours, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — call ${site.phone}, email ${site.email}, or send a message online.`,
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Contact"
            title="Connect with Eddie Youman."
            subtitle="Get in touch today to experience unparalleled excellence in construction clean up services. I'm committed to delivering top-quality solutions tailored to your specific needs."
          />

          <QuickContact />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-forest">
                Send a message
              </h2>
              <p className="mt-2 text-slate/70">
                Tell me about your request and I&apos;ll get back to you within
                24 hours.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl bg-mint p-8">
                <h2 className="font-display text-2xl font-bold text-forest">
                  Service area
                </h2>
                <p className="mt-4 leading-relaxed text-slate/80">
                  I serve {site.serviceArea}. Not sure if I cover your address?
                  Give me a call or book online — I&apos;ll confirm availability
                  when I review your request.
                </p>
                <p className="mt-4 text-slate/70">{site.address}</p>
                <p className="mt-6 text-sm text-slate/60">
                  For the fastest response, call{" "}
                  <a
                    href={site.phoneHref}
                    className="font-semibold text-teal hover:underline"
                  >
                    {site.phone}
                  </a>
                  .
                </p>
              </div>
              <div className="rounded-2xl border border-slate/10 bg-white p-8">
                <h2 className="font-display text-xl font-bold text-forest">
                  Opening hours
                </h2>
                <ul className="mt-4 space-y-2">
                  {businessHours.map((row) => (
                    <li
                      key={row.day}
                      className="flex justify-between text-sm text-slate/80"
                    >
                      <span>{row.day}</span>
                      <span>{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
