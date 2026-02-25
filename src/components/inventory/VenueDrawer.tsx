"use client";

import { X } from "lucide-react";
import { Venue } from "@/types/venue";

interface VenueDrawerProps {
  venue: Venue | null;
  onClose: () => void;
}

export default function VenueDrawer({ venue, onClose }: VenueDrawerProps) {
  if (!venue) return null;

  const specs = [
    { label: "Capacity", value: venue.capacity?.toLocaleString() ?? "TBD" },
    {
      label: "Square Feet",
      value: venue.squareFeet?.toLocaleString() ?? "TBD",
    },
    { label: "Rooftop", value: venue.hasRooftop === true ? "Yes" : venue.hasRooftop === false ? "No" : "TBD" },
    { label: "Stage", value: venue.hasStage === true ? "Yes" : venue.hasStage === false ? "No" : "TBD" },
    { label: "Kitchen", value: venue.hasKitchen === true ? "Yes" : venue.hasKitchen === false ? "No" : "TBD" },
    { label: "ADA Accessible", value: venue.adaAccessible === true ? "Yes" : venue.adaAccessible === false ? "No" : "TBD" },
  ];

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

          {/* Operator */}
          {venue.operator && (
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-2">
                Operator
              </div>
              <p className="text-sm text-[#F0EDE8]">{venue.operator}</p>
            </div>
          )}

          {/* Specs */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B6760] mb-3">
              Specs
            </div>
            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec) => (
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
