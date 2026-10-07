# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal one-page website for Cristian Marino, founder of BoostBrands (boostbrands.cl).

## Structure

- `index.html` is the entire site: markup, CSS (in a `<style>` block) and a one-line script. There is no build step, package manager, framework or test suite.
- The only external dependency is the Inter font from Google Fonts.

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Conventions

- Colors are CSS custom properties on `:root`, redefined under `@media (prefers-color-scheme: dark)`. Add new colors as tokens there rather than hard-coding them, so dark mode keeps working.
- The layout must work at phone width (the `@media (max-width: 760px)` block). Check both desktop and mobile widths after visual changes.
- Content marked with `<!-- TODO -->` comments (about text, stats, contact email, LinkedIn URL) is placeholder copy. Don't present it as real until the owner provides the actual details.
