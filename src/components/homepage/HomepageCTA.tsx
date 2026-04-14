import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import DeckDownload from "@/components/homepage/DeckDownload";

export default function HomepageCTA() {
  return (
    <section className="py-24 bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="text-center space-y-12">
          {/* Primary CTA */}
          <div className="space-y-6">
            <h2 className="text-[#F0EDE8] text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Activate?
            </h2>
            <p className="text-[#9B978F] text-lg leading-relaxed max-w-2xl mx-auto">
              Connect with our team to explore how F.E.E.D. infrastructure can bring your vision to life.
            </p>
            <Button variant="primary" href="/inquire">
              Submit Inquiry
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 max-w-sm mx-auto">
            <div className="flex-1 h-px bg-[#2A2D33]" />
            <span className="text-[#6B6760] text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#2A2D33]" />
          </div>

          {/* Deck Download */}
          <div className="space-y-4">
            <p className="text-[#9B978F] text-sm">
              Not ready yet? Download the sponsorship deck to share with your team.
            </p>
            <DeckDownload />
          </div>
        </div>
      </Container>
    </section>
  );
}
