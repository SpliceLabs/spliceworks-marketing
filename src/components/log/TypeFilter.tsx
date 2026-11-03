import Link from "next/link";
import type { LogEntry } from "@/lib/log/entries";
import { ENTRY_TYPES, type EntryType } from "@/lib/log/schema";
import { TYPE_PLURALS } from "@/lib/log/types";
import { typeCounts } from "@/lib/log/views";

type Props = { readonly entries: readonly LogEntry[]; readonly active: EntryType | "all" };

const Chip = ({ href, label, count, current }: { href: string; label: string; count: number; current: boolean }) => (
  <Link href={href} className="chip mono" aria-current={current ? "page" : undefined}>
    {label}
    <span className="ct">{count}</span>
  </Link>
);

export const TypeFilter = ({ entries, active }: Props) => {
  const counts = typeCounts(entries);
  return (
    <nav className="lg-filter" aria-label="Filter by type">
      <div className="chips">
        <Chip href="/log" label="All" count={counts.all} current={active === "all"} />
        {ENTRY_TYPES.filter((type) => counts[type] > 0).map((type) => (
          <Chip
            key={type}
            href={`/log/type/${type}`}
            label={TYPE_PLURALS[type]}
            count={counts[type]}
            current={active === type}
          />
        ))}
      </div>
    </nav>
  );
};
