import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import StructuredData from "@/components/layout/StructuredData";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eastfremontdistrict.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "F.E.E.D. — Fremont East Entertainment District",
    template: "%s | F.E.E.D.",
  },
  description:
    "The Fremont East Entertainment District is a vibrant 6-block, pedestrian-friendly downtown Las Vegas hub located between Las Vegas Blvd and 8th Street. 16 premium venues, one unified operating platform.",
  keywords: [
    "F.E.E.D.",
    "Fremont East Entertainment District",
    "Las Vegas event venue",
    "corporate activations",
    "convention programming",
    "Downtown Las Vegas",
    "multi-venue events",
    "brand activations",
    "Corner Bar Management",
  ],
  authors: [{ name: "Corner Bar Management", url: "https://www.cornerbarmgmt.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "F.E.E.D.",
    title: "F.E.E.D. — Entertainment District Infrastructure",
    description:
      "16 premium venues on one city block in Downtown Las Vegas. A unified operating platform for large-scale corporate activations and convention programming.",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "F.E.E.D. — Fremont East Entertainment District, Downtown Las Vegas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "F.E.E.D. — Entertainment District Infrastructure",
    description:
      "16 premium venues on one city block in Downtown Las Vegas. A unified operating platform for brands and event producers.",
    images: ["/images/og/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F1115] text-[#F0EDE8]`}
      >
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <ConditionalFooter />
        </div>
      </body>
    </html>
  );
}
