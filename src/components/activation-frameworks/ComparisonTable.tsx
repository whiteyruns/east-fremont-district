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

  const [open, setOpen] = useState<Set<string>>(new Set());

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

  return (
    <section className="py-24 bg-[#0A0C0F]">
      <Container>
        <div className="space-y-8">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
            Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2D33]">
                  <th className="text-left py-4 px-6 text-[#F0EDE8] font-bold">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 text-[#F0EDE8] font-bold">
                    Core
                  </th>
                  <th className="text-center py-4 px-6 text-[#F0EDE8] font-bold">
                    Expanded
                  </th>
                  <th className="text-center py-4 px-6 text-[#F0EDE8] font-bold">
                    Full Takeover
                  </th>
                </tr>
              </thead>

              {categories.map((category) => {
                const features = Array.from(
                  allFeatures.get(category) ?? []
                ).sort();
                const isOpen = open.has(category);
                const coreCount = features.filter((f) =>
                  isIncluded("core", f)
                ).length;
                const expandedCount = features.filter((f) =>
                  isIncluded("expanded", f)
                ).length;
                const fullCount = features.filter((f) =>
                  isIncluded("full-takeover", f)
                ).length;

                return (
                  <tbody key={category}>
                    {/* Category header — clickable */}
                    <tr
                      className="bg-[#1A1D23] border-y border-[#2A2D33] cursor-pointer select-none hover:bg-[#1E2128] transition-colors"
                      onClick={() => toggle(category)}
                    >
                      <td className="py-3 px-6">
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
                      <td className="text-center py-3 px-6">
                        <span className="text-[#9B978F] text-xs font-mono">
                          {coreCount}/{features.length}
                        </span>
                      </td>
                      <td className="text-center py-3 px-6">
                        <span className="text-[#9B978F] text-xs font-mono">
                          {expandedCount}/{features.length}
                        </span>
                      </td>
                      <td className="text-center py-3 px-6">
                        <span className="text-[#9B978F] text-xs font-mono">
                          {fullCount}/{features.length}
                        </span>
                      </td>
                    </tr>

                    {/* Feature rows — visible only when open */}
                    {isOpen &&
                      features.map((feature, i) => (
                        <tr
                          key={`${category}-${i}`}
                          className="border-b border-[#2A2D33] hover:bg-[#1A1D23] transition-colors"
                        >
                          <td className="py-3 px-6 pl-12 text-[#9B978F] text-sm">
                            {feature}
                          </td>
                          <td className="text-center py-3 px-6">
                            {isIncluded("core", feature) ? (
                              <Check size={18} className="text-[#C49A6C] mx-auto" />
                            ) : (
                              <Minus size={18} className="text-[#6B6760] mx-auto" />
                            )}
                          </td>
                          <td className="text-center py-3 px-6">
                            {isIncluded("expanded", feature) ? (
                              <Check size={18} className="text-[#C49A6C] mx-auto" />
                            ) : (
                              <Minus size={18} className="text-[#6B6760] mx-auto" />
                            )}
                          </td>
                          <td className="text-center py-3 px-6">
                            {isIncluded("full-takeover", feature) ? (
                              <Check size={18} className="text-[#C49A6C] mx-auto" />
                            ) : (
                              <Minus size={18} className="text-[#6B6760] mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
