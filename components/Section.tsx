import { ReactNode } from "react";
import Container from "./Container";

// セクション共通レイアウト。任意で eyebrow（小見出し）/ title / lead を表示。
export default function Section({
  eyebrow,
  title,
  lead,
  children,
  alt = false,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  alt?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`py-2xl md:py-3xl ${alt ? "bg-surface-alt" : "bg-surface"} ${className}`}
    >
      <Container>
        {(eyebrow || title || lead) && (
          <div className="mb-xl max-w-2xl">
            {eyebrow && (
              <p className="mb-sm text-2xs font-medium uppercase tracking-wider text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-2xl tracking-tight md:text-3xl">{title}</h2>
            )}
            {lead && <p className="mt-sm text-lg text-ink-muted">{lead}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
