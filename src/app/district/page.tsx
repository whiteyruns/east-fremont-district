import Image from "next/image";
import {
  Building2, Music, UtensilsCrossed, Sunset, Truck,
  Users, ShieldCheck, Wrench, PackageCheck, CalendarCheck,
  Construction, Flame, BadgeCheck, FileCheck, Scale,
} from "lucide-react";
import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import InteractiveDistrictMap from "@/components/district/DistrictMap";
import { getVenues } from "@/lib/airtable-venues";
import { Venue } from "@/types/venue";

export const metadata: Metadata = {
  title: "The District",
  description:
    "Explore F.E.E.D.'s unified 6-block entertainment footprint — 16+ venues, one operator, full infrastructure for large-scale Las Vegas activations.",
  openGraph: {
    title: "The District | F.E.E.D.",
    description:
      "Explore F.E.E.D.'s unified 6-block entertainment footprint — 16+ venues, one operator, full infrastructure for large-scale Las Vegas activations.",
  },
};

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
          description={`A unified ${formattedSqFt} square foot footprint spanning one city block of privatized Fremont East real estate. ${venues.length} premium venues, one operating platform.`}
        />
      </Container>
    </section>
  );
}

// ============================================================================
// FOOTPRINT OVERVIEW SECTION
// ============================================================================
function FootprintOverview({ venues }: { venues: Venue[] }) {
  const totalSqFt = venues.reduce((sum, v) => sum + (v.squareFeet ?? 0), 0);

  return (
    <section className="py-24 bg-[#0F1115] border-b border-[#2A2D33] section-accent">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: Narrative */}
          <ScrollReveal className="lg:col-span-2 space-y-6">
            <h2 className="text-[#F0EDE8] text-3xl font-bold">
              The Infrastructure Footprint
            </h2>

            <div className="space-y-4 text-[#9B978F] leading-relaxed">
              <p>
                The Fremont East Entertainment District occupies a vibrant 6-block, pedestrian-friendly footprint between Las Vegas Blvd and 8th Street. This privatized entertainment district provides the rare opportunity to operate multiple premium venues as a unified activation platform.
              </p>

              <p>
                The district&apos;s concentrated geography eliminates traditional venue isolation, enabling seamless guest flow, integrated production infrastructure, and coordinated branding across the entire property. Single-operator management ensures consistency, simplifies logistics, and creates operational efficiencies impossible in fragmented venue environments.
              </p>

              <p>
                Each venue maintains its distinct character and technical capabilities while participating in district-wide infrastructure systems. This creates unprecedented flexibility for activations ranging from intimate single-venue experiences to transformational full-takeover events.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Stats Sidebar */}
          <ScrollReveal delay={200} direction="right">
            <Card className="p-8 space-y-8">
              <h3 className="text-[#F0EDE8] text-lg font-bold">
                District Overview
              </h3>

              <div className="space-y-6">
                <div className="pb-6 border-b border-[#2A2D33]">
                  <p className="text-[#F0EDE8] font-mono text-3xl font-bold">1</p>
                  <p className="text-[#9B978F] text-sm mt-1">City Block</p>
                </div>
                <div className="pb-6 border-b border-[#2A2D33]">
                  <p className="text-[#F0EDE8] font-mono text-3xl font-bold">
                    <CountUp end={venues.length} duration={1200} />
                  </p>
                  <p className="text-[#9B978F] text-sm mt-1">Venues</p>
                </div>
                <div className="pb-6 border-b border-[#2A2D33]">
                  <p className="text-[#F0EDE8] font-mono text-3xl font-bold">
                    <CountUp end={Math.round(totalSqFt / 1000)} duration={1600} suffix="K" />
                  </p>
                  <p className="text-[#9B978F] text-sm mt-1">Sq Ft</p>
                </div>
                <div>
                  <p className="text-[#F0EDE8] font-mono text-3xl font-bold">
                    <CountUp end={10} duration={2000} suffix="K+" />
                  </p>
                  <p className="text-[#9B978F] text-sm mt-1">Total Capacity</p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// DISTRICT MAP PLACEHOLDER
