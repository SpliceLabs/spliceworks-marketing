import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/privacy");

export default function Page() {
  return <CopyPage path="/privacy" />;
}
