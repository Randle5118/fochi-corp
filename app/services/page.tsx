import Section from "@/components/Section";
import Button from "@/components/Button";
import { site } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

// meta には「見つけてもらう言葉」を置く（COPY.md 2）。
export const metadata = getMetadata({
  title: "やっていること",
  description:
    "ITの活用・DX・業務効率化・可視化に関するご相談と受託開発、および自社プロダクトの開発・運営についてご紹介します。",
  path: "/services",
});

// COPY.md 4-2。キーワードだけを並べず、必ず「その手前の整理から始めます」を添える。
const consulting = [
  "何をつくるか、何をつくらないかを決める",
  "業務を見て、仕組みにする場所を決める",
  "数字や状況が見えるようにする",
  "小さくつくって、試す",
  "壁打ちだけでも",
];

// COPY.md 4-3。自社プロダクトは「カード1枚まで」。
// ⚠️ 機能一覧・料金・「対象外」リストをここに書かないこと。
// それはプロダクトサイトの担当で、二重管理になると必ず食い違う。
// プロダクトが増えたら、同じ形のカードを下に足すだけにする。
const products = [
  {
    name: "monthly-parking",
    body: "月極駐車場の満空管理と一次受付のサービス。管理会社が、駐車場の問い合わせ対応に取られる時間を減らすためのものです。",
    href: site.appUrl,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* COPY.md 4-2 一緒に考える（上段）。
          順番が主従を語る。「一緒に考える」が上、「つくる」が下。入れ替えない。 */}
      <Section
        title="やっていること"
        lead="つくることと、一緒に考えること。どちらも、同じところから始まります。"
      >
        <div className="rounded-lg border border-border bg-surface p-xl md:p-2xl">
          <h2 className="text-2xl tracking-tight">一緒に考える</h2>
          <div className="mt-md max-w-2xl space-y-md text-base text-ink-muted">
            {/* この2行目を消さないこと。キーワードだけを並べた瞬間、
                無数にある「DX支援会社」と区別がつかなくなる（COPY.md 4-2）。 */}
            <p>
              ITの活用、DX、業務効率化、可視化。
              <br />
              どれも、その手前の整理から始めます。
            </p>
          </div>

          <ul className="mt-lg list-disc space-y-2xs pl-lg text-sm text-ink-muted">
            {consulting.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-lg max-w-2xl text-base text-ink-muted">
            要件が固まる前の段階からご一緒できます。
          </p>

          <div className="mt-lg">
            <Button href="/contact">お問い合わせ</Button>
          </div>
        </div>
      </Section>

      {/* COPY.md 4-3 つくる（下段）＝ 上段の裏づけ。
          実績紹介ではなく「相談に乗れる」根拠として置いている。 */}
      <Section alt title="つくる">
        <div className="max-w-2xl space-y-md text-base text-ink-muted">
          <p>相談を受けるだけでなく、自分でもつくって、運んでいます。</p>
          <p>
            つくる前に「何をつくらないか」を決めることに、いちばん時間をかけます。
          </p>
        </div>

        <div className="mt-xl grid gap-md md:grid-cols-2">
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
                サービスサイトを見る →
              </a>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
