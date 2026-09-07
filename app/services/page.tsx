import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { site } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "やっていること",
  description:
    "月極駐車場の満空管理サービス monthly-parking の開発・運営と、プロダクト・業務づくりのご相談についてご紹介します。",
  path: "/services",
});

// COPY.md 4-2「できること」／「対象外」。
// ⚠️ 契約・審査・収納はプロダクトの対象外。ここを取り違えると顧客が誤解する。
const canDo = [
  "空き状況の掲示",
  "一次お問い合わせの受付",
  "空き待ち通知",
  "申込希望者の情報整理",
];

const cannotDo = [
  "契約書の作成・審査",
  "収納管理（賃料回収・督促）",
  "オーナー管理",
];

// COPY.md 4-3 ご相談・お手伝い。
const consulting = [
  {
    title: "つくる前の整理",
    body: "何をつくるか、何をつくらないか。要件と優先順位を、一緒に決めるところから。",
  },
  {
    title: "業務を見て、仕組みにする場所を決める",
    body: "すべてを仕組みにする必要はありません。効く場所を見つけます。",
  },
  {
    title: "小さくつくって、試す",
    body: "大きく設計する前に、まず動くものを置いてみる進め方をとります。",
  },
  {
    title: "壁打ちだけでも",
    body: "「これ、どうにかならないか」という段階のご相談も承っています。",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* COPY.md 4-2 プロダクト（上段）。
          順番が主従を語る。プロダクトが上、ご相談が下。入れ替えない。 */}
      <Section
        title="やっていること"
        lead="つくることと、一緒に考えること。どちらも同じ入り口から始まります。"
      >
        <div className="rounded-lg border border-border bg-surface p-xl md:p-2xl">
          <p className="text-sm font-medium text-primary">月極駐車場管理サービス</p>
          <h2 className="mt-sm text-2xl tracking-tight">monthly-parking</h2>
          <div className="mt-md max-w-2xl space-y-md text-base text-ink-muted">
            <p>
              駐車場管理は本業ではないのに、対応の手間だけが積み上がっていく。
              <br />
              その状態を、まるごと見直すためのサービスです。
            </p>
          </div>

          <div className="mt-xl grid gap-lg md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium text-ink">できること</h3>
              <ul className="mt-sm list-disc space-y-2xs pl-lg text-sm text-ink-muted">
                {canDo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-medium text-ink">対象外</h3>
              <ul className="mt-sm list-disc space-y-2xs pl-lg text-sm text-ink-muted">
                {cannotDo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-xl max-w-2xl space-y-md text-base text-ink-muted">
            <p>
              「全部やります」とは言いません。
              <br />
              そのぶん、いまの業務フローを変えずに導入できます。
            </p>
          </div>

          <div className="mt-lg">
            <Button href={site.appUrl} external>
              プロダクトを見る
            </Button>
          </div>
        </div>
      </Section>

      {/* COPY.md 4-3 ご相談・お手伝い（下段） */}
      <Section alt title="ご相談・お手伝い">
        <div className="grid gap-md md:grid-cols-2">
          {consulting.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-border bg-surface p-lg"
            >
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-sm text-sm text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-xl">
          <Link href="/contact" className="text-sm text-primary hover:underline">
            お問い合わせ →
          </Link>
        </div>
      </Section>
    </>
  );
}
