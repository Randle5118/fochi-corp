import Link from "next/link";
import Section from "@/components/Section";
import { newsRepo, NEWS_CATEGORY_LABEL } from "@/lib/content";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "お知らせ",
  description: "Fochiからのお知らせ・プレスリリースの一覧です。",
  path: "/news",
});

export default async function NewsListPage() {
  const news = await newsRepo.list();

  return (
    <Section title="お知らせ">
      {news.length === 0 ? (
        <p className="text-ink-muted">現在、お知らせはありません。</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {news.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/news/${item.slug}`}
                className="flex flex-col gap-2xs py-md transition-colors hover:bg-surface-alt sm:flex-row sm:items-center sm:gap-md"
              >
                <time className="text-sm tabular-nums text-ink-muted">
                  {item.publishedAt}
                </time>
                <span className="inline-flex w-fit rounded-sm bg-primary-light px-sm py-2xs text-2xs font-medium text-primary">
                  {NEWS_CATEGORY_LABEL[item.category]}
                </span>
                <span className="text-base text-ink">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
