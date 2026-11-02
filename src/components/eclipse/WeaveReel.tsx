"use client";

import { useState } from "react";
import { WeaveDiagram } from "./diagrams/WeaveDiagram";

export const WeaveReel = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`reel${paused ? " paused" : ""}`} style={{ marginTop: 48, textAlign: "left" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 8,
        }}
      >
        <span className="kicker">Delivered on Station</span>
        <button type="button" className="btn ghost sm" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
          {paused ? "Play motion" : "Pause motion"}
        </button>
      </div>
      <WeaveDiagram />
    </div>
  );
};
