# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for Cristian Marino, founder of BoostBrands (boostbrands.cl). Two static pages:

- `index.html`: main page aimed at winning SME clients, ordered as the client's story: hero, company band, "¿Te suena?" with six client situations in Cristian's words, each with how he tackles it, and one booking button, about + stats, services and how we start, projects accordion, track record as a scroll timeline (`#path`: newest to oldest, the line draws as you scroll and the entry at mid-screen is highlighted; edit entries in the markup, both languages), education, contact. On phones a booking bar (`#sticky-cta`) shows between the hero buttons and the contact section.
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
- Each project has a `pyme`/`pyme_en` line ("Para tu PYME") translating the case into what it means for an SME client. The section sits on a navy band (`#proyectos.on-navy`).
- Each project's visual is an illustrative sketch built by small helpers (`flow`, `store`, `bars`, `wave`) and labelled "Ilustrativo". If `fotos/proyecto-NN.jpg` exists (NN = 01…07, the project's position), the real photo replaces the sketch automatically. A project with a `videos` list (YouTube id, optional playlist id, `label`/`label_en`) shows those videos instead: a thumbnail that becomes a youtube-nocookie player on click.

## cv.html specifics

- `ROLES` drives both the career Gantt chart (`start`/`end` as decimal years, `lane` picks the row) and the detail panel shown when a bar is clicked.
- `WINS` entries with `top: true` lead the achievements grid as large navy tiles while the "Todos" filter is active. `GROUPS` keeps tools (Shopify, HubSpot, Salesforce) in their own "Herramientas" group, separate from brands and partners. Each `GROUPS` item is `{ n, rel, rel_en, logo?, bg?, mono }`: `logo` points to a file in `logos/` shown on a white tile (or on `bg`, for logos drawn on a brand color such as Mademsa); without one (or if it fails to load) the tile shows the `mono` initials on navy. Accenture, 3M, Shopify, HubSpot and Salesforce come from Simple Icons and gilbarbara/logos (both CC0); the rest are files Cristian supplied, trimmed (wide logos with unreadable text keep only their symbol). Add others as files in `logos/` and set `logo`.
- The hero uses `fotos/mit-sloan.jpg` in a landscape frame so it differs from the home page portrait.
- The gallery only shows photos that actually load; the `#fotos` section and its nav link stay hidden until at least one `PHOTOS` entry exists in `fotos/`.

## Running locally

Open either HTML file directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Conventions

- Palette is orange + navy, defined as CSS custom properties on `:root` and redefined for dark mode both under `@media (prefers-color-scheme: dark)` (guarded by `:root:not([data-theme="light"])`) and under `:root[data-theme="dark"]`; keep the two dark blocks in sync and keep both pages' tokens aligned.
- Section titles (`h2`) put one word in `<em>`, rendered in Instrument Serif italic in the accent color on both pages. Each figure should appear once per page; avoid repeating the same number in hero, badges and stats.
- Contrast rules: `--accent` (#E8551C) is for fills and large numbers only; small accent text uses `--accent-text` (#C2410C, 4.75:1); text on orange buttons uses `--accent-ink` (dark), never white.
- Layout must work at phone width (≈390px) with no horizontal overflow; check desktop and mobile after visual changes. Tap targets are at least 44px.
- Site copy comes from Cristian's CV. Keep figures consistent with it and never invent achievements, numbers, clients or testimonials.
