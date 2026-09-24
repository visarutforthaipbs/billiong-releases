# Website handoff — BillNgai Mac Direct 2.0.4

Date: 2026-09-24. **Unpublished website candidate; artifact gates pending.**
Publishing checkout: `/Users/lighthouse-control/BillNgai-site-publish-2.0.3`.
Website repository: `visarutforthaipbs/billiong-releases`.
Production: https://billiong-landing.pages.dev/.
Read historical [RELEASE-2.0.3.md](RELEASE-2.0.3.md) for the previous successful
release, its immutable artifact identity and rollback references. Its notarization
or test results do not establish verification of 2.0.4.

## Authority and publication gate

The owner explicitly requested completion of the 2.0.4 release using `ssh field`.
The website editing teammate is restricted to local preparation and checks. The
manager owns review, final artifact verification, commits, uploads and deployment.
No installer, release tag or website was published by this teammate.

The source now points at the intended **2.0.4** R2 and GitHub objects. Do not deploy
until the manager verifies the signed universal app, Apple notarization Accepted,
staple and Gatekeeper checks, exact packaged-source comparison and packaged smoke,
then uploads the final DMG/checksum and anonymously verifies both public downloads.
Signing/notarization wording is release-target copy, not evidence that these gates
have passed. Record final artifact hashes, source commits and deployment ID below
only after verification. Do not rename/relabel an old installer as 2.0.4.

## Claim alignment

- All current Mac labels, metadata/schema and intended download URLs use 2.0.4.
  Windows remains 2.0.1 Beta; Mac App Store remains pending. Neither receives an
  implied parity, approval or verification claim.
  Added a visible GitHub fallback in the download dialog; previously its configured
  URL existed only in source and was not rendered into the R2-selected page.
- Historical records can be read without cancellation. Unknown original facts stay
  unknown; records without issuance snapshots are not reprinted/shared as originals.
  Archive controls visibility; reasoned void is separate and does not prove refund
  or completion of statutory correction.
- Eligible old unpaid invoices may receive separately recorded reviewed payment
  facts backed by evidence and explicit confirmations. Scope remains non-VAT,
  full-payment, THB. A supported new ordinary receipt is a separate explicit action
  dated today, not a reconstructed/backdated original. Original records are unchanged.
- JSON database backup does not contain attached binary evidence. Export and retain
  the separate evidence bundle too, outside the original disk; keep original PDFs.
- VAT/tax-invoice, partial/deposit/refund/foreign-currency receipt restrictions,
  transaction-specific WHT review, paused cloud/e-Tax/PIT-payable scope and Pro
  restrictions remain. No practitioner approval or legal certification is claimed.
- Retired interactive demo remains disabled. Prices/payment details are unchanged.

Inputs reviewed: website AGENTS.md, BRAND.md, design_system.md, README.md,
RELEASE-2.0.3.md; app PRD-2.0.4.md and VERIFICATION-2.0.4.md; official
[Astro component documentation](https://docs.astro.build/en/basics/astro-components/).
Existing components, typography and layout classes reused; no visual redesign.

## Checks

Run `npm run build`, `node scripts/check-release.cjs`, and
`NODE_PATH=/Users/lighthouse-control/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules node scripts/browser-release-smoke.cjs`.
Generated assertions cover exact versioned primary/fallback URLs, no stale current
2.0.3 copy, new recovery/backup limitations, unchanged platform boundaries, schema,
purchase isolation on support and the non-executable retired demo. Browser smoke
uses ephemeral Chrome contexts and local static output at 1280px and 390px; it does
not verify public artifacts or mutate a real app profile.

Results recorded by website teammate, 2026-09-24:

- Initial build could not find Astro because local dependencies were absent.
  `npm ci --ignore-scripts` succeeded; package/lockfile remain unchanged.
- `npm run build`: passed, Astro 7.0.3 static build, two pages.
- `node scripts/check-release.cjs`: passed after the visible fallback was added.
  The initial new fallback assertion exposed the source-only URL described above.
- `git diff --check`: passed.
- Browser smoke: passed at 1280px and 390px with zero page errors or horizontal
  overflow. Local server required approved unsandboxed execution. Reran after the
  final fallback/link changes; download and Pro dialogs, support and retired demo
  passed. Expanded download disclosure can scroll to its final qualifications
  while both primary download buttons and the GitHub fallback remain visible.
- Visually inspected final desktop download dialog and mobile bottom-of-disclosure
  screenshots (`test-artifacts/download-1280.png`, `download-bottom-390.png`). Thai
  copy is legible and controls do not overlap. Artifacts are local, Git-ignored.

Manager must separately review and verify the live deployment after artifact
publication. Existing build dependency advisories are documented in RELEASE-2.0.3.md;
dependencies were not changed by this content-only candidate.

## Final publication record

Pending manager completion: reviewed source commit; exact DMG SHA-256 and byte
count; notarization ID/status; R2/GitHub public byte verification; website commit;
Pages deployment ID; live HTML/link verification. Do not replace this pending
record with the 2.0.3 values.
