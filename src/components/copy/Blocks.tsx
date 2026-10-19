import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Inline } from "@/lib/copy/markdown";
import { QuoteGrid } from "@/components/WhoThisIsFor";
import { InlineLines, InlineNodes } from "./Inline";
import styles from "./Copy.module.css";

type Para = Extract<Block, { t: "para" }>;
type List = Extract<Block, { t: "list" }>;
type Cta = Extract<Block, { t: "cta" }>;

const isBoldLead = (b: Block): b is Para =>
  b.t === "para" && b.lines.length === 1 && b.lines[0][0]?.t === "strong" && b.lines[0].length > 1;

const isLabelOnly = (b: Block | undefined): b is Para =>
  !!b && b.t === "para" && b.lines.length === 1 && b.lines[0].length === 1 && b.lines[0][0].t === "strong";

const isQuoteList = (b: Block): b is List =>
  b.t === "list" && !b.ordered && b.items.length > 1 && b.items.every((it) => it.raw.startsWith('"'));

/** "Book a working session" button plus the line(s) under it. */
export function CtaLine({ block }: { block: Cta }) {
  return (
    <div className={styles.cta}>
      <Link href={block.href} className="btn btn-primary">
        {block.label} <span aria-hidden="true">→</span>
      </Link>
      {block.sub.length > 0 && (
        <p className={styles.ctaSub}>
          <InlineLines lines={block.sub} />
        </p>
      )}
    </div>
  );
}

export function CopyTable({ block }: { block: Extract<Block, { t: "table" }> }) {
  const rowHeaders = block.head[0]?.length === 0;
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {block.head.map((cell, i) =>
              cell.length === 0 ? (
                <td key={i} />
              ) : (
                <th key={i} scope="col">
                  <InlineNodes nodes={cell} />
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) =>
                c === 0 && rowHeaders ? (
                  <th key={c} scope="row">
                    <InlineNodes nodes={cell} />
                  </th>
                ) : (
                  <td key={c}>
                    <InlineNodes nodes={cell} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListBlock({ block }: { block: List }) {
  const items = block.items.map((it, i) => (
    <li key={i}>
      <InlineNodes nodes={it.c} />
      {it.children.length > 0 && <Blocks blocks={it.children} />}
    </li>
  ));
  return block.ordered ? <ol className={styles.steps}>{items}</ol> : <ul className={styles.list}>{items}</ul>;
}

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "para":
      return (
        <p>
          <InlineLines lines={block.lines} />
        </p>
      );
    case "list":
      return <ListBlock block={block} />;
    case "table":
      return <CopyTable block={block} />;
    case "cta":
      return <CtaLine block={block} />;
    case "heading":
      return (
        <h4>
          <InlineNodes nodes={block.c} />
        </h4>
      );
    case "hr":
      return null;
  }
}

/**
 * Renders a run of copy blocks. Groups a few patterns into existing design
 * patterns: bold-lead paragraphs side by side, "label + list" pairs as cards,
 * and lists of quoted situations as the quote grid.
 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  const out: ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];

    if (isBoldLead(b) && blocks[i + 1] && isBoldLead(blocks[i + 1])) {
      const group: Para[] = [];
      while (i < blocks.length && isBoldLead(blocks[i])) group.push(blocks[i++] as Para);
      out.push(
        <div key={`f${i}`} className={styles.features}>
          {group.map((p, k) => (
            <p key={k} className={styles.feature}>
              <InlineLines lines={p.lines} />
            </p>
          ))}
        </div>,
      );
      continue;
    }

    if (isLabelOnly(b) && blocks[i + 1]?.t === "list" && isLabelOnly(blocks[i + 2])) {
      const cards: { title: Inline[]; list: List }[] = [];
      while (isLabelOnly(blocks[i]) && blocks[i + 1]?.t === "list") {
        const label = blocks[i] as Para;
        cards.push({ title: (label.lines[0][0] as Extract<Inline, { t: "strong" }>).c, list: blocks[i + 1] as List });
        i += 2;
      }
      out.push(
        <div key={`c${i}`} className={styles.cards}>
          {cards.map((card, k) => (
            <div key={k} className={styles.card}>
              <p className={styles.cardTitle}>
                <InlineNodes nodes={card.title} />
              </p>
              <div className={styles.cardBody}>
                <ListBlock block={card.list} />
              </div>
            </div>
          ))}
        </div>,
      );
      continue;
    }

    if (isQuoteList(b)) {
      out.push(
        <div key={`q${i}`} className={styles.quoteWrap}>
          <QuoteGrid items={b.items.map((it, k) => <InlineNodes key={k} nodes={it.c} />)} />
        </div>,
      );
      i++;
      continue;
    }

    out.push(<BlockView key={i} block={b} />);
    i++;
  }
  return <>{out}</>;
}
