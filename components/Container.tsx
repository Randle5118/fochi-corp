import { ReactNode } from "react";

// 最大幅 1100px の中央寄せコンテナ（DESIGN.md: Max content width 1100px）。
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-content px-md md:px-lg ${className}`}>
      {children}
    </div>
  );
}
