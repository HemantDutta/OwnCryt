# OwnCryt — Delivery Roadmap

Tracking document for building the OwnCryt pre-launch fashion site defined in [`prd.md`](./prd.md).

The site must look like a premium fashion brand preparing its first collection. It must never imply products are in stock, manufactured, or ready to ship. There is no checkout, payment, or fake social proof.

It must also **load fast and browse easily** on mobile 4G in India. Speed and tap-friendly UX are launch requirements, not polish. Follow [`performance-ux.md`](./performance-ux.md).

**Priority order:** homepage → product browsing → product detail → interest capture → Custom Studio.

---

## How to use this file

- Mark a task `[x]` when it is done and verified.
- Keep status at the phase level in sync with the tasks underneath.
- Do not check a phase complete until its acceptance criteria are met.
- Update the **Current status** section when a phase starts or finishes.

**Status values:** `Not started` · `In progress` · `Blocked` · `Done`

---

## Current status

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Foundations | In progress |
| 1 | Brand, layout, and design system | Done |
| 2 | Product data and catalog | Done |
| 3 | Homepage | Done |
| 4 | Collection and product detail | Done |
| 5 | Search and saved designs | Done |
| 6 | Backend, APIs, and email | Done |
| 7 | Interest capture and newsletter | Done |
| 8 | Custom Studio | Done |
| 9 | About, legal, and footer surfaces | Done |
| 10 | Analytics, polish, and accessibility | In progress |
| 11 | Launch readiness | In progress |

---

## Phase 0 — Foundations

Stand up a deployable Node + React application with a clean split between frontend and backend.

**Acceptance:** `npm` scripts run the Vite frontend in development and serve the built React app from Express in production. TypeScript compiles. Folder structure is in place. First-load architecture does not hide the hero behind a large client-only bundle.

- [ ] Initialize the repository as a Node.js + TypeScript project
- [ ] Scaffold the React frontend with Vite and `@vitejs/plugin-react-swc`
- [ ] Add React Router
- [ ] Scaffold the Express backend
- [ ] Configure the backend to serve the built frontend in production
- [ ] Prerender public routes at build time (`/`, `/collection`, `/about`, product slugs, `/custom-studio`) or document a fallback with hero preload in HTML
- [ ] Enable route-level code splitting and vendor/app chunk split
- [ ] Enable Brotli/gzip for HTML, JS, CSS, and JSON in production
- [ ] Cache hashed static assets long-term; keep HTML revalidatable
- [ ] Define a clean folder structure (frontend, backend, shared types, product data, public assets)
- [ ] Add path aliases / import conventions if useful
- [ ] Add `.env.example` with documented variables (no secrets)
- [ ] Load configuration from environment variables
- [ ] Add `.gitignore` for `node_modules`, build output, uploads, and env files
- [ ] Confirm local development works without a real email provider

---

## Phase 1 — Brand, layout, and design system

Create an original OwnCryt identity and the shared chrome every page uses.

**Acceptance:** Header, footer, announcement bar, and typography feel like a fashion retailer on mobile and desktop. No SaaS-style layout, neon, or loud illustration.

- [ ] Define the color palette (warm ivory / soft white, charcoal, muted burgundy or espresso)
- [ ] Choose editorial serif + modern sans-serif pairing
- [ ] Create a refined typographic OwnCryt wordmark (text-based, no cliché icon)
- [ ] Set spacing, type scale, and button styles
- [ ] Build reusable `Button` component with 48px min-height primary actions and 44×44px icon buttons
- [ ] Self-host WOFF2 fonts (serif + sans, 1–2 weights), `font-display: swap`, no render-blocking Google Fonts chain
- [ ] Visible `:focus-visible` styles and 8px+ gaps between adjacent header icons
- [ ] Build announcement bar with a polished pre-launch message (no shipping claims)
- [ ] Build responsive header: wordmark, WOMEN, COLLECTIONS, CUSTOM STUDIO, ABOUT, search, saved designs, bag if appropriate
- [ ] Build mobile hamburger menu with quick access to search and saved designs
- [ ] Build footer: logo, nav, Custom Studio, About, Contact, Instagram placeholder, Privacy, Terms, email signup, India country selector
- [ ] Use replaceable placeholders for contact and social — no fake accounts
- [ ] Add a global layout shell used by all routes
- [ ] Verify mobile, tablet, and desktop chrome

---

## Phase 2 — Product data and catalog model

Create structured mock product data that can later be replaced by a database.

**Acceptance:** 8–12 coherent concept products exist with unique names, slugs, categories, indicative INR prices, and development status. UI does not hardcode product lists.

