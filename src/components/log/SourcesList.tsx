import type { LogEntry } from "@/lib/log/entries";

const host = (url: string): string => new URL(url).hostname.replace(/^www\./, "");

export const SourcesList = ({ sources }: { sources: NonNullable<LogEntry["sources"]> }) => (
  <section id="sources" className="lg-sources">
    <span className="esec-n kicker">Sources</span>
    <h2>Where this comes from</h2>
    <ol className="lg-src">
      {sources.map((source, index) => (
        <li key={source.url}>
          <b>{String(index + 1).padStart(2, "0")}</b>
          <span>
            <a href={source.url} rel="noopener noreferrer" target="_blank">
              {source.title}
            </a>
            <small>{host(source.url)}</small>
          </span>
        </li>
      ))}
    </ol>
  </section>
);
