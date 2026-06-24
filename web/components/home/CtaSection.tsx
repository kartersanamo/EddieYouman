import { ButtonLink } from "@/components/ui/Button";
import { businessHours, site } from "@/lib/site-config";
import { Clock, Mail, Phone } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-teal to-forest text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Ready to clean up your project?
        </h2>
        <p className="mt-4 text-lg text-white/85">{site.quotePromise}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/book" variant="inverse" size="lg">
            Book online
          </ButtonLink>
          <ButtonLink
            href={site.phoneHref}
            variant="ghost"
            size="lg"
            external
            className="justify-center"
          >
            <Phone size={18} className="mr-2" aria-hidden />
            Call {site.phone}
          </ButtonLink>
        </div>
        <a
          href={`mailto:${site.email}`}
          className="mt-6 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
        >
          <Mail size={16} aria-hidden />
          {site.email}
        </a>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-teal-light">
            <Clock size={16} aria-hidden />
            Opening hours
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {businessHours.map((row) => (
              <li
                key={row.day}
                className="flex justify-between gap-4 text-sm text-white/80"
              >
                <span>{row.day}</span>
                <span className={row.hours === "Closed" ? "text-white/50" : ""}>
                  {row.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
