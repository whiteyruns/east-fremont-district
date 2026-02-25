import { Photo, ScoredPhoto } from "@/types/photo";
import photosJson from "@/data/photos.json";
import {
  getHeroCandidates,
  getInfrastructurePhotos,
  getOpsPhotos,
  getBrandingPhotos,
  getVenueCardPhotos,
  getCaseStudyPhotoSets,
  type CaseStudyPhotoSets,
} from "./photo-scoring";

const photos: Photo[] = photosJson as Photo[];

/** Top hero candidates — aerial, medium/large crowd, gates or staging */
export function getHeroPhotos(limit = 5): ScoredPhoto[] {
  return getHeroCandidates(photos).slice(0, limit);
}

/** District page — infrastructure proof, control + footprint */
export function getDistrictPhotos(limit = 5): ScoredPhoto[] {
  return getInfrastructurePhotos(photos).slice(0, limit);
}

/** Production page — ops & control, staging/security focus */
export function getProductionPhotos(limit = 8): ScoredPhoto[] {
  return getOpsPhotos(photos).slice(0, limit);
}

/** Branding page — sponsor surfaces, ground/close, intimate scale */
export function getBrandingPagePhotos(limit = 8): ScoredPhoto[] {
  return getBrandingPhotos(photos).slice(0, limit);
}

/** Case study page — curated narrative lanes */
export function getCaseStudyPhotos(): CaseStudyPhotoSets {
  return getCaseStudyPhotoSets(photos);
}

/** Inventory cards — neutral, no branding, no crowds */
export function getInventoryPhotos(limit = 10): Photo[] {
  return getVenueCardPhotos(photos).slice(0, limit);
}
