# BZaudio architecture

## Current stack
- Next.js App Router
- React and TypeScript
- Tailwind CSS with a small custom CSS design system
- Vitest for deterministic unit tests
- GitHub Actions for continuous integration
- Vercel planned for preview and production hosting

## Application shape
Keep the MVP as one deployable Next.js application. The current scope does not justify microservices.

```text
Browser
  |
  v
Next.js App Router
  |-- Public pages (home, shop, installation, contact)
  |-- SoundMatch client wizard
  |-- Shared navigation and category components
  |
  v
Typed domain logic
  |-- Catalog category metadata
  |-- SoundMatch rules and input validation
  |
  v
Vitest unit tests

GitHub Actions
  |-- lint
  |-- typecheck
  |-- tests
  |-- production build

Vercel hosting (pending GitHub integration authorization)
```

## Domain boundaries
- UI components collect and present user input.
- `lib/soundmatch.ts` owns deterministic planning rules and validation.
- `lib/catalog.ts` contains category metadata only; it is not a live inventory source.
- Contact and SoundMatch briefs are copied by the browser. No backend persistence or transmission is implemented.

## Future integrations (not enabled)
- Supabase for customer/project data only after a data model, privacy policy, and access controls are agreed.
- Verified supplier feeds or approved APIs for product data.
- Payments only after fulfillment, tax, refund, and business requirements are defined.
- Email or CRM submission only after the destination and consent flow are confirmed.

## Deployment boundary
The application is currently developed on `planning/bzaudio-foundation`. The existing `main` branch is intentionally unchanged. Vercel project creation and preview deployment are pending the repository's GitHub integration authorization. Do not promote or merge to production without explicit release approval.
