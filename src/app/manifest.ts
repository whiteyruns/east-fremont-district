import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "East Fremont District",
    short_name: "EFD",
    description:
      "A fully privatized, multi-venue urban event district in Downtown Las Vegas.",
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
