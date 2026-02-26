import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { getCaseStudies } from "@/lib/airtable-case-studies";
import { CaseStudy } from "@/types/case-study";

export const dynamic = "force-dynamic";

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Proof of Execution"
          title="Case Studies"
          description="Explore how East Fremont District has powered transformative events across the corporate, convention, and brand activation landscapes."
        />
      </Container>
    </section>
  );
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
// CASE STUDY CARD
// ============================================================================
function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link href={`/case-studies/${caseStudy.slug}`}>
      <Card className="overflow-hidden hover:border-[#3A3D43] transition-colors h-full flex flex-col cursor-pointer">
        {/* Image Placeholder */}
        <div className="aspect-[16/10] bg-[#1A1D23] flex items-center justify-center">
          <p className="text-[#6B6760] text-sm">Image Placeholder</p>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Client Type Badge */}
          <div className="mb-3">
            <ClientTypeBadge clientType={caseStudy.clientType} />
          </div>

          {/* Title */}
          <h3 className="text-[#F0EDE8] font-bold text-lg mb-2 leading-tight">
            {caseStudy.title}
          </h3>

          {/* Summary Excerpt */}
          <p className="text-[#9B978F] text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {caseStudy.summary}
          </p>

          {/* Key Metrics */}
          <div className="space-y-2 pt-4 border-t border-[#2A2D33]">
            <div className="flex justify-between items-center">
              <span className="text-[#6B6760] text-xs font-semibold">
                Guest Count
              </span>
              <span className="text-[#F0EDE8] font-mono font-bold">
                {caseStudy.guestCount.toLocaleString()}
              </span>
            </div>
            {caseStudy.results.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-[#6B6760] text-xs font-semibold">
                  Key Metric
                </span>
                <span className="text-[#F0EDE8] font-mono font-bold text-sm">
                  {caseStudy.results[0].value}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

// ============================================================================
// CASE STUDIES GRID SECTION
// ============================================================================
function CaseStudiesGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section className="py-12 lg:py-16 bg-[#0F1115]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {caseStudies.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[#9B978F] text-lg">
              Case studies coming soon. Check back for our latest project highlights.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <PageHeader />
      <CaseStudiesGrid caseStudies={caseStudies} />
    </>
  );
}
