# BZaudio SoundMatch — Initial Rules and Guardrails

## Purpose

SoundMatch helps customers assemble a sensible preliminary equipment package from products sold by BZaudio. It is a guided product-selection assistant, not an acoustic simulator or an automated professional engineer.

## Inputs

- Application: church, live venue, DJ, school, meeting room, commercial audio, or other.
- Venue: indoor/outdoor and room dimensions when known.
- Audience: expected audience size or coverage zones.
- Budget: total target and currency.
- Priorities: speech clarity, music playback, live music, bass, portability, expandability.
- Existing equipment: brand/model and known specifications.
- Installation intent: customer install or request BZaudio installation.

Allow users to choose “I don't know” for technical details. Missing values must remain unknown, not be silently guessed.

## Package types

- **Essential:** practical lower-cost proposal that meets the known minimum requirements.
- **Recommended:** balanced proposal based on the customer's stated priorities.
- **Professional:** higher-capability proposal with justified headroom or expansion options.

Do not create three packages by arbitrarily changing prices. Each package must explain its trade-offs and pass the same minimum safety/compatibility checks.

## Initial compatibility checks

### Product completeness
- Confirm required system roles are covered: sources/microphones, mixing or signal management as appropriate, loudspeakers, amplification when passive speakers are selected, and necessary connectivity/accessories.
- Do not add a product unless its role in the proposed system is clear.

### Powered and passive speakers
- A powered speaker generally needs an appropriate line-level signal and suitable power access.
- A passive speaker requires a suitable amplifier or powered controller solution.
- Do not recommend an amplifier for a powered speaker unless the manufacturer explicitly requires an external one.

### Amplifier and passive speaker matching
- Verify nominal impedance and amplifier load capability for the intended channel wiring.
- Compare continuous/RMS power ratings using consistent manufacturer-defined ratings where possible.
- Account for channel count and the proposed speaker count per channel.
- If wiring, impedance, power handling, or manufacturer guidance is incomplete, return NEEDS_REVIEW rather than a pass.

### Mixer and input/output needs
- Estimate required inputs from microphones, playback devices, instruments, and other stated sources.
- Ensure required outputs exist for main speakers, subs, monitors, recording, or zones when requested.
- Do not claim a console is sufficient without verified I/O specifications.

### Accessories and connectivity
- Identify required signal and speaker cables, stands/mounts, power distribution, adapters, and protective accessories as applicable.
- Flag rigging hardware, mounting surfaces, electrical supply, and code requirements for qualified review.

## Rule outcomes

Every compatibility check returns one of:
- **PASS:** verified data supports the requirement.
- **FAIL:** verified data shows the combination does not meet the requirement.
- **NEEDS_REVIEW:** information is missing, ambiguous, or requires professional assessment.

A package with a FAIL must not be presented as compatible. A package with NEEDS_REVIEW must show the warning prominently and cannot be described as fully verified.

## Price and availability

- Only show a current price when BZaudio has a reliable, current source.
- Store price source and last-checked timestamp.
- Distinguish in-stock, supplier-confirmed, special-order, unavailable, and unknown states.
- Never promise dropship availability or delivery dates without supplier confirmation.

## Recommendation explanation

For every selected item, explain:
- What role it serves.
- Which customer requirement it addresses.
- Why it was chosen over a simpler or more expensive alternative.
- What assumptions or verification remain.

## Human review

Require human review for detailed room coverage, SPL targets, subwoofer array behavior, delay alignment, acoustic treatment, rigging, electrical work, life-safety paging, and any proposal with missing critical specifications.
