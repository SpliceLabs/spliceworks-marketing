import { SITE_URL, absoluteUrl } from "@/lib/site";

export const askPrompt = ({ title, path }: { title: string; path: string }): string =>
  `I'm looking at the SpliceOps page "${title}" at ${absoluteUrl(path)} . Read ${SITE_URL}/llms-full.txt for the clean-text copy of the site and explain this page to me in plain English, including how it might apply to my business. If you can't open it, say so.`;
