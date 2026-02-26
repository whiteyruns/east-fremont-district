import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { getVenues } from "@/lib/airtable-venues";
import { Venue } from "@/types/venue";

export const dynamic = "force-dynamic";

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader({ venues }: { venues: Venue[] }) {
  const totalSqFt = venues.reduce((sum, v) => sum + (v.squareFeet ?? 0), 0);
  const formattedSqFt = totalSqFt.toLocaleString();

  return (
    <section className="py-16 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Infrastructure"
          title="The District"
          description={`A unified ${formattedSqFt} square foot footprint spanning one city block of privatized East Fremont real estate. ${venues.length} premium venues, one operating platform.`}
        />
      </Container>
    </section>
  );
}

// ============================================================================
// FOOTPRINT OVERVIEW SECTION
// ============================================================================
function FootprintOverview({ venues }: { venues: Venue[] }) {
  const totalCapacity = venues.reduce((sum, v) => sum + (v.capacity ?? 0), 0);
  const totalSqFt = venues.reduce((sum, v) => sum + (v.squareFeet ?? 0), 0);

  const stats = [
    { value: "1", label: "City Block" },
    { value: venues.length.toString(), label: "Venues" },
    { value: (totalSqFt / 1000).toFixed(0) + "K", label: "Sq Ft" },
    { value: totalCapacity.toLocaleString() + "+", label: "Total Capacity" },
  ];

  return (
    <section className="py-24 bg-[#0F1115] border-b border-[#2A2D33]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: Narrative */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-[#F0EDE8] text-3xl font-bold">
              The Infrastructure Footprint
            </h2>

            <div className="space-y-4 text-[#9B978F] leading-relaxed">
              <p>
                East Fremont District occupies a strategically consolidated footprint spanning three contiguous city blocks between Las Vegas Boulevard and 8th Street. This privatized urban real estate provides the rare opportunity to operate multiple premium venues as a unified activation platform.
              </p>

              <p>
                The district&apos;s concentrated geography eliminates traditional venue isolation, enabling seamless guest flow, integrated production infrastructure, and coordinated branding across the entire property. Single-operator management ensures consistency, simplifies logistics, and creates operational efficiencies impossible in fragmented venue environments.
              </p>

              <p>
                Each venue maintains its distinct character and technical capabilities while participating in district-wide infrastructure systems. This creates unprecedented flexibility for activations ranging from intimate single-venue experiences to transformational full-takeover events.
              </p>
            </div>
          </div>

          {/* Right: Stats Sidebar */}
          <div>
            <Card className="p-8 space-y-8">
              <h3 className="text-[#F0EDE8] text-lg font-bold">
                District Overview
              </h3>

              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="pb-6 border-b border-[#2A2D33] last:pb-0 last:border-0">
                    <p className="text-[#F0EDE8] font-mono text-3xl font-bold">
                      {stat.value}
                    </p>
                    <p className="text-[#9B978F] text-sm mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// DISTRICT MAP PLACEHOLDER
// ============================================================================
function DistrictMap() {
  return (
    <section className="py-24 bg-[#0F1115]">
      <Container>
        <div className="aspect-[21/9] bg-[#1A1D23] border border-[#2A2D33] rounded-lg flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="text-[#F0EDE8] text-xl font-semibold">
              District Map
            </p>
            <p className="text-[#9B978F]">
              Interactive Component
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// INFRASTRUCTURE PROOF SECTION
// ============================================================================
const districtImages = [
  { src: "/images/district/district-main.webp", alt: "Aerial view of East Fremont District infrastructure", featured: true },
  { src: "/images/district/district-crowd-01.webp", alt: "District crowd density and staging infrastructure" },
  { src: "/images/district/district-layout-01.webp", alt: "Venue storefront with event infrastructure" },
  { src: "/images/district/district-night-01.webp", alt: "District night activation" },
];

function InfrastructureProof() {
  return (
    <section className="py-24 bg-[#0F1115] border-b border-[#2A2D33]">
      <Container>
        <div className="space-y-12">
          <SectionHeading
            label="Infrastructure Proof"
            title="Control & Footprint"
            description="Security perimeters, staging infrastructure, and crowd management across the district — evidence of operational scale."
          />

          {/* Photo Grid — featured + supporting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured */}
            <div className="relative aspect-[16/10] bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden">
              <Image
                src={districtImages[0].src}
                alt={districtImages[0].alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F]/70 to-transparent" />
            </div>

            {/* Supporting Grid */}
            <div className="grid grid-cols-2 gap-6">
              {districtImages.slice(1).map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/3] bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F]/60 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// INFRASTRUCTURE BULLETS SECTION
// ============================================================================
function InfrastructureBullets() {
  const categories = [
    {
      title: "Physical Infrastructure",
      items: [
        "Five premium venues",
        "Multiple stages with acoustic design",
        "Full-service bar and kitchen facilities",
        "Rooftop event spaces",
        "Loading docks and service areas",
      ],
    },
    {
      title: "Operational Infrastructure",
      items: [
        "Professional staffing coordination",
        "24/7 security and access control",
        "Production equipment and technical support",
        "Vendor management and logistics",
        "Event coordination and day-of management",
      ],
    },
    {
      title: "Permitting & Coordination",
      items: [
        "Street closure management",
        "Fire marshal approvals",
        "Metro police coordination",
        "City permits and licensing",
        "Single-operator unified compliance",
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#0A0C0F]">
      <Container>
        <div className="space-y-16">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
            Complete Infrastructure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="p-8 space-y-6">
                <h3 className="text-[#C49A6C] font-bold text-lg">
                  {category.title}
                </h3>

                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-3">
                      <span className="text-[#C49A6C] flex-shrink-0 pt-1">
                        •
                      </span>
                      <span className="text-[#9B978F] text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// SCALABILITY SECTION
// ============================================================================
function ScalabilitySection() {
  const tiers = [
    {
      name: "Core",
      description:
        "Single venue with essential production infrastructure. Ideal for intimate brand experiences and focused audience engagement.",
    },
    {
      name: "Expanded",
      description:
        "Multiple venues with coordinated production. Creates distinct experience zones while maintaining unified brand messaging.",
    },
    {
      name: "Full Takeover",
      description:
        "Complete district transformation. Unprecedented scale and customization for major brand activations and transformational experiences.",
    },
  ];

  return (
    <section className="py-24 bg-[#0F1115] border-y border-[#2A2D33]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Text */}
          <div className="space-y-6">
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
              Scalable by Design
            </h2>

            <p className="text-[#9B978F] leading-relaxed">
              East Fremont District infrastructure scales seamlessly from single-venue activations to full district takeovers. Unified production systems, consistent operational procedures, and integrated branding frameworks accommodate activations of any scope without compromising quality or coordination.
            </p>

            <p className="text-[#9B978F] leading-relaxed">
              Whether your activation requires a focused venue experience or encompasses all district resources, the same professional infrastructure and operational excellence applies. This scalability creates unmatched flexibility for brands with evolving event needs.
            </p>
          </div>

          {/* Right: Tier Stack */}
          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <Card
                key={index}
                className="p-6 border-l-4 border-l-[#C49A6C]"
              >
                <h3 className="text-[#F0EDE8] text-lg font-bold mb-2">
                  {tier.name}
                </h3>
                <p className="text-[#9B978F] text-sm leading-relaxed">
                  {tier.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// OPERATING MODEL SECTION
// ============================================================================
function OperatingModel() {
  const advantages = [
    { value: "1", label: "Operator" },
    { value: "1", label: "Production Team" },
    { value: "1", label: "Security Perimeter" },
    { value: "1", label: "Permitting Package" },
  ];

  return (
    <section className="py-24 bg-[#0A0C0F]">
      <Container>
        <div className="space-y-16">
          <div className="space-y-6">
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
              Unified Operating Model
            </h2>

            <p className="text-[#9B978F] text-lg leading-relaxed max-w-3xl">
              Single-operator management of the entire East Fremont District creates structural advantages impossible in fragmented venue environments. One team, one production strategy, one security perimeter, one unified permitting process.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="font-mono text-5xl font-bold text-[#C49A6C]">
                  {item.value}
                </div>
                <p className="text-[#9B978F] font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// PAGE EXPORT
// ============================================================================
export default async function DistrictPage() {
  const venues = await getVenues();

  return (
    <>
      <PageHeader venues={venues} />
      <FootprintOverview venues={venues} />
      <DistrictMap />
      <InfrastructureProof />
      <InfrastructureBullets />
      <ScalabilitySection />
      <OperatingModel />
    </>
  );
}
