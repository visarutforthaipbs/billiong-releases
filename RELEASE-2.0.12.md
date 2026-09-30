# BillNgai 2.0.12 — website release record

Deployed 2026-09-30. Mac Direct 2.0.12 (Google Drive sync for Pro); Pro back on sale (one-time ฿599 Early Bird, sync + AI add-on).

- Content commit `abc671a0996c9b60f3fc0fd871d2f9662d86be6d` pushed to `billiong-releases` main. No automatic Pages
  deployment appeared (same as 2.0.3/2.0.4), so the tested `dist` was deployed with Wrangler 4.136.2 to project
  `billiong-landing`: production deployment `95b5bea2-5405-4799-9cc3-fd722002bbf1`.
- Live `/`, `/support/`, `/privacy` and `/demo-app` match the built output byte-for-byte. Download links point to
  R2 `BillNgai-2.0.12-universal.dmg` and GitHub `v2.0.12`; both public downloads verified SHA-256
  `6d43fdfbbfbf4fd8442577f57bc70acc5ee1229b29330696de5793b965aedc60`.
- `scripts/check-release.cjs` passed: version from product config, Pro offer present, no paused-sync copy, privacy page linked.
- Rollback: redeploy previous production deployment `e964578d-d928-48c0-b3e0-7f13e6a49e17` (2.0.4 page). The 2.0.4
  installer remains on R2 and GitHub.
- Windows stays 2.0.1 Beta, labelled as an older build. The AI add-on installer is still unsigned (see app handoff).
