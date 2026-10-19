import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Block, Section } from "@/lib/copy/markdown";
import { getEntry, getPage } from "@/lib/copy/pages";
import { resolveFaqSection } from "@/lib/copy/faq";
import { HomeCta } from "@/components/HomeCta";
import shared from "@/app/(marketing)/shared.module.css";
import { Blocks } from "./Blocks";
import { BookForm } from "./BookForm";
import { FaqBlock } from "./FaqBlock";
import { InlineLines, InlineNodes } from "./Inline";
import styles from "./Copy.module.css";

type Cta = Extract<Block, { t: "cta" }>;
type List = Extract<Block, { t: "list" }>;

/** Header wash colors per area, from the palette the old pages used. */
const HERO: Record<string, [string, string?]> = {
  "/services": ["#2447E8", "#D98E14"],
  "/for": ["#FF6848", "#2447E8"],
  "/industries": ["#1E9E6A", "#2447E8"],
  "/how-it-works": ["#7FA4FF"],
  "/team": ["#D98E14"],
  "/work": ["#2447E8", "#D98E14"],
  "/book": ["#2447E8"],
  "/faq": ["#FFC53D"],
  "/station": ["#7FA4FF", "#1E9E6A"],
};

function heroStyle(path: string): CSSProperties {
  const key = "/" + (path.split("/")[1] ?? "");
  const [from, to] = HERO[key] ?? ["#2447E8"];
  return { "--hero-from": from, ...(to ? { "--hero-to": to } : {}) } as CSSProperties;
}

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
    <HomeCta
      id={section.slug}
      heading={<InlineNodes nodes={section.title} />}
      body={body.length ? <Blocks blocks={body} /> : undefined}
      ctaLabel={cta.label}
      ctaHref={cta.href}
      ctaSub={cta.sub.length ? <InlineLines lines={cta.sub} /> : undefined}
    />
  );
}

export function PageHeader({ path }: { path: string }) {
  const page = getPage(path);
  const { group } = getEntry(path);
  return (
    <section className={`${shared.pageHeader} ${shared.heroGradient}`} style={heroStyle(path)}>
      <div className="container">
        {group && (
          <Link href={group.href} className={styles.eyebrow}>
            {group.label}
          </Link>
        )}
        <h1 className={`${shared.pageTitle} ${styles.headerTitle}`}>
          <InlineNodes nodes={page.h1} />
        </h1>
        <HeaderIntro blocks={page.intro} />
      </div>
    </section>
  );
}

function HeaderIntro({ blocks }: { blocks: Block[] }) {
  const text = blocks.filter((b) => b.t !== "cta");
  const ctas = blocks.filter((b): b is Cta => b.t === "cta");
  return (
    <>
      {text.length > 0 && (
        <div className={styles.lead}>
          <Blocks blocks={text} />
        </div>
      )}
      {ctas.length > 0 && <Blocks blocks={ctas} />}
    </>
  );
}

function SectionShell({
  section,
  index,
  children,
}: {
  section: Section;
  index: number;
  children: ReactNode;
}) {
  return (
    <section id={section.slug} className={index % 2 === 0 ? shared.section : shared.sectionSunken}>
      <div className="container">
        <h2 className={`${shared.sectionHeadline} ${styles.sectionHead}`}>
          <InlineNodes nodes={section.title} />
        </h2>
        {children}
      </div>
    </section>
  );
}

/** One H2 section of a copy page. */
export function CopySection({ section, index, pageUrl }: { section: Section; index: number; pageUrl: string }) {
  // Landing-page FAQ: render answers from the shared FAQ source.
  const faq = resolveFaqSection(section, pageUrl);
  if (faq) {
    return (
      <SectionShell section={section} index={index}>
        {section.blocks.length > 0 && (
          <div className={styles.prose}>
            <Blocks blocks={section.blocks} />
          </div>
        )}
        <FaqBlock ids={faq.ids} />
        {faq.after.length > 0 && (
          <div className={`${styles.prose} ${styles.after}`}>
            <Blocks blocks={faq.after} />
          </div>
        )}
      </SectionShell>
    );
  }

  // /book: the numbered questions become the booking form.
  const submitIdx = section.blocks.findIndex((b) => b.t === "cta" && b.submit);
  if (submitIdx > 0 && section.blocks[submitIdx - 1].t === "list") {
    const before = section.blocks.slice(0, submitIdx - 1);
    return (
      <SectionShell section={section} index={index}>
        <div className={styles.prose}>
          <Blocks blocks={before} />
        </div>
        <BookForm questions={section.blocks[submitIdx - 1] as List} submit={section.blocks[submitIdx] as Cta} />
      </SectionShell>
    );
  }

  const subsHaveTables = section.subs.some((s) => s.blocks.some((b) => b.t === "table"));
  return (
    <SectionShell section={section} index={index}>
      {section.blocks.length > 0 && (
        <div className={styles.prose}>
          <Blocks blocks={section.blocks} />
        </div>
      )}
      {section.subs.length > 0 &&
        (subsHaveTables ? (
          <div className={styles.stack}>
            {section.subs.map((sub) => (
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
        ) : (
          <div className={styles.cards}>
            {section.subs.map((sub) => (
              <article key={sub.slug} id={sub.slug} className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <InlineNodes nodes={sub.title} />
                </h3>
                <div className={styles.cardBody}>
                  <Blocks blocks={sub.blocks} />
                </div>
              </article>
            ))}
          </div>
        ))}
    </SectionShell>
  );
}

/** Renders a whole v5 copy page: header, sections, closing band. */
export function CopyPage({ path }: { path: string }) {
  const page = getPage(path);
  const last = page.sections[page.sections.length - 1];
  const hasBand = !!closingCta(last);
  const body = hasBand ? page.sections.slice(0, -1) : page.sections;
  return (
    <>
      <PageHeader path={path} />
      {body.map((sec, i) => (
        <CopySection key={sec.slug} section={sec} index={i} pageUrl={path} />
      ))}
      {hasBand && <ClosingBand section={last} />}
    </>
  );
}
