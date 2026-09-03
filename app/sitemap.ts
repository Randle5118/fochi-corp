import type { MetadataRoute } from "next";
import { newsRepo } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静的ページを追加したらここにも追記する（CLAUDE.md「静的ページを追加する」参照）。
  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/news",
    "/contact",
    "/privacy-policy",
    "/legal",
  ];

  const news = await newsRepo.list();

  return [
    // 静的ページは lastModified を付けない。ビルド時刻を入れると
    // デプロイのたびに全ページの lastmod が変わり、シグナルとして無意味になるため。
    ...staticPaths.map((path) => ({
      url: `${site.url}${path}`,
    })),
    ...news.map((item) => ({
      url: `${site.url}/news/${item.slug}`,
      lastModified: item.publishedAt,
    })),
  ];
}
