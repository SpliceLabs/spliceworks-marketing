export type ShareLinks = { readonly linkedin: string; readonly x: string; readonly bluesky: string };

export const shareLinks = ({ url, title }: { readonly url: string; readonly title: string }): ShareLinks => ({
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  x: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  bluesky: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`,
});
