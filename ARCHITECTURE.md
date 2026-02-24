# East Fremont District — Site Architecture Blueprint

**Project:** EastFremontDistrict.com
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
**Tone:** Hybrid Civic + Corporate — Institutional, Structured, Infrastructure-Forward
**Target Audience:** Convention planners, corporate event teams, DMCs, LVCVA stakeholders

---

## 1. Folder Structure

```
east-fremont-district/
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── district/
│   │   ├── venues/
│   │   ├── case-studies/
│   │   ├── branding/
│   │   └── production/
│   ├── video/
│   │   └── hero-loop.mp4
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout (header + footer)
│   │   ├── page.tsx                    # / Homepage
│   │   ├── district/
│   │   │   └── page.tsx               # /district
│   │   ├── inventory/
│   │   │   └── page.tsx               # /inventory
│   │   ├── activation-frameworks/
│   │   │   └── page.tsx               # /activation-frameworks
│   │   ├── branding/
│   │   │   └── page.tsx               # /branding
│   │   ├── production/
│   │   │   └── page.tsx               # /production
│   │   ├── case-studies/
│   │   │   ├── page.tsx               # /case-studies (index)
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # /case-studies/:slug
│   │   ├── inquire/
│   │   │   └── page.tsx               # /inquire
│   │   └── api/
│   │       ├── inquire/
│   │       │   └── route.ts           # POST /api/inquire
│   │       └── venues/
│   │           └── route.ts           # GET /api/venues
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── PageTransition.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Drawer.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Grid.tsx
│   │   │   └── Divider.tsx
│   │   ├── homepage/
│   │   │   ├── HeroVideo.tsx
│   │   │   ├── DistrictMetrics.tsx
│   │   │   ├── InfrastructureSummary.tsx
│   │   │   ├── ActivationPreview.tsx
│   │   │   ├── CaseStudyPreview.tsx
│   │   │   └── HomepageCTA.tsx
│   │   ├── district/
│   │   │   ├── FootprintOverview.tsx
│   │   │   ├── DistrictMap.tsx
│   │   │   ├── InfrastructureBullets.tsx
│   │   │   ├── ScalabilitySection.tsx
│   │   │   └── OperatingModel.tsx
│   │   ├── inventory/
│   │   │   ├── VenueFilterBar.tsx
│   │   │   ├── VenueGrid.tsx
│   │   │   ├── VenueCard.tsx
│   │   │   ├── VenueDetailDrawer.tsx
│   │   │   └── DistrictTotalsPanel.tsx
│   │   ├── activations/
│   │   │   ├── FrameworkCard.tsx
│   │   │   ├── FrameworkComparison.tsx
│   │   │   └── InclusionsList.tsx
│   │   ├── branding/
│   │   │   ├── BrandingZoneCard.tsx
│   │   │   ├── BrandingGrid.tsx
│   │   │   └── SponsorIntegration.tsx
│   │   ├── production/
│   │   │   ├── ProductionModel.tsx
│   │   │   ├── StaffingOverview.tsx
│   │   │   ├── SecurityModel.tsx
│   │   │   ├── CityCoordination.tsx
│   │   │   └── VendorIntegration.tsx
│   │   ├── case-studies/
│   │   │   ├── CaseStudyHero.tsx
│   │   │   ├── MetricsCallout.tsx
│   │   │   ├── OperationalSummary.tsx
│   │   │   └── GalleryGrid.tsx
│   │   └── inquire/
│   │       ├── InquiryForm.tsx
│   │       ├── BudgetRangeSelector.tsx
│   │       ├── GuestCountSelector.tsx
│   │       ├── DateSelector.tsx
│   │       └── FormConfirmation.tsx
│   ├── data/
│   │   ├── venues.ts
│   │   ├── activations.ts
│   │   ├── case-studies.ts
│   │   ├── branding-zones.ts
│   │   └── navigation.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── cn.ts                      # classnames helper
│   │   ├── airtable.ts               # Airtable client
│   │   └── crm.ts                    # CRM integration helper
│   ├── types/
│   │   ├── venue.ts
│   │   ├── activation.ts
│   │   ├── case-study.ts
│   │   ├── branding.ts
│   │   └── inquiry.ts
│   └── styles/
│       └── globals.css
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 2. Page-by-Page Layout Breakdown

### 2.1 Homepage ( / )

| Section | Component | Purpose |
|---|---|---|
| Hero | `HeroVideo` | Full-viewport silent video loop with headline overlay, district identity statement, and primary CTA |
| Metrics | `DistrictMetrics` | Key infrastructure figures — total capacity, venue count, square footage, block radius |
| Infrastructure | `InfrastructureSummary` | Grid of infrastructure pillars: venues, production, branding, permitting |
| Activations | `ActivationPreview` | 3-card preview of activation frameworks with "Explore Frameworks" CTA |
| Case Studies | `CaseStudyPreview` | Featured case study card with headline metric and image |
| CTA | `HomepageCTA` | Full-width inquiry prompt with form link |

**Layout Flow:** Full-bleed hero → Contained metrics bar → Two-column infrastructure grid → Three-column activation cards → Case study feature block → Full-bleed CTA

---

### 2.2 District ( /district )

| Section | Component | Purpose |
|---|---|---|
| Page Header | `SectionHeading` | Title + positioning statement |
| Footprint | `FootprintOverview` | Block-by-block definition of the district boundary with key stats |
| Map | `DistrictMap` | Interactive or static map placeholder showing district perimeter and venue pins |
| Infrastructure | `InfrastructureBullets` | Categorized bullet grid — physical, operational, permitting, coordination |
| Scalability | `ScalabilitySection` | Explanation of how the district scales from single-venue to full takeover |
| Operating Model | `OperatingModel` | Summary of the unified management and operations approach |

**Layout Flow:** Narrow header → Wide footprint section with stat sidebar → Map (full-width) → Three-column infrastructure grid → Two-column scalability → Operating model summary

---

### 2.3 Inventory ( /inventory )

| Section | Component | Purpose |
|---|---|---|
| Page Header | `SectionHeading` | Title + district totals summary |
| Totals Panel | `DistrictTotalsPanel` | Aggregate stats bar: total capacity, total venues, total bars, total stages |
| Filter Bar | `VenueFilterBar` | Dropdowns/toggles: zone, capacity range, features (rooftop, ADA, kitchen, stage) |
| Venue Grid | `VenueGrid` → `VenueCard` | Responsive card grid showing each venue with key specs |
| Detail Drawer | `VenueDetailDrawer` | Slide-out panel with full venue spec sheet on card click |

**Layout Flow:** Header + totals bar → Sticky filter bar → Responsive venue grid (2–3 columns) → Drawer overlays on selection

**Filter State Management:** URL query params for shareable filtered views. Example: `/inventory?zone=east&minCapacity=200&features=rooftop`

---

### 2.4 Activation Frameworks ( /activation-frameworks )

| Section | Component | Purpose |
|---|---|---|
| Page Header | `SectionHeading` | Title + framework positioning |
| Framework Cards | `FrameworkCard` × 3 | Individual cards for Core, Expanded, Full Takeover with pricing range and guest count |
| Comparison Table | `FrameworkComparison` | Side-by-side feature inclusion matrix |
| CTA | `HomepageCTA` (reused) | Inquiry link |

**Layout Flow:** Header → Three-column framework cards → Full-width comparison table → CTA

**Framework Tiers:**
1. **District Core** — Single venue or contained activation
2. **District Expanded** — Multi-venue, street-level integration
3. **District Full Takeover** — Complete district buyout

---

### 2.5 Branding ( /branding )

| Section | Component | Purpose |
|---|---|---|
| Page Header | `SectionHeading` | Title + sponsorship positioning |
| Branding Grid | `BrandingGrid` → `BrandingZoneCard` | Grid of branding opportunity types with visual placeholders |
| Sponsor Integration | `SponsorIntegration` | Explanation of how brands integrate into the district fabric |
| CTA | `HomepageCTA` (reused) | Inquiry link |

**Branding Zones:**
- Street-level wraps (barricades, sidewalks, crosswalks)
- Building wraps (multi-story exterior surfaces)
- Rooftop branding (aerial visibility)
- Stage naming rights
- Venue co-branding
- Digital signage network
- Beverage and food program integration

**Layout Flow:** Header → Two-column branding zone grid with image placeholders → Sponsor integration narrative → CTA

---

### 2.6 Production ( /production )

| Section | Component | Purpose |
|---|---|---|
| Page Header | `SectionHeading` | Title + production positioning |
| Unified Model | `ProductionModel` | Core explanation of single-operator production approach |
| Staffing | `StaffingOverview` | Staffing tiers and capacity-based scaling |
| Security | `SecurityModel` | Security perimeter, credentialing, and crowd management |
| City Coordination | `CityCoordination` | Permitting, street closures, fire marshal, Metro coordination |
| Vendor Integration | `VendorIntegration` | Preferred vendor network and external vendor onboarding |

**Layout Flow:** Header → Full-width production model statement → Two-column staffing/security split → City coordination section → Vendor integration grid

---

### 2.7 Case Studies ( /case-studies )

**Index Page:**

| Section | Component | Purpose |
|---|---|---|
| Page Header | `SectionHeading` | Title |
| Case Study Grid | Cards linking to individual case studies | Filterable by client type, scale, activation scope |

**Individual Case Study ( /case-studies/[slug] ):**

| Section | Component | Purpose |
|---|---|---|
| Hero | `CaseStudyHero` | Full-width image/video with event name and headline metric |
| Metrics | `MetricsCallout` | 3–4 key performance metrics in large display type |
| Summary | `OperationalSummary` | Narrative breakdown of scope, infrastructure used, custom elements |
| Gallery | `GalleryGrid` | Responsive image grid |
| CTA | `HomepageCTA` (reused) | Inquiry link |

**Layout Flow:** Full-bleed hero → Metric bar → Two-column operational summary → Gallery grid → CTA

---

### 2.8 Inquire ( /inquire )

| Section | Component | Purpose |
|---|---|---|
| Page Header | `SectionHeading` | Title + positioning |
| Form | `InquiryForm` | Professional multi-step or single-page RFP form |
| Confirmation | `FormConfirmation` | Success state after submission |

**Form Fields:**
- Organization name (text)
- Contact name (text)
- Email (email)
- Phone (tel)
- Event type (select: corporate, convention, brand activation, private, other)
- Estimated guest count (GuestCountSelector: range slider or segmented selector)
- Preferred date range (DateSelector: date range picker)
- Budget range (BudgetRangeSelector: segmented selector)
- Activation scope (select: single venue, multi-venue, full takeover)
- Additional notes (textarea)
- How did you hear about us (select)

**Submission Endpoint:** `POST /api/inquire` — validates, formats, and routes to CRM-ready endpoint (webhook to Airtable, HubSpot, or Salesforce)

---

## 3. Component Hierarchy

```
RootLayout
├── SiteHeader
│   ├── Logo
│   ├── Navigation
│   │   └── NavItem × 7 (district, inventory, activations, branding, production, case-studies, inquire)
│   └── MobileMenu
├── <page content>
│   └── Container
│       ├── SectionHeading
│       └── [page-specific components]
└── SiteFooter
    ├── FooterNav
    ├── ContactInfo
    └── LegalLinks
