"use client";

import { useState } from "react";

export default function DeckDownload() {
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [deckUrl, setDeckUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/deck-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          organizationName: orgName || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.deckUrl) {
        setStatus("success");
        setDeckUrl(data.deckUrl);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" && deckUrl) {
    return (
      <div className="text-center space-y-4">
        <p className="text-[#C49A6C] text-sm font-semibold uppercase tracking-wider">
          Deck sent to your inbox
        </p>
        <a
          href={deckUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg text-sm btn-shimmer text-[#0F1115] hover:bg-[#D4AA7C]"
        >
          Download Now (PDF)
        </a>
        <p className="text-[#6B6760] text-xs">
          Also check your email for a copy
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
      <div className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your work email"
          className="flex-1 bg-[#24272E] border border-[#2A2D33] rounded-lg px-4 py-3 text-[#F0EDE8] text-sm placeholder:text-[#6B6760] focus:outline-none focus:border-[#C49A6C] transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg text-sm btn-shimmer text-[#0F1115] hover:bg-[#D4AA7C] disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "Sending..." : "Get the Deck"}
        </button>
      </div>
      <input
        type="text"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        placeholder="Company (optional)"
        className="w-full bg-[#24272E] border border-[#2A2D33] rounded-lg px-4 py-3 text-[#F0EDE8] text-sm placeholder:text-[#6B6760] focus:outline-none focus:border-[#C49A6C] transition-colors"
      />
      {status === "error" && (
        <p className="text-red-400 text-xs text-center">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
