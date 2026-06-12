import Section from "@/components/Section";
import Button from "@/components/Button";
import { site } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "事業内容",
  description:
    "月極駐車場管理SaaSをはじめとする、Fochiの不動産テック事業をご紹介します。",
  path: "/services",
});

const features = [
  {
    title: "申込から契約までオンライン完結",
    body: "空き区画の公開、入居申込、契約手続きまでを一気通貫でデジタル化。紙とFAXの往復をなくします。",
  },
  {
    title: "契約・テナント管理",
    body: "契約状況やテナント情報を一元管理。更新・解約の手続きもダッシュボードから。",
  },
  {
    title: "管理会社向けに最適化",
    body: "不動産管理会社の業務フローに合わせた、信頼できる実務ツールとして設計しています。",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section
        title="事業内容"
        lead="不動産テックで、駐車場経営の現場をアップデートします。"
      >
        <div className="rounded-lg border border-border bg-surface p-xl md:p-2xl">
          <p className="text-sm font-medium text-primary">月極駐車場管理SaaS</p>
          <h2 className="mt-sm text-2xl tracking-tight">
            駐車場管理を、もっとシンプルに。
          </h2>
          <p className="mt-md max-w-2xl text-ink-muted">
            月極駐車場の申込・契約・テナント管理を、Webだけで完結できる管理SaaSを開発・運営しています。
          </p>
          <div className="mt-lg">
            <Button href={site.appUrl} external>
              プロダクトを見る
            </Button>
          </div>
        </div>
      </Section>

      <Section alt title="特長">
        <div className="grid gap-md md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-md border border-border bg-surface p-lg"
            >
              <h3 className="text-lg">{f.title}</h3>
              <p className="mt-sm text-sm text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
