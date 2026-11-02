import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SpliceOps",
    short_name: "SpliceOps",
    description: "A forward-deployed AI enablement team.",
    start_url: "/",
    display: "browser",
    background_color: "#0E1114",
    theme_color: "#0E1114",
    icons: [{ src: "/logo/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
