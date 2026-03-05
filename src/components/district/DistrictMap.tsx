"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Maximize2,
  Music,
  UtensilsCrossed,
  Wine,
  Mic2,
  Sparkles,
  Star,
} from "lucide-react";

/**
 * Schematic district map showing venue positions along East Fremont Street.
 * South (even) on top, North (odd) on bottom.
 * Block runs from Las Vegas Blvd (west) to 6th Street (east).
 * La Mona Rosa is on 6th Street spur (west side).
 * El Cortez shown as landmark reference.
 */

interface VenuePin {
  slug: string;
  name: string;
  address: string;
  capacity: number | null;
  sqft: number | null;
  side: "north" | "south" | "corner";
  x: number;
  yOverride?: number;
  features: string[];
  operator: string;
  /** If set, this venue is physically inside another venue (e.g. speakeasy) */
  nestedIn?: string;
}

// Positions derived from Google Maps coordinates (longitude-based)
// Block: Las Vegas Blvd (~-115.1410) to 6th St (~-115.1393)
const venuePins: VenuePin[] = [
  // ── South side (even numbers, west to east) ──
  { slug: "park-on-fremont", name: "Park On Fremont", address: "506", capacity: 198, sqft: null, side: "south", x: 30, features: ["Kitchen", "Patio"], operator: "Corner Bar Mgmt" },
  { slug: "evel-pie", name: "Evel Pie", address: "508", capacity: null, sqft: null, side: "south", x: 39, features: ["Kitchen"], operator: "Lev Group" },
  { slug: "discopussy", name: "Discopussy", address: "512", capacity: 500, sqft: 6500, side: "south", x: 47, features: ["Stage", "6.5K sqft"], operator: "Corner Bar Mgmt" },
  { slug: "lucky-day", name: "Lucky Day", address: "516", capacity: 103, sqft: 3000, side: "south", x: 53, features: ["LED Canopy"], operator: "Corner Bar Mgmt" },
  { slug: "electric-mushroom", name: "Electric Mushroom", address: "518", capacity: null, sqft: null, side: "south", x: 59, features: ["Stage", "Kitchen", "ADA"], operator: "Independent" },
  { slug: "eureka", name: "Eureka!", address: "520", capacity: null, sqft: null, side: "south", x: 69, features: ["Kitchen"], operator: "Eureka! Restaurant Group" },

  // ── North side (odd numbers, west to east) ──
  { slug: "istanbul-mediterranean", name: "Istanbul Mediterranean", address: "505", capacity: null, sqft: null, side: "north", x: 26, features: ["Kitchen"], operator: "Istanbul Mediterranean" },
  { slug: "taco-escobar", name: "Taco Escobar", address: "509", capacity: null, sqft: null, side: "north", x: 33, features: ["Kitchen"], operator: "Lev Group" },
  { slug: "the-griffin", name: "The Griffin", address: "511", capacity: 114, sqft: null, side: "north", x: 37, features: [], operator: "Independent" },
  { slug: "corduroy", name: "Corduroy", address: "515", capacity: 100, sqft: null, side: "north", x: 42, features: [], operator: "Independent" },
  { slug: "we-all-scream", name: "We All Scream", address: "517", capacity: 1000, sqft: 10000, side: "north", x: 47, features: ["Rooftop", "Stage", "10K sqft"], operator: "Corner Bar Mgmt" },
  { slug: "cheapshot", name: "Cheapshot", address: "519", capacity: 99, sqft: 3000, side: "north", x: 52, features: ["Stage", "Showroom"], operator: "Corner Bar Mgmt" },
  { slug: "le-thai", name: "Le Thai", address: "523", capacity: null, sqft: null, side: "north", x: 57, features: ["Kitchen"], operator: "Le Thai" },
  { slug: "commonwealth", name: "Commonwealth", address: "525", capacity: 300, sqft: 6000, side: "north", x: 69, features: ["Rooftop", "Stage", "6K sqft"], operator: "Corner Bar Mgmt" },
  { slug: "laundry-room", name: "The Laundry Room", address: "525", capacity: null, sqft: null, side: "north", x: 69, features: ["Speakeasy"], operator: "Corner Bar Mgmt", nestedIn: "commonwealth" },

  // ── West side of 6th St spur ──
  { slug: "la-mona-rosa", name: "La Mona Rosa", address: "100 S 6th St", capacity: null, sqft: 3500, side: "corner", x: 71, yOverride: 72, features: ["Stage", "Kitchen", "3.5K sqft"], operator: "Corner Bar Mgmt" },
];

/* ── Derived stats ── */
const totalCapacity = venuePins.reduce((s, v) => s + (v.capacity ?? 0), 0);
const totalSqft = venuePins.reduce((s, v) => s + (v.sqft ?? 0), 0);
const cbmCount = venuePins.filter((v) => v.operator === "Corner Bar Mgmt").length;
const maxCapacity = Math.max(...venuePins.map((v) => v.capacity ?? 0));

