import { HomeHero } from "@/components/HomeHero";
import { WhoThisIsFor } from "@/components/WhoThisIsFor";
import { TwoStepPath } from "@/components/TwoStepPath";
import { Blocks } from "@/components/copy/Blocks";
import { ClosingBand, CopySection } from "@/components/copy/CopyPage";
import { InlineLines, InlineNodes } from "@/components/copy/Inline";
import { FadeInOnScroll } from "@/providers/ParallaxProvider";
import type { Block } from "@/lib/copy/markdown";
import { getPage, pageMetadata } from "@/lib/copy/pages";
import styles from "@/components/copy/Copy.module.css";

export const metadata = pageMetadata("/");

type Of<T extends Block["t"]> = Extract<Block, { t: T }>;

function only<T extends Block["t"]>(blocks: Block[], t: T): Of<T>[] {
  return blocks.filter((b): b is Of<T> => b.t === t);
}

/**
 * Home: hero, problem, two steps, working session, why Splice, proof, close
 * (content/v5/pages/index.md). The first three sections use the home
 * components; the rest render like any other copy section.
 */
export default function HomePage() {
  const page = getPage("/");
  if (page.sections.length !== 6) {
    throw new Error(`Home copy changed shape: expected 6 sections, found ${page.sections.length}`);
  }
  const [problem, steps, session, why, proof, close] = page.sections;

  // Hero: lead paragraph, CTA, and the line under the CTA.
  const heroCta = only(page.intro, "cta")[0];
  const heroParas = only(page.intro, "para");
  const ctaIndex = page.intro.indexOf(heroCta);
  const lead = heroParas.filter((p) => page.intro.indexOf(p) < ctaIndex);
  const underCta = heroParas.filter((p) => page.intro.indexOf(p) > ctaIndex);

  // Problem: the bullets, then the closing line.
  const problemList = only(problem.blocks, "list")[0];
  const problemFooter = only(problem.blocks, "para")[0];

  // Two steps: intro paragraphs, the step table, then the links line.
  const stepTable = only(steps.blocks, "table")[0];
  const tableIdx = steps.blocks.indexOf(stepTable);
  const stepIntro = steps.blocks.slice(0, tableIdx);
  const stepFooter = steps.blocks.slice(tableIdx + 1);
  const stepColumns = stepTable.head.slice(1).map((label, col) => ({
    label: <InlineNodes nodes={label} />,
    rows: stepTable.rows.map((row) => ({
      label: <InlineNodes nodes={row[0]} />,
      value: <InlineNodes nodes={row[col + 1]} />,
    })),
  }));

  // Routes line after the closing rule ("Footer routes: …"); the italic label
  // is an editor's note, so it's used as the nav label instead of shown.
  const routes = page.trailer[0]?.t === "para" ? page.trailer[0].lines[0] : null;
  const routesLabel = routes?.[0]?.t === "em" ? routes[0] : null;
  const routesBody = routes ? [...(routesLabel ? routes.slice(1) : routes)] : null;
  if (routesBody?.[0]?.t === "text") routesBody[0] = { t: "text", v: routesBody[0].v.replace(/^\s+/, "") };

  return (
    <>
      <HomeHero
        title={<InlineNodes nodes={page.h1} />}
        lead={<Blocks blocks={lead} />}
        ctaLabel={heroCta.label}
        ctaHref={heroCta.href}
        ctaSub={underCta.length ? <InlineLines lines={underCta.flatMap((p) => p.lines)} /> : undefined}
      />
      <FadeInOnScroll delay={100}>
        <WhoThisIsFor
          heading={<InlineNodes nodes={problem.title} />}
          items={problemList.items.map((it, i) => <InlineNodes key={i} nodes={it.c} />)}
          footer={problemFooter ? <InlineLines lines={problemFooter.lines} /> : undefined}
        />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <TwoStepPath
          heading={<InlineNodes nodes={steps.title} />}
          intro={<Blocks blocks={stepIntro} />}
          steps={stepColumns}
          footer={
            stepFooter.length ? (
              <InlineLines lines={only(stepFooter, "para").flatMap((p) => p.lines)} />
            ) : undefined
          }
        />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <CopySection section={session} index={1} pageUrl="/" />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <CopySection section={why} index={0} pageUrl="/" />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <CopySection section={proof} index={1} pageUrl="/" />
      </FadeInOnScroll>
      <ClosingBand section={close} />
      {routesBody && (
        <nav aria-label={routesLabel ? "Footer routes" : "Site routes"} className={styles.routes}>
          <div className="container">
            <p>
              <InlineNodes nodes={routesBody} />
            </p>
          </div>
        </nav>
      )}
    </>
  );
}
