import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { EntryArticle } from "@/components/log/EntryArticle";
import { getLog, getLogPages, getPage, getWriteUp } from "@/lib/log/get-log";
import { articleJsonLd, entryPath } from "@/lib/log/json-ld";
import { entryMetadata } from "@/lib/log/metadata";
import { relatedEntries } from "@/lib/log/views";

type Props = { params: Promise<{ slug: string }> };

const RELATED_COUNT = 2;

export const dynamicParams = false;

export const generateStaticParams = () => getLogPages().map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const entry = getPage((await params).slug);
  return entry ? entryMetadata(entry) : {};
};

export default async function Page({ params }: Props) {
  const entry = getPage((await params).slug);
  if (!entry) notFound();
  const writeUp = getWriteUp(entry.slug);
  return (
    <>
      <JsonLd data={articleJsonLd(entry)} />
      <EntryArticle
        entry={entry}
        related={entry.parent ? [] : relatedEntries(entry, getLog(), RELATED_COUNT)}
        writeUpHref={writeUp ? entryPath(writeUp.slug) : undefined}
      />
    </>
  );
}
