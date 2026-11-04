import { Fragment } from "react";
import { InlineLines, InlineNodes } from "./Inline";
import { getPage } from "@/lib/copy/pages";
import type { Block } from "@/lib/copy/markdown";

const LEGAL_PATHS = ["/privacy", "/terms"] as const;

const pad = (n: number) => String(n).padStart(2, "0");

const LegalBlock = ({ block }: { block: Block }) => {
  switch (block.t) {
    case "para":
      return (
        <p>
          <InlineLines lines={block.lines} />
        </p>
      );
    case "list": {
      const items = block.items.map((item, i) => (
        <li key={i}>
          <InlineNodes nodes={item.c} />
        </li>
      ));
      return block.ordered ? <ol>{items}</ol> : <ul className="dots">{items}</ul>;
    }
    case "table":
      return (
        <table className="lgl-table">
          <thead>
            <tr>
              {block.head.map((cell, i) => (
                <th key={i}>
                  <InlineNodes nodes={cell} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    <InlineNodes nodes={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return null;
  }
};

const META: readonly (readonly [string, string])[] = [
  ["Effective", "effective"],
  ["Company", "company"],
  ["Location", "location"],
];

export const LegalPage = ({ path }: { path: (typeof LEGAL_PATHS)[number] }) => {
  const page = getPage(path);
  return (
    <>
      <header className="wrap lgl-head">
        <div>
          <p className="kicker" style={{ margin: 0 }}>
            Legal / {pad(LEGAL_PATHS.indexOf(path) + 1)}
          </p>
          <h1 className="display">{page.h1Text}</h1>
        </div>
        <div>
          {page.intro.map((block, i) => (
            <p key={i} className="lede">
              {block.t === "para" ? <InlineLines lines={block.lines} /> : null}
            </p>
          ))}
          <dl className="lgl-meta">
            {META.filter(([, key]) => page.fm[key]).map(([label, key]) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{page.fm[key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>
      <div className="wrap lg-body legal">
        <aside className="lg-toc">
          <span className="lab">On this page</span>
          <ol>
            {page.sections.map((section, i) => (
              <li key={section.slug}>
                <a href={`#${section.slug}`}>
                  <b>{pad(i + 1)}</b>
                  <span>{section.titleText}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>
        <article className="lg-art">
          {page.sections.map((section, i) => (
            <Fragment key={section.slug}>
              <span className="esec-n" id={section.slug}>
                {pad(i + 1)}
              </span>
              <h2>{section.titleText}</h2>
              {section.blocks.map((block, j) => (
                <LegalBlock key={j} block={block} />
              ))}
            </Fragment>
          ))}
        </article>
      </div>
    </>
  );
};
