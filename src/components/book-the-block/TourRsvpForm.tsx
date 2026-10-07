"use client";

import { useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import Button from "@/components/ui/Button";
import { TOUR_DATES, TOUR_TIME_LABEL, MAX_PARTY_SIZE, MEETING_POINT } from "@/lib/block-tour";

const INPUT =
  "w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6760] focus:outline-none focus:border-[#C49A6C] transition-colors";
const LABEL = "block text-[#9B978F] text-sm font-semibold mb-2";

export default function TourRsvpForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    title: "",
    email: "",
    phone: "",
    tourDate: TOUR_DATES[0].iso,
    partySize: "1",
    optIn: true,
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/block-tour-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, partySize: Number(form.partySize) }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        sendGTMEvent({ event: "tour_rsvp", tour_date: data.tourDate });
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    const date = TOUR_DATES.find((d) => d.iso === form.tourDate);
    return (
      <div className="bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-8 text-center space-y-3">
        <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">You&apos;re on the walk</p>
        <p className="text-[#F0EDE8] text-2xl font-bold tracking-tight">
          {date?.label}, {TOUR_TIME_LABEL} at {MEETING_POINT.venue}
        </p>
        <p className="text-[#9B978F] text-sm leading-relaxed max-w-md mx-auto">
          A confirmation with a calendar invite is on its way to {form.email}. If your
          schedule moves, reply to it and we&apos;ll shift you to another morning.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="space-y-3">
        <legend className={LABEL}>Which morning?</legend>
        <div className="grid sm:grid-cols-3 gap-3">
          {TOUR_DATES.map((d) => {
            const active = form.tourDate === d.iso;
            return (
              <label
                key={d.iso}
                className={`cursor-pointer rounded-md border px-4 py-3 text-center transition-colors ${
                  active
                    ? "border-[#C49A6C] bg-[#C49A6C]/10 text-[#F0EDE8]"
                    : "border-[#2A2D33] bg-[#24272E] text-[#9B978F] hover:border-[#3A3D43]"
                }`}
              >
                <input
                  type="radio"
                  name="tourDate"
                  value={d.iso}
                  checked={active}
                  onChange={update}
                  className="sr-only"
                />
                <span className="block text-sm font-semibold">{d.short}</span>
                <span className="block text-xs mt-0.5">{TOUR_TIME_LABEL}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={LABEL} htmlFor="tour-name">Name</label>
          <input id="tour-name" name="name" type="text" required value={form.name} onChange={update} className={INPUT} autoComplete="name" />
        </div>
        <div>
          <label className={LABEL} htmlFor="tour-company">Company</label>
          <input id="tour-company" name="company" type="text" required value={form.company} onChange={update} className={INPUT} autoComplete="organization" />
        </div>
        <div>
          <label className={LABEL} htmlFor="tour-title">Title <span className="font-normal text-[#6B6760]">(optional)</span></label>
          <input id="tour-title" name="title" type="text" value={form.title} onChange={update} className={INPUT} autoComplete="organization-title" />
        </div>
        <div>
          <label className={LABEL} htmlFor="tour-party">Party size</label>
          <select id="tour-party" name="partySize" value={form.partySize} onChange={update} className={INPUT}>
            {Array.from({ length: MAX_PARTY_SIZE }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n === 1 ? "Just me" : `${n} people`}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="tour-email">Email</label>
          <input id="tour-email" name="email" type="email" required value={form.email} onChange={update} className={INPUT} autoComplete="email" />
        </div>
        <div>
          <label className={LABEL} htmlFor="tour-phone">Mobile <span className="font-normal text-[#6B6760]">(for the morning of)</span></label>
          <input id="tour-phone" name="phone" type="tel" value={form.phone} onChange={update} className={INPUT} autoComplete="tel" />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="tour-notes">Anything we should know? <span className="font-normal text-[#6B6760]">(optional)</span></label>
        <textarea id="tour-notes" name="notes" rows={2} value={form.notes} onChange={update} className={INPUT} placeholder="Group size you're planning for, dates you have in mind, a client you're scouting for" />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="optIn"
          checked={form.optIn}
          onChange={update}
          className="mt-1 h-4 w-4 accent-[#C49A6C]"
        />
        <span className="text-[#9B978F] text-sm leading-relaxed">
          Corner Bar may contact me after IMEX about private programs on the block.
        </span>
      </label>

      {status === "error" && (
        <p className="text-[#E58A63] text-sm" role="alert">{error}</p>
      )}

      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Saving your spot…" : "Reserve my spot"}
      </Button>
    </form>
  );
}
