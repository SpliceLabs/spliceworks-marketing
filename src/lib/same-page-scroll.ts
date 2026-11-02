export type SamePageScroll = { kind: "top" } | { kind: "anchor"; id: string };

const trimSlash = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

export const samePageScrollTarget = ({
  href,
  currentUrl,
}: {
  href: string;
  currentUrl: string;
}): SamePageScroll | null => {
  const current = new URL(currentUrl);
  const next = new URL(href, current);
  const sameOrigin = next.origin === current.origin && /^https?:$/.test(next.protocol);
  const samePath = trimSlash(next.pathname) === trimSlash(current.pathname);
  if (!sameOrigin || !samePath) return null;
  const id = decodeURIComponent(next.hash.slice(1));
  return id ? { kind: "anchor", id } : { kind: "top" };
};
