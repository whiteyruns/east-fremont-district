# East Fremont District

Marketing site for East Fremont District — a multi-venue urban event platform in Downtown Las Vegas, operated by Corner Bar Management.

## Stack

- **Framework:** Next.js 14 (App Router)
- **CMS:** Airtable (venues, activation frameworks, case studies)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Images:** Optimized WebP via sharp

## Development

```bash
npm install
npm run dev
```

Requires `.env.local` with:
```
AIRTABLE_PAT=pat...
AIRTABLE_BASE_ID=app...
```

## Scripts

- `scripts/seed-airtable.ts` — Create tables and seed data into a blank Airtable base
- `scripts/optimize-images.ts` — Batch convert JPG/PNG to WebP
