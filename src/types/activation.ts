export interface ActivationFramework {
  id: string;
  slug: string;
  name: string;
  tier: "core" | "expanded" | "full-takeover";
  startingRange: string;
  idealGuestCount: string;
  positioningLine: string;
  description: string;
  includedFeatures: ActivationFeature[];
  venueAccess: string;
  productionLevel: string;
  brandingIncluded: string[];
  addOns?: string[];
}

export interface ActivationFeature {
  category: string;
  feature: string;
  included: boolean;
}