- [ ] Define the product TypeScript model (id, slug, name, category, description, design details, indicative price, currency, images, tags, status)
- [ ] Seed 8–12 proposed dresses, including:
  - [ ] The Nocturne Dress
  - [ ] The Solenne Dress
  - [ ] The Sienna Slip
  - [ ] The Afterglow Dress
  - [ ] The Muse Dress
  - [ ] The Élan Dress
  - [ ] The Riviera Dress
  - [ ] The Eclipse Dress
  - [ ] Additional original pieces to reach 8–12
- [ ] Assign categories usable by filters: Dresses, Evening, Party, Minimal, Statement
- [ ] Use INR for indicative prices and mark them as estimates, not final retail
- [ ] Set development status (`coming-soon` / `in-development`)
- [ ] Omit fake inventory, reviews, interest counts, sizes, and color variants unless actually defined
- [ ] Store product data separately from UI components
- [ ] Add a frontend data/access layer for listing, filtering, sorting, and fetching by slug
- [ ] Source consistent, original product imagery (generated or clearly replaceable local assets)
- [ ] Compress to AVIF/WebP (+ JPEG fallback), with `srcset`/`sizes` and reserved aspect ratio
- [ ] Add a shared image component: eager + `fetchpriority="high"` for LCP, `loading="lazy"` only below the fold
- [ ] Add alt text for meaningful images

---

## Phase 3 — Homepage `/`

Build the visually primary surface of the brand.

**Acceptance:** Homepage tells the brand story, shows The First Edit, captures email, and never looks like a survey or crowdfunding page.

- [ ] Hero with editorial image and core line: “THE LOOK OF LUXURY. THE FREEDOM TO OWN IT.”
- [ ] Hero is the LCP element: preloaded, never lazy-loaded, mobile file ≤ 150 KB
- [ ] Hero supporting copy and CTAs: “EXPLORE THE COLLECTION” / “DESIGN YOUR OWN”
- [ ] Both hero CTAs visible in the first mobile viewport; labels stay specific (no “Get Started” / “Learn More”)
- [ ] Avoid a false floor — next section is hinted so people scroll to The First Edit
- [ ] Featured collection “THE FIRST EDIT” with 6–8 product cards
- [ ] Product card: image, name, short descriptor, indicative price, status label, “View piece”, interest/heart action
- [ ] Brand statement: “EXPENSIVE-LOOKING. WITHIN REACH.”
- [ ] Editorial banner: “YOUR NEXT FAVORITE DRESS HASN’T BEEN MADE YET.”
- [ ] Custom design teaser: “YOUR VISION. YOUR SILHOUETTE.” with CTA to Custom Studio
- [ ] Email capture: “BE THE FIRST TO KNOW.” (email, optional first name, privacy note, validation)
- [ ] Wire all homepage CTAs to real routes
- [ ] Review copy so nothing implies availability, shipping, or manufacture

---

## Phase 4 — Collection and product detail

Make browsing feel like a real fashion retailer.

**Acceptance:** `/collection` and `/product/:slug` work with filters, sorting, galleries, and honest pre-launch CTAs. No purchase, checkout, or shipment simulation.

### Collection `/collection`

- [ ] Editorial heading: “THE COLLECTION.”
- [ ] Intro copy that these are proposed / pre-launch designs
- [ ] Category filters: Dresses, Evening, Party, Minimal, Statement
- [ ] Sorting: Featured, Newest, Price
- [ ] Make filters and sorting functional on the frontend
- [ ] Mobile: 2-column grid; desktop: 3–4 columns
- [ ] Mobile sticky Filter & Sort with full-screen sheet, Apply/Clear, and active count
- [ ] Card (image + name) opens the PDP; interest/heart is a separate 44×44px target
- [ ] Hover image transitions on product cards (desktop/focus only — not the only path)
- [ ] Wishlist/save and interest actions on cards
- [ ] Pagination or “Load more” if the grid needs it
- [ ] Empty state when filters return no results

### Product detail `/product/:slug`

- [ ] Large image gallery with alternate views
- [ ] Name, description, design details
- [ ] Fabric/material only where known
- [ ] Indicative price or price range in INR
- [ ] Size guidance or “Sizing details coming soon.”
- [ ] Status: “In development” or “Coming soon”
- [ ] Primary CTA: “I’M INTERESTED.” (48px min-height, reachable on mobile without covering OS gestures)
- [ ] Secondary CTA: “SAVE DESIGN.”
- [ ] Interest and save are distinct hit targets; the gallery does not steal the first tap
- [ ] Demand section: “WANT TO SEE THIS PIECE MADE?”
- [ ] Unknown slug → proper not-found state
- [ ] Confirm there is no add-to-cart checkout, payment, or order confirmation

---

## Phase 5 — Search and saved designs

Prototype personalization that can later move to a database.

