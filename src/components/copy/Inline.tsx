import Link from "next/link";
import { Fragment } from "react";
import type { Inline } from "@/lib/copy/markdown";
import { Tbd } from "./Tbd";

/** Renders parsed inline copy: text, bold, italic, links and placeholders. */
export function InlineNodes({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.t) {
          case "text":
            return <Fragment key={i}>{n.v}</Fragment>;
          case "code":
            return <code key={i}>{n.v}</code>;
          case "strong":
            return (
              <strong key={i}>
                <InlineNodes nodes={n.c} />
              </strong>
            );
          case "em":
            return (
              <em key={i}>
                <InlineNodes nodes={n.c} />
              </em>
            );
          case "link":
            return n.href.startsWith("/") ? (
              <Link key={i} href={n.href}>
                <InlineNodes nodes={n.c} />
              </Link>
            ) : (
              <a key={i} href={n.href} rel="noopener noreferrer" target="_blank">
                <InlineNodes nodes={n.c} />
              </a>
            );
          case "tbd":
            return (
              <Tbd key={i} id={n.ids} kind={n.kind}>
                {n.note}
              </Tbd>
            );
        }
      })}
    </>
  );
}

/** Lines of one paragraph, joined with line breaks as written in the copy. */
export function InlineLines({ lines }: { lines: Inline[][] }) {
  return (
    <>
      {lines.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <InlineNodes nodes={l} />
        </Fragment>
      ))}
    </>
  );
}
