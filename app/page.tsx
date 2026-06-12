import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { newsRepo, NEWS_CATEGORY_LABEL } from "@/lib/content";
import { services, strengths } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({ path: "/" });

export default async function HomePage() {
  const news = (await newsRepo.list()).slice(0, 3);

  return (
    <>
      <Hero />

      {/* わたしたちの強み */}
      <Section
        eyebrow="Why Fochi"
        title="わたしたちの強み"
        lead="技術のための技術ではなく、現場で本当に役立つ仕組みを。"
      >
        <div className="grid gap-md md:grid-cols-3">
          {strengths.map((s, i) => (
            <div
              key={s.title}
              className="rounded-md border border-border bg-surface p-lg transition-colors hover:border-primary"
            >
              <span className="text-sm font-medium tabular-nums text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-sm text-lg">{s.title}</h3>
              <p className="mt-xs text-sm text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 事業内容サマリー */}
      <Section
        alt
        eyebrow="Services"
        title="事業内容"
        lead="ソフトウェアで、現場の課題を解決します。"
      >
        <div className="grid gap-md md:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="group flex flex-col rounded-md border border-border bg-surface p-lg transition-colors hover:border-primary"
            >
              <span className="text-sm font-medium tabular-nums text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-sm text-lg">{s.name}</h3>
              <p className="mt-xs flex-1 text-sm text-ink-muted">{s.summary}</p>
              <span className="mt-md text-sm font-medium text-primary">
                詳しく見る
                <span className="ml-2xs transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* お知らせ */}
      <Section eyebrow="News" title="お知らせ">
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

      {/* CTA（アクセントバンド） */}
      <CtaBand
        title="ご相談・お問い合わせはお気軽に"
        body="サービスに関するご相談、業務提携、取材などを承っております。"
      />
    </>
  );
}
