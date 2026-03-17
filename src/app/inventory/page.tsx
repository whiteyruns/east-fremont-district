import { Suspense } from "react";
import { Metadata } from "next";
import { getVenues } from "@/lib/airtable-venues";
import InventoryClient from "@/components/inventory/InventoryClient";

export const metadata: Metadata = {
  title: "Venue Inventory",
  description:
    "Browse 16+ premium venues across the Fremont East Entertainment District — capacities, specs, rooftops, stages, and kitchens at a glance.",
  openGraph: {
    title: "Venue Inventory | F.E.E.D.",
    description:
      "Browse 16+ premium venues across the Fremont East Entertainment District — capacities, specs, rooftops, stages, and kitchens at a glance.",
  },
};
export default async function InventoryPage() {
  const venues = await getVenues();

  return (
    <Suspense fallback={<div className="animate-pulse py-24 text-center text-[#6B6760]">Loading venues...</div>}>
      <InventoryClient venues={venues} />
    </Suspense>
  );
}
