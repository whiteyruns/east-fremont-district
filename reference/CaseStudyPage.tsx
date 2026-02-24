// src/app/case-studies/[slug]/page.tsx
// Individual Case Study — /case-studies/:slug route

import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import type { CaseStudy } from "@/types/case-study";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default function CaseStudyPage({ params }: PageProps) {
  const study = caseStudies.find((cs) => cs.slug === params.slug);
  if (!study) return <div>Not found</div>; // Handle with notFound() in production

  return (
    <div className="pt-20 lg:pt-24">
      <CaseStudyHero study={study} />
      <MetricsCallout results={study.results} />
      <OperationalSummary study={study} />
      {study.testimonial && <Testimonial testimonial={study.testimonial} />}
      <GalleryGrid images={study.galleryImages} title={study.title} />

      {/* CTA */}
      <section className="py-24 bg-[#1A1D23] border-y border-[#2A2D33]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Build Your Case Study
          </h2>
          <p className="text-lg text-[#9B978F] max-w-xl mx-auto mb-10">
            Every activation adds to the district's operational track record.
            Start scoping yours.
          </p>
          <Link
            href="/inquire"
            className="inline-block px-8 py-4 text-base font-medium bg-[#C49A6C] text-[#0F1115] rounded-md hover:bg-[#D4AA7C] transition-colors"
          >
            Submit Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/case-studies/CaseStudyHero.tsx
// ─────────────────────────────────────────────

function CaseStudyHero({ study }: { study: CaseStudy }) {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      <Image
        src={study.heroImageUrl}
        alt={study.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/50 to-transparent" />

      <div className="relative z-10 flex flex-col justify-end h-full max-w-[1280px] mx-auto px-6 lg:px-12 pb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-[#C49A6C]/20 text-[#C49A6C] border border-[#C49A6C]/30 rounded">
            {study.clientType.replace(/-/g, " ")}
          </span>
          <span className="text-sm text-[#6B6760]">{study.date}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
          {study.title}
        </h1>
        {study.clientName && study.clientName !== "Confidential" && (
          <p className="mt-2 text-lg text-[#9B978F]">{study.clientName}</p>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// src/components/case-studies/MetricsCallout.tsx
// ─────────────────────────────────────────────

import type { CaseStudyResult } from "@/types/case-study";

function MetricsCallout({ results }: { results: CaseStudyResult[] }) {
  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {results.map((result) => (
            <div key={result.metric} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-mono text-[#C49A6C]">
                {result.value}
              </div>
              <div className="mt-2 text-sm font-medium text-[#F0EDE8]">
                {result.metric}
              </div>
              {result.context && (
                <div className="mt-1 text-xs text-[#6B6760]">
                  {result.context}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// src/components/case-studies/OperationalSummary.tsx
// ─────────────────────────────────────────────

function OperationalSummary({ study }: { study: CaseStudy }) {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Narrative */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Operational Summary
            </h2>
            <p className="text-[#9B978F] leading-relaxed">{study.summary}</p>
          </div>

          {/* Structured Details */}
          <div className="space-y-8">
            {/* Activation Scope */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
                Activation Scope
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.activationScope.map((scope) => (
                  <span
                    key={scope}
                    className="px-3 py-1 text-xs font-medium bg-[#24272E] text-[#9B978F] rounded-full"
                  >
                    {scope.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>

            {/* Infrastructure Used */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
                Infrastructure Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.infrastructureUsed.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs font-medium bg-[#1A1D23] border border-[#2A2D33] text-[#F0EDE8] rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Custom Elements */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
                Custom Elements
              </h3>
              <div className="space-y-2">
                {study.customElements.map((element) => (
                  <div
                    key={element}
                    className="flex items-start gap-2 text-sm text-[#9B978F]"
                  >
                    <span className="text-[#C49A6C] mt-1 shrink-0">—</span>
                    {element}
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Count */}
            <div className="p-4 bg-[#1A1D23] border border-[#2A2D33] rounded-lg">
              <div className="text-xs text-[#6B6760] mb-1">Total Attendance</div>
              <div className="text-2xl font-bold font-mono">
                {study.guestCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Testimonial
// ─────────────────────────────────────────────

function Testimonial({
  testimonial,
}: {
  testimonial: NonNullable<CaseStudy["testimonial"]>;
}) {
  return (
    <section className="py-16 bg-[#0A0C0F]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
        <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-[#F0EDE8] mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="text-sm text-[#9B978F]">
          <span className="font-medium text-[#F0EDE8]">
            {testimonial.attribution}
          </span>
          <span className="mx-2 text-[#2A2D33]">|</span>
          {testimonial.role}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// src/components/case-studies/GalleryGrid.tsx
// ─────────────────────────────────────────────

function GalleryGrid({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-6">
          Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((src, idx) => (
            <div
              key={src}
              className="relative aspect-[4/3] bg-[#1A1D23] rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`${title} — Image ${idx + 1}`}
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
