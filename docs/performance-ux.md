# OwnCryt — Fast Load & Intuitive UX

Implementation standard for a site people can open, browse, and act on without friction.

This sits beside [`prd.md`](./prd.md) and [`roadmap.md`](./roadmap.md). Premium fashion look is not enough. If the first paint is slow, a CTA is hard to tap, or browsing takes extra thought, the collection never gets validated.

**Audience default:** mobile, India, mid-range Android, 4G that often congests in the evening. Desktop must still feel editorial. Design and measure for the slower case first.

---

## Product goal

A visitor should be able to:

1. See the brand and hero within about **2.5 seconds**.
2. Understand what OwnCryt is without hunting.
3. Browse dresses with one obvious tap per card.
4. Hit a primary CTA (`Explore the Collection`, `I'm Interested`, `Join the List`, `Design Your Own`) without zooming, guessing, or waiting.

If any of those fail, the page is not done — even if it looks beautiful.

OwnCryt is pre-launch. There is no checkout. The “conversion” actions are **browse**, **save**, **express interest**, **join the list**, and **submit a design**. Those must be as easy as Add to Cart on a real retailer.

---

## Success metrics

Measure at the **75th percentile**, separately for mobile and desktop. Google’s Core Web Vitals are the load bar; OwnCryt UX rules are the browsing bar.

| Metric | Target | Why it matters here |
| --- | --- | --- |
| Largest Contentful Paint (LCP) | ≤ 2.5s | Hero and first product image appear quickly |
| Interaction to Next Paint (INP) | ≤ 200ms | Taps on CTAs, filters, hearts feel instant |
| Cumulative Layout Shift (CLS) | ≤ 0.1 | Buttons do not jump as images/fonts load |
| Time to First Byte (TTFB) | ≤ 800ms on 4G | Server/CDN is not the bottleneck |
| Mobile tap miss rate | Near zero in device testing | People can press what they meant to press |

Lab proxy: Lighthouse mobile (or PageSpeed Insights) on a mid-range Android profile, Slow 4G. Field data later via CrUX / real-user monitoring.

Do not ship a page that only looks fast on a developer laptop on Wi‑Fi.

---

## Page weight budgets (v1)

Budgets are for the **first load of homepage and collection** on mobile, compressed.

| Resource | Budget | Rule |
| --- | --- | --- |
| JavaScript (initial route) | ≤ 200 KB gzip/brotli | Route-split everything else |
| CSS | ≤ 50 KB | No unused framework CSS |
| Hero image (mobile) | ≤ 100–150 KB | AVIF/WebP, correctly sized |
| Fonts | ≤ 80 KB, 2 files max | One serif + one sans; 1–2 weights each |
| Below-fold product thumbs | Lazy-loaded, ~40–80 KB each | Do not compete with the hero |
| Total first-load requests | Keep low; avoid font/CDN chains | Each extra lookup hurts Indian 4G |

Custom Studio, search overlay, and interest modal may load **after** first paint via code splitting. They must not be in the homepage critical path.

---

## 1. Make it load fast

Fashion sites fail on images and JavaScript. OwnCryt will too unless both are treated as first-class.

### HTML before JavaScript

A client-only React SPA hides the hero until JS downloads, parses, and renders. On Indian 4G that is often the difference between “this is a brand” and bounce.

Preferred for v1 (still fits Express + Vite):

- **Prerender** public routes at build time: `/`, `/collection`, `/about`, `/product/:slug`, `/custom-studio`.
- Express serves those HTML files and the API.
- Hydrate on the client for interactivity.

Minimum if full prerender slips:

- Hero markup and a `<link rel="preload">` for the LCP image in `index.html`.
- Do not discover the hero only after React mounts.
- Keep the homepage JS chunk as small as possible.

Do not add a micro-frontend or a second framework to chase speed.

### Images (largest lever)

Images are the LCP element on most pages. Treat them as product, not decoration.

- Serve **AVIF**, then **WebP**, then JPEG fallback via `<picture>`.
- Use `srcset` + accurate `sizes` so a phone never downloads a 2400px desktop file.
- Put **width and height** (or CSS `aspect-ratio`) on every image so layout does not jump.
- **Hero / first viewport image:** `fetchpriority="high"`, `loading="eager"`. Never `loading="lazy"`.
- **Everything below the fold:** `loading="lazy"` and `decoding="async"`.
- One LCP image per page. Do not give `fetchpriority="high"` to a grid of eight dresses.
- Full-length catalog shots at consistent aspect ratio (fashion grids scan as images, not lists).
- Compress at build time. Do not check 3MB camera JPEGs into `public/` and ship them.
- Hover/alternate views: swap a second image on desktop hover/focus; on mobile do not hide the only path to the PDP behind hover.

### JavaScript

- `@vitejs/plugin-react-swc` over the Babel React plugin.
- Route-level code splitting (collection, PDP, Custom Studio, search).
- Split vendor chunks (React vs app) so caching works.
- No animation libraries, date libraries, or UI kits that are not earning their weight.
- Forms and modals: keep validation light; do not block the main thread on image decode or huge client state.
- Prefer CSS for hover and simple motion. JS motion must respect `prefers-reduced-motion`.

