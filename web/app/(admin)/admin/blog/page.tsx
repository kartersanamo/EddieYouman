import { BlogManager } from "@/components/admin/BlogManager";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default function AdminBlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-forest">Blog</h1>
      <p className="mt-2 text-slate/70">
        Create and edit posts shown on the public blog.
      </p>
      <BlogManager posts={posts} />
    </div>
  );
}
