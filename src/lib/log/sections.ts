import { inlineText, parseBlocks, slugify, type Block } from "@/lib/copy/markdown";

export type LogSection = {
  readonly heading: string;
  readonly slug: string;
  readonly blocks: readonly Block[];
};

export const splitSections = (
  body: string,
): { readonly intro: readonly Block[]; readonly sections: readonly LogSection[] } => {
  const blocks = parseBlocks(body);
  const firstH2 = blocks.findIndex((block) => block.t === "heading" && block.level === 2);
  if (firstH2 === -1) return { intro: blocks, sections: [] };
  const rest = blocks.slice(firstH2);
  const starts = rest.flatMap((block, index) => (block.t === "heading" && block.level === 2 ? [index] : []));
  const sections = starts.map((start, i) => {
    const head = rest[start] as Extract<Block, { t: "heading" }>;
    const heading = inlineText(head.c);
    return { heading, slug: slugify(heading), blocks: rest.slice(start + 1, starts[i + 1] ?? rest.length) };
  });
  return { intro: blocks.slice(0, firstH2), sections };
};
