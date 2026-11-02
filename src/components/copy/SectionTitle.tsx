import type { Inline } from "@/lib/copy/markdown";
import { inlineText } from "@/lib/copy/markdown";
import { splitTitle } from "@/lib/copy/section-layout";
import { InlineNodes } from "./Inline";

const isPlain = (nodes: Inline[]) => nodes.every((n) => n.t === "text");

export const SectionTitle = ({ nodes }: { nodes: Inline[] }) => {
  if (!isPlain(nodes)) return <InlineNodes nodes={nodes} />;
  const [lead, tail] = splitTitle(inlineText(nodes));
  return (
    <>
      {lead}
      {tail ? <span className="ital">{tail}</span> : null}
    </>
  );
};
