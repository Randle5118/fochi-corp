// サイト全体の設定・会社情報の単一の真実の源（single source of truth）。
// ⚠️ PLACEHOLDER と記載した値は登記情報に合わせて差し替えること。
export const site = {
  name: "株式会社Fochi",
  nameEn: "Fochi, Inc.",
  // h1 / ヒーローのキャッチコピー（テック企業らしい汎用文言。後で差し替え可）。
  tagline: "ソフトウェアで、現場の「不便」をなくす。",
  description:
    "株式会社Fochiは、日常に潜む「不便」をテクノロジーで解決するプロダクトカンパニーです。プロダクト開発とDX支援を通じて、現場が本当に使える仕組みをつくります。",
  domain: "fochi.jp",
  url: "https://fochi.jp",
  email: "info@fochi.jp",
  locale: "ja_JP",
} as const;

// 会社概要（会社概要ページ・フッターで使用）。PLACEHOLDER は要差し替え。
export const company = {
  legalName: "株式会社Fochi",
  representative: "代表取締役　＿＿＿＿", // PLACEHOLDER
  founded: "2024年", // PLACEHOLDER
  capital: "＿＿＿＿円", // PLACEHOLDER
  address: {
    postalCode: "〒000-0000", // PLACEHOLDER
    line: "東京都＿＿区＿＿＿＿", // PLACEHOLDER
  },
  mission:
    "わたしたちは、テクノロジーの力で日々の業務やくらしに潜む「不便」を一つずつ解きほぐし、誰もが心地よく使える仕組みを社会に実装します。",
} as const;

// 提供サービス（トップのサマリー・事業内容ページで使用）。
// 月極駐車場管理は数あるサービスの一つとして扱う。
export const services = [
  {
    slug: "parking",
    icon: "car",
    name: "月極駐車場管理SaaS",
    tagline: "駐車場の申込・契約・管理を、まるごとオンラインに。",
    summary:
      "電話とFAXに頼っていた月極駐車場の運用を、Webだけで完結できる管理SaaS。",
    points: [
      "空き区画の公開と入居申込のオンライン受付",
      "契約手続きのデジタル化",
      "契約・テナント情報の一元管理",
    ],
  },
  {
    slug: "development",
    icon: "code",
    name: "プロダクト・受託開発",
    tagline: "アイデアを、動くプロダクトに。",
    summary:
      "Web・モバイルアプリの企画・設計から開発・運用までを一気通貫で支援します。",
    points: [
      "要件定義・UI / UX 設計",
      "Web アプリ／モバイルアプリ開発",
      "リリース後の運用・改善",
    ],
  },
  {
    slug: "dx",
    icon: "refresh",
    name: "DX・業務改善支援",
    tagline: "現場の「不便」を、仕組みで解く。",
    summary:
      "紙・電話中心の業務をデジタル化し、現場に定着するまで伴走支援します。",
    points: [
      "業務フローの可視化・課題整理",
      "ツール選定・内製化支援",
      "データ活用・自動化",
    ],
  },
] as const;

// わたしたちの強み（トップ・会社概要で使用）。
export const strengths = [
  {
    icon: "target",
    title: "現場起点で考える",
    body: "電話・紙・FAXが残る現場に入り込み、机上ではなく「実際に使われる形」から設計します。",
  },
  {
    icon: "layers",
    title: "企画から運用まで一貫",
    body: "要件定義・デザイン・開発・運用までを一つのチームで担い、責任を持って届けます。",
  },
  {
    icon: "shield",
    title: "長く使える品質",
    body: "派手さより誠実さ。日々の業務に溶け込み、長く信頼できる道具のようなプロダクトを。",
  },
] as const;

// グローバルナビゲーション
export const nav = [
  { label: "会社概要", href: "/about" },
  { label: "事業内容", href: "/services" },
  { label: "お知らせ", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
] as const;
