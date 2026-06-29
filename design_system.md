# Billiong Design System & Corporate Identity (CI)

This document details the design system, styling guidelines, and utility classes used to construct the **Billiong** landing page and simulated application workspace.

---

## 1. Color System

All colors are declared under the `@theme` block in [global.css](file:///Users/visarutsankham/Desktop/promote-billiong/src/styles/global.css). Use semantic class names instead of hardcoded hex values.

| Semantic Token | TailWind Class | Hex Code | Ideal Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `bg-primary` / `text-primary` | `#1f5d43` | Main brand elements, primary CTA buttons, active tabs. |
| **Primary Hover** | `hover:bg-primary-hover` | `#133d2c` | Interactive hover states for primary items. |
| **Secondary** | `bg-secondary` / `text-secondary` | `#caa45a` | Gold accents, highlight tags, warning borders, progress bars. |
| **Accent Background** | `bg-accent-bg` | `#fcfbf7` | White-beige canvas for cards, dashboards, and tables. |
| **Body Background** | (Standard body color) | `#ece7dc` | Base page color, warm beige background. |
| **Text Dark** | `text-text-dark` | `#26221a` | High-contrast main headings and body text. |
| **Text Muted** | `text-text-muted` | `#5f594c` | Descriptions, helper texts, table headers. |
| **Border Custom** | `border-border-custom` | `#dcd5c5` | Structural borders, outlines, dividers. |

---

## 2. Typography

We pair clean Thai/Latin sans-serif fonts for interface readability with an elegant serif font for figures and headlines.

* **Sans-Serif (Standard UI & Body):** `"IBM Plex Sans Thai"`, `"IBM Plex Sans"`, system-ui, sans-serif.
  * *TailWind Class:* Default `font-sans`.
* **Serif / Numerals (Display & Metrics):** `"Fraunces"`, Georgia, serif.
  * *TailWind Class:* `.font-display`. Used for currency figures, progress percentage headers, and large numeric stats.

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
  <span class="font-display text-2xl font-bold text-text-dark block mt-1">฿50,000.00</span>
</div>
```

---

## 5. Micro-Animations

* `.animate-pulse-glow` — Slow pulsing glow outline used for scanner indicators and action elements.
* `.active:scale-98` — Subtle shrink effect upon clicking buttons to provide immediate tactile feedback.
