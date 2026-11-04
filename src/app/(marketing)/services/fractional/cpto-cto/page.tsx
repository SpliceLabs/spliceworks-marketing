import { CopyPage } from "@/components/copy/CopyPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/services/fractional/cpto-cto");

export default function Page() {
  return <CopyPage path="/services/fractional/cpto-cto" />;
}
