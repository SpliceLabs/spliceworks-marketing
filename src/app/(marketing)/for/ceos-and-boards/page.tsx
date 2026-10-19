import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/for/ceos-and-boards");

export default function Page() {
  return <CopyPage path="/for/ceos-and-boards" />;
}
