import { ActivationFramework } from "@/types/activation";

export const activationFrameworks: ActivationFramework[] = [
  {
    id: "activation-001",
    slug: "district-core",
    name: "District Core",
    tier: "core",
    startingRange: "$25,000 - $75,000",
    idealGuestCount: "200 - 800 guests",
    positioningLine: "Essential East Fremont experience with single-venue focus",
    description:
      "The District Core activation provides a solid foundation for brands looking to establish presence in East Fremont. Perfect for intimate events, brand introductions, and focused audience engagement within a single premier venue.",
    venueAccess: "Single venue with preferred rates",
    productionLevel: "Professional production with standard equipment",
    brandingIncluded: ["Venue signage", "Social media promotion", "Basic wayfinding"],
    includedFeatures: [
      {
        category: "Venue",
        feature: "Single venue rental (up to 1000 sq ft)",
        included: true,
      },
      {
        category: "Venue",
        feature: "Exclusive event space access",
        included: true,
      },
      {
        category: "Venue",
        feature: "Extended hours access (4 hours)",
        included: true,
      },
      {
        category: "Production",
        feature: "Basic sound system",
        included: true,
      },
      {
        category: "Production",
        feature: "Standard lighting package",
        included: true,
      },
      {
        category: "Production",
        feature: "DJ booth access",
        included: true,
      },
      {
        category: "Production",
        feature: "Professional AV coordination",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Event coordinator (on-site)",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Basic security (4-6 staff)",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Registration/check-in support",
        included: true,
      },
      {
        category: "Branding",
        feature: "Venue signage package",
        included: true,
      },
      {
        category: "Branding",
        feature: "Social media promotion",
        included: true,
      },
      {
        category: "Branding",
        feature: "District directory listing",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Event planning consultation",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Vendor management support",
        included: false,
      },
      {
        category: "Coordination",
        feature: "Post-event reporting",
        included: true,
      },
    ],
    addOns: [
      "Additional hours ($500/hour)",
      "Enhanced lighting package (+$2,500)",
      "Live band/performance (+$3,000)",
      "Premium beverage program (+$2,000)",
      "Extended security (+$1,000)",
    ],
  },
  {
    id: "activation-002",
    slug: "district-expanded",
    name: "District Expanded",
    tier: "expanded",
    startingRange: "$75,000 - $250,000",
    idealGuestCount: "800 - 2,500 guests",
    positioningLine: "Multi-venue district activation with enhanced production value",
    description:
      "The District Expanded activation leverages multiple venues across East Fremont to create a comprehensive brand experience. Ideal for major events, product launches, and activations requiring significant geographic presence and production sophistication.",
    venueAccess: "Multiple venues (2-3) with dedicated space",
    productionLevel: "Advanced production with professional-grade equipment and coordination",
    brandingIncluded: [
      "Multi-venue signage",
      "Digital integration",
      "Street-level branding",
      "Social media package",
    ],
    includedFeatures: [
      {
        category: "Venue",
        feature: "Multiple venue rental (2-3 venues)",
        included: true,
      },
      {
        category: "Venue",
        feature: "Flexible space configuration",
        included: true,
      },
      {
        category: "Venue",
        feature: "Extended hours access (8+ hours)",
        included: true,
      },
      {
        category: "Venue",
        feature: "VIP lounge areas",
        included: true,
      },
      {
        category: "Venue",
        feature: "Kitchen and bar facilities",
        included: true,
      },
      {
        category: "Production",
        feature: "Professional sound system (multi-venue)",
        included: true,
      },
      {
        category: "Production",
        feature: "Advanced lighting design",
        included: true,
      },
      {
        category: "Production",
        feature: "Multiple DJ booths",
        included: true,
      },
      {
        category: "Production",
        feature: "Stage setup with technical support",
        included: true,
      },
      {
        category: "Production",
        feature: "Professional AV coordination",
        included: true,
      },
      {
        category: "Production",
        feature: "Live streaming capability",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Lead event coordinator",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Venue managers (per location)",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Enhanced security (12-20 staff)",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Registration and guest management",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Brand ambassador coordination",
        included: true,
      },
      {
        category: "Branding",
        feature: "Multi-venue signage system",
        included: true,
      },
      {
        category: "Branding",
        feature: "Street-level branding/wayfinding",
        included: true,
      },
      {
        category: "Branding",
        feature: "Digital signage integration",
        included: true,
      },
      {
        category: "Branding",
        feature: "Comprehensive social media campaign",
        included: true,
      },
      {
        category: "Branding",
        feature: "Influencer coordination",
        included: false,
      },
      {
        category: "Coordination",
        feature: "Full event planning services",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Vendor and logistics management",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Timeline and contingency planning",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Post-event analytics and reporting",
        included: true,
      },
    ],
    addOns: [
      "Rooftop activation package (+$15,000)",
      "Premium beverage program (+$5,000)",
      "Entertainment package (+$10,000)",
      "Influencer and media relations (+$8,000)",
      "Extended security (+$2,500)",
      "Professional photography/videography (+$5,000)",
    ],
  },
  {
    id: "activation-003",
    slug: "district-full-takeover",
    name: "District Full Takeover",
    tier: "full-takeover",
    startingRange: "$250,000+",
    idealGuestCount: "2,500 - 10,000+ guests",
    positioningLine: "Complete district transformation and immersive brand experience",
    description:
      "The District Full Takeover is the ultimate East Fremont activation, providing comprehensive access to all venues and district infrastructure. Perfect for major brand activations, international conventions, and transformational experiences requiring unprecedented scale and customization.",
    venueAccess: "All venues with exclusive district access and customization",
    productionLevel: "Bespoke production design with unlimited technical capabilities",
    brandingIncluded: [
      "Full district branding package",
      "Building wraps",
      "Rooftop installations",
      "Digital ecosystem",
      "Street-level transformation",
    ],
    includedFeatures: [
      {
        category: "Venue",
        feature: "All district venues (full access)",
        included: true,
      },
      {
        category: "Venue",
        feature: "Exclusive district-wide access",
        included: true,
      },
      {
        category: "Venue",
        feature: "Multi-day extended hours (24+ hours)",
        included: true,
      },
      {
        category: "Venue",
        feature: "All premium spaces and lounges",
        included: true,
      },
      {
        category: "Venue",
        feature: "Full kitchen and beverage facilities",
        included: true,
      },
      {
        category: "Venue",
        feature: "Street-level activation zones",
        included: true,
      },
      {
        category: "Venue",
        feature: "Rooftop access (all available)",
        included: true,
      },
      {
        category: "Production",
        feature: "Custom AV and production design",
        included: true,
      },
      {
        category: "Production",
        feature: "Unlimited technical support",
        included: true,
      },
      {
        category: "Production",
        feature: "Multiple stages with concert-grade equipment",
        included: true,
      },
      {
        category: "Production",
        feature: "Professional lighting design and installation",
        included: true,
      },
      {
        category: "Production",
        feature: "Live streaming and broadcast capability",
        included: true,
      },
      {
        category: "Production",
        feature: "Custom projection mapping",
        included: true,
      },
      {
        category: "Production",
        feature: "Sound design and engineering",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Executive event coordinator/producer",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Full venue management teams",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Premium security and VIP services (30+ staff)",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Concierge and guest services",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Brand ambassador program (50+ ambassadors)",
        included: true,
      },
      {
        category: "Staffing",
        feature: "Medical and emergency services on-site",
        included: true,
      },
      {
        category: "Branding",
        feature: "Full district branding package",
        included: true,
      },
      {
        category: "Branding",
        feature: "Building wraps (exterior)",
        included: true,
      },
      {
        category: "Branding",
        feature: "Rooftop installations and branding",
        included: true,
      },
      {
        category: "Branding",
        feature: "Digital signage network integration",
        included: true,
      },
      {
        category: "Branding",
        feature: "Street-level environment design",
        included: true,
      },
      {
        category: "Branding",
        feature: "Integrated marketing campaign (360)",
        included: true,
      },
      {
        category: "Branding",
        feature: "Influencer and media relations program",
        included: true,
      },
      {
        category: "Branding",
        feature: "Partnership activation opportunities",
        included: true,
      },
      {
        category: "Coordination",
        feature: "End-to-end event production",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Strategic planning and creative direction",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Comprehensive vendor management",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Logistics and timeline management",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Risk management and contingency planning",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Real-time event monitoring and adjustments",
        included: true,
      },
      {
        category: "Coordination",
        feature: "Post-event ROI analysis and reporting",
        included: true,
      },
    ],
    addOns: [
      "Custom immersive experiences (+$25,000+)",
      "Extended entertainment lineup (+$15,000)",
      "VIP concierge services (+$10,000)",
      "Exclusive media and press relations (+$12,000)",
      "Extended technical production (+$variable)",
    ],
  },
];
