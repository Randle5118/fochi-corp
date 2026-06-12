import type { MetadataRoute } from "next";
import { newsRepo } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/news",
    "/contact",
    "/privacy-policy",
    "/legal",
  ];

  const slugs = await newsRepo.listSlugs();

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    })),
    ...slugs.map((slug) => ({
      url: `${site.url}/news/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
