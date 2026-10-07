# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for Cristian Marino, founder of BoostBrands (boostbrands.cl): `index.html` (English landing page) and `cv.html` (interactive CV in Spanish).

## Structure

- `index.html` is the entire site: markup, CSS (in a `<style>` block) and vanilla JS (in a `<script>` at the end of `<body>`). There is no build step, package manager, framework or test suite.
- The script drives the interactive parts: theme toggle (sets `data-theme` on `<html>`, saved in localStorage), mobile menu, scroll progress bar, active nav link via IntersectionObserver, rotating hero word, count-up stats (`data-count` / `data-decimals` / `data-suffix`; final values stay in the HTML), experience filters (`data-tags` on each timeline `<li>`, matched by `data-filter` buttons), profile card tilt, and copy-email toast. Animations are skipped under `prefers-reduced-motion`.
- Experience entries are native `<details>` elements, so they expand without JS.
- Fonts (Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono) load from Google Fonts.

## cv.html

- Self-contained like `index.html`. All CV content lives in JS data arrays at the top of its `<script>` (`ROLES`, `WINS`, `GROUPS`, `COUNTRIES`, `EDU`, `TICKER`, `PHOTOS`); the page renders from them. Edit content there, not in the markup.
- `ROLES` drives both the career Gantt chart (`start`/`end` as decimal years, `lane` picks the row) and the detail panel shown when a bar is clicked.
- Photos live in `fotos/`. The hero portrait is `fotos/retrato.jpg` (also used in the profile card on `index.html`); gallery slots are listed in `PHOTOS`. A missing file shows a striped "Foto pendiente" placeholder, so adding a photo only needs the file at the expected path (or a new `PHOTOS` entry).

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Conventions

- Colors are CSS custom properties on `:root`, redefined for dark mode both under `@media (prefers-color-scheme: dark)` (guarded by `:root:not([data-theme="light"])`) and under `:root[data-theme="dark"]`; keep the two dark blocks in sync. Add new colors as tokens there rather than hard-coding them, so dark mode keeps working.
- The layout must work at phone width (the `@media (max-width: 760px)` block). Check both desktop and mobile widths after visual changes.
- Site copy (stats, experience, education) comes from Cristian's CV. Keep figures consistent with it and don't invent achievements or numbers.
