# Build OwnCryt — A Premium Fashion E-commerce Experience

You are a senior frontend engineer, product designer, and creative director specializing in premium fashion e-commerce.

Build a polished, production-quality fashion e-commerce website for **OwnCryt**, an emerging fashion brand focused on making expensive-looking Western dresses accessible at affordable prices in India and eventually other markets.

## 1. Brand concept

OwnCryt is a fashion label in its early validation stage. We have not manufactured our initial collection yet. The website should look and feel like a legitimate, established fashion brand, but it must not falsely claim that products are in stock, already manufactured, or ready to ship.

The initial goal is to validate demand:

* Showcase proposed dresses as fashion products.
* Let visitors explore collections and individual product details.
* Collect email addresses from people interested in specific dresses.
* Allow visitors to express interest in a design.
* Let customers submit their own dress ideas or reference images for potential custom manufacturing.
* Build a qualified audience before production begins.

**Do not make the website look like a survey, crowdfunding campaign, or generic startup MVP.** It should feel like a premium fashion store with a carefully designed pre-launch shopping experience.

## 2. Design direction

Use the following references for visual inspiration:

* TailorDidi: https://tailordidi.com/
* Zara India: https://www.zara.com/in/en/woman-new-in-l1180.html
* Harrods: https://www.harrods.com/en-in

Study their overall design language: premium editorial photography, strong product presentation, clean navigation, fashion-focused typography, generous whitespace, curated collections, and a sophisticated e-commerce browsing experience.

Do not copy their branding, logos, layouts, product names, or copyrighted imagery. Create an original identity for OwnCryt.

### Desired aesthetic

* Modern luxury fashion.
* Editorial and aspirational.
* Minimal but visually rich.
* High-end Western fashion at accessible prices.
* Confident, youthful, and contemporary.
* Premium without feeling unapproachable.
* Mobile-first and highly responsive.

Avoid:

* Generic SaaS layouts.
* Excessive gradients.
* Neon colors.
* Overly rounded cards.
* Loud startup-style illustrations.
* Cheap-looking stock photography.
* Excessive animations that interfere with shopping.

## 3. Brand identity

Brand name: **OwnCryt**

Create a refined typographic wordmark for OwnCryt. The logo should be text-based, distinctive, and suitable for a fashion label. Do not use a complicated icon or an obvious fashion cliché.

Suggested visual direction:

* Background: warm ivory, soft white, or a restrained neutral.
* Typography: elegant editorial serif for prominent headlines, paired with a clean modern sans-serif for navigation and product information.
* Text: deep charcoal or black.
* Accent: muted burgundy, espresso, or another sophisticated fashion-oriented tone.
* Use a restrained color palette with excellent contrast.

The brand should feel premium and recognizable without relying on the logo alone.

## 4. Website structure

Create the following pages and routes:

### A. Homepage — `/`

Build a visually compelling fashion homepage.

#### Announcement bar

A slim announcement bar at the top:

“THE FIRST OW NCRYT COLLECTION IS TAKING SHAPE — DISCOVER THE EDIT”

Use a polished, original message if the spacing of the brand name requires it. Do not imply that products are already available for shipping.

#### Header

Create a responsive header with:

* OwnCryt wordmark.
* WOMEN.
* COLLECTIONS.
* CUSTOM STUDIO.
* ABOUT.
* Search icon.
* Wishlist icon or saved designs.
* Bag icon, if appropriate to the shopping experience.

On mobile, use a clean hamburger menu and preserve quick access to search and saved designs.

The navigation should feel like a premium fashion retailer.

#### Hero section

Use a full-width editorial fashion image or high-quality generated placeholder imagery showing a model wearing a sophisticated Western dress.

The hero should communicate the brand's core idea:

“THE LOOK OF LUXURY. THE FREEDOM TO OWN IT.”

Supporting copy:

“Statement silhouettes, thoughtfully imagined for a new generation of fashion.”

Primary CTA:

“EXPLORE THE COLLECTION”

Secondary CTA:

