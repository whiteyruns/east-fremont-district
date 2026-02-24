export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientType: "corporate" | "convention" | "brand-activation" | "association" | "private";
  clientName?: string;
  date: string;
  guestCount: number;
  activationScope: ActivationScope[];
  infrastructureUsed: string[];
  customElements: string[];
  results: CaseStudyResult[];
  heroImageUrl: string;
  galleryImages: string[];
  testimonial?: {
    quote: string;
    attribution: string;
    role: string;
  };
  summary: string;
}

export type ActivationScope =
  | "single-venue"
  | "multi-venue"
  | "street-activation"
  | "full-takeover"
  | "rooftop"
  | "stage-program"
  | "branding-package";

export interface CaseStudyResult {
  metric: string;
  value: string;
  context?: string;
}
