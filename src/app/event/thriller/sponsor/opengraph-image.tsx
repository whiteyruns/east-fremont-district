import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Sponsor the World's Largest Thriller Dance — a Guinness World Record attempt on Fremont East, Oct 25, 2026";

// Google Fonts serves WOFF2 by default, which Satori doesn't support.
// An old-browser UA forces the TTF response.
const TTF_UA =
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.0.0 Safari/537.36";

async function loadFont(family: string, text?: string): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}${
    text ? `&text=${encodeURIComponent(text)}` : ""
  }`;
  const css = await fetch(cssUrl, { headers: { "User-Agent": TTF_UA } }).then(
    (r) => r.text(),
  );
  const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`Font src not found for ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OgImage() {
  const [nosifer, cormorant, cormorantItalic, jetbrains, zombieBuf] =
    await Promise.all([
      loadFont("Nosifer", "THRILLER"),
      loadFont("Cormorant+Garamond:wght@500"),
      loadFont("Cormorant+Garamond:ital,wght@1,500"),
      loadFont("JetBrains+Mono:wght@500"),
      fs.readFile(
        path.join(process.cwd(), "public/images/thriller/zombie_bg.png"),
      ),
    ]);

  const zombieDataUrl = `data:image/png;base64,${zombieBuf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#0E0E14",
        }}
      >
        {/* zombie backdrop */}
        <img
          src={zombieDataUrl}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
            objectPosition: "center 60%",
          }}
        />
        {/* base dark wash — keeps the zombies legible without overpowering */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "rgba(14,14,20,0.72)",
          }}
        />
        {/* top letterbox — for brand + partnership pill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "260px",
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(10,10,16,0.95) 0%, rgba(10,10,16,0.82) 55%, rgba(10,10,16,0) 100%)",
          }}
        />
        {/* bottom letterbox — for subtitle (heavier than top) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "1200px",
            height: "280px",
            display: "flex",
            background:
              "linear-gradient(0deg, rgba(8,8,14,0.98) 0%, rgba(8,8,14,0.94) 35%, rgba(8,8,14,0.7) 65%, rgba(8,8,14,0) 100%)",
          }}
        />
        {/* warm gold tint to tie palette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 60% 40% at 75% 30%, rgba(196,154,108,0.16), transparent 60%)",
          }}
        />

        {/* content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "46px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* top row: brand mark + partnership pill */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  border: "1px solid #C49A6C",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C49A6C",
                  fontFamily: "Cormorant",
                  fontStyle: "italic",
                  fontSize: 28,
                }}
              >
                F
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: 18,
                    color: "#F0EDE8",
                    letterSpacing: 4,
                    fontFamily: "JetBrains",
                  }}
                >
                  F.E.E.D.
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "#9B978F",
                    letterSpacing: 3,
                    fontFamily: "JetBrains",
                    marginTop: 2,
                  }}
                >
                  FREMONT EAST
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "12px 22px",
                border: "1px solid rgba(196,154,108,0.4)",
                color: "#C49A6C",
                fontSize: 15,
                letterSpacing: 4,
                fontFamily: "JetBrains",
                background: "rgba(196,154,108,0.06)",
              }}
            >
              PARTNERSHIP
            </div>
          </div>

          {/* middle: headline */}
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 8 }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 68,
                color: "#F0EDE8",
                fontFamily: "Cormorant",
                lineHeight: 0.95,
                letterSpacing: -2,
              }}
            >
              Sponsor the
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Nosifer",
                color: "#C8102E",
                fontSize: 146,
                lineHeight: 0.9,
                marginTop: 12,
                transform: "rotate(-2deg)",
                textShadow:
                  "0 0 32px rgba(200,16,46,0.6), 0 6px 0 rgba(0,0,0,0.55)",
              }}
            >
              THRILLER
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 80,
                color: "#F0EDE8",
                fontFamily: "Cormorant",
                lineHeight: 0.95,
                letterSpacing: -2,
                marginTop: 10,
              }}
            >
              Record
            </div>
          </div>

          {/* bottom: subtitle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                display: "flex",
                color: "#C49A6C",
                fontSize: 20,
                letterSpacing: 6,
                fontFamily: "JetBrains",
              }}
            >
              GUINNESS WORLD RECORD ATTEMPT
            </span>
            <span
              style={{
                display: "flex",
                color: "#F0EDE8",
                fontSize: 30,
                fontFamily: "Cormorant",
                fontStyle: "italic",
              }}
            >
              15,000 dancers · category exclusivity · Oct 25, 2026
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Nosifer", data: nosifer, weight: 400, style: "normal" },
        { name: "Cormorant", data: cormorant, weight: 500, style: "normal" },
        {
          name: "Cormorant",
          data: cormorantItalic,
          weight: 500,
          style: "italic",
        },
        { name: "JetBrains", data: jetbrains, weight: 500, style: "normal" },
      ],
    },
  );
}
