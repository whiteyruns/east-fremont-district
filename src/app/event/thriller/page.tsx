import type { Metadata } from "next";
import ThrillerClient from "./ThrillerClient";

export const metadata: Metadata = {
  title: "World's Largest Thriller Dance — Oct 26, 2026",
  description:
    "F.E.E.D. is attempting the Guinness World Record for the largest simultaneous Thriller dance — 15,000 dancers on Fremont East, October 26, 2026.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ThrillerPage() {
  return <ThrillerClient />;
}
