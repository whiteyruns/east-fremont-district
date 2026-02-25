"use client";

import { useMemo } from "react";
import { Venue } from "@/types/venue";

export default function TotalsPanel({ venues }: { venues: Venue[] }) {
  const totals = useMemo(() => {
    const totalCapacity = venues.reduce((sum, v) => sum + (v.capacity ?? 0), 0);
    const totalSqFt = venues.reduce((sum, v) => sum + (v.squareFeet ?? 0), 0);
    const rooftops = venues.filter((v) => v.hasRooftop).length;
    const stages = venues.filter((v) => v.hasStage).length;
    const kitchens = venues.filter((v) => v.hasKitchen).length;

    return { totalCapacity, totalSqFt, rooftops, stages, kitchens };
  }, [venues]);

  const stats = [
    { label: "Venues", value: venues.length.toString() },
    { label: "Total Capacity", value: totals.totalCapacity.toLocaleString() },
    { label: "Sq Ft", value: `${(totals.totalSqFt / 1000).toFixed(0)}K` },
    { label: "Rooftops", value: totals.rooftops.toString() },
    { label: "Stages", value: totals.stages.toString() },
    { label: "Kitchens", value: totals.kitchens.toString() },
  ];

  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760]">
            District Totals
          </span>
          <div className="flex flex-wrap gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-bold font-mono">{stat.value}</div>
                <div className="text-xs text-[#6B6760]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
