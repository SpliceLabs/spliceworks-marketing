import { EclipseHome } from "@/components/eclipse/EclipseHome";
import { inlineText } from "@/lib/copy/markdown";
import { getPage, pageMetadata } from "@/lib/copy/pages";

export const metadata = pageMetadata("/");

export default function HomePage() {
  return <EclipseHome headline={inlineText(getPage("/").h1)} />;
}
