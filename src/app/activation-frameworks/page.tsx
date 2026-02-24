import { Check, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { activationFrameworks } from "@/data/activations";
import { ActivationFramework, ActivationFeature } from "@/types/activation";

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Packages"
          title="Activation Frameworks"
          description="Three scalable tiers designed to accommodate activations from intimate single-venue experiences to district-wide transformations. Choose the framework that aligns with your event scope and brand objectives."
        />
      </Container>
    </section>
  );
}

// ============================================================================
// FRAMEWORK CARD
// ============================================================================
function FrameworkCard({
  framework,
}: {
  framework: ActivationFramework;
}) {
  const isFullTakeover = framework.tier === "full-takeover";

  return (
    <Card
      className={`p-8 flex flex-col h-full ${
        isFullTakeover ? "border-2 border-[#C49A6C] relative" : ""
      }`}
    >
      {/* Full Takeover Badge */}
      {isFullTakeover && (
        <div className="absolute -top-3 left-6">
          <span className="bg-[#C49A6C] text-[#0F1115] px-3 py-1 rounded-full text-xs font-bold uppercase">
            Full Platform
          </span>
        </div>
      )}

      {/* Tier Label */}
      <p className="text-[#9B978F] text-xs font-semibold uppercase tracking-widest mb-2">
        {framework.tier === "core"
          ? "Core Tier"
          : framework.tier === "expanded"
          ? "Expanded Tier"
          : "Premier Tier"}
      </p>

      {/* Name */}
      <h3 className="text-[#F0EDE8] text-2xl font-bold mb-3">
        {framework.name}
      </h3>

      {/* Description */}
      <p className="text-[#9B978F] text-sm leading-relaxed mb-6 flex-1">
        {framework.description}
      </p>

      {/* Specs Grid */}
      <div className="bg-[#1A1D23] rounded-lg p-4 mb-6 space-y-3">
        <div>
          <p className="text-[#9B978F] text-xs font-semibold mb-1">
            Starting Range
          </p>
          <p className="text-[#F0EDE8] font-mono font-bold text-lg">
            {framework.startingRange}
          </p>
        </div>
        <div>
          <p className="text-[#9B978F] text-xs font-semibold mb-1">
            Guest Count
          </p>
          <p className="text-[#F0EDE8]">{framework.idealGuestCount}</p>
        </div>
        <div>
          <p className="text-[#9B978F] text-xs font-semibold mb-1">
            Venue Access
          </p>
          <p className="text-[#F0EDE8] text-sm">{framework.venueAccess}</p>
        </div>
        <div>
          <p className="text-[#9B978F] text-xs font-semibold mb-1">
            Production Level
          </p>
          <p className="text-[#F0EDE8] text-sm">{framework.productionLevel}</p>
        </div>
      </div>

      {/* Branding Included */}
      <div className="mb-6">
        <p className="text-[#C49A6C] text-xs font-bold uppercase mb-3">
          Branding Included
        </p>
        <div className="flex flex-wrap gap-2">
          {framework.brandingIncluded.map((item, index) => (
            <span
              key={index}
              className="bg-[#24272E] text-[#C49A6C] text-xs px-3 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Button href="/inquire" variant="primary" className="w-full">
        Inquire About {framework.name}
      </Button>
    </Card>
  );
}

// ============================================================================
// COMPARISON TABLE
// ============================================================================
function ComparisonTable() {
  // Group features by category
  const featuresByCategory = new Map<string, ActivationFeature[]>();

  activationFrameworks[0].includedFeatures.forEach((feature) => {
    if (!featuresByCategory.has(feature.category)) {
      featuresByCategory.set(feature.category, []);
    }
    featuresByCategory.get(feature.category)!.push(feature);
  });

  // Get unique features for each tier
  const getCategoryFeatures = (
    tier: "core" | "expanded" | "full-takeover"
  ): Map<string, ActivationFeature[]> => {
    const result = new Map<string, ActivationFeature[]>();
    const framework = activationFrameworks.find((f) => f.tier === tier);

    if (framework) {
      framework.includedFeatures.forEach((feature) => {
        if (!result.has(feature.category)) {
          result.set(feature.category, []);
        }
        result.get(feature.category)!.push(feature);
      });
    }

    return result;
  };

  const coreFeatures = getCategoryFeatures("core");
  const expandedFeatures = getCategoryFeatures("expanded");
  const fullFeatures = getCategoryFeatures("full-takeover");

  // Get all unique features across all tiers
  const allFeatures = new Map<string, Set<string>>();
  [coreFeatures, expandedFeatures, fullFeatures].forEach((featureMap) => {
    featureMap.forEach((features, category) => {
      if (!allFeatures.has(category)) {
        allFeatures.set(category, new Set());
      }
      features.forEach((f) => {
        allFeatures.get(category)!.add(f.feature);
      });
    });
  });

  const categories = Array.from(allFeatures.keys()).sort();

  const isFeatureIncluded = (
    tier: "core" | "expanded" | "full-takeover",
    feature: string
  ): boolean => {
    const framework = activationFrameworks.find((f) => f.tier === tier);
    if (!framework) return false;
    const found = framework.includedFeatures.find((f) => f.feature === feature);
    return found ? found.included : false;
  };

  return (
    <section className="py-24 bg-[#0A0C0F]">
      <Container>
        <div className="space-y-8">
          <h2 className="text-[#F0EDE8] text-3xl lg:text-4xl font-bold">
            Feature Comparison
          </h2>

          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-[#2A2D33]">
                  <th className="text-left py-4 px-6 text-[#F0EDE8] font-bold">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 text-[#F0EDE8] font-bold">
                    Core
                  </th>
                  <th className="text-center py-4 px-6 text-[#F0EDE8] font-bold">
                    Expanded
                  </th>
                  <th className="text-center py-4 px-6 text-[#F0EDE8] font-bold">
                    Full Takeover
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              {categories.map((category) => {
                  const categoryFeatures: string[] = Array.from(
                    allFeatures.get(category) || new Set<string>()
                  ).sort();

                  return (
                    <tbody key={category}>
                      {/* Category Header Row */}
                      <tr className="bg-[#1A1D23] border-y border-[#2A2D33]">
                        <td colSpan={4} className="py-3 px-6">
                          <p className="text-[#C49A6C] text-xs font-bold uppercase tracking-widest">
                            {category}
                          </p>
                        </td>
                      </tr>

                      {/* Feature Rows */}
                      {categoryFeatures.map((feature, featureIndex) => (
                        <tr
                          key={`${category}-${featureIndex}`}
                          className="border-b border-[#2A2D33] hover:bg-[#1A1D23] transition-colors"
                        >
                          <td className="py-4 px-6 text-[#9B978F] text-sm">
                            {feature}
                          </td>
                          <td className="text-center py-4 px-6">
                            {isFeatureIncluded("core", feature) ? (
                              <Check
                                size={20}
                                className="text-[#C49A6C] mx-auto"
                              />
                            ) : (
                              <Minus
                                size={20}
                                className="text-[#6B6760] mx-auto"
                              />
                            )}
                          </td>
                          <td className="text-center py-4 px-6">
                            {isFeatureIncluded("expanded", feature) ? (
                              <Check
                                size={20}
                                className="text-[#C49A6C] mx-auto"
                              />
                            ) : (
                              <Minus
                                size={20}
                                className="text-[#6B6760] mx-auto"
                              />
                            )}
                          </td>
                          <td className="text-center py-4 px-6">
                            {isFeatureIncluded("full-takeover", feature) ? (
                              <Check
                                size={20}
                                className="text-[#C49A6C] mx-auto"
                              />
                            ) : (
                              <Minus
                                size={20}
                                className="text-[#6B6760] mx-auto"
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// CUSTOM CTA SECTION
// ============================================================================
function CustomCtaSection() {
  return (
    <section className="py-16 bg-[#1A1D23] border-y border-[#2A2D33]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[#F0EDE8] text-2xl font-bold mb-2">
              Need a Custom Scope?
            </h2>
            <p className="text-[#9B978F]">
              Our frameworks provide powerful starting points, but we're ready
              to customize any activation to meet your unique needs and
              objectives.
            </p>
          </div>
          <Button href="/inquire" variant="primary" className="flex-shrink-0">
            Discuss Custom Options
          </Button>
        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// PAGE EXPORT
// ============================================================================
export default function ActivationFrameworksPage() {
  return (
    <>
      <PageHeader />

      {/* Framework Cards Section */}
      <section className="py-16 lg:py-24 bg-[#0F1115]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activationFrameworks.map((framework) => (
              <FrameworkCard key={framework.id} framework={framework} />
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Custom CTA Section */}
      <CustomCtaSection />
    </>
  );
}
