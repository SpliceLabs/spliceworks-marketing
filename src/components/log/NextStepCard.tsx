import { ClosingCard } from "@/components/ds/ClosingCard";
import type { LogEntry } from "@/lib/log/entries";
import { nextStep } from "@/lib/log/next-step";
import type { Stage } from "@/lib/log/schema";

const Heading = ({ heading, accent }: { heading: string; accent: string }) => {
  const at = heading.lastIndexOf(accent);
  if (at === -1) return <>{heading}</>;
  return (
    <>
      {heading.slice(0, at)}
      <span className="serif-i">{accent}</span>
      {heading.slice(at + accent.length)}
    </>
  );
};

export const NextStepCard = ({ stage, cta }: { stage: Stage; cta?: LogEntry["cta"] }) => {
  const step = nextStep(stage);
  return (
    <ClosingCard
      heading={<Heading heading={step.heading} accent={step.accent} />}
      body={<p>{step.body}</p>}
      ctaLabel={cta?.label ?? step.cta.label}
      ctaHref={cta?.href ?? step.cta.href}
    />
  );
};
