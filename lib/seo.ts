import type { Metadata } from "next";
import { site } from "@/lib/site";

// 各ページの metadata を生成するヘルパー。
// 共通の OG / title テンプレートを与え、ページ側で title / description を上書きする。
export function getMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.name;
  const desc = description ?? site.description;
  const url = `${site.url}${path}`;

  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}
