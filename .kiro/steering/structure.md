# Project Structure

## Directory Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── checkout/      # Stripe checkout endpoints
│   │   └── leads/         # Lead magnet API
│   ├── (pages)/           # Route groups for different sections
│   │   ├── architecture/
│   │   ├── components-ui/
│   │   ├── feature-dive/
│   │   ├── interview/
│   │   ├── login/
│   │   ├── mental-model/
│   │   ├── pricing/
│   │   ├── resources/
│   │   ├── testing/
│   │   └── widget-map/
│   ├── layout.tsx         # Root layout with UserProvider
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── sitemap.ts         # SEO sitemap
├── components/
│   ├── auth/              # Authentication components
│   │   └── user-provider.tsx  # User context & entitlements
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── navbar.tsx
│   │   ├── premium-lock.tsx
│   │   ├── lead-magnet.tsx
│   │   └── ...
│   ├── code/              # Code comparison components
│   ├── diagrams/          # Architecture diagrams
│   └── layout/            # Layout components
├── lib/                   # Utility functions & clients
│   ├── supabase-client.ts # Supabase initialization
│   ├── stripe.ts          # Stripe configuration
│   └── utils.ts           # Helper functions (cn, etc.)
└── config/
    └── products.ts        # Product definitions & pricing

public/
├── images/                # Static images
├── leads/                 # Lead magnet content (markdown)
└── *.svg                  # Icons and logos

supabase/
└── schema.sql             # Database schema
```

## Key Conventions

### File Naming

- React components: PascalCase (e.g., `UserProvider.tsx`)
- Pages: lowercase with hyphens (e.g., `mental-model/page.tsx`)
- Utilities: camelCase (e.g., `supabase-client.ts`)

### Component Patterns

- **Server Components**: Default for pages and layouts
- **Client Components**: Mark with `"use client"` directive
  - Required for: hooks, event handlers, browser APIs, context consumers
  - Examples: `navbar.tsx`, `user-provider.tsx`, `premium-lock.tsx`

### Authentication & Authorization

- `UserProvider` wraps entire app in root layout
- `useUser()` hook provides: `user`, `entitlements`, `isLoading`, `hasAccess()`
- Entitlements stored in Supabase `profiles` table
- Premium content gated via `PremiumLock` component or `hasAccess()` checks

### Styling Patterns

- Use `cn()` utility from `@/lib/utils` for conditional classes
- Tailwind utility classes preferred over custom CSS
- Component variants via `class-variance-authority`
- Color scheme: Indigo primary, muted backgrounds, gradient accents

### API Routes

- Located in `src/app/api/`
- Checkout flow: `/api/checkout`
- Lead capture: `/api/leads`

### Content Organization

- Educational content lives in page components
- Lead magnets stored as markdown in `public/leads/`
- Product configuration centralized in `src/config/products.ts`
