import { LegalPage } from "@/components/copy/LegalPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/privacy");

export default function Page() {
  return <LegalPage path="/privacy" />;
}
