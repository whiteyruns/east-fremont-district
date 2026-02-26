import HeroVideo from "@/components/homepage/HeroVideo";
import DistrictMetrics from "@/components/homepage/DistrictMetrics";
import ActivationPreview from "@/components/homepage/ActivationPreview";
import SearchTheDistrict from "@/components/homepage/SearchTheDistrict";
import CaseStudyPreview from "@/components/homepage/CaseStudyPreview";
import HomepageCTA from "@/components/homepage/HomepageCTA";
import { getVenues } from "@/lib/airtable-venues";

export const dynamic = "force-dynamic";

export default async function Home() {
  const venues = await getVenues();

  return (
    <>
      <HeroVideo />
      <DistrictMetrics venues={venues} />
      <ActivationPreview />
      <SearchTheDistrict venues={venues} />
      <CaseStudyPreview />
      <HomepageCTA />
    </>
  );
}
