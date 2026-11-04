import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every Splice Log entry has a plain-markdown copy at /log/<slug>.md.
  rewrites: async () => [{ source: "/log/:slug.md", destination: "/log/:slug/md" }],
  // The /book server action re-reads the form's questions from the copy.
  outputFileTracingIncludes: {
    "/book": ["./content/v5/pages/book.md"],
  },
};

export default nextConfig;
