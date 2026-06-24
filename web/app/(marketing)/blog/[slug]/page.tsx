import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ButtonLink } from "@/components/ui/Button";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { site } from "@/lib/site-config";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24">
      <article className="section-padding bg-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-sm font-semibold text-teal hover:text-forest"
          >
            ← Back to blog
          </Link>
          <time
            dateTime={post.date}
            className="mt-6 block text-xs font-semibold uppercase tracking-wider text-teal"
          >
            Posted on {formatDate(post.date)}
          </time>
          <h1 className="mt-3 font-display text-4xl font-bold text-forest md:text-5xl">
            {post.title}
          </h1>
          <div className="prose-blog mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <aside className="section-padding bg-mint">
        <div className="mx-auto max-w-3xl rounded-2xl border border-teal/20 bg-white p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-forest">
            Need construction clean up?
          </h2>
          <p className="mt-3 text-slate/70">
            {site.quotePromise}. Get in touch with {site.shortName} today.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink href="/book" variant="primary">
              Book online
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </aside>
    </div>
  );
}
