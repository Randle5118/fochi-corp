# fochi-corp アーキテクチャ / 開発ルール

このドキュメントは `fochi-corp`（コーポレートサイト）の設計判断とルールを記録する。
**コードを書く・レビューする前に必ず読むこと。** 判断に迷ったらここを真実の源とする。

### ルール／ドキュメントの構成（重複させない方針）
維持しやすさと AI 自動化のため、役割を1つに絞る：

| ファイル | 役割 | 自動読込 |
|---|---|---|
| `ARCHITECTURE.md`（本書） | **なぜ**そう設計したか（設計判断・移行SOP・決定ログ） | — |
| `CLAUDE.md` | **何を・どう触るか**（構成マップ・タスク手順・規約・検証） | Claude Code |
| `.cursor/rules/fochi-corp.mdc` | 上記2つへの薄い指標＋鉄則 | Cursor |

→ 同じ内容を3か所に書かない。鉄則の要約のみ各所に置き、本体は本書／`CLAUDE.md` に集約する。

---

## 0. このサイトの位置づけ

| | プロダクト (`monthly_parking`) | コーポレートサイト (`fochi-corp`) |
|---|---|---|
| 性質 | ログイン後に操作する Web アプリ / ダッシュボード | 公開・SEO 重視のマーケティングサイト |
| 主なレンダリング | SSR / Client（認証・即時データ） | **SSG / ISR**（内容変動が少なく、高速・被クロール重視） |
| ドメイン | `app.fochi.co.jp` | `fochi.co.jp` |
| リポジトリ | 別リポジトリ | 別リポジトリ（本リポジトリ） |

**ルール:** 2 つのサービスは意図的に分離している。共有が必要なものは
「パッケージ共有」ではなく「トークン・値のコピー」で対応する。
コーポレートサイトの要件は単純なので、共有パッケージ化は過剰設計。

---

## 1. 技術スタック（変更しない理由つき）

- **Next.js 15 App Router + TypeScript** — プロダクトとバージョンを揃え、認知負荷を下げる。
- **Tailwind CSS** — デザイントークンは `monthly_parking/DESIGN.md` を真実の源として移植。
  MUI / daisyUI は**入れない**（コーポレートサイトには重すぎる）。
- **react-markdown + remark-gfm** — お知らせ本文の描画。
  `rehype-raw` は**意図的に外している**（原則 D を参照）。
- **gray-matter** — フロントマターの解析。
- **Resend** — お問い合わせ送信（Server Action 経由）。
- **Vercel** — デプロイ。プロダクトとは別 project / 別ドメイン。

---

## 2. ★最重要★ 内容層：CMS へ無痛移行できる設計

要件：**いまは MDX、将来は非エンジニアが編集できる CMS へ移行**。
そのために 2 つの原則を厳守する。

### 原則 A — 本文は「Markdown 文字列」、真の MDX（JSX 埋め込み）は禁止

| 方式 | 今 | CMS 移行時 |
|---|---|---|
| ❌ 真の MDX（本文に `<Component/>`） | 楽 | **破綻** — CMS のリッチテキストには JSX が無く、全記事を書き直す羽目になる |
| ✅ フロントマター + 純 Markdown 本文 | 同じく楽 | CMS のリッチテキスト → Markdown / HTML が**自然に対応**し、記事は無改変 |

→ 本文は `@next/mdx` でコンパイルせず、`react-markdown` で「ただの文字列」として描画する。
**内容は常に「データ」であり「コード」ではない。** これが移行可能性の根幹。

### 原則 B — データソースを Repository インターフェースの裏に隠す

```
lib/content/
├── schema.ts              # NewsArticle の正規化スキーマ（Zod）
├── repository.ts          # interface NewsRepository { list / getBySlug / listSlugs }
├── sources/
│   └── mdx.ts             # Phase 1 実装：content/news/*.mdx を読む
│   └── microcms.ts        # 将来：CMS API を叩く（同インターフェースを実装）
└── index.ts               # export const newsRepo = mdxNewsRepository  ← 切替は1行
```

ページ・コンポーネントは `newsRepo` の**インターフェースのみ**に依存し、
データの出所（MDX か CMS か）を知らない。

**CMS 移行手順（その日の作業）:**
1. `sources/microcms.ts` を追加し、`NewsRepository` を実装する。
2. 既存記事を CMS にインポートする。
3. `lib/content/index.ts` のエクスポートを 1 行差し替える。
4. ページ・コンポーネント・スタイルは**一切変更しない**。

**ルール:** お知らせのデータ取得は、必ず `lib/content` の `newsRepo` 経由で行う。
ページから `fs` や CMS の SDK を直接呼ばないこと。

### 原則 C — スキーマのフィールド名は CMS 慣例に合わせる

`schema.ts` のフィールド名（`publishedAt` / `category` / `eyecatch` / `excerpt`）は
将来採用予定の **microCMS** の慣例にあえて寄せている。移行時のマッピングを 1:1 に近づけるため。

**推奨 CMS:** microCMS（日本市場で最も普及、日本語UI・サポート、非エンジニアが扱いやすい）。
Supabase は既存資産だが、編集UIを自前で作る必要があり「非エンジニアが字を直す」用途には不向き。

### 原則 D — 本文に生 HTML を通さない（`rehype-raw` を入れない）

原則 A・B の帰結として、**本文の出所はいずれ「リポジトリ内の信頼できるファイル」から
「CMS の編集者が書いた信頼できない入力」に変わる。** その日に備え、
`components/Markdown.tsx` では `rehype-raw` を使わない。react-markdown は既定で
生 HTML を無視する＝サニタイズ済みの状態であり、これを崩さないこと。

