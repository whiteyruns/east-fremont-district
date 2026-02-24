// src/app/inventory/page.tsx
// Inventory Page — /inventory route
// Searchable venue infrastructure database with filters and detail drawer

"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { venues } from "@/data/venues";
import type { Venue, VenueFilter, DistrictTotals } from "@/types/venue";

export default function InventoryPage() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="py-16 bg-[#0A0C0F]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
            Infrastructure
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Venue Inventory
          </h1>
          <p className="mt-4 text-lg text-[#9B978F] max-w-2xl">
            Searchable database of all district venue infrastructure. Filter by
            zone, capacity, and features.
          </p>
        </div>
      </section>

      {/* District Totals */}
      <DistrictTotalsPanel venues={venues} />

      {/* Filter Bar + Grid */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <VenueFilterBar />
          <VenueGrid
            venues={venues}
            onSelect={(venue) => setSelectedVenue(venue)}
          />
        </div>
      </section>

      {/* Detail Drawer */}
      {selectedVenue && (
        <VenueDetailDrawer
          venue={selectedVenue}
          onClose={() => setSelectedVenue(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/inventory/DistrictTotalsPanel.tsx
// ─────────────────────────────────────────────

function DistrictTotalsPanel({ venues }: { venues: Venue[] }) {
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
    { label: "Stages", value: totals.totalStages.toString() },
    {
      label: "Sq Ft",
      value: totals.totalSquareFootage.toLocaleString(),
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

// ─────────────────────────────────────────────
// src/components/inventory/VenueFilterBar.tsx
// ─────────────────────────────────────────────

function VenueFilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-[#1A1D23] border border-[#2A2D33] rounded-lg">
      {/* Zone Filter */}
      <select className="bg-[#24272E] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none">
        <option value="">All Zones</option>
        <option value="east">East</option>
        <option value="central">Central</option>
        <option value="west">West</option>
      </select>

      {/* Capacity Filter */}
      <select className="bg-[#24272E] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none">
        <option value="">Any Capacity</option>
        <option value="0-300">Under 300</option>
        <option value="300-600">300 – 600</option>
        <option value="600-1000">600 – 1,000</option>
        <option value="1000+">1,000+</option>
      </select>

      {/* Feature Toggles */}
      <label className="flex items-center gap-2 text-sm text-[#9B978F] cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-[#2A2D33] bg-[#24272E] text-[#C49A6C] focus:ring-[#C49A6C]"
        />
        Rooftop
      </label>

      <label className="flex items-center gap-2 text-sm text-[#9B978F] cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-[#2A2D33] bg-[#24272E] text-[#C49A6C] focus:ring-[#C49A6C]"
        />
        ADA Accessible
      </label>

      <label className="flex items-center gap-2 text-sm text-[#9B978F] cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-[#2A2D33] bg-[#24272E] text-[#C49A6C] focus:ring-[#C49A6C]"
        />
        Kitchen
      </label>

      <label className="flex items-center gap-2 text-sm text-[#9B978F] cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-[#2A2D33] bg-[#24272E] text-[#C49A6C] focus:ring-[#C49A6C]"
        />
        Stage
      </label>

      {/* Clear Filters */}
      <button className="ml-auto text-xs text-[#C49A6C] hover:text-[#D4AA7C] transition-colors">
        Clear All
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/inventory/VenueGrid.tsx
// ─────────────────────────────────────────────

import Image from "next/image";
import { MapPin, Users, Wine, Mic2, ChefHat } from "lucide-react";

function VenueGrid({
  venues,
  onSelect,
}: {
  venues: Venue[];
  onSelect: (venue: Venue) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} onSelect={onSelect} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/inventory/VenueCard.tsx
// ─────────────────────────────────────────────

function VenueCard({
  venue,
  onSelect,
}: {
  venue: Venue;
  onSelect: (venue: Venue) => void;
}) {
  return (
    <button
      onClick={() => onSelect(venue)}
      className="text-left bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden hover:border-[#3A3D43] transition-colors group"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-[#24272E]">
        <Image
          src={venue.imageUrl}
          alt={venue.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
        {/* Zone Badge */}
        <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-medium uppercase tracking-wider bg-[#0F1115]/80 text-[#F0EDE8] rounded">
          {venue.zone}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-1">{venue.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-[#6B6760] mb-4">
          <MapPin size={12} />
          {venue.address}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#2A2D33]">
          <div className="text-center">
            <Users size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">
              {venue.totalCapacity}
            </div>
            <div className="text-[10px] text-[#6B6760]">Capacity</div>
          </div>
          <div className="text-center">
            <Wine size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">{venue.barWells}</div>
            <div className="text-[10px] text-[#6B6760]">Bar Wells</div>
          </div>
          <div className="text-center">
            <Mic2 size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">{venue.stages}</div>
            <div className="text-[10px] text-[#6B6760]">Stages</div>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {venue.rooftop && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#24272E] text-[#9B978F] rounded">
              Rooftop
            </span>
          )}
          {venue.kitchens > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#24272E] text-[#9B978F] rounded">
              Kitchen
            </span>
          )}
          {venue.adaAccessible && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#24272E] text-[#9B978F] rounded">
              ADA
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────
// src/components/inventory/VenueDetailDrawer.tsx
// ─────────────────────────────────────────────

import { X } from "lucide-react";

function VenueDetailDrawer({
  venue,
  onClose,
}: {
  venue: Venue;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-[#0A0C0F]/85"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-[#1A1D23] border-l border-[#2A2D33] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1A1D23] border-b border-[#2A2D33] px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{venue.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#9B978F] hover:text-[#F0EDE8] transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          {/* Image */}
          <div className="relative aspect-[16/10] bg-[#24272E] rounded-lg overflow-hidden">
            <Image
              src={venue.imageUrl}
              alt={venue.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Location */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-2">
              Location
            </div>
            <p className="text-sm text-[#F0EDE8]">{venue.address}</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#24272E] text-[#C49A6C] rounded">
              {venue.zone} zone
            </span>
          </div>

          {/* Capacity Breakdown */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-3">
              Capacity
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-[#24272E] rounded-md text-center">
                <div className="text-xl font-bold font-mono">
                  {venue.indoorCapacity}
                </div>
                <div className="text-[10px] text-[#6B6760] mt-1">Indoor</div>
              </div>
              <div className="p-3 bg-[#24272E] rounded-md text-center">
                <div className="text-xl font-bold font-mono">
                  {venue.outdoorCapacity}
                </div>
                <div className="text-[10px] text-[#6B6760] mt-1">Outdoor</div>
              </div>
              <div className="p-3 bg-[#24272E] rounded-md text-center">
                <div className="text-xl font-bold font-mono">
                  {venue.totalCapacity}
                </div>
                <div className="text-[10px] text-[#6B6760] mt-1">Total</div>
              </div>
            </div>
          </div>

          {/* Infrastructure Specs */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-3">
              Infrastructure
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Square Footage", value: venue.squareFootage.toLocaleString() },
                { label: "Bar Wells", value: venue.barWells },
                { label: "Kitchens", value: venue.kitchens },
                { label: "DJ Booths", value: venue.djBooths },
                { label: "Stages", value: venue.stages },
                { label: "Rooftop", value: venue.rooftop ? "Yes" : "No" },
                { label: "ADA Accessible", value: venue.adaAccessible ? "Yes" : "No" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between py-2 border-b border-[#2A2D33]"
                >
                  <span className="text-sm text-[#9B978F]">{spec.label}</span>
                  <span className="text-sm font-medium font-mono">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Branding Capabilities */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-3">
              Branding Capabilities
            </div>
            <div className="flex flex-wrap gap-2">
              {venue.brandingCapabilities.map((cap) => (
                <span
                  key={cap}
                  className="px-3 py-1 text-xs font-medium bg-[#24272E] text-[#C49A6C] border border-[#8B7355]/30 rounded-full"
                >
                  {cap.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-3">
              Features
            </div>
            <div className="flex flex-wrap gap-2">
              {venue.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 text-xs font-medium bg-[#24272E] text-[#9B978F] rounded-full"
                >
                  {feature.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          {venue.notes && (
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-2">
                Notes
              </div>
              <p className="text-sm text-[#9B978F]">{venue.notes}</p>
            </div>
          )}

          {/* CTA */}
          <a
            href={`/inquire?venue=${venue.slug}`}
            className="block w-full text-center px-6 py-3 text-sm font-medium bg-[#C49A6C] text-[#0F1115] rounded-md hover:bg-[#D4AA7C] transition-colors"
          >
            Inquire About This Venue
          </a>
        </div>
      </div>
    </>
  );
}
