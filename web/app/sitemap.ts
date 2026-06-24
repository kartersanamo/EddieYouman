import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://eddie.kartersanamo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/gallery",
    "/about",
    "/blog",
    "/contact",
    "/book",
    "/privacy",
    "/legal",
  ];

  const staticPages = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/blog"
      ? "weekly"
      : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: route === "" ? 1 : 0.8,
  }));

  const blogPages = getAllSlugs().map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
