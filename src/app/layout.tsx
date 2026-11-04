import type { Metadata } from "next";
import { Fragment_Mono, Instrument_Serif, Outfit } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ModeProvider } from "@/providers/ModeProvider";
import { JsonLd } from "@/components/JsonLd";
import { GojiberryVisitors } from "@/components/analytics/GojiberryVisitors";
import { CONTACT_EMAIL } from "@/lib/contact";
import { OG_IMAGE, ORGANIZATION_ID, SAME_AS, SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});
const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "SpliceOps",
    template: "%s | SpliceOps",
  },
  description:
    "A forward-deployed team for knowledge-heavy companies with an AI mandate and no path to production. We put AI to work and keep a named human accountable at every gate.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    title: "SpliceOps",
    description:
      "A forward-deployed team for knowledge-heavy companies with an AI mandate and no path to production. We put AI to work and keep a named human accountable at every gate.",
    url: SITE_URL,
    siteName: "SpliceOps",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpliceOps",
    description:
      "A forward-deployed team for knowledge-heavy companies with an AI mandate and no path to production. We put AI to work and keep a named human accountable at every gate.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Who we are, for search and AI engines. "SpliceOps" plus the parent group and
// category keeps us distinct from other companies named Splice.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "SpliceOps",
  url: SITE_URL,
  logo: absoluteUrl("/icons/apple-touch-icon.png"),
  email: CONTACT_EMAIL,
  sameAs: SAME_AS,
  description:
    "SpliceOps is a forward-deployed AI enablement team. It puts AI to work in existing companies and keeps a named person accountable at every gate.",
  parentOrganization: { "@type": "Organization", name: "Splice Labs Group" },
  founder: { "@type": "Person", name: "Tim Varner", jobTitle: "Founder" },
  employee: [{ "@type": "Person", name: "Jake Krogman", jobTitle: "CTO and AI Systems Architect" }],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "SpliceOps",
  url: SITE_URL,
  publisher: { "@id": ORGANIZATION_ID },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${instrumentSerif.variable} ${fragmentMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('so-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'ink' : 'paper';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  var mode = localStorage.getItem('so-mode') || 'human';
                  document.documentElement.setAttribute('data-mode', mode);
                } catch (e) {}
              })();
            `,
          }}
        />
        <GojiberryVisitors />
      </head>
      <body>
        <JsonLd data={organization} />
        <JsonLd data={website} />
        <ThemeProvider>
          <ModeProvider>{children}</ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
