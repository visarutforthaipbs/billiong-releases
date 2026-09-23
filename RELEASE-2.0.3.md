# Website handoff — BillNgai Mac Direct 2.0.3

Date: 2026-09-23. Working copy: `/Users/lighthouse-control/BillNgai-site-2.0.3`.
This copy is not itself a Git checkout. Its upstream website checkout is
`promote-billiong` on `field`, connected to `visarutforthaipbs/billiong-releases`.
Production: `https://billiong-landing.pages.dev/`.

## Manager checkpoint — 2026-09-23 20:40 Asia/Bangkok

Candidate copied to the real Git checkout
`/Users/lighthouse-control/BillNgai-site-publish-2.0.3`. Build and generated-page
assertions pass there; manager visually inspected the mobile download dialog and
desktop support layout. Cloudflare browser login and the existing R2 bucket are
verified. Publication is still blocked on field's signing-key access:
`errSecInternalComponent` during codesign, with keychain interaction unavailable
over SSH. Owner was asked to unlock the login keychain locally. No installer or
website was published. The signed/notarized wording remains unpublished target
copy, not a statement that verification has already passed.

Subsequent checkpoint: keychain unlock succeeded and the signed universal build
was restarted. No credential was saved in project files. Final review broadened
the historical-document warning to all issued document types and old unpaid
invoice/payment actions. Build/assertions were rerun successfully. Manager checked
the expanded download dialog in Chrome, including a 390px viewport and scrolling
to the lower disclosure with download controls still accessible; viewport reset.

## Authority and scope

The owner requested audit and release. This website change is AI-assisted claim
alignment, not accountant, lawyer, or government certification. Do not describe
the release as professionally certified. Manager owns final artifact verification,
commit, upload, deployment, public download checksum verification, and rollback.
This editing task did not publish, commit, or change prices/payment details.

## Changes

- `src/config/product.ts`: Mac version and versioned R2/GitHub fallback URLs are
  2.0.3; Windows remains 2.0.1 Beta. The GitHub binary fallback remains the app
  repository `local-bill-apps`; the website repository is `billiong-releases`.
- `src/components/ReleaseNotice.astro`: shared prominent restrictions on the
  landing page, download dialog, Pro purchase dialog, and support page.
- `Hero`, `Features`, `Plans`, `Faq`, `Security`, `PricingComparison`, `Footer`:
  removed full-tax/VAT/PIT-payable/automatic-3%-WHT/cloud-sync promises. Income
  classification is free. Pro does not reopen disabled features. Existing Pro
  customers and prospective sync buyers are told to contact support.
- `src/layouts/Layout.astro`: matching title, descriptions, keywords, JSON-LD,
  and claim-free social image. The old cover advertised VAT/PND90/94 and ฿59.
  It is no longer referenced; old static imagery may remain at historical URLs.
- `src/pages/index.astro`, `src/pages/support.astro`: platform statuses, upgrade
  warning, no safety-warning bypass advice, and no parity/approval claim for MAS.
- `src/components/AppDemo.astro`: replaced obsolete iframe/GIF with disclosure
  card. `public/demo-app.html` now serves a non-executable retired-demo notice,
  including for visitors with a saved direct link. No old localStorage is touched.
- `src/components/MacOpenGuide.astro`: replaced unused unsafe bypass animation
  with stop-and-contact-support guidance, avoiding later accidental reuse.
- `README.md`: links this handoff and documents retired demo.
- `scripts/check-release.cjs`: assertions against generated pages and schema.

## Exact advertised scope

Mac Direct 2.0.3 permits ordinary receipts only after issuer confirms non-VAT
status, full payment, and THB. It does not support tax invoices, VAT-registered
issuer receipts, foreign-currency receipts, partial receipts, deposits or refund
workflows. WHT requires transaction-specific review, never an automatic 3% rule.
PIT payable/refund estimates, cloud connect/sync/restore, and e-Tax are paused,
including Pro. Classification is free. This is application scope, not a statement
that every freelancer is legally ineligible to register for VAT.

Before upgrading, back up data and retain original PDFs. All historical issued
document types without an issuance snapshot are retained for review but cannot be
reprinted/shared or have their status changed, including marking old invoices paid
and generating linked receipts. Users with unpaid old invoices should contact
support before upgrading; do not fabricate historical evidence.
Windows 2.0.1 Beta and MAS are not represented as receiving these safeguards.

## Validation and release gates

- Read AGENTS.md, BRAND.md, design_system.md, README.md and official Astro
  component documentation before editing. Reused existing design classes/assets.
- Initial local dependency download failed with sandbox DNS; retried with approved
  network access. Build/test results are recorded below when completed.
- Run `npm ci --ignore-scripts`, `npm run build`, then
  `node scripts/check-release.cjs`.
- Before publishing: manager must verify the 2.0.3 signed/notarized/stapled DMG,
  publish the actual object first, confirm both advertised binary URLs and SHA256,
  and only then deploy this site's built output. Signing/notarization copy is
  release-target copy and must not be published before that gate passes.
- Check mobile/desktop layout, scrollable download/Pro dialogs, support page,
  retired demo URL, canonical URL, and live public object after deployment.
- Preserve 2.0.2 artifact and website rollback reference. Do not silently promise
  sync restoration dates, refunds, or new Pro entitlements.

## Results

- `npm ci --ignore-scripts`: passed after network approval; package and lockfile
  remain unchanged.
- `npm run build`: passed, two static pages generated with Astro 7.0.3.
- `node scripts/check-release.cjs`: passed for generated copy, JSON-LD, Mac URL,
  platform disclosures, support purchase isolation, and non-executable demo.
- `scripts/browser-release-smoke.cjs`: fresh ephemeral Chrome contexts on localhost;
  checks desktop/mobile page/dialog/support/demo and captures `test-artifacts/`.
  Run with Playwright resolvable through NODE_PATH when not installed locally.
  Passed at 1280px and 390px, no JavaScript page errors or horizontal overflow.
  Initial test selected the intentionally hidden desktop nav link on mobile;
  corrected the test to use the visible hero link and reran successfully.
  Visually inspected the 390px download-dialog screenshot: disclosure is readable,
  and Mac 2.0.3 / Windows 2.0.1 Beta buttons remain accessible.
- `npm audit --omit=dev --json`: eight existing advisories (one critical, six high,
  one moderate). Critical Astro AVIF optimizer advisory GHSA-26w7-cxv4-gfx2 affects
  Astro below 7.2.8. This site emits static files and uses no Astro image optimizer,
  SSR/astro-hono endpoint, user-supplied image, or user-controlled source files.
  No affected public runtime path was identified in this scoped review. Manager
  directed retaining the lockfile for this release and tracking a separate build
  dependency update. This is not a claim that the dependencies are vulnerability-free.
- No live deployment or external download verification has been performed by this
  website editing agent. Build outputs are release candidates until manager gates pass.
