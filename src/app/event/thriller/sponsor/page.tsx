import { Metadata } from "next";
import SponsorClient from "./SponsorClient";

export const metadata: Metadata = {
  title: "Sponsor the World's Largest Thriller Dance | F.E.E.D.",
  description:
    "Align your brand with a Guinness World Records attempt in Downtown Las Vegas — 15,000 dancers, national media, and a rare all-ages cultural moment. Explore partnership opportunities.",
  openGraph: {
    title: "Sponsor the World's Largest Thriller Dance | F.E.E.D.",
    description:
      "Put your brand at the center of a Guinness World Records attempt on Fremont East — 15,000 dancers, national media, category exclusivity. Let's build your partnership.",
  },
  // Match the parent /event/thriller page: the event isn't publicly announced
  // yet, so keep this hidden from crawlers (belt-and-suspenders with the
  // Disallow: /event/ rule in robots.ts).
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ThrillerSponsorPage() {
  return <SponsorClient />;
}
