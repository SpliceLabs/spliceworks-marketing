import type { ReactNode } from "react";
import type { Block, Inline } from "@/lib/copy/markdown";
import { InlineLines, InlineNodes } from "@/components/copy/Inline";
import { Check } from "@/components/ds/parts";

const OUR_READ = /^Our read:\s*$/;

const isOurRead = (block: Block): boolean => {
  if (block.t !== "para") return false;
  const first = block.lines[0]?.[0];
  return first?.t === "strong" && OUR_READ.test(first.c.map((node) => (node.t === "text" ? node.v : "")).join(""));
};

const withoutLabel = (lines: Inline[][]): Inline[][] => [
  lines[0]
    .slice(1)
    .map((node, index) => (index === 0 && node.t === "text" ? { ...node, v: node.v.trimStart() } : node)),
  ...lines.slice(1),
];

const ListView = ({ block }: { block: Extract<Block, { t: "list" }> }) => {
  const items = block.items.map((item, index) => (
    <li key={index}>
      <InlineNodes nodes={item.c} />
      {item.children.length > 0 && <LogBlocks blocks={item.children} />}
    </li>
  ));
  return block.ordered ? <ol className="lg-steps">{items}</ol> : <ul className="dots">{items}</ul>;
};

const TableView = ({ block }: { block: Extract<Block, { t: "table" }> }) => (
  <table className="lg-table">
    <thead>
      <tr>
        {block.head.map((cell, index) => (
          <th key={index} scope="col">
            <InlineNodes nodes={cell} />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {block.rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, index) => (
            <td key={index}>
              <InlineNodes nodes={cell} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const BlockView = ({ block }: { block: Block }): ReactNode => {
  if (block.t === "para" && isOurRead(block)) {
    return (
      <aside className="lg-read">
        <span className="lab">Our read</span>
        <p>
          <InlineLines lines={withoutLabel(block.lines)} />
        </p>
      </aside>
    );
  }
  switch (block.t) {
    case "para":
      return (
        <p>
          <InlineLines lines={block.lines} />
        </p>
      );
    case "list":
      return <ListView block={block} />;
    case "table":
      return <TableView block={block} />;
    case "heading":
      return (
        <h3>
          <InlineNodes nodes={block.c} />
        </h3>
      );
    case "cta":
    case "hr":
      return null;
  }
};

export const LogBlocks = ({ blocks }: { blocks: readonly Block[] }) => (
  <>
    {blocks.map((block, index) => (
      <BlockView key={index} block={block} />
    ))}
  </>
);

export const KeyTakeaways = ({ blocks }: { blocks: readonly Block[] }) => {
  const list = blocks.find((block): block is Extract<Block, { t: "list" }> => block.t === "list");
  const rest = blocks.filter((block) => block !== list);
  return (
    <>
      <div className="lg-short card white">
        <span className="lab">In short</span>
        {list?.items.map((item, index) => (
          <div key={index} className="crow">
            <Check />
            <span>
              <InlineNodes nodes={item.c} />
            </span>
          </div>
        ))}
      </div>
      <LogBlocks blocks={rest} />
    </>
  );
};
