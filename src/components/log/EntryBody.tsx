import { splitSections } from "@/lib/log/sections";
import { KeyTakeaways, LogBlocks } from "./LogBlocks";

const MIN_SECTIONS_FOR_TOC = 3;

const number = (index: number): string => String(index + 1).padStart(2, "0");

export const EntryBody = ({ body }: { body: string }) => {
  const { intro, sections } = splitSections(body);
  const showToc = sections.length >= MIN_SECTIONS_FOR_TOC;
  return (
    <div className={showToc ? "lg-body" : "lg-body nosb"}>
      {showToc && (
        <nav className="lg-toc" aria-label="On this page">
          <span className="lab">On this page</span>
          <ol>
            {sections.map((section, index) => (
              <li key={section.slug}>
                <a href={`#${section.slug}`}>
                  <b>{number(index)}</b>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="lg-art">
        <LogBlocks blocks={intro} />
        {sections.map((section, index) => (
          <section key={section.slug} id={section.slug}>
            <span className="esec-n kicker">{number(index)}</span>
            <h2>{section.heading}</h2>
            {section.heading === "In short" ? (
              <KeyTakeaways blocks={section.blocks} />
            ) : (
              <LogBlocks blocks={section.blocks} />
            )}
          </section>
        ))}
      </div>
    </div>
  );
};
