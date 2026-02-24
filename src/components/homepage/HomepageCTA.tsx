import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function HomepageCTA() {
  return (
    <section className="py-24 bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="text-center space-y-8">
          <h2 className="text-[#F0EDE8] text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Activate?
          </h2>

          <p className="text-[#9B978F] text-lg leading-relaxed max-w-2xl mx-auto">
            Connect with our team to explore how East Fremont District infrastructure can bring your vision to life.
          </p>

          <Button variant="primary" href="/inquire">
            Submit Inquiry
          </Button>
        </div>
      </Container>
    </section>
  );
}
