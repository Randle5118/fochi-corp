import Section from "@/components/Section";
import Button from "@/components/Button";
import { products } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

// meta には「見つけてもらう言葉」を置く。
export const metadata = getMetadata({
  title: "事業内容",
  description:
    "株式会社Fochiの事業内容。月極駐車場の管理サービスなど自社サービスの開発・運営のほか、業務システムの開発やIT活用・業務効率化のご相談をお受けしています。",
  path: "/services",
});

// ご相談・受託開発でお受けしていること。
const consulting = [
  "業務システム・Webサービスの開発",
  "業務を見て、仕組みにする場所を決める",
  "数字や状況が見えるようにする",
  "何をつくるか、何をつくらないかの整理",
];

// 2026-11 方針：自社サービスの開発・運営が主軸、受託・ご相談は従。
// 順番が主従を語る。「サービス」が上、「ご相談・受託開発」が下。入れ替えない。
export default function ServicesPage() {
  return (
    <>
      <Section
        title="サービス"
        lead="現場の困りごとから入り、機能を絞って、始めやすい料金で届けます。"
      >
        {/* 機能一覧・料金はプロダクトサイトの担当。ここにはカードだけを置く。 */}
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
      </Section>

      <Section alt title="ご相談・受託開発">
        <div className="max-w-2xl space-y-md text-base text-ink-muted">
          <p>
            自社サービスづくりの経験をもとに、業務システムの開発やIT活用・業務効率化のご相談もお受けしています。
          </p>
        </div>

        <ul className="mt-lg list-disc space-y-2xs pl-lg text-sm text-ink-muted">
          {consulting.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-lg max-w-2xl text-base text-ink-muted">
          要件が固まる前の段階からご相談いただけます。
        </p>

        <div className="mt-lg">
          <Button href="/contact">お問い合わせ</Button>
        </div>
      </Section>
    </>
  );
}
