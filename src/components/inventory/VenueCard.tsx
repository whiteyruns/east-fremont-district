"use client";

import Image from "next/image";
import { MapPin, Users, Wine, Mic2, Maximize2, DoorOpen, TreePine } from "lucide-react";
import { Venue } from "@/types/venue";

interface VenueCardProps {
  venue: Venue;
  onSelect: (venue: Venue) => void;
}

export default function VenueCard({ venue, onSelect }: VenueCardProps) {
  return (
    <button
      onClick={() => onSelect(venue)}
      className="text-left bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden hover:border-[#3A3D43] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/25 transition-all duration-200 ease-out group"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-[#24272E]">
        <Image
          src={venue.imageUrl}
          alt={venue.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#24272E] text-[#6B6760] rounded mb-2">
          {venue.zone} zone
        </span>
        <h3 className="text-lg font-semibold mb-1">{venue.name}</h3>
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
              {venue.totalCapacity.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#6B6760]">Capacity</div>
          </div>
          <div className="text-center">
            <Maximize2 size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">
              {(venue.squareFootage / 1000).toFixed(0)}K
            </div>
            <div className="text-[10px] text-[#6B6760]">Sq Ft</div>
          </div>
          <div className="text-center">
            <Mic2 size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">{venue.stages}</div>
            <div className="text-[10px] text-[#6B6760]">Stages</div>
          </div>
        </div>

        {/* Indoor / Outdoor Breakdown */}
        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#2A2D33]">
          <div className="text-center">
            <DoorOpen size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">
              {venue.indoorCapacity.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#6B6760]">Indoor</div>
          </div>
          <div className="text-center">
            <TreePine size={14} className="mx-auto text-[#9B978F] mb-1" />
            <div className="text-sm font-bold font-mono">
              {venue.outdoorCapacity.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#6B6760]">Outdoor</div>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {venue.districtActivationEligible && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[#C49A6C]/10 text-[#C49A6C] border border-[#C49A6C]/30 rounded">
              District-Wide Activation Eligible
            </span>
          )}
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
