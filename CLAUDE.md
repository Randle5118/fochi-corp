# fochi-corp — プロジェクト指示（AI / 人間共通）

株式会社Fochi のコーポレートサイト。プロダクト（`monthly_parking`）から分離した独立サービス。
このファイルは「**何を・どう触るか**」の操作手引き。「**なぜそう設計したか**」は
[`ARCHITECTURE.md`](./ARCHITECTURE.md) を真実の源とする。変更前に両方を読むこと。

---

## 絶対に守るルール（破ると設計が壊れる）

1. **お知らせ本文は Markdown 文字列。真の MDX（本文への JSX 埋め込み）は禁止。** → CMS 移行を壊す。
2. **お知らせのデータ取得は `lib/content` の `newsRepo` 経由のみ。** ページから `fs` や CMS SDK を直接呼ばない。
3. **デザインは `monthly_parking/DESIGN.md` が真実の源。** `tailwind.config.ts` のトークンを使い、生のカラーコードを直書きしない。逸脱は要承認。
4. **会社情報・ナビ・URL は `lib/site.ts` から参照。** ページに直書きしない。
5. **法務ページ（`/privacy-policy`・`/legal`）は削除しない。** 日本では必須。
6. **言語は日本語単一**（`lang="ja"`）。英語化は `next-intl` 導入時にまとめて行う。
7. **`components/Markdown.tsx` に `rehype-raw` を再追加しない。** 生 HTML を通すと、
   CMS 移行後に外部編集者の入力が XSS の入口になる。必要なら `rehype-sanitize` と必ずセットで。

---

## プロジェクト構成（どこに何があるか）

```
app/                    App Router のページ（= ルーティング）
  page.tsx              トップ
  about/ services/      会社概要 / 事業内容（静的）
  news/                 お知らせ一覧 + [slug] 詳細（SSG）
  contact/              フォーム（page.tsx / ContactForm.tsx / actions.ts）
  privacy-policy/ legal/ 法務ページ（必須・削除禁止）
  sitemap.ts robots.ts  自動生成（next-sitemap は使わない）
  icon.svg              ファビコン
  opengraph-image.tsx   OG 画像を全ページ分ビルド時生成（ラテン文字のみ）
components/             共通 UI（Container/Section/Button/Header/Footer/Hero/Markdown）
content/news/*.mdx      お知らせ本文（フロントマター + Markdown）
lib/
  site.ts               会社情報・ナビ・URL の単一の真実の源
  seo.ts                metadata 生成ヘルパー（getMetadata）
  resend.ts             お問い合わせ送信
  content/              お知らせのデータ層（Repository パターン）
    schema.ts           NewsArticle スキーマ（Zod、フィールド名は CMS 慣例に準拠）
    repository.ts        NewsRepository インターフェース
    sources/mdx.ts       現行の実装（MDX を読む）
    index.ts             ★ データソース切替点（CMS 移行はここ1行）★
```

---

## よくあるタスクの手順（AI はこの通りに作業すれば足りる）

### お知らせを1件追加する
1. `content/news/YYYY-MM-DD-<slug>.mdx` を作成。
2. フロントマターを記入：

   ```yaml
   ---
   title: 記事タイトル
   publishedAt: "2026-09-01"   # ← 必ずダブルクォートで囲む（YYYY-MM-DD）
   category: news              # news | press | product | recruit
   excerpt: 一覧・OG に出る要約（任意）
   draft: false                # 任意, 既定 false
   ---
   ```

   **`publishedAt` は必ず引用符で囲むこと。** 裸の `2026-09-01` は YAML が
   Date 型として解釈するため。スキーマ側でも正規化しているが、引用符付きが正。
3. 本文は Markdown で書く（**JSX 禁止**、生 HTML も描画されない）。
→ 一覧・詳細・トップ・sitemap に自動反映。コード変更不要。

### 静的ページを追加する
1. `app/<path>/page.tsx` を作成し、`Section` / `Container` を使う。
2. `export const metadata = getMetadata({ title, description, path })` を付ける。
3. グローバルメニューに載せるなら `lib/site.ts` の `nav` に追加。
4. `app/sitemap.ts` の `staticPaths` に追加。

### 会社情報・ナビ・URL を変える
- `lib/site.ts`（`site` / `company` / `nav`）だけを編集する。ページ側は触らない。

### デザイン（色・余白・字）を変える
- `tailwind.config.ts` のトークンを編集（必要なら先に `DESIGN.md` を更新して同期）。
- コンポーネントに生のカラーコードを直書きしない。

### CMS へ移行する
- `ARCHITECTURE.md` §2 の手順に従う（`sources/` に新ソース追加 → `lib/content/index.ts` を1行差し替え）。

---

## コード規約

- **App Router + RSC 優先。** `'use client'` は最小限（現状は `Header` と `ContactForm` のみ）。
- お問い合わせ等のサーバ処理は **Server Action**（`app/**/actions.ts`）で行う。
- import は `@/` エイリアス（`@/lib/...`, `@/components/...`）。
- コンポーネント名は **PascalCase**（既存に合わせる）。
- ユーザー向け文言はすべて日本語。
- 依存は最小限。**MUI・daisyUI は入れない**（コーポレートサイトには重すぎる）。

---

## 変更後の検証（必須）

```bash
npm run lint && npm run build
```

両方パスすること。お知らせ・静的ページは原則すべて Static/SSG で出力される。

---

## デプロイ
Vercel 独立 project / `fochi.co.jp`。環境変数は `.env.example` 参照（`RESEND_API_KEY` ほか）。
`lib/site.ts` の `PLACEHOLDER`（代表者・住所・資本金など）は公開前に登記情報へ差し替えること。
