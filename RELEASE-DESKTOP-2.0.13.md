# Desktop 2.0.13 website update — prepared 2026-10-04

Owner authorized desktop release before mobile sync. Retains the published clay
website design, prices and sales state; updates Mac and Windows labels/downloads
and clarifies that an existing sync connection survives this branding update.
Mac Store 2.0.12 status and known sync feedback/close limitations stay distinct.

Local Astro build, check-release and browser-release checks pass at 1280/390px:
download/purchase disclosures, support, retired demo, no overflow/JS errors.

Windows 2.0.13 Beta installer is published at immutable GitHub/R2 paths and
anonymous downloads match the tested SHA-256
72b9e214c6f18ac68fb0eda33f533915e3c479a3891ae9eab5014a9ce80b7a85.
Mac universal installer accepted by Apple notarization, stapled and Gatekeeper accepted; eleven mounted packaged checks pass. Anonymous R2 and resumed anonymous GitHub downloads match SHA256 46fc1115520becd9204255bb38ef9439dac641310f093cf83bc67550a399eabd.
Published: website source ab635a9, Pages Production deployment fae0b43d-8e97-4dab-825b-ac377b38ce52 (branch main), https://fae0b43d.billiong-landing.pages.dev. Live homepage, support page and actual Mac/Windows download targets verified through the browser. Screenshot retained in the app release review directory.

Production account 7b6e1c302155d21e6cc1d807cc01f010, Pages billiong-landing,
branch main; R2 billiong-releases. CLI account/project/bucket verified.
Existing website base commit 9dd5490; retain old installer artifacts for rollback.
