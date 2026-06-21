import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import { IconTile } from "@/components/icons";
import { services } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "事業内容",
  description:
    "プロダクト開発・DX支援・月極駐車場管理SaaSなど、Fochiが提供するサービスをご紹介します。",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section
        eyebrow="Services"
        title="事業内容"
        lead="ソフトウェアで、現場の「不便」を解決します。"
      >
        <p className="max-w-2xl text-ink-muted">
          わたしたちは、自社プロダクトの開発・運営から受託開発・DX支援まで、
          テクノロジーで課題を解決するサービスを提供しています。
        </p>
      </Section>

      <Section alt className="!pt-0 md:!pt-0">
        <div className="space-y-md">
          {services.map((s, i) => (
            <div
              key={s.slug}
              id={s.slug}
              className="scroll-mt-20 rounded-lg border border-border bg-surface p-lg transition-all hover:border-primary hover:shadow-sm md:p-xl"
            >
              <div className="grid gap-md md:grid-cols-[1fr_1.2fr] md:gap-xl">
                <div>
                  <div className="flex items-center gap-md">
                    <IconTile name={s.icon} />
                    <span className="text-sm font-medium tabular-nums text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-md text-xl tracking-tight md:text-2xl">
                    {s.name}
                  </h2>
                  <p className="mt-sm text-primary">{s.tagline}</p>
                  <p className="mt-sm text-sm text-ink-muted">{s.summary}</p>
                </div>
                <ul className="space-y-xs self-center">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-sm text-sm text-ink"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="サービスに関するご相談はこちら"
        body="導入のご相談・お見積り・業務提携など、お気軽にお問い合わせください。"
      />
    </>
  );
}
