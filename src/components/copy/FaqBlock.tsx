import { getFaqEntry } from "@/lib/copy/faq";
import { Blocks } from "./Blocks";
import styles from "./Copy.module.css";

/**
 * FAQ questions and answers, looked up by id in the shared FAQ source
 * (content/v5/pages/faq.md). `anchors` gives each item an id so /faq#<id>
 * links work; only /faq uses it, to keep ids unique per page.
 */
export function FaqBlock({ ids, anchors = false }: { ids: string[]; anchors?: boolean }) {
  return (
    <div className={styles.faq}>
      {ids.map((id) => {
        const entry = getFaqEntry(id);
        return (
          <details key={id} className={styles.faqItem} id={anchors ? id : undefined} data-faq-id={id}>
            <summary>
              <h3 className={styles.faqQuestion}>
                {entry.question}
              </h3>
            </summary>
            <div className={styles.faqAnswer}>
              <Blocks blocks={entry.blocks} />
            </div>
          </details>
        );
      })}
    </div>
  );
}
