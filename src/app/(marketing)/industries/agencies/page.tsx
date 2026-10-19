import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/industries/agencies");

export default function Page() {
  return <CopyPage path="/industries/agencies" />;
}
