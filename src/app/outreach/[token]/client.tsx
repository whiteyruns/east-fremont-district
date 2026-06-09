"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Target {
  id: string;
  company_name: string;
  contact_name: string | null;
  email: string | null;
  personalization: {
    event_type?: string | null;
    guest_count?: string | null;
    notes?: string | null;
  };
}

const VENUES = [
  { name: "Commonwealth", desc: "Speakeasy & rooftop — 6,263 sq ft", capacity: 300 },
  { name: "Discopussy", desc: "Warehouse-style club — 5,600 sq ft", capacity: 500 },
  { name: "We All Scream", desc: "2-story nightclub with rooftop — 3,800 sq ft", capacity: 1000 },
  { name: "Park on Fremont", desc: "Restaurant & patios — 5,000 sq ft", capacity: 198 },
  { name: "Lucky Day", desc: "Tequila & mezcal house — 3,000 sq ft", capacity: 103 },
  { name: "La Mona Rosa", desc: "Mexican restaurant & bar — 3,500 sq ft", capacity: 212 },
  { name: "Cheapshot", desc: "Variety showroom — 3,000 sq ft", capacity: 99 },
];

const STATS = [
  { value: "32,000+", label: "Year 1 Attendees" },
  { value: "296.6M", label: "Earned Impressions" },
  { value: "125%", label: "Social Growth" },
  { value: "65%", label: "Stayed 45+ min" },
];

export default function OutreachClient({ target, token }: { target: Target; token: string }) {
  const [tracked, setTracked] = useState(false);

  // Track page view on mount
  useEffect(() => {
    if (!tracked) {
      fetch("/api/outreach/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "viewed" }),
      });
      setTracked(true);
    }
  }, [token, tracked]);

  function trackClick() {
    fetch("/api/outreach/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action: "clicked" }),
    });
  }

  const firstName = target.contact_name?.split(" ")[0] || "";

  return (
    <div style={{ background: "#0F1115", color: "#F0EDE8", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
        <p style={{ color: "#C49A6C", fontSize: 11, fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 24 }}>
          Prepared for {target.company_name}
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
          {firstName ? `${firstName}, here's` : "Here's"} what your activation could look like at East Fremont
        </h1>
        <p style={{ color: "#9B978F", fontSize: 16, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
          A fully programmable entertainment district — 8 venues, 20K+ sq ft of activation space,
          and a proven track record with the biggest names in music and brands.
        </p>
      </section>

      {/* Proof Stats */}
      <section style={{ padding: "40px 24px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: "#1A1D23", borderRadius: 12, padding: 20, textAlign: "center" }}>
              <p style={{ color: "#C49A6C", fontSize: 24, fontWeight: 800, fontFamily: "monospace" }}>{s.value}</p>
              <p style={{ color: "#9B978F", fontSize: 11, textTransform: "uppercase", letterSpacing: "1px", marginTop: 4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Venues */}
      <section style={{ padding: "40px 24px", maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>The Venues</h2>
        <p style={{ color: "#9B978F", fontSize: 14, marginBottom: 24 }}>
          8 CBM-operated venues on one city block — bookable individually or as a full district takeover.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {VENUES.map((v) => (
            <div key={v.name} style={{ background: "#1A1D23", borderRadius: 12, padding: 20, borderLeft: "2px solid #C49A6C40" }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{v.name}</p>
              <p style={{ color: "#9B978F", fontSize: 12 }}>{v.desc}</p>
              <p style={{ color: "#C49A6C", fontSize: 11, marginTop: 8, fontFamily: "monospace" }}>Capacity: {v.capacity}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Brands Do Here */}
      <section style={{ padding: "40px 24px", maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>What Brands Do Here</h2>
        <p style={{ color: "#9B978F", fontSize: 14, marginBottom: 24 }}>
          Not a logo-on-a-banner sponsorship — a pop-up retail environment where brands build real experiences.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { title: "Product Sampling", desc: "Put product in 15,000+ hands per event. Free entry = maximum sampling volume." },
            { title: "Pop-Up Retail", desc: "Exclusive merch drops, on-site shopping, festival collections across multiple venues." },
            { title: "Branded Experiences", desc: "Photo moments, custom stations, interactive installations. Content your audience creates and shares." },
            { title: "VIP Village", desc: "Dedicated activation space in The Lot. Premium audience, controlled environment." },
            { title: "Stage & Venue Naming", desc: "Title presence across headliner stage, individual venues, or the full event series." },
            { title: "Content Integration", desc: "Woven into $25K+ per-event content production. 2.4M+ video views and growing." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#1A1D23", borderRadius: 12, padding: 20 }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</p>
              <p style={{ color: "#9B978F", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section style={{ padding: "40px 24px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ background: "#1A1D23", borderRadius: 16, padding: 32 }}>
          <p style={{ color: "#C49A6C", fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            Case Study
          </p>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Feed the Block 2025</h3>
          <p style={{ color: "#9B978F", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            Wynn Nightlife x Corner Bar. 4 events featuring Marshmello, Diplo, Major Lazer, and Gryffin.
            32,000+ attendees, 10K+ casino crossover per event, and FOX/NBC/CBS broadcast coverage.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { value: "32K+", label: "Attendees" },
              { value: "296.6M", label: "Impressions" },
              { value: "$0.05", label: "CPM Equivalent" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#24272E", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <p style={{ color: "#C49A6C", fontSize: 20, fontWeight: 800, fontFamily: "monospace" }}>{s.value}</p>
                <p style={{ color: "#9B978F", fontSize: 10, textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 24px 80px", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
          Let&apos;s Build Your Activation
        </h2>
        <p style={{ color: "#9B978F", fontSize: 14, marginBottom: 32 }}>
          9 events remaining in 2026. Limited category exclusive slots available.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href={`/inquire?company=${encodeURIComponent(target.company_name)}&contact=${encodeURIComponent(target.contact_name || "")}&email=${encodeURIComponent(target.email || "")}&ref=outreach`}
            onClick={trackClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 28px",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 8,
              background: "#C49A6C",
              color: "#0F1115",
              textDecoration: "none",
            }}
          >
            Start a Conversation
          </Link>
          <a
            href="/FeedTheBlock-RetailSponsorship-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 28px",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 8,
              border: "1px solid #2A2D33",
              color: "#F0EDE8",
              textDecoration: "none",
            }}
          >
            Download Deck (PDF)
          </a>
        </div>
        <p style={{ color: "#6B6760", fontSize: 11, marginTop: 40, textTransform: "uppercase", letterSpacing: "2px" }}>
          Corner Bar + Wynn Las Vegas &bull; East Fremont District
        </p>
      </section>
    </div>
  );
}
