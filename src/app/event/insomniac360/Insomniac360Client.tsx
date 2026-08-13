"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import BlockMap from "./BlockMap";
import BudgetTable from "./BudgetTable";

const BLOCK_STATS = [
  { value: "15,000+", label: "Capacity, full street closure" },
  { value: "61,600+", label: "Sq ft of indoor space" },
  { value: "6", label: "Venues, one contract" },
  { value: "1", label: "Block, entirely yours" },
];

const PROOF_STATS = [
  { value: "32K+", label: "Attendees, year one" },
  { value: "296.6M", label: "Earned-media impressions" },
  { value: "10K+", label: "Casino crossover / event" },
  { value: "30,861", label: "Pre-registered fans" },
];

/**
 * Six venues, and two deliberate exclusions:
 *
 * - Back of House is the production and artist compound, not a room you can
 *   programme. It's described separately under the grid.
 * - La Mona Rosa was dropped (Keith, 2026-08-13) — it never appeared on the
 *   block map, so it isn't in scope for this activation.
 *
 * F.E.E.D.'s district-wide figure is 7 venues. This page counts what Insomniac
 * would actually get, which is 6. Don't "correct" it back to the district
 * number.
 */
const VENUES = [
  { name: "Commonwealth", detail: "Two-story cocktail bar · rooftop" },
  { name: "We All Scream", detail: "Rooftop nightclub" },
  { name: "Lucky Day", detail: "Mezcal house · 15,000-LED canopy" },
  { name: "Discopussy", detail: "House & techno club" },
  { name: "Park on Fremont", detail: "Restaurant & garden patios" },
  { name: "Cheapshot", detail: "Piano bar" },
];

/**
 * Positioning written for Insomniac specifically. The supplied deck carried no
 * narrative at all — five pages of map layers and a budget strip — so this is
 * adapted from Book The Block and pointed at a promoter rather than a brand.
 * Every number below is sourced from F.E.E.D.'s own year-one figures; nothing
 * here asserts anything about Insomniac's business.
 */
const PILLARS = [
  {
    title: "Your Headliners are already downtown",
    body: "Marshmello, Diplo, Major Lazer, and Gryffin have all played this block. 32,000 people came through in year one and more than 10,000 crossed into the casinos per event. The crowd you'd programme for doesn't have to be imported — it already comes here.",
  },
  {
    title: "A finished block, not an empty field",
    body: "Six rooms with sound, power, bars, and staff already in them, plus a permitted street closure between them. One contract covers production, permitting, security, and F&B — instead of six venue deals and a build from bare ground.",
  },
  {
    title: "Day and night, both yours",
    body: "All-ages programming and daytime activation on one side of the clock; 21+ clubs, rooftops, and the main stage on the other. The same footprint works twice a day, which no single room in this city can offer.",
  },
];

