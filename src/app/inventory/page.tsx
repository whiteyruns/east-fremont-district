import { Suspense } from "react";
import { getVenues } from "@/lib/airtable-venues";
import InventoryClient from "@/components/inventory/InventoryClient";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const venues = await getVenues();

  return (
    <Suspense>
      <InventoryClient venues={venues} />
    </Suspense>
  );
}
