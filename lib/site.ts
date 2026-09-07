// サイト全体の設定・会社情報の単一の真実の源（single source of truth）。
// ⚠️ PLACEHOLDER と記載した値は登記情報に合わせて差し替えること。
export const site = {
  name: "株式会社Fochi",
  nameEn: "Fochi, Inc.",
  tagline: "駐車場経営を、もっとシンプルに。",
  description:
    "株式会社Fochiは、月極駐車場管理SaaSをはじめとする不動産テック事業を通じて、駐車場経営の効率化を支援します。",
  // 本番ドメイン。apex（fochi.jp）は www へ 308 リダイレクトされるため、
  // canonical / og:url / sitemap には www 付きを正規として使う。
  domain: "www.fochi.jp",
  url: "https://www.fochi.jp",
  // プロダクト（monthly_parking）の本番URL。
  // 現在サイト上に導線は置いていない（下記コメント参照）。
  appUrl: "https://monthly-parking.jp",
  // ⚠️ 暫定：コーポレート側のメールが未整備のため、プロダクト側の窓口に寄せている。
  // ドメインを統一する際に info@fochi.jp 等へ差し替えること。
  email: "admin@monthly-parking.jp",
  locale: "ja_JP",
} as const;

// 会社概要（会社概要ページ・フッターで使用）。PLACEHOLDER は要差し替え。
export const company = {
  legalName: "株式会社Fochi",
  representative: "代表取締役　＿＿＿＿", // PLACEHOLDER
  founded: "＿＿＿＿年＿＿月", // PLACEHOLDER
  capital: "＿＿＿＿円", // PLACEHOLDER
  address: {
    postalCode: "〒000-0000", // PLACEHOLDER
    line: "東京都＿＿区＿＿＿＿", // PLACEHOLDER
  },
  // 特定商取引法の表記に必須。公開前に必ず実在の番号へ差し替えること。
  tel: "000-0000-0000", // PLACEHOLDER
  business: [
    "月極駐車場管理SaaSの開発・運営",
    "不動産管理業務のDX支援",
    "Webサービスの企画・開発",
  ],
} as const;

// グローバルナビゲーション
export const nav = [
  { label: "会社概要", href: "/about" },
  { label: "事業内容", href: "/services" },
  { label: "お知らせ", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
] as const;
