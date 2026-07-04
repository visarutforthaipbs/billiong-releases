# BillNgai (บิลง่าย) Design System & Corporate Identity (CI)

This document details the design system, styling guidelines, and color tokens used for the **บิลง่าย (BillNgai)** landing page and simulated application workspace.

> [!IMPORTANT]
> The single source of truth for the brand identity is the master [BRAND.md](file:///Users/visarutsankham/Documents/Personal-Project/Billiong-App/BRAND.md) in the app repository. Any changes to document templates or UI designs must align with it.

---

## 1. Color System

All colors are declared under the `@theme` block in [global.css](file:///Users/visarutsankham/Documents/Personal-Project/promote-billiong/src/styles/global.css). Always use tailwind theme variables instead of hardcoded hex values.

| Semantic Token | TailWind Class | Hex Code | Ideal Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `bg-primary` / `text-primary` | `#FF6B00` | Main brand elements, primary CTA buttons, active tabs. |
| **Primary Hover** | `hover:bg-primary-hover` | `#E05E00` | Interactive hover states for primary items. |
| **Secondary** | `bg-secondary` / `text-secondary` | `#2D3436` | Charcoal accents, headers, sidebars, secondary actions. |
| **Accent Background** | `bg-accent-bg` | `#ffffff` | Clean white canvas for cards, dashboards, and tables. |
| **Body Background** | (Standard body color) | `#FFF9F3` | Warm cream background. |
| **Text Dark** | `text-text-dark` | `#2D3436` | High-contrast main headings and body text. |
| **Text Muted** | `text-text-muted` | `#645d54` | Descriptions, helper texts, table headers. |
| **Border Custom** | `border-border-custom` | `#e8dccb` | Structural borders, outlines, dividers. |

---

## 2. Typography

* **Sans-Serif (Standard UI & Body):** `"Inter"`, `"LINE Seed Sans TH"`, system-ui, sans-serif.
  * *TailWind Class:* Default `font-sans`.
* **Display / Numerals (Display & Metrics):** Uses the same stack at display weight (`font-sans`). Serif fonts have been removed in the v1.4.0 brand refresh.

---

## 3. Elevation & Borders

We follow a tactile, soft-layered interface structure mimicking macOS native windows.

* **Rounded Corners:**
  * `.rounded-2xl` (16px) — Used for main containers, simulated app window, and modal panels.
  * `.rounded-xl` (12px) — Used for internal cards, progress bars, tables, and buttons.
  * `.rounded-lg` (8px) — Used for QR code boxes, badges, and smaller tags.
* **Shadow Systems:**
  * `.mac-window-shadow` — Used for main simulated windows and checkout modals.
  * `.mac-popover-shadow` — Used for dropdowns, tooltips, and floaters.
* **Borders:**
  * All borders must use `border border-border-custom` for a consistent, low-contrast warm separation.

---

## 4. Brand Component Standards

### Buttons
```html
<!-- Primary Button -->
<button class="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-98">
  ดำเนินการต่อ
</button>

<!-- Secondary / Border Button -->
<button class="bg-transparent hover:bg-accent-bg border border-border-custom text-text-dark text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">
  ยกเลิก
</button>
```

### Dashboard Cards
```html
<!-- Stat Card -->
<div class="bg-accent-bg border border-border-custom rounded-2xl p-5 shadow-xs">
  <span class="text-xs text-text-muted">หัวข้อการเงิน</span>
  <span class="font-sans text-2xl font-bold text-text-dark block mt-1">฿50,000.00</span>
</div>
```

---

## 5. Micro-Animations

* `.animate-pulse-glow` — Slow pulsing glow outline used for scanner indicators and action elements.
* `.active:scale-98` — Subtle shrink effect upon clicking buttons to provide immediate tactile feedback.
