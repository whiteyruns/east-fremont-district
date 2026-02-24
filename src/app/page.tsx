import HeroVideo from "@/components/homepage/HeroVideo";
import DistrictMetrics from "@/components/homepage/DistrictMetrics";
import ActivationPreview from "@/components/homepage/ActivationPreview";
import SearchTheDistrict from "@/components/homepage/SearchTheDistrict";
import CaseStudyPreview from "@/components/homepage/CaseStudyPreview";
import HomepageCTA from "@/components/homepage/HomepageCTA";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <DistrictMetrics />
      <ActivationPreview />
      <SearchTheDistrict />
      <CaseStudyPreview />
      <HomepageCTA />
    </>
  );
}
