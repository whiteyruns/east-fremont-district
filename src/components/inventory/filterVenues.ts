import { ReadonlyURLSearchParams } from "next/navigation";
import { Venue } from "@/types/venue";

export interface FilterState {
  capacity: "any" | "under-300" | "300-600" | "600-1000" | "1000+";
  rooftop: boolean;
  ada: boolean;
  kitchen: boolean;
  stage: boolean;
}

export const defaultFilters: FilterState = {
  capacity: "any",
  rooftop: false,
  ada: false,
  kitchen: false,
  stage: false,
};

const validCapacities = new Set(["any", "under-300", "300-600", "600-1000", "1000+"]);

export function filtersFromParams(params: ReadonlyURLSearchParams): FilterState {
  const capacity = params.get("capacity") ?? "any";

  return {
    capacity: validCapacities.has(capacity) ? (capacity as FilterState["capacity"]) : "any",
    rooftop: params.get("rooftop") === "true",
    ada: params.get("ada") === "true",
    kitchen: params.get("kitchen") === "true",
    stage: params.get("stage") === "true",
  };
}

export function filtersToParams(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.capacity !== "any") params.set("capacity", filters.capacity);
  if (filters.rooftop) params.set("rooftop", "true");
  if (filters.ada) params.set("ada", "true");
  if (filters.kitchen) params.set("kitchen", "true");
  if (filters.stage) params.set("stage", "true");

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function filterVenues(venues: Venue[], filters: FilterState): Venue[] {
  return venues.filter((venue) => {
    if (filters.capacity !== "any" && venue.capacity != null) {
      const cap = venue.capacity;
      if (filters.capacity === "under-300" && cap >= 300) return false;
      if (filters.capacity === "300-600" && (cap < 300 || cap >= 600))
        return false;
      if (filters.capacity === "600-1000" && (cap < 600 || cap >= 1000))
        return false;
      if (filters.capacity === "1000+" && cap < 1000) return false;
    }

    if (filters.rooftop && !venue.hasRooftop) return false;
    if (filters.ada && !venue.adaAccessible) return false;
    if (filters.kitchen && !venue.hasKitchen) return false;
    if (filters.stage && !venue.hasStage) return false;

    return true;
  });
}
