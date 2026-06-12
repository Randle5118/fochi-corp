import { ReactNode } from "react";
import Container from "./Container";

// セクション共通レイアウト。任意で見出し（title / lead）を表示。
export default function Section({
  title,
  lead,
  children,
  alt = false,
  className = "",
}: {
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
        {(title || lead) && (
          <div className="mb-xl max-w-2xl">
            {title && (
              <h2 className="text-2xl md:text-3xl tracking-tight">{title}</h2>
            )}
            {lead && <p className="mt-sm text-ink-muted text-lg">{lead}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
