import { AnimateIn } from "@/components/ui/AnimateIn";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilityHighlights } from "@/lib/site-config";
import { Check, FileText } from "lucide-react";

export function CapabilityStatement() {
  return (
    <section className="section-padding bg-forest text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimateIn>
            <SectionHeading
              eyebrow="Capability statement"
              title="Built for government, commercial, and residential projects."
              subtitle="Eddie Youman Services brings the experience, equipment, and compliance standards required for projects of every scale — from Jacksonville homes to state agency facilities."
              light
            />
            <ul className="mt-8 space-y-4">
              {capabilityHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <Check size={14} aria-hidden />
                  </span>
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-6 inline-flex rounded-xl bg-teal/20 p-3 text-teal-light">
                <FileText size={28} aria-hidden />
              </div>
              <h3 className="font-display text-xl font-bold">
                Ready for your next bid or walkthrough
              </h3>
              <p className="mt-4 leading-relaxed text-white/75">
                Whether you&apos;re a general contractor preparing for final
                inspection, a property manager responding to storm damage, or a
                government agency seeking a compliant cleanup partner — I deliver
                thorough results on schedule.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="primary">
                  Request capability info
                </ButtonLink>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
