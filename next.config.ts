import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The /book server action re-reads the form's questions from the copy.
  outputFileTracingIncludes: {
    "/book": ["./content/v5/pages/book.md"],
  },
};

export default nextConfig;
