'use client';

import Button from "@/components/ui/Button";

export default function HeroVideo() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0A0C0F]">
      {/* Video Background */}
      <video
        src="/video/hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C0F]/40 via-[#0A0C0F]/20 to-[#0A0C0F]/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 px-6 text-center">
        <div className="space-y-6 max-w-4xl">
          {/* Label */}
          <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
            Downtown Las Vegas
          </p>

          {/* Headline */}
          <h1 className="text-[#F0EDE8] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Urban Event Infrastructure
          </h1>

          {/* Description */}
          <p className="text-[#9B978F] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Three integrated city blocks. Five premium venues. One unified operating platform for brands and event producers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="primary" href="/inquire">
              Submit Inquiry
            </Button>
            <Button variant="secondary" href="/district">
              Explore the District
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
