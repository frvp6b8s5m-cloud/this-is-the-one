# BZaudio implementation plan

## Overview
Bring the existing BZaudio foundation to a production-quality, advanced professional-audio platform in approved, independently verifiable vertical slices. Keep the current Next.js application modular and avoid microservices until a demonstrated need exists.

## Verified baseline
- Next.js App Router, React, TypeScript, Tailwind/custom CSS, Vitest, GitHub Actions.
- Public pages, local contact brief builder, SoundMatch wizard, Studio personalization, and three audio calculators exist.
- SoundMatch outputs preliminary role-based plans and saves designs in browser-local storage.
- No customer authentication, account-backed persistence, billing, supplier feed, checkout, or live quote submission is implemented.
- PA Designer and Live Assistant are specified but not yet implemented.
- CI runs lint, typecheck, tests, and build; no current workflow result has been confirmed for the latest commit.
- No tasks plan/tracker or project constraints file existed on the feature branch when inspected.

## Architecture decisions
- Keep one Next.js application with typed domain modules and thin UI components.
- Keep deterministic calculations and planning rules in pure, testable modules.
- PA Designer starts as schematic planning with explicit assumptions and NEEDS_REVIEW status.
- Live Assistant starts as user-guided workflows; no unsupported live-console monitoring/control claims.
- Preserve browser-local saves until identity and secure storage exist; disclose local-only behavior.
- Do not activate paid access until server-side identity, entitlement checks, verified billing webhooks, lifecycle handling, and authorization tests exist.
- Keep verified supplier data, product matching, payments, and production launch behind integration and approval gates.

## Task List

### Phase 1 — Foundation quality
1. Establish reproducible dependency installation and correct lint/typecheck/test/build commands.
2. Add project-wide quality constraints and baseline security/accessibility/performance checks.
3. Audit navigation, metadata, forms, keyboard flow, contrast, touch targets, errors, and responsive layouts.

### Checkpoint: Foundation
- Reproducible clean install succeeds.
- Lint, typecheck, tests, and production build pass on the feature branch.
- Critical/high dependency findings have explicit disposition.
- Keyboard and mobile smoke checks pass for primary pages.

### Phase 2 — Existing core product
4. Harden SoundMatch validation, saved-design parsing, error handling, keyboard flow, and edge-case tests.
5. Expand the audio toolbox with high-value, correctly unit-labelled field calculations and test coverage.
6. Add structured project brief export and consistent local-save disclosures.

### Checkpoint: Core
- SoundMatch intake, customization, comparison, save/load/delete, and copy/export are tested.
- Each calculator has formula, units, assumptions, bounds, invalid-input handling, and edge-case tests.
- No calculator implies a full system design or measurement result.

### Phase 3 — Paid product capabilities (implementation before billing)
7. Build PA Designer domain model and pure calculation/validation tests.
8. Build PA Designer schematic layout editor, zones, speaker roles, distances, and scenarios.
9. Add PA Designer comparison, assumptions report, save/load, and proposal export.
10. Build Live Assistant mixer/profile selection and task-based troubleshooting domain model.
11. Build Live Assistant workflows for signal flow, gain staging, EQ, dynamics, feedback, monitors, routing, line check, and soundcheck.
12. Add Live Assistant show checklists, notes, export, and mixer-guidance limitations.

### Checkpoint: PA Designer and Live Assistant
- Complete user journeys work on desktop and mobile.
- Domain logic has unit tests; critical components have integration/browser tests where supported.
- Unknown/missing specifications remain visibly unknown.
- No direct console control or acoustic simulation is claimed without implementation/validation.

### Phase 4 — Accounts, storage, and paid access
13. Specify and review identity/session architecture, privacy, retention, export, and deletion before collecting customer data.
14. Implement secure authentication and ownership-scoped server-side project storage after provider approval.
15. Implement Pro entitlement contracts and server-side checks.
16. Integrate a billing provider only after provider/business approval; verify signed webhooks, lifecycle, retries/idempotency, cancellations, refunds, and revocation.
17. Test authorization, cross-account isolation, unpaid/expired/canceled states, and webhook abuse cases.

### Checkpoint: Paid plan
- Pro users access PA Designer and Live Assistant through server-verified entitlements.
- Free, unauthenticated, expired, and revoked users cannot call protected operations directly.
- Billing events are signature-verified and idempotent.
- Customer data has documented retention, export, and deletion behavior.

### Phase 5 — Catalog and commerce
18. Define verified catalog/product data contract and provenance requirements.
19. Integrate approved supplier/product sources only after access and terms are confirmed.
20. Build compatibility evidence and review status; do not infer compatibility from brand/category alone.
21. Add quoting/checkout only after fulfillment, tax, refund, privacy, and payment requirements are approved.

### Phase 6 — Release readiness
22. Complete code, security, accessibility, performance, and privacy reviews.
23. Add observability and operational runbooks for supported production paths.
24. Verify preview deployment and primary user flows in a real browser.
25. Prepare release notes, rollback plan, support documentation, and final human review.
26. Merge/deploy only with explicit release approval and after external dependencies are ready.

## Risks and mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Engineering estimates presented as certified design | High | Schematic labels, assumptions, NEEDS_REVIEW, qualified review |
| Paid access enforced only in browser | High | Server-side entitlement checks and direct-operation tests |
| User project data exposed across accounts | High | Ownership checks and isolation tests |
| Unverified catalog data | High | Source provenance and manual verification |
| Non-reproducible builds | Medium | Committed lockfile, pinned runtime/tooling, frozen CI install |
| Large scope causes incomplete releases | High | Vertical slices, atomic commits, checkpoints |
| No browser/runtime verification | High | Preview deployment and real browser smoke tests |

## Open dependencies
- Authentication/storage provider and credentials.
- Billing provider, pricing, tax/refund/fulfillment rules.
- Supplier feeds, commercial permissions, and product source-of-truth.
- Vercel GitHub integration authorization.
- Manufacturer-specific APIs/docs or mixer control integrations.

## Completion standard
A task is complete only when acceptance criteria and the repository Definition of Done are met: tests prove behavior, full checks pass, runtime behavior is verified, edge/error paths are covered, documentation is current, security/accessibility are reviewed, and changes are committed. Rendering or compiling alone is not completion.
