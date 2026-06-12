import Link from "next/link";
import { nav, site } from "@/lib/site";
import Container from "./Container";

const legalNav = [
  { label: "プライバシーポリシー", href: "/privacy-policy" },
  { label: "特定商取引法に基づく表記", href: "/legal" },
];

// グローバルフッター。
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="grid gap-xl py-2xl md:grid-cols-3">
          <div>
            <div className="text-lg font-bold text-ink">{site.name}</div>
            <p className="mt-sm text-sm text-ink-muted">{site.tagline}</p>
          </div>

          <div>
            <div className="text-2xs font-medium uppercase tracking-wider text-ink-muted">
              メニュー
            </div>
            <ul className="mt-sm space-y-2xs">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-2xs font-medium uppercase tracking-wider text-ink-muted">
              法務
            </div>
            <ul className="mt-sm space-y-2xs">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-md text-2xs text-ink-muted">
          © {year} {site.nameEn} All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
