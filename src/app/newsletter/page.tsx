import type { Metadata } from "next";
import {
  FileCode,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Download,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CopyField from "./CopyField";

const TITLE = "Book the Block — Newsletter Asset Kit";
const DESCRIPTION =
  "Preview, download, and rebuild the East Fremont District “Book the Block” newsletter in your email platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Partner handoff page — shareable by link, but kept out of search.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const NEWSLETTER_HTML = "/email-assets/feed-lvcva-newsletter.html";
const NEWSLETTER_TXT = "/email-assets/feed-lvcva-newsletter.txt";
const HEADER_IMG = "/email-assets/feed-lvcva-header.jpg";
const HEADER_IMG_URL =
  "https://www.eastfremontdistrict.com/email-assets/feed-lvcva-header.jpg";

const FROM_LINE = "Book the Block <booktheblock@cornerbar.com>";
const SUBJECT = "Book the Block — an entire block of Downtown Las Vegas";
const PREHEADER =
  "An entire block of Downtown Las Vegas — 16 venues, one operator, one contract. Book it end to end.";

const DOWNLOADS = [
  {
    icon: FileCode,
    name: "Email HTML",
    file: "feed-lvcva-newsletter.html",
    href: NEWSLETTER_HTML,
    note: "The full responsive email. Import or paste into your ESP's HTML editor.",
  },
  {
    icon: ImageIcon,
    name: "Header image",
    file: "feed-lvcva-header.jpg",
    href: HEADER_IMG,
    note: "600px hero banner. Re-host in your ESP, or hotlink the live URL below.",
  },
  {
    icon: FileText,
    name: "Plain-text version",
    file: "feed-lvcva-newsletter.txt",
    href: NEWSLETTER_TXT,
    note: "Add as the plain-text part — it meaningfully improves deliverability.",
  },
];

const STEPS = [
  "Download the email HTML and header image below.",
  "In your email platform, create a new campaign and paste or import the HTML.",
  "Re-host the header image in your ESP's asset manager (or keep the live hosted URL — it's already public). Confirm the banner's image src resolves.",
  "Set the From name, Subject line, and Preheader using the copy fields above.",
  "Replace the unsubscribe placeholder [[REPLACE_WITH_ESP_UNSUBSCRIBE_LINK]] with your ESP's unsubscribe merge tag (Mailchimp *|UNSUB|*, SFMC %%unsub_center_url%%, HubSpot {{unsubscribe_link}}, Klaviyo {% unsubscribe %}). This is required for CAN-SPAM compliance.",
  "Paste the plain-text version into the text part of the email.",
  "Send yourself a test, check it on desktop, mobile, and dark mode, then schedule the send.",
];

export default function NewsletterPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-20 lg:pt-24 pb-12 bg-[#0A0C0F]">
        <Container>
          <SectionHeading
            label="LVCVA Partner Handoff"
            title={TITLE}
            description="Everything your email team needs to rebuild and send the “Book the Block” newsletter on East Fremont District's behalf — preview the email, download the source files, and follow the steps to load it into your platform."
          />
        </Container>
      </section>

      {/* Campaign details */}
      <section className="py-14 bg-[#0F1115] border-t border-[#2A2D33]">
        <Container>
          <p className="text-[#C49A6C] text-xs font-semibold uppercase tracking-widest mb-2">
            Campaign Details
          </p>
          <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight mb-8">
            Set these in your email tool
          </h2>
          <div className="max-w-3xl space-y-6">
            <CopyField label="From" value={FROM_LINE} />
            <CopyField label="Subject line" value={SUBJECT} />
            <CopyField label="Preheader" value={PREHEADER} />
          </div>
        </Container>
      </section>

      {/* Live preview */}
      <section className="py-14 bg-[#0A0C0F] border-t border-[#2A2D33]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[#C49A6C] text-xs font-semibold uppercase tracking-widest mb-2">
                Live Preview
              </p>
              <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight">
                Exactly how it sends
              </h2>
            </div>
            <a
              href={NEWSLETTER_HTML}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C49A6C] hover:text-[#D4AA7C] text-sm font-semibold transition-colors"
            >
              Open full preview <ExternalLink size={15} />
            </a>
          </div>

          {/* Email window frame */}
          <div className="mx-auto max-w-[680px] rounded-xl overflow-hidden border border-[#2A2D33] bg-[#1A1D23] shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2A2D33] bg-[#15181D]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#3A3D43]" />
                <span className="w-3 h-3 rounded-full bg-[#3A3D43]" />
                <span className="w-3 h-3 rounded-full bg-[#3A3D43]" />
              </div>
              <div className="min-w-0">
                <p className="text-[#F0EDE8] text-xs font-semibold truncate">
                  {SUBJECT}
                </p>
                <p className="text-[#6B6760] text-[11px] truncate">{FROM_LINE}</p>
              </div>
            </div>
            <iframe
              src={NEWSLETTER_HTML}
              title="Book the Block newsletter preview"
              loading="lazy"
              className="w-full h-[760px] bg-[#0F1115]"
            />
          </div>
        </Container>
      </section>

      {/* Downloads */}
      <section className="py-14 bg-[#0F1115] border-t border-[#2A2D33]">
        <Container>
          <p className="text-[#C49A6C] text-xs font-semibold uppercase tracking-widest mb-2">
            Download the Files
          </p>
          <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight mb-8">
            Source assets for the rebuild
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOWNLOADS.map((d) => {
              const Icon = d.icon;
              return (
                <a
                  key={d.file}
                  href={d.href}
                  download={d.file}
                  className="group flex flex-col bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-6 hover:border-[#C49A6C]/50 hover:-translate-y-1 transition-all duration-200"
                >
                  <Icon size={28} className="text-[#C49A6C] mb-4" />
                  <h3 className="text-[#F0EDE8] text-base font-semibold mb-1">
                    {d.name}
                  </h3>
                  <code className="text-[11px] text-[#6B6760] font-mono mb-3 break-all">
                    {d.file}
                  </code>
                  <p className="text-[#9B978F] text-sm leading-relaxed mb-5 flex-1">
                    {d.note}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#C49A6C] group-hover:text-[#D4AA7C] text-sm font-semibold transition-colors">
                    <Download size={15} /> Download
                  </span>
                </a>
              );
            })}
          </div>

          {/* Hosted image URL for hotlinking */}
          <div className="max-w-3xl mt-8">
            <CopyField label="Hosted header image URL" value={HEADER_IMG_URL} />
          </div>
        </Container>
      </section>

      {/* Rebuild steps */}
      <section className="py-14 bg-[#0A0C0F] border-t border-[#2A2D33]">
        <Container>
          <p className="text-[#C49A6C] text-xs font-semibold uppercase tracking-widest mb-2">
            How to Rebuild
          </p>
          <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight mb-10">
            Load it into your email platform
          </h2>

          <ol className="max-w-3xl space-y-6">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-5">
                <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[#C49A6C]/40 text-[#C49A6C] font-mono text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-[#C9C4BB] text-[15px] leading-relaxed pt-1.5">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <p className="text-[#6B6760] text-sm mt-12 pt-8 border-t border-[#2A2D33] max-w-3xl">
            Questions on the build, or need a tweak to the copy or art? Reach the
            F.E.E.D. team at{" "}
            <a
              href="mailto:booktheblock@cornerbar.com"
              className="text-[#C49A6C] hover:text-[#D4AA7C] transition-colors"
            >
              booktheblock@cornerbar.com
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
