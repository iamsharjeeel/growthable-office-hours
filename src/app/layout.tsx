import type { Metadata } from "next";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import { SITE_URL } from "@/lib/session-config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Growthable Office Hours | Live Product Walkthroughs";
const description =
  "Join Growthable office hours every Tuesday for live product walkthroughs, Voice AI demos, and open Q&A with Ryan O'Connor.";

export const metadata: Metadata = {
  // Resolves relative OG/canonical URLs. Set NEXT_PUBLIC_SITE_URL in production;
  // on Vercel it falls back to the project's production domain automatically.
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Growthable",
    url: "/",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
