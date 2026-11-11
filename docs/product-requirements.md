# BZaudio product requirements

## Product goal
Create a clear starting point for customers who need professional audio equipment or help planning, upgrading, and installing a sound system.

## Primary audiences
1. First-time buyers and volunteers who need plain-language guidance.
2. Venue operators and organizations planning a new or upgraded system.
3. Audio professionals who want a sourcing and planning partner.

## Current website scope
- Responsive homepage explaining the BZaudio offer.
- Equipment category discovery without fabricated listings.
- Installation and service overview.
- Contact brief builder that prepares a copyable inquiry locally.
- SoundMatch wizard that captures project context and creates preliminary Essential, Recommended, and Professional role-based plans.

## SoundMatch intake
Capture:
- Venue/application type.
- Indoor, outdoor, or mixed use.
- Typical audience size.
- Room dimensions when known.
- Budget range or unknown budget.
- Primary priority.
- Existing equipment.
- Whether installation help is requested.

The user may leave optional information blank. Missing information should be visible in the generated brief and flagged for human review.

## SoundMatch output
- Three clearly differentiated planning paths.
- Equipment roles, not unverified product SKUs.
- Plain-language reason for each role.
- Tradeoffs and review status.
- Copyable project brief.
- Clear warning that product choice, coverage, SPL, compatibility, rigging, electrical, and commissioning require verification.

## Non-goals for this MVP
- Live supplier inventory, product prices, checkout, or payments.
- Manufacturer or distributor partnership claims.
- Customer accounts, saved system profiles, or persistent project storage.
- Automated acoustic simulation or final engineering approval.
- Sending or storing contact form submissions.

## Acceptance criteria
- Core pages are responsive and navigable.
- Forms have labels and keyboard-visible focus.
- SoundMatch validates audience, budget, dimensions, and existing-equipment limits.
- SoundMatch never marks an unverified system as approved.
- Contact and brief actions accurately state that data is only copied locally.
- CI runs lint, typecheck, tests, and a production build.


## Advanced product roadmap

### BZaudio PA Designer — paid plan
PA Designer is a deeper system-layout workspace, distinct from SoundMatch:
- Guided project setup for venue geometry, audience areas, use cases, constraints, and known acoustic information.
- Configurable system zones and component roles: mains, subwoofers, front fills, delay fills, monitors, distributed speakers, processing, networking, and infrastructure.
- Editable placement plans with speaker orientation, mounting method, aiming notes, coverage-area annotations, and distance measurements.
- Multiple design scenarios with side-by-side equipment-role, quantity, budget-allocation, and tradeoff comparisons.
- Design assumptions, missing-data checklist, revision history, saved projects, and exportable client proposal / technician handoff.
- Clear separation between user-entered data, calculated estimates, manufacturer specifications, and items awaiting technical verification.

The first release may provide schematic placement and planning estimates; it must not present a drawing as an acoustic prediction. No validated SPL map, directivity prediction, array prediction, delay alignment, rigging plan, electrical plan, or life-safety design is claimed without appropriate validated data and qualified review.

### BZaudio Live Assistant — paid plan
Live Assistant is an interactive show-support and troubleshooting workspace:
- Select mixer family/model, firmware when known, PA configuration, stage layout, and the symptom or task.
- Guided troubleshooting trees for no signal, routing errors, gain staging, feedback, noise, distortion, monitor problems, and system setup.
- Context-aware mixing guidance for HPF, EQ, compression, gates/expanders, sends, groups, matrices, FX, and scene/show organization.
- Signal-flow diagrams, channel/bus checklists, line-check and soundcheck workflows, and stage/patch documentation.
- Saved show notes, equipment profiles, troubleshooting history, and reusable checklists when account storage is available.
- Explain each recommendation, expected result, risk, and rollback step; distinguish general guidance from exact model-specific instructions.

The initial release is user-guided; it does not claim to listen to a console, control a mixer, detect feedback from a live feed, or change console settings unless a supported integration is explicitly implemented and authorized.

### Paid access and entitlement requirements
- PA Designer and Live Assistant are Pro-plan features; public marketing must identify them as paid-plan features.
- Enforce entitlements on trusted server-side routes/actions, not only by hiding client-side controls.
- Provide clear upgrade/locked states without pretending a subscription exists.
- Do not enable paid access or collect payment until authentication, a billing provider, webhook verification, subscription lifecycle handling, and entitlement tests are implemented.
- Until billing is integrated, development/demo access must be clearly labeled and must not be represented as a live paid subscription.

### Advanced quality bar
- Responsive desktop and mobile layouts, keyboard navigation, accessible labels, clear focus states, and meaningful empty/loading/error states.
- Reusable typed domain models and deterministic calculation/rules modules separated from presentation.
- Input validation, units and assumptions shown beside calculations, safe numeric bounds, and tests for edge cases.
- Save/restore and export flows must accurately disclose where data is stored and whether it is local-only or account-backed.
- Every technical recommendation should expose its rationale, confidence/verification state, assumptions, and next action.
- Avoid fabricated product data, pricing, compatibility, supplier relationships, or engineering certification.
