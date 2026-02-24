"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { venues } from "@/data/venues";
import { Venue } from "@/types/venue";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TotalsPanel from "@/components/inventory/TotalsPanel";
import FilterBar from "@/components/inventory/FilterBar";
import VenueCard from "@/components/inventory/VenueCard";
import VenueDrawer from "@/components/inventory/VenueDrawer";
import {
  FilterState,
  defaultFilters,
  filterVenues,
  filtersFromParams,
  filtersToParams,
} from "@/components/inventory/filterVenues";

export default function InventoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFiltersRaw] = useState<FilterState>(() =>
    filtersFromParams(searchParams)
  );
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const setFilters = useCallback(
    (next: FilterState) => {
      setFiltersRaw(next);
      router.replace(`/inventory${filtersToParams(next)}`, { scroll: false });
    },
    [router]
  );

  // Sync if user navigates back/forward
  useEffect(() => {
    setFiltersRaw(filtersFromParams(searchParams));
  }, [searchParams]);

  const filteredVenues = filterVenues(venues, filters);

  return (
    <>
      {/* Page Header */}
      <section className="pt-20 lg:pt-24 pb-12 bg-[#0A0C0F]">
        <Container>
          <SectionHeading
            label="Infrastructure"
            title="Venue Inventory"
            description="Searchable database of all district venue infrastructure. Filter by zone, capacity, and features."
          />
        </Container>
      </section>

      {/* District Totals */}
      <TotalsPanel venues={venues} />

      {/* Filter Bar + Venue Grid */}
      <section className="py-12 bg-[#0F1115]">
        <Container>
          <FilterBar filters={filters} setFilters={setFilters} />

          <p className="text-xs text-[#6B6760] tracking-wide border-b border-[#2A2D33] pb-4 mb-12">
            All venues operate under a unified production and permitting framework.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onSelect={setSelectedVenue}
              />
            ))}
          </div>

          {filteredVenues.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-[#9B978F] text-lg">
                No venues match your filters. Try adjusting your criteria.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Detail Drawer */}
      <VenueDrawer
        venue={selectedVenue}
        onClose={() => setSelectedVenue(null)}
      />
    </>
  );
}
