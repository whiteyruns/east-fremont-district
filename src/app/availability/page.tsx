"use client";

import { useState, useEffect, useCallback } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface Venue {
  id: string;
  slug: string;
  name: string;
  capacity: number;
  is_cbm_operated: boolean;
}

interface AvailabilityRecord {
  venue_id: string;
  date: string;
  status: "available" | "held" | "booked";
  notes: string | null;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function getStatusForDate(
  venueId: string,
  dateStr: string,
  availability: AvailabilityRecord[]
): "available" | "held" | "booked" | null {
  const record = availability.find(
    (a) => a.venue_id === venueId && a.date === dateStr
  );
  return record?.status || null;
}

export default function AvailabilityPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [venues, setVenues] = useState<Venue[]>([]);
  const [availability, setAvailability] = useState<AvailabilityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const end = `${year}-${String(month + 1).padStart(2, "0")}-${lastDay}`;

    const res = await fetch(`/api/availability?start=${start}&end=${end}`);
    if (res.ok) {
      const data = await res.json();
      setVenues(data.venues || []);
      setAvailability(data.availability || []);
    }
    setLoading(false);
  }, [year, month]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  }

  const days = getMonthDays(year, month);
  const firstDayOfWeek = days[0].getDay();
  const displayVenues = selectedVenue
    ? venues.filter((v) => v.id === selectedVenue)
    : venues;

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <section className="pt-20 pb-12 bg-[#0A0C0F]">
        <Container>
          <div className="text-center">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase mb-4">
              East Fremont District
            </p>
            <h1 className="text-[#F0EDE8] text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Venue Availability
            </h1>
            <p className="text-[#9B978F] text-lg max-w-2xl mx-auto">
              Check availability across our 8 CBM-operated venues. Select a month and venue to see open dates.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-12">
          {/* Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={prevMonth} className="text-[#9B978F] hover:text-[#F0EDE8] transition-colors text-lg px-3 py-1">
                &larr;
              </button>
              <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight min-w-[220px] text-center">
                {MONTHS[month]} {year}
              </h2>
              <button onClick={nextMonth} className="text-[#9B978F] hover:text-[#F0EDE8] transition-colors text-lg px-3 py-1">
                &rarr;
              </button>
            </div>

            {/* Venue filter */}
            <div className="flex items-center gap-3">
              <select
                value={selectedVenue || ""}
                onChange={(e) => setSelectedVenue(e.target.value || null)}
                className="bg-[#1A1D23] border border-[#2A2D33] rounded-lg px-4 py-2 text-[#F0EDE8] text-sm focus:outline-none focus:border-[#C49A6C] transition-colors"
              >
                <option value="">All Venues</option>
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C49A6C]" />
              <span className="text-[#9B978F] text-xs">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C49A6C]/40" />
              <span className="text-[#9B978F] text-xs">Held</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#6B6760]" />
              <span className="text-[#9B978F] text-xs">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1A1D23] border border-[#2A2D33]" />
              <span className="text-[#9B978F] text-xs">No data</span>
            </div>
          </div>

          {loading ? (
            <p className="text-[#9B978F] text-center py-12">Loading availability...</p>
          ) : (
            <div className="space-y-6">
              {displayVenues.map((venue) => (
                <div key={venue.id} className="bg-[#1A1D23] rounded-xl p-6 border border-[#2A2D33]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[#F0EDE8] font-bold text-lg">{venue.name}</h3>
                      <p className="text-[#6B6760] text-xs">Capacity: {venue.capacity}</p>
                    </div>
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {DAYS.map((day) => (
                      <div key={day} className="text-center text-[#6B6760] text-[10px] font-bold uppercase tracking-wider py-2">
                        {day}
                      </div>
                    ))}

                    {/* Empty cells for offset */}
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {/* Day cells */}
                    {days.map((day) => {
                      const dateStr = formatDate(day);
                      const status = getStatusForDate(venue.id, dateStr, availability);
                      const isPast = day < new Date(new Date().toDateString());
                      const isToday = dateStr === formatDate(new Date());

                      return (
                        <div
                          key={dateStr}
                          className={`relative text-center py-2 rounded-lg text-sm transition-colors ${
                            isPast
                              ? "text-[#3A3D43]"
                              : isToday
                                ? "ring-1 ring-[#C49A6C] text-[#F0EDE8]"
                                : "text-[#9B978F]"
                          }`}
                          style={{
                            background: isPast
                              ? "transparent"
                              : status === "booked"
                                ? "#6B676020"
                                : status === "held"
                                  ? "rgba(196,154,108,0.08)"
                                  : status === "available"
                                    ? "rgba(196,154,108,0.15)"
                                    : "transparent",
                          }}
                        >
                          {day.getDate()}
                          {status && !isPast && (
                            <span
                              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                              style={{
                                background:
                                  status === "available"
                                    ? "#C49A6C"
                                    : status === "held"
                                      ? "rgba(196,154,108,0.4)"
                                      : "#6B6760",
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12 space-y-4">
            <p className="text-[#9B978F] text-sm">
              See dates that work? Let&apos;s start planning your activation.
            </p>
            <Button variant="primary" href="/inquire">
              Submit Inquiry
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
