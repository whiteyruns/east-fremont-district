import Link from "next/link";
import { navItems } from "@/data/navigation";
import Button from "@/components/ui/Button";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2A2D33] bg-[#0F1115]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand Description */}
          <div className="space-y-4">
            <h3 className="text-[#F0EDE8] font-bold text-lg tracking-tight">
              EAST FREMONT DISTRICT
            </h3>
            <p className="text-[#9B978F] text-sm leading-relaxed">
              A fully privatized, multi-venue urban event district designed for large-scale corporate activations and convention programming in Downtown Las Vegas.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-[#F0EDE8] font-semibold text-sm tracking-wide uppercase">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#9B978F] hover:text-[#C49A6C] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & CTA */}
          <div className="space-y-4">
            <h4 className="text-[#F0EDE8] font-semibold text-sm tracking-wide uppercase">
              Get in Touch
            </h4>
            <p className="text-[#9B978F] text-sm leading-relaxed">
              Ready to explore opportunities with East Fremont District? We&apos;d love to hear from you.
            </p>
            <Button variant="primary" href="/inquire" className="w-full">
              Submit Inquiry
            </Button>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="border-t border-[#2A2D33] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6760] text-sm">
            © {currentYear} East Fremont District. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[#6B6760] text-xs">
              <Link href="/privacy" className="hover:text-[#9B978F] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#9B978F] transition-colors">
                Terms &amp; Conditions
              </Link>
            </div>
            <a
              href="https://www.cornerbarmgmt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B6760] text-xs hover:text-[#9B978F] transition-colors"
            >
              Powered by Corner Bar Management
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
