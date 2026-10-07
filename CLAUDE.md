# East Fremont District (F.E.E.D.) — Project Context

## Owner
Keith (keith@gorunrabbit.com) — Corner Bar (the company dropped "Management" in 2026; site www.cornerbar.com)

## What This Is
Next.js website for the Fremont East Entertainment District (F.E.E.D.) in Downtown Las Vegas. Produced by Corner Bar (formerly Corner Bar Management; Wynn Nightlife no longer a partner). Backed by City of Las Vegas and LVCVA.

## Active Project: Thriller Guinness World Record Event Page

### Event Details
- **What:** World's largest Thriller dance — official Guinness World Record attempt
- **Date:** **Sunday, October 25, 2026** — CONFIRMED by Keith (2026-07-20). Moved off Monday Oct 26 for family turnout. Anything still showing Oct 26 (wireframe, older deck exports) is STALE. Re-confirm the date with the GWR rep.
- **Location:** F.E.E.D., Downtown Las Vegas
- **Target:** 15,000 dancers (current record: 13,597, set in Mexico City, 2009)
- **Check-in:** 4:00 PM | **Attempt:** 7:00 PM
- **Cost:** Free to participate

### Guinness Requirements (from GWR email)
- All participants must be well versed in the dance moves
- Original Michael Jackson Thriller single (USA) must be played loud enough for all to hear
- Full and original dance movements from the Thriller music video must be performed by all
- At least one witness must be a dance expert with proof of qualifications
- Steward ratio: 1 steward per 100 participants (updated from 1:50)
- Mass participation category rules apply

