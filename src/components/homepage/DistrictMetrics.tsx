import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import { Venue } from "@/types/venue";

export default function DistrictMetrics({ venues }: { venues: Venue[] }) {
  const totalCapacity = venues.reduce((sum, v) => sum + (v.capacity ?? 0), 0);
  const totalSqFt = venues.reduce((sum, v) => sum + (v.squareFeet ?? 0), 0);

  const metrics = [
    { end: 10, suffix: "K+", label: "Total Capacity", duration: 2000 },
    { end: venues.length, suffix: "", label: "Venues", duration: 1200 },
    { end: Math.round(totalSqFt / 1000), suffix: "K", label: "Sq Ft", duration: 1600 },
    { end: 1, suffix: "", label: "City Block", duration: 800 },
  ];

  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33] py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {metrics.map((m, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="text-center space-y-2">
                <div className="font-mono text-5xl lg:text-6xl font-bold text-[#F0EDE8] tracking-tight">
                  <CountUp end={m.end} suffix={m.suffix} duration={m.duration} />
                </div>
                <p className="text-[#9B978F] text-sm font-medium">{m.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
