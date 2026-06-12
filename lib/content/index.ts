import { mdxNewsRepository } from "./sources/mdx";
import type { NewsRepository } from "./repository";

// ★ データソースの切り替えポイント ★
// CMS へ移行する際は、ここを差し替えるだけでよい：
//   import { microcmsNewsRepository } from "./sources/microcms";
//   export const newsRepo: NewsRepository = microcmsNewsRepository;
export const newsRepo: NewsRepository = mdxNewsRepository;

export * from "./schema";
export type { NewsRepository } from "./repository";
