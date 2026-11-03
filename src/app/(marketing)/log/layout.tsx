import type { ReactNode } from "react";

export default function LogLayout({ children }: { children: ReactNode }) {
  return <div className="lg-page">{children}</div>;
}
