import type { Metadata } from "next";
import Insomniac360Client from "./Insomniac360Client";

const TITLE = "Insomniac 360 — On The Block";
const DESCRIPTION =
  "A full-district takeover of Fremont East. 15,000+ capacity, full street closure, one operator, one contract. Block plan and budget for Insomniac 360.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
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

export default function Insomniac360Page() {
  return <Insomniac360Client />;
}
