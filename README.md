# บิลง่าย (BillNgai) Marketing & Promotion Website

This repository hosts the marketing website for **บิลง่าย (BillNgai)**, a local-first billing application built for Thai freelancers. Read [RELEASE-2.0.3.md](RELEASE-2.0.3.md) before publishing: website claims and downloads must match the verified Mac Direct 2.0.3 artifact, not Windows/MAS.

## 🚀 Project Architecture

Built with **Astro 7** and **Tailwind CSS v4**.

```text
/
├── public/
│   ├── demo-app.html  <-- Retired-demo notice; old simulator disabled for 2.0.3
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
