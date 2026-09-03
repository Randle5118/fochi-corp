import Section from "@/components/Section";
import { company, site } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "特定商取引法に基づく表記",
  description: `${site.name}の特定商取引法に基づく表記です。`,
  path: "/legal",
});

// ⚠️ PLACEHOLDER：有償サービスの提供形態に応じて、販売価格・支払方法・
// 提供時期・返品等の項目を自社の取引条件に合わせて確定すること。
// 事業者名・所在地・電話番号は特定商取引法で開示が義務づけられているため、
// 公開前に必ず lib/site.ts の PLACEHOLDER を登記情報へ差し替えること。
const rows: { label: string; value: string }[] = [
  { label: "販売事業者", value: company.legalName },
  { label: "運営責任者", value: company.representative },
  {
    label: "所在地",
    value: `${company.address.postalCode} ${company.address.line}`,
  },
  { label: "電話番号", value: company.tel },
  { label: "メールアドレス", value: site.email },
  { label: "販売価格", value: "各サービスの申込ページに表示します。" },
  {
    label: "代金の支払時期・方法",
    value: "クレジットカード決済（ご契約時にご案内します）。",
  },
  {
    label: "サービスの提供時期",
    value: "お申込み・決済完了後、速やかに提供します。",
  },
  {
    label: "返品・キャンセル",
    value: "サービスの性質上、提供開始後の返金は原則として承っておりません。",
  },
];

export default function LegalPage() {
  return (
    <Section title="特定商取引法に基づく表記">
      <dl className="overflow-hidden rounded-md border border-border bg-surface">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] ${
              i !== rows.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <dt className="bg-surface-alt px-lg py-md text-sm font-medium text-ink-muted">
              {row.label}
            </dt>
            <dd className="px-lg py-md text-base text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
