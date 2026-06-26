export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description: `Construction clean up tips, disaster recovery guides, and industry insights from ${site.name}.`,
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24">
      <section className="section-padding bg-forest text-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Blog"
            title="Insights & guides"
            subtitle="Tips on construction clean up, disaster recovery, and keeping your projects on track."
            light
          />
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-4xl space-y-8">
          {posts.map((post, i) => (
            <AnimateIn key={post.slug} delay={i * 0.05}>
              <article className="rounded-2xl border border-slate/10 bg-white p-8 transition-shadow hover:shadow-lg">
                <time
                  dateTime={post.date}
                  className="text-xs font-semibold uppercase tracking-wider text-teal"
                >
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-3 font-display text-2xl font-bold text-forest">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-teal"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-slate/70">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-teal hover:text-forest"
                >
                  Read more →
                </Link>
              </article>
            </AnimateIn>
          ))}
        </div>
      </section>
    </div>
  );
}
