// src/app/inquire/page.tsx
// Inquiry Page — /inquire route
// Professional RFP submission form with CRM-ready endpoint

"use client";

import { useState, FormEvent } from "react";
import type {
  InquirySubmission,
  GuestCountRange,
  BudgetRange,
} from "@/types/inquiry";

export default function InquirePage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="py-16 bg-[#0A0C0F]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-3">
            Get Started
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Submit an Inquiry
          </h1>
          <p className="mt-4 text-lg text-[#9B978F] max-w-2xl">
            Begin scoping your activation within the East Fremont District.
            Our team responds to qualified inquiries within 24 business hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-[720px] mx-auto px-6 lg:px-12">
          <InquiryForm />
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/inquire/InquiryForm.tsx
// ─────────────────────────────────────────────

type FormStatus = "idle" | "submitting" | "success" | "error";

function InquiryForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const payload: InquirySubmission = {
      organizationName: formData.get("organizationName") as string,
      contactName: formData.get("contactName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      eventType: formData.get("eventType") as InquirySubmission["eventType"],
      estimatedGuestCount: formData.get("guestCount") as GuestCountRange,
      preferredDateStart: formData.get("dateStart") as string,
      preferredDateEnd: formData.get("dateEnd") as string,
      budgetRange: formData.get("budgetRange") as BudgetRange,
      activationScope: formData.get("activationScope") as InquirySubmission["activationScope"],
      additionalNotes: formData.get("notes") as string,
      referralSource: formData.get("referralSource") as string,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or contact us directly.");
    }
  }

  if (status === "success") {
    return <FormConfirmation />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-6">
          Contact Information
        </legend>
        <div className="space-y-4">
          <FormField label="Organization Name" name="organizationName" required />
          <FormField label="Contact Name" name="contactName" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Email" name="email" type="email" required />
            <FormField label="Phone" name="phone" type="tel" />
          </div>
        </div>
      </fieldset>

      <div className="border-t border-[#2A2D33]" />

      {/* Event Details */}
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-6">
          Event Details
        </legend>
        <div className="space-y-4">
          {/* Event Type */}
          <FormSelect
            label="Event Type"
            name="eventType"
            required
            options={[
              { value: "", label: "Select event type" },
              { value: "corporate", label: "Corporate Event" },
              { value: "convention", label: "Convention / Trade Show Ancillary" },
              { value: "brand-activation", label: "Brand Activation" },
              { value: "private", label: "Private Event" },
              { value: "other", label: "Other" },
            ]}
          />

          {/* Guest Count */}
          <GuestCountSelector />

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-[#F0EDE8] mb-2">
              Preferred Date Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="dateStart"
                required
                className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none focus:ring-1 focus:ring-[#C49A6C]"
              />
              <input
                type="date"
                name="dateEnd"
                required
                className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none focus:ring-1 focus:ring-[#C49A6C]"
              />
            </div>
            <p className="mt-1 text-xs text-[#6B6760]">Start date — End date</p>
          </div>

          {/* Budget Range */}
          <BudgetRangeSelector />

          {/* Activation Scope */}
          <FormSelect
            label="Activation Scope"
            name="activationScope"
            required
            options={[
              { value: "", label: "Select scope" },
              { value: "single-venue", label: "Single Venue" },
              { value: "multi-venue", label: "Multi-Venue" },
              { value: "full-takeover", label: "Full District Takeover" },
            ]}
          />
        </div>
      </fieldset>

      <div className="border-t border-[#2A2D33]" />

      {/* Additional Info */}
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.15em] text-[#C49A6C] mb-6">
          Additional Information
        </legend>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#F0EDE8] mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows={4}
              placeholder="Describe your event vision, specific requirements, or questions..."
              className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#4A4740] focus:border-[#C49A6C] focus:outline-none focus:ring-1 focus:ring-[#C49A6C] resize-y"
            />
          </div>

          <FormSelect
            label="How did you hear about us?"
            name="referralSource"
            options={[
              { value: "", label: "Select one" },
              { value: "lvcva", label: "LVCVA / Las Vegas Convention Authority" },
              { value: "dmc", label: "DMC / Event Planner Referral" },
              { value: "industry-event", label: "Industry Event / Conference" },
              { value: "web-search", label: "Web Search" },
              { value: "social-media", label: "Social Media" },
              { value: "colleague", label: "Colleague / Word of Mouth" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
      </fieldset>

      {/* Error State */}
      {status === "error" && (
        <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-md">
          <p className="text-sm text-red-300">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full px-6 py-4 text-base font-medium bg-[#C49A6C] text-[#0F1115] rounded-md hover:bg-[#D4AA7C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
      </button>

      <p className="text-xs text-[#6B6760] text-center">
        Qualified inquiries receive a response within 24 business hours.
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────
// Shared Form Components
// ─────────────────────────────────────────────

function FormField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#F0EDE8] mb-2">
        {label}
        {required && <span className="text-[#C49A6C] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#4A4740] focus:border-[#C49A6C] focus:outline-none focus:ring-1 focus:ring-[#C49A6C]"
      />
    </div>
  );
}

function FormSelect({
  label,
  name,
  required = false,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#F0EDE8] mb-2">
        {label}
        {required && <span className="text-[#C49A6C] ml-1">*</span>}
      </label>
      <select
        name={name}
        required={required}
        className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] focus:border-[#C49A6C] focus:outline-none focus:ring-1 focus:ring-[#C49A6C]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/inquire/GuestCountSelector.tsx
// ─────────────────────────────────────────────

const guestRanges: { value: GuestCountRange; label: string }[] = [
  { value: "under-200", label: "Under 200" },
  { value: "200-500", label: "200–500" },
  { value: "500-1000", label: "500–1K" },
  { value: "1000-2500", label: "1K–2.5K" },
  { value: "2500-5000", label: "2.5K–5K" },
  { value: "5000-plus", label: "5,000+" },
];

function GuestCountSelector() {
  const [selected, setSelected] = useState<GuestCountRange | "">("");

  return (
    <div>
      <label className="block text-sm font-medium text-[#F0EDE8] mb-2">
        Estimated Guest Count <span className="text-[#C49A6C]">*</span>
      </label>
      <input type="hidden" name="guestCount" value={selected} />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {guestRanges.map((range) => (
          <button
            key={range.value}
            type="button"
            onClick={() => setSelected(range.value)}
            className={`
              px-3 py-2.5 text-xs font-medium rounded-md border transition-colors
              ${
                selected === range.value
                  ? "bg-[#C49A6C]/10 border-[#C49A6C] text-[#C49A6C]"
                  : "bg-[#24272E] border-[#2A2D33] text-[#9B978F] hover:border-[#3A3D43]"
              }
            `}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/inquire/BudgetRangeSelector.tsx
// ─────────────────────────────────────────────

const budgetRanges: { value: BudgetRange; label: string }[] = [
  { value: "under-25k", label: "Under $25K" },
  { value: "25k-75k", label: "$25K–$75K" },
  { value: "75k-150k", label: "$75K–$150K" },
  { value: "150k-500k", label: "$150K–$500K" },
  { value: "500k-plus", label: "$500K+" },
  { value: "to-be-determined", label: "TBD" },
];

function BudgetRangeSelector() {
  const [selected, setSelected] = useState<BudgetRange | "">("");

  return (
    <div>
      <label className="block text-sm font-medium text-[#F0EDE8] mb-2">
        Budget Range <span className="text-[#C49A6C]">*</span>
      </label>
      <input type="hidden" name="budgetRange" value={selected} />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {budgetRanges.map((range) => (
          <button
            key={range.value}
            type="button"
            onClick={() => setSelected(range.value)}
            className={`
              px-3 py-2.5 text-xs font-medium rounded-md border transition-colors
              ${
                selected === range.value
                  ? "bg-[#C49A6C]/10 border-[#C49A6C] text-[#C49A6C]"
                  : "bg-[#24272E] border-[#2A2D33] text-[#9B978F] hover:border-[#3A3D43]"
              }
            `}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// src/components/inquire/FormConfirmation.tsx
// ─────────────────────────────────────────────

import { CheckCircle } from "lucide-react";
import Link from "next/link";

function FormConfirmation() {
  return (
    <div className="text-center py-16">
      <CheckCircle size={48} className="mx-auto text-[#C49A6C] mb-6" />
      <h2 className="text-2xl font-bold mb-3">Inquiry Received</h2>
      <p className="text-[#9B978F] max-w-md mx-auto mb-8">
        Thank you for your interest in the East Fremont District. Our team
        will review your inquiry and respond within 24 business hours.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-sm font-medium border border-[#2A2D33] text-[#F0EDE8] rounded-md hover:border-[#3A3D43] transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
