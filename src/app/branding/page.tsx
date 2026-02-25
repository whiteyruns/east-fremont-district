import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { brandingZones } from "@/data/branding-zones";

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Sponsorship"
          title="District Branding"
          description="Transform brand presence across the district. From street-level wraps to rooftop installations, integrate your brand into the fabric of East Fremont through strategic, high-impact placements."
        />
      </Container>
    </section>
  );
}

// ============================================================================
// TYPE BADGE
// ============================================================================
function TypeBadge({ type }: { type: string }) {
  const typeColors: Record<string, string> = {
    street: "bg-[#C49A6C]/10 text-[#C49A6C]",
    building: "bg-[#C49A6C]/10 text-[#C49A6C]",
    rooftop: "bg-[#C49A6C]/10 text-[#C49A6C]",
    stage: "bg-[#C49A6C]/10 text-[#C49A6C]",
    digital: "bg-[#C49A6C]/10 text-[#C49A6C]",
    experiential: "bg-[#C49A6C]/10 text-[#C49A6C]",
  };

  const typeLabels: Record<string, string> = {
    street: "Street Level",
    building: "Building Wrap",
    rooftop: "Rooftop",
    stage: "Stage",
    digital: "Digital",
    experiential: "Experiential",
  };

  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded ${typeColors[type] || typeColors.street}`}>
      {typeLabels[type]}
    </span>
  );
}

// ============================================================================
// VISIBILITY BADGE
// ============================================================================
function VisibilityBadge({ visibility }: { visibility: string }) {
  const labels: Record<string, string> = {
    "street-level": "Street Level",
    aerial: "Aerial",
    interior: "Interior",
    mixed: "Mixed",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-[#C49A6C] rounded-full" />
      <span className="text-[#9B978F] text-xs">{labels[visibility]}</span>
    </div>
  );
}

// ============================================================================
// AVAILABILITY BADGE
// ============================================================================
function AvailabilityBadge({ availability }: { availability: string }) {
  const labels: Record<string, string> = {
    "year-round": "Year-Round",
    "event-only": "Event-Only",
    seasonal: "Seasonal",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-[#6B6760] rounded-full" />
      <span className="text-[#6B6760] text-xs">{labels[availability]}</span>
    </div>
  );
}

// ============================================================================
// BRANDING ZONE CARD
// ============================================================================
function BrandingCard({ zone }: { zone: (typeof brandingZones)[0] }) {
  return (
    <Card className="overflow-hidden hover:border-[#3A3D43] transition-colors h-full flex flex-col">
      {/* Image Placeholder */}
      <div className="aspect-[16/10] bg-[#24272E] flex items-center justify-center">
        <p className="text-[#6B6760] text-sm">Image Placeholder</p>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Name */}
        <h3 className="text-[#F0EDE8] font-bold text-lg mb-2">
          {zone.name}
        </h3>

        {/* Description */}
        <p className="text-[#9B978F] text-sm leading-relaxed mb-4 flex-1">
          {zone.description}
        </p>

        {/* Type Badge */}
        <div className="mb-3">
          <TypeBadge type={zone.type} />
        </div>

        {/* Visibility & Availability */}
        <div className="space-y-2 mb-4 pb-4 border-b border-[#2A2D33]">
          <VisibilityBadge visibility={zone.visibility} />
          <AvailabilityBadge availability={zone.availability} />
        </div>

        {/* Dimensions */}
        {zone.dimensions && (
          <div className="mb-4">
            <p className="text-[#6B6760] text-xs font-semibold uppercase mb-1">
              Dimensions
            </p>
            <p className="text-[#F0EDE8] text-sm">{zone.dimensions}</p>
          </div>
        )}

        {/* Specs List */}
        {zone.specs && zone.specs.length > 0 && (
          <div>
            <p className="text-[#6B6760] text-xs font-semibold uppercase mb-2">
              Specs
            </p>
            <ul className="space-y-1">
              {zone.specs.map((spec, index) => (
                <li key={index} className="text-[#9B978F] text-xs flex gap-2">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}

// ============================================================================
// BRANDING GRID SECTION
// ============================================================================
function BrandingGrid() {
  return (
    <section className="py-12 lg:py-16 bg-[#0F1115]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {brandingZones.map((zone) => (
            <BrandingCard key={zone.id} zone={zone} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// SPONSOR CANDY — BRANDING GALLERY
// ============================================================================
function SponsorCandy() {
  return (
    <section className="py-16 lg:py-24 bg-[#0F1115] border-b border-[#2A2D33]">
      <Container>
        <div className="space-y-12">
          <SectionHeading
            label="Surfaces & Integrations"
            title="Sponsor Visibility"
            description="Wrapped façades, branded entries, custom installs, menus, bars, and signage — every touchpoint is a branding surface."
          />

          <div className="aspect-[21/9] bg-[#1A1D23] border border-[#2A2D33] rounded-lg flex items-center justify-center">
            <p className="text-[#6B6760] text-sm">Branding gallery — images coming soon</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// SPONSOR INTEGRATION SECTION
// ============================================================================
function SponsorIntegration() {
  const integrationTypes = [
    {
      title: "Physical Integration",
      items: [
        "Building wraps and signage",
        "Street-level installations",
        "Structural branding elements",
      ],
    },
    {
      title: "Experiential Integration",
      items: [
        "Branded beverage programs",
        "Sponsored activations",
        "Custom experiences",
      ],
    },
    {
      title: "Digital Integration",
      items: [
        "Social content amplification",
        "Streaming partnerships",
        "Real-time engagement",
      ],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A0C0F]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Narrative */}
          <div>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Integrated Sponsorship Model
            </h2>
            <div className="space-y-4 text-[#9B978F] leading-relaxed">
              <p>
                East Fremont District sponsorships transcend traditional static placements.
                Brands don't just attach their logo to surfaces—they become woven into the
                district's operational fabric through multiple integration points.
              </p>
              <p>
                This integrated approach means your brand benefits from authentic touchpoints
                across physical spaces, experiential moments, and digital amplification.
                Attendees encounter your brand organically throughout their journey, creating
                multiple moments of connection rather than a single display.
              </p>
              <p>
                Every activation can include custom branding integrations that align with
                your campaign objectives, whether you're building awareness, driving engagement,
                or creating memorable brand moments.
              </p>
            </div>
          </div>

          {/* Right Column: Integration Blocks */}
          <div className="space-y-4">
            {integrationTypes.map((integration, index) => (
              <div
                key={index}
                className="bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-6"
              >
                <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-3">
                  {integration.title}
                </h3>
                <ul className="space-y-2">
                  {integration.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-[#9B978F] text-sm flex gap-2">
                      <span className="text-[#C49A6C] flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================
function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-[#0F1115]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold mb-4">
            Ready to Brand the District?
          </h2>
          <p className="text-[#9B978F] text-lg mb-8">
            Connect with our team to explore branding opportunities that align
            with your campaign objectives.
          </p>
          <Button href="/inquire" variant="primary">
            Start an Inquiry
          </Button>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function BrandingPage() {
  return (
    <>
      <PageHeader />
      <BrandingGrid />
      <SponsorCandy />
      <SponsorIntegration />
      <CTASection />
    </>
  );
}