/* ── Feature icon helper ── */
function featureIcon(f: string) {
  if (f.includes("Stage") || f.includes("Showroom")) return Mic2;
  if (f.includes("Kitchen")) return UtensilsCrossed;
  if (f.includes("Speakeasy")) return Wine;
  if (f.includes("Rooftop")) return Sparkles;
  if (f.includes("LED")) return Star;
  return Music;
}

/* ── Capacity → heat color ── */
function capacityColor(cap: number | null): string {
  if (!cap) return "#3A3D43";
  const ratio = cap / maxCapacity;
  if (ratio > 0.6) return "#C49A6C";
  if (ratio > 0.3) return "#8B7355";
  return "#5C5040";
}

/* ── Venue Dot (SVG) ── */
function VenueDot({
  pin,
  isActive,
  parentIsActive,
  onActivate,
  onDeactivate,
}: {
  pin: VenuePin;
  isActive: boolean;
  parentIsActive?: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const isCBM = pin.operator === "Corner Bar Mgmt";
  const isNested = !!pin.nestedIn;
  const heat = capacityColor(pin.capacity);

  let cy: number;
  if (pin.yOverride) cy = pin.yOverride;
  else if (pin.side === "south") cy = 26;
  else if (pin.side === "north") cy = 54;
  else cy = 50;

  // Capacity-scaled radius (min 4, max 8)
  const baseR = pin.capacity ? 4 + (pin.capacity / maxCapacity) * 4 : 4;

  /* ── Nested venue (e.g. speakeasy inside another venue) ── */
  if (isNested) {
    const innerR = 2.5;
    // Donut hit area: thick invisible stroke so center passes through to parent venue
    const hitR = innerR + 9;
    return (
      <g
        className="cursor-pointer"
        role="button"
        aria-label={pin.name}
      >
        {/* Donut-shaped hit area — thick stroke ring, hollow center */}
        <circle
          cx={`${pin.x}%`}
          cy={cy}
          r={hitR}
          fill="none"
          stroke="transparent"
          strokeWidth={8}
          onMouseEnter={onActivate}
          onMouseLeave={onDeactivate}
          onClick={onActivate}
        />

        {/* Inner speakeasy ring */}
        <circle
          cx={`${pin.x}%`}
          cy={cy}
          r={isActive ? innerR + 10 : innerR + 7}
          fill="none"
          stroke={isActive ? "#C49A6C" : "#8B7355"}
          strokeWidth={isActive ? 1.5 : 0.8}
          strokeDasharray={isActive ? "3 2" : "2 2"}
          opacity={isActive || parentIsActive ? 0.9 : 0.4}
          className="transition-all duration-300 pointer-events-none"
        />

        {/* "Hidden inside" label on hover */}
        {isActive && (
          <>
            <text
              x={`${pin.x}%`}
              y={cy + baseR + 20}
              textAnchor="middle"
              fill="#F0EDE8"
              fontSize={7}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              className="pointer-events-none select-none"
            >
              {pin.name}
            </text>
            <text
              x={`${pin.x}%`}
              y={cy + baseR + 28}
              textAnchor="middle"
              fill="#6B6760"
              fontSize={5}
              fontFamily="monospace"
              className="pointer-events-none select-none"
            >
              INSIDE COMMONWEALTH
            </text>
          </>
        )}
      </g>
    );
  }

  /* ── Standard venue dot ── */
  return (
    <g
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onClick={onActivate}
      className="cursor-pointer"
      role="button"
      aria-label={pin.name}
    >
      {/* Ambient glow for CBM venues */}
      {isCBM && !isActive && (
        <circle
          cx={`${pin.x}%`}
          cy={cy}
          r={baseR + 6}
          fill="url(#cbmGlow)"
          opacity={0.35}
        />
      )}

      {/* Active pulse ring */}
      {isActive && (
        <>
          <circle
            cx={`${pin.x}%`}
            cy={cy}
            r={baseR + 14}
            fill="none"
            stroke="#C49A6C"
            strokeWidth={1}
            opacity={0.2}
          >
            <animate
              attributeName="r"
              from={String(baseR + 8)}
              to={String(baseR + 20)}
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.4"
              to="0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={`${pin.x}%`}
            cy={cy}
            r={baseR + 8}
            fill="none"
            stroke="#C49A6C"
            strokeWidth={1.5}
            opacity={0.5}
          />
        </>
      )}

      {/* Capacity heat ring */}
      {pin.capacity && !isActive && (
        <circle
          cx={`${pin.x}%`}
          cy={cy}
          r={baseR + 2}
          fill="none"
          stroke={heat}
          strokeWidth={1}
          opacity={0.4}
          strokeDasharray="2 2"
        />
      )}

      {/* Main dot */}
      <circle
        cx={`${pin.x}%`}
        cy={cy}
        r={isActive ? baseR + 2 : baseR}
        fill={isActive ? "#C49A6C" : isCBM ? "#C49A6C" : "#6B6760"}
        stroke={isActive ? "#F0EDE8" : "transparent"}
        strokeWidth={isActive ? 2 : 0}
        className="transition-all duration-300"
      />

      {/* Name label on hover */}
      {isActive && (
        <text
          x={`${pin.x}%`}
          y={pin.side === "south" ? cy - baseR - 10 : cy + baseR + 14}
          textAnchor="middle"
          fill="#F0EDE8"
          fontSize={7}
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          className="pointer-events-none select-none"
        >
          {pin.name}
        </text>
      )}

      {/* Address label */}
      <text
        x={`${pin.x}%`}
        y={pin.side === "south" ? cy - baseR - 3 : cy + baseR + 7}
        textAnchor="middle"
        fill={isActive ? "#C49A6C" : "#4A4740"}
        fontSize={6}
        fontFamily="monospace"
        className="transition-colors duration-200 pointer-events-none select-none"
      >
        {pin.address}
      </text>
    </g>
  );
}

/* ── Main Component ── */
export default function DistrictMap() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const activeVenue = venuePins.find((v) => v.slug === activeSlug) ?? null;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-4">
      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Capacity", value: totalCapacity.toLocaleString(), sub: `${venuePins.length} venues` },
          { label: "Corner Bar Mgmt", value: `${cbmCount} venues`, sub: `${Math.round((cbmCount / venuePins.length) * 100)}% of district` },
          { label: "Total Sq Ft", value: `${(totalSqft / 1000).toFixed(0)}K+`, sub: "Indoor + outdoor" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#14161B] border border-[#2A2D33] rounded-lg px-4 py-3 text-center"
          >
            <div className="text-[10px] text-[#6B6760] font-mono uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div className="text-lg font-bold font-mono text-[#C49A6C]">
              {stat.value}
            </div>
            <div className="text-[10px] text-[#4A4740]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Map SVG ── */}
      <div className="relative bg-[#14161B] border border-[#2A2D33] rounded-lg p-6 lg:p-8 overflow-hidden">

        {/* Subtle ambient glow behind the street */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 45%, rgba(196,154,108,0.04) 0%, transparent 70%)",
          }}
        />

        <svg
          viewBox="0 0 800 120"
          className={`w-full h-auto transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* SVG Defs — gradients & filters */}
          <defs>
            <radialGradient id="cbmGlow">
              <stop offset="0%" stopColor="#C49A6C" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C49A6C" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="streetGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#24272E" />
              <stop offset="30%" stopColor="#2E3138" />
              <stop offset="50%" stopColor="#33363E" />
              <stop offset="70%" stopColor="#2E3138" />
              <stop offset="100%" stopColor="#24272E" />
            </linearGradient>
            <linearGradient id="streetEdge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3A3D43" stopOpacity="0.6" />
              <stop offset="50%" stopColor="transparent" />
              <stop offset="100%" stopColor="#3A3D43" stopOpacity="0.6" />
            </linearGradient>
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Las Vegas Blvd (west cross street) ── */}
          <rect x="160" y="0" width="8" rx="2" height="120" fill="#1E2028" />
          <rect x="160" y="0" width="8" rx="2" height="120" fill="url(#streetEdge)" opacity="0.3" />
          <text
            x="164"
            y="8"
            textAnchor="middle"
            fill="#9B978F"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1"
          >
            LAS VEGAS BLVD
          </text>

          {/* ── 6th Street (east cross street) ── */}
          <rect x="576" y="0" width="8" rx="2" height="120" fill="#1E2028" />
          <rect x="576" y="0" width="8" rx="2" height="120" fill="url(#streetEdge)" opacity="0.3" />
          <text
            x="580"
            y="8"
            textAnchor="middle"
            fill="#9B978F"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1"
          >
            6TH ST
          </text>

          {/* ── East Fremont Street surface ── */}
          <rect x="168" y="36" width="620" height="12" rx="2" fill="url(#streetGlow)" />
          <rect x="168" y="36" width="620" height="0.5" fill="#3A3D43" opacity="0.5" />
          <rect x="168" y="47.5" width="620" height="0.5" fill="#3A3D43" opacity="0.5" />

          {/* Center line dashes — animated */}
          {Array.from({ length: 13 }).map((_, i) => (
            <rect
              key={i}
              x={176 + i * 46}
              y="41.5"
              width={22}
              height={1}
              rx={0.5}
              fill="#C49A6C"
              opacity={0.15}
            />
          ))}

          {/* ── Fremont Street label ── */}
          <text
            x="400"
            y="44"
            textAnchor="middle"
            fill="#3A3D43"
            fontSize="5.5"
            fontFamily="monospace"
            letterSpacing="4"
          >
            EAST FREMONT ST
          </text>

          {/* ── 6th Street south spur ── */}
          <rect x="576" y="48" width="8" height="80" fill="#1E2028" />

          {/* Side labels */}
          <text x="100" y="18" fill="#6B6760" fontSize="6" fontFamily="monospace" letterSpacing="1.5" opacity="0.6">
            SOUTH SIDE (EVEN)
          </text>
          <text x="100" y="62" fill="#6B6760" fontSize="6" fontFamily="monospace" letterSpacing="1.5" opacity="0.6">
            NORTH SIDE (ODD)
          </text>

          {/* 6th St south label */}
          <text
            x="616"
            y="82"
            textAnchor="start"
            fill="#6B6760"
            fontSize="6"
            fontFamily="monospace"
            letterSpacing="1"
            transform="rotate(90, 616, 82)"
          >
            S 6TH ST
          </text>

          {/* ── El Cortez landmark ── */}
          <rect x="74%" y="14" width="11%" height="18" rx="2" fill="#1E2028" stroke="#2A2D33" strokeWidth="0.5" />
          <text
            x="79.5%"
            y="26"
            textAnchor="middle"
            fill="#4A4740"
            fontSize="6"
            fontFamily="monospace"
            letterSpacing="1"
          >
            EL CORTEZ
          </text>

          {/* ── Venue dots (render non-nested first, then nested on top) ── */}
          {venuePins.filter((p) => !p.nestedIn).map((pin) => (
            <VenueDot
              key={pin.slug}
              pin={pin}
              isActive={activeSlug === pin.slug}
              onActivate={() => setActiveSlug(pin.slug)}
              onDeactivate={() => setActiveSlug(null)}
            />
          ))}
          {venuePins.filter((p) => p.nestedIn).map((pin) => (
            <VenueDot
              key={pin.slug}
              pin={pin}
              isActive={activeSlug === pin.slug}
              parentIsActive={activeSlug === pin.nestedIn}
              onActivate={() => setActiveSlug(pin.slug)}
              onDeactivate={() => setActiveSlug(null)}
            />
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-[#2A2D33]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C49A6C] opacity-30" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C49A6C]" />
            </span>
            <span className="text-[11px] text-[#9B978F]">Corner Bar Mgmt</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#6B6760]" />
            <span className="text-[11px] text-[#9B978F]">Partner Venue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-dashed border-[#5C5040]" />
            <span className="text-[11px] text-[#9B978F]">Capacity indicator</span>
          </div>
          <span className="ml-auto text-[11px] text-[#6B6760] font-mono">
            {venuePins.length} venues · Hover to explore
          </span>
        </div>
      </div>

      {/* ── Active Venue Detail Card ── */}
      <div
        className={`bg-[#1A1D23] border rounded-lg overflow-hidden transition-all duration-300 ${
          activeVenue
            ? "opacity-100 translate-y-0 border-[#C49A6C]/20"
            : "opacity-0 -translate-y-2 pointer-events-none border-[#2A2D33]"
        }`}
      >
        {activeVenue && (
          <>
            {/* Accent bar */}
            <div
              className="h-0.5"
              style={{
                background:
                  activeVenue.operator === "Corner Bar Mgmt"
                    ? "linear-gradient(90deg, #C49A6C, #8B7355)"
                    : "linear-gradient(90deg, #6B6760, #4A4740)",
              }}
            />
            <div className="p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[#F0EDE8] font-bold text-lg">
                      {activeVenue.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[#6B6760] bg-[#24272E] px-2 py-0.5 rounded">
                      {activeVenue.address.includes("6th")
                        ? activeVenue.address
                        : `${activeVenue.address} E Fremont`}
                    </span>
                  </div>
                  <p className="text-[#9B978F] text-sm flex items-center gap-2">
                    {activeVenue.operator === "Corner Bar Mgmt" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C] inline-block" />
                    )}
                    {activeVenue.operator}
                    {activeVenue.nestedIn && (
                      <span className="text-[10px] text-[#6B6760] font-mono bg-[#24272E] px-2 py-0.5 rounded ml-1">
                        Inside {venuePins.find((v) => v.slug === activeVenue.nestedIn)?.name}
                      </span>
                    )}
                  </p>
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
                      {activeVenue.features.map((f) => {
                        const Icon = featureIcon(f);
                        return (
                          <span
                            key={f}
                            className="bg-[#C49A6C]/10 text-[#C49A6C] text-[10px] font-semibold px-2 py-0.5 rounded inline-flex items-center gap-1"
                          >
                            <Icon size={10} />
                            {f}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
