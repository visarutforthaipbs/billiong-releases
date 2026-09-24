# Website handoff — BillNgai Mac Direct 2.0.4

Date: 2026-09-24. **Released and production verified.**
Publishing checkout: `/Users/lighthouse-control/BillNgai-site-publish-2.0.3`.
Website repository: `visarutforthaipbs/billiong-releases`.
Production: https://billiong-landing.pages.dev/.
Read historical [RELEASE-2.0.3.md](RELEASE-2.0.3.md) for the previous successful
release, its immutable artifact identity and rollback references. Its notarization
or test results do not establish verification of 2.0.4.

## Authority and publication gate

The manager completed publication after the candidate checkpoint below. See the
final publication record at the end; earlier pending wording is historical.

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

- App source/tag: `8c1dfcfbb1891979706d63558c90075d50be9722` / `v2.0.4`.
  https://github.com/visarutforthaipbs/local-bill-apps/releases/tag/v2.0.4.
- Final `BillNgai-2.0.4-universal.dmg`: 223,517,554 bytes, SHA-256
  `64a4f36bd80c1404d651b298df2c3795249392833cf2ca63de5a9d8e4fe43611`.
  Apple submission `5843027f-7749-4f2a-a16c-1bbaf37e4778` Accepted, issues null;
  stapled, signature and Gatekeeper accepted. Both exact packaged native suites
  pass on Apple Silicon; 165 automated source tests pass. No Intel hardware claim.
- R2 and GitHub public installers were downloaded anonymously on field and passed
  byte comparison and SHA-256 against the final original. Public checksum file
  `BillNgai-2.0.4-SHA256SUMS.txt` is available beside both. Prior objects unchanged.
- Website content commit: `9911602ddc16d3ffccdce2cda4b5261836049ed4`, pushed to
  `visarutforthaipbs/billiong-releases` main. No automatic deployment appeared;
  used the documented Wrangler 4.136.2 fallback with that clean commit/tested dist.
- Production Pages deployment: `e964578d-d928-48c0-b3e0-7f13e6a49e17`, success,
  https://e964578d.billiong-landing.pages.dev; production remains
  https://billiong-landing.pages.dev/.
- Live landing/support/retired-demo HTML match tested build bytes. Manager viewed
  the live download dialog and verified Mac 2.0.4 primary and GitHub fallback URLs,
  upgrade/legacy/evidence restrictions and unchanged Windows 2.0.1 Beta label.
- Prior production: `8d125ac5-1c5f-43ba-be70-f5f47e4409f9`, content `2af067c`;
  rollback restores 2.0.3 limitations, not a safe customer-data downgrade.
- Full app release evidence lives in its `RELEASE-2.0.4.md`. No installed working
  app/customer records were changed. Professional review, Windows/MAS and broader
  manual/security verification remain separate; no legal certification claimed.
