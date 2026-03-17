import HeroVideo from "@/components/homepage/HeroVideo";
import DistrictMetrics from "@/components/homepage/DistrictMetrics";
import ActivationPreview from "@/components/homepage/ActivationPreview";
import SearchTheDistrict from "@/components/homepage/SearchTheDistrict";
import CaseStudyPreview from "@/components/homepage/CaseStudyPreview";
import HomepageCTA from "@/components/homepage/HomepageCTA";
import Container from "@/components/ui/Container";
import { getVenues } from "@/lib/airtable-venues";
import { getCaseStudies } from "@/lib/airtable-case-studies";

function WhatThisIs() {
  return (
    <section className="py-20 lg:py-28 bg-[#0F1115]">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
            What This Is
          </p>
          <p className="text-[#9B978F] text-sm font-medium tracking-wide">
            Not a venue. A system.
          </p>
          <h2 className="text-[#F0EDE8] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            A Fully Programmable Event Environment
          </h2>
          <div className="space-y-4 text-[#9B978F] text-lg leading-relaxed">
            <p>
              East Fremont isn&apos;t a single venue — it&apos;s a connected entertainment district that can be privately activated, branded, and operated as one cohesive event environment.
            </p>
            <p>
              From street closures and access control to multi-venue programming, food and beverage distribution, and full-scale production, every element is designed to function together seamlessly.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default async function HomePage() {
  const [venues, caseStudies] = await Promise.all([
    getVenues(),
    getCaseStudies(),
  ]);

  return (
    <>
      <HeroVideo />
      <DistrictMetrics venues={venues} />
      <WhatThisIs />
      <ActivationPreview />
      <SearchTheDistrict venues={venues} />
      <CaseStudyPreview caseStudies={caseStudies} />
      <HomepageCTA />
    </>
  );
}
