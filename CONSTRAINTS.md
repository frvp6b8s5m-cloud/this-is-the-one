# BZaudio engineering constraints

These constraints apply to every feature and release. Task-specific acceptance criteria add to this bar; they do not replace it.

## Correctness and maintainability
- TypeScript strict checking must pass; do not use any to bypass a domain boundary.
- Domain calculations and validation belong in deterministic, independently tested modules.
- Every numeric result displays units, formula/assumptions, and valid-input guidance.
- Invalid, missing, non-finite, and unsupported values must not silently become valid recommendations.
- User-provided or browser-persisted data is untrusted and must be parsed/validated at its boundary.
- Every user-facing action must work or be clearly disabled with an explanation; no decorative/inert controls.
- Prefer small vertical slices; no task should modify more than five files without being decomposed.

## Testing and CI
- Every behavior change begins with a failing test or a documented reason TDD does not apply.
- Unit tests cover pure domain logic and edge cases; integration/browser tests cover critical user journeys and boundaries.
- Required CI checks: lint, typecheck, unit/integration tests, and production build.
- A task is not complete until the focused test, full suite, build, and applicable runtime checks pass.
- Never mark skipped, missing, or unavailable checks as passing.

## Accessibility and responsive design
- Target WCAG 2.1 AA for user-facing pages and controls.
- Normal text contrast at least 4.5:1; large text and meaningful UI graphics at least 3:1 where applicable.
- All interactive paths must work by keyboard with visible focus and logical order.
- Form controls require labels; errors and dynamic status updates must be announced.
- Touch targets should be at least 44 × 44 CSS pixels where practical.
- Primary flows must work at narrow mobile widths and desktop without horizontal page overflow.

## Performance
- Measure before optimizing.
- Target Core Web Vitals at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- Avoid unnecessary client-side JavaScript, large blocking assets, and unbounded client state.
- Document measurement environment and sample size; do not claim measured performance without evidence.

## Security and privacy
- Validate all external inputs server-side when server operations exist; client validation is UX, not a security boundary.
- Protected data access must verify authentication and resource ownership on every operation.
- Secrets never enter source control, logs, or client bundles.
- Use framework output escaping; never pass untrusted content to eval or unsafe HTML sinks.
- Minimize personal data; define purpose, retention, export, and deletion before persistent customer-data collection.
- Pro entitlements must be enforced server-side and deny by default.
- Billing webhooks must verify signatures and be idempotent before changing entitlements.
- Dependency installation must be reproducible from one committed authoritative lockfile; review lifecycle scripts and audit reachable critical/high vulnerabilities.

## Audio engineering integrity
- Label estimates and schematics as estimates/schematics; never present them as certified engineering.
- Do not invent manufacturer specifications, compatibility, inventory, pricing, supplier relationships, SPL, coverage, array behavior, rigging, electrical capacity, or code compliance.
- Unknowns remain explicit and route to NEEDS_REVIEW.
- Critical system design, safety, and commissioning require verified manufacturer data and qualified human review.
- Live Assistant must not claim to monitor or control a mixer without a real, authorized integration.

## Release discipline
- Work on the approved feature branch; keep main unchanged until explicit approval.
- A preview is not production. Production merge/deploy requires explicit user approval.
- Every release candidate needs a security/accessibility/performance review, operational notes, and rollback plan.
- Report only checks that have actual successful evidence.
