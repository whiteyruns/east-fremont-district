"use client";

import { useState } from "react";
import { Users, Maximize2 } from "lucide-react";

/**
 * Schematic district map showing venue positions along East Fremont Street.
 * Even-numbered addresses on the south side, odd on the north.
 * Block runs roughly from 5th St (west) to 6th St (east).
 */

interface VenuePin {
  slug: string;
  name: string;
  address: string;
  capacity: number | null;
  sqft: number | null;
  side: "north" | "south" | "corner" | "east";
  /** Horizontal position as percentage (0 = west end, 100 = east end) */
  x: number;
  features: string[];
  operator: string;
}

const venuePins: VenuePin[] = [
  // ── South side (even numbers, left to right) ──
  { slug: "park-on-fremont", name: "Park On Fremont", address: "506", capacity: 198, sqft: null, side: "south", x: 8, features: ["Kitchen", "Patio"], operator: "Corner Bar Mgmt" },
  { slug: "evel-pie", name: "Evel Pie", address: "508", capacity: null, sqft: null, side: "south", x: 18, features: ["Kitchen"], operator: "Lev Group" },
  { slug: "discopussy", name: "Discopussy", address: "512", capacity: 500, sqft: 6500, side: "south", x: 32, features: ["Stage", "6.5K sqft"], operator: "Corner Bar Mgmt" },
  { slug: "electric-mushroom", name: "Electric Mushroom", address: "518", capacity: null, sqft: null, side: "south", x: 55, features: ["Stage", "Kitchen", "ADA"], operator: "Corner Bar Mgmt" },
  { slug: "eureka", name: "Eureka!", address: "520", capacity: null, sqft: null, side: "south", x: 68, features: ["Kitchen"], operator: "Eureka! Restaurant Group" },

  // ── North side (odd numbers, left to right) ──
  { slug: "istanbul-mediterranean", name: "Istanbul Mediterranean", address: "505", capacity: null, sqft: null, side: "north", x: 5, features: ["Kitchen"], operator: "Istanbul Mediterranean" },
  { slug: "taco-escobar", name: "Taco Escobar", address: "509", capacity: null, sqft: null, side: "north", x: 20, features: ["Kitchen"], operator: "Lev Group" },
  { slug: "the-griffin", name: "The Griffin", address: "511", capacity: 114, sqft: null, side: "north", x: 30, features: [], operator: "Independent" },
  { slug: "corduroy", name: "Corduroy", address: "515", capacity: 100, sqft: null, side: "north", x: 43, features: [], operator: "Independent" },
  { slug: "we-all-scream", name: "We All Scream", address: "517", capacity: 1000, sqft: 10000, side: "north", x: 55, features: ["Rooftop", "Stage", "10K sqft"], operator: "Corner Bar Mgmt" },
  { slug: "le-thai", name: "Le Thai", address: "523", capacity: null, sqft: null, side: "north", x: 72, features: ["Kitchen"], operator: "Le Thai" },
  { slug: "commonwealth", name: "Commonwealth", address: "525", capacity: 300, sqft: 6000, side: "north", x: 85, features: ["Rooftop", "Stage", "6K sqft"], operator: "Corner Bar Mgmt" },
  { slug: "laundry-room", name: "The Laundry Room", address: "525", capacity: null, sqft: null, side: "north", x: 92, features: ["Speakeasy"], operator: "Corner Bar Mgmt" },

  // ── Corner / East ──
  { slug: "la-mona-rosa", name: "La Mona Rosa", address: "100 S 6th", capacity: null, sqft: 3500, side: "corner", x: 95, features: ["Stage", "Kitchen", "3.5K sqft"], operator: "Corner Bar Mgmt" },
  { slug: "cheapshot", name: "Cheapshot", address: "1028", capacity: 99, sqft: 3000, side: "east", x: 98, features: ["Stage", "Showroom"], operator: "Corner Bar Mgmt" },
  { slug: "lucky-day", name: "Lucky Day", address: "1028", capacity: 103, sqft: 3000, side: "east", x: 98, features: ["LED Canopy"], operator: "Corner Bar Mgmt" },
];

