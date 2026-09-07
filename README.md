# fochi-corp

株式会社Fochi のコーポレートサイト。プロダクト（`monthly_parking`）から分離した独立サービス。

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS（デザイントークンは `monthly_parking/DESIGN.md` から移植）
- **Content:** Markdown 本文 + フロントマター（`content/news/*.mdx`）。将来 headless CMS へ無痛移行できる設計。
- **Contact:** Resend（Server Action 経由）
- **Deploy:** Vercel（`www.fochi.jp`）

## セットアップ

```bash
npm install
cp .env.example .env.local   # RESEND_API_KEY などを設定
npm run dev
```

## 主要ディレクトリ

| パス | 役割 |
|------|------|
| `app/` | App Router のページ |
| `components/` | 共通 UI |
| `content/news/` | お知らせ（Markdown） |
| `lib/content/` | お知らせのデータ層（Repository パターン） |
| `lib/site.ts` | 会社情報・サイト設定の単一の真実の源 |

## アーキテクチャ / 開発ルール

設計判断とルールは [`ARCHITECTURE.md`](./ARCHITECTURE.md) を参照。
コードを書く前に必ず読むこと（`CLAUDE.md` からも参照）。

> ⚠️ `lib/site.ts` の `PLACEHOLDER` 値（代表者名・住所・資本金など）は
> 登記情報に合わせて差し替えること。
