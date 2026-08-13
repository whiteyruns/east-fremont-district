"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background: the FEED THE BLOCK w/ MARSHMELLO recap, streamed from
 * Vimeo (1180884686, Corner Bar Management, 49s, 2026-04-02).
 *
 * Why an iframe rather than a self-hosted <video> like the rest of the site:
 * the recap only exists on Vimeo. Its download endpoint is not open to us, so
 * there is no file to drop in /public. This mirrors the pattern swan-forest
 * already uses for the same clip (`VimeoBackground.tsx`).
 *
 * The poster is a still from the same night, so the swap from image to video
 * doesn't jump. It renders immediately and stays underneath — if Vimeo is
 * blocked, slow, or refuses to embed, the hero degrades to that still rather
 * than to a black box.
 */

const VIMEO_ID = "1180884686";
const POSTER = "/images/insomniac360/hero-marshmello.webp";

function embedUrl(id: string) {
  const params = new URLSearchParams({
    background: "1", // no chrome, no controls
    autoplay: "1",
    loop: "1",
    muted: "1",
    autopause: "0",
    playsinline: "1",
    title: "0",
    byline: "0",
    portrait: "0",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}

export default function VimeoHero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  /**
   * Under prefers-reduced-motion the iframe is never mounted at all — nothing
   * to pause, and no video is fetched. Starts false so the server render
   * matches the common case; a reduce-motion client drops the iframe on mount.
   */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /**
   * Only cross-fade once Vimeo reports frames actually advancing.
   *
   * This matters: the clip is domain-restricted, so on any origin that isn't
   * allowlisted in its Vimeo privacy settings the iframe still loads and still
   * fires `onLoad` — it just renders nothing. Fading the poster on load (or on
   * a timer) therefore blacks out the hero on exactly the domains where the
   * video doesn't work. Waiting for `playProgress` means a blocked embed
   * simply leaves the still in place, which is a perfectly good hero.
   *
   * Uses the player's postMessage protocol directly rather than pulling in
   * @vimeo/player for one event.
   */
  useEffect(() => {
    if (reduceMotion) return;
    const target = frameRef.current?.contentWindow;

    const subscribe = () => {
      for (const value of ["play", "playProgress"]) {
        target?.postMessage(
          JSON.stringify({ method: "addEventListener", value }),
          "https://player.vimeo.com",
        );
      }
    };

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://player.vimeo.com") return;
      let msg: { event?: string; data?: { seconds?: number } };
      try {
        msg = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (msg?.event === "ready") subscribe();
      if (msg?.event === "play") setPlaying(true);
      if (msg?.event === "playProgress" && (msg.data?.seconds ?? 0) > 0) {
        setPlaying(true);
      }
    };

    window.addEventListener("message", onMessage);
    // The player may already be ready before this effect runs.
    const t = setTimeout(subscribe, 400);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(t);
    };
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A0C0F]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: playing ? 0 : 1 }}
      />

      {!reduceMotion && (
        <iframe
          ref={frameRef}
          src={embedUrl(VIMEO_ID)}
          title="FEED THE BLOCK with Marshmello — Fremont East, April 2026"
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute border-0 pointer-events-none transition-opacity duration-1000"
          style={{
            // 16:9 cover: whichever axis is short gets overshot, then centred.
            top: "50%",
            left: "50%",
            width: "177.78vh",
            height: "56.25vw",
            minWidth: "100%",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            opacity: playing ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