```

**Shared UI Primitives:**
- `Container` — max-width wrapper with responsive padding
- `SectionHeading` — title + optional subtitle + optional badge
- `MetricCard` — large number + label + optional delta
- `Card` — bordered surface with consistent padding
- `Button` — primary, secondary, ghost variants
- `Badge` — small label for tags and categories
- `Drawer` — slide-in panel from right edge
- `FilterBar` — horizontal bar with filter controls
- `Grid` — responsive CSS grid wrapper
- `Divider` — horizontal rule with optional label

---

## 4. Data Models

### 4.1 Venue

```typescript
// src/types/venue.ts

export interface Venue {
  id: string;
  slug: string;
  name: string;
  zone: "east" | "central" | "west";
  address: string;
  indoorCapacity: number;
  outdoorCapacity: number;
  totalCapacity: number;
  squareFootage: number;
  barWells: number;
  kitchens: number;
  djBooths: number;
  stages: number;
  rooftop: boolean;
  adaAccessible: boolean;
  brandingCapabilities: BrandingCapability[];
  features: string[];
  imageUrl: string;
  floorPlanUrl?: string;
  notes?: string;
}

export type BrandingCapability =
  | "building-wrap"
  | "street-wrap"
  | "rooftop"
  | "stage-naming"
  | "digital-signage"
  | "interior-branding"
  | "beverage-program";

