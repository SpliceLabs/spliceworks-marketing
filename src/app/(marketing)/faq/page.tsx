import { ClosingBand, PageHeader, closingCta } from "@/components/copy/CopyPage";
import { FaqBlock } from "@/components/copy/FaqBlock";
import { faqAnswerText, getFaq } from "@/lib/copy/faq";
import { getPage, pageMetadata } from "@/lib/copy/pages";
import shared from "../shared.module.css";
import styles from "@/components/copy/Copy.module.css";

export const metadata = pageMetadata("/faq");

/** /faq: the master copy of every answer, plus FAQPage structured data. */
export default function FaqPage() {
  const page = getPage("/faq");
  const { categories } = getFaq();
  const last = page.sections[page.sections.length - 1];
  const band = closingCta(last) ? last : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat) =>
      cat.entries.map((e) => ({
        "@type": "Question",
        name: e.question,
        acceptedAnswer: { "@type": "Answer", text: faqAnswerText(e) },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader path="/faq" />
      <section className={shared.section}>
        <div className="container">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className={styles.faqCategory}>
              <h2 className={styles.faqCategoryTitle}>{cat.title}</h2>
              <FaqBlock ids={cat.entries.map((e) => e.id)} anchors />
            </div>
          ))}
        </div>
      </section>
      {band && <ClosingBand section={band} />}
    </>
  );
}
