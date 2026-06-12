import Section from "@/components/Section";
import Markdown from "@/components/Markdown";
import { company, site } from "@/lib/site";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "プライバシーポリシー",
  description: `${site.name}の個人情報保護方針です。`,
  path: "/privacy-policy",
});

// ⚠️ PLACEHOLDER：弁護士・社内法務の確認の上、自社の運用に合わせて確定すること。
const content = `
${company.legalName}（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と認識し、以下のとおり個人情報保護方針を定めます。

## 1. 個人情報の取得
当社は、適法かつ公正な手段によって個人情報を取得します。

## 2. 利用目的
当社は、取得した個人情報を以下の目的の範囲内で利用します。

- お問い合わせへの対応
- サービスの提供・運営・改善
- 当社サービスに関するご案内

## 3. 第三者提供
当社は、法令に定める場合を除き、ご本人の同意なく個人情報を第三者に提供しません。

## 4. 安全管理
当社は、個人情報の漏えい・滅失・毀損を防止するため、必要かつ適切な安全管理措置を講じます。

## 5. 開示・訂正・削除
当社は、ご本人からの個人情報の開示・訂正・削除のご請求に対し、法令に従い適切に対応します。

## 6. お問い合わせ窓口
本方針に関するお問い合わせは、${site.email} までご連絡ください。

## 7. 改定
当社は、本方針を必要に応じて改定することがあります。
`;

export default function PrivacyPolicyPage() {
  return (
    <Section title="プライバシーポリシー">
      <Markdown>{content}</Markdown>
    </Section>
  );
}