### Fonts

- Self-host **WOFF2**. Do not chain Google Fonts CSS → font files on first paint if it can be avoided.
- `font-display: swap`.
- Subset to Latin (+ needed punctuation). Two families, few weights.
- Fallback metrics close to the webfont to limit CLS when swap happens.
- Never load italic + five weights “just in case.”

### Network and server

- Brotli or gzip for HTML, JS, CSS, JSON.
- Long-cache hashed assets (`Cache-Control: public, max-age=31536000, immutable`).
- HTML revalidated (`no-cache` or short max-age).
- Compression and caching on Express in production.
- Prefer a CDN with Indian points of presence when deploying.
- Keep TTFB low: static prerendered HTML beats rendering React on every request.

---

## 2. Make browsing obvious

People scan. They do not read a fashion manifesto first. Give them a clear path.

### Four jobs on every landing

Homepage and collection should make these unmistakable:

| Job | Where it lives | CTA language |
| --- | --- | --- |
| See the dresses | Hero + The First Edit / collection grid | `Explore the Collection` |
| Open one piece | Entire product card (image + title) | `View piece` |
| Register interest | Distinct control, not the same as the card | `I'm Interested` |
| Submit a design | Header + homepage block | `Design Your Own` / `Submit Your Design` |

NN/g: a homepage should expose the **top 1–4 tasks**. Do not invent a fifth competing primary button.

### CTA copy

- Use the specific PRD labels. They already have information scent.
- Never use `Get Started`, `Learn More`, `Click here`, or `Submit` as the only visible label.
- Primary vs secondary must be visually distinct (filled vs outline/text), not two equal pills.
- Primary CTAs stay visible in the first viewport on mobile. Secondary can sit beside or just below.
- Do not put the only CTA behind hover. Touch and keyboard users never see it.

### Product cards

- The **card (image + name)** goes to the PDP. That is the browse action.
- **I'm Interested** / heart is a **separate hit target** with its own spacing. Same tap must not both navigate and save.
- Status (`Coming soon`) and indicative price stay readable without pinch-zoom.
- Desktop: 3–4 columns. Mobile: **2 columns**. One column wastes scan speed; five columns kills thumbs.
- Consistent image ratio so the grid does not shimmer.
- Baymard-style range: a short catalog does not need infinite scroll. Prefer the full grid or **Load more** over infinite scroll so Back from a PDP does not lose place.

### Collection filters

- Filters and sort must work without a page reload feeling broken.
- Mobile: sticky **Filter & Sort** control; full-screen sheet; Apply / Clear always on screen; show active count (`Filter (2)`).
- Desktop: filters stay reachable while scrolling (sticky sidebar or bar).
- Empty filter results get a clear reset, not a blank page.

### Navigation

- Logo always returns home.
- Current section can be recognized (COLLECTION vs CUSTOM STUDIO).
- Mobile: hamburger is 44×44px minimum; search and saved designs stay in the header, not buried only in the drawer.
- No dead nav items. WOMEN must land on a real women/collection view.
- Sticky header must not cover the first CTA or the filter bar. Account for safe areas (notch, home indicator).

### Hierarchy and scanning

- Most important words first in headings and links.
- Hero statement + two CTAs above the fold; collection grid must not look like a “false floor” (cut-off content or a visible next section so people scroll).
- Generous whitespace is on-brand; empty-looking first screens that hide the dresses are not.

---

## 3. Make CTAs and forms easy to press

### Tap targets

| Control | Minimum |
| --- | --- |
| WCAG 2.2 AA floor | 24×24 CSS px (too small for fashion retail) |
| OwnCryt standard | **44×44 CSS px** (Apple HIG / WCAG 2.5.5) |
| Primary buttons | **48px min-height**, comfortable padding |
| Adjacent icons (search, heart, menu) | 44×44 plus **8px+** gap so the wrong one is not hit |

The clickable box includes padding, not the visible icon alone. A 16px heart inside a 44px button is correct; a 16px heart with 4px padding is not.

Primary CTAs on mobile sit in the **thumb-friendly** zone when possible (lower half / sticky bar on PDP). Do not stick the only interest button next to the OS gesture area without extra padding.

### Feedback

Every tap that does work must show it:

- Hover (desktop) and `:active` (touch).
- Visible `:focus-visible` rings for keyboard.
- Buttons disabled + spinner while submitting; do not allow double submit.
- Success and error in the same place the user acted (modal, form, toast that does not cover the next CTA).
- 16px+ input font size on mobile so iOS does not zoom the field.

### Forms (interest, newsletter, Custom Studio)

NN/g: guideline-compliant forms are completed faster and with far fewer errors.

- Ask only what the PRD requires. Optional fields stay optional and marked.
- Single column. Label **above** the field, always visible (no placeholder-only labels).
- Correct `type`, `inputmode`, `autocomplete` (`email`, `tel`, `name`, `country`).
- Validate on blur/submit, not on every keystroke in a punishing way.
- Inline, specific errors (`Enter an email like name@example.com`), tied to the field.
- Consent is an explicit checkbox, not pre-ticked.
- Custom Studio is three short steps with a visible progress indicator and a Back control that does not wipe uploads.
- File picker works with the native camera roll; drag-and-drop is extra, not the only path.