HTML 表現がどうしても必要になった場合は、`rehype-raw` + `rehype-sanitize` を
**必ずセットで**導入する（`rehype-raw` 単体の追加は禁止）。

### 原則 E — フロントマターの日付は引用符付きで書く

`publishedAt: 2026-09-01`（引用符なし）は YAML が `Date` 型として解釈するため、
Zod の文字列スキーマを通らずビルドが落ちる。記事側は `publishedAt: "2026-09-01"` と書き、
`schema.ts` 側でも Date → `YYYY-MM-DD` へ正規化して二重に守る。

---

## 3. デザインシステム

- 真実の源は **`monthly_parking/DESIGN.md`**（Industrial / Utilitarian、Noto Sans JP、主色 `#2563EB`）。
- トークンは `tailwind.config.ts` に移植済み（colors / fontSize / spacing / radius / maxWidth）。
- **ルール:** 色・余白・字種を変えるときは、まず `DESIGN.md` を確認し、勝手に逸脱しない。
  `tailwind.config.ts` のトークンを使い、生のカラーコードをコンポーネントに直書きしない。

---

## 4. 多言語（i18n）

- いまは**日本語単一**。`<html lang="ja">`。
- 英語追加時は `next-intl` + `/ja` `/en` ルーティングを導入予定。
  その前提でテキストはできるだけコンポーネントに直書きせず、まとめやすくしておく。

---

## 5. 法務ページ（日本の必須事項）

- `/privacy-policy`（個人情報保護方針）と `/legal`（特定商取引法に基づく表記）は**必須**。削除しない。
- 文面・表記は **PLACEHOLDER**。公開前に法務確認の上、自社の運用に合わせて確定すること。
- 特商法は **事業者名・所在地・電話番号**の開示を義務づけている。`lib/site.ts` の
  `company.tel` / `company.address` / `company.representative` は公開前に必ず実データへ差し替える。

---

## 6. 会社情報の single source of truth

- 会社名・住所・代表者・事業内容・ナビゲーションは `lib/site.ts` に集約。
- **ルール:** これらの値をページに直書きしない。必ず `lib/site.ts` から参照する。
- `PLACEHOLDER` とコメントした値（代表者名・住所・資本金・設立）は登記情報に差し替えること。

---

## 7. お問い合わせフォーム

- Server Action（`app/contact/actions.ts`）→ Resend。
- スパム対策は 2 層：
  1. **ハニーポット**（`company_url` 隠しフィールド）。値が入っていれば bot とみなし黙って破棄。
  2. **レート制限**（同一 IP から 10 分に 3 通まで）。Server Action のエンドポイントは
     フォームを経由せず直接繰り返し呼べるため、ハニーポットだけでは受信箱と
     Resend の送信枠を守れない。
     ⚠️ プロセス内メモリ実装のため複数インスタンス間で共有されない（＝厳密な上限ではない）。
     強い保証が必要になったら Upstash Redis 等の外部ストアに差し替えること。
- 入力検証は Zod。エラーメッセージは日本語。
- フォームには個人情報の利用目的とプライバシーポリシーへの導線を明示する。

---

## 8. デプロイ / 環境変数

- Vercel に独立 project として配置。本番ドメイン `fochi.co.jp`。
- 必要な環境変数は `.env.example` 参照（`RESEND_API_KEY` ほか）。
- `sitemap.xml` / `robots.txt` は `app/sitemap.ts` / `app/robots.ts` で生成（next-sitemap は使わない）。
  静的ページには `lastModified` を付けない（ビルド時刻を入れると毎デプロイで全ページの
  lastmod が変わり、シグナルとして無意味になるため）。お知らせは `publishedAt` を使う。
- ファビコン（`app/icon.svg`）と OG 画像（`app/opengraph-image.tsx`）は Next.js の
  ファイル規約で全ページに自動適用される。OG 画像の描画テキストは**ラテン文字のみ**
  （`ImageResponse` の既定フォントに日本語グリフが無く、和文は豆腐になる）。

---

## 決定ログ

| 日付 | 決定 | 理由 |
|------|------|------|
| 2026-06-12 | コーポレートサイトをプロダクトから別リポジトリに分離 | レンダリング特性・更新頻度・リスク分離 |
| 2026-06-12 | 本文は Markdown 文字列、真の MDX は禁止 | CMS 移行を無痛にするため |
| 2026-06-12 | お知らせを Repository パターンで抽象化 | データソース切替を1行に |
| 2026-06-12 | スキーマを microCMS 慣例に寄せる | 移行時のマッピングを1:1に |
| 2026-06-12 | デザイントークンは DESIGN.md から移植（共有パッケージ化しない） | 要件が単純で過剰設計を避ける |
| 2026-06-12 | ルールを ARCHITECTURE.md / CLAUDE.md / .cursor の3層に役割分担（重複させない） | monthly_parking の慣例に合わせつつ、保守時の drift を防ぐ |
| 2026-09-03 | `rehype-raw` を削除（原則 D） | CMS 移行後、本文が信頼できない入力になり XSS の入口になるため |
| 2026-09-03 | `publishedAt` を Date→文字列に正規化＋引用符を必須化（原則 E） | 引用符なし日付で `generateStaticParams` がビルド落ちするのを防ぐ |
| 2026-09-03 | お問い合わせにレート制限を追加 | Server Action は直接連投できるため、ハニーポットだけでは不十分 |
| 2026-09-03 | Next.js を 15.5.25 へ（16 には上げない） | 既知脆弱性の解消。メジャー更新はプロダクト側と足並みを揃えて行う |
