import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "F.E.E.D. — Fremont East Entertainment District",
    short_name: "F.E.E.D.",
    description:
      "A vibrant 6-block, pedestrian-friendly downtown Las Vegas entertainment district located between Las Vegas Blvd and 8th Street.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1115",
    theme_color: "#0A0C0F",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
