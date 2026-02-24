import { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
  {
    id: "case-study-001",
    slug: "global-tech-conference-offsite-activation",
    title: "Global Tech Conference — Offsite Activation",
    clientType: "convention",
    date: "October 2023",
    guestCount: 4200,
    activationScope: ["full-takeover", "multi-venue", "rooftop", "stage-program"],
    infrastructureUsed: [
      "All 5 district venues",
      "Rooftop installations",
      "Street-level activation zones",
      "Multiple stages with concert-grade sound",
      "Professional lighting and projection",
      "Live streaming broadcast",
    ],
    customElements: [
      "Interactive tech demo stations",
      "Networking lounges by company",
      "AI-powered wayfinding",
      "Drone light show",
      "Live music performances",
      "Virtual reality experiences",
      "Custom food and beverage stations",
    ],
    results: [
      {
        metric: "Attendee Satisfaction",
        value: "94%",
        context: "Of 4,200 guests rated experience as excellent",
      },
      {
        metric: "Social Media Reach",
        value: "2.3M impressions",
        context: "Across all platforms during event week",
      },
      {
        metric: "Media Coverage",
        value: "47 publications",
        context: "Earned media value of $1.2M+",
      },
      {
        metric: "Networking Connections",
        value: "18,500+",
        context: "Professional connections made through app",
      },
      {
        metric: "Return Attendance",
        value: "87%",
        context: "Confirmed for following year's event",
      },
    ],
    heroImageUrl: "/images/case-studies/global-tech-hero.jpg",
    galleryImages: [
      "/images/case-studies/global-tech-1.jpg",
      "/images/case-studies/global-tech-2.jpg",
      "/images/case-studies/global-tech-3.jpg",
      "/images/case-studies/global-tech-4.jpg",
      "/images/case-studies/global-tech-5.jpg",
    ],
    testimonial: {
      quote:
        "East Fremont District transformed our conference into an unforgettable experience. The flexibility and scale of the venues, combined with the seamless coordination, set a new standard for tech industry events.",
      attribution: "Sarah Chen",
      role: "VP of Events, Global Tech Summit",
    },
    summary:
      "The Global Tech Conference utilized the full East Fremont District infrastructure to host a 4,200-person offsite activation featuring multiple stages, interactive experiences, and cutting-edge technology integration. The full-takeover approach allowed for comprehensive branding, seamless guest flow across venues, and creation of memorable networking moments that resulted in record-breaking satisfaction scores and media coverage.",
  },
  {
    id: "case-study-002",
    slug: "automotive-brand-launch-product-reveal",
    title: "Automotive Brand Launch — Product Reveal",
    clientType: "brand-activation",
    date: "June 2023",
    guestCount: 1800,
    activationScope: ["multi-venue", "stage-program", "branding-package", "rooftop"],
    infrastructureUsed: [
      "3 primary venues (The Plaza, Fremont Convention Center, Carson Street Plaza)",
      "2 rooftop spaces",
      "Street-level activation corridor",
      "Professional staging and lighting",
      "Premium sound and AV systems",
      "Digital signage integration",
    ],
    customElements: [
      "Vehicle reveal stage with pyrotechnics",
      "Immersive brand environment",
      "Test drive circuit",
      "VIP lounge with premium amenities",
      "Interactive digital displays",
      "Professional photography studio",
      "Luxury hospitality stations",
    ],
    results: [
      {
        metric: "Media Attendance",
        value: "300+ journalists",
        context: "National and international coverage",
      },
      {
        metric: "Brand Impressions",
        value: "28M+",
        context: "Achieved within 2 weeks post-event",
      },
      {
        metric: "Product Pre-Orders",
        value: "2,400+",
        context: "Generated immediately following reveal",
      },
      {
        metric: "Website Traffic Spike",
        value: "340%",
        context: "Increase during event period",
      },
      {
        metric: "Social Media Engagement",
        value: "1.4M interactions",
        context: "Video content generated 89% share rate",
      },
    ],
    heroImageUrl: "/images/case-studies/automotive-launch-hero.jpg",
    galleryImages: [
      "/images/case-studies/automotive-launch-1.jpg",
      "/images/case-studies/automotive-launch-2.jpg",
      "/images/case-studies/automotive-launch-3.jpg",
      "/images/case-studies/automotive-launch-4.jpg",
    ],
    testimonial: {
      quote:
        "The team at East Fremont District executed our product launch with precision and creativity. The multi-venue approach created multiple touchpoints for media and influencers, amplifying our message across the district and generating unprecedented buzz.",
      attribution: "Marcus Rodriguez",
      role: "Global Marketing Director, Premier Automotive Group",
    },
    summary:
      "A luxury automotive brand activation spanning 3 strategically selected district venues showcased a new flagship model to 1,800 VIP guests including media, influencers, and key stakeholders. The multi-venue approach created distinct experience zones while maintaining unified brand messaging, resulting in massive media coverage, immediate pre-orders, and record-breaking social media engagement.",
  },
];
