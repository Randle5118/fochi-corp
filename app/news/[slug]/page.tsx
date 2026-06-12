import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import Markdown from "@/components/Markdown";
import { newsRepo, NEWS_CATEGORY_LABEL } from "@/lib/content";
import { getMetadata } from "@/lib/seo";

type Params = { slug: string };

// 全 slug を静的生成（SSG）。
export async function generateStaticParams() {
  const slugs = await newsRepo.listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await newsRepo.getBySlug(slug);
  if (!article) return getMetadata({ title: "お知らせ" });
  return getMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${slug}`,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await newsRepo.getBySlug(slug);

  if (!article) notFound();

  return (
    <article className="bg-surface py-2xl md:py-3xl">
      <Container className="max-w-3xl">
        <div className="flex items-center gap-md">
          <time className="text-sm tabular-nums text-ink-muted">
            {article.publishedAt}
          </time>
          <span className="inline-flex rounded-sm bg-primary-light px-sm py-2xs text-2xs font-medium text-primary">
            {NEWS_CATEGORY_LABEL[article.category]}
          </span>
        </div>
        <h1 className="mt-sm text-2xl tracking-tight md:text-3xl">
          {article.title}
        </h1>

        <div className="mt-xl">
          <Markdown>{article.body}</Markdown>
        </div>

        <div className="mt-2xl border-t border-border pt-lg">
          <Link href="/news" className="text-sm text-primary hover:underline">
            ← お知らせ一覧へ戻る
          </Link>
        </div>
      </Container>
    </article>
  );
}
