# 🚀 Vercel Deployment Guide

## Quick Deploy

1. **Go to Vercel**: [vercel.com/new](https://vercel.com/new)

2. **Import Repository**:
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose: `dmontil/flutterToNative`

3. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Environment Variables** (CRITICAL):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=sk_live_... or sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... or pk_test_...
   ```

5. **Deploy**: Click "Deploy" and wait ~2 minutes

## Post-Deployment Checklist

- [ ] Verify homepage loads at `your-project.vercel.app`
- [ ] Test login/signup flow
- [ ] Verify premium content is gated correctly
- [ ] Test premium content access
- [ ] Check Stripe checkout flow (test mode)
- [ ] Verify progress tracking works

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain: `fluttertonative.pro`
3. Configure DNS records as shown
4. Wait for SSL certificate (~5 minutes)

## Production Environment Variables

Make sure to use **production** keys for:
- Stripe: `sk_live_...` and `pk_live_...`
- Supabase: Production project URL and anon key

## Troubleshooting

**Build fails?**
- Check that all dependencies are in `package.json`
- Verify Node.js version (18.x recommended)

**Environment variables not working?**
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

**404 errors?**
- Verify Next.js App Router structure
- Check `src/app/` directory structure

---

**Repository**: https://github.com/dmontil/flutterToNative
**Live Demo**: Will be at your-project.vercel.app after deployment
