'use client';

import Button from "@/components/ui/Button";

export default function HeroVideo() {
  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-[#0A0C0F]">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/homepage/hero-main.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero-drone.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C0F]/40 via-[#0A0C0F]/20 to-[#0A0C0F]/60" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 px-6 text-center">
          <div className="space-y-6 max-w-4xl">
            {/* Headline */}
            <h1 className="text-[#F0EDE8] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Rent an Entire
              <br />
              Entertainment District
            </h1>

            {/* Subheadline */}
            <p className="text-[#9B978F] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Transform East Fremont into a fully customized, multi-venue event experience — built, staffed, and operated end-to-end in the heart of Las Vegas.
            </p>

            {/* Supporting line */}
            <p className="text-[#C49A6C] text-sm font-semibold tracking-widest uppercase">
              One partner. Full control. Zero fragmentation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="secondary" href="/district">
                Explore the District
              </Button>
              <Button variant="primary" href="/inquire">
                Plan Your Event
              </Button>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
