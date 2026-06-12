import Section from "@/components/Section";
import { company, site } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "会社概要",
  description: `${site.name}の会社概要です。`,
  path: "/about",
});

// 会社概要テーブルの行定義。値は lib/site.ts（PLACEHOLDER 要差し替え）。
const rows: { label: string; value: string }[] = [
  { label: "会社名", value: company.legalName },
  { label: "代表者", value: company.representative },
  { label: "設立", value: company.founded },
  { label: "資本金", value: company.capital },
  {
    label: "所在地",
    value: `${company.address.postalCode} ${company.address.line}`,
  },
  { label: "事業内容", value: company.business.join("、") },
];

export default function AboutPage() {
  return (
    <Section title="会社概要" lead={site.tagline}>
      <dl className="overflow-hidden rounded-md border border-border bg-surface">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-1 sm:grid-cols-[160px_1fr] ${
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