**Acceptance:** Search finds products. Saved designs persist in the browser and survive refresh. Empty and mobile states are usable.

- [ ] Search icon opens overlay or navigates to results
- [ ] Search matches product name, category, tags, and descriptors
- [ ] Search results page or overlay with product cards
- [ ] Search empty state
- [ ] Save / unsave designs locally
- [ ] Saved designs view (page or overlay)
- [ ] Saved designs empty state
- [ ] Persist saved designs in `localStorage` (easy to replace later)
- [ ] Keep save state in sync across cards, PDP, and saved list
- [ ] Mobile-friendly search and saved-design interactions

---

## Phase 6 — Backend, APIs, and email

Collect qualified interest safely. The app must work in development without a real provider.

**Acceptance:** Three public endpoints validate input, rate-limit abuse, and persist or forward submissions through an `EmailService` abstraction. No API keys in source. Personal data is not logged unnecessarily.

- [ ] Create `EmailService` interface
- [ ] Implement development/mock adapter that logs safely without sending mail or printing emails
- [ ] Prepare production adapter for Brevo, Mailchimp, or similar, configured via env vars
- [ ] `POST /api/interests` for product interest
- [ ] `POST /api/newsletter` for general signup
- [ ] `POST /api/custom-designs` with multipart image uploads and structured fields
- [ ] Validate emails and sanitize all fields server-side
- [ ] Capture product identifier automatically on interest submissions
- [ ] Prevent duplicate submissions where appropriate
- [ ] Add basic rate limiting on public endpoints
- [ ] Configure CORS and security headers
- [ ] Handle provider failures gracefully with non-sensitive error messages
- [ ] Store uploads securely with size/type limits
- [ ] Make consent explicit on every submission path
- [ ] Keep frontend API service layer typed and separate from UI

---

## Phase 7 — Interest capture and newsletter

Connect the shopping experience to demand collection.

**Acceptance:** Interest and newsletter forms validate, submit to the API, and show honest success or error states. Failed integrations never look successful.

- [ ] Build reusable interest modal / inline form (email, optional name, optional size, optional country, consent)
- [ ] Open interest form from product cards and PDP
- [ ] Success state: “YOU’RE ON THE LIST.” with the PRD follow-up copy
- [ ] Error, loading, and validation states (prevent double-submit)
- [ ] Single-column fields, labels above inputs, 16px mobile font, `autocomplete` / `type="email"`
- [ ] Wire homepage and footer newsletter forms to `POST /api/newsletter`
- [ ] Accessible labels, keyboard use, and focus management in modals
- [ ] Do not simulate purchase or shipment after submit

---

## Phase 8 — Custom Studio `/custom-studio`

Deliver the brand differentiator: a polished design inquiry, not an instant manufacturing order.

**Acceptance:** Three-step flow uploads inspiration, captures preferences, and submits contact details. Copy never promises manufacturing, price, delivery, or acceptance.

- [ ] Page headline: “IMAGINE IT. WEAR IT.”
- [ ] Multi-step form with clear progress
- [ ] Step 1 — Inspiration: native file picker required; drag-and-drop is extra
- [ ] Image previews, file names, and remove controls
- [ ] Visible progress and Back that does not wipe uploads
- [ ] Step 2 — Preferences: description, occasion, silhouette, color, fabric, budget, size, country
- [ ] Step 3 — Contact: name, email, optional phone, consent checkbox
- [ ] CTA: “SUBMIT DESIGN REQUEST”
- [ ] Success state: “YOUR IDEA HAS BEEN RECEIVED.”
- [ ] Client- and server-side validation
- [ ] Loading and error states
- [ ] Confirm copy positions this as an inquiry, not an order

---

## Phase 9 — About, legal, and remaining routes

Finish the information architecture without inventing brand history.

**Acceptance:** About is authentic. Privacy and Terms exist. No broken routes. No invented founders, factories, certifications, awards, or sustainability claims.

- [ ] About page `/about` with editorial imagery
- [ ] Brand story, design philosophy, quality/affordability, pre-launch model
- [ ] Privacy Policy page (honest about email collection and local saved designs)
- [ ] Terms page
- [ ] Contact placeholder that is easy to replace
- [ ] WOMEN nav target (collection or women-filtered collection — do not leave it dead)
- [ ] 404 page in the OwnCryt visual language
- [ ] Confirm every header/footer link resolves

---

## Phase 10 — Analytics, polish, and accessibility

Make the site feel fast, intentional, and measurable.

**Acceptance:** Meaningful events fire through an analytics abstraction. Motion is restrained. The UI is usable with keyboard, screen readers, and reduced motion. Homepage and collection meet the [fast-load and tap-target bar](./performance-ux.md) on throttled mobile.

### Analytics abstraction

