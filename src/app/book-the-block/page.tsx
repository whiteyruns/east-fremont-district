import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MetricCard from "@/components/ui/MetricCard";
import DeckDownload from "@/components/homepage/DeckDownload";

// Campaign landing page for the "Book the Block" email (sent by the LVCVA to
// its partner network). It continues the email's promise and gives the
// visitor two things to do: request the deck (primary) or start an inquiry.
// Unlisted: linked from the email, kept out of search.

export const metadata: Metadata = {
  title: "Book the Block",
  description:
    "Take over an entire block of Downtown Las Vegas. Sixteen venues, one operator, one contract — for a night, a week, or a full convention run.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Book the Block — East Fremont District",
    description:
      "An entire block of Downtown Las Vegas. Sixteen venues, one operator, one contract.",
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630 }],
  },
};

const INCLUDES = [
  {
    title: "Exclusive Brand Environment",
    body: "No competing logos, no adjacent events. The entire block reads as your brand.",
  },
  {
    title: "Category Exclusivity",
    body: "Lock your category across the district for the duration — competitors can't buy in on top of you.",
  },
  {
    title: "Full Street-Closure Theater",
    body: "Permitted closure, 15,000+ capacity, multiple stages, mobile sound stage, full-scale production.",
  },
  {
    title: "One Contract, One Operator",
    body: "Permits, F&B, production, security, content, reporting — one accountable team, one SOW.",
  },
];

function Hero() {
  return (
    <section className="relative bg-[#0F1115] overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center py-20 lg:py-28">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              Book the Block · Downtown Las Vegas
            </p>
            <h1 className="text-[#F0EDE8] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              One block. Sixteen venues.{" "}
              <span className="text-[#C49A6C]">One contract.</span>
            </h1>
            <p className="text-[#9B978F] text-lg leading-relaxed max-w-xl">
              The East Fremont District is a single block of Downtown Las Vegas
              you can take over outright. For a night, a week, or a full
              convention run, your brand owns every touchpoint inside it —
              building wraps, street closures, rooftops, F&amp;B, production,
              and permitting.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" href="#deck">
                Get the Deck
              </Button>
              <Button variant="secondary" href="/inquire">
                Start Your Inquiry
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#2A2D33]">
              <Image
                src="/images/case-studies/feed-the-block/feed-the-block-01.webp"
                alt="Fremont East closed to traffic and packed end to end during Feed the Block"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-3 text-[#6B6760] text-xs">
              Feed the Block — the district packed end to end, street closed, stage lit.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Includes() {
  return (
    <section className="py-20 lg:py-24 bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              What a takeover includes
            </p>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
              Not a ballroom. Not a single venue. The whole block.
            </h2>
            <p className="text-[#9B978F] text-lg leading-relaxed">
              F.E.E.D. is a downtown platform built for CES, F1,
              convention-week takeovers, product launches, and city-scale
              cultural programming.
            </p>
          </div>
          <ul className="lg:col-span-7 divide-y divide-[#2A2D33] border-y border-[#2A2D33]">
            {INCLUDES.map((item) => (
              <li key={item.title} className="py-5">
                <p className="text-[#C49A6C] text-xs font-bold tracking-widest uppercase mb-1">
                  {item.title}
                </p>
                <p className="text-[#9B978F] text-sm leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function Proof() {
  return (
    <section className="py-20 lg:py-24 bg-[#0F1115]">
      <Container>
        <div className="space-y-14">
          <div className="text-center space-y-3">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              Proven on the block
            </p>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
              Year one, by the numbers
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            <MetricCard value="32,000+" label="Attendees" sublabel="Feed the Block concert series" />
            <MetricCard value="296.6M" label="Earned-media impressions" />
            <MetricCard value="10,000+" label="Casino visits per event" sublabel="Tracked via mobile location data" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden">
            <div className="lg:col-span-5 relative min-h-[260px]">
              <Image
                src="/images/case-studies/transunion-2026/transunion-01.webp"
                alt="TransUnion's CES 2026 activation on Fremont East"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-8 lg:p-10 space-y-4">
              <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
                Case in point · CES 2026
              </p>
              <h3 className="text-[#F0EDE8] text-2xl lg:text-3xl font-bold tracking-tight">
                TransUnion took the block for three days.
              </h3>
              <p className="text-[#9B978F] leading-relaxed">
                Building wraps across the district, a street-level activation on
                Fremont, and rooftop receptions at Commonwealth.{" "}
                <span className="text-[#F0EDE8]">2,500+ guests. 4.1M brand impressions.</span>{" "}
                One contract.
              </p>
              <Link
                href="/case-studies/transunion-ces-2026"
                className="inline-block text-[#C49A6C] hover:text-[#D4AA7C] text-sm font-semibold"
              >
                Read the case study →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Deck() {
  return (
    <section id="deck" className="py-20 lg:py-24 bg-[#1A1D23] border-y border-[#2A2D33] scroll-mt-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              The deck
            </p>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
              Get the Book the Block deck
            </h2>
            <p className="text-[#9B978F] text-lg leading-relaxed">
              Thirteen pages: the canvas, what a takeover unlocks, how the
              district is operated, and what year one delivered. We&apos;ll send it
              to your inbox.
            </p>
          </div>
          <DeckDownload />
        </div>
      </Container>
    </section>
  );
}

function Window() {
  return (
    <section className="py-20 lg:py-24 bg-[#0F1115]">
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
            Let&apos;s find your window
          </h2>
          <p className="text-[#9B978F] text-lg leading-relaxed">
            Tentpole weeks like CES and F1 get claimed a year or more in
            advance, as conventions lock their event dates early. Tell us your
            goals and we&apos;ll map an activation tier, footprint, and indicative
            budget within five business days.
          </p>
          <Button variant="primary" href="/inquire">
            Start Your Inquiry
          </Button>
          <p className="text-[#6B6760] text-sm">
            Or write to us at{" "}
            <span className="text-[#C49A6C]">booktheblock@cornerbar.com</span>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default function BookTheBlockPage() {
  return (
    <>
      <Hero />
      <Includes />
      <Proof />
      <Deck />
      <Window />
    </>
  );
}
