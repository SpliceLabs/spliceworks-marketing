import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/for/investors");

export default function Page() {
  return <CopyPage path="/for/investors" />;
}
