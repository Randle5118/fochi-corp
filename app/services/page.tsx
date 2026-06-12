import Section from "@/components/Section";
import Button from "@/components/Button";
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
          {services.map((s) => (
            <div
              key={s.slug}
              id={s.slug}
              className="scroll-mt-20 rounded-lg border border-border bg-surface p-lg md:p-xl"
            >
              <div className="grid gap-md md:grid-cols-[1fr_1.2fr] md:gap-xl">
                <div>
                  <h2 className="text-xl tracking-tight md:text-2xl">
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

      <Section>
        <div className="rounded-lg border border-border bg-surface p-xl text-center md:p-2xl">
          <h2 className="text-2xl tracking-tight">
            サービスに関するご相談はこちら
          </h2>
          <p className="mx-auto mt-sm max-w-xl text-ink-muted">
            導入のご相談・お見積り・業務提携など、お気軽にお問い合わせください。
          </p>
          <div className="mt-lg flex justify-center">
            <Button href="/contact">お問い合わせ</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
