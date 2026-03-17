import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Inquiry",
  description:
    "Tell us about your event vision. Our team responds within 24 hours with tailored venue recommendations and pricing.",
  openGraph: {
    title: "Submit Inquiry | F.E.E.D.",
    description:
      "Tell us about your event vision. Our team responds within 24 hours with tailored venue recommendations and pricing.",
  },
};

export default function InquireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
