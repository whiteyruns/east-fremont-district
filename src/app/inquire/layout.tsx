import { Metadata } from "next";

export const metadata: Metadata = { title: "Submit Inquiry" };

export default function InquireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