export interface VenueFilter {
  zone?: Venue["zone"];
  minCapacity?: number;
  maxCapacity?: number;
  features?: string[];
  rooftop?: boolean;
  adaAccessible?: boolean;
}

export interface DistrictTotals {
  totalVenues: number;
  totalCapacity: number;
  totalIndoorCapacity: number;
  totalOutdoorCapacity: number;
  totalSquareFootage: number;
  totalBarWells: number;
  totalKitchens: number;
  totalStages: number;
}
```

### 4.2 Activation Framework

```typescript
// src/types/activation.ts

export interface ActivationFramework {
  id: string;
  slug: string;
  name: string;
  tier: "core" | "expanded" | "full-takeover";
  startingRange: string;           // e.g. "$25,000 – $75,000"
  idealGuestCount: string;         // e.g. "200 – 800"
  positioningLine: string;
  description: string;
  includedFeatures: ActivationFeature[];
  venueAccess: string;
  productionLevel: string;
  brandingIncluded: string[];
  addOns?: string[];
}

export interface ActivationFeature {
  category: string;
  feature: string;
  included: boolean;
}
```

### 4.3 Case Study

```typescript
// src/types/case-study.ts

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientType: "corporate" | "convention" | "brand-activation" | "association" | "private";
  clientName?: string;             // optional for confidential clients
  date: string;
  guestCount: number;
  activationScope: ActivationScope[];
  infrastructureUsed: string[];    // venue names / IDs
  customElements: string[];
  results: CaseStudyResult[];
  heroImageUrl: string;
  galleryImages: string[];
  testimonial?: {
    quote: string;
    attribution: string;
    role: string;
  };
  summary: string;
}

