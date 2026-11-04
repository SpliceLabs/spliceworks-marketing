import { LegalPage } from "@/components/copy/LegalPage";
import { pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/cookies");

export default function Page() {
  return <LegalPage path="/cookies" />;
}
