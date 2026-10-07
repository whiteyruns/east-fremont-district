import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MetricCard from "@/components/ui/MetricCard";
import Video from "@/components/book-the-block/Video";

// Planner-facing Book the Block page: the private-buyout story. This is what
// the LVCVA partner email links to. The brand-activation story (impressions,
// reach, tentpole weeks) lives at /book-the-block; this one leads with privacy,
// control and capacity for a group. No deck gate here — the deck is written
// for brands; the primary action is the inquiry.

export const metadata: Metadata = {
  title: "Book the Block · Private Buyouts",
  description:
    "Close an entire block of Downtown Las Vegas for your group. Thirteen venues, one street, one contract — private for a night, a week, or a full program.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Your own block of Downtown Las Vegas, closed to the public",
    description:
      "Thirteen venues, one street, one contract. Private for a night, a week, or a full program.",
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630 }],
  },
};

const INCLUDES = [
  {
    title: "Private by default",
    body: "The street closes, the venues go private, access is credentialed. No walk-ins, no other events, nothing competing for your guests' attention.",
  },
  {
    title: "One contract, one operator",
    body: "Permits, security, F&B, production, staffing and reporting, from one accountable team.",
  },
  {
    title: "Room for any group",
    body: "61,600 sq ft indoors, 15,000 capacity with the street closed, and venues from a 99-seat showroom to a 1,000-guest rooftop club.",
  },
  {
    title: "Downtown, close to everything",
    body: "Minutes from the Strip and the Convention Center, in a district your guests will remember.",
  },
];

const PROGRAMS = [
  "Welcome receptions",
  "Executive dinners",
  "Incentive nights",
  "Awards and galas",
  "Convention off-sites",
  "Multi-day programs",
];

function Hero() {
  return (
    <section className="relative bg-[#0F1115] overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center py-20 lg:py-28">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              Book the Block · Private buyouts
            </p>
            <h1 className="text-[#F0EDE8] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Your own block of Downtown Las Vegas,{" "}
              <span className="text-[#C49A6C]">closed to the public.</span>
            </h1>
            <p className="text-[#9B978F] text-lg leading-relaxed max-w-xl">
              The East Fremont District is a single block of thirteen venues,
              run by one operator, that you can close and take over for your
              group. For a night, a week, or a full program, the street closes,
              every venue goes private, and your guests are the only people on
              it.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" href="/inquire?type=corporate">
                Start Your Inquiry
              </Button>
              <Button variant="secondary" href="#video">
                Watch the block in two minutes
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <a href="#video" className="block relative aspect-video rounded-lg overflow-hidden border border-[#2A2D33] group">
              <Image
                src="/images/book-the-block/video-poster.jpg"
                alt="Aerial view of Fremont East at night"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full border-2 border-[#C49A6C] bg-[#0F1115]/70 flex items-center justify-center group-hover:bg-[#0F1115]/90 transition-colors">
                  <span className="ml-1 border-y-[11px] border-y-transparent border-l-[18px] border-l-[#F0EDE8]" />
                </span>
              </span>
            </a>
            <p className="mt-3 text-[#6B6760] text-xs">
              Two minutes on the block, from the air to the rooftops.
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
          <div className="lg:col-span-5 space-y-5">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              Your guests only
            </p>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
              Private programs at a scale a single venue can&apos;t hold.
            </h2>
            <p className="text-[#9B978F] text-lg leading-relaxed">
              For 200 to 10,000+ guests across rooftops, clubs, restaurants and
              a closed street.
            </p>
            <ul className="flex flex-wrap gap-2 pt-1">
              {PROGRAMS.map((p) => (
                <li
                  key={p}
                  className="text-[#F0EDE8] text-xs font-semibold tracking-wide uppercase border border-[#2A2D33] rounded-full px-3 py-1.5"
                >
                  {p}
                </li>
              ))}
            </ul>
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
          <div className="grid sm:grid-cols-3 gap-10">
            <MetricCard value="13" label="Venues on one block" sublabel="Rooftops, clubs, restaurants, a showroom" />
            <MetricCard value="61,600" label="Sq ft indoors" sublabel="Plus the street itself" />
            <MetricCard value="15,000" label="Capacity, street closed" sublabel="200 to 10,000+ guest programs" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch bg-[#1A1D23] border border-[#2A2D33] rounded-lg overflow-hidden">
            <div className="lg:col-span-5 relative min-h-[260px]">
              <Image
                src="/images/case-studies/transunion-2026/transunion-01.webp"
                alt="TransUnion's private program on Fremont East during CES 2026"
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
                TransUnion hosted 2,500 executives over three days.
              </h3>
              <p className="text-[#9B978F] leading-relaxed">
                Private receptions, rooftop dinners and a closed street, all run
                by one team under one contract.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Dates() {
  return (
    <section className="py-20 lg:py-24 bg-[#1A1D23] border-t border-[#2A2D33]">
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
            Let&apos;s find your dates
          </h2>
          <p className="text-[#9B978F] text-lg leading-relaxed">
            Tell us your group size, dates and goals, and within five business
            days we&apos;ll come back with a footprint, a program outline and an
            indicative budget.
          </p>
          <Button variant="primary" href="/inquire?type=corporate">
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

export default function PrivateBuyoutPage() {
  return (
    <>
      <Hero />
      <Video />
      <Includes />
      <Proof />
      <Dates />
    </>
  );
}
