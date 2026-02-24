"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Venue } from "@/types/venue";

interface VenueDrawerProps {
  venue: Venue | null;
  onClose: () => void;
}

export default function VenueDrawer({ venue, onClose }: VenueDrawerProps) {
  if (!venue) return null;

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
                {
                  label: "Square Footage",
                  value: venue.squareFootage.toLocaleString(),
                },
                { label: "Bar Wells", value: venue.barWells },
                { label: "Kitchens", value: venue.kitchens },
                { label: "DJ Booths", value: venue.djBooths },
                { label: "Stages", value: venue.stages },
                { label: "Rooftop", value: venue.rooftop ? "Yes" : "No" },
                {
                  label: "ADA Accessible",
                  value: venue.adaAccessible ? "Yes" : "No",
                },
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
          {venue.features.length > 0 && (
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
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

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
