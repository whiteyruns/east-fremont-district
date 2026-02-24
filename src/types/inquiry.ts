export interface InquirySubmission {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  eventType: "corporate" | "convention" | "brand-activation" | "private" | "other";
  estimatedGuestCount: GuestCountRange;
  preferredDateStart: string;
  preferredDateEnd: string;
  budgetRange: BudgetRange;
  activationScope: "single-venue" | "multi-venue" | "full-takeover";
  additionalNotes?: string;
  referralSource?: string;
  submittedAt: string;
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
