import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { newsRepo, NEWS_CATEGORY_LABEL } from "@/lib/content";
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

      {/* やっていること（COPY.md 3-5）
          順番は「一緒に考える → つくる」。IT の会社であることを先に示し、
          自社開発をその裏づけとして続ける。入れ替えないこと。
          トップではプロダクト名も受託メニューも出さない（導線は /services に集約）。 */}
      <Section alt title="やっていること">
        <div className="grid gap-md md:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-lg">
            <h3 className="text-lg">一緒に考える</h3>
            <p className="mt-sm text-sm text-ink-muted">
              持ち込まれた困りごとを、要件になる手前の整理から一緒に。
            </p>
          </div>

          <div className="rounded-md border border-border bg-surface p-lg">
            <h3 className="text-lg">つくる</h3>
            <p className="mt-sm text-sm text-ink-muted">
              気づいたことは、自分でもつくって運んでいます。
            </p>
          </div>
        </div>
        <div className="mt-xl">
          <Link
            href="/services"
            className="text-sm text-primary hover:underline"
          >
            詳しく見る →
          </Link>
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

      {/* CTA（COPY.md 3-7：見出し + 補足2行 + ボタン） */}
      <Section alt>
        <div className="rounded-lg border border-border bg-surface p-xl text-center md:p-2xl">
          <h2 className="text-2xl tracking-tight">一緒に、納得を探しませんか。</h2>
          {/* 補足は2行まで（COPY.md 3-7）。キーワードは置かない。 */}
          <div className="mx-auto mt-sm max-w-xl space-y-2xs text-ink-muted">
            <p>技術のことも、業務のことも。</p>
            <p>「これ、どうにかならないか」という段階から、ご一緒します。</p>
          </div>
          <div className="mt-lg flex flex-wrap justify-center gap-sm">
            <Button href="/contact">お問い合わせ</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
