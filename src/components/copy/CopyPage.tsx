import { AskBox } from "./AskBox";
import Link from "next/link";
import type { ReactNode } from "react";
import { inlineText, type Block, type Section, type Subsection } from "@/lib/copy/markdown";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { getEntry, getPage } from "@/lib/copy/pages";
import { faqPageJsonLd, pageFaqIds, resolveFaqSection } from "@/lib/copy/faq";
import { JsonLd } from "@/components/JsonLd";
import { formBlocks } from "@/lib/copy/bookForm";
import { ClosingCard } from "@/components/ds/ClosingCard";
import { Check, Strip } from "@/components/ds/parts";
import { OrnamentVisual } from "@/components/ds/visuals";
import { classifySection, planLayouts, type Plan } from "@/lib/copy/section-layout";
import { SectionTitle } from "./SectionTitle";
import { Blocks } from "./Blocks";
import { BookForm } from "./BookForm";
import { FaqBlock } from "./FaqBlock";
import { InlineLines, InlineNodes } from "./Inline";
import styles from "./Copy.module.css";

type Cta = Extract<Block, { t: "cta" }>;

/** A section is the closing band when it ends the page with the CTA and has no subsections. */
export function closingCta(sec: Section | undefined): Cta | null {
  if (!sec || sec.subs.length) return null;
  const last = sec.blocks[sec.blocks.length - 1];
  return last?.t === "cta" && !last.submit ? last : null;
}

export function ClosingBand({ section }: { section: Section }) {
  const cta = closingCta(section)!;
  const body = section.blocks.slice(0, -1);
  return (
    <ClosingCard
      id={section.slug}
      heading={<SectionTitle nodes={section.title} />}
      body={body.length ? <Blocks blocks={body} /> : undefined}
      ctaLabel={cta.label}
      ctaHref={cta.href}
      sub={cta.sub.length ? <InlineLines lines={cta.sub} /> : undefined}
    />
  );
}

export function PageHeader({ path }: { path: string }) {
  const page = getPage(path);
  const { group } = getEntry(path);
  return (
    <section className="wrap pagehead">
      {group && (
        <Link
          href={group.href}
          className="kicker kd"
          style={{ display: "inline-block", margin: "0 0 20px", textDecoration: "none" }}
        >
          {group.label}
        </Link>
      )}
      <h1 className="display">
        <SectionTitle nodes={page.h1} />
      </h1>
      <HeaderIntro blocks={page.intro} />
    </section>
  );
}

function HeaderIntro({ blocks }: { blocks: Block[] }) {
  const text = blocks.filter((b) => b.t !== "cta");
  const ctas = blocks.filter((b): b is Cta => b.t === "cta");
  return (
    <>
      {text.length > 0 && (
        <div className={styles.lead} style={{ marginTop: 28 }}>
          <Blocks blocks={text} />
        </div>
      )}
      {ctas.length > 0 && <Blocks blocks={ctas} />}
    </>
  );
}

type Frame = { section: Section; index: number; total: number; plan: Plan; label: string };

const Heading = ({ section, centered }: { section: Section; centered?: boolean }) => (
  <>
    <h2 className="h2" style={centered ? { marginInline: "auto", maxWidth: 900 } : undefined}>
      <SectionTitle nodes={section.title} />
    </h2>
  </>
);

function SectionFrame({ frame, children }: { frame: Frame; children: ReactNode }) {
  const { section, index, total, plan, label } = frame;
  return (
    <section
      id={section.slug}
      data-layout={plan.kind}
      data-side={plan.side}
      data-align={plan.align}
      className="sec wrap"
      style={index === 0 ? { paddingTop: 0 } : undefined}
    >
      <Strip n={String(index + 1).padStart(2, "0")} total={String(total).padStart(2, "0")} label={label} />
      {children}
    </section>
  );
}

const firstPlainList = (blocks: Block[]) =>
  blocks.find(
    (b): b is Extract<Block, { t: "list" }> =>
      b.t === "list" &&
      !b.ordered &&
      b.items.length > 1 &&
      b.items.every((it) => it.children.length === 0) &&
      !b.items.every((it) => it.raw.startsWith('"')),
  );

const isLeadIn = (b: Block | undefined): b is Extract<Block, { t: "para" }> =>
  b?.t === "para" && b.raw.trimEnd().endsWith(":");