export type ActivationScope =
  | "single-venue"
  | "multi-venue"
  | "street-activation"
  | "full-takeover"
  | "rooftop"
  | "stage-program"
  | "branding-package";

export interface CaseStudyResult {
  metric: string;
  value: string;
  context?: string;
}
```

### 4.4 Branding Zone

```typescript
// src/types/branding.ts

export interface BrandingZone {
  id: string;
  name: string;
  type: "street" | "building" | "rooftop" | "stage" | "digital" | "experiential";
  description: string;
  dimensions?: string;
  visibility: "street-level" | "aerial" | "interior" | "mixed";
  availability: "year-round" | "event-only" | "seasonal";
  imageUrl: string;
  specs?: string[];
}
```

### 4.5 Inquiry

```typescript
// src/types/inquiry.ts

export interface InquirySubmission {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  eventType: "corporate" | "convention" | "brand-activation" | "private" | "other";
  estimatedGuestCount: GuestCountRange;
  preferredDateStart: string;      // ISO date
  preferredDateEnd: string;        // ISO date
  budgetRange: BudgetRange;
  activationScope: "single-venue" | "multi-venue" | "full-takeover";
  additionalNotes?: string;
  referralSource?: string;
  submittedAt: string;             // ISO timestamp
}

export type GuestCountRange =
  | "under-200"
  | "200-500"
  | "500-1000"
  | "1000-2500"
  | "2500-5000"
  | "5000-plus";

export type BudgetRange =
  | "under-25k"
  | "25k-75k"
  | "75k-150k"
  | "150k-500k"
  | "500k-plus"
  | "to-be-determined";
```

---

## 5. Placeholder Data

### 5.1 Venues (src/data/venues.ts)

```typescript
import { Venue } from "@/types/venue";

export const venues: Venue[] = [
  {
    id: "v-001",
    slug: "venue-alpha",
    name: "Venue Alpha",
    zone: "east",
    address: "123 E Fremont St",
    indoorCapacity: 450,
    outdoorCapacity: 200,
    totalCapacity: 650,
    squareFootage: 8500,
    barWells: 4,
    kitchens: 1,
    djBooths: 2,
    stages: 1,
    rooftop: true,
    adaAccessible: true,
    brandingCapabilities: ["building-wrap", "rooftop", "stage-naming", "interior-branding"],
    features: ["rooftop-deck", "full-kitchen", "green-room", "loading-dock"],
    imageUrl: "/images/venues/venue-alpha.jpg",
    floorPlanUrl: "/images/venues/venue-alpha-plan.pdf",
    notes: "Corner lot. Direct street access on two sides."
  },
  {
    id: "v-002",
    slug: "venue-bravo",
    name: "Venue Bravo",
    zone: "central",
    address: "145 E Fremont St",
    indoorCapacity: 300,
    outdoorCapacity: 150,
    totalCapacity: 450,
    squareFootage: 5200,
    barWells: 3,
    kitchens: 0,
    djBooths: 1,
    stages: 1,
    rooftop: false,
    adaAccessible: true,
    brandingCapabilities: ["building-wrap", "street-wrap", "digital-signage"],
    features: ["street-patio", "led-wall", "backstage-area"],
    imageUrl: "/images/venues/venue-bravo.jpg",
    notes: "Mid-block. Strong street-level visibility."
  },
  {
    id: "v-003",
    slug: "venue-charlie",
    name: "Venue Charlie",
    zone: "west",
    address: "167 E Fremont St",
    indoorCapacity: 800,
    outdoorCapacity: 400,
    totalCapacity: 1200,
    squareFootage: 14000,
    barWells: 6,
    kitchens: 2,
    djBooths: 3,
    stages: 2,
    rooftop: true,
    adaAccessible: true,
    brandingCapabilities: [
      "building-wrap", "rooftop", "stage-naming",
      "digital-signage", "interior-branding", "beverage-program"
    ],
    features: [
      "rooftop-deck", "dual-stages", "full-kitchen",
      "vip-mezzanine", "loading-dock", "green-room"
    ],
    imageUrl: "/images/venues/venue-charlie.jpg",
    floorPlanUrl: "/images/venues/venue-charlie-plan.pdf",
    notes: "Largest single venue. Dual-stage configuration."
  },
  {
    id: "v-004",
    slug: "venue-delta",
    name: "Venue Delta",
    zone: "east",
    address: "131 E Fremont St",
    indoorCapacity: 200,
    outdoorCapacity: 100,
    totalCapacity: 300,
    squareFootage: 3800,
    barWells: 2,
    kitchens: 1,
    djBooths: 1,
    stages: 0,
    rooftop: false,
    adaAccessible: true,
    brandingCapabilities: ["street-wrap", "interior-branding"],
    features: ["prep-kitchen", "street-patio", "private-event-space"],
    imageUrl: "/images/venues/venue-delta.jpg",
    notes: "Intimate format. Ideal for breakout or VIP functions."
  },
  {
    id: "v-005",
    slug: "venue-echo",
    name: "Venue Echo",
    zone: "central",
    address: "155 E Fremont St",
    indoorCapacity: 600,
    outdoorCapacity: 350,
    totalCapacity: 950,
    squareFootage: 11000,
    barWells: 5,
    kitchens: 1,
    djBooths: 2,
    stages: 1,
    rooftop: true,
    adaAccessible: true,
    brandingCapabilities: [
      "building-wrap", "rooftop", "stage-naming",
      "street-wrap", "digital-signage"
    ],
    features: [
      "rooftop-bar", "main-stage", "full-kitchen",
      "vip-area", "loading-dock"
    ],
    imageUrl: "/images/venues/venue-echo.jpg",
    floorPlanUrl: "/images/venues/venue-echo-plan.pdf",
    notes: "Mid-district anchor. High-visibility frontage."
  }
];
```

### 5.2 Activations (src/data/activations.ts)

```typescript
import { ActivationFramework } from "@/types/activation";

