import { Suspense } from "react";
import { Metadata } from "next";
import { getVenues } from "@/lib/airtable-venues";
import InventoryClient from "@/components/inventory/InventoryClient";

export const metadata: Metadata = { title: "Venue Inventory" };
export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const venues = await getVenues();

  return (
    <Suspense>
      <InventoryClient venues={venues} />
    </Suspense>
  );
}
