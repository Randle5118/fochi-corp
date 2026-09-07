import { site } from "@/lib/site";
import Container from "./Container";
import Button from "./Button";

// トップページのヒーロー。タイポグラフィ主導（Industrial/Utilitarian）。
export default function Hero() {
  return (
    <section className="bg-surface">
      <Container className="py-3xl md:py-[96px]">
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
