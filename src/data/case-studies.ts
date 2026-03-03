import { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
  {
    id: "case-study-tu-2026",
    slug: "transunion-ces-2026",
    title: "TransUnion — CES 2026 Activation",
    clientType: "brand-activation",
    clientName: "TransUnion",
    date: "January 2026",
    guestCount: 2500,
    activationScope: ["multi-venue", "street-activation", "branding-package", "stage-program"],
    infrastructureUsed: [
      "Commonwealth rooftop and main floor",
      "Street-level activation zone on Fremont",
      "District-wide building wraps and signage",
      "Concert-grade sound and lighting",
      "Professional security perimeter",
      "Credential and access control systems",
    ],
    customElements: [
      "Branded building wraps across district facades",
      "Interactive data visualization installations",
      "Executive networking reception on rooftop",
      "Live entertainment programming",
      "Custom food and beverage program",
      "VIP hospitality suites",
    ],
    results: [
      {
        metric: "Total Guests",
        value: "2,500+",
        context: "Across three days of CES activation programming",
      },
      {
        metric: "Brand Impressions",
        value: "4.1M",
        context: "Combined on-site, social media, and press coverage",
      },
      {
        metric: "Executive Meetings",
        value: "340+",
        context: "Scheduled B2B meetings during the activation",
      },
      {
        metric: "Media Mentions",
        value: "28",
        context: "Publications covering the activation",
      },
    ],
    heroImageUrl: "/images/case-studies/transunion-2026/transunion-01.webp",
    galleryImages: [
      "/images/case-studies/transunion-2026/gallery/gallery-01.webp",
      "/images/case-studies/transunion-2026/gallery/gallery-02.webp",
      "/images/case-studies/transunion-2026/gallery/gallery-03.webp",
      "/images/case-studies/transunion-2026/gallery/gallery-04.webp",
      "/images/case-studies/transunion-2026/gallery/gallery-05.webp",
      "/images/case-studies/transunion-2026/gallery/gallery-06.webp",
      "/images/case-studies/transunion-2026/gallery/gallery-07.webp",
    ],
    testimonial: {
      quote:
        "East Fremont District gave us the ability to create an immersive brand experience at a scale that simply isn't possible with a traditional venue rental. The single-operator model meant we had one team handling everything from permitting to production.",
      attribution: "TransUnion Events Team",
      role: "CES 2026 Activation",
    },
    summary:
      "TransUnion leveraged East Fremont District's multi-venue infrastructure for a three-day CES 2026 brand activation, combining district-wide building wraps, street-level experiences, rooftop networking receptions, and live entertainment. The unified operating platform enabled seamless coordination across all touchpoints, delivering a premium brand environment for 2,500+ executives and industry professionals.",
  },
  {
    id: "case-study-001",
    slug: "global-tech-conference-offsite-activation",
    title: "Global Tech Conference — Offsite Activation",
    clientType: "convention",
    date: "October 2023",
    guestCount: 4200,
    activationScope: ["full-takeover", "multi-venue", "rooftop", "stage-program"],
    infrastructureUsed: [
      "All district venues",
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
        metric: "Return Attendance",
        value: "87%",
        context: "Confirmed for following year's event",
      },
    ],
    heroImageUrl: "/images/district/district-crowd-01.webp",
    galleryImages: [],
    testimonial: {
      quote:
        "East Fremont District transformed our conference into an unforgettable experience. The flexibility and scale of the venues, combined with the seamless coordination, set a new standard for tech industry events.",
      attribution: "Sarah Chen",
      role: "VP of Events, Global Tech Summit",
    },
    summary:
      "The Global Tech Conference utilized the full East Fremont District infrastructure to host a 4,200-person offsite activation featuring multiple stages, interactive experiences, and cutting-edge technology integration. The full-takeover approach allowed for comprehensive branding, seamless guest flow across venues, and creation of memorable networking moments that resulted in record-breaking satisfaction scores and media coverage.",
  },
];