Do not open a modal that traps focus badly, lacks a close control, or cannot be dismissed with Escape.

---

## 4. Keep it stable and accessible

Speed without stability still feels broken.

- Reserve space for announcement bar, images, and fonts so CTAs do not jump.
- Do not inject banners after first paint without reserved height.
- Semantic landmarks: header, nav, main, footer.
- Buttons are `<button>` or real links. Do not make `div`s clickable.
- Meaningful alt text on dresses; decorative images `alt=""`.
- Keyboard: tab order matches visual order; skip link to main content.
- Reduced motion: no large parallax or page-wide animation.

---

## 5. Architecture choices that protect UX

Stay inside the PRD stack (Node, Express, React, TypeScript, Vite). Use it in a performance-aware way:

| Do | Don’t |
| --- | --- |
| Prerender public pages; Express for APIs + static | Blank `#root` until a 300KB bundle runs |
| Shared `Button`, `ProductCard`, `TextField` with built-in target size | One-off tiny icon links in each page |
| Image component that encodes LCP vs lazy | `loading="lazy"` on every `<img>` |
| CSS modules / one design system | Heavy CSS-in-JS runtime on the critical path |
| Local product JSON, tiny payload | Fetching a huge mock “just like a CMS” on first paint |
| Analytics abstraction, loaded idle | Blocking tag managers before LCP |

---

## 6. Verification (every shopping surface)

Before marking homepage, collection, PDP, or Custom Studio done:

**Load**

- [ ] Lighthouse mobile: LCP / INP / CLS in the good range, or a documented exception with a fix ticket
- [ ] Hero is not lazy-loaded; preload or prerender is in place
- [ ] Network panel: first JS chunk within budget; images in modern formats
- [ ] Test on a real phone or throttled Slow 4G, not only desktop DevTools

**Browse**

- [ ] Two-column mobile grid; 3–4 column desktop
- [ ] Card tap → PDP; heart/interest tap does not navigate
- [ ] Filters/sort work; empty state has a way out
- [ ] Back from PDP returns somewhere sensible (scroll position or Load more, not a reset mystery)

**CTA**

- [ ] Primary CTA visible without scrolling on mobile hero and PDP
- [ ] All interactive targets ≥ 44×44px with spacing
- [ ] Labels say the action (`I'm Interested`, not `Submit`)
- [ ] Loading, success, and error states exist
- [ ] Keyboard and screen-reader can complete interest + newsletter

**Honesty** (unchanged from PRD)

- [ ] No fake stock, reviews, checkout, or “buy” language on the CTA

---

## Mapping to the roadmap

| Practice | Roadmap |
| --- | --- |
| Prerender, SWC, chunking, compression, font loading | Phase 0 + 11 |
| 44px targets, button/header/footer chrome | Phase 1 |
| Optimized product images, aspect ratios, alt | Phase 2 |
| Hero LCP, above-fold CTAs, no false floor | Phase 3 |
| Grid density, filters, card hit areas, PDP sticky interest | Phase 4 |
| Search overlay performance, local save without jank | Phase 5 |
| Fast API validation, small upload limits | Phase 6–8 |
| CWV pass, tap audit, reduced motion | Phase 10–11 |

---

## Sources

Practices above are distilled from:

- [web.dev Core Web Vitals](https://web.dev/articles/vitals) — LCP 2.5s, INP 200ms, CLS 0.1 at p75
- [Google Search Central: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Image optimization and LCP](https://webvitals.tools/guides/image-optimization/) — never lazy-load the LCP image; `fetchpriority="high"`
- [Vite LCP configuration](https://webvitals.tools/fixes/lcp-vite/) — SWC, manual chunks, image compression, hero preload
- [Vite SSR / prerender](https://vite.dev/guide/ssr) and [React Router pre-rendering](https://reactrouter.com/how-to/pre-rendering)
- [NN/g homepage usability](https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/) — 1–4 primary tasks
- [NN/g “Get Started”](https://www.nngroup.com/articles/get-started/) — specific CTA labels
- [NN/g scrolling and attention](https://www.nngroup.com/articles/scrolling-and-attention/) — CTAs and priority content at the top; avoid false floors
- [NN/g form usability](https://www.nngroup.com/articles/web-form-design/)
- [NN/g touch target size](https://www.nngroup.com/articles/touch-target-size/) — ~1cm / 44px class targets
- [WCAG 2.2 Target Size (Minimum) 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) and [2.5.5 Enhanced](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [Shopify tap target guidance](https://shopify.dev/docs/storefronts/themes/best-practices/performance/increase-tap-target-size) — 44–48px retail practice
- Fashion PLP patterns (2-column mobile, sticky filters, card vs CTA hit areas) — Baymard-informed retail UX summaries such as [PLP best practices](https://suplex.design/blog/product-listing-page-best-practices)
- India 4G / mid-range Android constraints — keep JS and hero image on a diet; measure on Slow 4G, not fibre
