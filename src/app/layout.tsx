import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

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

export const metadata: Metadata = {
  title: "East Fremont District",
  description:
    "A fully privatized, multi-venue urban event district designed for large-scale corporate activations and convention programming in Downtown Las Vegas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F1115] text-[#F0EDE8]`}
      >
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
