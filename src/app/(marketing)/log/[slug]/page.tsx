import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { EntryArticle } from "@/components/log/EntryArticle";
import { getEntry, getLog, getWriteUp } from "@/lib/log/get-log";
import { articleJsonLd, entryPath } from "@/lib/log/json-ld";
import { entryMetadata } from "@/lib/log/metadata";
import { relatedEntries } from "@/lib/log/views";

type Props = { params: Promise<{ slug: string }> };

const RELATED_COUNT = 2;

export const dynamicParams = false;

export const generateStaticParams = () => getLog().map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const entry = getEntry((await params).slug);
  return entry ? entryMetadata(entry) : {};
};

export default async function Page({ params }: Props) {
  const entry = getEntry((await params).slug);
  if (!entry) notFound();
  return (
    <>
      <JsonLd data={articleJsonLd(entry)} />
      <EntryArticle
        entry={entry}
        related={relatedEntries(entry, getLog(), RELATED_COUNT)}
        writeUpHref={getWriteUp(entry.slug) ? `${entryPath(entry.slug)}/write-up` : undefined}
      />
    </>
  );
}
