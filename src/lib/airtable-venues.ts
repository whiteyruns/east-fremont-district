import { Venue } from "@/types/venue";
import { venues as staticVenues } from "@/data/venues";

export async function getVenues(): Promise<Venue[]> {
  return staticVenues;
}
