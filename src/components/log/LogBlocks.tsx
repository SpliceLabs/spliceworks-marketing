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
    case "code":
      return (
        <pre className="lg-code-block" tabIndex={0}>
          <code>{block.text}</code>
        </pre>
      );
    case "image":
      return <ImageView block={block} />;
    case "cta":
    case "hr":
      return null;
  }
};

type ImageBlock = Extract<Block, { t: "image" }>;

const ImageView = ({ block }: { block: ImageBlock }) => (
  <figure className={block.scroll ? "lg-figure lg-figure-scroll" : "lg-figure"}>
    {block.scroll ? (
      <div className="lg-frame" tabIndex={0} role="region" aria-label={block.alt}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={block.src} alt={block.alt} loading="lazy" />
      </div>
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={block.src} alt={block.alt} loading="lazy" />
    )}
    <figcaption>
      <span>{block.caption}</span>
      <a href={block.src}>Open full size</a>
    </figcaption>
  </figure>
);

const isScrollImage = (block: Block): block is ImageBlock => block.t === "image" && block.scroll;

type Segment = { readonly row: boolean; readonly blocks: readonly Block[] };

const segments = (blocks: readonly Block[]): readonly Segment[] =>
  blocks.reduce<readonly Segment[]>((acc, block) => {
    const last = acc[acc.length - 1];
    const scroll = isScrollImage(block);
    if (scroll && last?.row) return [...acc.slice(0, -1), { row: true, blocks: [...last.blocks, block] }];
    return [...acc, { row: scroll, blocks: [block] }];
  }, []);

export const LogBlocks = ({ blocks }: { blocks: readonly Block[] }) => (
  <>
    {segments(blocks).map((segment, index) =>
      segment.row ? (
        <div key={index} className="lg-figure-row">
          {segment.blocks.map((block, at) => (
            <BlockView key={at} block={block} />
          ))}
        </div>
      ) : (
        <BlockView key={index} block={segment.blocks[0]} />
      ),
    )}
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
