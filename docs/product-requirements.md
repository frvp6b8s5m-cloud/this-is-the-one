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
