import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import TourRsvpForm from "@/components/book-the-block/TourRsvpForm";
import {
  TOUR_DATES,
  TOUR_TIME_LABEL,
  TOUR_DURATION_MIN,
  MEETING_POINT,
  HOST,
  PARKING_GUIDANCE,
  PARKING_FALLBACK,
  WHAT_YOU_WILL_SEE,
} from "@/lib/block-tour";

// IMEX America week (Oct 13–15, 2026): a hosted morning walk of the block for
// invited planners. Unlisted — the link goes out with personal invitations
// and carries utm_source=imex. Details live in src/lib/block-tour.ts.

export const metadata: Metadata = {
  title: "Walk the Block · IMEX Week",
  description:
    "Three mornings during IMEX America: a hosted walk of the East Fremont District, meeting at Pink Monkey at 9:30 AM.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Walk the block during IMEX",
    description: `${TOUR_DATES[0].short}–${TOUR_DATES[2].short}, ${TOUR_TIME_LABEL}. Meet at ${MEETING_POINT.venue}, Downtown Las Vegas.`,
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630 }],
  },
};

function Hero() {
  return (
    <section className="relative bg-[#0F1115] overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center py-20 lg:py-28">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              IMEX America · October 13–15
            </p>
            <h1 className="text-[#F0EDE8] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Walk the block{" "}
              <span className="text-[#C49A6C]">before your first appointment.</span>
            </h1>
            <p className="text-[#9B978F] text-lg leading-relaxed max-w-xl">
              Three mornings during IMEX, {HOST.name} from {HOST.org} hosts a
              {" "}{TOUR_DURATION_MIN}-minute walk of the East Fremont District: a
              single Downtown block of thirteen venues that closes to the public
              for one group at a time. Meet at {MEETING_POINT.venue} at{" "}
              {TOUR_TIME_LABEL} and you&apos;re back at Mandalay Bay by
              mid-morning.
            </p>
            <ul className="flex flex-wrap gap-2 pt-1">
              {TOUR_DATES.map((d) => (
                <li
                  key={d.iso}
                  className="text-[#F0EDE8] text-xs font-semibold tracking-wide uppercase border border-[#2A2D33] rounded-full px-3 py-1.5"
                >
                  {d.short} · {TOUR_TIME_LABEL}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-[#2A2D33]">
              <Image
                src="/images/book-the-block/video-poster.jpg"
                alt="Aerial view of Fremont East at night"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-3 text-[#6B6760] text-xs">
              Small groups only. Reserve a morning below.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Details() {
  return (
    <section className="py-20 lg:py-24 bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              What you&apos;ll see
            </p>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
              The whole block, with the people who run it.
            </h2>
            <ul className="space-y-3 pt-1">
              {WHAT_YOU_WILL_SEE.map((item) => (
                <li key={item} className="flex gap-3 text-[#9B978F] text-sm leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C49A6C] flex-none" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <dl className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 divide-y sm:divide-y-0 divide-[#2A2D33] border-y border-[#2A2D33] sm:border-y-0">
            <div className="py-5 sm:border-t sm:border-b sm:border-[#2A2D33]">
              <dt className="text-[#C49A6C] text-xs font-bold tracking-widest uppercase mb-1">Meet at</dt>
              <dd className="text-[#F0EDE8] text-sm leading-relaxed">
                {MEETING_POINT.venue}
                <br />
                <span className="text-[#9B978F]">{MEETING_POINT.address}</span>
                <br />
                <span className="text-[#9B978F]">{MEETING_POINT.hint}</span> ·{" "}
                <a href={MEETING_POINT.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-[#C49A6C] hover:text-[#D4AA7C]">
                  Map
                </a>
              </dd>
            </div>
            <div className="py-5 sm:border-t sm:border-b sm:border-[#2A2D33]">
              <dt className="text-[#C49A6C] text-xs font-bold tracking-widest uppercase mb-1">When</dt>
              <dd className="text-[#F0EDE8] text-sm leading-relaxed">
                Tuesday, Wednesday or Thursday
                <br />
                <span className="text-[#9B978F]">{TOUR_TIME_LABEL} · about {TOUR_DURATION_MIN} minutes</span>
              </dd>
            </div>
            <div className="py-5 sm:border-b sm:border-[#2A2D33]">
              <dt className="text-[#C49A6C] text-xs font-bold tracking-widest uppercase mb-1">Getting here</dt>
              <dd className="text-[#9B978F] text-sm leading-relaxed">
                A short rideshare from the Strip or the Convention Center.{" "}
                {PARKING_GUIDANCE ?? PARKING_FALLBACK}
              </dd>
            </div>
            <div className="py-5 sm:border-b sm:border-[#2A2D33]">
              <dt className="text-[#C49A6C] text-xs font-bold tracking-widest uppercase mb-1">Your host</dt>
              <dd className="text-[#9B978F] text-sm leading-relaxed">
                {HOST.name}, {HOST.org}
                <br />
                <span className="text-[#C49A6C]">{HOST.email}</span>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Rsvp() {
  return (
    <section id="rsvp" className="py-20 lg:py-24 bg-[#0F1115] scroll-mt-20">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              Reserve a morning
            </p>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
              Tell us which day and who&apos;s coming.
            </h2>
            <p className="text-[#9B978F] text-base leading-relaxed">
              You&apos;ll get a confirmation with a calendar invite and the meeting
              point. Bring colleagues or a client; just count them below.
            </p>
          </div>
          <TourRsvpForm />
          <p className="text-[#6B6760] text-sm">
            Can&apos;t make a morning?{" "}
            <a href="/book-the-block/private" className="text-[#C49A6C] hover:text-[#D4AA7C]">
              See the block online
            </a>{" "}
            or write to <span className="text-[#C49A6C]">booktheblock@cornerbar.com</span>.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default function ImexTourPage() {
  return (
    <>
      <Hero />
      <Details />
      <Rsvp />
    </>
  );
}
