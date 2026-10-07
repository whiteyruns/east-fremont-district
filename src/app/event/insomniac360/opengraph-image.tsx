import { ImageResponse } from "next/og";
import { loadOgFont } from "@/lib/og-fonts";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Insomniac 360 — On The Block · A full-district takeover of Fremont East, Downtown Las Vegas";


const IMG_DIR = "public/images/insomniac360";

/** Base plate plus the overlays, in the same paint order the page uses. */
const PLATES: [file: string, mime: string][] = [
  ["base.jpg", "image/jpeg"],
  ["layer-2.png", "image/png"],
  ["layer-3.png", "image/png"],
  ["layer-4.png", "image/png"],
  ["layer-5.png", "image/png"],
];

export default async function OgImage() {
  const [cormorant, cormorantItalic, jetbrains, ...plateBufs] =
    await Promise.all([
      loadOgFont("CormorantGaramond-SemiBold"),
      loadOgFont("CormorantGaramond-MediumItalic"),
      loadOgFont("JetBrainsMono-Medium"),
      ...PLATES.map(([file]) =>
        fs.readFile(path.join(process.cwd(), IMG_DIR, file)),
      ),
    ]);

  const plateUrls = plateBufs.map(
    (buf, i) => `data:${PLATES[i][1]};base64,${buf.toString("base64")}`,
  );

  // Every plate is the same dimensions, so one framing serves all of them.
  const plateStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "1200px",
    height: "630px",
    objectFit: "cover" as const,
    // Low value pushes the plan rightward, clearing the stage marker and the
    // venue cluster out from behind the headline.
    objectPosition: "5% center",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#0F1115",
        }}
      >
        {/* The block plan, stacked exactly as the page stacks it — the stage
            marker and venue callouts live on the overlays, so the base plate
            alone would read as an anonymous neon cityscape.
            Satori renders these, not the browser: next/image doesn't apply and
            the alt would never be read by anything. */}
        {plateUrls.map((url) => (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img key={url.slice(-24)} src={url} width={1200} height={630} style={plateStyle} />
        ))}
        {/* wash — the plan is high-contrast neon, so this is heavier than it
            looks like it needs to be */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "rgba(10,12,15,0.62)",
          }}
        />
        {/* Left column for the type. Heavy on purpose — the plan is dense
            neon linework and venue labels, and anything lighter leaves them
            legible enough to compete with the headline. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "900px",
            height: "630px",
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(10,12,15,0.985) 0%, rgba(10,12,15,0.97) 42%, rgba(10,12,15,0.8) 72%, rgba(10,12,15,0) 100%)",
          }}
        />
        {/* warm tie to the site palette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 55% 45% at 78% 65%, rgba(196,154,108,0.18), transparent 62%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "46px 64px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* brand row */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                border: "1px solid #C49A6C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C49A6C",
                fontFamily: "Cormorant",
                fontStyle: "italic",
                fontSize: 26,
              }}
            >
              F
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 17,
                  color: "#F0EDE8",
                  letterSpacing: 4,
                  fontFamily: "JetBrains",
                }}
              >
                F.E.E.D.
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#9B978F",
                  letterSpacing: 3,
                  fontFamily: "JetBrains",
                  marginTop: 3,
                }}
              >
                FREMONT EAST · DOWNTOWN LAS VEGAS
              </span>
            </div>
          </div>

          {/* headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                display: "flex",
                fontSize: 15,
                color: "#C49A6C",
                letterSpacing: 7,
                fontFamily: "JetBrains",
                marginBottom: 18,
              }}
            >
              F.E.E.D. PRESENTS
            </span>
            <div
              style={{
                display: "flex",
                fontSize: 104,
                color: "#F0EDE8",
                fontFamily: "Cormorant",
                lineHeight: 0.94,
                letterSpacing: -2,
              }}
            >
              Insomniac 360
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 40,
                color: "#F0EDE8",
                fontFamily: "JetBrains",
                letterSpacing: 12,
                marginTop: 14,
                opacity: 0.82,
              }}
            >
              ON THE BLOCK
            </div>
          </div>

          {/* stat rail */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 44 }}>
            {[
              ["15,000+", "CAPACITY"],
              ["6", "VENUES"],
              ["1", "BLOCK, CLOSED"],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontSize: 44,
                    color: "#C49A6C",
                    fontFamily: "JetBrains",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "#9B978F",
                    letterSpacing: 3,
                    fontFamily: "JetBrains",
                    marginTop: 9,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, weight: 600, style: "normal" },
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
