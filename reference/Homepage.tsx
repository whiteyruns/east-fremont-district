// src/app/page.tsx
// Homepage — / route

import { HeroVideo } from "@/components/homepage/HeroVideo";
import { DistrictMetrics } from "@/components/homepage/DistrictMetrics";
import { InfrastructureSummary } from "@/components/homepage/InfrastructureSummary";
import { ActivationPreview } from "@/components/homepage/ActivationPreview";
import { CaseStudyPreview } from "@/components/homepage/CaseStudyPreview";
import { HomepageCTA } from "@/components/homepage/HomepageCTA";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <DistrictMetrics />
      <InfrastructureSummary />
      <ActivationPreview />
      <CaseStudyPreview />
      <HomepageCTA />
    </>
  );
}

// ─────────────────────────────────────────────
// src/components/homepage/HeroVideo.tsx
// ─────────────────────────────────────────────

export function HeroVideo() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C0F]/60 via-[#0A0C0F]/40 to-[#0F1115]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-[1280px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-4">
          Downtown Las Vegas
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
          Urban Event
          <br />
          Infrastructure
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[#9B978F] max-w-2xl leading-relaxed">
          A fully privatized, multi-venue district platform built for
          conventions, corporate programs, and large-format brand activations.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <a
            href="/inquire"
            className="px-6 py-3 text-sm font-medium bg-[#C49A6C] text-[#0F1115] rounded-md hover:bg-[#D4AA7C] transition-colors"
          >
            Submit Inquiry
          </a>
          <a
            href="/district"
            className="px-6 py-3 text-sm font-medium border border-[#2A2D33] text-[#F0EDE8] rounded-md hover:border-[#3A3D43] transition-colors"
          >
            Explore the District
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// src/components/homepage/DistrictMetrics.tsx
// ─────────────────────────────────────────────

import { MetricCard } from "@/components/ui/MetricCard";

const metrics = [
  { value: "3,550+", label: "Total Capacity", sublabel: "Combined indoor/outdoor" },
  { value: "5", label: "Venues", sublabel: "Unified operation" },
  { value: "42,500", label: "Sq Ft", sublabel: "Activated space" },
  { value: "3", label: "City Blocks", sublabel: "Privatized footprint" },
];

export function DistrictMetrics() {
  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// src/components/ui/MetricCard.tsx
// ─────────────────────────────────────────────

interface MetricCardProps {
  value: string;
  label: string;
  sublabel?: string;
}

export function MetricCard({ value, label, sublabel }: MetricCardProps) {
  return (
    <div className="text-center py-4">
      <div className="text-3xl md:text-4xl font-bold tracking-tight font-mono text-[#F0EDE8]">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-[#F0EDE8]">{label}</div>
      {sublabel && (
        <div className="mt-1 text-xs text-[#6B6760]">{sublabel}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/homepage/InfrastructureSummary.tsx
// ─────────────────────────────────────────────

import {
  Building2,
  Mic2,
  Palette,
  FileCheck,
} from "lucide-react";

const pillars = [
  {
    icon: Building2,
    title: "Venue Infrastructure",
    description:
      "Five interconnected venues with a combined 3,550+ capacity, full-service bars, kitchens, stages, and rooftop positions.",
  },
  {
    icon: Mic2,
    title: "Unified Production",
    description:
      "Single-operator production model covering sound, lighting, staging, staffing, and security across the entire district.",
  },
  {
    icon: Palette,
    title: "Branding Control",
    description:
      "Street-level wraps, building wraps, rooftop branding, stage naming, and digital signage under one activation agreement.",
  },
  {
    icon: FileCheck,
    title: "Permitting & Coordination",
    description:
      "Pre-established relationships with Metro, Fire Marshal, and City of Las Vegas for streamlined street closures and event permitting.",
  },
];

export function InfrastructureSummary() {
  return (
    <section className="py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
          Infrastructure
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Built for Scale
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 bg-[#1A1D23] border border-[#2A2D33] rounded-lg"
            >
              <pillar.icon
                size={24}
                className="text-[#C49A6C] mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
              <p className="text-sm text-[#9B978F] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// src/components/homepage/ActivationPreview.tsx
// ─────────────────────────────────────────────

import Link from "next/link";
import { activations } from "@/data/activations";

export function ActivationPreview() {
  return (
    <section className="py-24 bg-[#0A0C0F]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
          Activation Frameworks
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Scalable Packages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activations.map((framework) => (
            <div
              key={framework.id}
              className="p-6 bg-[#1A1D23] border border-[#2A2D33] rounded-lg flex flex-col"
            >
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-2">
                {framework.tier.replace("-", " ")}
              </div>
              <h3 className="text-xl font-semibold mb-2">{framework.name}</h3>
              <p className="text-sm text-[#9B978F] mb-4 flex-grow">
                {framework.positioningLine}
              </p>
              <div className="pt-4 border-t border-[#2A2D33]">
                <div className="text-sm text-[#6B6760]">Starting from</div>
                <div className="text-lg font-bold font-mono">
                  {framework.startingRange}
                </div>
                <div className="text-sm text-[#6B6760] mt-1">
                  {framework.idealGuestCount} guests
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/activation-frameworks"
            className="px-6 py-3 text-sm font-medium border border-[#2A2D33] text-[#F0EDE8] rounded-md hover:border-[#3A3D43] transition-colors"
          >
            Compare Frameworks
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// src/components/homepage/CaseStudyPreview.tsx
// ─────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/case-studies";

export function CaseStudyPreview() {
  const featured = caseStudies[0]; // Lead with strongest case study

  return (
    <section className="py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
          Proof of Execution
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Case Studies
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[16/10] bg-[#1A1D23] rounded-lg overflow-hidden">
            <Image
              src={featured.heroImageUrl}
              alt={featured.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-2">
              {featured.clientType.replace("-", " ")}
            </div>
            <h3 className="text-2xl font-semibold mb-4">{featured.title}</h3>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {featured.results.slice(0, 4).map((result) => (
                <div key={result.metric}>
                  <div className="text-2xl font-bold font-mono">
                    {result.value}
                  </div>
                  <div className="text-xs text-[#6B6760]">{result.metric}</div>
                </div>
              ))}
            </div>

            <p className="text-sm text-[#9B978F] leading-relaxed mb-6">
              {featured.summary.slice(0, 200)}...
            </p>

            <Link
              href={`/case-studies/${featured.slug}`}
              className="text-sm font-medium text-[#C49A6C] hover:text-[#D4AA7C] transition-colors"
            >
              Read Full Case Study →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// src/components/homepage/HomepageCTA.tsx
// ─────────────────────────────────────────────

import Link from "next/link";

export function HomepageCTA() {
  return (
    <section className="py-24 bg-[#1A1D23] border-y border-[#2A2D33]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Ready to Activate?
        </h2>
        <p className="text-lg text-[#9B978F] max-w-xl mx-auto mb-10">
          Submit an inquiry to begin scoping your event within the East Fremont
          District infrastructure.
        </p>
        <Link
          href="/inquire"
          className="inline-block px-8 py-4 text-base font-medium bg-[#C49A6C] text-[#0F1115] rounded-md hover:bg-[#D4AA7C] transition-colors"
        >
          Submit Inquiry
        </Link>
      </div>
    </section>
  );
}
