import { getLog } from "@/lib/log/get-log";
import { capabilities } from "@/lib/copy/machine";

// Built from the v5 copy at build time, so it mirrors the site.
export const dynamic = "force-static";

export function GET() {
  return Response.json(capabilities(getLog()), {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
