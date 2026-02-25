export type CrowdScale = "none" | "small" | "medium" | "large";
export type Perspective = "aerial" | "ground" | "close";

export interface Photo {
  filename: string;
  score: number;
  crowd_scale: CrowdScale;
  perspective: Perspective;
  security_gates_visible: boolean;
  staging_visible: boolean;
  rooftop_environment: boolean;
  sponsor_branding_visible: boolean;
  caption?: string;
  tags?: string[];
  width?: number;
  height?: number;
}

export interface ScoredPhoto extends Photo {
  computed_score: number;
}
