import Container from "@/components/ui/Container";

// The two-minute block sizzle, shared by both Book the Block landing pages.
// Email clients can't play video, so the emails show a poster that links
// here (#video). Renders only once the video has a host:
// NEXT_PUBLIC_BLOCK_VIDEO_EMBED (an iframe player URL — Cloudflare Stream) or
// NEXT_PUBLIC_BLOCK_VIDEO_URL (an mp4 for the native player). Changing either
// needs a rebuild.
const VIDEO_EMBED = process.env.NEXT_PUBLIC_BLOCK_VIDEO_EMBED;
const VIDEO_URL = process.env.NEXT_PUBLIC_BLOCK_VIDEO_URL;

export default function Video() {
  if (!VIDEO_EMBED && !VIDEO_URL) return null;
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
          <div className="relative aspect-video rounded-lg overflow-hidden border border-[#2A2D33] bg-black">
            {VIDEO_EMBED ? (
              <iframe
                src={VIDEO_EMBED}
                title="The Block — East Fremont District"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <video
                className="absolute inset-0 w-full h-full"
                controls
                playsInline
                preload="metadata"
                poster="/images/book-the-block/video-poster.jpg"
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
