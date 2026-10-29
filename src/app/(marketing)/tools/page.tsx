import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/tools");

export default function Page() {
  return <CopyPage path="/tools" />;
}