### Wireframe
- File: `thriller_event_page_wireframe.html` (in project root)
- 8 sections: Hero, Record stats, Event details grid, How it works (4 steps), Choreography video placeholder, Registration form, FAQ accordion (5 questions), Sponsor bar
- Uses the EFD brand system (dark backgrounds, gold/copper #C49A6C accent, cream #F0EDE8 text, gray #9B978F secondary)

### Open Questions (from wireframe)
1. Target number — is 15,000 the right goal?
2. ~~Event date — Sunday, October 25, 2026 (confirmed)~~
3. Registration — embed form, link to Eventbrite, or just collect emails?
4. Sponsors — any confirmed partners to feature?
5. Route — `/thriller` or `/events/thriller`?

### Next Step
Keith wants to create the actual designed page in Canva using Claude Design. No Thriller design exists in Canva yet. The wireframe and brand references (sponsorship decks) are ready to inform the prompt.

## Brand Systems

### EFD Website (used for Thriller page)
- Backgrounds: #0F1115, #1A1D23, #1a1a2e
- Primary accent: gold/copper #C49A6C
- Text: cream #F0EDE8, secondary gray #9B978F
- Cards: dark fill with #2A2D33 borders, rounded corners
- Section labels: 11px uppercase gold, letter-spaced
- Tone: premium, luxury nightlife

### Feed the Block (event series brand)
- Full-bleed crowd photography backgrounds
- White bold uppercase headlines, yellow accent for emphasis words
- Pink/magenta accent lines and borders
- Orange left-border accents on cards
- Tone: energetic, festival, communal

## Key Files
- `EastFremontDistrict-Activation-Opportunities-2026.pdf` — activation/sponsorship deck (EFD brand)
- `public/FeedTheBlock-RetailSponsorship-2026.pdf` — retail sponsorship deck (FTB brand)
- `src/data/activations.ts` — activation framework tiers and pricing
- `src/data/venues.ts` — venue data
- `cbm-sponsorship-dashboard.html` — sponsorship dashboard

## Canva Designs (existing)
- Feed the Block — Retail Sponsorship Opportunities 2026
- FEED THE BLOCK w/ MARSHMELLO
- Feed the Block — Post-Mortem: Marshmello
- Multiple FEED THE BLOCK presentation variations
- No Thriller design yet

## Partners
- **Wynn Las Vegas** — Co-Producer
- **City of Las Vegas** — Institutional Sponsor
- **LVCVA** — Institutional Sponsor
- **Diageo** — Beverage Partner

## District Stats (Year 1)
- 32,000+ total attendees across 4 events
- 10,000+ casino crossover per event
- 30,861 pre-registered signups
- 296.6M earned media impressions
- 7 venues, 20K+ sq ft
- Past headliners: Marshmello, Diplo, Major Lazer, Gryffin

## Active Project: Insomniac 360 — On The Block (pitch page)

### Route
`/event/insomniac360` — unlisted. `/event/` is already in `robots.ts` disallow
and absent from `sitemap.ts`; `page.tsx` also sets `robots: { index: false }`.
`SiteHeader` and `ConditionalFooter` both bail on `/event/*`, so the page
supplies its own minimal bar and footer.

### Files
- `src/app/event/insomniac360/page.tsx` — metadata + noindex
- `src/app/event/insomniac360/opengraph-image.tsx` — 1200×630 link-preview card (Satori)
- `src/app/event/insomniac360/Insomniac360Client.tsx` — hero, block info, proof, sections
- `src/app/event/insomniac360/BlockMap.tsx` — layered map viewer + HTML legend (ported from `festival-map.html`)
- `src/app/event/insomniac360/BudgetTable.tsx` — budget snippet, totals derived not hard-coded

### Source material (from Ryan Doherty, Corner Bar, via Dropbox)
- `Insomniac360 PRESENTATION.pdf` (5pp) — map layers, image-only, no text layer
- `Insomniac360 PRESENTATIONonepage.pdf` — composite map + budget snippet
- `festival-map.html` + `assets/` — base.jpg, layer-2…layer-5.png

### Map assets — in place
`public/images/insomniac360/`: `base.jpg` plus `layer-2.png`…`layer-5.png`,
downscaled to 3200px wide, then cropped 372px off the top to remove the baked-in
Insomniac wordmark band — now **3200×1278, 804KB total**. The legend from that
band was rebuilt as HTML in `BlockMap.tsx`.

⚠️ All five plates stack with `absolute inset-0`, so **any crop/resize must be
applied to all five identically** or the overlays stop registering.

⚠️ Untouched originals live in `assets/` at the repo root, but **`assets/` is
gitignored** — they are not in the repo, only on the machine that built this.

Layer labels were verified by inspecting each PNG, not guessed:
layer-2 = Capacity & Access, layer-3 = Zones & Stage, layer-4 = Venues,
layer-5 = Street Food. Array order in `BlockMap.tsx` is paint order and the
`id` doubles as the keyboard shortcut.

`composite.jpg` and its `onError` fallback branch were deleted — 979KB for a
code path that could never execute. See `src/app/event/insomniac360/HANDOFF.md`
for the full writeup, open questions, and the OG/robots.txt caveat.

### Content decisions
- **6 venues on this page, not 8.** Back of House is the production/artist
  compound (described separately, not counted) and La Mona Rosa was dropped
  2026-08-13 — it never appeared on the block map, so it's out of scope for
  this activation. ⚠️ District Stats above says 7 venues district-wide; the 6
  is this activation's scope and is deliberate. Don't reconcile them.
- Positioning copy (hero subhead, block intro, all three pillars) was rewritten
  for a **promoter** rather than a brand. Every figure in it is F.E.E.D.'s own
  year-one data; **nothing asserts anything about Insomniac's business.** Keep
  it that way. Wants a human read before sending.

### Budget (per activation, venue buyout + fixed opex)
- Fixed operating costs: $28,200 — fencing/road closure $10,000, permits $2,000,
  parking lot buyouts $7,500 (Triple Bs, Park on Fremont, John E Carson, street
  spots), Metro $7,500, medical $1,200
- Weekday grand total: $99,700–$104,700 by month
- Weekend grand total: $197,700–$202,700 by month
- Production, branding, talent, F&B quoted separately
