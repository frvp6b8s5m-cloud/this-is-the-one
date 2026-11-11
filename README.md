# BZaudio

**Professional Audio. Made Easier.**

BZaudio is a multi-brand audio equipment retailer and installation company. It helps beginners, organizations, venues, and audio professionals choose, purchase, plan, and install sound systems using products from established manufacturers.

## What's in this repository

- Responsive BZaudio public website
- Category-led catalog foundation (supplier-backed product listings are added after sourcing is confirmed)
- Guided BZaudio SoundMatch questionnaire with explainable Essential, Recommended, and Professional planning paths
- Installation and consultation service page
- Quote brief builder that prepares a copyable request without pretending to submit it
- Deterministic, testable SoundMatch rules

## Run locally

Requirements: Node.js 24 and npm (the same major version used by GitHub Actions).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Current implementation boundaries

- The catalog contains category entry points, not fake live inventory.
- No manufacturer partnership, price, stock level, or delivery date is claimed until verified supplier data is connected.
- SoundMatch generates preliminary equipment-role plans, not exact product compatibility or acoustic predictions.
- Quote requests are prepared locally for copying; no request is transmitted or stored yet.
- Supabase, payment processing, supplier feeds, customer accounts, and admin tools are intentionally deferred until credentials and business requirements are ready.

## Project documents

See [brand specification](docs/brand-specification.md), [product requirements](docs/product-requirements.md), [architecture](docs/architecture.md), and [SoundMatch rules](docs/soundmatch-rules.md).
