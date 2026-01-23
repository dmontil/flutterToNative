# Tech Stack

## Framework & Core

- **Next.js 16.1.1** with App Router (React 19)
- **TypeScript 5** with strict mode enabled
- **React Server Components** by default (use "use client" directive when needed)

## Styling

- **Tailwind CSS 4** with PostCSS
- **class-variance-authority** for component variants
- **tailwind-merge** (via `cn()` utility) for conditional classes
- **Lucide React** for icons
- Custom fonts: Geist Sans & Geist Mono

## Backend & Services

- **Supabase**: PostgreSQL database, authentication, and real-time subscriptions
- **Stripe**: Payment processing and subscription management
- **Loops.so**: Email marketing and lead magnet delivery

## UI Components

- **Radix UI**: Headless component primitives (@radix-ui/react-slot)
- Custom component library in `src/components/ui/`
- Supabase Auth UI components for authentication flows

## Path Aliases

- `@/*` maps to `./src/*` for clean imports

## Common Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
LOOPS_API_KEY=your_loops_api_key
```

## Deployment

- **Platform**: Vercel (optimized for Next.js)
- **Domain**: fluttertonative.pro
- Environment variables configured in Vercel dashboard