export default function Insomniac360Client() {
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Respect prefers-reduced-motion. Handled imperatively rather than by
   * toggling the `autoPlay` attribute, so the server and client markup stay
   * identical — the video simply holds on its first frame instead.
   */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const v = videoRef.current;
      if (!v) return;
      if (mq.matches) v.pause();
      else void v.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="bg-[#0F1115] text-[#F0EDE8]">
      {/* ── Minimal bar (site header is hidden on /event/* routes) ── */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] text-[#F0EDE8] font-bold text-lg tracking-[0.15em] hover:text-[#C49A6C] transition-colors"
          >
            F.E.E.D.
          </Link>
          <a
            href="mailto:booktheblock@cornerbar.com?subject=Insomniac%20360%20—%20On%20The%20Block"
            className="inline-flex items-center min-h-[44px] text-xs font-semibold tracking-widest uppercase text-[#9B978F] hover:text-[#C49A6C] transition-colors"
          >
            Book the Block
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0A0C0F]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/homepage/hero-main.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero-drone.mp4" type="video/mp4" />
        </video>

        {/* Scrim — kept light through the middle so the drone footage reads.
            Type legibility comes from the text-shadow below, not from burying
            the video. Top stays darker to carry the F.E.E.D. bar. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C0F]/70 via-[#0A0C0F]/30 to-[#0F1115]" />
        <div className="absolute inset-0 bg-[#0A0C0F]/15" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center [text-shadow:0_2px_28px_rgba(10,12,15,0.85)]">
          <p className="text-[#C49A6C] text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            F.E.E.D. presents
          </p>
          <h1 className="text-[#F0EDE8] text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            Insomniac 360
          </h1>
          <p className="text-[#F0EDE8]/80 text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase mt-3">
            On the Block
          </p>
          {/* #F0EDE8/75 rather than the usual #9B978F — this sits over the
              brightest part of the drone footage, and the lighter scrim leaves
              secondary grey too close to the neon behind it. */}
          <p className="text-[#F0EDE8]/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-8">
            Six rooms, a permitted street closure, and 15,000+ people in the
            middle of Downtown Las Vegas — handed to one promoter for a night, a
            weekend, or a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
            <a
              href="#map"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border border-[#2A2D33] bg-[#0F1115]/60 backdrop-blur text-[#F0EDE8] hover:border-[#3A3D43] transition-colors"
            >
              See the block plan
            </a>
            <a
              href="#budget"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold btn-shimmer text-[#0F1115] transition-colors"
            >
              View the budget
            </a>
          </div>
        </div>
      </section>

      {/* ── The block ── */}
      <section id="block" className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
            The canvas · F.E.E.D.
          </p>
          <h2 className="text-[#F0EDE8] text-4xl lg:text-5xl font-bold tracking-tight mt-4 max-w-3xl text-balance">
            You&rsquo;re not renting a venue. You&rsquo;re renting a block.
          </h2>
          <p className="text-[#9B978F] text-lg leading-relaxed max-w-3xl mt-6">
            The Fremont East Entertainment District is a single block of
            Downtown Las Vegas that closes end to end. For a promoter that means
            one permit, one footprint, and six rooms already running music
            every weekend — rather than a field you have to build from nothing.
          </p>

          {/* Block stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2D33] mt-14 rounded-xl overflow-hidden border border-[#2A2D33]">
            {BLOCK_STATS.map((s) => (
              <div key={s.label} className="bg-[#1A1D23] px-6 py-8">
                <p className="font-mono text-[#F0EDE8] text-4xl lg:text-5xl font-bold tracking-tight">
                  {s.value}
                </p>
                <p className="text-[#9B978F] text-xs tracking-wide uppercase mt-3 leading-relaxed">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-[#2A2D33] bg-[#1A1D23] p-6"
              >
                <h3 className="text-[#F0EDE8] text-base font-semibold tracking-wide">
                  {p.title}
                </h3>
                <p className="text-[#9B978F] text-sm leading-relaxed mt-3">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          {/* Venues */}
          <h3 className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase mt-20 mb-6">
            One block. Many rooms.
          </h3>
          {/* Individually bordered rather than the gap-px hairline trick — an
              odd count leaves a hole in the last row otherwise. */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {VENUES.map((v) => (
              <div
                key={v.name}
                className="rounded-xl border border-[#2A2D33] bg-[#1A1D23] px-5 py-6"
              >
                <p className="text-[#F0EDE8] text-sm font-semibold tracking-wide uppercase">
                  {v.name}
                </p>
                <p className="text-[#6B6760] text-xs mt-2 leading-relaxed">
                  {v.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[#6B6760] text-sm leading-relaxed mt-6 max-w-3xl">
            Back of House — the production and artist compound — sits on the
            plan behind Commonwealth. It isn&rsquo;t counted among the six
            venues because it isn&rsquo;t a room you programme; it&rsquo;s the
            infrastructure that lets you programme the rest.
          </p>
        </div>
      </section>

      {/* ── Proof ── */}
      <section className="py-20 border-y border-[#2A2D33] bg-[#0A0C0F]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
            The proof · year one
          </p>
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight mt-4 max-w-2xl text-balance">
            The platform your activation steps onto.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {PROOF_STATS.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-[#C49A6C] text-3xl lg:text-4xl font-bold tracking-tight">
                  {s.value}
                </p>
                <p className="text-[#9B978F] text-xs tracking-wide uppercase mt-3 leading-relaxed">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section id="map" className="py-24 lg:py-32 scroll-mt-8">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
            The block plan
          </p>
          <h2 className="text-[#F0EDE8] text-4xl lg:text-5xl font-bold tracking-tight mt-4 max-w-3xl text-balance">
            Insomniac 360, laid out on Fremont East.
          </h2>
          <p className="text-[#9B978F] text-lg leading-relaxed max-w-3xl mt-6 mb-12">
            Stage placement, crowd loading, venue footprints, and back of house
            across the closed street. Toggle the layers to read the plan one
            system at a time.
          </p>

          <BlockMap />
        </div>
      </section>

      {/* ── Budget ── */}
      <section
        id="budget"
        className="py-24 lg:py-32 border-t border-[#2A2D33] bg-[#0A0C0F] scroll-mt-8"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
            The budget
          </p>
          <h2 className="text-[#F0EDE8] text-4xl lg:text-5xl font-bold tracking-tight mt-4 max-w-3xl text-balance">
            What it costs to take the block.
          </h2>
          <p className="text-[#9B978F] text-lg leading-relaxed max-w-3xl mt-6 mb-14">
            Venue buyout plus the fixed operating costs of closing and securing
            the street. Rates move by month and by weekday versus weekend.
          </p>

          <BudgetTable />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-[#F0EDE8] text-4xl lg:text-6xl font-bold tracking-tight text-balance">
            Book the block.
          </h2>
          <p className="text-[#9B978F] text-sm tracking-[0.2em] uppercase mt-5">
            Downtown Las Vegas · Fremont East
          </p>
          <div className="pt-10">
            <a
              href="mailto:booktheblock@cornerbar.com?subject=Insomniac%20360%20—%20On%20The%20Block"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-semibold btn-shimmer text-[#0F1115]"
            >
              booktheblock@cornerbar.com
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2A2D33] py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6760] text-xs tracking-widest uppercase">
            Corner Bar · F.E.E.D. · Downtown Las Vegas
          </p>
          <p className="text-[#6B6760] text-xs">
            Confidential — prepared for Insomniac. Not for distribution.
          </p>
        </div>
      </footer>
    </div>
  );
}
