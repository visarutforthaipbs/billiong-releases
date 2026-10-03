# BillNgai website design system

The owner approved the website clay direction on 2026-10-03. Read [BRAND.md](BRAND.md). The website uses eleven distinct Meshy illustrations created for the promo site, plus the app’s matching clay brand mark, optimized as local WebP files in `public/assets/brand/clay/`. Asset provenance is recorded there.

Warm cream canvas, white artwork panels, orange actions, charcoal text. Gentle isometric lighting belongs to the artwork; page surfaces stay simple. Use 20px cards, 24px dialogs, pill actions, readable secondary text and modest shadows. Inter and LINE Seed Sans TH remain self-hosted. Tokens and reusable classes live in `src/styles/global.css`.

Use the folded-paper b vector for navigation and favicon, and the matching clay version for prominent brand artwork. Large artwork has explicit dimensions; below-fold assets load lazily. Decorative images have empty alt text; meaningful images have concise Thai descriptions. The owner requested restrained animation on 2026-10-03: allow a gentle hero drift only while visible, finite scroll entrances, and small hover/focus responses. Content must remain visible without JavaScript; reduced motion disables these effects. No perpetual spin/pulse, old doodle artwork, external asset requests, fake app screenshots or new runtime dependencies. Focus indicators and reduced-motion support are required.

Product remains 2.0.12. Local is free; Pro is THB599 Early Bird and adds Google Drive sync plus a separate Mac AI module. Pro sync drafts work offline; document issuance needs internet. Keep non-VAT/full-THB receipt restrictions, backup and attachment disclosures visible. Download and purchase dialogs retain their working destinations and public prices.

Download dialog: lead with the clay brand mark and large Mac/Windows download actions. Keep a short compatibility, receipt-scope and backup summary visible. Full release notes, installation steps and GitHub fallback links live in a collapsed native disclosure below the actions; expanding it must not push the primary download controls out of view.
