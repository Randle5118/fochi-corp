import { z } from "zod";

// お知らせ記事の正規化スキーマ。
// ⚠️ 重要：フィールド名は将来の headless CMS（microCMS 等）の慣例に
// あえて合わせている（publishedAt / category / eyecatch ...）。
// これにより MDX → CMS 移行時のデータマッピングがほぼ 1:1 になる。
export const NewsCategory = z.enum(["news", "press", "product", "recruit"]);
export type NewsCategory = z.infer<typeof NewsCategory>;

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  news: "お知らせ",
  press: "プレスリリース",
  product: "プロダクト",
  recruit: "採用",
};

// 日付フィールド。YAML は引用符なしの `2026-09-01` を Date 型に変換してしまうため、
// 文字列・Date のどちらで来ても `YYYY-MM-DD` の文字列に正規化する
// （CMS 移行後は ISO 8601 文字列で来るので、その際もそのまま通る）。
const PublishedAt = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "publishedAt は YYYY-MM-DD 形式で記述してください"),
);

// フロントマター（MDX ファイルの先頭メタ情報）のスキーマ。
export const NewsFrontmatter = z.object({
  title: z.string(),
  publishedAt: PublishedAt, // ISO 8601 (YYYY-MM-DD)
  category: NewsCategory.default("news"),
  excerpt: z.string().optional(),
  eyecatch: z.string().optional(), // アイキャッチ画像URL
  draft: z.boolean().default(false),
});
export type NewsFrontmatter = z.infer<typeof NewsFrontmatter>;

// アプリ全体で扱う正規化済みの記事型。
// body は「Markdown 文字列」であり JSX ではない —— これが CMS 移行を無痛にする鍵。
// （真の MDX で JSX を埋め込むと CMS のリッチテキストに移行できなくなる）
export type NewsArticle = NewsFrontmatter & {
  slug: string;
  body: string; // Markdown
};

// 一覧表示用（body を含まない軽量版）。
export type NewsSummary = Omit<NewsArticle, "body">;
