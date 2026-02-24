"use client";

import { useState, useMemo } from "react";
import { MapPin, Check, Minus, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { venues } from "@/data/venues";
import { Venue } from "@/types/venue";

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Infrastructure"
          title="Venue Inventory"
          description="Explore our five premium venues across East Fremont District. Each venue offers distinct character, technical capabilities, and flexible configurations for activations of any scope."
        />
      </Container>
    </section>
  );
}

// ============================================================================
// DISTRICT TOTALS PANEL
// ============================================================================
interface DistrictTotals {
  totalVenues: number;
  totalCapacity: number;
  totalBarWells: number;
  totalStages: number;
  totalSquareFootage: number;
}

function DistrictTotalsPanel() {
  const totals = useMemo(() => {
    const result: DistrictTotals = {
      totalVenues: venues.length,
      totalCapacity: 0,
      totalBarWells: 0,
      totalStages: 0,
      totalSquareFootage: 0,
    };

    venues.forEach((venue) => {
      result.totalCapacity += venue.totalCapacity;
      result.totalBarWells += venue.barWells;
      result.totalStages += venue.stages;
      result.totalSquareFootage += venue.squareFootage;
    });

    return result;
  }, []);

  const metrics = [
    {
      value: totals.totalCapacity.toLocaleString(),
      label: "Total Capacity",
    },
    {
      value: totals.totalVenues,
      label: "Venues",
    },
    {
      value: totals.totalBarWells,
      label: "Bar Wells",
    },
    {
      value: totals.totalStages,
      label: "Stages",
    },
    {
      value: `${(totals.totalSquareFootage / 1000).toFixed(1)}K`,
      label: "Sq Ft",
    },
  ];

  return (
    <section className="bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-[#F0EDE8] font-mono text-2xl lg:text-3xl font-bold mb-2">
                {metric.value}
              </p>
              <p className="text-[#9B978F] text-xs lg:text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// VENUE FILTER BAR
// ============================================================================
interface FilterState {
  zone: "all" | "east" | "central" | "west";
  capacity: "any" | "under-300" | "300-600" | "600-1000" | "1000+";
  rooftop: boolean;
  ada: boolean;
  kitchen: boolean;
  stage: boolean;
}

function VenueFilterBar({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}) {
  const handleClearAll = () => {
    setFilters({
      zone: "all",
      capacity: "any",
      rooftop: false,
      ada: false,
      kitchen: false,
      stage: false,
    });
  };

  return (
    <div className="sticky top-0 z-40 bg-[#0F1115] border-b border-[#2A2D33]">
      <Container>
        <div className="py-6">
          <div className="bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Zone Select */}
              <div>
                <label className="block text-[#9B978F] text-xs font-semibold mb-2">
                  Zone
                </label>
                <select
                  value={filters.zone}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      zone: e.target.value as FilterState["zone"],
                    })
                  }
                  className="w-full bg-[#24272E] border border-[#2A2D33] rounded px-3 py-2 text-[#F0EDE8] text-sm focus:outline-none focus:border-[#C49A6C]"
                >
                  <option value="all">All Zones</option>
                  <option value="east">East</option>
                  <option value="central">Central</option>
                  <option value="west">West</option>
                </select>
              </div>

              {/* Capacity Select */}
              <div>
                <label className="block text-[#9B978F] text-xs font-semibold mb-2">
                  Capacity
                </label>
                <select
                  value={filters.capacity}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      capacity: e.target.value as FilterState["capacity"],
                    })
                  }
                  className="w-full bg-[#24272E] border border-[#2A2D33] rounded px-3 py-2 text-[#F0EDE8] text-sm focus:outline-none focus:border-[#C49A6C]"
                >
                  <option value="any">Any</option>
                  <option value="under-300">Under 300</option>
                  <option value="300-600">300 - 600</option>
                  <option value="600-1000">600 - 1,000</option>
                  <option value="1000+">1,000+</option>
                </select>
              </div>
            </div>

            {/* Feature Checkboxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-[#2A2D33]">
              {[
                {
                  key: "rooftop",
                  label: "Rooftop",
                  checked: filters.rooftop,
                },
                { key: "ada", label: "ADA", checked: filters.ada },
                {
                  key: "kitchen",
                  label: "Kitchen",
                  checked: filters.kitchen,
                },
                { key: "stage", label: "Stage", checked: filters.stage },
              ].map((feature) => (
                <label
                  key={feature.key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      feature.key === "rooftop"
                        ? filters.rooftop
                        : feature.key === "ada"
                        ? filters.ada
                        : feature.key === "kitchen"
                        ? filters.kitchen
                        : filters.stage
                    }
                    onChange={(e) => {
                      if (feature.key === "rooftop") {
                        setFilters({ ...filters, rooftop: e.target.checked });
                      } else if (feature.key === "ada") {
                        setFilters({ ...filters, ada: e.target.checked });
                      } else if (feature.key === "kitchen") {
                        setFilters({ ...filters, kitchen: e.target.checked });
                      } else if (feature.key === "stage") {
                        setFilters({ ...filters, stage: e.target.checked });
                      }
                    }}
                    className="w-4 h-4 accent-[#C49A6C] cursor-pointer"
                  />
                  <span className="text-[#9B978F] text-sm">
                    {feature.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Clear All Button */}
            <div className="flex justify-end pt-2 border-t border-[#2A2D33]">
              <button
                onClick={handleClearAll}
                className="text-[#C49A6C] hover:text-[#D4AA7C] text-sm font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

