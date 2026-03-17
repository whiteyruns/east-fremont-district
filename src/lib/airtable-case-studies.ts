import { CaseStudy } from "@/types/case-study";
import { caseStudies as staticCaseStudies } from "@/data/case-studies";

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return staticCaseStudies;
}
