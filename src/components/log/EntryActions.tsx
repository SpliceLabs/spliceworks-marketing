import Link from "next/link";
import type { LogEntry } from "@/lib/log/entries";
import { entryActions } from "@/lib/log/actions";

const ArrowDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EntryActions = ({ entry }: { entry: LogEntry }) => {
  const actions = entryActions(entry);
  if (actions.length === 0) return null;
  return (
    <div className="lf2-ctas">
      {actions.map((action) => (
        <Link key={action.href} className={action.style === "ghost" ? "btn ghost" : "btn"} href={action.href}>
          {action.label}
          {action.down && <ArrowDown />}
        </Link>
      ))}
    </div>
  );
};
