"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";

const ContactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください").max(100),
  email: z.string().email("正しいメールアドレスを入力してください"),
  message: z.string().min(1, "お問い合わせ内容を入力してください").max(5000),
  // ハニーポット：人間には見えない項目。値が入っていれば bot とみなす。
  company_url: z.string().optional(),
});

export type ContactState = {
  ok: boolean;
  error?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company_url: formData.get("company_url"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "入力エラー" };
  }

  // ハニーポットに値あり → bot。成功を装って黙って破棄する。
  if (parsed.data.company_url) {
    return { ok: true };
  }

  try {
    await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });
    return { ok: true };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error:
        "送信に失敗しました。時間をおいて再度お試しいただくか、メールにてご連絡ください。",
    };
  }
}
