import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/team");

export default function Page() {
  return <CopyPage path="/team" />;
}