“DESIGN YOUR OWN”

Use a striking, fashion-editorial composition. The model, garment, lighting, and image treatment should feel like a real fashion campaign.

#### Featured collection

Create a curated product grid titled:

“THE FIRST EDIT”

Show 6–8 proposed dresses using beautiful, consistent product imagery.

Each product card should include:

* Product image.
* Product name.
* Short design descriptor.
* Indicative price or price range, clearly marked as an estimate.
* A small status label such as “COMING SOON” or “IN DEVELOPMENT.”
* A “View piece” action.
* An “I’m interested” or heart-style interest action.

Use original, coherent placeholder fashion imagery. If the image-generation capability is available, generate consistent editorial images of the dresses. Otherwise, use clearly replaceable local image assets—not random unrelated stock images.

Important: Never show fake availability, fake customer reviews, fake sales counts, or fake inventory.

#### Brand statement section

Create a strong editorial section with the heading:

“EXPENSIVE-LOOKING. WITHIN REACH.”

Suggested copy:

“OwnCryt is built around a simple idea: remarkable fashion should not have to come with an unreasonable price tag. We are exploring the silhouettes, details, and designs people actually want to wear—and building a collection around them.”

Keep the copy concise and fashion-oriented.

#### Editorial fashion banner

Add a full-width visual section with a bold statement such as:

“YOUR NEXT FAVORITE DRESS HASN’T BEEN MADE YET.”

Supporting copy:

“Help us decide what comes next.”

CTA:

“DISCOVER THE EDIT”

#### Custom design section

Introduce the custom-manufacturing concept:

“YOUR VISION. YOUR SILHOUETTE.”

Supporting copy:

“Have a dress in mind? Share your inspiration, and we’ll explore how to bring your design to life.”

CTA:

“SUBMIT YOUR DESIGN”

Include a visually appealing fashion-design or garment-detail image.

#### Email capture section

Create a premium, high-conversion email signup section:

“BE THE FIRST TO KNOW.”

Copy:

“Get early access to new designs, collection updates, and the pieces worth waiting for.”

Form fields:

* Email address.
* Optional first name.

CTA:

“JOIN THE LIST”

Include a clear, subtle privacy note. The form should be accessible, validated, and designed for a successful integration with an email collection backend.

#### Footer

Include:

* OwnCryt logo.
* Navigation links.
* Custom Studio.
* About OwnCryt.
* Contact.
* Instagram.
* Privacy Policy.
* Terms.
* Email signup.
* Country selector, initially India.

Do not add fake social media accounts or fake contact details. Use placeholders that are easy to replace.

---

### B. Collection page — `/collection`

Build a premium fashion catalog page that feels like browsing a real retailer.

Page elements:

* Editorial page heading: “THE COLLECTION.”
* Introductory copy explaining that these are proposed designs.
* Category filters: Dresses, Evening, Party, Minimal, Statement.
* Sorting options: Featured, Newest, Price.
* Responsive product grid.
* Product cards with hover image transitions.
* Wishlist/save interaction.
* Interest CTA.
* Pagination or a “Load more” pattern if needed.

Use 8–12 coherent proposed products. Give every product a unique name and design identity.

Do not create fake product inventory. Products should be represented as concepts or pre-launch pieces.

Make filters and sorting functional on the frontend.

---

### C. Product detail page — `/product/:slug`

Create a premium, editorial product detail page.

Include:

* Large image gallery.
* Alternate product views.
* Product name.
* Product description.
* Design details.
* Fabric or material information, only where known.
* Indicative price or price range.
* Size guidance or “Sizing details coming soon.”
* Status: “In development” or “Coming soon.”
* Strong primary CTA: “I’M INTERESTED.”
* Secondary CTA: “SAVE DESIGN.”

Add a section:

“WANT TO SEE THIS PIECE MADE?”

Copy:

“Tell us you’re interested. We’re using early demand to decide which designs become part of the first OwnCryt collection.”

The interest CTA should open a polished modal or inline form containing:

