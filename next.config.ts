import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every Splice Log entry has a plain-markdown copy at /log/<slug>.md.
  rewrites: async () => [{ source: "/log/:slug.md", destination: "/log/:slug/md" }],
  // The internal /log/<slug>/md path is not a public address; send it to the .md one.
  redirects: async () => [{ source: "/log/:slug/md", destination: "/log/:slug.md", permanent: true }],
  headers: async () => [{ source: "/:path*", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }] }],
  // The /book server action re-reads the form's questions from the copy.
  outputFileTracingIncludes: {
    "/book": ["./content/v5/pages/book.md"],
  },
};

export default nextConfig;
