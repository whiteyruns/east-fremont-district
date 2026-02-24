"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Users, Maximize2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { venues } from "@/data/venues";
import { filterVenues, FilterState, defaultFilters, filtersToParams } from "@/components/inventory/filterVenues";

export default function SearchTheDistrict() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const filtered = filterVenues(venues, filters);

  const handleExplore = () => {
    router.push(`/inventory${filtersToParams(filters)}`);
  };

  return (
    <section className="py-24 bg-[#0A0C0F]">
      <Container>
        <div className="space-y-12">
          <SectionHeading
            label="Search the District"
            title="Find Your Venue"
            description="Filter by zone, capacity, and features to identify the right infrastructure for your activation."
          />

          {/* Inline Filters */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-[#14161B] border border-[#2A2D33] ring-1 ring-[#2A2D33]/50 rounded-lg shadow-lg shadow-black/20">
            <select
              value={filters.zone}
              onChange={(e) =>
                setFilters({ ...filters, zone: e.target.value as FilterState["zone"] })
              }
              className="bg-[#24272E] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none"
            >
              <option value="all">All Zones</option>
              <option value="east">East</option>
              <option value="central">Central</option>
              <option value="west">West</option>
            </select>

            <select
              value={filters.capacity}
              onChange={(e) =>
                setFilters({ ...filters, capacity: e.target.value as FilterState["capacity"] })
              }
              className="bg-[#24272E] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none"
            >
              <option value="any">Any Capacity</option>
              <option value="under-300">Under 300</option>
              <option value="300-600">300 – 600</option>
              <option value="600-1000">600 – 1,000</option>
              <option value="1000+">1,000+</option>
            </select>

            {(
              [
                { key: "rooftop", label: "Rooftop" },
                { key: "kitchen", label: "Kitchen" },
                { key: "stage", label: "Stage" },
              ] as const
            ).map((feature) => (
              <label
                key={feature.key}
                className="flex items-center gap-2 text-sm text-[#9B978F] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters[feature.key]}
                  onChange={(e) =>
                    setFilters({ ...filters, [feature.key]: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-[#2A2D33] bg-[#24272E] text-[#C49A6C] accent-[#C49A6C] cursor-pointer"
                />
                {feature.label}
              </label>
            ))}

            <span className="ml-auto text-xs text-[#6B6760] font-mono">
              {filtered.length} venue{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, 3).map((venue) => (
              <div
                key={venue.id}
                className="bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-5 hover:border-[#3A3D43] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/25 transition-all duration-200 ease-out cursor-pointer"
                onClick={handleExplore}
              >
                <span className="inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#24272E] text-[#6B6760] rounded mb-2">
                  {venue.zone} zone
                </span>
                <h3 className="text-[#F0EDE8] font-semibold text-lg mb-1">
                  {venue.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#6B6760] mb-4">
                  <MapPin size={12} />
                  {venue.address}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#2A2D33]">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[#9B978F]" />
                    <div>
                      <div className="text-sm font-bold font-mono text-[#F0EDE8]">
                        {venue.totalCapacity.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#6B6760]">Capacity</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize2 size={14} className="text-[#9B978F]" />
                    <div>
                      <div className="text-sm font-bold font-mono text-[#F0EDE8]">
                        {(venue.squareFootage / 1000).toFixed(0)}K
                      </div>
                      <div className="text-[10px] text-[#6B6760]">Sq Ft</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-[#9B978F]">
                No venues match those criteria. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={handleExplore}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-[#C49A6C] text-[#0F1115] rounded-lg hover:bg-[#D4AA7C] transition-colors"
            >
              View Full Inventory
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
