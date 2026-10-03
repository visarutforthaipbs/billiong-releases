# บิลง่าย (BillNgai) Marketing & Promotion Website

This repository hosts the marketing website for **บิลง่าย (BillNgai)**, a local-first billing application built for Thai freelancers. Current download channels are Mac 2.0.12 and Windows 2.0.12 x64 Beta. The owner requested a clay-art website refresh on 2026-10-03. It uses eleven distinct Meshy promo illustrations and the folded-paper b identity from BillNgai-development; see [BRAND.md](BRAND.md) and [design_system.md](design_system.md). Publication of the clay refresh is recorded in RELEASE-CLAY-2026-10-03.md. Windows/MAS are separate channels. See [RELEASE-2.0.12.md](RELEASE-2.0.12.md) for the earlier deployment record.

## 🚀 Project Architecture

Built with **Astro 7** and **Tailwind CSS v4**.

```text
/
├── public/
│   ├── demo-app.html  <-- Retired-demo notice; old simulator remains disabled
│   ├── logo.svg       <-- Brand logo
│   └── fonts/         <-- Self-hosted Inter & LINE Seed Sans TH fonts
├── src/
│   ├── components/    <-- Modular Astro UI sections (Hero, AppDemo, Features, etc.)
│   ├── layouts/       <-- Base HTML wrapper (handles SEO, AIEO JSON-LD schema)
│   ├── pages/
│   │   └── index.astro <-- Main landing page entrypoint
│   └── styles/
│       └── global.css <-- Theme tokens (Orange #FF6B00) and macOS window visuals
└── package.json
```

## 🧞 Dev Commands

All commands are run from the project root:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `http://localhost:4321` |
| `npm run build` | Builds static site to `./dist/` |
| `npm run preview` | Previews production build locally |

For more guidelines regarding brand assets and guidelines, see `design_system.md`.
