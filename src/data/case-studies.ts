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
    heroImageUrl: "",
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