export const activations: ActivationFramework[] = [
  {
    id: "af-core",
    slug: "district-core",
    name: "District Core",
    tier: "core",
    startingRange: "$25,000 – $75,000",
    idealGuestCount: "200 – 800",
    positioningLine: "Single-venue activation with district-level production support.",
    description:
      "A contained activation leveraging one primary venue with access to the district's unified production infrastructure. Ideal for corporate receptions, product launches, and focused brand experiences.",
    includedFeatures: [
      { category: "Venue", feature: "Single venue access", included: true },
      { category: "Venue", feature: "Multi-venue access", included: false },
      { category: "Venue", feature: "Street closure", included: false },
      { category: "Production", feature: "Sound + lighting package", included: true },
      { category: "Production", feature: "Stage management", included: true },
      { category: "Production", feature: "Multi-stage coordination", included: false },
      { category: "Staffing", feature: "Bar staff", included: true },
      { category: "Staffing", feature: "Security (venue perimeter)", included: true },
      { category: "Staffing", feature: "Security (street-level)", included: false },
      { category: "Branding", feature: "Interior venue branding", included: true },
      { category: "Branding", feature: "Building wrap", included: false },
      { category: "Branding", feature: "Street-level wrap", included: false },
      { category: "Branding", feature: "Rooftop branding", included: false },
      { category: "Coordination", feature: "Permitting assistance", included: true },
      { category: "Coordination", feature: "City coordination", included: false },
      { category: "Coordination", feature: "Dedicated event manager", included: true }
    ],
    venueAccess: "1 primary venue",
    productionLevel: "Standard",
    brandingIncluded: ["Interior venue branding"],
    addOns: ["Rooftop access", "Extended hours", "Custom beverage program"]
  },
  {
    id: "af-expanded",
    slug: "district-expanded",
    name: "District Expanded",
    tier: "expanded",
    startingRange: "$75,000 – $250,000",
    idealGuestCount: "800 – 2,500",
    positioningLine: "Multi-venue activation with street-level integration and expanded branding.",
    description:
      "A multi-venue experience integrating indoor and outdoor spaces with coordinated production, street-level branding, and enhanced operational support. Designed for convention ancillary events, multi-day brand activations, and large-format corporate programs.",
    includedFeatures: [
      { category: "Venue", feature: "Single venue access", included: true },
      { category: "Venue", feature: "Multi-venue access (2–3)", included: true },
      { category: "Venue", feature: "Street closure", included: true },
      { category: "Production", feature: "Sound + lighting package", included: true },
      { category: "Production", feature: "Stage management", included: true },
      { category: "Production", feature: "Multi-stage coordination", included: true },
      { category: "Staffing", feature: "Bar staff", included: true },
      { category: "Staffing", feature: "Security (venue perimeter)", included: true },
      { category: "Staffing", feature: "Security (street-level)", included: true },
      { category: "Branding", feature: "Interior venue branding", included: true },
      { category: "Branding", feature: "Building wrap (1 surface)", included: true },
      { category: "Branding", feature: "Street-level wrap", included: true },
      { category: "Branding", feature: "Rooftop branding", included: false },
      { category: "Coordination", feature: "Permitting assistance", included: true },
      { category: "Coordination", feature: "City coordination", included: true },
      { category: "Coordination", feature: "Dedicated event manager", included: true }
    ],
    venueAccess: "2–3 venues + street",
    productionLevel: "Enhanced",
    brandingIncluded: ["Interior", "Building wrap (1)", "Street-level wrap"],
    addOns: ["Additional building wraps", "Rooftop branding", "Custom food program", "Talent booking coordination"]
  },
  {
    id: "af-takeover",
    slug: "district-full-takeover",
    name: "District Full Takeover",
    tier: "full-takeover",
    startingRange: "$250,000+",
    idealGuestCount: "2,500 – 10,000+",
    positioningLine: "Complete district buyout. Total infrastructure control.",
    description:
      "Full privatization of the East Fremont District including all venues, street surfaces, rooftop positions, stages, and production infrastructure. Comprehensive city coordination, full security deployment, and complete branding control. Built for flagship conventions, major brand takeovers, and tentpole cultural events.",
    includedFeatures: [
      { category: "Venue", feature: "Single venue access", included: true },
      { category: "Venue", feature: "Multi-venue access (all)", included: true },
      { category: "Venue", feature: "Street closure (full district)", included: true },
      { category: "Production", feature: "Sound + lighting package", included: true },
      { category: "Production", feature: "Stage management", included: true },
      { category: "Production", feature: "Multi-stage coordination", included: true },
      { category: "Staffing", feature: "Bar staff", included: true },
      { category: "Staffing", feature: "Security (venue perimeter)", included: true },
      { category: "Staffing", feature: "Security (street-level, full district)", included: true },
      { category: "Branding", feature: "Interior venue branding", included: true },
      { category: "Branding", feature: "Building wrap (all surfaces)", included: true },
      { category: "Branding", feature: "Street-level wrap (full district)", included: true },
      { category: "Branding", feature: "Rooftop branding", included: true },
      { category: "Coordination", feature: "Permitting (full package)", included: true },
      { category: "Coordination", feature: "City coordination (Metro, Fire, Streets)", included: true },
      { category: "Coordination", feature: "Dedicated event manager + operations team", included: true }
    ],
    venueAccess: "All venues + full street + rooftops",
    productionLevel: "Full deployment",
    brandingIncluded: ["All branding surfaces included"],
    addOns: ["Extended multi-day pricing", "Custom stage builds", "Talent booking", "Broadcast/streaming infrastructure"]
  }
];
```

### 5.3 Case Studies (src/data/case-studies.ts)

```typescript
import { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-001",
    slug: "tech-conference-2025",
    title: "Global Tech Conference — Offsite Activation",
    clientType: "convention",
    clientName: "Confidential",
    date: "2025-01",
    guestCount: 4200,
    activationScope: ["full-takeover", "street-activation", "rooftop", "branding-package"],
    infrastructureUsed: ["Venue Alpha", "Venue Bravo", "Venue Charlie", "Venue Echo", "East Fremont Street"],
    customElements: [
      "Custom 60-foot LED archway at district entrance",
      "Branded crosswalks on three intersections",
      "Dual-stage synchronized programming",
      "Rooftop VIP reception with skyline views",
      "Custom beverage program with co-branded cocktails"
    ],
    results: [
      { metric: "Total Attendance", value: "4,200", context: "Over 3 nights" },
      { metric: "Venues Activated", value: "5", context: "Full district deployment" },
      { metric: "Branding Surfaces", value: "22", context: "Including 3 building wraps" },
      { metric: "NPS Score", value: "94", context: "Post-event attendee survey" }
    ],
    heroImageUrl: "/images/case-studies/tech-conf-hero.jpg",
    galleryImages: [
      "/images/case-studies/tech-conf-01.jpg",
      "/images/case-studies/tech-conf-02.jpg",
      "/images/case-studies/tech-conf-03.jpg",
      "/images/case-studies/tech-conf-04.jpg",
      "/images/case-studies/tech-conf-05.jpg",
      "/images/case-studies/tech-conf-06.jpg"
    ],
    testimonial: {
      quote: "The infrastructure was already there. We just had to show up with a vision.",
      attribution: "VP of Events",
      role: "Global Technology Company"
    },
    summary:
      "A full-district takeover supporting a major technology convention's premier offsite experience. The activation spanned five venues, the full East Fremont streetscape, and three rooftop positions over three consecutive nights. The unified production model eliminated multi-vendor coordination overhead and delivered a seamless, branded environment from arrival to departure."
  },
  {
    id: "cs-002",
    slug: "automotive-brand-launch",
    title: "Automotive Brand Launch — Product Reveal",
    clientType: "brand-activation",
    date: "2024-11",
    guestCount: 1800,
    activationScope: ["multi-venue", "street-activation", "stage-program", "branding-package"],
    infrastructureUsed: ["Venue Charlie", "Venue Echo", "East Fremont Street (partial)"],
    customElements: [
      "Vehicle display platform on closed street section",
      "Two-story building wrap with product imagery",
      "Synchronized stage reveal with pyrotechnics",
      "VIP dinner service in Venue Delta"
    ],
    results: [
      { metric: "Attendance", value: "1,800", context: "Single evening" },
      { metric: "Media Impressions", value: "12M+", context: "Earned media value" },
      { metric: "Venue Turnaround", value: "6 hrs", context: "Setup to doors" },
      { metric: "Client Rebook", value: "Yes", context: "2025 commitment signed" }
    ],
    heroImageUrl: "/images/case-studies/auto-launch-hero.jpg",
    galleryImages: [
      "/images/case-studies/auto-launch-01.jpg",
      "/images/case-studies/auto-launch-02.jpg",
      "/images/case-studies/auto-launch-03.jpg",
      "/images/case-studies/auto-launch-04.jpg"
    ],
    summary:
      "A multi-venue brand activation centered on a new vehicle product reveal. The district's street closure capability enabled a vehicle display platform on East Fremont, while synchronized stage programming in Venue Charlie delivered the reveal moment. Building wrap branding reinforced product messaging across the district perimeter."
  }
];
```

---

## 6. Design System

### 6.1 Color Palette

```
Token                  Hex         Usage
──────────────────────────────────────────────────────────
--bg-primary           #0F1115     Page background
--bg-secondary         #1A1D23     Card / panel surfaces
--bg-tertiary          #24272E     Elevated surfaces, hover states
--bg-hero              #0A0C0F     Hero sections, deep backgrounds

