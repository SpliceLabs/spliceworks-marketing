import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/services/fractional");

export default function Page() {
  return <CopyPage path="/services/fractional" />;
}
