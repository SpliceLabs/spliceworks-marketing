"use client";

import { useEffect } from "react";
import { samePageScrollTarget } from "@/lib/same-page-scroll";

const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.defaultPrevented && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);

export const SamePageScroll = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (
        !link ||
        !isPlainClick(event) ||
        link.hasAttribute("download") ||
        (link.getAttribute("target") ?? "_self") !== "_self"
      )
        return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("#")) return;
      const scroll = samePageScrollTarget({ href, currentUrl: window.location.href });
      if (!scroll) return;
      event.preventDefault();
      if (scroll.kind === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash !== `#${scroll.id}`) window.history.pushState(null, "", `#${scroll.id}`);
      document.getElementById(scroll.id)?.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
};
