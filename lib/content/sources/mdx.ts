import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { NewsRepository } from "../repository";
import {
  NewsFrontmatter,
  type NewsArticle,
  type NewsSummary,
} from "../schema";

// Phase 1 の実装：content/news/*.mdx を読み、フロントマター + Markdown 本文を返す。
// 本文は MDX のコンパイルを行わず「ただの Markdown 文字列」として扱う
// （理由は repository.ts / schema.ts のコメントを参照）。
const NEWS_DIR = path.join(process.cwd(), "content", "news");

function readAll(): NewsArticle[] {
  if (!fs.existsSync(NEWS_DIR)) return [];

  const files = fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const fm = NewsFrontmatter.parse(data);
    return { ...fm, slug, body: content } satisfies NewsArticle;
  });

  return articles
    .filter((a) => !a.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function toSummary({ body: _body, ...rest }: NewsArticle): NewsSummary {
  return rest;
}

export const mdxNewsRepository: NewsRepository = {
  async list() {
    return readAll().map(toSummary);
  },

  async getBySlug(slug: string) {
    return readAll().find((a) => a.slug === slug) ?? null;
  },

  async listSlugs() {
    return readAll().map((a) => a.slug);
  },
};
