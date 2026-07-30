# Plumstead Diner — Website

Multi-page static restaurant website for **Plumstead Diner**, adapted from the
DigitalOneWeb restaurant template (`scratchkitchenbygallosv2`).

## Live site

Once GitHub Pages is enabled, the site is served at:

**https://aririkushimeikito.github.io/PlumsteadDiner/**

Deployment is automated by `.github/workflows/deploy-pages.yml` — every push to
`main` or `claude/site-design-repo-setup-9w4hsg` redeploys the site.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Menu | `menu.html` |
| Drinks | `drinks.html` |
| Online ordering (demo) | `order.html` |
| Reservations | `reserve.html` |
| Private events | `private-events.html` |
| Catering | `catering.html` |
| Gift cards | `gift-cards.html` |
| Rewards | `rewards.html` |
| Gallery | `gallery.html` |
| About | `about.html` |
| Visit / hours & location | `visit.html` |
| Careers | `careers.html` |

## Placeholder content to replace

The site currently carries **template content** that still needs real
Plumstead Diner information:

- **Logos** (`brand/logo-scratch.png`, `assets/business-logo.png`, `icon.png`,
  `apple-icon.png`) are generated text placeholders — swap in the real logo
  files (keep the same filenames so nothing breaks).
- **Menu items and prices** (in the HTML pages and `order-system.js`) are from
  the template.
- **Address, phone, hours, and map links** are from the template restaurant.
- **Online ordering / reservation buttons** still point to the template
  restaurant's Toast account (`order.toasttab.com/...`, `tables.toasttab.com/...`)
  — replace these URLs with the diner's own ordering/reservation links.
- **Photos** in `img/` and `uploads/` are template photography.