function VenueDot({
  pin,
  isActive,
  onHover,
  onLeave,
}: {
  pin: VenuePin;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isCBM = pin.operator === "Corner Bar Mgmt";

  // Position: north side above the street, south side below
  let cy: number;
  if (pin.side === "north") cy = 30;
  else if (pin.side === "south") cy = 70;
  else if (pin.side === "corner") cy = 82;
  else cy = 50; // east venues centered

  return (
    <g
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="cursor-pointer"
    >
      {/* Pulse ring on active */}
      {isActive && (
        <circle
          cx={`${pin.x}%`}
          cy={cy}
          r={14}
          fill="none"
          stroke="#C49A6C"
          strokeWidth={1.5}
          opacity={0.4}
          className="animate-ping"
          style={{ transformOrigin: `${pin.x}% ${cy}px` }}
        />
      )}

      {/* Dot */}
      <circle
        cx={`${pin.x}%`}
        cy={cy}
        r={isActive ? 8 : 6}
        fill={isActive ? "#C49A6C" : isCBM ? "#C49A6C" : "#6B6760"}
        stroke={isActive ? "#F0EDE8" : "transparent"}
        strokeWidth={isActive ? 2 : 0}
        className="transition-all duration-200"
      />

      {/* Address label */}
      <text
        x={`${pin.x}%`}
        y={pin.side === "north" ? cy - 14 : cy + 18}
        textAnchor="middle"
        fill={isActive ? "#F0EDE8" : "#6B6760"}
        fontSize={9}
        fontFamily="monospace"
        className="transition-colors duration-200 pointer-events-none select-none"
      >
        {pin.address}
      </text>
    </g>
  );
}

export default function DistrictMap() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeVenue = venuePins.find((v) => v.slug === activeSlug) ?? null;

  return (
    <div className="space-y-6">
      {/* Map SVG */}
      <div className="relative bg-[#14161B] border border-[#2A2D33] rounded-lg p-6 lg:p-8 overflow-hidden">
        {/* Street labels */}
        <div className="flex justify-between items-center mb-2 px-2">
          <span className="text-[10px] text-[#6B6760] font-mono uppercase tracking-widest">
            ← N 5th St
          </span>
          <span className="text-[11px] text-[#9B978F] font-semibold tracking-widest uppercase">
            East Fremont Street
          </span>
          <span className="text-[10px] text-[#6B6760] font-mono uppercase tracking-widest">
            N 6th St →
          </span>
        </div>

        <svg
          viewBox="0 0 800 100"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Street surface */}
          <rect x="0" y="44" width="800" height="12" rx="2" fill="#24272E" />

          {/* Center line dashes */}
          {Array.from({ length: 20 }).map((_, i) => (
            <rect
              key={i}
              x={i * 42 + 5}
              y="49"
              width={22}
              height={2}
              rx={1}
              fill="#3A3D43"
            />
          ))}

          {/* Venue dots */}
          {venuePins.map((pin) => (
            <VenueDot
              key={pin.slug}
              pin={pin}
              isActive={activeSlug === pin.slug}
              onHover={() => setActiveSlug(pin.slug)}
              onLeave={() => setActiveSlug(null)}
            />
          ))}
        </svg>

        {/* Side labels */}
        <div className="flex justify-between items-center mt-2 px-2">
          <span className="text-[10px] text-[#6B6760] font-mono">
            South side (even)
          </span>
          <span className="text-[10px] text-[#6B6760] font-mono">
            North side (odd)
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#2A2D33]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#C49A6C]" />
            <span className="text-[11px] text-[#9B978F]">Corner Bar Mgmt</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#6B6760]" />
            <span className="text-[11px] text-[#9B978F]">Partner Venue</span>
          </div>
          <span className="ml-auto text-[11px] text-[#6B6760] font-mono">
            {venuePins.length} venues
          </span>
        </div>
      </div>

      {/* Active Venue Detail Card */}
      <div
        className={`bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-6 transition-all duration-300 ${
          activeVenue ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ minHeight: 96 }}
      >
        {activeVenue && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-[#F0EDE8] font-bold text-lg">
                  {activeVenue.name}
                </h3>
                <span className="text-[10px] font-mono text-[#6B6760] bg-[#24272E] px-2 py-0.5 rounded">
                  {activeVenue.address} E Fremont
                </span>
              </div>
              <p className="text-[#9B978F] text-sm">{activeVenue.operator}</p>
            </div>

            <div className="flex items-center gap-6">
              {activeVenue.capacity && (
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#C49A6C]" />
                  <div>
                    <div className="text-sm font-bold font-mono text-[#F0EDE8]">
                      {activeVenue.capacity.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#6B6760]">Capacity</div>
                  </div>
                </div>
              )}
              {activeVenue.sqft && (
                <div className="flex items-center gap-2">
                  <Maximize2 size={14} className="text-[#C49A6C]" />
                  <div>
                    <div className="text-sm font-bold font-mono text-[#F0EDE8]">
                      {(activeVenue.sqft / 1000).toFixed(1)}K
                    </div>
                    <div className="text-[10px] text-[#6B6760]">Sq Ft</div>
                  </div>
                </div>
              )}
              {activeVenue.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {activeVenue.features.map((f) => (
                    <span
                      key={f}
                      className="bg-[#C49A6C]/10 text-[#C49A6C] text-[10px] font-semibold px-2 py-0.5 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
