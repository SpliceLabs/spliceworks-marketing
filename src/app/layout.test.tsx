import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => {
  const font = () => ({ variable: "font-var" });
  return { Outfit: font, Instrument_Serif: font, Fragment_Mono: font };
});

import RootLayout from "./layout";

describe("RootLayout", () => {
  it("loads the Gojiberry visitor script once, inside the head", () => {
    const out = renderToStaticMarkup(<RootLayout>{null}</RootLayout>);
    const head = out.slice(out.indexOf("<head>"), out.indexOf("</head>"));
    expect(head.match(/visitor\.wv\.gojiberry\.ai\/wv\.js/g)).toHaveLength(1);
  });
});
