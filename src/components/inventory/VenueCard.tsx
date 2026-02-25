"use client";

import Image from "next/image";
import { MapPin, Users, Maximize2, Mic2 } from "lucide-react";
import { Venue } from "@/types/venue";

const VENUES_WITH_PHOTOS = new Set([
  "eureka",
  "corduroy",
  "le-thai",
  "istanbul-mediterranean",
  "taco-escobar",
  "evel-pie",
  "electric-mushroom",
  "park-on-fremont",
  "cheapshot",
  "commonwealth",
  "laundry-room",
  "lucky-day",
  "la-mona-rosa",
  "discopussy",
  "we-all-scream",
  "the-griffin",
]);

interface VenueCardProps {
  venue: Venue;
  onSelect: (venue: Venue) => void;
}

export default function VenueCard({ venue, onSelect }: VenueCardProps) {
  const hasPhoto = VENUES_WITH_PHOTOS.has(venue.slug);

  return (
    <button
      onClick={() => onSelect(venue)}
      className="text-left bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden hover:border-[#3A3D43] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/25 transition-all duration-200 ease-out group"
    >
      {/* Venue Photo */}
      <div className="relative aspect-[16/9] bg-[#24272E] overflow-hidden">
        {hasPhoto ? (
          <Image
            src={`/images/venues/${venue.slug}/${venue.slug}-01.webp`}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin size={32} className="text-[#3A3D43]" />
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#24272E] text-[#6B6760] rounded mb-2">
          {venue.zone} zone
        </span>
        <h3 className="text-lg font-semibold mb-1">{venue.name}</h3>
        {venue.operator && (
          <p className="text-xs text-[#6B6760] mb-1">
            Operated by {venue.operator}
          </p>
        )}
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#C49A6C] mb-2">
          Part of East Fremont District Master Plan
        </p>
        <div className="flex items-center gap-1.5 text-xs text-[#6B6760] mb-4">
          <MapPin size={12} />
          {venue.address}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#2A2D33]">
          <div className="text-center">
            <Users size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">
              {venue.capacity != null ? venue.capacity.toLocaleString() : "—"}
            </div>
            <div className="text-[10px] text-[#6B6760]">Capacity</div>
          </div>
          <div className="text-center">
            <Maximize2 size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">
              {venue.squareFeet != null
                ? `${(venue.squareFeet / 1000).toFixed(0)}K`
                : "—"}
            </div>
            <div className="text-[10px] text-[#6B6760]">Sq Ft</div>
          </div>
          <div className="text-center">
            <Mic2 size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">
              {venue.hasStage === true ? "Yes" : venue.hasStage === false ? "No" : "—"}
            </div>
            <div className="text-[10px] text-[#6B6760]">Stage</div>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {venue.hasRooftop && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#24272E] text-[#9B978F] rounded">
              Rooftop
            </span>
          )}
          {venue.hasKitchen && (
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
