# LVCVA lead funnel — plan (proposed Oct 5 2026)

Context: LVCVA sends the "Book the Block" email to its partner network. Keith
earns a commission on business that comes through it, so attribution has to be
provable. Most of the funnel already exists in the repo but is dormant:
`DeckDownload.tsx` (not rendered anywhere), `/api/deck-download`, and the daily
`/api/cron/follow-ups` drip. All send from `inquiries@cornerbarmgmt.com`, which
the current cornerbar.com-scoped Resend key cannot use.

## Decisions needed from Keith / Ryan
- [ ] Which deck goes out (both PDFs on disk are dated 2026 — needs a 2027 refresh)
- [ ] Whose name signs the drip emails
- [ ] Commission definition in writing: first-touch? window (12 months)? do direct replies count?

## 1. Attribution (ship BEFORE the email goes out) — built Oct 5, uncommitted
- [x] Campaign tags on every link in the email (HTML, .txt, test script), `utm_content` per link: header / cta-top / explore / cta-bottom / footer
- [x] First-touch cookie `efd_attr` (90 days, first touch wins) — `AttributionCapture.tsx` in root layout; verified in headless Chrome
- [x] `efd_leads` columns `utm_source/medium/campaign/content`, `landing_path`, `first_touch_at` — migration `009_add_lead_attribution.sql`; stamped by `/api/inquire` + `/api/deck-download` via `lib/leads.ts` (falls back to a plain insert if the migration hasn't run — verified)
- [x] Migration 009 applied to production via the Supabase SQL editor (Oct 5) — all six columns verified in `information_schema`
- [x] GA4 events pushed to the dataLayer: `deck_request`, `inquiry_submit`
- [x] GTM container GTM-WZ6R39CG **Version 3 published Oct 5**: triggers `CE - deck_request` / `CE - inquiry_submit` + tags `GA4 Event - deck_request` / `GA4 Event - inquiry_submit` (G-DHKCS98H8S)
- [ ] GA4: mark `deck_request` and `inquiry_submit` as key events once they've fired (Admin → Events) — site is deployed; a real deck request will fire the first one
- [ ] Reply-to alias for direct replies — proposal: `booktheblock+lvcva@cornerbar.com` (M365 plus-addressing, no admin needed); send a test to it and confirm it lands in the booktheblock@ inbox BEFORE putting it in the handoff page
- [x] Committed + pushed `bb562c6` Oct 5; Vercel live ~80s later. Verified on prod: /book-the-block 200 (noindex), deck PDF 200, unsubscribe route rejects bad tokens, handoff page carries 6 tagged links, Pink Monkey on /inventory, first-touch cookie set + preserved on www (Secure, 90d)

## 2. Landing page + deck gate — built Oct 5, uncommitted
- [x] `/book-the-block` (noindex, not in sitemap): hero, what a takeover includes, year-one numbers + TransUnion card, deck gate, find-your-window. Email CTA buttons now point here.
- [x] `DeckDownload` rendered there (primary); `/inquire` secondary
- [x] `/api/deck-download` sends from `booktheblock@cornerbar.com`, reply-to set, team alert BCCs keith@
- [x] Deck REFRESHED Oct 5 → `public/FEED-BookTheBlock-Deck.pdf` (14pp, 4MB). Source now lives in the repo: `decks/book-the-block/deck.html` + img/ + fonts/; re-export with headless Chrome `--print-to-pdf` (`@page` 1280×720). Changes: tentpole lines fixed (p3), "16 venues" (cover + p4), proof relabeled "F.E.E.D. So Far" / "Feed the Block series" / "casino visits per event" (p10), NEW p13 "Your Window · 2027" (CES Jan · convention season Mar–Jun · F1 Nov, contracted to 2037 · year-round), closer says "2027 Activation Season" + site URL
- [ ] Thriller (Oct 25) proof slot: add to p10 or p13 once there's a real number
- [x] **Deck published as a collaborative artifact Oct 5:** https://claude.ai/artifact/3BKiJYwUPGgBo6zLxJ2ZcU — all 14 slides stacked and scaled; editors click "Edit text", change any text in place, "Save" publishes a new version for everyone (artifact capability); comment button per slide; PDF link to the live file. Keith must SHARE it (edit access for Ryan/Zokie/Mauricio). Builder: `decks/book-the-block/build-artifact.py` (reads deck-parts from the source HTML). ⚠️ The artifact and `deck.html` are now two copies — when the team's edits settle, port them back into `deck.html` and re-export the PDF.
- [x] **La Mona Rosa → Pink Monkey (bar & nightclub), Keith Oct 5.** Renamed in `venues.ts` (slug `pink-monkey`), district map, outreach page. Keith's call: keep the existing façade photo (old sign) on the deck p5 card AND the site card (`public/images/venues/pink-monkey/pink-monkey-01.webp`) until the shoot happens
- [ ] Pink Monkey: new photo after the shoot (deck + site), confirm capacity/kitchen/stage for the club format
- [x] TransUnion gallery: NO more photos exist (Keith, Oct 5) — closed; fresh shots only after the shoot
- [x] No popup

## 3. Drip refresh — built Oct 5, uncommitted
- [x] `src/lib/drip.ts`: D3 TransUnion story · D10 find your window · D21 walkthrough (D0 = the deck email). Bounded windows [3,10) [10,21) [21,36) so old leads never get blasted.
- [x] Stops: inquiry under the same email (`drip_stopped` activity), status past new/qualified, or `unsubscribed_at` set. A reply still needs a human to move the status.
- [x] `/api/unsubscribe` (HMAC token, GET + one-click POST) + `List-Unsubscribe` headers; migration 010 applied Oct 5
- [x] BCC keith@ on every send; HTML + plain-text parts
- [ ] Signature is "The F.E.E.D. Team · Corner Bar" (`SIGNATURE` in drip.ts) until Ryan names a person

## 4. Commission report
- [ ] Source filter on the Go Run Rabbit EFD Pipeline dashboard (reads `efd_leads`)
- [ ] Monthly "LVCVA-sourced leads → status" export as invoice backup

## Handoff page copy REFRESHED Oct 5 (for Ryan → LVCVA)
- [x] `/newsletter` + email HTML/txt now carry the refreshed draft: no opening quote, one-voice intro, thirteen venues, tentpole line evergreen, "Start Your Inquiry", plain-language stats, TransUnion CES block, video poster, reply address in sign-off; subject "Take over a whole block of Downtown Las Vegas"
- [x] Keith sent Ryan the handoff link Oct 5; Ryan drafts the note to LVCVA's team himself
- [ ] Ryan can still flip: TransUnion block (out if he says so), proof numbers, subject line

## Recap sent Oct 5
- [x] Team recap "Book the Block — where everything stands" sent via Resend from keith@gorunrabbit.com to ryan@dtlv.com, zokie@cornerbarmgmt.com, mauricio@cornerbar.com (CC keith@) — Resend id `01a10e07…`. Asks: Ryan = 4 email calls + drip signature name + LVCVA hosted-buyer ask; Ryan/Mauricio = IMEX walkthrough date/time/host.
- [ ] Keith: share the review page + deck artifact with the three (edit access on the deck)

## Video in the LVCVA email (team request, Oct 5)
Source: Dropbox "2026-THE-BLOCK-SE-Video-TAVI-v03.mp4" — 1080p24, 1:58, 152 MB (10 Mbps). Says "13 unique bars, restaurants & nightlife concepts" (email/deck say sixteen venues — reconcile with Ryan). Shows Pink Monkey.
- [x] Email: poster frame with play button (`public/email-assets/feed-lvcva-video-poster.jpg`) linking to `/book-the-block?...&utm_content=video#video`; added to HTML + txt + test script; review artifact item 10 (v5)
- [x] Landing page: `Video()` section, env-gated — `NEXT_PUBLIC_BLOCK_VIDEO_EMBED` (iframe URL) or `NEXT_PUBLIC_BLOCK_VIDEO_URL` (mp4); poster `public/images/book-the-block/video-poster.jpg`
- [x] Web renditions encoded (scratchpad, not in repo): 1080p ~5 Mbps 76 MB, 720p ~2.5 Mbps 39 MB, faststart
- [x] **HOSTED on Cloudflare Stream** (Claymore And Colt account `790154fb…`, Images+Stream $0/mo + 1,000 min storage $5/mo, card ·6983, Keith ticked the terms Oct 5). Imported from the Dropbox dl=1 URL (browser upload tool caps at 10 MB). Video ID `e502c93ee815534ef86a0a86703b2c46`, customer subdomain `customer-x375kgoi6jdpeco1.cloudflarestream.com`; iframe/HLS/thumbnail all 200.
- [x] `NEXT_PUBLIC_BLOCK_VIDEO_EMBED` set in Vercel (production + preview) and `.env.local`; embed URL carries our poster
- [x] Pushed `9ab2b22`; verified live: /book-the-block#video renders the Stream iframe, "Thirteen venues" ×6, poster assets 200, handoff-page email carries the video link + thirteen
- [ ] Venue count: email/deck/landing rolled to THIRTEEN (Keith, Oct 5, to match the video). Site metadata + inventory still say 16 (all operators) — separate decision

## 6. Private-buyout track — Alyson (LVCVA) feedback, Oct 7
Alyson read the handoff page: it reads as a brand/impressions pitch and links to a block-party site; her clients are planners who want PRIVATE events and would be put off by crowd numbers. F1/Super Bowl brand clients are the other audience. Two tracks, two one-sheets.
- [x] `/book-the-block/private` (noindex) — planner page: closed-to-the-public hero + video poster, Stream player, "Your guests only" includes + program chips, 13 / 61,600 sq ft / 15,000 metrics, TransUnion as a private program (2,500 executives, no impressions), find-your-dates CTA → `/inquire?type=corporate`. No deck gate (deck is brand-oriented).
- [x] `Video` section extracted to `src/components/book-the-block/Video.tsx`, shared by both pages
- [x] LVCVA email (HTML/txt/test script) REWRITTEN for planners: subject "Your own block of Downtown Las Vegas, closed to the public"; all links → `/book-the-block/private` with the same `utm_*` tags; 32,000+/296.6M stat block REMOVED; TransUnion = "hosted 2,500 executives over three days"; bullets = private by default / one contract / room for any group / downtown. Handoff page `/newsletter` carries it.
- [x] Brand-activation version preserved as `public/email-assets/feed-brand-activation-newsletter.{html,txt}` (for brand/agency sends, not LVCVA)
- [x] Review artifact v7: "Update, Oct 7" banner pointing at the private version
- [ ] Ryan replies to Alyson with the new handoff link (Keith's call on wording)
- [ ] Planner one-sheet PDF (one page, private track) — the deck stays brand-facing
- [ ] Inquiry form: `type=corporate` preselect — verify `/inquire` honors the query param

## 7. Mauricio's asks (Oct 7 reply to the recap)
- [x] GTM: mauricio@cornerbarmgmt.com added to the Corner Bar Management account (Keith, Oct 7; invite form prepped via Chrome, Keith ticked Publish + Invite)
- [x] Weekly summary: `/api/cron/weekly-summary?secret=…` built Oct 7 — past 7 days of leads (who/what/utm), inquiries vs deck requests, drip sends, unsubscribes, tour RSVPs, campaign-to-date by source + status; to booktheblock@, cc mauricio@cornerbar.com, bcc keith@. `&dry=1` returns the HTML without sending. Page views/video plays stay in GA4 (not queried).
- [x] SCHEDULED Oct 7: vercel.json cron `0 15 * * 1` (Mondays 8 AM PT; first run Mon Oct 12)
- [ ] Prod has Keith's Oct 5 curl test lead (utm_source=test) — delete it or it shows in the first summary
- [x] IMEX block tours (9:30 AM is DELIBERATE per Keith — not everyone hits the floor at open) — built Oct 7: `/book-the-block/imex` (noindex; hero, what you'll see, meeting point/when/getting here/host, RSVP form: day · name · company · title · party size · email · mobile · notes · opt-in). `POST /api/block-tour-rsvp` → `block_tour_rsvps` (migration 011, applied Oct 7), confirmation email w/ .ics attachment, team alert to booktheblock@ cc Mauricio bcc Keith with contact + opt-in + source. Details in `src/lib/block-tour.ts`. GTM event `tour_rsvp` fires but has no trigger yet.
- [x] Migration 011 APPLIED to prod Oct 7 (SQL editor via Chrome): `block_tour_rsvps` — RLS on, insert-only policy, 17 columns
- [ ] From Mauricio: parking guidance (`PARKING_GUIDANCE`) + mobile for the morning (`HOST.phone`) — until set, page + confirmation say details follow the day before, and every team alert flags it
- [ ] Invitation draft → `tasks/imex-tour-invitation.md` (long + short). Mauricio/Keith send one at a time to the 10 Las Vegas DMC contacts; Mauricio can also visit stands F801 / E1117 / E1325
- [ ] After the first real RSVP: GTM trigger + GA4 tag for `tour_rsvp` (optional)

## 5. Industry outreach — trade press + planner events (added Oct 5; dates verified)
Every channel gets its own tag on the same links the LVCVA send uses (`utm_source=bizbash|imex|connect|ems`, `utm_campaign=book-the-block`), so the attribution built in step 1 covers all of it with no extra code.
- [ ] **BizBash new-venues roundup — pitch THIS MONTH.** Free. Runs March / July / November; November is next, so the window is October. Pitch F.E.E.D. as a new venue concept (Book the Block). Submission → https://www.bizbash.com/get-featured
- [ ] **BizBash post-event submissions** — accepted up to two weeks after any event, with 3–5 high-res photos + vendor list. Thriller (Oct 25) is the first candidate; CES 2027 is the next big one.
- [ ] **IMEX America, Oct 13–15 2026, Mandalay Bay** (6,100+ buyers / 3,700+ exhibitors; Smart Monday Oct 12). Booth = too late. Do: a small hosted walkthrough or after-hours event downtown for invited planners. **Invitations must go out this week.** Needs: date/time, the landing page link with `utm_source=imex`.
  - [x] Invite list built Oct 5: full exhibitor directory pulled (3,805 → `IMEX-America-2026-Exhibitors.csv`, untracked) → refined to 20 US DMCs/agencies → 47 decision-makers enriched via Apollo (47 credits), all emails verified → **`IMEX-2026-DMC-Contacts-Enriched.csv`** (untracked; priority 1 = 10 Las Vegas-office people, 2 = 15 network leaders, 3 = 22 independents). Hand-picked only — never a blast.
  - [ ] Manual check: Chicago Is / Midwest DMS, Terramar San Diego, Cohera (didn't resolve in Apollo)
  - [ ] Ask the LVCVA contact to put a downtown walkthrough on a hosted-buyer itinerary (the planners themselves aren't in any public list)
- [ ] **Connect Spring Marketplace, Apr 21–23 2027, Wynn Las Vegas** — pre-booked one-to-one planner meetings. Decide on supplier registration.
- [ ] **Experiential Marketing Summit, Apr 27–29 2027, MGM Grand** — 1,000+ brand/agency experiential marketers (the exact buyer). 2026 ran offsite field trips + after-hours at Vegas venues → pitch F.E.E.D. as a 2027 host venue. ⚠️ Sales contacts were in the "Sources" of Keith's research note — not in this repo; add them here.
- [ ] April 2027 = the biggest window (two events in one week). Plan one on-block hosted moment that serves both.

## Review
(fill in as items ship)
