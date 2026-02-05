# Production Launch Guide

This guide explains how to configure domains, environment variables, and third‑party services before going live.

## 1) Domains (Vercel + DNS)

You will use three hosts:

- `www.fluttertonative.pro` (root selector / premium landing)
- `ios.fluttertonative.pro` (iOS playbook)
- `android.fluttertonative.pro` (Android playbook)

### Vercel steps
1. Vercel Project → Settings → Domains
2. Add:
   - `www.fluttertonative.pro`
   - `ios.fluttertonative.pro`
   - `android.fluttertonative.pro`

### DNS (at your domain provider)
Create these records:

- `www` → CNAME → `cname.vercel-dns.com`
- `ios` → CNAME → `cname.vercel-dns.com`
- `android` → CNAME → `cname.vercel-dns.com`

If your provider doesn’t allow CNAME at root, keep root unused and use `www` as the main entry.

## 2) App Routing Behavior

The middleware routes:
- `www.fluttertonative.pro` → shows premium landing selector.
- `/ios` on root → redirects to `ios.fluttertonative.pro`.
- `/android` on root → redirects to `android.fluttertonative.pro`.
- `ios.fluttertonative.pro/` → serves iOS home.
- `android.fluttertonative.pro/` → serves Android home.

## 3) Environment Variables (Vercel → Production)

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL = https://www.fluttertonative.pro`

If Stripe is enabled:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_IOS`
- `STRIPE_PRICE_ID_ANDROID`

Optional:

- `PREMIUM_TEST_MODE = false`
- `NEXT_PUBLIC_PREMIUM_TEST_MODE = false`

## 4) Supabase Settings

### Service Role
Use the Service Role key only on the server (Vercel env). Never expose it in frontend code.

### Auth Redirect URLs
Supabase → Authentication → URL Configuration:

Add:
- `https://www.fluttertonative.pro`
- `https://ios.fluttertonative.pro`
- `https://android.fluttertonative.pro`

Also add the dev URLs:
- `http://localhost:3000`
- `http://localhost:3001` (if dev server picks another port)

### RLS Policy
Apply `supabase/lock-entitlements-policy.sql` in Supabase SQL editor.

## 5) Stripe Webhooks (when ready)

Stripe → Developers → Webhooks:
Add endpoint:

- `https://www.fluttertonative.pro/api/webhooks/stripe`

Copy webhook secret → `STRIPE_WEBHOOK_SECRET`.

## 6) Final Pre‑Launch Checklist

1. `npm run lint` passes.
2. `npm run dev` works locally.
3. Supabase keys set in Vercel.
4. Domain DNS verified in Vercel.
5. Auth redirect URLs in Supabase.
6. Production build passes in Vercel.

