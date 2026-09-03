"use server";

import { headers } from "next/headers";
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

// ---- 簡易レート制限 --------------------------------------------------------
// Server Action のエンドポイントは直接繰り返し呼べるため、ハニーポットだけでは
// 受信箱と Resend の送信枠を守れない。同一 IP からの連投を弾く。
//
// ⚠️ プロセス内メモリのため、Vercel の複数インスタンス間では共有されない
// （＝厳密な上限ではなく「速度制限」）。より強い保証が必要になったら
// Upstash Redis などの外部ストアに差し替えること。
const RATE_LIMIT_MAX = 3; // 同一 IP からの許容送信数
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 分
const recentSubmissions = new Map<string, number[]>();

async function clientIp(): Promise<string> {
  const h = await headers();
  // Vercel は x-forwarded-for の先頭にクライアント IP を入れる。
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // 期限切れのエントリを掃除して Map が無限に育たないようにする。
  for (const [key, times] of recentSubmissions) {
    const alive = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (alive.length === 0) recentSubmissions.delete(key);
    else recentSubmissions.set(key, alive);
  }

  const times = recentSubmissions.get(ip) ?? [];
  if (times.length >= RATE_LIMIT_MAX) return true;

  recentSubmissions.set(ip, [...times, now]);
  return false;
}
// ---------------------------------------------------------------------------

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

  if (isRateLimited(await clientIp())) {
    return {
      ok: false,
      error:
        "送信回数の上限に達しました。しばらく時間をおいてから再度お試しください。",
    };
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
