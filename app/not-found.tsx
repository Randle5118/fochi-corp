import Section from "@/components/Section";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <Section>
      <div className="py-2xl text-center">
        <p className="text-3xl font-bold text-primary">404</p>
        <h1 className="mt-md text-2xl tracking-tight">
          ページが見つかりません
        </h1>
        <p className="mt-sm text-ink-muted">
          お探しのページは移動または削除された可能性があります。
        </p>
        <div className="mt-lg flex justify-center">
          <Button href="/">トップへ戻る</Button>
        </div>
      </div>
    </Section>
  );
}
