"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { navItems } from "@/data/navigation";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check auth state by seeing if we can detect the cookie presence
  // We check if we're on a protected route (meaning middleware let us through)
  useEffect(() => {
    const protectedPaths = [
      "/dashboard",
      "/district",
      "/activation-frameworks",
      "/inventory",
      "/branding",
      "/production",
      "/case-studies",
      "/inquire",
    ];
    const onProtectedRoute = protectedPaths.some((p) =>
      pathname.startsWith(p)
    );
    if (onProtectedRoute) {
      setIsLoggedIn(true);
    }
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Don't show header on landing or login pages
  if (pathname === "/" || pathname === "/login") return null;

  return (
    <header className="sticky top-0 z-50 bg-[#0A0C0F]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0A0C0F]/60 border-b border-[#2A2D33]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#F0EDE8] font-bold text-lg tracking-tight hover:text-[#C49A6C] transition-colors"
        >
          EAST FREMONT DISTRICT
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-[#C49A6C]"
                  : "text-[#F0EDE8] hover:text-[#C49A6C]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm font-medium text-[#6B6760] hover:text-[#C49A6C] transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-1.5 border border-[#C49A6C] text-[#C49A6C] rounded-md hover:bg-[#C49A6C] hover:text-[#0F1115] transition-colors"
            >
              Client Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-[#F0EDE8] hover:text-[#C49A6C] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-[#2A2D33] bg-[#0A0C0F]">
          <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors py-2 ${
                  isActive(item.href)
                    ? "text-[#C49A6C]"
                    : "text-[#F0EDE8] hover:text-[#C49A6C]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-1.5 text-sm font-medium text-[#6B6760] hover:text-[#C49A6C] transition-colors py-2"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-[#C49A6C] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Client Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