* Email address.
* Optional name.
* Optional size preference.
* Optional country.
* Consent checkbox for receiving updates.
* Product identifier captured automatically.

After submission, show a clear success state:

“YOU’RE ON THE LIST.”

“Thank you. We’ll let you know if this piece moves closer to production.”

Do not simulate a purchase, checkout, payment, order confirmation, or shipment.

---

### D. Custom Studio — `/custom-studio`

This is a key differentiator for OwnCryt.

Create a beautiful, intuitive design-submission experience for people who want a dress custom-manufactured.

Headline:

“IMAGINE IT. WEAR IT.”

Supporting copy:

“Have a reference image, a sketch, or simply an idea? Share your vision with OwnCryt.”

Build a polished multi-step form:

#### Step 1 — Inspiration

Allow users to upload:

* Reference images.
* Sketches.
* Moodboards.

Include drag-and-drop and a mobile-friendly file picker.

Show image previews, file names, and remove controls.

#### Step 2 — Design preferences

Fields:

* Describe your dress.
* Occasion: Party, Evening, Wedding guest, Vacation, Casual, Other.
* Preferred silhouette.
* Preferred color.
* Preferred fabric, if known.
* Desired budget range.
* Preferred size.
* Country.

#### Step 3 — Contact

Fields:

* Name.
* Email address.
* Optional phone number.

Add an explicit consent checkbox for contacting the user about their submission.

CTA:

“SUBMIT DESIGN REQUEST”

Success state:

“YOUR IDEA HAS BEEN RECEIVED.”

Copy:

“Our team will review your inspiration and reach out if we can explore bringing it to life.”

Important: This is a design inquiry, not an instant manufacturing order. Do not promise manufacturing, prices, delivery dates, or acceptance.

---

### E. About page — `/about`

Create an editorial brand story page.

Explain that OwnCryt is exploring a new approach to fashion: making aspirational Western silhouettes more accessible while listening closely to what customers actually want.

Use:

* Large editorial imagery.
* Brand story.
* Design philosophy.
* Quality and affordability principles.
* A concise explanation of the pre-launch model.

Keep it authentic. Do not invent founders, manufacturing facilities, certifications, awards, sustainability claims, or brand history.

---

### F. Search and saved designs

Implement:

* Product search.
* Search results page or overlay.
* Save/unsave designs locally for the initial prototype.
* Empty states.
* Mobile-friendly interactions.

Saved designs should persist locally in the browser for the prototype. Make the implementation easy to replace with a database-backed solution later.

## 5. Product data

Create a structured product data model that can be replaced by a database later.

Use mock products such as:

* The Nocturne Dress — a sleek black evening silhouette.
* The Solenne Dress — an elegant sculpted cream dress.
* The Sienna Slip — a minimal satin-inspired silhouette.
* The Afterglow Dress — a statement evening design.
* The Muse Dress — a modern fitted silhouette.
* The Élan Dress — a refined occasion piece.
* The Riviera Dress — an effortless vacation-inspired design.
* The Eclipse Dress — a dramatic contemporary evening look.

These are fictional design concepts. Use original imagery and descriptions.

Each product should support:

* ID.
* Slug.
* Name.
* Category.
* Description.
* Design details.
* Indicative price.
* Currency.
* Images.
* Tags.
* Development status.
* Interest count only if backed by real data.
* Available sizes, only if actually defined.
* Color variants, only if actually defined.

Use INR as the initial currency. Do not imply that indicative prices are final retail prices.

## 6. Technical stack

Build the application using:

* Node.js.
* Express.js as the backend server.
* React for the frontend.
* TypeScript.
* Vite for frontend development and bundling, if appropriate.
* React Router.
* Modern CSS, CSS Modules, or a clean styling system.
* Responsive design across mobile, tablet, and desktop.

Architecture:

* The Node/Express server should serve the built React application in production.
* Keep frontend and backend responsibilities clearly separated.
* Use REST API endpoints for interest collection and custom design submissions.
* Store product data separately from UI components.
* Use environment variables for secrets and configuration.
* Keep the application deployable to a standard Node hosting environment.

