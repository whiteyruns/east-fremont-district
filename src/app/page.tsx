import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0C0F]">
      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/homepage/hero-main.webp"
            alt="East Fremont District aerial"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C0F]/80 via-[#0A0C0F]/70 to-[#0A0C0F]/95" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl space-y-8">
          {/* Label */}
          <p className="text-[#C49A6C] text-xs font-semibold tracking-[0.25em] uppercase">
            Downtown Las Vegas
          </p>

          {/* Title */}
          <h1 className="text-[#F0EDE8] text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            East Fremont
            <br />
            District
          </h1>

          {/* Description */}
          <p className="text-[#D0CDC7] text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            A fully privatized, multi-venue urban event district. 16 premium
            venues on one city block — purpose-built for large-scale corporate
            activations and convention programming.
          </p>

          {/* Operator */}
          <p className="text-[#6B6760] text-sm tracking-wide">
            Operated by{" "}
            <a
              href="https://www.cornerbarmgmt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C49A6C] hover:text-[#D4AA7C] transition-colors"
            >
              Corner Bar Management
            </a>
          </p>

          {/* CTA */}
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold bg-[#C49A6C] text-[#0F1115] rounded-md hover:bg-[#D4AA7C] transition-colors"
            >
              Client Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#2A2D33]/50 py-6 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[#6B6760] text-xs">
          <p>&copy; {new Date().getFullYear()} East Fremont District. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:events@eastfremontdistrict.com"
              className="hover:text-[#9B978F] transition-colors"
            >
              events@eastfremontdistrict.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
