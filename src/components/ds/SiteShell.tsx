import type { ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/contact";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const SiteShell = ({ children }: { children: ReactNode }) => (
  <>
    <div className="bg" aria-hidden="true">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="grain" />
    </div>
    <div className="page">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter email={CONTACT_EMAIL} />
    </div>
  </>
);
