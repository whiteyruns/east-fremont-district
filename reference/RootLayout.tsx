// src/app/layout.tsx
// Root layout — wraps all pages with header, footer, and global providers

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | East Fremont District",
    default: "East Fremont District — Urban Event Infrastructure",
  },
  description:
    "A fully privatized, multi-venue urban event platform in Downtown Las Vegas. Infrastructure for conventions, corporate events, and brand activations.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eastfremontdistrict.com",
    siteName: "East Fremont District",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0F1115] text-[#F0EDE8] font-sans antialiased">
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

// ─────────────────────────────────────────────
// src/components/layout/SiteHeader.tsx
// ─────────────────────────────────────────────

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "District", href: "/district" },
  { label: "Inventory", href: "/inventory" },
  { label: "Activations", href: "/activation-frameworks" },
  { label: "Branding", href: "/branding" },
  { label: "Production", href: "/production" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Inquire", href: "/inquire" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0C0F]/90 backdrop-blur-md border-b border-[#2A2D33]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-[#F0EDE8]">
              EAST FREMONT DISTRICT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${
                    pathname === item.href
                      ? "text-[#C49A6C]"
                      : "text-[#9B978F] hover:text-[#F0EDE8]"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#9B978F]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="lg:hidden bg-[#0A0C0F] border-t border-[#2A2D33] px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`
                block py-3 text-base font-medium border-b border-[#1A1D23]
                ${
                  pathname === item.href
                    ? "text-[#C49A6C]"
                    : "text-[#9B978F]"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────
// src/components/layout/SiteFooter.tsx
// ─────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="bg-[#0A0C0F] border-t border-[#2A2D33]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-4">
              EAST FREMONT DISTRICT
            </h3>
            <p className="text-sm text-[#9B978F] leading-relaxed">
              A fully privatized, multi-venue urban event platform in Downtown
              Las Vegas.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#6B6760] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#9B978F] hover:text-[#F0EDE8] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#6B6760] mb-4">
              Contact
            </h4>
            <p className="text-sm text-[#9B978F]">
              East Fremont Street
              <br />
              Downtown Las Vegas, NV
            </p>
            <Link
              href="/inquire"
              className="inline-block mt-4 px-5 py-2.5 text-sm font-medium bg-[#C49A6C] text-[#0F1115] rounded-md hover:bg-[#D4AA7C] transition-colors"
            >
              Submit Inquiry
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1A1D23]">
          <p className="text-xs text-[#6B6760]">
            &copy; {new Date().getFullYear()} East Fremont District. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
