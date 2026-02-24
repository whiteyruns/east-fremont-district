import MetricCard from "@/components/ui/MetricCard";
import Container from "@/components/ui/Container";

export default function DistrictMetrics() {
  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33] py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <MetricCard value="3,550+" label="Total Capacity" />
          <MetricCard value="5" label="Venues" />
          <MetricCard value="42,500" label="Sq Ft" />
          <MetricCard value="3" label="City Blocks" />
        </div>
      </Container>
    </section>
  );
}
