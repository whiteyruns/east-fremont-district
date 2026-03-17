'use client';

import { useState } from "react";
import { Check, Minus, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import { ActivationFramework } from "@/types/activation";

export default function ComparisonTable({ frameworks }: { frameworks: ActivationFramework[] }) {
  // Build union of all features grouped by category
  const allFeatures = new Map<string, Set<string>>();
  frameworks.forEach((fw) => {
    fw.includedFeatures.forEach((f) => {
      if (!allFeatures.has(f.category)) {
        allFeatures.set(f.category, new Set());
      }
      allFeatures.get(f.category)!.add(f.feature);
    });
  });

  const categories = Array.from(allFeatures.keys()).sort();

  const [open, setOpen] = useState<Set<string>>(new Set(categories.length > 0 ? [categories[0]] : []));

  const toggle = (cat: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) { next.delete(cat); } else { next.add(cat); }
      return next;
    });

  const isIncluded = (
    tier: "core" | "expanded" | "full-takeover",
    feature: string
  ) => {
    const fw = frameworks.find((f) => f.tier === tier);
    const found = fw?.includedFeatures.find((f) => f.feature === feature);
    return found?.included ?? false;
  };

  const tiers = [
    { key: "core" as const, label: "Core" },
    { key: "expanded" as const, label: "Expanded" },
    { key: "full-takeover" as const, label: "Full Takeover" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A0C0F]">
      <Container>
        <div className="space-y-8">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
            Feature Comparison
          </h2>

          {/* Desktop: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2D33]">
                  <th className="text-left py-4 px-4 lg:px-6 text-[#F0EDE8] font-bold">
                    Feature
                  </th>
                  {tiers.map((tier) => (
                    <th key={tier.key} className="text-center py-4 px-4 lg:px-6 text-[#F0EDE8] font-bold">
                      {tier.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {categories.map((category) => {
                const features = Array.from(
                  allFeatures.get(category) ?? []
                ).sort();
                const isOpen = open.has(category);

                return (
                  <tbody key={category}>
                    <tr
                      className="bg-[#1A1D23] border-y border-[#2A2D33] cursor-pointer select-none hover:bg-[#1E2128] transition-colors"
                      onClick={() => toggle(category)}
                    >
                      <td className="py-3 px-4 lg:px-6">
                        <div className="flex items-center gap-2">
                          <ChevronDown
                            size={14}
                            className={`text-[#6B6760] transition-transform ${
                              isOpen ? "rotate-0" : "-rotate-90"
                            }`}
                          />
                          <p className="text-[#C49A6C] text-xs font-bold uppercase tracking-widest">
                            {category}
                          </p>
                          <span className="text-[#6B6760] text-[10px] ml-1">
                            {features.length} features
                          </span>
                        </div>
                      </td>
                      {tiers.map((tier) => {
                        const count = features.filter((f) => isIncluded(tier.key, f)).length;
                        return (
                          <td key={tier.key} className="text-center py-3 px-4 lg:px-6">
                            <span className="text-[#9B978F] text-xs font-mono">
                              {count}/{features.length}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {isOpen &&
                      features.map((feature, i) => (
                        <tr
                          key={`${category}-${i}`}
                          className="border-b border-[#2A2D33] hover:bg-[#1A1D23] transition-colors"
                        >
                          <td className="py-3 px-4 lg:px-6 pl-10 lg:pl-12 text-[#9B978F] text-sm">
                            {feature}
                          </td>
                          {tiers.map((tier) => (
                            <td key={tier.key} className="text-center py-3 px-4 lg:px-6">
                              {isIncluded(tier.key, feature) ? (
                                <Check size={18} className="text-[#C49A6C] mx-auto" />
                              ) : (
                                <Minus size={18} className="text-[#6B6760] mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                );
              })}
            </table>
          </div>

          {/* Mobile: Accordion Cards */}
          <div className="md:hidden space-y-3">
            {categories.map((category) => {
              const features = Array.from(
                allFeatures.get(category) ?? []
              ).sort();
              const isOpen = open.has(category);

              return (
                <div key={category} className="border border-[#2A2D33] rounded-lg overflow-hidden">
                  <button
                    className="w-full bg-[#1A1D23] px-4 py-3 flex items-center justify-between"
                    onClick={() => toggle(category)}
                  >
                    <div className="flex items-center gap-2">
                      <ChevronDown
                        size={14}
                        className={`text-[#6B6760] transition-transform ${
                          isOpen ? "rotate-0" : "-rotate-90"
                        }`}
                      />
                      <span className="text-[#C49A6C] text-xs font-bold uppercase tracking-widest">
                        {category}
                      </span>
                    </div>
                    <span className="text-[#6B6760] text-[10px]">
                      {features.length} features
                    </span>
                  </button>

                  {isOpen && (
                    <div className="divide-y divide-[#2A2D33]">
                      {features.map((feature, i) => (
                        <div key={`${category}-m-${i}`} className="px-4 py-3">
                          <p className="text-[#9B978F] text-sm mb-2">{feature}</p>
                          <div className="flex gap-4">
                            {tiers.map((tier) => (
                              <div key={tier.key} className="flex items-center gap-1.5">
                                {isIncluded(tier.key, feature) ? (
                                  <Check size={14} className="text-[#C49A6C]" />
                                ) : (
                                  <Minus size={14} className="text-[#6B6760]" />
                                )}
                                <span className="text-[10px] text-[#6B6760] uppercase">
                                  {tier.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
