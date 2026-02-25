import { Photo, ScoredPhoto } from "@/types/photo";

// ============================================================================
// COMPOSITE SCORERS
// ============================================================================

type Scorer = (p: Photo) => number;

const heroScore: Scorer = (p) =>
  p.score +
  (p.crowd_scale === "large" ? 3 : 0) +
  (p.security_gates_visible ? 2 : 0) +
  (p.staging_visible ? 2 : 0) +
  (p.sponsor_branding_visible ? 1 : 0);

const infraScore: Scorer = (p) =>
  p.score +
  (p.security_gates_visible ? 5 : 0) +
  (p.staging_visible ? 3 : 0) +
  (p.crowd_scale === "medium" ? 1 : 0) +
  (p.crowd_scale === "large" ? 2 : 0) +
  (p.perspective === "aerial" ? 1 : 0);

const opsScore: Scorer = (p) =>
  p.score +
  (p.staging_visible ? 3 : 0) +
  (p.security_gates_visible ? 3 : 0) +
  (p.staging_visible && p.security_gates_visible ? 4 : 0) +
  (p.crowd_scale === "large" ? 1 : 0) +
  (p.sponsor_branding_visible ? -1 : 0);

const brandingScore: Scorer = (p) =>
  p.score +
  (p.sponsor_branding_visible ? 4 : 0) +
  (p.crowd_scale === "medium" || p.crowd_scale === "large" ? 2 : 0) +
  (p.perspective === "close" ? 2 : 0);

// ============================================================================
// HELPERS
// ============================================================================

function scoreAndSort(
  photos: Photo[],
  filter: (p: Photo) => boolean,
  scorer: Scorer
): ScoredPhoto[] {
  return photos
    .filter(filter)
    .map((p) => ({ ...p, computed_score: scorer(p) }))
    .sort((a, b) => b.computed_score - a.computed_score);
}

function filterAndSort(
  photos: Photo[],
  filter: (p: Photo) => boolean
): Photo[] {
  return photos.filter(filter).sort((a, b) => b.score - a.score);
}

// ============================================================================
// PAGE-LEVEL QUERIES
// ============================================================================

/** Hero — aerial, medium/large crowd, gates or staging */
export function getHeroCandidates(photos: Photo[]): ScoredPhoto[] {
  return scoreAndSort(
    photos,
    (p) =>
      p.perspective === "aerial" &&
      (p.crowd_scale === "medium" || p.crowd_scale === "large") &&
      (p.security_gates_visible || p.staging_visible),
    heroScore
  );
}

/** District — infrastructure proof, gates first, no close-ups, no empty shots */
export function getInfrastructurePhotos(photos: Photo[]): ScoredPhoto[] {
  return scoreAndSort(
    photos,
    (p) =>
      (p.security_gates_visible || p.staging_visible) &&
      p.crowd_scale !== "none" &&
      p.perspective !== "close",
    infraScore
  );
}

/** Production — ops & control, penalizes marketing-forward shots */
export function getOpsPhotos(photos: Photo[]): ScoredPhoto[] {
  return scoreAndSort(
    photos,
    (p) =>
      (p.staging_visible || p.security_gates_visible) &&
      (p.crowd_scale === "small" ||
        p.crowd_scale === "medium" ||
        p.crowd_scale === "large"),
    opsScore
  );
}

/** Branding — all sponsor-visible shots, crowd context + detail rewarded */
export function getBrandingPhotos(photos: Photo[]): ScoredPhoto[] {
  return scoreAndSort(
    photos,
    (p) => p.sponsor_branding_visible,
    brandingScore
  );
}

/** Inventory cards — neutral, no branding, no crowds */
export function getVenueCardPhotos(photos: Photo[]): Photo[] {
  return filterAndSort(
    photos,
    (p) =>
      (p.crowd_scale === "none" || p.crowd_scale === "small") &&
      !p.sponsor_branding_visible
  );
}

// ============================================================================
// CASE STUDY — CURATED NARRATIVE SETS
// ============================================================================

export interface CaseStudyPhotoSets {
  arrival: Photo[];
  bigMoment: Photo[];
  branding: Photo[];
  detail: Photo[];
  rooftop: Photo[];
}

export function getCaseStudyPhotoSets(photos: Photo[]): CaseStudyPhotoSets {
  return {
    arrival: filterAndSort(
      photos,
      (p) => p.security_gates_visible
    ).slice(0, 2),
    bigMoment: filterAndSort(
      photos,
      (p) => p.crowd_scale === "large" && p.staging_visible
    ).slice(0, 2),
    branding: filterAndSort(
      photos,
      (p) => p.sponsor_branding_visible
    ).slice(0, 3),
    rooftop: filterAndSort(
      photos,
      (p) => p.rooftop_environment
    ).slice(0, 2),
    detail: filterAndSort(
      photos,
      (p) =>
        (p.crowd_scale === "none" || p.crowd_scale === "small") &&
        (p.perspective === "close" || p.perspective === "ground")
    ).slice(0, 2),
  };
}

// ============================================================================
// GENERAL-PURPOSE QUERY
// ============================================================================

export function getVenuePhotos(
  photos: Photo[],
  opts?: {
    perspective?: Photo["perspective"];
    minScore?: number;
    rooftop?: boolean;
  }
): Photo[] {
  return filterAndSort(photos, (p) => {
    if (opts?.perspective && p.perspective !== opts.perspective) return false;
    if (opts?.minScore && p.score < opts.minScore) return false;
    if (opts?.rooftop !== undefined && p.rooftop_environment !== opts.rooftop)
      return false;
    return true;
  });
}
