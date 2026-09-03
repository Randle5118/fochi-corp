import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// SNS シェア時の OG 画像（/opengraph-image）。ビルド時に静的生成され、
// Next.js のファイル規約により全ページの og:image / twitter:image に自動適用される。
//
// ⚠️ 描画テキストはラテン文字のみにすること。ImageResponse の既定フォントは
// 日本語グリフを持たず、和文を入れると豆腐（□）になる。
// 和文を載せたくなった場合は Noto Sans JP の font data を読み込んで fonts に渡すこと。
export const alt = site.nameEn;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          borderTop: "16px solid #2563EB",
          padding: "0 96px",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, color: "#1E293B" }}>
          {site.nameEn}
        </div>
        <div style={{ marginTop: 24, fontSize: 40, color: "#64748B" }}>
          {site.domain}
        </div>
      </div>
    ),
    size,
  );
}
