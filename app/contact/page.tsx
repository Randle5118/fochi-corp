import Section from "@/components/Section";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "お問い合わせ",
  description:
    "プロダクトのデモ、業務提携、採用に関するお問い合わせを承っております。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section
      title="お問い合わせ"
      lead="プロダクトのご相談も、「これ、どうにかならないか」という段階のご相談も。"
    >
      <div className="grid gap-2xl md:grid-cols-[1fr_320px]">
        <div className="max-w-xl">
          <ContactForm />
        </div>
        <aside className="rounded-md border border-border bg-surface-alt p-lg">
          <h2 className="text-base font-medium text-ink">メールでのご連絡</h2>
          <p className="mt-sm text-sm text-ink-muted">
            フォームをご利用いただけない場合は、下記までご連絡ください。
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-sm inline-block text-sm text-primary hover:underline"
          >
            {site.email}
          </a>
        </aside>
      </div>
    </Section>
  );
}
