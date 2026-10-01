import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ModeProvider } from "@/providers/ModeProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Splice Works",
    template: "%s | Splice Works",
  },
  description:
    "A forward-deployed team for knowledge-heavy companies with an AI mandate and no path to production. We put AI to work and keep a named human accountable at every gate.",
  metadataBase: new URL("https://spliceworks.ai"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo/light/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/light/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/logo/light/favicon-48.png",
  },
  openGraph: {
    title: "Splice Works",
    description:
      "A forward-deployed team for knowledge-heavy companies with an AI mandate and no path to production. We put AI to work and keep a named human accountable at every gate.",
    url: "https://spliceworks.ai",
    siteName: "Splice Works",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Splice Works",
    description:
      "A forward-deployed team for knowledge-heavy companies with an AI mandate and no path to production. We put AI to work and keep a named human accountable at every gate.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('sw-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'ink' : 'paper';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  var mode = localStorage.getItem('sw-mode') || 'human';
                  document.documentElement.setAttribute('data-mode', mode);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ModeProvider>{children}</ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
