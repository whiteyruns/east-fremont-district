import HeroVideo from "@/components/homepage/HeroVideo";
import DistrictMetrics from "@/components/homepage/DistrictMetrics";
import InfrastructureSummary from "@/components/homepage/InfrastructureSummary";
import ActivationPreview from "@/components/homepage/ActivationPreview";
import CaseStudyPreview from "@/components/homepage/CaseStudyPreview";
import HomepageCTA from "@/components/homepage/HomepageCTA";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <DistrictMetrics />
      <InfrastructureSummary />
      <ActivationPreview />
      <CaseStudyPreview />
      <HomepageCTA />
    </>
  );
}
