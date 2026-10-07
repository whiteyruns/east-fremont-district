import Image from "next/image";
import Container from "@/components/ui/Container";

// The two-minute block sizzle, shared by the Book the Block pages.
// Email clients can't play video, so the emails show a poster that links
// to #video. The player needs a host: NEXT_PUBLIC_BLOCK_VIDEO_EMBED (an
// iframe player URL — Cloudflare Stream) or NEXT_PUBLIC_BLOCK_VIDEO_URL (an
// mp4 for the native player). Changing either needs a rebuild.
const VIDEO_EMBED = process.env.NEXT_PUBLIC_BLOCK_VIDEO_EMBED;
const VIDEO_URL = process.env.NEXT_PUBLIC_BLOCK_VIDEO_URL;
const POSTER = "/images/book-the-block/video-poster.jpg";

export const hasVideo = Boolean(VIDEO_EMBED || VIDEO_URL);

// Just the player, for pages that place it themselves (the private page puts
// it in the hero). Falls back to the poster still when no host is set.
export function VideoPlayer({ id, className = "" }: { id?: string; className?: string }) {
  return (
    <div
      id={id}
      className={`relative aspect-video rounded-lg overflow-hidden border border-[#2A2D33] bg-black scroll-mt-20 ${className}`}
    >
      {VIDEO_EMBED ? (
        <iframe
          src={VIDEO_EMBED}
          title="The Block — East Fremont District"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : VIDEO_URL ? (
        <video
          className="absolute inset-0 w-full h-full"
          controls
          playsInline
          preload="metadata"
          poster={POSTER}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={POSTER}
          alt="Aerial view of Fremont East at night"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      )}
    </div>
  );
}

// The full "Watch" section used on the brand-activation page.
export default function Video() {
  if (!hasVideo) return null;
  return (
    <section id="video" className="py-20 lg:py-24 bg-[#0F1115] scroll-mt-20">
      <Container>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
              Watch
            </p>
            <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold tracking-tight">
              The block in two minutes
            </h2>
          </div>
          <VideoPlayer />
        </div>
      </Container>
    </section>
  );
}
