import Image from "next/image";
import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Unified Production" };

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Operations"
          title="Unified Production"
          description="Single-operator coordination across all district venues. Unified sound, lighting, staging, and staffing eliminates fragmentation and ensures seamless execution at any event scale."
        />
      </Container>
    </section>
  );
}

// ============================================================================
// PRODUCTION MODEL SECTION
// ============================================================================
function ProductionModel() {
  const keyBenefits = [
    "One production team across all venues",
    "Unified sound, lighting, and staging",
    "Streamlined vendor onboarding",
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#0F1115]">
      <Container>
        <div className="bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-8 lg:p-12">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold mb-8">
            Single-Operator Advantage
          </h2>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-[#9B978F] text-lg leading-relaxed mb-6">
              East Fremont District operates under unified production management.
              Rather than coordinating multiple independent venue operators with
              different standards, technical capabilities, and vendor relationships,
              all district venues operate through a single production team. This eliminates
              vendor coordination headaches, ensures consistent technical quality, and
              dramatically simplifies event execution.
            </p>
            <p className="text-[#9B978F] text-lg leading-relaxed">
              Your event benefits from a single point of contact, unified technical
              standards, and seamless coordination across the entire district—whether
              you&apos;re using one venue or activating the full platform.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-[#2A2D33]">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#C49A6C]/10 rounded-lg mb-3">
                  <span className="text-[#C49A6C] font-bold text-lg">✓</span>
                </div>
                <p className="text-[#F0EDE8] font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// OPS & CONTROL — PRODUCTION GALLERY
// ============================================================================
const productionImages = [
  { src: "/images/production/street-build-01.webp", alt: "Street-level production build and infrastructure", label: "Street Build" },
  { src: "/images/district/district-main.webp", alt: "Aerial view of district infrastructure and staging", label: "District Aerial" },
  { src: "/images/district/district-crowd-01.webp", alt: "Crowd management and staging infrastructure", label: "Crowd Management" },
  { src: "/images/district/district-night-01.webp", alt: "Night activation lighting and production", label: "Night Production" },
];

function OpsControl() {
  return (
    <section className="py-16 lg:py-24 bg-[#0A0C0F] border-b border-[#2A2D33]">
      <Container>
        <div className="space-y-12">
          <SectionHeading
            label="Ops & Control"
            title="Production in Practice"
            description="Stage builds, lighting rigs, security perimeters, sound operations, and staff coordination — the infrastructure behind every seamless activation."
          />

          {/* Main Hero Image */}
          <div className="relative aspect-[21/9] bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden">
            <Image
              src={productionImages[0].src}
              alt={productionImages[0].alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F]/70 to-transparent" />
          </div>

          {/* Supporting Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productionImages.slice(1).map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F]/70 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[#F0EDE8] text-xs font-semibold tracking-wide uppercase">
                  {img.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// STAFFING OVERVIEW SECTION
// ============================================================================
function StaffingOverview() {
  const staffingRoles = [
    {
      title: "Bar Staff",
      icon: "🍸",
      description: "Scales with event size. Premium bartending and service standards across all venues.",
    },
    {
      title: "Security",
      icon: "🛡️",
      description: "Tiered deployment from venue-level doorstaff to district-wide perimeter control.",
    },
    {
      title: "Production Crew",
      icon: "🎤",
      description: "Unified sound, lighting, and stage management across all activation areas.",
    },
    {
      title: "Event Management",
      icon: "📋",
      description: "Dedicated event managers ensure day-of execution aligns with your objectives.",
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#0F1115]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Left Column: Narrative */}
          <div>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold mb-6">
              Staffing Model
            </h2>
            <div className="space-y-4 text-[#9B978F] leading-relaxed">
              <p>
                Our unified staffing structure ensures consistent service quality and
                professional execution across all venues. Each role is professionally
                trained, equipped with district standards, and coordinated through a
                single operations chain.
              </p>
              <p>
                Staffing scales elastically with your event size—from intimate single-venue
                experiences to district-wide takeovers. The same operational excellence applies
                whether you&apos;re hosting 100 or 5,000 guests.
              </p>
            </div>
          </div>

          {/* Right Column: Staff Cards */}
          <div className="grid grid-cols-2 gap-4">
            {staffingRoles.map((role, index) => (
              <Card key={index} className="p-4 h-full">
                <div className="text-3xl mb-3">{role.icon}</div>
                <h3 className="text-[#F0EDE8] font-bold text-sm mb-2">
                  {role.title}
                </h3>
                <p className="text-[#9B978F] text-xs leading-relaxed">
                  {role.description}
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
// SECURITY MODEL SECTION
// ============================================================================
function SecurityModel() {
  const securityLayers = [
    {
      title: "Venue Perimeter",
      items: [
        "Professional doorstaff at each venue",
        "ID verification and credential checking",
        "Capacity management and flow control",
      ],
    },
    {
      title: "Street-Level",
      items: [
        "Crowd management and barrier deployment",
        "Street-level activation security",
        "Patron flow optimization between venues",
      ],
    },
    {
      title: "District Perimeter",
      items: [
        "Entry and exit point control",
        "Emergency route management",
        "Perimeter coordination with city services",
      ],
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#0F1115]">
      <Container>
        <div className="mb-12">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold mb-4">
            Security & Credentialing
          </h2>
          <p className="text-[#9B978F] text-lg">
            Multi-layer perimeter security ensures guest safety while optimizing flow
            and experience quality. Credential systems integrate across all venues for
            seamless access management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityLayers.map((layer, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-4">
                {layer.title}
              </h3>
              <ul className="space-y-2">
                {layer.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[#9B978F] text-sm flex gap-2">
                    <span className="text-[#C49A6C] flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// CITY COORDINATION SECTION
// ============================================================================
function CityCoordination() {
  const coordinationAreas = [
    {
      title: "Metro Police",
      description: "Pre-established traffic control and public safety coordination protocols.",
    },
    {
      title: "Fire Marshal",
      description: "Life safety compliance, capacity verification, and emergency access routes.",
    },
    {
      title: "City of Las Vegas",
      description: "Street closure permits, public right-of-way management, and logistics coordination.",
    },
    {
      title: "Health District",
      description: "Food service compliance, sanitation standards, and health permits.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A0C0F]">
      <Container>
        <div className="mb-12">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold mb-4">
            City Coordination
          </h2>
          <p className="text-[#9B978F] text-lg">
            Pre-established relationships with key city agencies streamline permitting
            and ensure seamless coordination for events of any scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coordinationAreas.map((area, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-[#F0EDE8] font-bold mb-3">{area.title}</h3>
              <p className="text-[#9B978F] text-sm">{area.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// VENDOR INTEGRATION SECTION
// ============================================================================
function VendorIntegration() {
  const vendorCategories = [
    {
      title: "Preferred Vendors",
      items: [
        "Catering and F&B services",
        "AV and technical equipment",
        "Floral and decor",
        "Entertainment and talent",
      ],
    },
    {
      title: "External Vendor Onboarding",
      items: [
        "Insurance and liability verification",
        "Load-in scheduling and logistics",
        "Credential system integration",
        "Site-specific compliance requirements",
      ],
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#0F1115]">
      <Container>
        <div className="mb-12">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold mb-4">
            Vendor Integration
          </h2>
          <p className="text-[#9B978F] text-lg">
            We maintain a vetted network of preferred vendors and streamlined processes
            for external vendor onboarding. This flexibility lets you bring your partners
            while maintaining our operational standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {vendorCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-4">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[#9B978F] text-sm flex gap-2">
                    <span className="text-[#C49A6C] flex-shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
            Ready to Simplify Your Event Operations?
          </h2>
          <p className="text-[#9B978F] text-lg mb-8">
            Let our unified production team handle the complexity while you focus on
            creating an unforgettable experience.
          </p>
          <Button href="/inquire" variant="primary">
            Plan Your Event
          </Button>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ProductionPage() {
  return (
    <>
      <PageHeader />
      <ProductionModel />
      <OpsControl />
      <StaffingOverview />
      <SecurityModel />
      <CityCoordination />
      <VendorIntegration />
      <CTASection />
    </>
  );
}
