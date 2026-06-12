# fochi-corp — プロジェクト指示

株式会社Fochi のコーポレートサイト。プロダクト（`monthly_parking`）から分離した独立サービス。

## 最初に読む
- **必ず [`ARCHITECTURE.md`](./ARCHITECTURE.md) を読んでから**コードを書く・変更する。設計判断の真実の源。

## 絶対に守るルール（要約）
1. **本文は Markdown 文字列。真の MDX（本文への JSX 埋め込み）は禁止。** CMS 移行を壊す。
2. **お知らせのデータ取得は `lib/content` の `newsRepo` 経由のみ。** ページから `fs` や CMS SDK を直接呼ばない。
3. **デザインは `monthly_parking/DESIGN.md` が真実の源。** `tailwind.config.ts` のトークンを使い、生のカラーコードを直書きしない。逸脱は要承認。
4. **会社情報・ナビは `lib/site.ts` から参照。** ページに直書きしない。
5. **法務ページ（`/privacy-policy`・`/legal`）は削除しない。** 日本では必須。
6. 言語は**日本語単一**（`lang="ja"`）。英語化は `next-intl` 導入時。

## スタック
Next.js 15 App Router + TypeScript / Tailwind CSS / react-markdown / Resend(Server Action) / Vercel。
MUI・daisyUI は入れない。

## CMS 移行の方針
将来 microCMS へ移行予定。`lib/content/sources/` に新ソースを足し、`lib/content/index.ts` を1行差し替えるだけで済む設計を維持すること。詳細は ARCHITECTURE.md の §2。

## デプロイ
Vercel 独立 project / `fochi.co.jp`。環境変数は `.env.example` 参照。