// ============================================================================
// VENUE CARD
// ============================================================================
function VenueCard({
  venue,
  onSelect,
}: {
  venue: Venue;
  onSelect: (venue: Venue) => void;
}) {
  const getZoneColor = (zone: string) => {
    switch (zone) {
      case "east":
        return "bg-[#C49A6C]";
      case "central":
        return "bg-[#9B978F]";
      case "west":
        return "bg-[#6B6760]";
      default:
        return "bg-[#2A2D33]";
    }
  };

  return (
    <Card
      className="overflow-hidden hover:border-[#3A3D43] transition-colors cursor-pointer h-full flex flex-col"
      onClick={() => onSelect(venue)}
    >
      {/* Image Placeholder */}
      <div className="aspect-[16/10] bg-[#24272E] flex items-center justify-center relative">
        <p className="text-[#6B6760] text-sm">Image Placeholder</p>
        <div
          className={`absolute top-4 right-4 ${getZoneColor(venue.zone)} text-[#0F1115] px-3 py-1 rounded text-xs font-semibold uppercase`}
        >
          {venue.zone}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Name */}
        <h3 className="text-[#F0EDE8] font-bold text-lg mb-1">
          {venue.name}
        </h3>

        {/* Address */}
        <div className="flex gap-2 mb-4 flex-1">
          <MapPin size={16} className="text-[#C49A6C] flex-shrink-0 mt-1" />
          <p className="text-[#9B978F] text-sm">{venue.address}</p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-[#2A2D33]">
          <div className="text-center">
            <p className="font-mono text-[#F0EDE8] font-bold">
              {venue.totalCapacity}
            </p>
            <p className="text-[#9B978F] text-xs mt-1">Capacity</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-[#F0EDE8] font-bold">
              {venue.barWells}
            </p>
            <p className="text-[#9B978F] text-xs mt-1">Bar Wells</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-[#F0EDE8] font-bold">
              {venue.stages}
            </p>
            <p className="text-[#9B978F] text-xs mt-1">Stages</p>
          </div>
        </div>

        {/* Feature Tags */}
        {(venue.rooftop || venue.adaAccessible || venue.kitchens > 0) && (
          <div className="flex flex-wrap gap-2">
            {venue.rooftop && (
              <span className="bg-[#24272E] text-[#C49A6C] text-xs px-2 py-1 rounded">
                Rooftop
              </span>
            )}
            {venue.adaAccessible && (
              <span className="bg-[#24272E] text-[#C49A6C] text-xs px-2 py-1 rounded">
                ADA
              </span>
            )}
            {venue.kitchens > 0 && (
              <span className="bg-[#24272E] text-[#C49A6C] text-xs px-2 py-1 rounded">
                Kitchen
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

// ============================================================================
// VENUE DETAIL DRAWER
// ============================================================================
function VenueDetailDrawer({
  venue,
  isOpen,
  onClose,
}: {
  venue: Venue | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !venue) return null;

  const brandingCapabilityLabels: Record<string, string> = {
    "building-wrap": "Building Wrap",
    "street-wrap": "Street Wrap",
    rooftop: "Rooftop",
    "stage-naming": "Stage Naming",
    "digital-signage": "Digital Signage",
    "interior-branding": "Interior Branding",
    "beverage-program": "Beverage Program",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-lg bg-[#0F1115] border-l border-[#2A2D33] z-50 overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1A1D23] border-b border-[#2A2D33] p-6 flex items-center justify-between">
          <h2 className="text-[#F0EDE8] font-bold text-2xl">
            {venue.name}
          </h2>
          <button
            onClick={onClose}
            className="text-[#9B978F] hover:text-[#F0EDE8] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Image Placeholder */}
          <div className="aspect-[4/3] bg-[#24272E] rounded-lg flex items-center justify-center">
            <p className="text-[#6B6760] text-sm">Image Placeholder</p>
          </div>

          {/* Location & Zone */}
          <div>
            <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-2">
              Location
            </h3>
            <div className="flex gap-3">
              <div>
                <p className="text-[#F0EDE8]">{venue.address}</p>
                <span className="inline-block bg-[#C49A6C] text-[#0F1115] px-2 py-1 rounded text-xs font-semibold uppercase mt-2">
                  {venue.zone} Zone
                </span>
              </div>
            </div>
          </div>

          {/* Capacity Breakdown */}
          <div>
            <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-4">
              Capacity
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-mono text-[#F0EDE8] font-bold text-lg">
                  {venue.indoorCapacity}
                </p>
                <p className="text-[#9B978F] text-xs mt-1">Indoor</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-[#F0EDE8] font-bold text-lg">
                  {venue.outdoorCapacity}
                </p>
                <p className="text-[#9B978F] text-xs mt-1">Outdoor</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-[#F0EDE8] font-bold text-lg">
                  {venue.totalCapacity}
                </p>
                <p className="text-[#9B978F] text-xs mt-1">Total</p>
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          <div>
            <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-4">
              Infrastructure
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-[#9B978F]">Square Footage</span>
                <span className="font-mono text-[#F0EDE8]">
                  {venue.squareFootage.toLocaleString()}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#9B978F]">Bar Wells</span>
                <span className="font-mono text-[#F0EDE8]">
                  {venue.barWells}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#9B978F]">Kitchens</span>
                <span className="font-mono text-[#F0EDE8]">
                  {venue.kitchens}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#9B978F]">DJ Booths</span>
                <span className="font-mono text-[#F0EDE8]">
                  {venue.djBooths}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#9B978F]">Stages</span>
                <span className="font-mono text-[#F0EDE8]">
                  {venue.stages}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#9B978F]">Rooftop</span>
                <span className="font-mono text-[#F0EDE8]">
                  {venue.rooftop ? "Yes" : "No"}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#9B978F]">ADA Accessible</span>
                <span className="font-mono text-[#F0EDE8]">
                  {venue.adaAccessible ? "Yes" : "No"}
                </span>
              </li>
            </ul>
          </div>

          {/* Branding Capabilities */}
          <div>
            <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-4">
              Branding Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {venue.brandingCapabilities.map((capability) => (
                <span
                  key={capability}
                  className="bg-[#24272E] text-[#C49A6C] text-xs px-3 py-2 rounded"
                >
                  {brandingCapabilityLabels[capability]}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          {venue.features.length > 0 && (
            <div>
              <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-4">
                Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {venue.features.map((feature) => (
                  <span
                    key={feature}
                    className="bg-[#24272E] text-[#9B978F] text-xs px-3 py-2 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {venue.notes && (
            <div>
              <h3 className="text-[#C49A6C] font-bold text-sm uppercase mb-2">
                Notes
              </h3>
              <p className="text-[#9B978F]">{venue.notes}</p>
            </div>
          )}

          {/* CTA Button */}
          <Button href="/inquire" variant="primary" className="w-full">
            Inquire About This Venue
          </Button>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
function filterVenues(venues: Venue[], filters: FilterState): Venue[] {
  return venues.filter((venue) => {
    // Zone filter
    if (filters.zone !== "all" && venue.zone !== filters.zone) {
      return false;
    }

    // Capacity filter
    if (filters.capacity !== "any") {
      const capacity = venue.totalCapacity;
      if (filters.capacity === "under-300" && capacity >= 300) return false;
      if (filters.capacity === "300-600" && (capacity < 300 || capacity > 600))
        return false;
      if (
        filters.capacity === "600-1000" &&
        (capacity < 600 || capacity > 1000)
      )
        return false;
      if (filters.capacity === "1000+" && capacity < 1000) return false;
    }

    // Feature filters
    if (filters.rooftop && !venue.rooftop) return false;
    if (filters.ada && !venue.adaAccessible) return false;
    if (filters.kitchen && venue.kitchens === 0) return false;
    if (filters.stage && venue.stages === 0) return false;

    return true;
  });
}

export default function InventoryPage() {
  const [filters, setFilters] = useState<FilterState>({
    zone: "all",
    capacity: "any",
    rooftop: false,
    ada: false,
    kitchen: false,
    stage: false,
  });

  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredVenues = filterVenues(venues, filters);

  const handleSelectVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <PageHeader />
      <DistrictTotalsPanel />
      <VenueFilterBar filters={filters} setFilters={setFilters} />

      {/* Venue Grid Section */}
      <section className="py-12 lg:py-16 bg-[#0F1115]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onSelect={handleSelectVenue}
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
      <VenueDetailDrawer
        venue={selectedVenue}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
