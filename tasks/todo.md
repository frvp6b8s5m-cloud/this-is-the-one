# BZaudio task tracker

Active checklist for plan.md. Check an item only after its acceptance criteria and Definition of Done are verified.

## Phase 1 — Foundation quality
- [ ] **T01 — Reproducible toolchain and CI**: Add authoritative lockfile; use frozen CI install; verify lint command for pinned Next.js; run clean install, lint, typecheck, tests, build.
  - Acceptance: one authoritative lockfile; CI never rewrites it; all four checks pass.
  - Verification: clean frozen install + lint + typecheck + full test suite + production build.
- [ ] **T02 — Quality constraints and baseline audits**: Add CONSTRAINTS.md with measurable accessibility, security, performance, and test standards.
  - Acceptance: project quality bar is documented; critical/high issues have explicit disposition.
  - Verification: review config/workflow and run introduced checks.
- [ ] **T03 — Public-site accessibility/responsive audit**: Audit navigation, metadata, forms, keyboard order, focus, contrast, touch targets, errors, narrow layouts.
  - Acceptance: primary pages work by keyboard and mobile widths; inputs have labels; errors/statuses announced.
  - Verification: CI plus browser/axe checks when preview/browser is available.

## Phase 2 — Existing core product
- [ ] **T04 — SoundMatch domain hardening**: Validate enum values, collection sizes/content, non-finite values, and untrusted persisted JSON; handle corrupt data/quota failures.
  - Acceptance: invalid values never produce a plan; corrupt data cannot crash wizard; save failures disclosed.
  - Verification: failing-first unit tests, focused tests, full suite, build.
- [ ] **T05 — SoundMatch workflow hardening**: Prevent step navigation bypass; improve customization, compare, save/load/delete, reset, and copy/export.
  - Acceptance: keyboard-operable flow, visible validation, no silent data loss, responsive comparison.
  - Verification: component/browser tests and manual mobile/desktop smoke checks.
- [ ] **T06 — Advanced audio toolbox domain**: Add tested pure calculations for live-audio workflows such as power/voltage/current relationships, crossover/wavelength references, polarity/phase reference, and unit conversion.
  - Acceptance: every formula has documented units, assumptions, valid ranges, and edge-case tests.
  - Verification: TDD unit tests and numeric reference checks.
- [ ] **T07 — Advanced toolbox interface**: Build searchable navigation, grouped categories, editable inputs, live results, formula explanations, copy/export, mobile layout.
  - Acceptance: no inert controls; invalid input explained; tools keyboard accessible.
  - Verification: component/browser tests, lint/typecheck/build.

## Phase 3 — PA Designer and Live Assistant
- [ ] **T08 — PA Designer domain contract**: Define typed venue, audience area, zone, speaker-role, placement, distance, scenario, assumptions, review-status models.
  - Acceptance: unknown data remains unknown; no acoustic/rigging/electrical certification claims.
  - Verification: unit tests for geometry boundaries, invalid units, missing inputs, status semantics.
- [ ] **T09 — PA Designer schematic workspace**: Build editable top-down schematic with zones, speaker placement/orientation, distances, scenarios.
  - Acceptance: user can add/edit/remove planning objects; diagram labelled schematic, not coverage simulation.
  - Verification: component tests and desktop/mobile browser checks.
- [ ] **T10 — PA Designer proposal workflow**: Add comparison, assumptions/missing-data report, save/load, printable/exportable proposal.
  - Acceptance: export preserves assumptions, scenario, revision, NEEDS_REVIEW warnings.
  - Verification: serialization/export tests and end-to-end workflow.
- [ ] **T11 — Live Assistant domain and mixer profiles**: Create typed mixer/task profiles and verified-content structure recording model, firmware, source, confidence.
  - Acceptance: generic guidance clearly generic; exact model-specific steps only shown when sourced.
  - Verification: unit tests for matching and unsupported/unknown model states.
- [ ] **T12 — Live Assistant guided workflows**: Implement interactive troubleshooting/show-prep for signal, gain, EQ, dynamics, feedback, monitor, routing, line check, soundcheck.
  - Acceptance: each step has rationale, expected observation, safe action, escalation/rollback guidance.
  - Verification: branch/completion tests and browser smoke tests.
