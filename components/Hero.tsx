import { site } from "@/lib/site";
import Container from "./Container";
import Button from "./Button";

// トップページのヒーロー。タイポグラフィ主導（Industrial/Utilitarian）。
// サーバコンポーネントのまま維持すること（LCP と SEO のため）。背景は SiteBackdrop が描く。
export default function Hero() {
  return (
    <section className="relative">
      {/* 文字の下に敷く白いグラデーション（veil）。Hero 自体は背景を持たず、
          SiteBackdrop の区画図が最もよく見える状態にしつつ、文字だけを浮かせる。
          右側ほど薄くして地を見せるが、完全な透明にはしない（狭い画面では
          本文が画面幅いっぱいまで届くため）。 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/30"
      />
      <Container className="relative py-3xl md:py-[96px]">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary">{site.nameEn}</p>
          <h1 className="mt-md text-3xl font-bold leading-tight tracking-tight md:text-[44px]">
            {site.tagline}
          </h1>
          {/* COPY.md 3-1。会社概要文ではなく Hero 固有のコピー。 */}
          <div className="mt-lg space-y-xs text-lg text-ink-muted">
            <p>ただ、自分が納得できていないものは出しません。</p>
            <p>そこだけは、一人で決めています。</p>
          </div>
          <div className="mt-xl flex flex-wrap gap-sm">
            <Button href="/services">やっていることを見る</Button>
            <Button href="/contact" variant="ghost">
              お問い合わせ
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
