# Insomniac 360 — On The Block · Handoff

Pitch page for a potential Insomniac full-district takeover of Fremont East.
Built 2026-08-13, revised the same day after a browser + mobile pass.
Route is complete and renders; nothing here is half-finished.

**Route:** `/event/insomniac360`
**Brief:** show some F.E.E.D. video, high-level info on the block, the
interactive map, and the budget snippet. Nothing else was asked for.

---

## Status

| | |
|---|---|
| Route renders | ✅ |
| `npx tsc --noEmit` | ✅ clean |
| `npx eslint src/app/event/insomniac360` | ✅ clean |
| `next build` | ✅ clean — prerenders static, 8.43 kB / 105 kB First Load JS |
| Exercised in a real browser | ✅ desktop + mobile — see [Verified](#verified) |
| Deployed | ✅ live — commit `8e3e3cd`, pushed to `main` 2026-08-13 |

**Live at** `https://www.eastfremontdistrict.com/event/insomniac360`
(the apex 307-redirects to `www`).

---

## Files

```
src/app/event/insomniac360/
├── page.tsx                 # metadata + noindex; server component
├── opengraph-image.tsx      # 1200×630 link-preview card (Satori)
├── VimeoHero.tsx            # hero background: Marshmello recap + poster fallback
├── Insomniac360Client.tsx   # page shell: hero, block info, proof, section wrappers
├── BlockMap.tsx             # layered map viewer + legend (client)
├── BudgetTable.tsx          # budget snippet (client)
└── HANDOFF.md               # this file

public/images/insomniac360/
├── base.jpg        612 KB   # map plate, 3200×1278
├── layer-2.png      52 KB   # ┐
├── layer-3.png     104 KB   # │ transparent overlays, same dimensions
├── layer-4.png      33 KB   # │
├── layer-5.png       3 KB   # ┘
└── hero-marshmello.webp  546 KB   # hero poster / fallback still
```

The five plates total 804 KB. They are the same dimensions and are stacked with
`absolute inset-0`, so **any crop or resize must be applied to all five
identically** or the overlays stop registering with the plate.

## The hero

The hero plays **"FEED THE BLOCK w/ MARSHMELLO"** — the 1-year anniversary
recap, Fremont East, 2 April 2026. 49s, Corner Bar Management's Vimeo,
id `1180884686`. Same clip swan-forest embeds as
`FORESTHOUSE_VIMEO_FEED_THE_BLOCK` on its Forest House talent page.

It is an **iframe, not a `<video>`**, because the recap exists only on Vimeo —
the download endpoint isn't open to us, so there is no file to put in
`/public`. `VimeoHero.tsx` follows the pattern swan-forest already uses.

`hero-marshmello.webp` (546 KB) is the poster — a still from the same night,
so the image→video swap doesn't jump. It renders immediately and sits
underneath permanently.

⚠️ **The poster only cross-fades away once Vimeo reports `play`/`playProgress`
over postMessage — never on `onLoad` or a timer.** This is load-bearing. A
blocked or slow embed still fires `onLoad` while rendering nothing, so fading
on load blacks out the hero. Gated this way, a failed embed just leaves the
still, which is a perfectly good hero. Don't "simplify" it back to `onLoad`.

Under `prefers-reduced-motion` the iframe is never mounted at all — no video is
fetched and there's nothing to pause.

`/video/hero-drone.mp4` is **no longer used by this route**, but it is still
the homepage hero (`src/components/homepage/HeroVideo.tsx`). Do not delete it.

---

## Unlisted, by three mechanisms

The page is reachable by URL but should not be discoverable. This is
belt-and-braces on purpose — it's a pitch for a named prospect.

1. `robots.ts` already disallows `/event/` (pre-existing, not added by this work)
2. `sitemap.ts` never enumerated `/event/*` routes
3. `page.tsx` sets `robots: { index: false, follow: false, nocache: true }`

`SiteHeader` and `ConditionalFooter` both early-return on `/event/*`, so this
page supplies its own minimal top bar and footer. Same pattern as
`/event/thriller`. **If you add this route to nav or sitemap, you have broken
the brief.**

---

## The link-preview card

`opengraph-image.tsx` renders a 1200×630 card via Satori: the block plan
(base plate plus all four overlays, stacked in paint order and framed to clear
the type), a heavy left scrim, the F.E.E.D. mark, the wordmark, and a
15,000+ / 6 / 1 stat rail. Fonts are pulled from Google at build time using
the same old-browser-UA trick as the Thriller card, because Satori can't read
WOFF2.

Next picks it up automatically — `page.tsx` sets no `openGraph.images`, so the
file-based route wins. Verified: the page emits `og:image`, `og:image:width`,
`og:image:height` and `twitter:card=summary_large_image`.

⚠️ **`robots.ts` disallows `/event/` for `*`, and Slackbot, Twitterbot,
LinkedInBot and facebookexternalhit all honour robots.txt.** In those apps the
link will very likely render with no preview at all, card or not. iMessage,
WhatsApp and most email clients don't check robots.txt and will show it.

If a preview in Slack or on Twitter turns out to matter for how this gets
sent, the fix is to add per-agent `allow` rules for those crawlers in
`robots.ts` while leaving `*` disallowed — the page keeps its `index: false`
either way, so it still won't be indexed. **That is a site-wide file affecting
`/event/thriller` too, so it's a decision, not a tweak.** Left alone for now.

---

## Map notes

`BlockMap.tsx` is a port of `festival-map.html`, which came from Ryan Doherty
(Corner Bar) via Dropbox alongside the deck. Behaviour kept from the original:
per-layer toggle, alt-click to isolate, number keys, `0` shows all, `M` toggles
a 2.5× magnifier. All of it is confirmed working — see [Verified](#verified).

### Small screens

The plan carries more detail than a phone can resolve. Left to fit the column
it lands at ~327px wide at a 375px viewport, which renders the venue callouts
as specks. Below `md` the frame is therefore pinned to `min-w-[960px]` inside
an `overflow-x-auto` wrapper and drags sideways; from `md` up it fits the
column exactly as before (1184px in the `max-w-[1280px]` container).

The magnifier is driven by `onMouseMove`, so it is meaningless on touch. It is
gated behind `matchMedia("(hover: hover) and (pointer: fine)")` — button
hidden, `M` key ignored, hint text swapped for "drag the plan sideways". That
state **starts `false`** so the server render matches a touch client; a mouse
client turns it on after mount. Don't "simplify" it to a `useState(true)` —
that reintroduces a hydration mismatch.

### Layer identification

Labels were verified by compositing each PNG over a dark background and looking
at it — **not** guessed from filenames. Current mapping:

| File | Label | Contents |
|---|---|---|
| `layer-2.png` | Capacity & Access | "10,000 PEOPLE" / "1,000 PEOPLE" loading spans, perimeter barricades |
| `layer-3.png` | Zones & Stage | Insomniac 360 stage, Back of House + footprint outline, food truck / art / merch / VIP pins |
| `layer-4.png` | Venues | Six venue callout labels |
| `layer-5.png` | Street Food | Two additional F&B pins (tacos, ice cream) |

Array order in `LAYERS` is paint order, bottom to top, and the `id` doubles as
the keyboard shortcut. Reordering the array changes both.

### Asset optimisation

Originals were 5253×2709 and **7.6 MB** total. Downscaled to 3200px wide and
PNGs run through `pngquant --quality=65-92`, giving **988 KB**. 3200px is
deliberate: the map renders at ~1180px in a `max-w-[1280px]` container, and the
magnifier zooms 2.5× (~2950px effective), so 3200 keeps the lens crisp without
overshooting. A 1:1 crop was checked for banding in the neon glows — clean.

All five images are `loading="lazy" decoding="async"` — the map sits about
three screens down, so there's no reason to spend 804 KB on first paint.

⚠️ **Untouched originals are in `assets/` at the repo root — but `assets/` is
in `.gitignore` (line 24), so they are not in the repo.** They exist only on
the machine this was built on. If you need to re-derive the layers from the
5253×2709 originals, get them from Ryan's Dropbox or from that machine; a
fresh clone will not have them.

### The wordmark band was cropped off

The plates originally carried a purple band across the top holding the
Insomniac 360 wordmark and the full icon legend. It sat directly beneath the
section heading "Insomniac 360, laid out on Fremont East," putting the name on
screen twice within a few hundred pixels.

**All five plates were cropped by 372px from the top** — uniformly, so the
overlays still register — taking them from 3200×1650 to 3200×1278. 372 was
chosen because the band's fade to map ends at y≈372 and layer-3's topmost
content (the apex of a zone outline, around x=1200) begins at exactly y=372.
Cropping any deeper would clip live plan content.

The legend was rebuilt as HTML in `BlockMap.tsx` (`LEGEND`, lucide icons), so
it is now selectable, searchable and translatable rather than baked into a
JPEG.

### The composite fallback is gone

`composite.jpg` was a flattened map from the one-pager PDF, wired up as an
`onError` fallback for when the layered assets weren't present. The layers have
been in place throughout, so it never once rendered — 979 KB of the route's
weight for a path that couldn't execute. It has been deleted along with the
`COMPOSITE` const and the `layered` state branch. `BlockMap.tsx` is
meaningfully simpler for it.

---

## Budget notes

Source: the budget strip across the bottom of page 1 of
`Insomniac360 PRESENTATIONonepage.pdf`.

**Grand totals are derived in code**, not transcribed:
`total = venueRental[month][mode] + OPEX_TOTAL`. This was deliberate so the
monthly figures can't drift from the line items. Derived values match the deck
row exactly — verified against all 24 cells.

Fixed operating costs total **$28,200**:

| Item | Cost |
|---|---|
| Fencing / road closure | $10,000 |
| Permits | $2,000 |
| Parking lot buyouts | $7,500 |
| Metro | $7,500 |
| Medical | $1,200 |

⚠️ **The individual opex cells in the PDF are pink text on a green fill and are
close to illegible at screen resolution.** They were read at 300 dpi and
cross-checked against the $28,200 subtotal, which reconciles exactly. If someone
disputes a line item, that's the provenance — don't re-read it from a
screenshot.

Resulting ranges: **weekday $99,700–$104,700**, **weekend $197,700–$202,700**,
depending on month.

Production, branding, talent, and F&B are explicitly *not* in these numbers.
The page says so under the table; keep that caveat if you touch the copy.

### The Operating column is dropped on phones

`Operating` is `hidden sm:table-cell`. It's the same $28,200 on all twelve
rows and the subtotal is stated in full directly above, so on a narrow screen
it was pure noise — and worse, it pushed **Grand total**, the number the
reader actually came for, off the right edge. With it hidden the table fits a
375px viewport outright and no longer scrolls at all. `min-w-[520px]` is
therefore `sm:`-only now.

---

## Content provenance

Anything not from the Insomniac deck came from `FEED-BookTheBlock-Deck.pdf`:
the 15,000 capacity, 61,600 sq ft, the three pillars, venue descriptions, the
`booktheblock@cornerbar.com` contact, and the year-one proof stats (32K+
attendees, 296.6M impressions, 10K+ crossover, 30,861 pre-registered).

The Insomniac deck itself is **five pages of map layers and one budget strip** —
no positioning copy, no narrative. The first draft therefore ran on Book The
Block's generic brand-facing prose.

### The positioning pass

The hero subhead, the block intro, and all three `PILLARS` have since been
rewritten to address a **promoter** rather than a brand. The angles used:

| Pillar | Argument |
|---|---|
| Your Headliners are already downtown | Marshmello, Diplo, Major Lazer and Gryffin have played this block; 32K attendees and 10K+ casino crossover per event say the audience doesn't need importing |
| A finished block, not an empty field | Six rooms with sound, power, bars and staff already in them, versus building a site from bare ground |
| Day and night, both yours | All-ages daytime and 21+ after dark on one footprint — something no single room in the city offers |

⚠️ **Every figure in that copy is F.E.E.D.'s own year-one data. Nothing in it
asserts anything about Insomniac's business, events, or plans** — that was
deliberate, since none of it was supplied and none of it is ours to claim.
Keep it that way. This is a first pass written without a brief; it wants a
human read before it goes out, particularly the word "Headliners," which is
Insomniac's own term for their audience and is used here on purpose.

---

## Open questions

### Still open

1. **The Laundry Room** is absent from the grid entirely. Probably correct —
   it's a speakeasy inside Commonwealth rather than a separately bookable
   room — but nobody has confirmed that's deliberate.

### Resolved

- ~~**Duplicate wordmark.**~~ Keith called it: band cropped off all five
  plates, legend rebuilt as HTML. See [Map notes](#the-wordmark-band-was-cropped-off).
- ~~**"8 venues" counts Back of House.**~~ Keith called it: Back of House is
  not a venue — it's the production and artist compound, described separately
  under the grid.
- ~~**La Mona Rosa.**~~ Keith called it: dropped. It never appeared on the
  block map, so it isn't in scope for this activation.

⚠️ **The count is 6, and that is deliberate.** F.E.E.D.'s district-wide figure
is 7 venues, so 6 looks like an error to anyone who knows the district. It
isn't — it's 8 tiles minus Back of House (not a venue) minus La Mona Rosa (not
in scope). Six is what Insomniac would actually get. The reasoning is also in
a comment above `VENUES` in `Insomniac360Client.tsx`; don't "correct" it back.

---

## Verified

Everything below was exercised against `next start` on the production build,
driven in real Chrome — not a static replica.

**Desktop (1440px)**

- Layer toggle, alt-click isolate, number keys, `0` show-all — all working
- `M` magnifier: lens renders and the magnified content centres exactly on the
  cursor, so the lens maths are correct
- Layer labels confirmed correct — hiding layer-4 removes precisely the venue
  callouts, revealing the capacity spans beneath
- Anchor jumps (`#map`, `#budget`) work
- Composite fallback correctly does *not* fire; all five layers load at
  3200×1650
- Map frame measures 1184px, which is what the 3200px asset choice was sized
  against

**Mobile (375px and 390px, touch emulation)**

- No horizontal page overflow at either width
- Budget table fits without scrolling; Grand total on screen
- Magnifier button correctly absent
- No tap target under 40px
- **Zero JS errors at any viewport**

**Live (production, after deploy)** — re-checked on
`www.eastfremontdistrict.com`, desktop and mobile: 6 venue tiles with the
right names, 14 legend items, map frame 1184px / 960px, magnifier present on
desktop and absent on touch, no horizontal overflow, `noindex, nofollow,
nocache` still served, OG image 200, all five plates 200, `composite.jpg`
correctly 404, no JS errors.

### Still not verified

- **No real device.** Touch emulation is not a real iPhone; momentum scrolling
  on the map's horizontal scroller in particular is worth a thirty-second
  check on actual hardware.
- **Hero playback, automated browsers.** Keith confirmed the recap plays in an
  ordinary browser window (2026-08-13), which is what settled it. It could not
  be confirmed from the tooling here: every browser available to this work is
  automation-driven, and Vimeo serves those a "couldn't verify the security of
  your connection" interstitial instead of the video. **So don't treat a
  still-looking hero in a headless/CDP screenshot as a regression** — check it
  in a real window first. If it ever genuinely stops moving, look at whether
  `eastfremontdistrict.com` is allowed under the clip's Vimeo embed privacy
  settings. Either way the page degrades to the Marshmello still, not to black.

---

## Suggested first moves

1. Get answers on the three open questions above.
2. Decide whether the copy needs an Insomniac-specific pass before it's sent.
3. Open it on a real phone.
4. Delete `_to_delete/` **before** staging — see Housekeeping.

---

## Housekeeping

Both items that used to live here are done: `_to_delete/` has been removed
(it was never in `.gitignore`, so a `git add -A` would have committed the
stray build log), and `composite.jpg` is deleted.

What's left to stage:

```
src/app/event/insomniac360/     (new)
public/images/insomniac360/     (new)
```

---

## Revision log — 2026-08-13, second pass

Reviewed against the repo, built, and driven in a browser. Changes made:

| Change | Why |
|---|---|
| Stats read `15,000+` / `61,600+` | Keith's call; meta description matched for consistency. Lucky Day's "15,000-LED canopy" deliberately left alone. |
| Hero scrim lightened | It was **two** stacked overlays — a gradient *plus* a flat 35% wash, ~71% black through the middle. The drone footage was barely visible. Now ~40%; legibility rides on the existing `text-shadow`. |
| Map pinned to 960px + sideways scroll below `md` | It rendered at 327px on a phone. Callouts were specks. |
| Magnifier gated on fine pointer | It was `onMouseMove`-only, so the button did nothing on touch. |
| Operating column hidden below `sm` | It was pushing Grand total off-screen. |
| `loading="lazy"` on all five map images | ~988 KB was loading eagerly three screens above the fold. |
| Tap targets to 44px | The header "Book the Block" link was **16px** tall; layer chips 34px; weekday/weekend 28px. |

Desktop geometry is unchanged by all of this — map frame still 1184px, all
four budget columns, magnifier present, original hint text.

### Third pass — polish + decisions

| Change | Why |
|---|---|
| **OG card added** (`opengraph-image.tsx`) | The route declared `summary_large_image` and shipped no image. It exists to be sent as a link. See [the caveat](#the-link-preview-card). |
| **Wordmark band cropped**, legend rebuilt in HTML | Open question 1, resolved by Keith. |
| **6 venues** — Back of House excluded (not a venue), La Mona Rosa dropped (not in scope) | Open questions 2 and 3, resolved by Keith. |
| **Insomniac positioning pass** | Prose was Book The Block generic; now aimed at a promoter. Wants a human read. |
| `composite.jpg` + `_to_delete/` deleted | 979 KB of unreachable code path, and a `git add -A` landmine. |
| Hero paragraph to `#F0EDE8/75` | The lighter scrim left secondary grey too close to the neon behind it. |
| `prefers-reduced-motion` respected | Hero video holds on frame 0 instead of looping. Handled via ref, not by toggling `autoPlay`, so SSR and client markup match. |
| `aria-pressed` on "All layers" | Every other control had it. |
| Venue grid re-bordered | The `gap-px` hairline trick leaves a hole in the last row at an odd count. |

Verified after: `tsc` clean, `eslint` clean, `next build` clean, 6 venue tiles
with the right names, 14 legend items, no `composite.jpg` reference anywhere,
video paused under `reduce` and playing under `no-preference`, no JS errors at
375px or 1440px.
