# BZaudio capability map

This map decomposes the approved BZaudio product into independently testable modules. It is an implementation index, not a claim that every module exists today.

| Module ID | Responsibility | Depends on |
|---|---|---|
| foundation-quality | Reproducible installs, scripts, CI, baseline security/accessibility/performance checks | — |
| soundmatch | Guided intake, deterministic role plans, customization, comparison, save/export | foundation-quality |
| audio-toolbox | Tested audio calculations, unit handling, field workflows, explanations | foundation-quality |
| pa-designer | Venue/project model, schematic speaker/zone layout, scenarios, estimates, proposal export | foundation-quality, audio-toolbox |
| live-assistant | Mixer-aware guided troubleshooting, show setup, routing/mix education, checklists, show notes | foundation-quality, audio-toolbox |
| customer-identity | Secure accounts, sessions, ownership boundaries, account recovery | foundation-quality |
| project-storage | Account-backed project/show-note persistence, export, deletion, retention | customer-identity |
| paid-entitlements | Pro plan model, server-side authorization, billing webhooks, lifecycle and tests | customer-identity |
| catalog-commerce | Verified product data, compatibility evidence, pricing, supplier feeds, quoting and checkout | foundation-quality, customer-identity |
| operations-release | Observability, preview deployment, security review, release/rollback and support docs | release-bound modules |

## Build order
1. foundation-quality
2. soundmatch and audio-toolbox
3. pa-designer and live-assistant
4. customer-identity
5. project-storage and paid-entitlements
6. catalog-commerce
7. operations-release and production launch

## Boundary rules
- PA Designer begins as schematic planning. It must not claim acoustic simulation, validated SPL/coverage, array optimization, rigging, electrical, or code-compliance approval without validated methods and qualified review.
- Live Assistant begins as user-guided workflows. It must not claim to hear, monitor, or control a console without an authorized supported integration.
- Pro features require server-side entitlement checks after real authentication and verified billing exist.
- Product compatibility, availability, prices, and supplier relationships must come from verified sources.
- Browser-local saves must be labeled local-only; account sync is not implied.
- Production release, merging to main, making the repository public, and connecting external services remain separate approval/dependency gates.
