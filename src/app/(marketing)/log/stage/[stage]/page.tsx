import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LogArchive } from "@/components/log/LogArchive";
import { TypeFilter } from "@/components/log/TypeFilter";
import { getLog } from "@/lib/log/get-log";
import { logMetadata } from "@/lib/log/metadata";
import { STAGES, type Stage } from "@/lib/log/schema";
import { STAGE_LABELS } from "@/lib/log/types";
import { forStage } from "@/lib/log/views";

type Props = { params: Promise<{ stage: string }> };

const PICKER_STAGES = STAGES.filter((stage) => stage !== "all");

const isStage = (value: string): value is Stage => (PICKER_STAGES as readonly string[]).includes(value);

export const dynamicParams = false;

export const generateStaticParams = () => PICKER_STAGES.map((stage) => ({ stage }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { stage } = await params;
  return isStage(stage)
    ? logMetadata({
        title: `${STAGE_LABELS[stage]} entries | Splice Log`,
        description: `Splice Log entries for companies that are ${STAGE_LABELS[stage]}, plus the ones for any stage.`,
        path: `/log/stage/${stage}`,
      })
    : {};
};

export default async function Page({ params }: Props) {
  const { stage } = await params;
  if (!isStage(stage)) notFound();
  const entries = forStage(getLog(), stage);
  return (
    <LogArchive
      title={STAGE_LABELS[stage]}
      lead={`What to read when your company is ${STAGE_LABELS[stage]}, plus the entries that fit any stage.`}
      entries={entries}
      filter={<TypeFilter entries={entries} active="all" />}
    />
  );
}
