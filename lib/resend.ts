import { Resend } from "resend";

// お問い合わせフォーム送信用。RESEND_API_KEY 未設定時は遅延エラーにする
// （ビルド時に環境変数が無くても落ちないように、関数呼び出し時に検証）。
export async function sendContactEmail({
  name,
  email,
  message,
  replyTo,
}: {
  name: string;
  email: string;
  message: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  // ⚠️ from のドメインは Resend 側で認証（DKIM/SPF）済みである必要がある。
  // 未認証だと送信は失敗するため、実運用では CONTACT_FROM_EMAIL で明示すること。
  const from = process.env.CONTACT_FROM_EMAIL ?? "Fochi <noreply@fochi.jp>";
  // ⚠️ 暫定：コーポレート側のメールが未整備のため、プロダクト側の窓口に寄せている。
  const to = process.env.CONTACT_TO_EMAIL ?? "admin@monthly-parking.jp";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: `【お問い合わせ】${name} 様より`,
    replyTo: replyTo ?? email,
    text: `お名前: ${name}\nメールアドレス: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Error sending contact email:", error);
    throw new Error(error.message);
  }

  return data;
}
