"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

export const TicketStrip = ({ head, children }: { head: ReactNode; children: ReactNode }) => {
  const strip = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<"start" | "middle" | "end">("start");

  const measure = useCallback(() => {
    const el = strip.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setEdge(el.scrollLeft <= 2 ? "start" : el.scrollLeft >= max ? "end" : "middle");
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [measure]);

  const by = (sign: 1 | -1) => {
    const el = strip.current;
    const card = el?.querySelector<HTMLElement>(".ticket");
    el?.scrollBy({ left: sign * ((card?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };

  return (
    <>
      <div className="wrap cards-head">
        {head}
        <div style={{ display: "flex", gap: "var(--space-14)", alignItems: "center" }}>
          <Link className="link" href="#log">
            [+] Read the log
          </Link>
          <div className="arrows">
            <button
              className="arrow"
              type="button"
              aria-label="Scroll left"
              disabled={edge === "start"}
              onClick={() => by(-1)}
            >
              <Arrow dir="left" />
            </button>
            <button
              className="arrow"
              type="button"
              aria-label="Scroll right"
              disabled={edge === "end"}
              onClick={() => by(1)}
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>
      <div className="strip" data-strip ref={strip} onScroll={measure}>
        {children}
      </div>
    </>
  );
};
