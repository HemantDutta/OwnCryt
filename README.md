# OwnCryt

Pre-launch fashion house for expensive-looking Western dresses at accessible prices. This site showcases proposed designs, collects interest, and takes Custom Studio inquiries. Nothing is for sale yet.

## Stack

- React 19 + TypeScript + Vite (`client/`)
- Express + TypeScript (`server/`)
- Supabase tables for interest, newsletter, and custom-design submissions
- REST: `POST /api/interests`, `POST /api/newsletter`, `POST /api/custom-designs`

## Setup

```bash
npm install
cp .env.example .env
```

### Collect submissions in Supabase

1. Create a Supabase project.
2. Run `server/supabase/schema.sql` in the SQL editor (tables + private `custom-designs` storage bucket).
3. In Project Settings → API, copy the **Project URL** and **service_role** key into `.env`:

```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Use the service role on the Node server only. Do not put it in Vite or the browser. Row Level Security is on; the browser has no access.

If those env vars are empty, the API still runs with a local mock that does not keep emails.

## Development

```bash
npm run dev
```

Vite: `http://localhost:5173` · API: `http://localhost:3001` (`/api` is proxied).

## Production

```bash
npm run build
npm start
```

The server serves `client/dist` when `NODE_ENV=production`.

### Environment

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `PORT` | API / production server port |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key to insert rows |
| `CLIENT_ORIGIN` | CORS origin in production |
| `MAX_UPLOAD_MB` | Custom Studio image limit |

## Product data

Mock catalogue: `client/src/data/products.ts`. Editorial studies: `client/public/images`. Regenerate studies with:

```bash
node client/scripts/generate-images.mjs
```

## Demand data

| Table | What lands there |
| --- | --- |
| `product_interests` | I’m interested (email, product, optional name/size/country) |
| `newsletter_signups` | Join the list |
| `custom_designs` | Custom Studio fields; images in Storage bucket `custom-designs` |

Repeat interest for the same email + product, or a repeat newsletter email, is stored once.

## Notes

- Indicative prices are estimates in INR.
- Saved designs persist in `localStorage` on the device, not in Supabase.