--text-primary         #F0EDE8     Primary body text (warm off-white)
--text-secondary       #9B978F     Secondary / supporting text
--text-tertiary        #6B6760     Captions, metadata
--text-disabled        #4A4740     Disabled state text

--accent-primary       #C49A6C     Primary accent (warm copper)
--accent-hover         #D4AA7C     Accent hover state
--accent-muted         #8B7355     Accent subdued / borders

--border-default       #2A2D33     Default border
--border-hover         #3A3D43     Hover border
--border-accent        #C49A6C     Accent border (active, focused)

--surface-overlay      rgba(10, 12, 15, 0.85)   Drawer / modal overlay
```

### 6.2 Typography

```
Font Stack:
  Headings:   "Inter", system-ui, sans-serif  (weight: 600, 700)
  Body:       "Inter", system-ui, sans-serif  (weight: 400, 500)
  Mono:       "JetBrains Mono", monospace     (metrics, data labels)

Scale:
  Hero Title:       clamp(2.5rem, 5vw, 4.5rem)    tracking: -0.02em    weight: 700
  Page Title (H1):  clamp(2rem, 4vw, 3.5rem)       tracking: -0.02em    weight: 700
  Section (H2):     clamp(1.5rem, 3vw, 2.25rem)    tracking: -0.01em    weight: 600
  Subsection (H3):  clamp(1.25rem, 2vw, 1.75rem)   tracking: -0.01em    weight: 600
  Body Large:       1.125rem / 1.75                  weight: 400
  Body:             1rem / 1.7                       weight: 400
  Small:            0.875rem / 1.6                   weight: 400
  Caption:          0.75rem / 1.5                    weight: 500    uppercase    tracking: 0.08em
  Metric Display:   clamp(2rem, 4vw, 4rem)           weight: 700    tabular-nums
