import { getLog } from "@/lib/log/get-log";
import { rssXml } from "@/lib/log/feed";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const GET = (): Response =>
  new Response(rssXml({ entries: getLog(), siteUrl: SITE_URL }), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