// ============================================================================
function DistrictMapSection() {
  return (
    <section className="py-24 bg-[#0F1115]">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              Location
            </p>
            <h2 className="text-[#F0EDE8] text-3xl font-bold">
              District Map
            </h2>
            <p className="text-[#9B978F] max-w-2xl">
              506–525 East Fremont Street & 100 S 6th Street — one consolidated city block of premium venue infrastructure in the heart of Downtown Las Vegas. Hover to explore.
            </p>
          </div>

          <InteractiveDistrictMap />
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// INFRASTRUCTURE PROOF SECTION
// ============================================================================
const districtImages = [
  { src: "/images/district/district-ftb-hero.webp", alt: "Feed the Block — 15,000+ crowd on East Fremont Street", featured: true },
  { src: "/images/district/district-ftb-crowd.webp", alt: "Capacity crowd filling East Fremont during Feed the Block" },
  { src: "/images/district/district-ftb-stage.webp", alt: "Concert-grade stage production on East Fremont" },
  { src: "/images/district/district-ftb-confetti.webp", alt: "Feed the Block finale with confetti and full crowd" },
];

function InfrastructureProof() {
  return (
    <section className="py-24 bg-[#0F1115] border-b border-[#2A2D33] section-accent">
      <Container>
        <div className="space-y-12">
          <ScrollReveal>
            <SectionHeading
              label="Infrastructure Proof"
              title="Control & Footprint"
              description="Security perimeters, staging infrastructure, and crowd management across the district — evidence of operational scale."
            />
          </ScrollReveal>

          {/* Photo Grid — featured + supporting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured */}
            <ScrollReveal delay={100}>
              <div className="relative aspect-[16/10] bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden group">
                <Image
                  src={districtImages[0].src}
                  alt={districtImages[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F]/70 to-transparent" />
              </div>
            </ScrollReveal>

            {/* Supporting Grid */}
            <div className="grid grid-cols-2 gap-6">
              {districtImages.slice(1).map((img, i) => (
                <ScrollReveal key={img.src} delay={200 + i * 100}>
                  <div className="relative aspect-[4/3] bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden group">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F]/60 to-transparent" />
                  </div>
                </ScrollReveal>
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
        { icon: Building2, text: "16+ premium venues across the district" },
        { icon: Music, text: "Multiple stages with concert-grade sound" },
        { icon: UtensilsCrossed, text: "Full-service bar and kitchen facilities" },
        { icon: Sunset, text: "Rooftop event spaces with panoramic views" },
        { icon: Truck, text: "Loading docks and service areas" },
      ],
    },
    {
      title: "Operational Infrastructure",
      items: [
        { icon: Users, text: "Professional staffing coordination" },
        { icon: ShieldCheck, text: "24/7 security and access control" },
        { icon: Wrench, text: "Production equipment and technical support" },
        { icon: PackageCheck, text: "Vendor management and logistics" },
        { icon: CalendarCheck, text: "Event coordination and day-of management" },
      ],
    },
    {
      title: "Permitting & Coordination",
      items: [
        { icon: Construction, text: "Street closure management" },
        { icon: Flame, text: "Fire marshal approvals" },
        { icon: BadgeCheck, text: "LVMPD coordination" },
        { icon: FileCheck, text: "City permits and licensing" },
        { icon: Scale, text: "Single-operator unified compliance" },
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#0A0C0F] section-accent">
      <Container>
        <div className="space-y-16">
          <ScrollReveal>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
              Complete Infrastructure
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <Card className="p-8 space-y-6 h-full">
                  <h3 className="text-[#C49A6C] font-bold text-lg">
                    {category.title}
                  </h3>

                  <ul className="space-y-4">
                    {category.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <Icon className="w-4 h-4 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                          <span className="text-[#9B978F] text-sm leading-relaxed">
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </ScrollReveal>
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
      venues: "1–2",
      capacity: "200–800",
      description: "Single venue with essential production infrastructure. Ideal for intimate brand experiences and focused audience engagement.",
      barWidth: "33%",
      highlight: false,
    },
    {
      name: "Expanded",
      venues: "3–6",
      capacity: "800–2,500",
      description: "Multiple venues with coordinated production. Creates distinct experience zones while maintaining unified brand messaging.",
      barWidth: "66%",
      highlight: false,
    },
    {
      name: "Full Takeover",
      venues: "All 16",
      capacity: "2,500–10K+",
      description: "Complete district transformation. Unprecedented scale and customization for major brand activations and transformational experiences.",
      barWidth: "100%",
      highlight: true,
    },
  ];

  return (
    <section className="py-24 bg-[#0F1115] border-y border-[#2A2D33] section-accent">
      <Container>
        <div className="space-y-16">
          <ScrollReveal>
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
                Scalable by Design
              </h2>
              <p className="text-[#9B978F] leading-relaxed">
                F.E.E.D. infrastructure scales seamlessly from single-venue activations to full district takeovers. One team, one platform — any scope.
              </p>
            </div>
          </ScrollReveal>

          {/* Escalating Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <ScrollReveal key={index} delay={index * 200}>
                <Card className={`p-8 space-y-5 h-full relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
                  tier.highlight ? "border-[#C49A6C]/40 tier-glow" : ""
                }`}>
                  {/* Scale bar */}
                  <div className="h-1 bg-[#1A1D23] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C49A6C] to-[#D4AA7C] rounded-full"
                      style={{ width: tier.barWidth }}
                    />
                  </div>

                  {tier.highlight && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase text-[#C49A6C] bg-[#C49A6C]/10 px-2 py-1 rounded">
                      Max Scale
                    </span>
                  )}

                  <h3 className={`text-xl font-bold ${tier.highlight ? "text-[#C49A6C]" : "text-[#F0EDE8]"}`}>
                    {tier.name}
                  </h3>

                  <div className="flex gap-6">
                    <div>
                      <p className="text-[#6B6760] text-[10px] uppercase tracking-wider font-semibold">Venues</p>
                      <p className="text-[#F0EDE8] font-mono text-lg font-bold">{tier.venues}</p>
                    </div>
                    <div>
                      <p className="text-[#6B6760] text-[10px] uppercase tracking-wider font-semibold">Capacity</p>
                      <p className="text-[#F0EDE8] font-mono text-lg font-bold">{tier.capacity}</p>
                    </div>
                  </div>

                  <p className="text-[#9B978F] text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </Card>
              </ScrollReveal>
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
    { label: "Operator" },
    { label: "Production Team" },
    { label: "Security Perimeter" },
    { label: "Permitting Package" },
  ];

  return (
    <section className="py-24 bg-[#0A0C0F] section-accent">
      <Container>
        <div className="space-y-16">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
                Unified Operating Model
              </h2>

              <p className="text-[#9B978F] text-lg leading-relaxed max-w-3xl">
                Single-operator management of the entire Fremont East Entertainment District creates structural advantages impossible in fragmented venue environments. One team, one production strategy, one security perimeter, one unified permitting process.
              </p>
            </div>
          </ScrollReveal>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="text-center space-y-3">
                  <div className="font-mono text-5xl font-bold text-[#C49A6C]">
                    <CountUp end={1} duration={800 + index * 300} />
                  </div>
                  <p className="text-[#9B978F] font-medium">
                    {item.label}
                  </p>
                </div>
              </ScrollReveal>
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
      <DistrictMapSection />
      <InfrastructureProof />
      <InfrastructureBullets />
      <ScalabilitySection />
      <OperatingModel />
    </>
  );
}
