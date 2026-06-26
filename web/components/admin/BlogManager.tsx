"use client";

import {
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
} from "@/lib/actions/blog";
import type { BlogPost } from "@/lib/blog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const emptyForm = {
  title: "",
  slug: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  content: "",
};

export function BlogManager({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);

  const run = (fn: () => Promise<unknown>) => {
    setError("");
    setMessage("");
    startTransition(async () => {
      try {
        await fn();
        setMessage("Saved.");
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  };

  const startEdit = (post: BlogPost) => {
    setEditingSlug(post.slug);
    setEditForm({
      title: post.title,
      slug: post.slug,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content,
    });
    setError("");
    setMessage("");
  };

  const cancelEdit = () => {
    setEditingSlug(null);
    setEditForm(emptyForm);
  };

  return (
    <div className="mt-8 space-y-8">
      {message ? (
        <p className="rounded-lg bg-mint px-4 py-2 text-sm text-forest">{message}</p>
      ) : null}
      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-800">{error}</p>
      ) : null}

      <section className="rounded-2xl border border-slate/10 bg-white p-6">
        <h2 className="font-display text-lg font-bold text-forest">New post</h2>
        <p className="mt-1 text-sm text-slate/60">
          Write in Markdown. Leave slug blank to generate from the title.
        </p>
        <PostForm
          form={createForm}
          onChange={setCreateForm}
          disabled={pending}
        />
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            run(async () => {
              await createBlogPost(createForm);
              setCreateForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
            })
          }
          className="mt-4 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal/90 disabled:opacity-50"
        >
          Publish post
        </button>
      </section>

      <section className="rounded-2xl border border-slate/10 bg-white p-6">
        <h2 className="font-display text-lg font-bold text-forest">
          Posts ({posts.length})
        </h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-slate/60">No posts yet.</p>
        ) : (
          <ul className="mt-4 space-y-6">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-slate/10 pb-6 last:border-0 last:pb-0"
              >
                {editingSlug === post.slug ? (
                  <div>
                    <h3 className="font-semibold text-forest">Editing post</h3>
                    <PostForm
                      form={editForm}
                      onChange={setEditForm}
                      disabled={pending}
                      showSlug
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() =>
                          run(async () => {
                            await updateBlogPost(post.slug, editForm);
                            cancelEdit();
                          })
                        }
                        className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                      >
                        Save changes
                      </button>
                      <button
                        type="button"
                        disabled={pending}
                        onClick={cancelEdit}
                        className="rounded-lg border border-slate/20 px-4 py-2 text-sm font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                        {post.date}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold text-forest">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate/70">{post.excerpt}</p>
                      <p className="mt-2 text-xs text-slate/50">/blog/{post.slug}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-lg border border-slate/20 px-3 py-1.5 text-xs font-semibold"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => startEdit(post)}
                        className="rounded-lg border border-slate/20 px-3 py-1.5 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => {
                          if (confirm(`Delete "${post.title}"?`)) {
                            run(() => deleteBlogPost(post.slug));
                          }
                        }}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PostForm({
  form,
  onChange,
  disabled,
  showSlug = true,
}: {
  form: typeof emptyForm;
  onChange: (form: typeof emptyForm) => void;
  disabled: boolean;
  showSlug?: boolean;
}) {
  return (
    <div className="mt-4 grid gap-4">
      <label className="block text-sm">
        <span className="text-slate/60">Title</span>
        <input
          type="text"
          value={form.title}
          disabled={disabled}
          onChange={(e) => onChange({ ...form, title: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate/20 px-3 py-2"
        />
      </label>
      {showSlug ? (
        <label className="block text-sm">
          <span className="text-slate/60">Slug (optional)</span>
          <input
            type="text"
            value={form.slug}
            disabled={disabled}
            onChange={(e) => onChange({ ...form, slug: e.target.value })}
            placeholder="auto-generated-from-title"
            className="mt-1 w-full rounded-lg border border-slate/20 px-3 py-2 font-mono text-sm"
          />
        </label>
      ) : null}
      <label className="block text-sm">
        <span className="text-slate/60">Date</span>
        <input
          type="date"
          value={form.date}
          disabled={disabled}
          onChange={(e) => onChange({ ...form, date: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate/20 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <span className="text-slate/60">Excerpt</span>
        <textarea
          value={form.excerpt}
          disabled={disabled}
          rows={2}
          onChange={(e) => onChange({ ...form, excerpt: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate/20 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <span className="text-slate/60">Body (Markdown)</span>
        <textarea
          value={form.content}
          disabled={disabled}
          rows={12}
          onChange={(e) => onChange({ ...form, content: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate/20 px-3 py-2 font-mono text-sm"
        />
      </label>
    </div>
  );
}
