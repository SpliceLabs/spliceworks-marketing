import type { ReactNode } from "react";
import styles from "./WhoThisIsFor.module.css";

/** Grid of situation statements (the "signals we hear"). */
export function QuoteGrid({ items }: { items: ReactNode[] }) {
  return (
    <div className={styles.quotes}>
      {items.map((item, i) => (
        <p key={i} className={styles.quote}>
          {item}
        </p>
      ))}
    </div>
  );
}

/** Home "problem" section: heading on the left, situations on the right. */
export function WhoThisIsFor({
  num = "01",
  heading,
  items,
  footer,
}: {
  num?: string;
  heading: ReactNode;
  items: ReactNode[];
  footer?: ReactNode;
}) {
  return (
    <section className={styles.section} id="who">
      <div className={styles.left}>
        <span className={styles.num} aria-hidden="true">
          {num}
        </span>
        <h2 className={styles.heading}>{heading}</h2>
      </div>
      <div>
        <QuoteGrid items={items} />
        {footer && <p className={styles.footer}>{footer}</p>}
      </div>
    </section>
  );
}
