import type { NewsArticle, NewsSummary } from "./schema";

// お知らせのデータソースを抽象化するインターフェース。
// ページ／コンポーネントはこの契約のみに依存し、データの出所（MDX か CMS か）を知らない。
//
// 移行手順（MDX → CMS）：
//   1. このインターフェースを実装した新ソースを sources/ に追加する
//      （例：sources/microcms.ts）。
//   2. 既存記事を CMS にインポートする。
//   3. lib/content/index.ts のエクスポートを 1 行差し替える。
//   ページ・コンポーネント・スタイルは一切変更不要。
export interface NewsRepository {
  /** 公開済み記事の一覧を新しい順で返す（body を含まない軽量版）。 */
  list(): Promise<NewsSummary[]>;

  /** slug から 1 記事を返す。存在しなければ null。 */
  getBySlug(_slug: string): Promise<NewsArticle | null>;

  /** 静的生成（generateStaticParams）用に全 slug を返す。 */
  listSlugs(): Promise<string[]>;
}
