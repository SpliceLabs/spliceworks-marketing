import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SpliceOps",
    short_name: "SpliceOps",
    description: "A forward-deployed AI enablement team.",
    start_url: "/",
    display: "browser",
    background_color: "#16161A",
    theme_color: "#16161A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
