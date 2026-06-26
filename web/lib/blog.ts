import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export function getBlogDir(): string {
  return process.env.BLOG_DIR ?? path.join(process.cwd(), "content/blog");
}

export function getPostFilePath(slug: string): string {
  return path.join(getBlogDir(), `${slug}.mdx`);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function writePostFile(post: Omit<BlogPost, "slug"> & { slug: string }): void {
  const body = matter.stringify(post.content, {
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
  });
  fs.writeFileSync(getPostFilePath(post.slug), body, "utf8");
}

export function getAllPosts(): BlogPost[] {
  const blogDir = getBlogDir();
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(blogDir, filename), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  if (!isValidSlug(slug)) return undefined;
  const filePath = getPostFilePath(slug);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    content,
  };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
