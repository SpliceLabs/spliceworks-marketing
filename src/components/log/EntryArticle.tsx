import Link from "next/link";
import { AskBox } from "@/components/copy/AskBox";
import type { LogEntry } from "@/lib/log/entries";
import { formatLogDate } from "@/lib/log/format-date";
import { emphasize } from "@/lib/log/emphasis";
import { entryActions, writeUpActions } from "@/lib/log/actions";
import { entryPath } from "@/lib/log/json-ld";
import { absoluteUrl } from "@/lib/site";
import { STAGE_LABELS, TYPE_LABELS } from "@/lib/log/types";
import { EntryBody } from "./EntryBody";
import { splitSections } from "@/lib/log/sections";
import { EntryActions } from "./EntryActions";
import { EntryMedia } from "./EntryMedia";
import { LogBlocks } from "./LogBlocks";
import { LogCard } from "./LogCard";
import { NextStepCard } from "./NextStepCard";
import { ShareBar } from "./ShareBar";
import { SourcesList } from "./SourcesList";
import { SpecSheet } from "./SpecSheet";

const Date_ = ({ iso }: { iso: string }) => <time dateTime={iso}>{formatLogDate(iso)}</time>;

const facts = (entry: LogEntry): readonly (readonly [string, string])[] => [
  ["Stage", STAGE_LABELS[entry.stage]],
  ["Type", TYPE_LABELS[entry.type]],
  ["Logged", formatLogDate(entry.published)],
  ...(entry.tool_status ? [["Status", entry.tool_status] as const] : []),
  ...(entry.checked ? [["Checked", formatLogDate(entry.checked)] as const] : []),
  ...(entry.updated ? [["Updated", formatLogDate(entry.updated)] as const] : []),
];

const ToolContent = ({ entry }: { entry: LogEntry }) => {
  const { intro, sections } = splitSections(entry.body);
  return (
    <>
      {intro.length > 0 && (
        <div className="lg-body nosb">
          <div className="lg-art">
            <LogBlocks blocks={intro} />
          </div>
        </div>
      )}
      <SpecSheet entry={entry} sections={sections} />
    </>
  );
};

type ArticleProps = { entry: LogEntry; related: readonly LogEntry[]; writeUpHref?: string };

export const EntryArticle = ({ entry, related, writeUpHref }: ArticleProps) => {
  const path = entryPath(entry.slug);
  const actions = entry.parent ? writeUpActions(entry) : entryActions(entry, writeUpHref);
  const url = absoluteUrl(path);
  return (
    <article>
      <header className="wrap pagehead">
        <div className="lg-top">
          <span className="k">
            <Link href="/log">Splice Log</Link>
            <b>{entry.code}</b>
            {entry.parent ? (
              <span>Write-up</span>
            ) : (
              <Link href={`/log/type/${entry.type}`}>{TYPE_LABELS[entry.type]}</Link>
            )}
            <Date_ iso={entry.published} />
          </span>
          <span>{entry.readingMinutes} min read</span>
        </div>
        <div className="lf2-title">
          <h1>{entry.title}</h1>
          <p className="lf2-dek">
            {emphasize(entry.description, entry.lede_em).map((part) =>
              part.em ? (
                <span key={part.text} className="serif-i">
                  {part.text}
                </span>
              ) : (
                part.text
              ),
            )}
          </p>
        </div>
        <div className="lg-hero">
          <EntryMedia entry={entry} className="lg-hero-media" />
        </div>
        <div className="lg-facts">
          <dl className="lf2-facts">
            {facts(entry).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <ShareBar url={url} title={entry.title} small />
        </div>
        <EntryActions actions={actions} />
      </header>
      <div className="wrap">
        {entry.type === "tool" ? <ToolContent entry={entry} /> : <EntryBody body={entry.body} />}
        {entry.sources?.length ? (
          <div className="lg-body nosb">
            <div className="lg-art">
              <SourcesList sources={entry.sources} />
            </div>
          </div>
        ) : null}
        {entry.disclosure ? (
          <aside className="lg-disc" aria-label="Disclosure">
            <span className="lab">Disclosure</span>
            <p>{entry.disclosure}</p>
          </aside>
        ) : null}
        <div className="lg-body nosb">
          <div className="lg-art">
            <AskBox title={entry.title} path={path} />
            <div className="lg-endshare">
              <p>Found this useful? Pass it on.</p>
              <ShareBar url={url} title={entry.title} />
            </div>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="wrap lg-related" aria-labelledby="related-h">
          <h2 id="related-h">More from the log</h2>
          <div className="lg-grid">
            {related.map((item) => (
              <LogCard key={item.slug} entry={item} />
            ))}
          </div>
        </section>
      )}
      <NextStepCard stage={entry.stage} cta={entry.cta} />
    </article>
  );
};
