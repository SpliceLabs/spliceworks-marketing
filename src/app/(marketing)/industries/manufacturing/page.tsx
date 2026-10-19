import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/industries/manufacturing");

export default function Page() {
  return <CopyPage path="/industries/manufacturing" />;
}
