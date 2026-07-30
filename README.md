# Plumstead Diner — Website

Multi-page static website for **Plumstead Diner**, a locally owned breakfast &
lunch diner at 5978 Easton Road, Pipersville, PA 18947.

## Live site

**https://aririkushimeikito.github.io/PlumsteadDiner/**

Deployment is automated by `.github/workflows/deploy-pages.yml` — every push to
`main` or `claude/site-design-repo-setup-9w4hsg` redeploys via GitHub Pages.
(Pages must be enabled once in Settings → Pages → Source: GitHub Actions.)

## Pages

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Hero, favorites, hours, FAQs |
| Menu | `menu.html` | Full menu typed from the print menu + skillet insert |
| Drinks & Desserts | `drinks.html` | Espresso bar, shakes, smoothies (from half-page insert) |
| About Us | `about.html` | Owner-provided About verbiage + family welcome |
| Visit Us | `contact.html` | Address, hours, Google Map, socials |

## Features

- **Open/Closed indicator** — live status chip (header, footer, Visit page)
  computed in Eastern Time from the daily 7:00 AM – 3:00 PM schedule (`js/site.js`).
- **Instant scroll-to-top** — clicking the logo jumps straight to the top
  (no slow smooth-scroll crawl).
- **SEO** — unique title/meta description per page, keyword-focused H1/H2s,
  Restaurant + Menu + FAQPage JSON-LD structured data, Open Graph tags,
  `sitemap.xml`, `robots.txt`, canonical URLs.
- **Real brand assets** — the logo was extracted from the print menu PDF
  (`img/plumstead-logo.png`).

## Placeholder food images

`img/food/*.svg` are temporary flat-style illustrations generated from the menu
descriptions. When real photography arrives, replace these files (keep the
same filenames) or swap the `<img>` tags.

## When the site moves to plumsteaddiner.com

Search-and-replace `https://aririkushimeikito.github.io/PlumsteadDiner/` with
the production URL in every HTML file (canonical/OG/JSON-LD), `sitemap.xml`
and `robots.txt`.
