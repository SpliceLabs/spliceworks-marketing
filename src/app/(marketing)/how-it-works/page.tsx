import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/how-it-works");

export default function Page() {
  return <CopyPage path="/how-it-works" />;
}
