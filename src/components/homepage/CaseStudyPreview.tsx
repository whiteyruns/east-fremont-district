import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { CaseStudy } from "@/types/case-study";

export default function CaseStudyPreview({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  // Use the first case study as featured
  const featured = caseStudies[0];
  if (!featured) return null;

  return (
    <section className="py-24 bg-[#0F1115]">
      <Container>
        <div className="space-y-16">
          <SectionHeading
            label="Proof of Execution"
            title="Case Studies"
            description="Real-world activations showcasing the capabilities of East Fremont District infrastructure."
          />

          {/* Featured Case Study */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left: Hero Image */}
            <div>
              <div className="aspect-[16/10] bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden relative">
                {featured.heroImageUrl ? (
                  <Image
                    src={featured.heroImageUrl}
                    alt={featured.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <p className="text-[#9B978F] text-lg">
                        Case Study Hero Image
                      </p>
                      <p className="text-[#6B6760] text-sm">
                        {featured.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Case Study Content */}
            <Card className="p-8 flex flex-col justify-between">
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-3">
                  <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
                    {featured.clientType.replace("-", " ")}
                  </p>
                  <h3 className="text-[#F0EDE8] text-2xl font-bold">
                    {featured.title}
                  </h3>
                  <p className="text-[#9B978F] text-sm">
                    {featured.date}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {featured.results.slice(0, 4).map((result, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-[#F0EDE8] font-mono font-bold text-lg">
                        {result.value}
                      </p>
                      <p className="text-[#9B978F] text-xs font-medium">
                        {result.metric}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <p className="text-[#9B978F] leading-relaxed text-sm">
                  {featured.summary}
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link href={`/case-studies/${featured.slug}`}>
                  <Button variant="ghost">
                    View Full Case Study →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
