# East Fremont District (F.E.E.D.) — Project Context

## Owner
Keith (keith@gorunrabbit.com) — Corner Bar Management

## What This Is
Next.js website for the Fremont East Entertainment District (F.E.E.D.) in Downtown Las Vegas. Produced by Corner Bar Management + Wynn Las Vegas Nightlife. Backed by City of Las Vegas and LVCVA.

## Active Project: Thriller Guinness World Record Event Page

### Event Details
- **What:** World's largest Thriller dance — official Guinness World Record attempt
- **Date:** October 25, 2026 (Sunday — moved off Monday Oct 26 for family turnout; re-confirm new date with GWR rep)
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
2. ~~Event date — October 25, 2026 (Sunday; moved off Monday Oct 26)~~
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
