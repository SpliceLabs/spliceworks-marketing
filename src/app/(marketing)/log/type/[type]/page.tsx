import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LogArchive } from "@/components/log/LogArchive";
import { TypeFilter } from "@/components/log/TypeFilter";
import { getLog } from "@/lib/log/get-log";
import { logMetadata } from "@/lib/log/metadata";
import { ENTRY_TYPES, type EntryType } from "@/lib/log/schema";
import { TYPE_PLURALS } from "@/lib/log/types";

type Props = { params: Promise<{ type: string }> };

const isType = (value: string): value is EntryType => (ENTRY_TYPES as readonly string[]).includes(value);

export const dynamicParams = false;

export const generateStaticParams = () => ENTRY_TYPES.map((type) => ({ type }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { type } = await params;
  return isType(type)
    ? logMetadata({
        title: `${TYPE_PLURALS[type]} | Splice Log`,
        description: `${TYPE_PLURALS[type]} from the Splice Log, newest first.`,
        path: `/log/type/${type}`,
      })
    : {};
};

export default async function Page({ params }: Props) {
  const { type } = await params;
  if (!isType(type)) notFound();
  const all = getLog();
  return (
    <LogArchive
      title={TYPE_PLURALS[type]}
      lead={`${TYPE_PLURALS[type]} in the log, newest first.`}
      entries={all.filter((entry) => entry.type === type)}
      filter={<TypeFilter entries={all} active={type} />}
    />
  );
}
