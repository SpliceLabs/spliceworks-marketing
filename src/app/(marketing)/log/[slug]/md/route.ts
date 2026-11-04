import { getLogPages, getPage } from "@/lib/log/get-log";
import { entryMarkdown } from "@/lib/log/markdown-copy";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => getLogPages().map(({ slug }) => ({ slug }));

export async function GET(_request: Request, { params }: Props) {
  const entry = getPage((await params).slug);
  if (!entry) return new Response("Not found", { status: 404 });
  return new Response(entryMarkdown(entry), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
