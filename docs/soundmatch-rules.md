# SoundMatch rules and safety boundaries

## Purpose
SoundMatch converts a short project intake into a preliminary equipment-role outline. It is a conversation starter, not an automated system design or product compatibility engine.

## Inputs
- Venue: church, live music, DJ, school/auditorium, commercial, or other.
- Environment: indoor, outdoor, or both.
- Audience: 1–100,000 for intake validation.
- Budget: optional, non-negative, capped at $10,000,000 for input validation.
- Priority: speech, balanced music, bass, portability, or expansion.
- Existing equipment notes: up to 500 characters.
- Room dimensions: optional, up to 120 characters.
- Installation assistance: yes/no.

## Planning behavior
- Every plan is returned as `NEEDS_REVIEW`.
- Essential focuses on core system roles.
- Recommended adds flexibility and additional low-frequency / monitoring considerations.
- Professional adds a role for system processing and commissioning.
- DJ or bass-priority projects include a low-frequency role even in Essential.
- Live, church, and school projects include stage-monitoring / zone-output considerations.
- Outdoor or mixed-use projects explicitly call for weather-appropriate deployment and site-specific coverage design.
- If installation help is requested, the plan includes installation and setup coordination.

## Validation
- Audience must be finite and between 1 and 100,000.
- Budget may be unknown; if supplied it must be finite and between $0 and $10,000,000.
- Dimensions are limited to 120 characters.
- Existing equipment notes are limited to 500 characters.

## Required human review
Do not calculate or claim exact loudspeaker quantities, coverage, SPL, subwoofer array behavior, delay alignment, amplifier loading, electrical capacity, rigging safety, code compliance, or life-safety paging from this intake alone.

Before recommending a purchasable system, verify:
1. Manufacturer specifications and current product availability.
2. Input/output counts, impedance, power, processing, and signal compatibility.
3. Room geometry, listening areas, ambient noise, and coverage targets.
4. Mounting, rigging, power, cable paths, access, and local code requirements.
5. Qualified design review, commissioning, and documentation as appropriate.

## Status meanings
- **PASS:** A rule has been positively verified from adequate evidence.
- **FAIL:** A verified constraint is not met.
- **NEEDS_REVIEW:** Information is missing or qualified assessment is required.

The current MVP deliberately returns only `NEEDS_REVIEW`; it has no verified manufacturer database or engineering approval workflow.
