// サイト全体の設定・会社情報の単一の真実の源（single source of truth）。
// ⚠️ PLACEHOLDER と記載した値は登記情報に合わせて差し替えること。
export const site = {
  name: "株式会社Fochi",
  nameEn: "Fochi, Inc.",
  tagline: "納得は、一緒に探すもの。",
  // meta description。検索結果に出るため、ここには「見つけてもらう言葉」を置く
  // （COPY.md 2：キーワードは /services と meta のみ。Hero・なぜ三段には入れない）。
  description:
    "株式会社Fochiは、ITの活用・DX・業務効率化・可視化に関するご相談と受託開発、および自社プロダクトの開発・運営を行っています。",
  // 本番ドメイン。apex（fochi.jp）は www へ 308 リダイレクトされるため、
  // canonical / og:url / sitemap には www 付きを正規として使う。
  domain: "www.fochi.jp",
  url: "https://www.fochi.jp",
  // プロダクト（monthly_parking）の本番URL。
  // COPY.md 4-3 の導線はこの値を参照する（app.fochi.co.jp は存在しない）。
  // トップページからは出さない（COPY.md 3-5：プロダクト名も受託メニューも出さない）。
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
    "ITの活用・業務効率化・可視化に関するコンサルティング",
    "受託開発",
    "自社プロダクトの企画・開発・運営",
  ],
} as const;

// グローバルナビゲーション
export const nav = [
  { label: "会社概要", href: "/about" },
  { label: "事業内容", href: "/services" },
  { label: "お知らせ", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
] as const;
