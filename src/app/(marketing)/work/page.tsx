import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/work");

export default function Page() {
  return <CopyPage path="/work" />;
}