Do not over-engineer the first version with microservices.

## 7. Email collection and backend integration

The most important backend feature is collecting qualified interest.

Implement an email collection service abstraction so the email provider can be swapped later.

Create backend endpoints similar to:

`POST /api/interests`

For product interest submissions:

```json
{
  "productId": "nocturne-dress",
  "email": "customer@example.com",
  "name": "Optional name",
  "sizePreference": "Optional size",
  "country": "IN",
  "marketingConsent": true
}
```

`POST /api/newsletter`

For general email signup:

```json
{
  "email": "customer@example.com",
  "firstName": "Optional name",
  "marketingConsent": true
}
```

`POST /api/custom-designs`

For custom design inquiries, support multipart form data for image uploads and structured fields for the design details.

### Email integration requirements

* Create an `EmailService` interface or equivalent abstraction.
* Implement a development/mock adapter that logs submissions safely without sending real emails.
* Prepare a production adapter for an email marketing provider such as Brevo, Mailchimp, or another provider that can be configured through environment variables.
* Never hardcode API keys.
* Validate email addresses server-side.
* Sanitize and validate all incoming fields.
* Prevent duplicate submissions where appropriate.
* Add basic rate limiting to public submission endpoints.
* Use proper CORS and security configuration.
* Do not log email addresses, uploaded images, or personal data unnecessarily.
* Handle provider failures gracefully.
* Return useful, non-sensitive error messages.
* Make consent handling explicit.

The application should work in development without requiring a real email provider.

## 8. User experience and interaction

Implement polished interactions:

* Product image hover transitions.
* Smooth but restrained page transitions.
* Modal interest forms.
* Form validation.
* Loading states.
* Submission success states.
* Error states.
* Empty states.
* Responsive navigation.
* Accessible keyboard navigation.
* Visible focus states.
* Proper semantic HTML.
* Accessible form labels.
* Alt text for meaningful images.
* Respect reduced-motion preferences.

The design must feel fast and intentional. Avoid unnecessary animation.

## 9. Image direction

Use consistent, premium fashion imagery.

Image prompts should produce:

* Editorial studio lighting.
* High-quality Western dresses.
* Sophisticated models.
* Clean, uncluttered compositions.
* Neutral or carefully chosen backgrounds.
* Full-length product views for catalog cards.
* Close-up details for product galleries.
* Consistent styling across the collection.

Do not use real luxury-brand campaigns, logos, copied product photography, or recognizable branded designs.

Ensure the imagery is coherent across the product catalog.

## 10. Conversion and validation strategy

The site is designed to validate interest before manufacturing.

Track meaningful events through an analytics abstraction:

* Product viewed.
* Product interest clicked.
* Interest form submitted.
* Newsletter signup completed.
* Design submission started.
* Design submission completed.
* Search used.
* Design saved.

Do not fabricate metrics or social proof.

The website should make it easy to answer:

* Which dresses attract the most interest?
* Which price points attract the most interest?
* Which designs are worth exploring for production?
* How many people want custom designs?
* Which countries are showing interest?

Use privacy-conscious analytics and ensure the implementation can be connected to a real analytics provider later.

## 11. Code quality and deliverables

Deliver a complete working application, not a static mockup.

Requirements:

* Clean folder structure.
* Reusable React components.
* Strong TypeScript typing.
* Responsive layouts.
* Reusable product card, modal, form, header, footer, and button components.
* Clear API service layer.
* Environment variable example file.
* README with setup and deployment instructions.
* Seed/mock product data.
* Backend endpoint examples.
* Basic error handling.
* No broken routes.
* No fake integrations that appear to have succeeded.
* No fake checkout or payment functionality.

Make reasonable design decisions without asking for clarification. Prioritize the homepage, product browsing, product detail, interest capture, and Custom Studio experience.

The final result should look like **a fashion brand preparing to launch its first collection—not a software project demonstrating features.**
