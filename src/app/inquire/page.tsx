"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { GuestCountRange, BudgetRange } from "@/types/inquiry";

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Get Started"
          title="Submit an Inquiry"
          description="Tell us about your vision. Our team responds within 24 hours with tailored recommendations and pricing."
        />
      </Container>
    </section>
  );
}

// ============================================================================
// SEGMENTED SELECTOR COMPONENT
// ============================================================================
interface SegmentedSelectorProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  columns?: number;
}

function SegmentedSelector<T extends string>({
  value,
  onChange,
  options,
  columns = 3,
}: SegmentedSelectorProps<T>) {
  return (
    <div className={`grid grid-cols-${columns} gap-2`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
            value === option.value
              ? "bg-[#C49A6C]/10 border-[#C49A6C] text-[#C49A6C]"
              : "bg-[#24272E] border-[#2A2D33] text-[#9B978F] hover:border-[#3A3D43]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// SUCCESS STATE COMPONENT
// ============================================================================
function SuccessState() {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-6">
        <CheckCircle size={64} className="text-[#C49A6C]" />
      </div>
      <h2 className="text-[#F0EDE8] text-3xl font-bold mb-4">
        Inquiry Received
      </h2>
      <p className="text-[#9B978F] text-lg mb-8 max-w-md mx-auto">
        Thanks for reaching out! Our team will review your inquiry and contact you within 24 hours.
      </p>
      <Button href="/" variant="secondary">
        Return to Homepage
      </Button>
    </div>
  );
}

// ============================================================================
// INQUIRY FORM COMPONENT
// ============================================================================
function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    eventType: "corporate" as const,
    estimatedGuestCount: "500-1000" as GuestCountRange,
    preferredDateStart: "",
    preferredDateEnd: "",
    budgetRange: "to-be-determined" as BudgetRange,
    activationScope: "single-venue" as const,
    additionalNotes: "",
    referralSource: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessState />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* ===== CONTACT INFO FIELDSET ===== */}
      <fieldset className="space-y-4">
        <legend className="text-[#F0EDE8] font-bold text-sm uppercase mb-4">
          Contact Information
        </legend>

        <div>
          <label className="block text-[#9B978F] text-sm font-semibold mb-2">
            Organization Name
          </label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            required
            className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6760] focus:outline-none focus:border-[#C49A6C] transition-colors"
            placeholder="Your organization or company name"
          />
        </div>

        <div>
          <label className="block text-[#9B978F] text-sm font-semibold mb-2">
            Contact Name
          </label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            required
            className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6760] focus:outline-none focus:border-[#C49A6C] transition-colors"
            placeholder="Your name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#9B978F] text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6760] focus:outline-none focus:border-[#C49A6C] transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-[#9B978F] text-sm font-semibold mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6760] focus:outline-none focus:border-[#C49A6C] transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </fieldset>

      {/* Border separator */}
      <div className="border-t border-[#2A2D33]" />

      {/* ===== EVENT DETAILS FIELDSET ===== */}
      <fieldset className="space-y-4">
        <legend className="text-[#F0EDE8] font-bold text-sm uppercase mb-4">
          Event Details
        </legend>

        <div>
          <label className="block text-[#9B978F] text-sm font-semibold mb-2">
            Event Type
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] focus:outline-none focus:border-[#C49A6C] transition-colors"
          >
            <option value="corporate">Corporate Event</option>
            <option value="convention">Convention</option>
            <option value="brand-activation">Brand Activation</option>
            <option value="private">Private Event</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-[#9B978F] text-sm font-semibold mb-3">
            Estimated Guest Count
          </label>
          <SegmentedSelector
            value={formData.estimatedGuestCount}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                estimatedGuestCount: value,
              }))
            }
            options={[
              { value: "under-200", label: "Under 200" },
              { value: "200-500", label: "200-500" },
              { value: "500-1000", label: "500-1K" },
              { value: "1000-2500", label: "1K-2.5K" },
              { value: "2500-5000", label: "2.5K-5K" },
              { value: "5000-plus", label: "5000+" },
            ]}
            columns={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#9B978F] text-sm font-semibold mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="preferredDateStart"
              value={formData.preferredDateStart}
              onChange={handleInputChange}
              required
              className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] focus:outline-none focus:border-[#C49A6C] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#9B978F] text-sm font-semibold mb-2">
              End Date
            </label>
            <input
              type="date"
              name="preferredDateEnd"
              value={formData.preferredDateEnd}
              onChange={handleInputChange}
              required
              className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] focus:outline-none focus:border-[#C49A6C] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#9B978F] text-sm font-semibold mb-3">
            Budget Range
          </label>
          <SegmentedSelector
            value={formData.budgetRange}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                budgetRange: value,
              }))
            }
            options={[
              { value: "under-25k", label: "Under $25K" },
              { value: "25k-75k", label: "$25K-$75K" },
              { value: "75k-150k", label: "$75K-$150K" },
              { value: "150k-500k", label: "$150K-$500K" },
              { value: "500k-plus", label: "$500K+" },
              { value: "to-be-determined", label: "TBD" },
            ]}
            columns={3}
          />
        </div>

        <div>
          <label className="block text-[#9B978F] text-sm font-semibold mb-2">
            Activation Scope
          </label>
          <select
            name="activationScope"
            value={formData.activationScope}
            onChange={handleInputChange}
            className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] focus:outline-none focus:border-[#C49A6C] transition-colors"
          >
            <option value="single-venue">Single Venue</option>
            <option value="multi-venue">Multi-Venue</option>
            <option value="full-takeover">Full Takeover</option>
          </select>
        </div>
      </fieldset>

      {/* Border separator */}
      <div className="border-t border-[#2A2D33]" />

      {/* ===== ADDITIONAL INFO FIELDSET ===== */}
      <fieldset className="space-y-4">
        <legend className="text-[#F0EDE8] font-bold text-sm uppercase mb-4">
          Additional Information
        </legend>

        <div>
          <label className="block text-[#9B978F] text-sm font-semibold mb-2">
            Tell Us More
          </label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            rows={5}
            className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6760] focus:outline-none focus:border-[#C49A6C] transition-colors resize-none"
            placeholder="Share any additional details about your event, vision, or specific requirements..."
          />
        </div>

        <div>
          <label className="block text-[#9B978F] text-sm font-semibold mb-2">
            How did you hear about us?
          </label>
          <select
            name="referralSource"
            value={formData.referralSource}
            onChange={handleInputChange}
            className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] focus:outline-none focus:border-[#C49A6C] transition-colors"
          >
            <option value="">Select a source</option>
            <option value="search-engine">Search Engine</option>
            <option value="social-media">Social Media</option>
            <option value="referral">Referral</option>
            <option value="industry-event">Industry Event</option>
            <option value="other">Other</option>
          </select>
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C49A6C] text-[#0F1115] hover:bg-[#D4AA7C] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 font-semibold rounded-lg transition-colors"
      >
        {loading ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function InquirePage() {
  return (
    <>
      <PageHeader />
      <section className="py-12 lg:py-16 bg-[#0F1115]">
        <Container>
          <div className="max-w-[720px] mx-auto">
            <InquiryForm />
          </div>
        </Container>
      </section>
    </>
  );
}
