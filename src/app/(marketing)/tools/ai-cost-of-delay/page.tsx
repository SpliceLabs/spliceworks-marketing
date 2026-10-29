import { CopyPage } from "@/components/copy/CopyPage";
import { JsonLd } from "@/components/JsonLd";
import { CostOfDelayCalculator } from "@/components/tools/CostOfDelayCalculator";
import { SITE_URL, getPage, pageMetadata } from "@/lib/copy/pages";
import shared from "../../shared.module.css";

const PATH = "/tools/ai-cost-of-delay";

export const metadata = pageMetadata(PATH);

export default function Page() {
  const { fm } = getPage(PATH);
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI cost of delay calculator",
    url: `${SITE_URL}${PATH}`,
    description: fm.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (runs in the browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <JsonLd data={app} />
      <CopyPage path={PATH}>
        <section id="calculator" className={shared.section} aria-label="Calculator">
          <div className="container">
            <CostOfDelayCalculator />
          </div>
        </section>
      </CopyPage>
    </>
  );
}
