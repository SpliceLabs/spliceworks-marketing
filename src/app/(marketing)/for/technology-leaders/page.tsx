import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/for/technology-leaders");

export default function Page() {
  return <CopyPage path="/for/technology-leaders" />;
}
