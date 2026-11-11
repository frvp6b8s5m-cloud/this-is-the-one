# BZaudio Architecture Plan

## Architecture principle

Start with one well-organized web application. Avoid microservices and unnecessary infrastructure until usage or team boundaries justify them.

## Proposed stack

- Next.js with TypeScript for the responsive website and application routes.
- Tailwind CSS for consistent responsive styling.
- Supabase (PostgreSQL, Auth, and Storage) for data and customer accounts when required.
- Vercel for deployment.
- GitHub for source control and review.
- Payment provider and supplier integrations are deferred until commercial requirements and supplier access are confirmed.

## High-level modules

1. **Public site:** home, services, brands, catalog, product pages.
2. **Commerce foundation:** product data, price/availability metadata, cart/checkout integration later.
3. **SoundMatch:** questionnaire, recommendation rules, package results, saved builds.
4. **Inquiries:** quote and installation request capture and admin review.
5. **Admin:** catalog, brands, compatibility data, and inquiry management.
6. **Tools:** small standalone audio utilities, added incrementally.

## Data entities

- User
- Brand
- Supplier
- Product
- ProductCategory
- ProductSpecification
- CompatibilityRule
- SoundMatchSession
- SystemBuild
- SystemBuildItem
- QuoteRequest
- InstallationInquiry
- CustomerSystem (later)
- SystemDocument (later)

## Data flow

1. Admin maintains product records and their source/verification metadata.
2. Customer completes the SoundMatch questionnaire.
3. Recommendation service filters products using explicit requirements and compatibility rules.
4. Package builder assembles Essential, Recommended, and Professional options.
5. Results display rationale, price assumptions, missing information, and review warnings.
6. Customer can submit a quote or installation inquiry referencing the build.
7. Admin reviews the inquiry and follows up outside the automated recommendation flow.

## Recommendation engine boundaries

Keep the first rules engine deterministic, testable, and explainable. Put rules in a dedicated module, separate from UI components and database access. Never infer a missing technical specification. A rule should be able to return pass, fail, or needs-review, with a reason.

## Security

- Use server-side authorization for admin operations.
- Apply Supabase Row Level Security to customer-owned records.
- Validate all user inputs on the server.
- Keep supplier credentials, payment secrets, and service keys in environment variables.
- Do not expose private customer inquiries or account data publicly.

## Deployment and environments

Use separate development and production configuration. Commit an example environment file containing variable names only, never credentials. Add automated checks and tests before public launch.
