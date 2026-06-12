import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Markdown 文字列をレンダリングする共通コンポーネント。
// お知らせ本文（MDX でも CMS でも「Markdown / HTML 文字列」）を同じ経路で描画する。
// data-source に依存しないため、CMS 移行後もこのコンポーネントは変更不要。
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
