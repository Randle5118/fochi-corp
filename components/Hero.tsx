import { site, services } from "@/lib/site";
import Container from "./Container";
import Button from "./Button";

// トップページのヒーロー。タイポグラフィ主導（Industrial/Utilitarian）。
// 装飾は控えめに、primary-light の淡いグラデーションで奥行きだけ加える。
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      {/* 装飾：上部の淡いグラデーション（DESIGN.md: Decoration minimal） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-primary-light/50 to-transparent"
      />
      <Container className="relative py-3xl md:py-[120px]">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-wider text-primary">
            {site.nameEn}
          </p>
          <h1 className="mt-md text-[34px] font-bold leading-[1.2] tracking-tight md:text-[52px]">
            {site.tagline}
          </h1>
          <p className="mt-lg max-w-2xl text-lg text-ink-muted">
            {site.description}
          </p>
          <div className="mt-xl flex flex-wrap gap-sm">
            <Button href="/services">事業内容を見る</Button>
            <Button href="/contact" variant="ghost">
              お問い合わせ
            </Button>
          </div>

          {/* 取り扱い領域のキーワード */}
          <ul className="mt-2xl flex flex-wrap gap-x-lg gap-y-sm border-t border-border pt-lg text-sm text-ink-muted">
            {services.map((s) => (
              <li key={s.slug} className="flex items-center gap-xs">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
