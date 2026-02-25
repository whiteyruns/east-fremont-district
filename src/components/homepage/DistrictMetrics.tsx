import MetricCard from "@/components/ui/MetricCard";
import Container from "@/components/ui/Container";
import { Venue } from "@/types/venue";

export default function DistrictMetrics({ venues }: { venues: Venue[] }) {
  const totalCapacity = venues.reduce((sum, v) => sum + (v.capacity ?? 0), 0);
  const totalSqFt = venues.reduce((sum, v) => sum + (v.squareFeet ?? 0), 0);

  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33] py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <MetricCard
            value={totalCapacity.toLocaleString() + "+"}
            label="Total Capacity"
          />
          <MetricCard
            value={venues.length.toString()}
            label="Venues"
          />
          <MetricCard
            value={(totalSqFt / 1000).toFixed(0) + "K"}
            label="Sq Ft"
          />
          <MetricCard value="1" label="City Block" />
        </div>
      </Container>
    </section>
  );
}
