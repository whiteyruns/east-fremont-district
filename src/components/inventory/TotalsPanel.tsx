"use client";

import { useMemo } from "react";
import { Venue } from "@/types/venue";
import { DistrictTotals } from "@/types/venue";

export default function TotalsPanel({ venues }: { venues: Venue[] }) {
  const totals = useMemo<DistrictTotals>(() => {
    return venues.reduce(
      (acc, v) => ({
        totalVenues: acc.totalVenues + 1,
        totalCapacity: acc.totalCapacity + v.totalCapacity,
        totalIndoorCapacity: acc.totalIndoorCapacity + v.indoorCapacity,
        totalOutdoorCapacity: acc.totalOutdoorCapacity + v.outdoorCapacity,
        totalSquareFootage: acc.totalSquareFootage + v.squareFootage,
        totalBarWells: acc.totalBarWells + v.barWells,
        totalKitchens: acc.totalKitchens + v.kitchens,
        totalStages: acc.totalStages + v.stages,
      }),
      {
        totalVenues: 0,
        totalCapacity: 0,
        totalIndoorCapacity: 0,
        totalOutdoorCapacity: 0,
        totalSquareFootage: 0,
        totalBarWells: 0,
        totalKitchens: 0,
        totalStages: 0,
      }
    );
  }, [venues]);

  const stats = [
    { label: "Total Capacity", value: totals.totalCapacity.toLocaleString() },
    { label: "Venues", value: totals.totalVenues.toString() },
    { label: "Bar Wells", value: totals.totalBarWells.toString() },
    { label: "Kitchens", value: totals.totalKitchens.toString() },
    { label: "Stages", value: totals.totalStages.toString() },
    {
      label: "Sq Ft",
      value: `${(totals.totalSquareFootage / 1000).toFixed(0)}K`,
    },
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
