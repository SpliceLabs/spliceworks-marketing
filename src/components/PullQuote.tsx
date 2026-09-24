import styles from "./PullQuote.module.css";

interface PullQuoteProps {
  children: React.ReactNode;
}

export function PullQuote({ children }: PullQuoteProps) {
  return (
    <div className={styles.pullQuote}>
      <p className={styles.text}>{children}</p>
    </div>
  );
}
