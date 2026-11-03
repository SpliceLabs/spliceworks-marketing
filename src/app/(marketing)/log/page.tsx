import { LogHome } from "@/components/log/LogHome";
import { getLog } from "@/lib/log/get-log";
import { logMetadata } from "@/lib/log/metadata";

export const metadata = logMetadata({
  title: "Splice Log | SpliceOps",
  description:
    "What we tested, what we built and what we think about putting AI to work. Dated, coded and sourced, so you can check it.",
  path: "/log",
});

export default function Page() {
  return <LogHome entries={getLog()} />;
}
