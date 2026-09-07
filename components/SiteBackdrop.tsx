"use client";

import { useEffect, useRef } from "react";

// 全ページ共通の地。矩形の再帰分割（区画図）を fixed な canvas に描き、
// スクロールに連動してゆっくり流す。時間ループ（常時 rAF）は使わない。
//
// ⚠️ 色は tailwind.config.ts の border / primary と同じ値。canvas には Tailwind の
// クラスを当てられないため、ここが唯一の定義箇所になる。トークンを変更したら必ず同期させること。
const COLOR = {
  line: "#E2E8F0", // border
  accent: "#2563EB", // primary.DEFAULT
} as const;

const PATTERN_HEIGHT = 1400; // 生成する1タイルの高さ。縦に繰り返して画面を埋める
const MIN_CELL = 92; // これ以上小さくは分割しない
const MAX_DEPTH = 6;
const SEED = 20260907; // 固定シード。リロードしても同じ絵になる
const PARALLAX_DESKTOP = 0.12; // 本文の 12% の速度で流す
const PARALLAX_MOBILE = 0.06; // モバイルは動きを控えめに
const MOBILE_BREAKPOINT = 768; // Tailwind の md
const ACCENT_BAND = 160; // 画面中央からこの距離内の区画を強調する
const ACCENT_ALPHA = 0.28;
const MAX_DPR = 2;

type Cell = { x: number; y: number; w: number; h: number };

// mulberry32。ライブラリを足さずに決定的な擬似乱数を得るため。
function createRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 矩形を再帰的に割って区画図をつくる。同じ seed / 同じ幅なら常に同じ結果になる。
function buildCells(width: number, height: number): Cell[] {
  const rng = createRng(SEED);
  const cells: Cell[] = [];

  const split = (x: number, y: number, w: number, h: number, depth: number) => {
    const canSplitX = w >= MIN_CELL * 2;
    const canSplitY = h >= MIN_CELL * 2;

    if (depth >= MAX_DEPTH || (!canSplitX && !canSplitY)) {
      cells.push({ x, y, w, h });
      return;
    }

    // 長辺を割るのを基本にしつつ、ときどき逆を選んで単調さを避ける。
    let vertical = canSplitX && (!canSplitY || w > h);
    if (canSplitX && canSplitY && rng() < 0.25) vertical = !vertical;

    const span = vertical ? w : h;
    // 0.35〜0.65 で割る。ただし MIN_CELL を下回る破片が出ないようにクランプする。
    const raw = span * (0.35 + rng() * 0.3);
    const cut = Math.round(Math.min(Math.max(raw, MIN_CELL), span - MIN_CELL));

    if (vertical) {
      split(x, y, cut, h, depth + 1);
      split(x + cut, y, w - cut, h, depth + 1);
    } else {
      split(x, y, w, cut, depth + 1);
      split(x, y + cut, w, h - cut, depth + 1);
    }
  };

  split(0, 0, width, height, 0);
  return cells;
}

export default function SiteBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let cells: Cell[] = [];
    let viewW = 0;
    let viewH = 0;
    let frame = 0; // スクロールのスロットル用。0 は「予約なし」
    let disposed = false;

    const draw = () => {
      // 非表示タブでは描かない。
      if (disposed || document.visibilityState === "hidden") return;

      ctx.clearRect(0, 0, viewW, viewH);
      ctx.lineWidth = 1;

      const factor =
        viewW < MOBILE_BREAKPOINT ? PARALLAX_MOBILE : PARALLAX_DESKTOP;
      // reduce 指定時はパララックスを無効化し、静止した状態で描く。
      const offset = reduceMotion.matches
        ? 0
        : -((window.scrollY * factor) % PATTERN_HEIGHT);

      const bandTop = viewH / 2 - ACCENT_BAND;
      const bandBottom = viewH / 2 + ACCENT_BAND;

      // offset は (-PATTERN_HEIGHT, 0] に入るため、ここから下へタイルを敷けば画面が埋まる。
      for (let base = offset; base < viewH; base += PATTERN_HEIGHT) {
        for (const cell of cells) {
          const y = base + cell.y;
          if (y > viewH || y + cell.h < 0) continue;

          const centerY = y + cell.h / 2;
          const inBand = centerY > bandTop && centerY < bandBottom;

          ctx.strokeStyle = inBand ? COLOR.accent : COLOR.line;
          ctx.globalAlpha = inBand ? ACCENT_ALPHA : 1;
          // 0.5 ずらして 1px の線をくっきり見せる。
          ctx.strokeRect(
            Math.round(cell.x) + 0.5,
            Math.round(y) + 0.5,
            Math.round(cell.w),
            Math.round(cell.h),
          );
        }
      }

      ctx.globalAlpha = 1;
    };

    const resize = () => {
      if (disposed) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      viewW = window.innerWidth;
      viewH = window.innerHeight;

      canvas.width = Math.round(viewW * dpr);
      canvas.height = Math.round(viewH * dpr);
      canvas.style.width = `${viewW}px`;
      canvas.style.height = `${viewH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = buildCells(viewW, PATTERN_HEIGHT);
      draw();
    };

    // スクロールは rAF で1フレーム1回に間引く。スクロールが止まれば予約も止まる
    // （常時ループではないので、静止中は再描画が発生しない）。
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        draw();
      });
    };

    const onVisibility = () => {
      // 非表示中はスキップしているため、戻ってきたときに描き直す。
      if (document.visibilityState === "visible") draw();
    };

    resize();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", draw);

    // フォント読み込みでレイアウト高さが変わるため、両方でサイズを取り直す。
    const observer = new ResizeObserver(resize);
    observer.observe(document.documentElement);
    document.fonts?.ready.then(() => {
      if (!disposed) resize();
    });

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", draw);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1]"
    />
  );
}
