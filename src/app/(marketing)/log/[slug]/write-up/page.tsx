import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { EntryArticle } from "@/components/log/EntryArticle";
import { getLog, getWriteUp } from "@/lib/log/get-log";
import { articleJsonLd } from "@/lib/log/json-ld";
import { entryMetadata } from "@/lib/log/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () =>
  getLog()
    .filter(({ slug }) => getWriteUp(slug))
    .map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const writeUp = getWriteUp((await params).slug);
  return writeUp ? entryMetadata(writeUp) : {};
};

export default async function Page({ params }: Props) {
  const writeUp = getWriteUp((await params).slug);
  if (!writeUp) notFound();
  return (
    <>
      <JsonLd data={articleJsonLd(writeUp)} />
      <EntryArticle entry={writeUp} related={[]} />
    </>
  );
}
