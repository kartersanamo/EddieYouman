import Image from "next/image";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentiators } from "@/lib/site-config";
import { Check } from "lucide-react";

export function DifferenceSection() {
  return (
    <section className="section-padding bg-mint">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimateIn>
            <SectionHeading
              eyebrow="Why Eddie Youman"
              title="Precision where it counts. Speed when it matters."
              subtitle="Construction clean up isn't one-size-fits-all. I tailor my approach to every project — from rough clean during active construction to final punch-list detail before walkthrough."
            />
            <ul className="space-y-4">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <Check size={14} aria-hidden />
                  </span>
                  <span className="text-slate/80">{item}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80"
                alt="Construction site with professional cleanup crew"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
