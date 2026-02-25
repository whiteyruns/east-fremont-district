"use client";

import { FilterState, defaultFilters } from "./filterVenues";

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const handleClearAll = () => setFilters(defaultFilters);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-10 p-4 bg-[#14161B] border border-[#2A2D33] ring-1 ring-[#2A2D33]/50 rounded-lg shadow-lg shadow-black/20">
      {/* Zone Filter */}
      <select
        value={filters.zone}
        onChange={(e) =>
          setFilters({ ...filters, zone: e.target.value as FilterState["zone"] })
        }
        className="bg-[#24272E] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none"
      >
        <option value="ALL">All Zones</option>
        <option value="EAST">East</option>
        <option value="CENTRAL">Central</option>
        <option value="WEST">West</option>
      </select>

      {/* Capacity Filter */}
      <select
        value={filters.capacity}
        onChange={(e) =>
          setFilters({
            ...filters,
            capacity: e.target.value as FilterState["capacity"],
          })
        }
        className="bg-[#24272E] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none"
      >
        <option value="any">Any Capacity</option>
        <option value="under-300">Under 300</option>
        <option value="300-600">300 – 600</option>
        <option value="600-1000">600 – 1,000</option>
        <option value="1000+">1,000+</option>
      </select>

      {/* Feature Toggles */}
      {(
        [
          { key: "rooftop", label: "Rooftop" },
          { key: "ada", label: "ADA Accessible" },
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

      {/* Clear All */}
      <button
        onClick={handleClearAll}
        className="ml-auto text-xs text-[#C49A6C] hover:text-[#D4AA7C] transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}
