# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for Cristian Marino, founder of BoostBrands (boostbrands.cl). Two static pages:

- `index.html`: main page aimed at winning SME clients (hero, company band, stats, services, projects accordion, condensed track record, contact).
- `cv.html`: interactive CV aimed at executive/academic audiences (career timeline, achievements, network, gallery, education).

There is no build step, package manager, framework or test suite. Each page is self-contained HTML with its CSS in a `<style>` block and vanilla JS in a `<script>` at the end of `<body>`.

## Shared pieces

- `config.js` sets `window.SITE_CONFIG` (contact email, booking link, WhatsApp number). Both pages load it and fill every `[data-agenda]`, `[data-whatsapp]` and `[data-email]` element from it. Empty `calendarUrl` makes "Agenda" buttons fall back to a `mailto:`; empty `whatsapp` keeps WhatsApp buttons hidden.
- `fotos/retrato.jpg` is the portrait used in both heroes. `og.jpg` (1200×630) and `favicon.svg` are referenced from both `<head>`s.
- Language and theme preferences are shared through localStorage keys `lang` and `theme`.

## Languages (ES default, EN toggle)

- Static text is written twice as sibling elements with `data-l="es"` / `data-l="en"`; CSS hides the one not matching `html[lang]`. Add both versions whenever you add copy.
- In `cv.html`, dynamic content comes from JS data arrays (`ROLES`, `WINS`, `CATS`, `GROUPS`, `COUNTRIES`, `EDU`, `TICKER`, `ROLE_LINES`, `PHOTOS`). English values live in sibling fields with an `_en` suffix and are read through `T(obj, key)`; `setLang()` re-renders every section. Edit content in those arrays, not in the markup.
- Default language is the saved preference, else Spanish for Spanish-language browsers and English otherwise.

## index.html projects section

- "Cosas que he construido" is a horizontal accordion of `<details class="proj" name="proyectos">` rendered by `renderProjects()` from the `PROJECTS` array in the page script (same `_en` field convention as cv.html). One card is always open; below 1100px it becomes a vertical accordion.
- Each project's visual is an illustrative sketch built by small helpers (`flow`, `store`, `steps`, `video`, `bars`, `wave`) and labelled "Ilustrativo". If `fotos/proyecto-NN.jpg` exists (NN = 01…07, the project's position), the real photo replaces the sketch automatically.

## cv.html specifics

- `ROLES` drives both the career Gantt chart (`start`/`end` as decimal years, `lane` picks the row) and the detail panel shown when a bar is clicked.
- The gallery only shows photos that actually load; the `#fotos` section and its nav link stay hidden until at least one `PHOTOS` entry exists in `fotos/`.

## Running locally

Open either HTML file directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Conventions

- Palette is orange + navy, defined as CSS custom properties on `:root` and redefined for dark mode both under `@media (prefers-color-scheme: dark)` (guarded by `:root:not([data-theme="light"])`) and under `:root[data-theme="dark"]`; keep the two dark blocks in sync and keep both pages' tokens aligned.
- Contrast rules: `--accent` (#E8551C) is for fills and large numbers only; small accent text uses `--accent-text` (#C2410C, 4.75:1); text on orange buttons uses `--accent-ink` (dark), never white.
- Layout must work at phone width (≈390px) with no horizontal overflow; check desktop and mobile after visual changes. Tap targets are at least 44px.
- Site copy comes from Cristian's CV. Keep figures consistent with it and never invent achievements, numbers, clients or testimonials.
