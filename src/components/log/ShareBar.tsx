"use client";

import { useState, useSyncExternalStore } from "react";
import { shareLinks } from "@/lib/log/share";

type Props = { readonly url: string; readonly title: string; readonly small?: boolean };

const Icon = ({ path }: { path: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const PATHS = {
  linkedin: "M5 9v10M5 5.5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 9v10",
  x: "M5 5l14 14M19 5L5 19",
  bluesky: "M12 11C10 7 6 5 5 6c-1 2 0 6 2 7 1 .5 3 .5 5-2zm0 0c2-4 6-6 7-5 1 2 0 6-2 7-1 .5-3 .5-5-2z",
  share: "M12 4v11M8 8l4-4 4 4M5 14v5h14v-5",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  check: "M5 12.5l4.5 4.5L19 7",
} as const;

const noSubscription = () => () => undefined;
const browserCanShare = () => typeof navigator.share === "function";
const serverCanShare = () => false;

export const ShareBar = ({ url, title, small = false }: Props) => {
  const canShare = useSyncExternalStore(noSubscription, browserCanShare, serverCanShare);
  const [copied, setCopied] = useState(false);
  const links = shareLinks({ url, title });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const className = ["lg-share", small ? "sm" : "", canShare ? "force-native" : ""].filter(Boolean).join(" ");

  const external = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <div className={className} role="group" aria-label="Share this entry">
      <span className="lbl">Share</span>
      <a className="sb tip" href={links.linkedin} data-tip="LinkedIn" aria-label="Share on LinkedIn" {...external}>
        <Icon path={PATHS.linkedin} />
      </a>
      <a className="sb tip" href={links.x} data-tip="X" aria-label="Share on X" {...external}>
        <Icon path={PATHS.x} />
      </a>
      <a className="sb tip" href={links.bluesky} data-tip="Bluesky" aria-label="Share on Bluesky" {...external}>
        <Icon path={PATHS.bluesky} />
      </a>
      <button
        type="button"
        className="sb tip native"
        data-tip="Share"
        aria-label="Share"
        onClick={() => navigator.share({ url, title }).catch(() => undefined)}
      >
        <Icon path={PATHS.share} />
      </button>
      <button
        type="button"
        className={`sb tip${copied ? " ok show" : ""}`}
        data-tip={copied ? "Copied" : "Copy link"}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={copy}
      >
        <Icon path={copied ? PATHS.check : PATHS.link} />
      </button>
    </div>
  );
};
