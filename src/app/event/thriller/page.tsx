import type { Metadata } from "next";
import ThrillerClient from "./ThrillerClient";

const TITLE = "World's Largest Thriller Dance — Oct 25, 2026";
const DESCRIPTION =
  "F.E.E.D. is attempting the Guinness World Record for the largest simultaneous Thriller dance — 15,000 dancers on Fremont East, October 25, 2026.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    // opengraph-image.tsx in this folder is auto-discovered by Next.js
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
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
