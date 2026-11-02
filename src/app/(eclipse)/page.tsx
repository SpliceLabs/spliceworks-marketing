import { EclipseHome } from "@/components/eclipse/EclipseHome";
import { InlineNodes } from "@/components/copy/Inline";
import { getPage, pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/");

export default function HomePage() {
  const { h1 } = getPage("/");
  return <EclipseHome headline={<InlineNodes nodes={h1} />} />;
}
