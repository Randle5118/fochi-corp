import type { Config } from "tailwindcss";

// デザイントークンは monthly_parking/DESIGN.md（Industrial/Utilitarian）から移植。
// 主色は青緑（ティール, #00A5BF）。クリアで先進的な印象を基調に、
// ニュートラル（surface/border/ink）もわずかに青緑みへ寄せて調和させている。
// 変更する場合は DESIGN.md を真実の源とし、両者を同期させること。
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A5BF", // 青緑 / ティール
          hover: "#0089A0",
          light: "#DCF1F5",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F4F8F9",
        },
        border: "#DCE6E8",
        ink: {
          DEFAULT: "#16303A",
          muted: "#5C6B70",
        },
        success: { DEFAULT: "#16A34A", light: "#DCFCE7" },
        warning: { DEFAULT: "#D97706", light: "#FEF3C7" },
        error: { DEFAULT: "#DC2626", light: "#FEE2E2" },
        info: { DEFAULT: "#0284C7", light: "#E0F2FE" },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
      },
      fontSize: {
        "3xs": ["11px", { lineHeight: "1.5" }],
        "2xs": ["12px", { lineHeight: "1.5" }],
        xs: ["13px", { lineHeight: "1.6" }],
        sm: ["14px", { lineHeight: "1.6" }],
        base: ["15px", { lineHeight: "1.7" }],
        lg: ["18px", { lineHeight: "1.7" }],
        xl: ["20px", { lineHeight: "1.5" }],
        "2xl": ["24px", { lineHeight: "1.4" }],
        "3xl": ["32px", { lineHeight: "1.3" }],
      },
      spacing: {
        "2xs": "2px",
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      maxWidth: {
        content: "1100px",
      },
      transitionTimingFunction: {
        enter: "cubic-bezier(0, 0, 0.2, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
