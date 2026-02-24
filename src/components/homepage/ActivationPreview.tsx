import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { activationFrameworks } from "@/data/activations";

export default function ActivationPreview() {
  return (
    <section className="py-24 bg-[#0A0C0F]">
      <Container>
        <div className="space-y-16">
          <SectionHeading
            label="Activation Frameworks"
            title="Scalable Packages"
            description="Three tiers of activation designed to scale from intimate single-venue experiences to full district takeovers."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activationFrameworks.map((framework) => (
              <Card
                key={framework.id}
                className="p-8 space-y-6 flex flex-col justify-between"
              >
                {/* Content */}
                <div className="space-y-4">
                  {/* Tier Name */}
                  <h3 className="text-[#F0EDE8] text-2xl font-bold">
                    {framework.name}
                  </h3>

                  {/* Positioning Line */}
                  <p className="text-[#C49A6C] text-sm italic">
                    {framework.positioningLine}
                  </p>

                  {/* Starting Range */}
                  <div className="space-y-1 pt-2">
                    <p className="text-[#9B978F] text-sm font-semibold">
                      Starting Range
                    </p>
                    <p className="text-[#F0EDE8] font-mono text-lg font-bold">
                      {framework.startingRange}
                    </p>
                  </div>

                  {/* Guest Count */}
                  <div className="space-y-1">
                    <p className="text-[#9B978F] text-sm font-semibold">
                      Ideal Guest Count
                    </p>
                    <p className="text-[#F0EDE8] text-sm">
                      {framework.idealGuestCount}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="secondary" href="/activation-frameworks">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>

          {/* Full CTA */}
          <div className="text-center pt-8">
            <Button variant="primary" href="/activation-frameworks">
              Explore All Frameworks
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
