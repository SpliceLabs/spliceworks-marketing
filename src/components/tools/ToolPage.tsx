import type { ReactNode } from "react";
import { CopyPage } from "@/components/copy/CopyPage";
import { JsonLd } from "@/components/JsonLd";
import { getPage } from "@/lib/copy/pages";
import { ORGANIZATION_ID, absoluteUrl } from "@/lib/site";
import shared from "@/app/(marketing)/shared.module.css";

/** A free tool's page: its copy, the tool straight after the header, and WebApplication data. */
export function ToolPage({ path, name, children }: Readonly<{ path: string; name: string; children: ReactNode }>) {
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: absoluteUrl(path),
    description: getPage(path).fm.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (runs in the browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORGANIZATION_ID },
  };

  return (
    <>
      <JsonLd data={app} />
      <CopyPage path={path}>
        <section id="calculator" className={shared.section} aria-label={name}>
          <div className="container">{children}</div>
        </section>
      </CopyPage>
    </>
  );
}
