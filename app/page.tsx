import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { newsRepo, NEWS_CATEGORY_LABEL } from "@/lib/content";
import { company } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({ path: "/" });

export default async function HomePage() {
  const news = (await newsRepo.list()).slice(0, 3);

  return (
    <>
      <Hero />

      {/* 事業内容サマリー */}
      <Section
        alt
        title="事業内容"
        lead="不動産テックで、駐車場経営の現場をアップデートします。"
      >
        <div className="grid gap-md md:grid-cols-3">
          {company.business.map((b) => (
            <div
              key={b}
              className="rounded-md border border-border bg-surface p-lg"
            >
              <p className="text-base font-medium text-ink">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-xl">
          <Button href="/services" variant="ghost">
            詳しく見る
          </Button>
        </div>
      </Section>

      {/* お知らせ */}
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
        <div className="mt-xl">
          <Button href="/news" variant="ghost">
            すべて見る
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <Section alt>
        <div className="rounded-lg border border-border bg-surface p-xl text-center md:p-2xl">
          <h2 className="text-2xl tracking-tight">
            駐車場管理のご相談はお気軽に
          </h2>
          <p className="mx-auto mt-sm max-w-xl text-ink-muted">
            プロダクトのデモ、業務提携、その他お問い合わせを承っております。
          </p>
          <div className="mt-lg flex flex-wrap justify-center gap-sm">
            <Button href="/contact">お問い合わせ</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
