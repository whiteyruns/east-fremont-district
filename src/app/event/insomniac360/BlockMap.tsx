"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Beef,
  Car,
  Disc3,
  Eye,
  IceCreamCone,
  Martini,
  Music,
  Palette,
  Pizza,
  Sandwich,
  ShoppingBag,
  Ticket,
  Toilet,
  UtensilsCrossed,
} from "lucide-react";

/**
 * Layered block map.
 *
 * Ported from the `festival-map.html` viewer supplied with the Insomniac 360
 * deck: a base plate plus stacked PNG overlays, per-layer toggles, isolate-on-
 * alt-click, number-key shortcuts, and a 2.5x magnifier.
 *
 * Assets live in /public/images/insomniac360/. If a layer's contents don't
 * match its label, only the `label` strings below need to change — the order
 * is the paint order, bottom to top.
 */

const BASE = "/images/insomniac360/base.jpg";

type Layer = {
  id: number;
  src: string;
  label: string;
  hint: string;
};

const LAYERS: Layer[] = [
  {
    id: 2,
    src: "/images/insomniac360/layer-2.png",
    label: "Capacity & Access",
    hint: "Crowd loading spans and perimeter barricades",
  },
  {
    id: 3,
    src: "/images/insomniac360/layer-3.png",
    label: "Zones & Stage",
    hint: "Insomniac 360 stage, back of house, F&B, art, merch and VIP",
  },
  {
    id: 4,
    src: "/images/insomniac360/layer-4.png",
    label: "Venues",
    hint: "Named rooms across the block",
  },
  {
    id: 5,
    src: "/images/insomniac360/layer-5.png",
    label: "Street Food",
    hint: "Additional food and beverage pins",
  },
];

/**
 * The plan originally carried this legend baked into a purple band across the
 * top of base.jpg, directly under the section heading — which put the Insomniac
 * wordmark on screen twice. The band was cropped off all five plates (372px,
 * uniformly, so the overlays still register) and the legend rebuilt here, where
 * it is selectable, searchable and translatable.
 */
const LEGEND = [
  { Icon: Pizza, label: "Pizza" },
  { Icon: Sandwich, label: "Tacos" },
  { Icon: Beef, label: "Burgers" },
  { Icon: IceCreamCone, label: "Ice cream" },
  { Icon: Eye, label: "VIP viewing" },
  { Icon: Disc3, label: "DJ" },
  { Icon: Music, label: "Music" },
  { Icon: Martini, label: "Cocktails" },
  { Icon: Palette, label: "Art & displays" },
  { Icon: UtensilsCrossed, label: "Street food & beverage" },
  { Icon: Toilet, label: "Portopotty alley" },
  { Icon: ShoppingBag, label: "Merchandise" },
  { Icon: Ticket, label: "Ticketing & wristbands" },
  { Icon: Car, label: "Rideshare" },
];

const ZOOM = 2.5;
const LENS_RADIUS = 110;