```

### 6.3 Spacing Scale

```
Token        Value       Usage
──────────────────────────────────────
--space-1    0.25rem     Tight internal padding
--space-2    0.5rem      Compact element gaps
--space-3    0.75rem     Button padding, small gaps
--space-4    1rem        Standard internal padding
--space-6    1.5rem      Card padding, form field gaps
--space-8    2rem        Section internal padding
--space-12   3rem        Between-section spacing (mobile)
--space-16   4rem        Between-section spacing (tablet)
--space-24   6rem        Between-section spacing (desktop)
--space-32   8rem        Major section breaks

Container:
  Max width:    1280px
  Padding:      1.5rem (mobile) → 3rem (desktop)
```

### 6.4 Grid System

```
Tailwind grid classes:

Venue Grid:       grid-cols-1 md:grid-cols-2 lg:grid-cols-3    gap-6
Metric Bar:       grid-cols-2 md:grid-cols-4                    gap-4
Framework Cards:  grid-cols-1 md:grid-cols-3                    gap-8
Branding Grid:    grid-cols-1 md:grid-cols-2                    gap-6
Gallery:          grid-cols-2 md:grid-cols-3                    gap-3
```

### 6.5 Component Styling Principles

- **Cards:** `bg-[--bg-secondary]` with `border border-[--border-default]` and `rounded-lg`
- **Hover states:** Border shifts to `--border-hover`, subtle `bg-[--bg-tertiary]` transition
- **Active / Selected:** Border becomes `--border-accent`
- **CTAs:** `bg-[--accent-primary]` with `text-[--bg-primary]`, hover to `--accent-hover`
- **Secondary buttons:** `border-[--border-default]` with `text-[--text-primary]`, transparent background
- **Transitions:** 200ms ease on color, border, background. No bouncing or spring animations.
- **Shadows:** Minimal. Use border and background contrast instead. Reserve shadow for drawers and modals only.

---

## 7. CMS / Data Layer Approach

### Recommended: Airtable + Next.js ISR

**Why Airtable:**
- Non-technical team members can update venue data, case studies, and branding zones
- Structured relational data model maps cleanly to the type definitions above
- API access enables server-side data fetching at build time or on-demand
- Attachments (images, floor plans) can be stored directly

**Architecture:**

```
Airtable Base: "East Fremont District"
├── Table: Venues           → src/types/venue.ts
├── Table: Activations      → src/types/activation.ts
├── Table: Case Studies     → src/types/case-study.ts
├── Table: Branding Zones   → src/types/branding.ts
├── Table: Inquiries        → src/types/inquiry.ts (write-only via form)
└── Table: Site Settings    → Global config (contact info, metrics, etc.)
```

**Data Fetching Pattern:**

```typescript
// src/lib/airtable.ts
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export async function getVenues(): Promise<Venue[]> {
  const records = await base("Venues").select({ view: "Published" }).all();
  return records.map(mapRecordToVenue);
}

