-- OwnCryt demand collection. Run this in the Supabase SQL editor.
-- The Node server uses the service role key (bypasses RLS).
-- Do not expose the service role key to the browser.

create table if not exists public.product_interests (
  id uuid primary key default gen_random_uuid(),
  product_id text not null,
  email text not null,
  name text,
  size_preference text,
  country text,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  unique (email, product_id)
);

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.custom_designs (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  phone text,
  description text not null,
  occasion text,
  silhouette text,
  color text,
  fabric text,
  budget text,
  size text,
  country text,
  marketing_consent boolean not null default false,
  image_paths text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists product_interests_product_id_idx
  on public.product_interests (product_id);

create index if not exists product_interests_created_at_idx
  on public.product_interests (created_at desc);

create index if not exists custom_designs_created_at_idx
  on public.custom_designs (created_at desc);

alter table public.product_interests enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.custom_designs enable row level security;

insert into storage.buckets (id, name, public)
values ('custom-designs', 'custom-designs', false)
on conflict (id) do nothing;
