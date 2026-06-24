import type { Metadata } from "next";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  businessHours,
  capabilityHighlights,
  differentiators,
  site,
} from "@/lib/site-config";
import { Check, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name} — locally owned, fully insured construction clean up in ${site.serviceArea}.`,
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="section-padding bg-forest text-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About"
            title="Discover the story behind Eddie Youman Services."
            subtitle="Uncover the journey, passion, and dedication that drive my commitment to excellence — and why I'm the trusted choice for construction clean up in Jacksonville."
            light
          />
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimateIn>
              <h2 className="font-display text-3xl font-bold text-forest">
                My story
              </h2>
              <p className="mt-4 leading-relaxed text-slate/80">
                Welcome to Eddie Youman Services, your premier destination for
                top-quality construction clean up solutions in Jacksonville. With
                a steadfast commitment to excellence and a proven track record of
                delivering exceptional results, I am dedicated to meeting and
                exceeding your clean up needs.
              </p>
              <p className="mt-4 leading-relaxed text-slate/80">
                From residential renovations to large-scale commercial builds and
                government facilities, I bring the same level of care and
                attention to every project. I understand that a clean jobsite
                isn&apos;t just about appearance — it&apos;s about safety,
                compliance, and keeping your project on schedule.
              </p>
              <p className="mt-4 leading-relaxed text-slate/80">
                When you work with me, you&apos;re partnering with a local
                business owner who treats every property as if it were my own.
                Fully insured, equipped with premium machinery, and ready to
                respond when emergencies strike.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <div className="rounded-2xl border border-teal/20 bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex rounded-xl bg-mint p-3 text-teal">
                  <Shield size={28} aria-hidden />
                </div>
                <h3 className="font-display text-xl font-bold text-forest">
                  Why clients choose me
                </h3>
                <ul className="mt-6 space-y-4">
                  {differentiators.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                        <Check size={14} aria-hidden />
                      </span>
                      <span className="text-slate/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <AnimateIn>
              <div className="rounded-2xl border border-slate/10 bg-white p-8">
                <h3 className="font-display text-xl font-bold text-forest">
                  Capability highlights
                </h3>
                <ul className="mt-6 space-y-3">
                  {capabilityHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate/80">
                      <Check size={16} className="mt-1 shrink-0 text-teal" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <div className="rounded-2xl border border-slate/10 bg-white p-8">
                <h3 className="font-display text-xl font-bold text-forest">
                  Opening hours
                </h3>
                <ul className="mt-6 space-y-2">
                  {businessHours.map((row) => (
                    <li
                      key={row.day}
                      className="flex justify-between border-b border-slate/5 py-2 text-sm"
                    >
                      <span className="font-medium text-forest">{row.day}</span>
                      <span className="text-slate/70">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>

          <div className="mt-16 rounded-2xl bg-mint p-8 text-center md:p-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal">
              Service area
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-forest">
              {site.serviceArea}
            </p>
            <p className="mt-2 text-slate/70">{site.address}</p>
            <p className="mt-4 text-slate/70">{site.quotePromise}</p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/book" variant="primary">
                Schedule cleanup
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
