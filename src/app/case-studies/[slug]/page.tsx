import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { caseStudies } from "@/data/case-studies";
import { CaseStudy } from "@/types/case-study";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://eastfremontdistrict.com";

// ============================================================================
// STATIC PARAMS GENERATION
// ============================================================================
export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

// ============================================================================
// DYNAMIC METADATA
// ============================================================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    return { title: "Case Study Not Found" };
  }

  const description =
    caseStudy.summary.length > 160
      ? caseStudy.summary.slice(0, 157) + "..."
      : caseStudy.summary;

  return {
    title: caseStudy.title,
    description,
    openGraph: {
      title: `${caseStudy.title} | F.E.E.D.`,
      description,
      images: [
        {
          url: caseStudy.heroImageUrl || "/images/og/og-default.jpg",
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} | F.E.E.D.`,
      description,
      images: [caseStudy.heroImageUrl || "/images/og/og-default.jpg"],
    },
  };
}

// ============================================================================
// CLIENT TYPE BADGE
// ============================================================================
function ClientTypeBadge({ clientType }: { clientType: string }) {
  const typeColors: Record<string, string> = {
    corporate: "bg-[#C49A6C]/10 text-[#C49A6C]",
    convention: "bg-[#C49A6C]/10 text-[#C49A6C]",
    "brand-activation": "bg-[#C49A6C]/10 text-[#C49A6C]",
    association: "bg-[#C49A6C]/10 text-[#C49A6C]",
    private: "bg-[#C49A6C]/10 text-[#C49A6C]",
  };

  const typeLabels: Record<string, string> = {
    corporate: "Corporate",
    convention: "Convention",
    "brand-activation": "Brand Activation",
    association: "Association",
    private: "Private",
  };

  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded ${typeColors[clientType] || typeColors.corporate}`}>
      {typeLabels[clientType]}
    </span>
  );
}