- [ ] Product viewed
- [ ] Product interest clicked
- [ ] Interest form submitted
- [ ] Newsletter signup completed
- [ ] Design submission started
- [ ] Design submission completed
- [ ] Search used
- [ ] Design saved
- [ ] Implementation can later connect to a real provider
- [ ] No fabricated metrics or social proof in the UI

### Interaction and quality

- [ ] Product image hover transitions
- [ ] Smooth, restrained page transitions
- [ ] Loading, empty, success, and error states on all key flows
- [ ] Visible focus states
- [ ] Semantic HTML and accessible form labels
- [ ] Buttons and links are real controls (no clickable `div`s)
- [ ] Alt text on meaningful images
- [ ] Respect `prefers-reduced-motion`
- [ ] Responsive pass: mobile, tablet, desktop
- [ ] Performance pass: no animation that interferes with shopping

### Fast load and easy CTAs

See [`performance-ux.md`](./performance-ux.md) for budgets and the full audit.

- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 on homepage and collection (Lighthouse mobile / Slow 4G)
- [ ] Initial JS ≤ ~200 KB compressed; Custom Studio and search are code-split
- [ ] Tap-target audit: header icons, filters, hearts, and primary buttons ≥ 44×44px with spacing
- [ ] Primary CTAs remain visible and tappable on a real phone (or equivalent viewport)
- [ ] Forms: labels above fields, 16px inputs, inline errors, no double-submit
- [ ] No layout jump that moves a CTA as images or fonts load

---

## Phase 11 — Launch readiness

Ship a complete working application, not a static mockup.

**Acceptance:** README can take a new developer from clone to running app. Production build is deployable to a standard Node host. Honest pre-launch rules still hold.

- [ ] README: setup, env vars, development, production build, deployment
- [ ] Environment variable example file complete
- [ ] Seed/mock product data documented
- [ ] Backend endpoint examples documented
- [ ] Basic error handling on frontend and backend
- [ ] No broken routes
- [ ] No fake integrations that appear to have succeeded
- [ ] No fake checkout or payment
- [ ] Production build + Express static serve verified
- [ ] Throttled-mobile pass of homepage → collection → PDP → interest, plus Custom Studio
- [ ] Final visual review against PRD: premium fashion, not a software demo
- [ ] Final copy review: no stock, shipping, manufacture, or inventory claims

---

## Fast load and intuitive UX checklist

Re-check before calling any shopping surface done. Details in [`performance-ux.md`](./performance-ux.md).

- [ ] Hero / LCP image is eager, preloaded, and not lazy-loaded
- [ ] Below-fold images are lazy-loaded and dimensioned (no CLS)
- [ ] First-load JS and hero image stay inside the page-weight budget
- [ ] Homepage shows the top tasks without a generic “Get Started”
- [ ] Product card tap browses; interest/save is a separate control
- [ ] Mobile collection is two columns with reachable Filter & Sort
- [ ] Primary CTAs are specific, above the fold where it matters, and ≥ 48px tall
- [ ] Adjacent icons cannot be mis-tapped
- [ ] Interest, newsletter, and Custom Studio forms are single-column and labeled
- [ ] Verified on a phone-sized viewport with Slow 4G throttling

---

## Honest commerce checklist

Keep this true for the entire project. Re-check before calling any shopping surface done.

- [ ] No fake availability
- [ ] No fake customer reviews
- [ ] No fake sales counts
- [ ] No fake inventory
- [ ] No fake interest counts unless backed by real data
- [ ] Indicative prices clearly marked as estimates
- [ ] No checkout, payment, order confirmation, or shipment
- [ ] Custom Studio does not promise manufacturing, prices, dates, or acceptance
- [ ] No invented founders, facilities, certifications, awards, or brand history
- [ ] No fake social accounts or contact details

---

## Suggested build sequence

Work in this order so the highest-value surfaces exist first:

1. Phase 0–1 — app shell and brand
2. Phase 2–4 — products, homepage, collection, PDP
3. Phase 5 — search and saved designs
4. Phase 6–7 — APIs, interest, newsletter
5. Phase 8 — Custom Studio
6. Phase 9–11 — remaining pages, polish, Core Web Vitals / tap audit, launch

---

## Out of scope for v1

Do not pull these into the first version unless the PRD is explicitly updated:

- Real manufacturing, inventory, or fulfillment
- Checkout, payments, cart checkout, or order tracking
- User accounts and authentication
- Database-backed wishlist or CMS (local/mock data is enough)
- Live email provider (mock adapter is required; production adapter is prepared, not mandatory to connect)
- Microservices
- A second frontend framework (stay on Vite + React + Express; prerender rather than rewrite)
- Fabricated metrics, reviews, or social proof
