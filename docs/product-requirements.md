# BZaudio Product Requirements (MVP)

## 1. Overview

Build a responsive web platform for a multi-brand audio equipment retailer and installation company. The first milestone includes the public website, product catalog foundation, SoundMatch guided system builder, and installation/quote inquiry flows.

## 2. Goals

- Explain what BZaudio sells and which services it provides.
- Let customers browse products and manufacturer brands.
- Guide customers through a short system-needs questionnaire.
- Generate three explainable proposed equipment packages.
- Capture quote and installation requests.
- Provide an admin foundation for maintaining catalog and recommendation data.

## 3. Non-goals for the first release

- Manufacturing audio equipment.
- Full automated supplier purchasing or dropshipping integrations.
- Automatic live inventory synchronization.
- Automated acoustic simulation or room prediction.
- Direct control of mixers, DSPs, amplifiers, or other hardware.
- Complex CRM, ERP, or warehouse management.
- Guaranteed final system design without qualified review.

## 4. User groups

- Public visitor / prospective customer.
- Customer who saves a build or submits an inquiry.
- Administrator who manages products, brands, rules, and inquiries.

## 5. Core user stories

### Store
- As a visitor, I can browse products by category and brand.
- As a visitor, I can view product details and key specifications.
- As an administrator, I can add, edit, publish, and archive catalog items.
- As a visitor, I can see clear price and availability status rather than misleading assumptions.

### SoundMatch
- As a visitor, I can select a venue or application type.
- I can enter room dimensions or choose an unknown/unsure option.
- I can enter audience size, budget, priorities, and existing equipment.
- I can receive Essential, Recommended, and Professional proposed packages.
- I can see why each product is included and what assumptions remain.
- I can request a quote or installation consultation from a saved build.

### Installation and inquiries
- As a visitor, I can describe my project and request a consultation or quote.
- As an administrator, I can review and update inquiry status.

## 6. MVP screens

- Home
- Shop / category listing
- Product detail
- Brand listing
- SoundMatch questionnaire
- SoundMatch results
- Installation services
- Quote / contact form
- Customer account (only if needed for saved builds in the first milestone)
- Admin catalog and inquiry views

## 7. Recommendation output

Each proposed package should contain:
- Package name and intended trade-off.
- Product list with quantities.
- Price estimate only when current, verified prices are available.
- Compatibility notes and required accessories.
- Explanation of why each product was selected.
- Explicit assumptions, unknowns, and professional-review flags.

## 8. Product data requirements

Store manufacturer, model, category, product type (powered/passive where applicable), key verified specifications, connection information, price source and timestamp, availability source and timestamp, product page, and active status. Preserve source attribution and distinguish verified facts from manually entered notes.

## 9. Success measures

- Visitors can complete SoundMatch without assistance.
- Recommendations have explainable reasons and no known rule violations.
- Quote submissions contain enough information for a human follow-up.
- Administrators can maintain catalog and inquiry data.
- Product pricing and availability are not represented as live unless connected to a reliable source.

## 10. Safety and trust

Speaker/amplifier matching must account for impedance, power ratings, channel configuration, and manufacturer guidance where those facts are available. Rigging, mains power, electrical code, life-safety paging, and final acoustic coverage require qualified review. If required data is missing, SoundMatch must flag the item for review rather than invent a match.