// ============================================================================
// SCOPE TAG
// ============================================================================
function ScopeTag({ scope }: { scope: string }) {
  const scopeLabels: Record<string, string> = {
    "single-venue": "Single Venue",
    "multi-venue": "Multi-Venue",
    "street-activation": "Street Activation",
    "full-takeover": "Full Takeover",
    rooftop: "Rooftop",
    "stage-program": "Stage Program",
    "branding-package": "Branding Package",
  };

  return (
    <span className="bg-[#1A1D23] text-[#C49A6C] text-xs px-3 py-2 rounded border border-[#2A2D33]">
      {scopeLabels[scope] || scope}
    </span>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="relative h-[60vh] bg-[#1A1D23] flex items-center justify-center">
      {/* Hero Image */}
      <div className="absolute inset-0 bg-[#1A1D23]">
        {caseStudy.heroImageUrl ? (
          <Image
            src={caseStudy.heroImageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-[#6B6760] text-sm">Image Placeholder</p>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="mb-4 flex justify-center">
          <ClientTypeBadge clientType={caseStudy.clientType} />
        </div>
        <p className="text-[#9B978F] text-sm font-semibold mb-4">
          {caseStudy.date}
        </p>
        <h1 className="text-[#F0EDE8] text-4xl lg:text-5xl font-bold leading-tight max-w-3xl mx-auto">
          {caseStudy.title}
        </h1>
      </div>
    </section>
  );
}

// ============================================================================
// METRICS CALLOUT SECTION
// ============================================================================
function MetricsCallout({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="py-12 lg:py-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {caseStudy.results.map((result, index) => (
            <div key={index} className="text-center">
              <p className="text-[#F0EDE8] font-mono text-2xl lg:text-3xl font-bold mb-2">
                {result.value}
              </p>
              <p className="text-[#9B978F] text-xs lg:text-sm">
                {result.metric}
              </p>
              {result.context && (
                <p className="text-[#6B6760] text-xs mt-2">{result.context}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// OPERATIONAL SUMMARY SECTION
// ============================================================================
function OperationalSummary({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="py-12 lg:py-16 bg-[#0F1115]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Narrative */}
          <div>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold mb-6">
              Operational Summary
            </h2>
            <div className="space-y-4 text-[#9B978F] leading-relaxed">
              <p>{caseStudy.summary}</p>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-6">
            {/* Guest Count Card */}
            <Card className="p-6">
              <p className="text-[#9B978F] text-xs font-semibold uppercase mb-2">
                Guest Count
              </p>
              <p className="text-[#F0EDE8] font-mono text-3xl font-bold">
                {caseStudy.guestCount.toLocaleString()}
              </p>
            </Card>

            {/* Activation Scope */}
            {caseStudy.activationScope.length > 0 && (
              <div>
                <p className="text-[#9B978F] text-xs font-semibold uppercase mb-3">
                  Activation Scope
                </p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.activationScope.map((scope, index) => (
                    <ScopeTag key={index} scope={scope} />
                  ))}
                </div>
              </div>
            )}

            {/* Infrastructure Used */}
            {caseStudy.infrastructureUsed.length > 0 && (
              <div>
                <p className="text-[#9B978F] text-xs font-semibold uppercase mb-3">
                  Infrastructure Used
                </p>
                <ul className="space-y-2">
                  {caseStudy.infrastructureUsed.map((item, index) => (
                    <li
                      key={index}
                      className="text-[#F0EDE8] text-sm flex gap-2"
                    >
                      <span className="text-[#C49A6C] flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Custom Elements */}
            {caseStudy.customElements.length > 0 && (
              <div>
                <p className="text-[#9B978F] text-xs font-semibold uppercase mb-3">
                  Custom Elements
                </p>
                <ul className="space-y-2">
                  {caseStudy.customElements.map((item, index) => (
                    <li
                      key={index}
                      className="text-[#F0EDE8] text-sm flex gap-2"
                    >
                      <span className="text-[#C49A6C] flex-shrink-0">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// TESTIMONIAL SECTION
// ============================================================================
function TestimonialSection({ caseStudy }: { caseStudy: CaseStudy }) {
  if (!caseStudy.testimonial) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#0A0C0F]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="mb-6">
            <p className="text-[#F0EDE8] text-xl lg:text-2xl leading-relaxed mb-6">
              &ldquo;{caseStudy.testimonial.quote}&rdquo;
            </p>
          </blockquote>
          <div>
            <p className="text-[#F0EDE8] font-bold">
              {caseStudy.testimonial.attribution}
            </p>
            <p className="text-[#9B978F] text-sm">
              {caseStudy.testimonial.role}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// NARRATIVE GALLERY SECTION
// ============================================================================
function NarrativeGallery({ caseStudy }: { caseStudy: CaseStudy }) {
  if (!caseStudy.galleryImages || caseStudy.galleryImages.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#0F1115]">
      <Container>
        <div className="space-y-12">
          <h2 className="text-[#F0EDE8] text-3xl font-bold">
            The Full Story
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseStudy.galleryImages.map((src, i) => (
              <div
                key={src}
                className={`relative bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden ${
                  i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${caseStudy.title} — photo ${i + 1}`}
                  fill
                  className="object-cover"
                />
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
            Build Your Case Study
          </h2>
          <p className="text-[#9B978F] text-lg mb-8">
            Ready to create your own unforgettable event at F.E.E.D.?
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
interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

function buildEventJsonLd(caseStudy: CaseStudy) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    name: caseStudy.title,
    description: caseStudy.summary,
    startDate: caseStudy.date,
    location: {
      "@type": "EntertainmentBusiness",
      name: "F.E.E.D. — Fremont East Entertainment District",
      address: {
        "@type": "PostalAddress",
        streetAddress: "East Fremont Street",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89101",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Corner Bar Management",
      url: "https://www.cornerbarmgmt.com",
    },
    image: caseStudy.heroImageUrl || `${siteUrl}/images/og/og-default.jpg`,
    url: `${siteUrl}/case-studies/${caseStudy.slug}`,
  };

  if (caseStudy.guestCount) {
    jsonLd.maximumAttendeeCapacity = caseStudy.guestCount;
  }

  if (caseStudy.testimonial) {
    jsonLd.review = {
      "@type": "Review",
      reviewBody: caseStudy.testimonial.quote,
      author: {
        "@type": "Person",
        name: caseStudy.testimonial.attribution,
        jobTitle: caseStudy.testimonial.role,
      },
    };
  }

  return jsonLd;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  const eventJsonLd = buildEventJsonLd(caseStudy);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <HeroSection caseStudy={caseStudy} />
      <MetricsCallout caseStudy={caseStudy} />
      <OperationalSummary caseStudy={caseStudy} />
      <TestimonialSection caseStudy={caseStudy} />
      <NarrativeGallery caseStudy={caseStudy} />
      <CTASection />
    </>
  );
}
