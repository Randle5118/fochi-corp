"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import Container from "./Container";
import Button from "./Button";

// グローバルヘッダー。モバイルではハンバーガーメニューに切り替え。
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-ink">
            {site.name}
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden items-center gap-lg md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Button href={site.appUrl} external variant="ghost">
              ログイン
            </Button>
          </nav>

          {/* モバイル トグル */}
          <button
            type="button"
            className="md:hidden"
            aria-label="メニューを開く"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          </button>
        </div>

        {/* モバイルメニュー */}
        {open && (
          <nav className="flex flex-col gap-xs border-t border-border py-md md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-sm py-sm text-sm font-medium text-ink hover:bg-surface-alt"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm px-sm py-sm text-sm font-medium text-primary hover:bg-surface-alt"
            >
              ログイン
            </a>
          </nav>
        )}
      </Container>
    </header>
  );
}
