import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { newsRepo, NEWS_CATEGORY_LABEL } from "@/lib/content";
import { site } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({ path: "/" });

// 本文の共通スタイル。段落間は space-y-md（tailwind.config の spacing トークン）。
const proseCls = "max-w-2xl space-y-md text-base text-ink-muted";

export default async function HomePage() {
  const news = (await newsRepo.list()).slice(0, 3);

  return (
    <>
      <Hero />

      {/* なぜ ① 売る側にいたころ（COPY.md 3-2） */}
      <Section>
        <div className={proseCls}>
          <p>
            売る側にいたころ、
            <br />
            自分が納得しきれていないものを勧める場面がありました。
          </p>
          <p>数字にはなっても、あの居心地の悪さは残ります。</p>
          <p>
            つくる側に回ったのは、
            <br />
            納得したうえで人に渡せる仕事がしたかったからです。
          </p>
        </div>
      </Section>

      {/* なぜ ② 現場を見て、同じ感覚があった（COPY.md 3-3） */}
      <Section alt>
        <div className={proseCls}>
          <p>月極駐車場の管理を見ていて、同じ感覚がありました。</p>
          <p>
            本業ではないのに、問い合わせ対応の手間だけが積み上がっていく。
            <br />
            仕組みで減らせるはずのものが、そのままになっている。
          </p>
          {/* この2行はサイト全体の軸（COPY.md 3-3 の注記）。差し替えないこと。 */}
          <p>
            誰も納得していないのに、そのまま続いている。
            <br />
            だから、機能からではなく、その困りごとから入ります。
          </p>
        </div>
      </Section>

      {/* なぜ ③ 道具は変わった。やり方は、まだ変わっていない（COPY.md 3-4） */}
      <Section>
        <div className={proseCls}>
          <p>道具は、この数年で大きく変わりました。</p>
          <p>それでも、やり方のほうは変わっていない場面をよく見ます。</p>
          <p>
            新しい道具を使うこと自体は、目的になりません。
            <br />
            同じ困りごとを、いまならもっと少ない手間で解けるはずです。
          </p>
        </div>
      </Section>

      {/* やっていること（COPY.md 3-5） */}
      <Section alt title="やっていること">
        <div className="grid gap-md md:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-lg">
            <p className="text-2xs font-medium text-ink-muted">自分の課題として</p>
            <h3 className="mt-2xs text-lg">つくる</h3>
            <p className="mt-sm text-sm text-ink-muted">
              月極駐車場の満空管理と一次受付のサービスを、開発・運営しています。
            </p>
            <a
              href={site.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-md inline-block text-sm text-primary hover:underline"
            >
              monthly-parking を見る →
            </a>
          </div>

          <div className="rounded-md border border-border bg-surface p-lg">
            <p className="text-2xs font-medium text-ink-muted">相手の課題として</p>
            <h3 className="mt-2xs text-lg">一緒に考える</h3>
            <p className="mt-sm text-sm text-ink-muted">
              つくる前の整理から、小さくつくって試すところまで。
            </p>
            <Link
              href="/services"
              className="mt-md inline-block text-sm text-primary hover:underline"
            >
              詳しく見る →
            </Link>
          </div>
        </div>
      </Section>

      {/* お知らせ（COPY.md 3-6：見出しのみ、文言変更なし） */}
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

      {/* CTA（COPY.md 3-7：見出し1行 + ボタンのみ。補足文は置かない） */}
      <Section alt>
        <div className="rounded-lg border border-border bg-surface p-xl text-center md:p-2xl">
          <h2 className="text-2xl tracking-tight">一緒に、納得を探しませんか。</h2>
          <div className="mt-lg flex flex-wrap justify-center gap-sm">
            <Button href="/contact">お問い合わせ</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
