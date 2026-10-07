import type { Metadata } from "next";
import { FileCode, FileText, Image as ImageIcon, ExternalLink, Download } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CopyField from "../CopyField";

// Handoff page for Ryan: the note to the Medium Rare founders, previewed as
// it sends, with the send details, downloads, and the calls that are his.
// Unlisted. Source files: public/email-assets/feed-medium-rare.{html,txt}.

const TITLE = "Medium Rare — Note from Ryan";
const DESCRIPTION =
  "Preview and send the note offering the East Fremont District block to Medium Rare as a co-produced property.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const EMAIL_HTML = "/email-assets/feed-medium-rare.html";
const EMAIL_TXT = "/email-assets/feed-medium-rare.txt";
const HEADER_IMG = "/email-assets/feed-medium-rare-header.jpg";

const TO = "joe@medium-rare.com, adam@medium-rare.com";
const CC = "jakeb@medium-rare.com, cam@medium-rare.com, tatum@medium-rare.com";
const FROM_LINE = "Ryan Doherty <ryan@dtlv.com>";
const SUBJECT = "You've got the block party. We've got the block.";
const PREHEADER = "One block of Downtown Las Vegas, thirteen venues, street closed. Your show on our block.";

const DOWNLOADS = [
  { icon: FileText, name: "Plain-text version", file: "feed-medium-rare.txt", href: EMAIL_TXT, note: "The recommended send. Paste it into a new message from your own inbox so it reads as a note from you, not a campaign." },
  { icon: FileCode, name: "Designed email (HTML)", file: "feed-medium-rare.html", href: EMAIL_HTML, note: "The version previewed below. We send it from booktheblock@cornerbar.com with reply-to set to you, or it goes out as the follow-up." },
  { icon: ImageIcon, name: "Header image", file: "feed-medium-rare-header.jpg", href: HEADER_IMG, note: "Feed the Block aerial with the Book the Block treatment. Only needed if the HTML is rebuilt elsewhere." },
];

const CALLS = [
  { title: "Plain note or designed version?", body: "For five people you already know, a plain email from ryan@dtlv.com will land better than a template. Recommendation: send the plain-text version yourself first and keep the designed one for the follow-up or for them to forward inside their team." },
  { title: "The three properties and the references", body: "The note maps Shaq's Fun House to F1 week, Roommates Block Party to an actual block, and Flavortown Tailgate to the street as the tailgate. Swap any of them if you know what they are pushing this year. References are Marshmello and Diplo headlining Feed the Block and TransUnion's three days at CES; drop either if you would rather not name them to this crew." },
  { title: "Is anyone from their side in Vegas for F1?", body: "The close is a twenty-minute walk down the block during F1 week, November 19 to 21. If you know someone is in town, name the day. The walk is the real conversion; the email is the excuse for it." },
];

export default function MediumRareHandoffPage() {
  return (
    <>
      <section className="pt-20 lg:pt-24 pb-12 bg-[#0A0C0F]">
        <Container>
          <SectionHeading
            label="For Ryan"
            title={TITLE}
            description="A producer-to-producer note to Joe Silberzweig and Adam at Medium Rare: the block as the Las Vegas home for one of their properties, co-produced the way they already work with their partners. Their properties are named, the deck is linked without a form, and every link is tagged so anything that comes back shows up under their name in the Monday report."
          />
        </Container>
      </section>

      <section className="py-14 bg-[#0F1115] border-t border-[#2A2D33]">
        <Container>
          <p className="text-[#C49A6C] text-xs font-semibold uppercase tracking-widest mb-2">Send details</p>
          <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight mb-8">Who it goes to</h2>
          <div className="max-w-3xl space-y-6">
            <CopyField label="From" value={FROM_LINE} />
            <CopyField label="To" value={TO} />
            <CopyField label="Cc" value={CC} />
            <CopyField label="Subject line" value={SUBJECT} />
            <CopyField label="Preheader (designed version only)" value={PREHEADER} />
          </div>
        </Container>
      </section>

      <section className="py-14 bg-[#0A0C0F] border-t border-[#2A2D33]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[#C49A6C] text-xs font-semibold uppercase tracking-widest mb-2">Live preview</p>
              <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight">The designed version</h2>
            </div>
            <a href={EMAIL_HTML} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#C49A6C] hover:text-[#D4AA7C] text-sm font-semibold transition-colors">
              Open full preview <ExternalLink size={15} />
            </a>
          </div>
          <div className="mx-auto max-w-[680px] rounded-xl overflow-hidden border border-[#2A2D33] bg-[#1A1D23] shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2A2D33] bg-[#15181D]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#3A3D43]" />
                <span className="w-3 h-3 rounded-full bg-[#3A3D43]" />
                <span className="w-3 h-3 rounded-full bg-[#3A3D43]" />
              </div>
              <div className="min-w-0">
                <p className="text-[#F0EDE8] text-xs font-semibold truncate">{SUBJECT}</p>
                <p className="text-[#6B6760] text-[11px] truncate">{FROM_LINE}</p>
              </div>
            </div>
            <iframe src={EMAIL_HTML} title="Medium Rare note preview" loading="lazy" className="w-full h-[760px] bg-[#0F1115]" />
          </div>
        </Container>
      </section>

      <section className="py-14 bg-[#0F1115] border-t border-[#2A2D33]">
        <Container>
          <p className="text-[#C49A6C] text-xs font-semibold uppercase tracking-widest mb-2">Your calls</p>
          <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight mb-8">Three things before it goes</h2>
          <ol className="max-w-3xl space-y-6">
            {CALLS.map((c, i) => (
              <li key={c.title} className="flex gap-5">
                <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[#C49A6C]/40 text-[#C49A6C] font-mono text-sm font-bold">{i + 1}</span>
                <div className="pt-1">
                  <p className="text-[#F0EDE8] text-base font-semibold mb-1">{c.title}</p>
                  <p className="text-[#C9C4BB] text-[15px] leading-relaxed">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-14 bg-[#0A0C0F] border-t border-[#2A2D33]">
        <Container>
          <p className="text-[#C49A6C] text-xs font-semibold uppercase tracking-widest mb-2">Download the files</p>
          <h2 className="text-[#F0EDE8] text-2xl font-bold tracking-tight mb-8">Both versions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOWNLOADS.map((d) => {
              const Icon = d.icon;
              return (
                <a key={d.file} href={d.href} download={d.file} className="group flex flex-col bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-6 hover:border-[#C49A6C]/50 hover:-translate-y-1 transition-all duration-200">
                  <Icon size={28} className="text-[#C49A6C] mb-4" />
                  <h3 className="text-[#F0EDE8] text-base font-semibold mb-1">{d.name}</h3>
                  <code className="text-[11px] text-[#6B6760] font-mono mb-3 break-all">{d.file}</code>
                  <p className="text-[#9B978F] text-sm leading-relaxed mb-5 flex-1">{d.note}</p>
                  <span className="inline-flex items-center gap-2 text-[#C49A6C] group-hover:text-[#D4AA7C] text-sm font-semibold transition-colors"><Download size={15} /> Download</span>
                </a>
              );
            })}
          </div>
          <p className="text-[#6B6760] text-sm mt-12 pt-8 border-t border-[#2A2D33] max-w-3xl">
            Want a line changed? Write to{" "}
            <a href="mailto:keith@gorunrabbit.com" className="text-[#C49A6C] hover:text-[#D4AA7C] transition-colors">keith@gorunrabbit.com</a>
            {" "}and both versions get updated together.
          </p>
        </Container>
      </section>
    </>
  );
}
