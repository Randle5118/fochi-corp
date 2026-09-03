import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Markdown 文字列をレンダリングする共通コンポーネント。
// お知らせ本文（MDX でも CMS でも「Markdown 文字列」）を同じ経路で描画する。
// data-source に依存しないため、CMS 移行後もこのコンポーネントは変更不要。
//
// ⚠️ rehype-raw（生 HTML の描画）は意図的に入れていない。再追加しないこと。
// react-markdown は既定で生 HTML を無視する＝サニタイズ済みの状態であり、
// CMS 移行後は本文が「外部の編集者が書いた信頼できない入力」になるため、
// 生 HTML を通すと XSS の入口になる。HTML 表現が必要になった場合は
// rehype-raw + rehype-sanitize を必ずセットで導入すること。
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