function CheckCard({ list, title }: { list: Extract<Block, { t: "list" }>; title?: Block }) {
  return (
    <div className="card white" style={{ padding: "12px 28px" }}>
      {title?.t === "para" ? (
        <p className="kicker" style={{ margin: "16px 0 4px" }}>
          <InlineLines lines={title.lines} />
        </p>
      ) : null}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {list.items.map((it, i) => (
          <li key={i} className="crow" style={i === 0 ? { borderTop: 0 } : undefined}>
            <Check />
            <span style={{ fontWeight: 500 }}>
              <InlineNodes nodes={it.c} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubPillars({ subs }: { subs: Subsection[] }) {
  return (
    <div className="tcards">
      {subs.map((sub, i) => (
        <article key={sub.slug} id={sub.slug} className="tcard">
          <span className="tcard-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="tcard-h">
            <InlineNodes nodes={sub.title} />
          </h3>
          <div className={styles.cardBody}>
            <Blocks blocks={sub.blocks} />
          </div>
        </article>
      ))}
    </div>
  );
}

function SubStack({ subs }: { subs: Subsection[] }) {
  return (
    <div className={styles.stack}>
      {subs.map((sub) => (
        <div key={sub.slug} id={sub.slug}>
          <h3 className={styles.stackTitle}>
            <InlineNodes nodes={sub.title} />
          </h3>
          <div className={styles.prose}>
            <Blocks blocks={sub.blocks} />
          </div>
        </div>
      ))}
    </div>
  );
}

const Prose = ({ blocks }: { blocks: Block[] }) =>
  blocks.length > 0 ? (
    <div className={styles.prose}>
      <Blocks blocks={blocks} />
    </div>
  ) : null;

/** One H2 section of a copy page, laid out by its planned frame. */
export function CopySection({ frame, pageUrl }: { frame: Frame; pageUrl: string }) {
  const { section, plan } = frame;
  const centered = plan.align === "center";

  const faq = resolveFaqSection(section, pageUrl);
  if (faq) {
    return (
      <SectionFrame frame={frame}>
        <Heading section={section} />
        <div style={{ marginTop: 28 }}>
          <Prose blocks={section.blocks} />
          <FaqBlock ids={faq.ids} />
          <Prose blocks={faq.after} />
        </div>
      </SectionFrame>
    );
  }

  const form = formBlocks(section);
  if (form) {
    return (
      <SectionFrame frame={frame}>
        <Heading section={section} />
        <div style={{ marginTop: 28 }}>
          <Prose blocks={form.before} />
          <BookForm questions={form.questions} submit={form.submit} />
        </div>
      </SectionFrame>
    );
  }

  const subsHaveTables = section.subs.some((s) => s.blocks.some((b) => b.t === "table"));
  const subs =
    section.subs.length === 0 ? null : subsHaveTables ? (
      <SubStack subs={section.subs} />
    ) : (
      <SubPillars subs={section.subs} />
    );

  if (plan.kind === "split") {
    const list = plan.visual === "list" ? firstPlainList(section.blocks) : undefined;
    const leadIn = list ? section.blocks[section.blocks.indexOf(list) - 1] : undefined;
    const title = isLeadIn(leadIn) ? leadIn : undefined;
    const textBlocks = list ? section.blocks.filter((b) => b !== list && b !== title) : section.blocks;
    return (
      <SectionFrame frame={frame}>
        <div className={`g2${plan.side === "right" ? " rev" : ""}`} style={{ alignItems: "start" }}>
          <div>
            <Heading section={section} />
            <div style={{ marginTop: 24 }}>
              <Prose blocks={textBlocks} />
            </div>
          </div>
          {list ? <CheckCard list={list} title={title} /> : <OrnamentVisual kind={plan.ornament} />}
        </div>
      </SectionFrame>
    );
  }

  const lead = section.blocks.filter((b) => b.t !== "table" && b.t !== "cta");
  const tables = section.blocks.filter((b) => b.t === "table");
  const ctas = section.blocks.filter((b) => b.t === "cta");

  if (plan.kind === "statement") {
    return (
      <SectionFrame frame={frame}>
        <div className="center" style={{ maxWidth: 860, margin: "0 auto" }}>
          <Heading section={section} centered />
          <div style={{ marginTop: 24 }}>
            <Prose blocks={lead} />
            <Prose blocks={ctas} />
          </div>
        </div>
      </SectionFrame>
    );
  }

  return (
    <SectionFrame frame={frame}>
      {centered ? (
        <div className="center" style={{ maxWidth: 860, margin: "0 auto 48px" }}>
          <Heading section={section} centered />
          <div style={{ marginTop: 24 }}>
            <Prose blocks={lead} />
          </div>
        </div>
      ) : (
        <div className="g2" style={{ alignItems: "end", marginBottom: 48 }}>
          <div>
            <Heading section={section} />
          </div>
          <Prose blocks={lead} />
        </div>
      )}
      <Prose blocks={tables} />
      {subs}
      <Prose blocks={ctas} />
    </SectionFrame>
  );
}

/** Renders a whole v5 copy page: header, sections, closing band. */
/** `children` (e.g. a tool's calculator) render straight after the page header. */
export function CopyPage({ path, children }: { path: string; children?: ReactNode }) {
  const page = getPage(path);
  const entry = getEntry(path);
  const last = page.sections[page.sections.length - 1];
  const hasBand = !!closingCta(last);
  const body = hasBand ? page.sections.slice(0, -1) : page.sections;
  const faqIds = pageFaqIds(path);
  const plans = planLayouts(body.map(classifySection));
  const label = entry.group?.label ?? "SpliceOps";
  return (
    <>
      {entry.group && <JsonLd data={breadcrumbJsonLd(entry, page.fm.title)} />}
      {faqIds.length > 0 && <JsonLd data={faqPageJsonLd(faqIds)} />}
      <PageHeader path={path} />
      {children}
      {body.map((sec, i) => (
        <CopySection
          key={sec.slug}
          frame={{ section: sec, index: i, total: body.length, plan: plans[i], label }}
          pageUrl={path}
        />
      ))}
      {hasBand && <ClosingBand section={last} />}
      <section className="wrap" style={{ paddingBlock: "var(--space-32) var(--space-48)" }}>
        <div className="narrow">
          <AskBox title={inlineText(page.h1)} path={path} />
        </div>
      </section>
    </>
  );
}
