export interface BrandingZone {
  id: string;
  name: string;
  type: "street" | "building" | "rooftop" | "stage" | "digital" | "experiential";
  description: string;
  dimensions?: string;
  visibility: "street-level" | "aerial" | "interior" | "mixed";
  availability: "year-round" | "event-only" | "seasonal";
  imageUrl: string;
  specs?: string[];
}
