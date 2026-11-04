import { getLogPages } from "@/lib/log/get-log";
import { llmsFullTxt } from "@/lib/copy/machine";

// Built from the v5 copy at build time.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(getLogPages()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