// Used in page components:
// export const revalidate = 3600; // ISR: revalidate every hour
```

**Inquiry Form Submission:**

```typescript
// src/app/api/inquire/route.ts
export async function POST(request: Request) {
  const data = await request.json();

  // Validate with zod
  const validated = inquirySchema.parse(data);

  // Write to Airtable
  await base("Inquiries").create([{ fields: validated }]);

  // Optional: forward to CRM webhook
  await fetch(process.env.CRM_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  return Response.json({ success: true });
}
```

### Alternative: Sanity.io

If richer content editing is needed (block-level text editing, image cropping, live previews), Sanity.io is the recommended alternative. The same type definitions can be mirrored as Sanity schemas. This adds editorial flexibility at the cost of slightly more setup complexity.

### Image Hosting

Use Cloudinary or Vercel Image Optimization for responsive image delivery. Store original assets in the CMS; transform and serve via CDN with appropriate srcset and format negotiation.

---

## 8. Example JSX Structures

See companion files:
- `jsx-examples/RootLayout.tsx`
- `jsx-examples/Homepage.tsx`
- `jsx-examples/InventoryPage.tsx`
- `jsx-examples/InquiryForm.tsx`

---

## 9. Technical Dependencies

```json
{
  "dependencies": {
    "next": "^14.2",
    "react": "^18.3",
    "react-dom": "^18.3",
    "tailwindcss": "^3.4",
    "airtable": "^0.12",
    "zod": "^3.23",
    "lucide-react": "^0.400",
    "date-fns": "^3.6",
    "framer-motion": "^11.0"
  },
  "devDependencies": {
    "typescript": "^5.5",
    "@types/react": "^18.3",
    "@types/node": "^20",
    "eslint": "^8.57",
    "eslint-config-next": "^14.2",
    "prettier": "^3.3"
  }
}
```

---

## 10. Deployment

**Platform:** Vercel (recommended for Next.js)
**Domain:** eastfremontdistrict.com
**Environment Variables:**

```
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
CRM_WEBHOOK_URL=
NEXT_PUBLIC_SITE_URL=https://eastfremontdistrict.com
CLOUDINARY_CLOUD_NAME=
```

**Build Configuration:**
- Output: Hybrid (static + server)
- ISR revalidation: 3600s for data pages, static for structural pages
- Image optimization: Vercel built-in or Cloudinary loader

---

*End of Architecture Blueprint*
