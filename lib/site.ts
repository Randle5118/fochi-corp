// サイト全体の設定・会社情報の単一の真実の源（single source of truth）。
// ⚠️ PLACEHOLDER と記載した値は登記情報に合わせて差し替えること。
export const site = {
  name: "株式会社Fochi",
  nameEn: "Fochi, Inc.",
  tagline: "腑に落ちる道具を、つくる。",
  // meta description。検索結果に出るため、ここには「見つけてもらう言葉」を置く。
  // 2026-11 方針：自社サービスの開発・運営が主軸、受託は従。
  description:
    "株式会社Fochiは、少人数で自社サービスを開発・運営する会社です。月極駐車場の管理サービスを提供しているほか、業務システムの開発やIT活用のご相談もお受けしています。",
  // 本番ドメイン。apex（fochi.jp）は www へ 308 リダイレクトされるため、
  // canonical / og:url / sitemap には www 付きを正規として使う。
  domain: "www.fochi.jp",
  url: "https://www.fochi.jp",
  // プロダクト（monthly_parking）の本番URL。
  // トップ・/services のサービスカードはこの値を参照する（app.fochi.co.jp は存在しない）。
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
    "自社サービスの企画・開発・運営",
    "受託開発",
    "ITの活用・業務効率化・可視化に関するコンサルティング",
  ],
} as const;

// 自社サービス（トップ・/services のカードで共用）。
// ⚠️ 機能一覧・料金はここに書かない（プロダクトサイトの担当。二重管理すると必ず食い違う）。
// サービスが増えたら、同じ形の要素を足すだけにする。
export const products = [
  {
    name: "月極駐車場の管理サービス",
    body: "月極駐車場の満空管理と一次受付のサービス。管理会社が、駐車場の問い合わせ対応に取られる時間を減らすためのものです。",
    href: site.appUrl,
  },
] as const;

// グローバルナビゲーション
export const nav = [
  { label: "会社概要", href: "/about" },
  { label: "事業内容", href: "/services" },
  { label: "お知らせ", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
] as const;
