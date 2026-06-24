import { AnimateIn } from "@/components/ui/AnimateIn";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatCategory, services } from "@/lib/site-config";

export function ServicesPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our services"
          title="Construction clean up for every project."
          subtitle="From active construction sites to emergency disaster response, I provide specialized clean up solutions tailored to Jacksonville projects."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimateIn key={service.id} delay={i * 0.08}>
                <article className="group flex h-full flex-col rounded-2xl border border-slate/10 bg-cream p-6 transition-shadow hover:shadow-lg">
                  <div className="mb-4 inline-flex rounded-xl bg-mint p-3 text-teal">
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-bold text-forest">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate/70">
                    {service.shortDescription}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal">
                    {formatCategory(service.category)}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <ButtonLink href="/services" variant="outline" size="sm">
                      Learn more
                    </ButtonLink>
                    <ButtonLink href="/book" variant="primary" size="sm">
                      Book now
                    </ButtonLink>
                  </div>
                </article>
              </AnimateIn>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/services" variant="outline">
            See all services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
