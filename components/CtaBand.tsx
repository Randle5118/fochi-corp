import Container from "./Container";
import Button from "./Button";

// アクセントカラー（primary）の CTA バンド。
// DESIGN.md「1アクセント」を活かす、ページ末尾の色の見せ場。
export default function CtaBand({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="bg-surface py-2xl md:py-3xl">
      <Container>
        <div className="rounded-lg bg-primary px-lg py-2xl text-center md:px-2xl">
          <h2 className="text-2xl tracking-tight text-white md:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-sm max-w-xl text-primary-light">{body}</p>
          <div className="mt-lg flex justify-center">
            <Button href="/contact" variant="white">
              お問い合わせ
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
