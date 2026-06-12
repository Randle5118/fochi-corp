"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { ok: false };

const inputCls =
  "w-full rounded-sm border border-border bg-surface px-md py-sm text-base text-ink outline-none transition-colors focus:border-primary";
const labelCls = "block text-sm font-medium text-ink";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="rounded-md border border-success/30 bg-success-light p-lg">
        <p className="font-medium text-success">
          お問い合わせを受け付けました。
        </p>
        <p className="mt-2xs text-sm text-ink-muted">
          担当者より追ってご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-lg">
      {state.error && (
        <p className="rounded-sm border border-error/30 bg-error-light px-md py-sm text-sm text-error">
          {state.error}
        </p>
      )}

      <div className="space-y-xs">
        <label htmlFor="name" className={labelCls}>
          お名前 <span className="text-error">*</span>
        </label>
        <input id="name" name="name" required className={inputCls} />
      </div>

      <div className="space-y-xs">
        <label htmlFor="email" className={labelCls}>
          メールアドレス <span className="text-error">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputCls}
        />
      </div>

      <div className="space-y-xs">
        <label htmlFor="message" className={labelCls}>
          お問い合わせ内容 <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={inputCls}
        />
      </div>

      {/* ハニーポット（スクリーンリーダー・人間からは隠す） */}
      <div aria-hidden className="hidden">
        <label htmlFor="company_url">Company URL</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-sm bg-primary px-xl py-sm text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {pending ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
