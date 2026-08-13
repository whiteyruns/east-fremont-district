"use client";

import { useState } from "react";

/**
 * Budget snippet from the Insomniac 360 deck (page 1).
 *
 * Venue rental subtotals are per-month, split weekday vs. weekend. Operating
 * costs are fixed regardless of month. Grand totals are derived here rather
 * than hard-coded so the two can never drift apart.
 */

type MonthRow = {
  month: string;
  weekday: number;
  weekend: number;
};

const VENUE_RENTAL: MonthRow[] = [
  { month: "Jan", weekday: 76500, weekend: 169500 },
  { month: "Feb", weekday: 76500, weekend: 169500 },
  { month: "Mar", weekday: 76500, weekend: 174500 },
  { month: "Apr", weekday: 76500, weekend: 174500 },
  { month: "May", weekday: 76500, weekend: 174500 },
  { month: "Jun", weekday: 71500, weekend: 169500 },
  { month: "Jul", weekday: 71500, weekend: 169500 },
  { month: "Aug", weekday: 71500, weekend: 169500 },
  { month: "Sep", weekday: 76500, weekend: 169500 },
  { month: "Oct", weekday: 76500, weekend: 169500 },
  { month: "Nov", weekday: 76500, weekend: 169500 },
  { month: "Dec", weekday: 74500, weekend: 169500 },
];

const OPERATING_COSTS: { item: string; cost: number; note?: string }[] = [
  { item: "Fencing / road closure", cost: 10000 },
  { item: "Permits", cost: 2000 },
  {
    item: "Parking lot buyouts",
    cost: 7500,
    note: "Triple Bs, Park on Fremont, John E Carson and street parking spots",
  },
  { item: "Metro", cost: 7500 },
  { item: "Medical", cost: 1200 },
];

const OPEX_TOTAL = OPERATING_COSTS.reduce((sum, r) => sum + r.cost, 0);

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function BudgetTable() {
  const [mode, setMode] = useState<"weekday" | "weekend">("weekend");

  const rows = VENUE_RENTAL.map((r) => {
    const rental = mode === "weekday" ? r.weekday : r.weekend;
    return { month: r.month, rental, total: rental + OPEX_TOTAL };
  });

  const low = Math.min(...rows.map((r) => r.total));
  const high = Math.max(...rows.map((r) => r.total));

  return (
    <div className="space-y-10">
      {/* Operating costs */}
      <div>
        <h3 className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase mb-4">
          Operating costs — fixed
        </h3>
        <div className="rounded-xl border border-[#2A2D33] bg-[#1A1D23] overflow-hidden">
          {OPERATING_COSTS.map((row) => (
            <div
              key={row.item}
              className="flex items-baseline justify-between gap-6 px-5 py-4 border-b border-[#2A2D33]"
            >
              <div className="min-w-0">
                <p className="text-[#F0EDE8] text-sm font-medium">{row.item}</p>
                {row.note && (
                  <p className="text-[#6B6760] text-xs mt-1 leading-relaxed">
                    {row.note}
                  </p>
                )}
              </div>
              <p className="font-mono text-[#F0EDE8] text-sm shrink-0">
                {usd(row.cost)}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between gap-6 px-5 py-4 bg-[#24272E]">
            <p className="text-[#F0EDE8] text-sm font-semibold tracking-wide uppercase">
              Operating subtotal
            </p>
            <p className="font-mono text-[#C49A6C] text-base font-semibold">
              {usd(OPEX_TOTAL)}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly totals */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
            Grand total by month
          </h3>
          <div
            className="inline-flex rounded-full border border-[#2A2D33] p-1"
            role="group"
            aria-label="Weekday or weekend pricing"
          >
            {(["weekday", "weekend"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`inline-flex items-center justify-center min-h-[40px] sm:min-h-0 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors ${
                  mode === m
                    ? "bg-[#C49A6C] text-[#0F1115]"
                    : "text-[#9B978F] hover:text-[#F0EDE8]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#2A2D33] overflow-hidden">
          <div className="overflow-x-auto">
            {/* Operating is a constant repeated down every row, so on phones it
                is dropped in favour of the grand total — otherwise the column
                people actually came for is the one pushed off-screen. */}
            <table className="w-full sm:min-w-[520px] text-sm">
              <caption className="sr-only">
                Insomniac 360 venue buyout and operating cost totals by month,{" "}
                {mode} rate
              </caption>
              <thead>
                <tr className="bg-[#24272E] text-left">
                  <th
                    scope="col"
                    className="px-3 sm:px-5 py-3 font-semibold text-[#9B978F] text-xs tracking-wide sm:tracking-widest uppercase"
                  >
                    Month
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-5 py-3 font-semibold text-[#9B978F] text-xs tracking-wide sm:tracking-widest uppercase text-right"
                  >
                    Venue buyout
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-3 sm:px-5 py-3 font-semibold text-[#9B978F] text-xs tracking-wide sm:tracking-widest uppercase text-right"
                  >
                    Operating
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-5 py-3 font-semibold text-[#9B978F] text-xs tracking-wide sm:tracking-widest uppercase text-right"
                  >
                    Grand total
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.month}
                    className="border-t border-[#2A2D33] bg-[#1A1D23] hover:bg-[#24272E] transition-colors"
                  >
                    <th
                      scope="row"
                      className="px-3 sm:px-5 py-3 text-left font-medium text-[#F0EDE8]"
                    >
                      {r.month}
                    </th>
                    <td className="px-3 sm:px-5 py-3 font-mono text-right text-[#9B978F]">
                      {usd(r.rental)}
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-5 py-3 font-mono text-right text-[#9B978F]">
                      {usd(OPEX_TOTAL)}
                    </td>
                    <td className="px-3 sm:px-5 py-3 font-mono text-right text-[#F0EDE8] font-semibold">
                      {usd(r.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-[#9B978F] text-sm mt-4 leading-relaxed">
          <span className="text-[#F0EDE8] font-semibold">
            {usd(low)} – {usd(high)}
          </span>{" "}
          per {mode} activation, depending on month. Venue buyout plus fixed
          operating costs. Production, branding, talent, and F&amp;B programming
          are scoped and quoted separately.
        </p>
      </div>
    </div>
  );
}