export default function BlockMap() {
  const [hidden, setHidden] = useState<Set<number>>(new Set());
  const [magnifier, setMagnifier] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  /**
   * The magnifier is driven by mousemove, so it is meaningless on touch.
   * Starts false so the server render (which can't know) matches a touch
   * client; a mouse client turns it on after mount.
   */
  const [canHover, setCanHover] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      setCanHover(mq.matches);
      if (!mq.matches) setMagnifier(false);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const isHidden = useCallback((id: number) => hidden.has(id), [hidden]);

  const toggle = useCallback((id: number) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isolate = useCallback((id: number) => {
    setHidden(new Set(LAYERS.filter((l) => l.id !== id).map((l) => l.id)));
  }, []);

  const showAll = useCallback(() => setHidden(new Set()), []);

  // Keyboard shortcuts: number keys toggle layers, 0 shows all, M the magnifier.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      if (e.key === "0") {
        showAll();
        return;
      }
      if (e.key.toLowerCase() === "m") {
        if (canHover) setMagnifier((v) => !v);
        return;
      }
      const n = Number(e.key);
      if (Number.isInteger(n) && LAYERS.some((l) => l.id === n)) toggle(n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, showAll, canHover]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnifier) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSize({ w: rect.width, h: rect.height });
    setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const stack = (opts?: { forLens?: boolean }) => (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BASE}
        alt="Insomniac 360 block plan — Fremont East, Downtown Las Vegas"
        className="block w-full h-auto select-none"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      {LAYERS.map((layer) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={layer.id}
          src={layer.src}
          alt=""
          aria-hidden="true"
          draggable={false}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full select-none transition-opacity duration-300 ${
            isHidden(layer.id) ? "opacity-0" : "opacity-100"
          }`}
          style={opts?.forLens ? { transitionDuration: "0ms" } : undefined}
        />
      ))}
    </>
  );

  return (
    <div className="space-y-6">
      {/* Layer controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={showAll}
          aria-pressed={hidden.size === 0}
          className={`inline-flex items-center min-h-[44px] sm:min-h-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase border transition-colors ${
            hidden.size === 0
              ? "border-[#C49A6C] text-[#0F1115] bg-[#C49A6C]"
              : "border-[#2A2D33] text-[#9B978F] hover:border-[#3A3D43] hover:text-[#F0EDE8]"
          }`}
        >
          All layers
        </button>

        {LAYERS.map((layer) => {
          const on = !isHidden(layer.id);
          return (
            <button
              key={layer.id}
              type="button"
              title={`${layer.hint} — alt-click to isolate, or press ${layer.id}`}
              onClick={(e) => (e.altKey ? isolate(layer.id) : toggle(layer.id))}
              aria-pressed={on}
              className={`group inline-flex items-center min-h-[44px] sm:min-h-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase border transition-colors ${
                on
                  ? "border-[#3A3D43] bg-[#1A1D23] text-[#F0EDE8]"
                  : "border-[#2A2D33] bg-transparent text-[#6B6760] hover:text-[#9B978F]"
              }`}
            >
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle transition-colors ${
                  on ? "bg-[#C49A6C]" : "bg-[#3A3D43]"
                }`}
              />
              {layer.label}
            </button>
          );
        })}

        {canHover && (
          <button
            type="button"
            onClick={() => setMagnifier((v) => !v)}
            aria-pressed={magnifier}
            className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase border transition-colors ml-auto ${
              magnifier
                ? "border-[#C49A6C] text-[#C49A6C] bg-[#C49A6C]/10"
                : "border-[#2A2D33] text-[#9B978F] hover:border-[#3A3D43] hover:text-[#F0EDE8]"
            }`}
          >
            Magnifier {ZOOM}×
          </button>
        )}
      </div>

      {/* Map frame.
          The plan carries far more detail than a phone can resolve at column
          width — at 375px it lands around 327px wide, which renders the venue
          callouts as specks. Below md it is therefore pinned to a legible size
          and scrolls sideways; from md up it fits the column as before. */}
      <div className="overflow-x-auto md:overflow-visible">
        <div
          ref={frameRef}
          onMouseMove={onMove}
          onMouseLeave={() => setLens(null)}
          className={`relative overflow-hidden rounded-xl border border-[#2A2D33] bg-[#0A0C0F] min-w-[960px] md:min-w-0 ${
            magnifier ? "cursor-crosshair" : ""
          }`}
        >
          {stack()}

          {/* Magnifier lens */}
          {magnifier && lens && size && (
            <div
              className="pointer-events-none absolute rounded-full border-2 border-[#C49A6C]/70 shadow-[0_0_40px_rgba(0,0,0,0.7)] overflow-hidden"
              style={{
                width: LENS_RADIUS * 2,
                height: LENS_RADIUS * 2,
                left: lens.x - LENS_RADIUS,
                top: lens.y - LENS_RADIUS,
              }}
            >
              <div
                className="absolute"
                style={{
                  width: size.w * ZOOM,
                  height: size.h * ZOOM,
                  left: -lens.x * ZOOM + LENS_RADIUS,
                  top: -lens.y * ZOOM + LENS_RADIUS,
                }}
              >
                {stack({ forLens: true })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend — was baked into the cropped band; see LEGEND above. */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3 rounded-xl border border-[#2A2D33] bg-[#1A1D23] px-5 py-5">
        {LEGEND.map(({ Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5">
            <Icon
              className="w-4 h-4 shrink-0 text-[#C49A6C]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-[#9B978F] text-xs tracking-wide uppercase leading-tight">
              {label}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-[#6B6760] text-xs leading-relaxed">
        {canHover ? (
          <>
            Click a layer to hide it · alt-click to isolate it · number keys{" "}
            {LAYERS[0].id}–{LAYERS[LAYERS.length - 1].id} toggle layers · 0
            shows all · M turns the magnifier on and off.
          </>
        ) : (
          <>Drag the plan sideways to read across the block.</>
        )}
      </p>
    </div>
  );
}
