import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "ghost" | "white";

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover border border-transparent",
  ghost:
    "bg-transparent text-primary border border-border hover:bg-primary-light",
  white: "bg-white text-primary hover:bg-primary-light border border-transparent",
};

// リンクボタン（CTA・ナビゲーション用）。内部リンク／外部リンクの両対応。
export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center rounded-sm px-lg py-sm text-sm font-medium transition-colors duration-150 ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
