import { SiteShell } from "@/components/ds/SiteShell";
import { ParallaxProvider } from "@/providers/ParallaxProvider";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ParallaxProvider>
      <SiteShell>{children}</SiteShell>
    </ParallaxProvider>
  );
}
