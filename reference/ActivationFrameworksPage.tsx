// src/app/activation-frameworks/page.tsx
// Activation Frameworks — /activation-frameworks route
// Tiered activation packages with comparison matrix

import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { activations } from "@/data/activations";
import type { ActivationFramework, ActivationFeature } from "@/types/activation";

export default function ActivationFrameworksPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="py-16 bg-[#0A0C0F]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
            Packages
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Activation Frameworks
          </h1>
          <p className="mt-4 text-lg text-[#9B978F] max-w-2xl">
            Structured activation tiers designed to scale with your event scope —
            from single-venue programs to complete district takeovers.
          </p>
        </div>
      </section>

      {/* Framework Cards */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activations.map((framework) => (
              <FrameworkCard key={framework.id} framework={framework} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-[#0A0C0F]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            Feature Comparison
          </h2>
          <FrameworkComparison frameworks={activations} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1A1D23] border-y border-[#2A2D33]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Need a Custom Scope?
          </h2>
          <p className="text-lg text-[#9B978F] max-w-xl mx-auto mb-10">
            Every activation is tailored. Submit an inquiry and our team will
            build a framework that matches your event requirements.
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
// src/components/activations/FrameworkCard.tsx
// ─────────────────────────────────────────────

function FrameworkCard({ framework }: { framework: ActivationFramework }) {
  const isTopTier = framework.tier === "full-takeover";

  return (
    <div
      className={`
        relative p-8 rounded-lg flex flex-col
        ${
          isTopTier
            ? "bg-[#1A1D23] border-2 border-[#C49A6C]"
            : "bg-[#1A1D23] border border-[#2A2D33]"
        }
      `}
    >
      {isTopTier && (
        <span className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-medium uppercase tracking-wider bg-[#C49A6C] text-[#0F1115] rounded-full">
          Full Platform
        </span>
      )}

      <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-2">
        {framework.tier.replace(/-/g, " ")}
      </div>
      <h3 className="text-2xl font-bold mb-2">{framework.name}</h3>
      <p className="text-sm text-[#9B978F] leading-relaxed mb-6 flex-grow">
        {framework.description}
      </p>

      {/* Key Specs */}
      <div className="space-y-3 pt-6 border-t border-[#2A2D33]">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B6760]">Starting Range</span>
          <span className="text-sm font-bold font-mono">
            {framework.startingRange}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B6760]">Guest Count</span>
          <span className="text-sm font-medium font-mono">
            {framework.idealGuestCount}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B6760]">Venue Access</span>
          <span className="text-sm font-medium">{framework.venueAccess}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B6760]">Production</span>
          <span className="text-sm font-medium">
            {framework.productionLevel}
          </span>
        </div>
      </div>

      {/* Branding Included */}
      <div className="mt-6 pt-4 border-t border-[#2A2D33]">
        <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-2">
          Branding Included
        </div>
        <div className="flex flex-wrap gap-1.5">
          {framework.brandingIncluded.map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 text-[10px] font-medium bg-[#24272E] text-[#C49A6C] rounded"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/inquire"
        className={`
          mt-6 block w-full text-center px-6 py-3 text-sm font-medium rounded-md transition-colors
          ${
            isTopTier
              ? "bg-[#C49A6C] text-[#0F1115] hover:bg-[#D4AA7C]"
              : "border border-[#2A2D33] text-[#F0EDE8] hover:border-[#3A3D43]"
          }
        `}
      >
        Inquire
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/activations/FrameworkComparison.tsx
// ─────────────────────────────────────────────

function FrameworkComparison({
  frameworks,
}: {
  frameworks: ActivationFramework[];
}) {
  // Extract unique features grouped by category
  const categories = new Map<string, string[]>();
  frameworks.forEach((fw) => {
    fw.includedFeatures.forEach((f) => {
      if (!categories.has(f.category)) {
        categories.set(f.category, []);
      }
      const list = categories.get(f.category)!;
      if (!list.includes(f.feature)) {
        list.push(f.feature);
      }
    });
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-[#2A2D33]">
            <th className="text-left py-4 pr-4 text-sm font-medium text-[#6B6760]">
              Feature
            </th>
            {frameworks.map((fw) => (
              <th
                key={fw.id}
                className="text-center py-4 px-4 text-sm font-semibold text-[#F0EDE8]"
              >
                {fw.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(categories.entries()).map(([category, features]) => (
            <>
              {/* Category Header */}
              <tr key={`cat-${category}`}>
                <td
                  colSpan={frameworks.length + 1}
                  className="pt-6 pb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C]"
                >
                  {category}
                </td>
              </tr>
              {/* Feature Rows */}
              {features.map((feature) => (
                <tr
                  key={feature}
                  className="border-b border-[#1A1D23] hover:bg-[#1A1D23]/50"
                >
                  <td className="py-3 pr-4 text-sm text-[#9B978F]">
                    {feature}
                  </td>
                  {frameworks.map((fw) => {
                    const match = fw.includedFeatures.find(
                      (f) => f.feature === feature
                    );
                    const included = match?.included ?? false;
                    return (
                      <td key={fw.id} className="text-center py-3 px-4">
                        {included ? (
                          <Check
                            size={16}
                            className="mx-auto text-[#C49A6C]"
                          />
                        ) : (
                          <Minus
                            size={16}
                            className="mx-auto text-[#4A4740]"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
