import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ComparisonTable from "@/components/activation-frameworks/ComparisonTable";
import { getActivationFrameworks } from "@/lib/airtable-activations";
import { ActivationFramework } from "@/types/activation";

export const revalidate = 60;

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Packages"
          title="Activation Frameworks"
          description="Three scalable tiers designed to accommodate activations from intimate single-venue experiences to district-wide transformations. Choose the framework that aligns with your event scope and brand objectives."
        />
      </Container>
    </section>
  );
}

// ============================================================================
// FRAMEWORK CARD
// ============================================================================
function FrameworkCard({
  framework,
}: {
  framework: ActivationFramework;
}) {
  const isFullTakeover = framework.tier === "full-takeover";

  return (
    <Card
      className={`p-8 flex flex-col h-full ${
        isFullTakeover ? "border-2 border-[#C49A6C] relative" : ""
      }`}
    >
      {/* Full Takeover Badge */}
      {isFullTakeover && (
        <div className="absolute -top-3 left-6">
          <span className="bg-[#C49A6C] text-[#0F1115] px-3 py-1 rounded-full text-xs font-bold uppercase">
            Full Platform
          </span>
        </div>
      )}

      {/* Tier Label */}
      <p className="text-[#9B978F] text-xs font-semibold uppercase tracking-widest mb-2">
        {framework.tier === "core"
          ? "Core Tier"
          : framework.tier === "expanded"
          ? "Expanded Tier"
          : "Premier Tier"}
      </p>

      {/* Name */}
      <h3 className="text-[#F0EDE8] text-2xl font-bold mb-3">
        {framework.name}
      </h3>

      {/* Description */}
      <p className="text-[#9B978F] text-sm leading-relaxed mb-6 flex-1">
        {framework.description}
      </p>

      {/* Specs Grid */}
      <div className="bg-[#1A1D23] rounded-lg p-4 mb-6 space-y-3">
        <div>
          <p className="text-[#9B978F] text-xs font-semibold mb-1">
            Starting Range
          </p>
          <p className="text-[#F0EDE8] font-mono font-bold text-lg">
            {framework.startingRange}
          </p>
        </div>
        <div>
          <p className="text-[#9B978F] text-xs font-semibold mb-1">
            Guest Count
          </p>
          <p className="text-[#F0EDE8]">{framework.idealGuestCount}</p>
        </div>
        <div>
          <p className="text-[#9B978F] text-xs font-semibold mb-1">
            Venue Access
          </p>
          <p className="text-[#F0EDE8] text-sm">{framework.venueAccess}</p>
        </div>
        <div>
          <p className="text-[#9B978F] text-xs font-semibold mb-1">
            Production Level
          </p>
          <p className="text-[#F0EDE8] text-sm">{framework.productionLevel}</p>
        </div>
      </div>

      {/* Branding Included */}
      <div className="mb-6">
        <p className="text-[#C49A6C] text-xs font-bold uppercase mb-3">
          Branding Included
        </p>
        <div className="flex flex-wrap gap-2">
          {framework.brandingIncluded.map((item, index) => (
            <span
              key={index}
              className="bg-[#24272E] text-[#C49A6C] text-xs px-3 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Button href="/inquire" variant="primary" className="w-full">
        Inquire About {framework.name}
      </Button>
    </Card>
  );
}


// ============================================================================
// CUSTOM CTA SECTION
// ============================================================================
function CustomCtaSection() {
  return (
    <section className="py-16 bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[#F0EDE8] text-2xl font-bold mb-2">
              Need a Custom Scope?
            </h2>
            <p className="text-[#9B978F]">
              Our frameworks provide powerful starting points, but we&apos;re ready
              to customize any activation to meet your unique needs and
              objectives.
            </p>
          </div>
          <Button href="/inquire" variant="primary" className="flex-shrink-0">
            Discuss Custom Options
          </Button>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// PAGE EXPORT
// ============================================================================
export default async function ActivationFrameworksPage() {
  const activationFrameworks = await getActivationFrameworks();

  return (
    <>
      <PageHeader />

      {/* Framework Cards Section */}
      <section className="py-16 lg:py-24 bg-[#0F1115]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activationFrameworks.map((framework) => (
              <FrameworkCard key={framework.id} framework={framework} />
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <ComparisonTable frameworks={activationFrameworks} />

      {/* Custom CTA Section */}
      <CustomCtaSection />
    </>
  );
}
