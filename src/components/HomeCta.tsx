import type { ReactNode } from "react";
import Link from "next/link";
import shared from "../app/(marketing)/shared.module.css";
import styles from "./copy/Copy.module.css";

/** Closing "Book a working session" band, used at the end of every page. */
export function HomeCta({
  id,
  heading,
  body,
  ctaLabel,
  ctaHref,
  ctaSub,
}: {
  id?: string;
  heading: ReactNode;
  body?: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  ctaSub?: ReactNode;
}) {
  return (
    <section className={shared.ctaDark} id={id}>
      <div className="container">
        <div className={shared.ctaContent}>
          <h2 className={shared.ctaHeadline}>{heading}</h2>
          {body && <div className={`${shared.ctaBody} ${styles.ctaBandBody}`}>{body}</div>}
          <Link href={ctaHref} className="btn btn-primary">
            {ctaLabel} <span aria-hidden="true">→</span>
          </Link>
          {ctaSub && <p className={styles.ctaBandSub}>{ctaSub}</p>}
        </div>
      </div>
    </section>
  );
}
