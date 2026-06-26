"use server";

import { auth } from "@/lib/auth";
import {
  getBlogDir,
  getPostFilePath,
  isValidSlug,
  slugify,
  writePostFile,
} from "@/lib/blog";
import fs from "fs";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function validatePostInput(data: {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug?: string;
}) {
  if (!data.title.trim()) throw new Error("Title is required.");
  if (!data.excerpt.trim()) throw new Error("Excerpt is required.");
  if (!data.content.trim()) throw new Error("Post body is required.");

  const date = data.date.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error("Date must be YYYY-MM-DD.");
  }

  const slug = (data.slug?.trim() || slugify(data.title)).toLowerCase();
  if (!isValidSlug(slug)) {
    throw new Error("Slug must use lowercase letters, numbers, and hyphens only.");
  }

  return { title: data.title.trim(), date, excerpt: data.excerpt.trim(), content: data.content.trim(), slug };
}

export async function createBlogPost(data: {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug?: string;
}) {
  await requireAdmin();
  const post = validatePostInput(data);

  if (fs.existsSync(getPostFilePath(post.slug))) {
    throw new Error("A post with this slug already exists.");
  }

  fs.mkdirSync(getBlogDir(), { recursive: true });
  writePostFile(post);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return { ok: true, slug: post.slug };
}

export async function updateBlogPost(
  currentSlug: string,
  data: {
    title: string;
    date: string;
    excerpt: string;
    content: string;
    slug?: string;
  }
) {
  await requireAdmin();
  const post = validatePostInput(data);
  const oldPath = getPostFilePath(currentSlug);

  if (!fs.existsSync(oldPath)) {
    throw new Error("Post not found.");
  }

  if (post.slug !== currentSlug && fs.existsSync(getPostFilePath(post.slug))) {
    throw new Error("A post with this slug already exists.");
  }

  writePostFile(post);
  if (post.slug !== currentSlug) {
    fs.unlinkSync(oldPath);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${currentSlug}`);
  revalidatePath(`/blog/${post.slug}`);
  return { ok: true, slug: post.slug };
}

export async function deleteBlogPost(slug: string) {
  await requireAdmin();
  const filePath = getPostFilePath(slug);

  if (!fs.existsSync(filePath)) {
    throw new Error("Post not found.");
  }

  fs.unlinkSync(filePath);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return { ok: true };
}
