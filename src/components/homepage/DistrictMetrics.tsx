'use client';

import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import { Venue } from "@/types/venue";

export default function DistrictMetrics({ venues }: { venues: Venue[] }) {
  const totalSqFt = venues.reduce((sum, v) => sum + (v.squareFeet ?? 0), 0);

  const items = [
    { value: <CountUp end={10} suffix="K+" duration={2000} />, label: "Guest Capacity" },
    { value: <CountUp end={venues.length} suffix="" duration={1200} />, label: "Venues" },
    { value: <CountUp end={9} suffix="+" duration={1000} />, label: "Stages & Dance Floors" },
    { value: <CountUp end={27} suffix="+" duration={1400} />, label: "Bar Wells" },
    { value: <CountUp end={Math.round(totalSqFt / 1000)} suffix="K" duration={1600} />, label: "Sq Ft" },
  ];

  const badges = [
    "Full Street Closure & Permitting",
    "Turnkey Production & Operations",
    "One City Block",
  ];

  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="py-12 lg:py-16 space-y-10">
          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="text-center space-y-1">
                  <div className="font-mono text-4xl lg:text-5xl font-bold text-[#F0EDE8] tracking-tight">
                    {item.value}
                  </div>
                  <p className="text-[#9B978F] text-xs font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Badge Row */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {badges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-[#C49A6C] text-xs font-semibold uppercase tracking-wider border border-[#2A2D33] rounded-full px-5 py-2"
              >
                <span>◆</span>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
