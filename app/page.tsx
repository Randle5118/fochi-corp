import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { newsRepo, NEWS_CATEGORY_LABEL } from "@/lib/content";
import { getMetadata } from "@/lib/seo";
import { products } from "@/lib/site";

export const metadata = getMetadata({ path: "/" });

// 本文の共通スタイル。段落間は space-y-md（tailwind.config の spacing トークン）。
const proseCls = "max-w-2xl space-y-md text-base text-ink-muted";

// 大切にしていること（3項目）。
const principles = [
  {
    title: "技術を使い分ける",
    body: "コードの下書きやテストはAIに任せ、要件・設計・最終確認は人が担います。",
  },
  {
    title: "始めやすい料金",
    body: "少人数でも、技術の使い方しだいで、できることは大きく変わります。手間を抑えたぶんを、料金に還元します。",
  },
  {
    title: "機能を絞る",
    body: "機能を足すより、困りごとを一つ確実に減らすことを優先します。",
  },
];

export default async function HomePage() {
  const news = (await newsRepo.list()).slice(0, 3);

  return (
    <>
      <Hero />

      {/* 社名について。社名の由来（腑に落ちる）を、使う人の困りごとに結びつける。 */}
      <Section title="社名について">
        <div className={proseCls}>
          <p>社名は「腑に落ちる」から取りました。</p>
          <p>
            業務の道具には、腑に落ちないことが少なくありません。
            <br />
            使わない機能にまでお金を払っている。導入したのに、手間が減っていない。
          </p>
          <p>使う人が「これでいい」と思えるものだけを、つくって届けます。</p>
        </div>
      </Section>

      {/* 大切にしていること。価格は「どう手間を省いているか」で語る。
          見積もりの内訳公開や、体制（「間に何社も挟まず」等）の約束は書かないこと。 */}
      <Section alt title="大切にしていること">
        <div className="grid gap-md md:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-border bg-surface p-lg"
            >
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-sm text-sm text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* サービス。自社サービスが主、受託・ご相談は下に一行だけ置く（2026-11 方針）。 */}
      <Section title="サービス">
        <div className="grid gap-md md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-md border border-border bg-surface p-lg"
            >
              <h3 className="text-lg">{product.name}</h3>
              <p className="mt-sm text-sm text-ink-muted">{product.body}</p>
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-md inline-block text-sm text-primary hover:underline"
              >
                サービスサイトへ →
              </a>
            </div>
          ))}
        </div>
        <p className="mt-xl max-w-2xl text-sm text-ink-muted">
          自社サービスづくりの経験をもとに、業務システムの開発やIT活用のご相談もお受けしています。
          <Link href="/services" className="ml-2xs text-primary hover:underline">
            詳しく見る →
          </Link>
        </p>
      </Section>

      {/* お知らせ */}
      <Section alt title="お知らせ">
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
      <Section>
        <div className="rounded-lg border border-border bg-surface p-xl text-center md:p-2xl">
          <h2 className="text-2xl tracking-tight">腑に落ちるまで、ご相談ください。</h2>
          <div className="mt-lg flex flex-wrap justify-center gap-sm">
            <Button href="/contact">お問い合わせ</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