- [ ] **T13 — Live Assistant notes/export**: Add reusable checklists, show notes, patch/scene notes, local save/export with local-only disclosure.
  - Acceptance: notes survive reload locally, export accurately, can be deleted; no false account-sync claims.
  - Verification: persistence/serialization tests and browser flow.

## Phase 4 — Accounts, storage, paid entitlements
- [ ] **T14 — Identity/privacy specification**: Confirm provider and document session, threat, data classification, retention, export, deletion.
  - Acceptance: no customer data collected before provider/policy approval.
  - Verification: security review and explicit approval for provider/integration.
- [ ] **T15 — Secure authentication and account storage**: Implement sessions and ownership-scoped project/show-note storage after provider approval.
  - Acceptance: every read/write verifies ownership; account export/deletion paths work.
  - Verification: auth, IDOR, isolation, retention, export/deletion tests.
- [ ] **T16 — Pro entitlement enforcement**: Implement server-side plan contracts and deny-by-default checks for PA Designer and Live Assistant.
  - Acceptance: protected operations deny by default; client UI is not the security boundary.
  - Verification: authenticated/free/Pro/expired/revoked authorization tests.
- [ ] **T17 — Billing integration**: Integrate user-approved billing provider and signed, idempotent webhook lifecycle after business rules confirmed.
  - Acceptance: subscription and entitlement state stay synchronized; replay/cancel/refund states handled.
  - Verification: signature, replay, lifecycle, and access-control tests.

## Phase 5 — Catalog and commerce
- [ ] **T18 — Verified catalog contract**: Define product identifiers, manufacturer specs, source provenance, timestamps, price/stock freshness, compatibility evidence.
  - Acceptance: unsupported product claims cannot be published as verified.
  - Verification: schema and validation tests.
- [ ] **T19 — Supplier integration**: Connect only approved sources with confirmed access/terms.
  - Acceptance: imported data retains provenance/freshness; failures degrade safely.
  - Verification: contract tests with fixtures and provider sandbox if available.
- [ ] **T20 — Quote/checkout workflow**: Implement only after fulfillment, tax, refund, consent, and payment requirements approved.
  - Acceptance: no payment/order success claimed until provider confirmation.
  - Verification: payment sandbox, idempotency, failure, refund, webhook tests.

## Phase 6 — Release readiness
- [ ] **T21 — Security/privacy review**: Review input boundaries, headers, dependencies, storage, auth, retention, external integrations.
  - Acceptance: no unresolved reachable critical/high issue; deferrals have rationale and review date.
  - Verification: dependency audit and threat-model review.
- [ ] **T22 — Accessibility/performance review**: Measure key pages and complete WCAG-oriented review.
  - Acceptance: no critical accessibility blockers; performance regressions resolved or documented.
  - Verification: axe/Lighthouse/browser measurement on preview.
- [ ] **T23 — Observability and operations**: Add privacy-safe error reporting/logging and runbooks for production services.
  - Acceptance: critical failures diagnosable without logging secrets/unnecessary personal data.
  - Verification: simulated failure and runbook walkthrough.
- [ ] **T24 — Preview/browser verification**: Connect Vercel to GitHub after authorization; deploy preview; exercise critical flows.
  - Acceptance: preview current and critical flows work in real browser.
  - Verification: deployment logs and browser smoke evidence.
- [ ] **T25 — Release candidate and approval**: Prepare changelog, limitations, rollback, support handoff, final review.
  - Acceptance: required tasks closed with evidence; explicit user approval for merge/deploy.
  - Verification: final Definition of Done review; do not merge/deploy without approval.

## Checkpoints
- [ ] **Checkpoint A — Foundation**: T01–T03 complete and CI passes.
- [ ] **Checkpoint B — Core tools**: T04–T07 complete with tests/browser verification.
- [ ] **Checkpoint C — Paid feature candidates**: T08–T13 complete and safety-reviewed.
- [ ] **Checkpoint D — Paid access**: T14–T17 complete after provider/business approvals.
- [ ] **Checkpoint E — Commerce**: T18–T20 complete after supplier/payment approvals.
- [ ] **Checkpoint F — Release candidate**: T21–T25 complete and release approval received.
