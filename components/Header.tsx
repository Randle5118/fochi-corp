"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import Container from "./Container";

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
          </nav>

          {/* モバイル トグル */}
          <button
            type="button"
            className="md:hidden"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          </button>
        </div>

        {/* モバイルメニュー */}
        {open && (
          <nav
            id="mobile-nav"
            className="flex flex-col gap-xs border-t border-border py-md md:hidden"
          >
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
          </nav>
        )}
      </Container>
    </header>
  );
}
