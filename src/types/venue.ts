export interface Venue {
  id: string;
  slug: string;
  name: string;
  zone: "east" | "central" | "west";
  address: string;
  indoorCapacity: number;
  outdoorCapacity: number;
  totalCapacity: number;
  squareFootage: number;
  barWells: number;
  kitchens: number;
  djBooths: number;
  stages: number;
  rooftop: boolean;
  adaAccessible: boolean;
  brandingCapabilities: BrandingCapability[];
  features: string[];
  imageUrl: string;
  districtActivationEligible: boolean;
  floorPlanUrl?: string;
  notes?: string;
}

export type BrandingCapability =
  | "building-wrap"
  | "street-wrap"
  | "rooftop"
  | "stage-naming"
  | "digital-signage"
  | "interior-branding"
  | "beverage-program";

export interface VenueFilter {
  zone?: Venue["zone"];
  minCapacity?: number;
  maxCapacity?: number;
  features?: string[];
  rooftop?: boolean;
  adaAccessible?: boolean;
}

export interface DistrictTotals {
  totalVenues: number;
  totalCapacity: number;
  totalIndoorCapacity: number;
  totalOutdoorCapacity: number;
  totalSquareFootage: number;
  totalBarWells: number;
  totalKitchens: number;
  totalStages: number;
}
